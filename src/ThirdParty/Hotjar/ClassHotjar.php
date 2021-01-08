<?php

namespace Maruf89\PrieMuses\ThirdParty\Hotjar;

use Maruf89\PrieMuses\ThirdParty\ThirdParty;

class ClassHotjar {

	public function __construct() {
		if ( !defined( 'HOTJAR_SITE_ID' ) || empty( HOTJAR_SITE_ID ) ) {
			throw new Exception( 'Hotjar is missing constant name \'HOTJAR_SITE_ID\'' );
		}

		$this->load_actions_and_filters();
	}

    private function load_actions_and_filters() {
        add_action( 'wp_enqueue_scripts', [ $this, 'load_script' ] );
    }

    public function load_script() {
        wp_enqueue_script( 'pm_hotjar', ThirdParty::$assets_uri . '/Hotjar/tracking.js', [],'all' );
        wp_localize_script( 'pm_hotjar', 'pm_hotjar',
            array( 'siteId' => HOTJAR_SITE_ID )
        );
    }

	public static function enabled():?string {
		return defined( 'HOTJAR_ENABLE' ) && HOTJAR_ENABLE ? static::class : null;
	}

}
