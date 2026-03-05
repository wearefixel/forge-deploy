<?php

namespace Fixel\ForgeDeploy;

use Statamic\Facades\Utility;
use Statamic\Providers\AddonServiceProvider;

class ServiceProvider extends AddonServiceProvider
{
    protected $vite = [
        'input' => [
            'resources/js/cp.js',
            'resources/css/cp.css',
        ],
        'publicDirectory' => 'resources/dist',
    ];

    public function bootAddon(): void
    {
        Utility::extend(function () {
            Utility::register('forge-deploy')
                ->action(Controller::class, 'index')
                ->title('Forge Deploy')
                ->description('Deploy your site to Laravel Forge.')
                ->icon('upload-cloud');
        });
    }
}
