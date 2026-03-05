<?php

namespace Fixel\ForgeDeploy;

use Illuminate\Support\Facades\Route;

Route::prefix('fixel/forge-deploy')
    ->name('fixel.forge-deploy.')
    ->group(function () {
        Route::get('commits', [Controller::class, 'commits'])
            ->name('commits');

        Route::get('commits/{hash}', [Controller::class, 'commit'])
            ->name('commit');

        Route::post('deploy/{environment}/{hash}', [Controller::class, 'deploy'])
            ->name('deploy');
    });
