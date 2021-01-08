<?php

namespace Maruf89\PrieMuses\ThirdParty\GMaps;

class ClassGMaps {

	public function __construct() {
		if ( !defined( 'GOOGLE_API_KEY' ) || empty( GOOGLE_API_KEY ) ) {
			throw new Exception( 'ClassGMaps is missing constant \'GOOGLE_API_KEY\' or it\'s empty' );
		}

		$this->load_actions_and_filters();
	}

	private function load_actions_and_filters() {
		add_filter('acf/fields/google_map/api', [ $this, 'add_acf_api_key' ]);
	}

	public function add_acf_api_key( $api ) {
		$api['key'] = GOOGLE_API_KEY;

    	return $api;
	}

	public static function enabled():?string {
		return defined( 'GOOGLE_MAPS_ENABLE' ) && GOOGLE_MAPS_ENABLE ? static::class : null;
	}
}
