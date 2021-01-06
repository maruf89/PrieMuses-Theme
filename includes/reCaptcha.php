<?php

class pm_reCaptcha {

	function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'load_scripts' ) );
	}

	public function load_scripts() {
		// new Object = 10;
		wp_enqueue_script( 'reCaptcha', 'https://www.google.com/recaptcha/api.js', [], '3' );
	}

}

if ( defined( 'RECAPTCHA_V3_KEY' ) && defined( 'RECAPTCHA_V3_SECRET' ) ) new pm_reCaptcha();