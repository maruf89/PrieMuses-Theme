<?php

namespace Maruf89\PrieMuses\ThirdParty;

use Maruf89\PrieMuses\ThirdParty\Hotjar\ClassHotjar;
use Maruf89\PrieMuses\ThirdParty\GAnalytics\ClassGAnalytics;
use Maruf89\PrieMuses\ThirdParty\Sentry\ClassSentry;
use Maruf89\PrieMuses\ThirdParty\GMaps\ClassGMaps;
use Maruf89\PrieMuses\ThirdParty\Recaptcha\ClassRecaptcha;

class ThirdParty {

	private array $libraries = [
		'Hotjar' => null,
		'GAnalytics' => null,
		'Sentry' => null,
		'GMaps' => null,
		'Recaptcha' => null,
	];

	public static string $assets_uri;
	
	public function __construct() {
		static::$assets_uri = get_stylesheet_directory_uri() . '/src/ThirdParty';

		$this->check_libraries();
	}

	private function check_libraries() {
		$this->libraries[ 'Hotjar' ] = ClassHotjar::enabled();
		$this->libraries[ 'GAnalytics' ] = ClassGAnalytics::enabled();
		$this->libraries[ 'Sentry' ] = ClassSentry::enabled();
		$this->libraries[ 'GMaps' ] = ClassGMaps::enabled();
		$this->libraries[ 'Recaptcha' ] = ClassRecaptcha::enabled();
			
		foreach ( $this->libraries as $lib_name => $class_name ) {
			if ( !is_null( $class_name ) ) $this->libraries[ $lib_name ] = new $class_name();
		}
	}

}