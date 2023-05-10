@extends('statamic::layout')
@section('title', 'Forge Deploy')

@section('content')
    <header class="mb-3">
        @include('statamic::partials.breadcrumb', [
            'url' => cp_route('utilities.index'),
            'title' => __('Utilities'),
        ])

        <h1>Forge Deploy</h1>
    </header>

    <div class="mt-3 card">
        <forge-deploy
            :environments=@json(array_keys(config('forge-deploy.environments')))
            :per-page="@json(config('forge-deploy.per_page'))"
        />
    </div>
@stop
