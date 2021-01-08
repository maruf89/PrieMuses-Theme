<?php

namespace Maruf89\PrieMuses\ThirdParty\Sentry;

class ClassSentry {

	public function __construct() {
		if ( !function_exists('\\Sentry\captureException') ) {
			throw new Exception( 'Sentry library is missing' );
		}

		add_action( 'community_directory_register_error_handler', [ $this, 'register_sentry_error_handler' ], 10, 2 );
	}

	public function register_sentry_error_handler(
		$class_instance,
		string $register_method
	) {
	    $class_instance::{$register_method}( new SentryErrorHandler() );
	}

	public static function enabled():?string {
		return defined( 'SENTRY_ENABLE' ) && SENTRY_ENABLE ? static::class : null;
	}

}