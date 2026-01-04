<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request; // Pastikan ini ada
use Inertia\Inertia; // Pastikan ini ada
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (\Throwable $e, Request $request) {

            // 1. Jika request ke API, biarkan default JSON response
            if ($request->is('api/*')) {
                return null;
            }

            // 2. Tentukan Status Code
            // Defaultnya 500 (Server Error)
            $status = 500;

            // Kalau errornya tipe HTTP (404, 403, 503), ambil kodenya
            if ($e instanceof HttpException) {
                $status = $e->getStatusCode();
            }

            // 3. Render Halaman Error Inertia HANYA untuk kode tertentu
            if (in_array($status, [403, 404, 500, 503])) {
                return Inertia::render('error', ['status' => $status])
                    ->toResponse($request)
                    ->setStatusCode($status);
            }

            // Biarkan Laravel menangani error lain
            return null;
        });
    })->create();
