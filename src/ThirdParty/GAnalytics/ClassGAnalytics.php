<?php

namespace Maruf89\PrieMuses\ThirdParty\GAnalytics;

use Maruf89\PrieMuses\ThirdParty\ThirdParty;

class ClassGAnalytics {

    public function __construct() {
        if ( !defined( 'GANALYTICS_MEASURE_ID' ) || empty( GANALYTICS_MEASURE_ID ) ) {
            throw new Exception( 'GAnalytics is missing constant name \'GANALYTICS_MEASURE_ID\'' );
        }

        $this->load_actions_and_filters();
    }

    private function load_actions_and_filters() {
        add_action( 'wp_enqueue_scripts', [ $this, 'load_script' ] );
    }

    public function load_script() {
        wp_enqueue_script( 'pm_gtagmanager', 'https://www.googletagmanager.com/gtag/js?id=' . GANALYTICS_MEASURE_ID, [],'all' );
        wp_enqueue_script( 'pm_ganalytics', ThirdParty::$assets_uri . '/GAnalytics/tracking.js', [],'all' );
        wp_localize_script( 'pm_ganalytics', 'pm_ganalytics',
            array( 'measureId' => GANALYTICS_MEASURE_ID )
        );
    }

    public static function enabled():?string {
        return defined( 'GANALYTICS_ENABLE' ) && GANALYTICS_ENABLE ? static::class : null;
    }

}
