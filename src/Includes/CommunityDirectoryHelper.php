<?php

/**
 * Community Directory Plugin helper class
 */

namespace Maruf89\PrieMuses\Includes;

class CommunityDirectoryHelper {

    private static CommunityDirectoryHelper $instance;
    public static string $class_base = 'Maruf89\CommunityDirectory\\';

    public static bool $plugin_loaded;

    public static array $classes = array(
        'ClassLocation' => 'Includes\ClassLocation',
        'ClassEntity' => 'Includes\ClassEntity',
        'ClassOffersNeeds' => 'Includes\ClassOffersNeeds',
        'ClassRestEndPoints' => 'Includes\ClassRestEndPoints',
        'ClassACF' => 'Includes\ClassACF',
        'TaxonomyLocation' => 'Includes\TaxonomyLocation',
        'TaxonomyProductService' => 'Includes\TaxonomyProductService',
        'Location' => 'Includes\instances\Location',
        'Entity' => 'Includes\instances\Entity',
        'OfferNeed' => 'Includes\instances\OfferNeed',
    );

    public static function get_instance():CommunityDirectoryHelper {
        if ( isset( static::$instance ) ) return static::$instance;

        return static::$instance = new CommunityDirectoryHelper();
    }

    public function __construct() {
        static::$plugin_loaded = class_exists( static::$class_base . 'Includes\ClassLocation' ) &&
                         class_exists( static::$class_base . 'Includes\ClassEntity' ) &&
                         class_exists( static::$class_base . 'Includes\ClassOffersNeeds' ) &&
                         class_exists( static::$class_base . 'Includes\ClassRestEndPoints' );
    }

    /**
     * Returns CommunityDirectory class if the plugin is loaded
     */
    public static function get( string $class_name ):string {
        if ( static::$plugin_loaded &&
             isset( static::$classes[ $class_name ] )
        ) return static::$class_base . static::$classes[ $class_name ];

        return '';
    }

    /**
     * If the plugin's not loaded, renders and error and dies
     */
    public static function plugin_required_page( bool $include_header_footer = false ) {
        if ( !static::$plugin_loaded ) {
            if ( $include_header_footer ) get_header();
            echo '<main><h3>You must enable the <a href="/wp/wp-admin/plugins.php">Community Directory plugin</a> to see this page</h3></main>';
            if ( $include_header_footer) get_footer();
            die();
        }
    }
    
}