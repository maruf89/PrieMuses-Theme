<?php

/**
 * Community Directory Plugin template loader
 */

namespace Maruf89\PrieMuses\Includes;

class CDTemplateLoader {

	private string $template_hook_prefix;
	private int $prefix_len;

	public function __construct() {
		if ( !class_exists( 'Maruf89\CommunityDirectory\Includes\ClassPublic' ) ) {
			return;
        }

        $this->template_hook_prefix =
        	\Maruf89\CommunityDirectory\Includes\ClassPublic::get_template_hook_prefix();
        $this->prefix_len = strlen( $this->template_hook_prefix );

        $this->add_actions_and_filters();
	}

	private function add_actions_and_filters() {
        $prefix = $this->template_hook_prefix;
		// add_filter( "${prefix}location-list.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}elements/location-single-no-photo.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}elements/location-single.php", [ $this, 'load_template' ], 11, 1 );
		// add_filter( "${prefix}offers-and-needs-no-results.php", [ $this, 'load_template' ], 11, 1 );
		// add_filter( "${prefix}offers-and-needs-list.php", [ $this, 'load_template' ], 11, 1 );
		// add_filter( "${prefix}offers_needs_hashtag_list.php", [ $this, 'load_template' ], 11, 1 );
		// add_filter( "${prefix}elements/offer-need-single.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}elements/entity-single.php", [ $this, 'load_template' ], 11, 1 );
		// add_filter( "${prefix}entity-list.php", [ $this, 'load_template' ], 11, 1 );
		// add_filter( "${prefix}entity-list.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}search/cd-offers-needs.php", array( $this, 'load_template' ), 11, 1 );
        add_filter( "${prefix}search/cd-entity.php", array( $this, 'load_template' ), 11, 1 );
        add_filter( "${prefix}search/cd-location.php", array( $this, 'load_template' ), 11, 1 );
	}

	private array $remap = [
		'search/cd-entity.php' => 'elements/entity-single.php',
		'search/cd-location.php' => 'elements/location-single.php',
    ];

	public function load_template( string $template ):string {
	    // get name of current filter
	    // Will look something like: "community_directory_template_location-list.php"
	    $current = current_filter();
	    $file = substr( $current, $this->prefix_len );

	    if ( isset( $this->remap[ $file ] ) )
	    	$file = $this->remap[ $file ];

	    return get_template_directory() . '/templates/' . $file;
	}
}