<?php

/**
 * This function exists to separate the translations from other text domain translations
 * So that with POEdit you can search only keys in this domain
 */

// __()
function pm__( string $key ) { return __( $key, 'priemuses' ); }

// _e()
function pm_e( string $key ):string { return _e( $key, 'priemuses' ); }

// _n()
function pm_n( string $key, string $plural, int $count ):string { return _n( $key, $plural, $count, 'priemuses' ); }

// _x()
function pm_x( string $key, string $context ):string { return _x( $key, $context, 'priemuses' ); }

// _nx()
function pm_nx( string $key, $plural, $count, $context ):string {
    return _nx( $key, $plural, $count, $context, 'priemuses' );
}

function pmesc_html__( string $key ):string { return esc_html__( $key, 'priemuses' ); }

function pmesc_html_e( string $key ):string { return esc_html_e( $key, 'priemuses' ); }

function front_end_translations():array {
    return [
        'form_submission_error' => pm__( 'There was an error submitting the form' ),
    ];
}