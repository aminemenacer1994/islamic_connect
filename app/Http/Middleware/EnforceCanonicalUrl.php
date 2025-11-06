<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnforceCanonicalUrl
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $this->applyRedirects($request);
        if ($response instanceof Response) {
            $this->stripPoweredByHeader($response);

            return $response;
        }

        /** @var \Symfony\Component\HttpFoundation\Response $response */
        $response = $next($request);

        $this->stripPoweredByHeader($response);
        $this->addSecurityHeaders($response, $request);

        return $response;
    }

    /**
     * Ensure requests are optionally redirected to HTTPS and canonical host.
     */
    protected function applyRedirects(Request $request): ?Response
    {
        if (!app()->environment('production')) {
            return null;
        }

        $canonicalUrl = (string) config('app.canonical_url');
        $canonicalHost = $canonicalUrl ? parse_url($canonicalUrl, PHP_URL_HOST) : null;
        $canonicalScheme = $canonicalUrl ? parse_url($canonicalUrl, PHP_URL_SCHEME) : null;
        $forceHttps = (bool) config('app.force_https', false);

        $host = $request->getHost();
        $currentScheme = $request->getScheme();
        $targetScheme = $canonicalScheme ?: ($forceHttps ? 'https' : $currentScheme);

        if ($canonicalHost && strcasecmp($host, $canonicalHost) !== 0) {
            $redirectUrl = $targetScheme . '://' . $canonicalHost . $request->getRequestUri();

            return redirect($redirectUrl, 301);
        }

        if ($forceHttps && $currentScheme !== 'https') {
            return redirect()->secure($request->getRequestUri(), 301);
        }

        return null;
    }

    /**
     * Remove the X-Powered-By header that exposes server details.
     */
    protected function stripPoweredByHeader(Response $response): void
    {
        $response->headers->remove('X-Powered-By');

        if (\function_exists('header_remove')) {
            @header_remove('X-Powered-By');
        }
    }

    /**
     * Add security-related headers when HTTPS is enforced.
     */
    protected function addSecurityHeaders(Response $response, Request $request): void
    {
        if (!app()->environment('production')) {
            return;
        }

        if (!config('app.force_https', false)) {
            return;
        }

        if ($request->isSecure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload', false);
        }
    }
}

