# Forge Deploy

Provides a deployment utility in the Statamic control panel to view a list of Git commits and deploy specific commits to Laravel Forge.

## Instructions

1. `composer require fixel/forge-deploy`
2. Publish `forge-deploy-config` via `php artisan vendor:publish`
3. Provide your Forge site's server ID, site ID, and deployment token via `.env` variables or config directly
4. Update Git portion of Forge deployment script to something like this:
```bash
git fetch origin
git checkout $FORGE_VAR_HASH
```
