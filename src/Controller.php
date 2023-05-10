<?php

namespace Fixel\ForgeDeploy;

use Gitonomy\Git\Commit;
use Gitonomy\Git\Diff\File;
use Gitonomy\Git\Repository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Statamic\Http\Controllers\Controller as StatamicController;

class Controller extends StatamicController
{
    public Repository $git;

    public function __construct()
    {
        $this->git = new Repository(base_path());
    }

    public function last(Request $request)
    {
        return collect(config('forge-deploy.environments'))
            ->mapWithKeys(function ($environment, $name) {
                $file = "forge-deploy/{$name}.json";

                if (!Storage::exists($file)) {
                    return [$name => null];
                }

                return [$name => json_decode(Storage::get($file))];
            });
    }

    public function commits(Request $request)
    {
        $repository = new Repository(base_path());

        $perPage = config('forge-deploy.per_page');
        $page = $request->query('page', 0);

        $commits = $repository->getLog(offset: $page * $perPage, limit: $perPage)->getCommits();

        $commits = array_map(fn (Commit $c) => [
            'hash' => $c->getHash(),
            'shortHash' => $c->getShortHash(),
            'message' => $c->getMessage(),
            'author' => $c->getAuthorName(),
            'date' => $c->getAuthorDate()->format('Y-m-d H:i:s'),
        ], $commits);

        $total = $repository->getLog()->countCommits();

        return [
            'commits' => $commits,
            'total' => $total,
        ];
    }

    public function commit(Request $request, string $hash)
    {
        $repository = new Repository(base_path());

        return collect(
            $repository->getCommit($hash)->getDiff()->getFiles()
        )->map(fn (File $f) => [
            'name' => $f->getName(),
            'status' => $f->isDelete() ? 'd' : ($f->isCreation() ? 'c' : ($f->isModification() ? 'm' : null)),
        ]);
    }

    public function deploy(Request $request, string $environment, string $hash)
    {
        if (!$this->getEnvironment($environment)) {
            return response()->json([
                'message' => 'Environment not found',
            ], 422);
        }

        try {
            $this->git->getCommit($hash);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Commit not found',
            ], 422);
        }

        $response = Http::post($this->buildTriggerUrl($environment, $hash));

        if ($response->successful()) {
            Storage::put(
                "forge-deploy/{$environment}.json",
                json_encode([
                    'hash' => $hash,
                    'time' => time(),
                ])
            );

            return response()->json([
                'message' => 'Deployment triggered',
            ]);
        }

        return response()->json([
            'message' => 'Deployment failed',
        ], $response->status());
    }

    protected function buildTriggerUrl(string $environment, string $hash): string
    {
        $environment = $this->getEnvironment($environment);

        return sprintf(
            'https://forge.laravel.com/servers/%s/sites/%s/deploy/http?token=%s&hash=%s',
            $environment['server_id'],
            $environment['site_id'],
            $environment['token'],
            $hash,
        );
    }

    protected function getEnvironment(string $environment): array|null
    {
        return config('forge-deploy.environments.' . $environment);
    }
}
