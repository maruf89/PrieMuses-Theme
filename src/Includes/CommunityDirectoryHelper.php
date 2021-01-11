<?php

/**
 * Community Directory Plugin helper class
 */

namespace Maruf89\PrieMuses\Includes;

class CommunityDirectoryHelper {

    private static CommunityDirectoryHelper $instance;
    public static string $class_base = 'Maruf89\CommunityDirectory\\';

    public static bool $plugin_loaded;

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

    public function get_array_vars():array {
        $vars = [];
        
        if ( static::$plugin_loaded ) {
            $ClassEntity = static::$class_base . 'Includes\ClassEntity';
            $ClassLocation = static::$class_base . 'Includes\ClassLocation';
            $ClassOffersNeeds = static::$class_base . 'Includes\ClassOffersNeeds';
            $ClassRestEndPoints = static::$class_base . 'Includes\ClassRestEndPoints';
            $vars = [
                'restBase' => '/wp-json/' . $ClassRestEndPoints::get_instance()->rest_base,
                'postType' => array(
                    'entity' => $ClassEntity::$post_type,
                    'location' => $ClassLocation::$post_type,
                    'offersNeeds' => $ClassOffersNeeds::$post_type
                ),
            ];
        }

        return $vars;
    }
    
}