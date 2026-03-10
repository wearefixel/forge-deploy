# Forge Deploy

A Statamic addon that adds a control panel utility for deploying specific Git commits to [Laravel Forge](https://forge.laravel.com).

Browse your commit history, inspect file changes, and trigger deployments to any configured environment — all from the Statamic CP.

## Installation

```bash
composer require fixel/forge-deploy
```

## Configuration

Publish the config file:

```bash
php artisan vendor:publish --tag=forge-deploy-config
```

This creates `config/forge-deploy.php`. Define your environments, each with a Forge server ID, site ID, and deployment trigger token:

```php
'environments' => [

    'production' => [
        'server_id' => env('FORGE_DEPLOY_PRODUCTION_SERVER_ID'),
        'site_id' => env('FORGE_DEPLOY_PRODUCTION_SITE_ID'),
        'token' => env('FORGE_DEPLOY_PRODUCTION_TOKEN'),
    ],

    'staging' => [
        'server_id' => env('FORGE_DEPLOY_STAGING_SERVER_ID'),
        'site_id' => env('FORGE_DEPLOY_STAGING_SITE_ID'),
        'token' => env('FORGE_DEPLOY_STAGING_TOKEN'),
    ],

],
```

You can find these values in the Forge dashboard:

- **Server ID** and **Site ID** are in the URL when viewing your site: `forge.laravel.com/servers/{server_id}/sites/{site_id}`
- **Deployment trigger token** is under your site's Deployments tab — enable "Quick Deploy" or use the deployment trigger URL

Add the corresponding values to your `.env`:

```env
FORGE_DEPLOY_PRODUCTION_SERVER_ID=123456
FORGE_DEPLOY_PRODUCTION_SITE_ID=789012
FORGE_DEPLOY_PRODUCTION_TOKEN=your-token-here
```

## Forge Setup

Update the Git portion of your Forge deployment script to check out a specific commit hash using the `FORGE_VAR_HASH` variable:

```bash
git fetch origin
git checkout $FORGE_VAR_HASH
```

This allows the addon to deploy any commit rather than just the latest on a branch.

## Usage

Navigate to **Utilities → Forge Deploy** in the Statamic control panel.

From there you can:

- **Browse commits** — paginated list of your Git history showing hash, message, author, and date
- **View changes** — click the eye icon on any commit to see which files were added, modified, or deleted
- **Deploy** — select an environment to trigger a deployment of that specific commit to Forge
- **Track deployments** — badges on commits show which environment they were last deployed to and when
