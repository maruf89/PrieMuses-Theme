<?php

namespace Maruf89\PrieMuses;

use Maruf89\PrieMuses\Includes\{NonceGenerator, CDTemplateLoader, CommunityDirectoryHelper};
use Maruf89\PrieMuses\ThirdParty\ThirdParty;

class Theme {

    use Taxonomy;

    /**
     * the instance of the object, used for singelton check
     * @var object
     */
    private static Theme $instance;

    public $themeoptions = [];
    public string $version      = '1';
    public $themedata    = [];

    private string $assets_uri;
    private ThirdParty $third_party;

    /**
     * This function will be run when the class is initialized.
     * Add your hook and filter references here.
     */
    public function __construct() {
        $this->themeoptions = get_option( 'themeoptions_priemuses' );
        $this->themedata    = wp_get_theme();
        $this->version      = $this->themedata->Version; // from style.css in the theme root folder
    }

    public function run() {

        /**
         * Add functionality support rules for this Theme
         */
        add_action( 'after_setup_theme', [ $this, 'themeSupports' ] );

        /*
         * Add the CSS files and JavaScripts for the website output.
         */
        $this->assets_uri = get_stylesheet_directory_uri() . '/assets';
        add_action( 'wp_enqueue_scripts', [ $this, 'addFrontendScripts' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'addFrontendStyles' ] );
        add_action( 'widgets_init', [ $this, 'load_widgets' ] );
        add_action( 'wp_head', [ $this, 'pingback_header' ] );
        add_action( 'wp_footer', [ $this, 'load_footer_scripts' ] );

        add_filter( 'document_title_separator', [ $this, 'document_title_separator' ] );
        add_filter( 'the_title', [ $this, 'title_not_empty' ] );
        add_filter( 'intermediate_image_sizes_advanced', [ $this, 'image_insert_override' ] );
        add_filter( 'wp_nav_menu_args', [ $this, 'my_wp_nav_menu_args' ] );
        add_filter( 'image_size_names_choose', [ $this, 'my_editor_image_sizes' ] );
        add_filter( 'script_loader_tag', [ NonceGenerator::get_instance(), 'add_nonce_to_script' ], 10, 3 );

        $this->setup_template_loader();
        $this->community_directory_helper = CommunityDirectoryHelper::get_instance();

        $this->third_party = new ThirdParty();
    }

    /**
     * Creates an instance if one isn't already available,
     * then return the current instance.
     * @return object       The class instance.
     */
    public static function getInstance() {
        if ( !isset( self::$instance ) ) {
            self::$instance          = new Theme;
            self::$instance->name    = self::$instance->themedata->name;
            self::$instance->version = self::$instance->themedata->version;
            self::$instance->prefix  = 'sht';
            self::$instance->error   = __( 'An unexpected error occured.', 'sht' );
            self::$instance->debug   = true;
            if ( ! isset( $_SERVER['HTTP_HOST'] ) || strpos( $_SERVER['HTTP_HOST'], '.hello' ) === false && ! in_array( $_SERVER['REMOTE_ADDR'], [ '127.0.0.1', '::1' ] ) ) {
                self::$instance->debug = false;
            }
        }
        return self::$instance;
    }

