<?php

namespace Maruf89\PrieMuses\ThirdParty\Recaptcha;

class ClassRecaptcha {

	function __construct() {
		if ( !defined( 'RECAPTCHA_V2_KEY' )
			 || !defined( 'RECAPTCHA_V3_KEY')
			 || empty( RECAPTCHA_V2_KEY )
			 || empty( RECAPTCHA_V3_KEY )
		) {
			throw new Exception( 'ClassRecaptcha is enabled but is missing constants for either RECAPTCHA_V2_KEY and\or RECAPTCHA_V3_KEY' );
		}

		$this->load_actions_and_filters();
	}

	private function load_actions_and_filters() {
		add_action( 'wp_enqueue_scripts', array( $this, 'load_scripts' ) );
	}

	public function load_scripts() {
		$render_key = defined( 'RECAPTCHA_V3_KEY' ) ? '?render=' . RECAPTCHA_V3_KEY : '';
		wp_enqueue_script( 'reCaptcha', "https://www.google.com/recaptcha/api.js$render_key", [], 'all' );
	}

	public static function enabled():?string {
		return defined( 'RECAPTCHA_ENABLE' ) && RECAPTCHA_ENABLE ? static::class : null;
	}

}
