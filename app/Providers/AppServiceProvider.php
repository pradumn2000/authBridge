<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // ── FIX (root cause of the whole class of bug you've been hitting) ──
        //
        // By default Eloquent silently discards any key passed to create()
        // or update() that isn't in the model's $fillable. That's why
        // 'agreement_path' (not fillable on User), 'case_source' and
        // 'overall_tat' (not fillable on BGVCase) all vanished without a
        // single error or log line — the request returned 201, the JSON
        // response looked correct, and the data was simply never written.
        //
        // With this on, the same mistake throws
        // Illuminate\Database\Eloquent\MassAssignmentException immediately,
        // naming the offending attribute. Scoped to non-production so a
        // stale field can never take down the live site — in production the
        // old silent-discard behaviour still applies.
        Model::preventSilentlyDiscardingAttributes(! $this->app->isProduction());

        if (app()->environment('production')) {
            URL::forceScheme('https');
        }

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')
                . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}