    public function themeSupports() {
        load_theme_textdomain( 'priemuses', get_template_directory() . '/languages' );
        add_theme_support( 'title-tag' );
        add_theme_support( 'automatic-feed-links' );
        add_theme_support( 'post-thumbnails' );
        add_image_size( 'cd_thumb', 512, 205, true );
        add_image_size( 'cd_thumb@2x', 1024, 410, true );
        global $content_width;
        if ( ! isset( $content_width ) ) { $content_width = 1920; }
        register_nav_menus( array( 'main-menu' => esc_html__( 'Main Menu', 'priemuses' ) ) );


        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            [
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            ]
        );
    }

    /**
     * Adds the CSS files to the frontend page header using wp_head.
     */
    public function addFrontendStyles() {
        $suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
        
        wp_enqueue_style( 'priemuses-base-style', get_stylesheet_uri() , [],wp_get_environment_type() == 'production' ? $this->version : date("ymd-Gis") );
        wp_enqueue_style( 'priemuses-style', "$this->assets_uri/css/style.css" , [], wp_get_environment_type() == 'production' ? $this->version : date("ymd-Gis"));
        wp_enqueue_style( 'bootstrap', "$this->assets_uri/css/bootstrap" . $suffix . '.css' , wp_get_environment_type() == 'production' ? $this->version : date("ymd-Gis"), 'all' );

        wp_enqueue_style( 'dashicons' );
    }

    /**
     * Adds the JavaScript files to the frontend page header using wp_head.
     */
    public function addFrontendScripts() {
        wp_enqueue_script( 'jquery' );
        wp_enqueue_script( 'priemuses-js', "$this->assets_uri/js/site.js", [], 12312312312);// wp_get_environment_type() == 'production' ? $this->version : date("ymd-Gis"), 'all' );
        wp_localize_script( 'priemuses-js', 'pm',
            array_merge(
                array(
                    'recaptch' => [
                        'key_v2' => defined('RECAPTCHA_V2_KEY') ? RECAPTCHA_V2_KEY : '',
                        'key_v3' => defined('RECAPTCHA_V3_KEY') ? RECAPTCHA_V3_KEY : ''
                    ],
                    'wp_nonce' => wp_create_nonce( 'wp_rest' ),
                    'ajax_url' => admin_url( 'admin-ajax.php' ),
                ),
                $this->community_directory_helper->get_array_vars()
            )
        );
    }

    public function load_widgets() {
        register_sidebar( array(
            'name'          => 'Home Page',
            'id'            => 'home_page_widget',
            'before_widget' => '<div class="home-widget">',
            'after_widget'  => '</div>',
            'before_title'  => '<h2 class="rounded">',
            'after_title'   => '</h2>',
        ) );
    }

    public function load_footer_scripts() {
        ?>
        <script>
        jQuery(document).ready(function ($) {
            var deviceAgent = navigator.userAgent.toLowerCase();
            if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
                $("html").addClass("ios");
                $("html").addClass("mobile");
            }
            if (navigator.userAgent.search("MSIE") >= 0) {
                $("html").addClass("ie");
            }
            else if (navigator.userAgent.search("Chrome") >= 0) {
                $("html").addClass("chrome");
            }
            else if (navigator.userAgent.search("Firefox") >= 0) {
                $("html").addClass("firefox");
            }
            else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                $("html").addClass("safari");
            }
            else if (navigator.userAgent.search("Opera") >= 0) {
                $("html").addClass("opera");
            }
        });
        </script>
        <?php
    }

    public function document_title_separator( $sep ) {
        $sep = '|';
        return $sep;
    }


    public function title_not_empty( $title ) {
    	return empty( $title ) ? '...' : $title;
    }


    /**
     * Remove the medium_large size
     */
    public function image_insert_override( $sizes ) {
        unset( $sizes['medium_large'] );
        return $sizes;
    }


    public function pingback_header() {
        if ( is_singular() && pings_open() ) {
            printf( '<link rel="pingback" href="%s" />' . "\n", esc_url( get_bloginfo( 'pingback_url' ) ) );
        }
    }

    public function my_wp_nav_menu_args( $args = '' ) {
        if( is_user_logged_in() ) { 
            $args['menu'] = 'logged-in';
        } else { 
            $args['menu'] = 'logged-out';
        } 
        return $args;
    }

    // add custom size to editor image size options
	public function my_editor_image_sizes( $sizes ) {
	    $sizes = array_merge( $sizes, array(
	      'cd_thumb' => __( 'Community Directory Thumb Size' )
	    ));
	    return $sizes;
	}

    private function setup_template_loader() {
        new CDTemplateLoader();
    }
}

new Theme();