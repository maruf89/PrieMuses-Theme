<?php

/**
 * Community Directory Plugin template loader
 */

namespace Maruf89\PrieMuses\Includes;

use  Maruf89\PrieMuses\Includes\CommunityDirectoryHelper as CD;

class CDTemplateLoader {

    private string $_template_dir;
	private string $template_hook_prefix;
	private int $prefix_len;

	public function __construct( string $template_dir = '' ) {
		if ( !CD::$plugin_loaded || !class_exists( 'Maruf89\CommunityDirectory\Includes\ClassPublic' ) ) {
			return;
        }

        $this->_template_dir = $template_dir;

        list( $prefix, $len ) = \Maruf89\CommunityDirectory\Includes\ClassPublic::get_template_hook_prefix();
        $this->template_hook_prefix = $prefix;
        $this->prefix_len = $len;

        $this->add_actions_and_filters();
	}

	private function add_actions_and_filters() {
        $prefix = $this->template_hook_prefix;
		add_filter( "${prefix}location/location-list.php", [ $this, 'load_template' ], 11, 1 );
		// add_filter( "${prefix}location/instance-map.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}location/location-single.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}offers-needs/offers-needs-no-results.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}offers-needs/offers-needs-list.php", [ $this, 'load_template' ], 11, 1 );
        add_filter( "${prefix}offers-needs/offers-needs-hashtag-list.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}offers-needs/offers-needs-single.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}offers-needs/offers-needs-minified-single.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}entity/entity-single.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}entity/entity-list.php", [ $this, 'load_template' ], 11, 1 );
		add_filter( "${prefix}search/cd-offers-needs.php", array( $this, 'load_template' ), 11, 1 );
        add_filter( "${prefix}search/cd-entity.php", array( $this, 'load_template' ), 11, 1 );
        add_filter( "${prefix}search/cd-location.php", array( $this, 'load_template' ), 11, 1 );

        add_filter( "${prefix}single-post-type", [ $this, 'post_type_template' ], 10, 3 );
	}

	private array $remap = [
		'search/cd-location.php' => 'location/location-single.php',
    ];

	public function load_template( string $template ):string {
	    // get name of current filter
	    // Will look something like: "community_directory_template_something-list.php"
	    $current = current_filter();
	    $file = substr( $current, $this->prefix_len );

	    if ( isset( $this->remap[ $file ] ) )
	    	$file = $this->remap[ $file ];

	    return get_template_directory() . "$this->_template_dir/$file";
    }
    
    public function post_type_template( string $template, string $post_type, string $without_prefix ):string {
        return get_stylesheet_directory() . "$this->_template_dir/$without_prefix/$template";
    }
}