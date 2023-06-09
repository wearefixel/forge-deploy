<?php

namespace Fixel\ForgeDeploy;

use Illuminate\Support\Facades\Route;
use Statamic\Facades\Utility;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $vite = [
        'input' => [
            'resources/js/cp.js',
        ],
        'publicDirectory' => 'resources/dist',
    ];

    public function bootAddon(): void
    {
        $this->registerCpRoutes(function () {
            Route::prefix('fixel/forge-deploy')
                ->name('fixel.forge-deploy.')
                ->group(function () {
                    Route::get('last', [Controller::class, 'last'])
                        ->name('last');

                    Route::get('commits', [Controller::class, 'commits'])
                        ->name('commits');

                    Route::get('commits/{hash}', [Controller::class, 'commit'])
                        ->name('commit');

                    Route::post('deploy/{environment}/{hash}', [Controller::class, 'deploy'])
                        ->name('deploy');
                });
        });

        Utility::extend(function () {
            Utility::register('forge-deploy')
                ->view('forge-deploy::ui')
                ->title('Forge Deploy')
                ->icon('sites');
        });
    }
}
