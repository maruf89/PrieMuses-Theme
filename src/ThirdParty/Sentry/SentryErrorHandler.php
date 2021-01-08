<?php

namespace Maruf89\PrieMuses\ThirdParty\Sentry;

class SentryErrorHandler {
    public function handle_exception( \WP_Error $error ):int {
        \Sentry\captureException( $error );
    }
}