<?php

class pm_reCaptcha {

	function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'load_scripts' ) );
	}

	public function load_scripts() {
		// new Object = 10;
		wp_enqueue_script( 'reCaptcha', 'https://www.google.com/recaptcha/api.js', [], '2' );
	}

}

if ( defined( 'RECAPTCHA_V2_KEY' ) ) new pm_reCaptcha();