<?php

class pm_reCaptcha {

	function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'load_scripts' ) );
	}

	public function load_scripts() {
		$render_key = defined( 'RECAPTCHA_V3_KEY' ) ? '?render=' . RECAPTCHA_V3_KEY : '';
		wp_enqueue_script( 'reCaptcha', "https://www.google.com/recaptcha/api.js$render_key", [], 'all' );
	}

}

if ( defined( 'RECAPTCHA_V2_KEY' ) ) new pm_reCaptcha();