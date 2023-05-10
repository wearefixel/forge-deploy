<?php

namespace Fixel\ForgeDeploy;

use Illuminate\Support\Facades\Route;
use Statamic\Facades\Utility;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $scripts = [
        __DIR__ . '/../resources/dist/js/cp.js',
    ];

    public function bootAddon()
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
                ->icon('upload');
        });
    }
}
