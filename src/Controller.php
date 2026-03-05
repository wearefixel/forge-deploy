<?php

namespace Fixel\ForgeDeploy;

use Gitonomy\Git\Diff\File;
use Gitonomy\Git\Repository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Statamic\Http\Controllers\Controller as StatamicController;
use Illuminate\Pagination\LengthAwarePaginator;
use Fixel\ForgeDeploy\CommitResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Exception;

class Controller extends StatamicController
{
    public Repository $git;

    public function __construct()
    {
        $this->git = new Repository(base_path());
    }

    public function __invoke()
    {
        return Inertia::render('forge-deploy::index', [
            'environments' => array_keys(config('forge-deploy.environments', [])),
            'last' => collect(config('forge-deploy.environments'))->mapWithKeys(function (array $environment, string $name) {
                $file = "forge-deploy/{$name}.json";

                if (! Storage::exists($file)) {
                    return [$name => null];
                }

                return [$name => json_decode(Storage::get($file))];
            }),
        ]);
    }

    public function commits(Request $request): AnonymousResourceCollection
    {
        $perPage = (int) $request->input('perPage', 15);
        $page = (int) $request->query('page', 1);
        $commits = $this->git->getLog(offset: ($page - 1) * $perPage, limit: $perPage)->getCommits();
        $total = $this->git->getLog()->countCommits();
        $paginator = new LengthAwarePaginator($commits, $total, $perPage, $page, ['path' => $request->url()]);

        return CommitResource::collection($paginator);
    }

    public function commit(string $hash): Collection
    {
        return collect($this->git->getCommit($hash)->getDiff()->getFiles())->map(fn (File $file) => [
            'name' => $file->getName(),
            'status' => $file->isDelete() ? 'd' : ($file->isCreation() ? 'c' : ($file->isModification() ? 'm' : null)),
        ]);
    }

    public function deploy(string $environment, string $hash): JsonResponse
    {
        if (! $this->getEnvironment($environment)) {
            return response()->json(['message' => 'Environment not found'], 422);
        }

        try {
            $this->git->getCommit($hash);
        } catch (Exception $e) {
            return response()->json(['message' => 'Commit not found'], 422);
        }

        $response = Http::post($this->buildTriggerUrl($environment, $hash));

        if ($response->successful()) {
            Storage::put(
                "forge-deploy/{$environment}.json",
                json_encode(['hash' => $hash, 'time' => time()])
            );

            return response()->json(['message' => 'Deployment triggered']);
        }

        return response()->json(['message' => 'Deployment failed'], $response->status());
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

    protected function getEnvironment(string $environment): ?array
    {
        return config('forge-deploy.environments.'.$environment);
    }
}
