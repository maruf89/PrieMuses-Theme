<?php

use Maruf89\CommunityDirectory\Includes\ClassPublic;

require_once( __DIR__ . '/includes/NonceGenerator.php' );
require_once( __DIR__ . '/includes/reCaptcha.php' );

define( 'PRIE_MUSES_VERSION', '202012' );

add_action( 'after_setup_theme', 'priemuses_setup' );
function priemuses_setup() {
    load_theme_textdomain( 'priemuses', get_template_directory() . '/languages' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form' ) );
    add_image_size( 'cd_thumb', 512, 205, true );
    add_image_size( 'cd_thumb@2x', 1024, 410, true );
    global $content_width;
    if ( ! isset( $content_width ) ) { $content_width = 1920; }
    register_nav_menus( array( 'main-menu' => esc_html__( 'Main Menu', 'priemuses' ) ) );
}

// add custom size to editor image size options
function my_editor_image_sizes( $sizes ) {
    $sizes = array_merge( $sizes, array(
      'cd_thumb' => __( 'Community Directory Thumb Size' )
    ));
    return $sizes;
}
add_filter( 'image_size_names_choose', 'my_editor_image_sizes' );

$templates_prefix = ClassPublic::get_template_hook_prefix();
$prefix_len = strlen( ClassPublic::get_template_hook_prefix() );
// add_filter( "${templates_prefix}location-list.php", 'load_cd_template', 11, 1 );
add_filter( "${templates_prefix}elements/location-single-no-photo.php", 'load_cd_template', 11, 1 );
add_filter( "${templates_prefix}elements/location-single.php", 'load_cd_template', 11, 1 );
// add_filter( "${templates_prefix}offers-and-needs-no-results.php", 'load_cd_template', 11, 1 );
// add_filter( "${templates_prefix}offers-and-needs-list.php", 'load_cd_template', 11, 1 );
// add_filter( "${templates_prefix}offers_needs_hashtag_list.php", 'load_cd_template', 11, 1 );
// add_filter( "${templates_prefix}elements/offer-need-single.php", 'load_cd_template', 11, 1 );
add_filter( "${templates_prefix}elements/entity-single.php", 'load_cd_template', 11, 1 );
// add_filter( "${templates_prefix}entity-list.php", 'load_cd_template', 11, 1 );
// add_filter( "${templates_prefix}entity-list.php", 'load_cd_template', 11, 1 );


function load_cd_template( string $template ):string {
    // get name of current filter
    // Will look something like: "community_directory_template_location-list.php"
    $current = current_filter();
    $file = substr( $current, strlen( ClassPublic::get_template_hook_prefix() ) );

    return get_template_directory() . '/templates/' . $file;
}

/**
 * Register our sidebars and widgetized areas.
 *
 */
function priemuses_widgets_init() {

    register_sidebar( array(
        'name'          => 'Home Page',
        'id'            => 'home_page_widget',
        'before_widget' => '<div class="home-widget">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="rounded">',
        'after_title'   => '</h2>',
    ) );

}
add_action( 'widgets_init', 'priemuses_widgets_init' );

add_action( 'wp_enqueue_scripts', 'priemuses_load_scripts' );
function priemuses_load_scripts() {

    $suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

    $assets_uri = get_stylesheet_directory_uri() . '/assets';
    
    wp_enqueue_style( 'priemuses-base-style', get_stylesheet_uri() , wp_get_environment_type() == 'production' ? PRIE_MUSES_VERSION : date("ymd-Gis"), 'all' );
    wp_enqueue_style( 'priemuses-style', "$assets_uri/css/style.css" , wp_get_environment_type() == 'production' ? PRIE_MUSES_VERSION : date("ymd-Gis"), 'all' );
    wp_enqueue_style( 'bootstrap', "$assets_uri/css/bootstrap" . $suffix . '.css' , wp_get_environment_type() == 'production' ? PRIE_MUSES_VERSION : date("ymd-Gis"), 'all' );
    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'priemuses-js', "$assets_uri/js/site.js", wp_get_environment_type() == 'production' ? PRIE_MUSES_VERSION : date("ymd-Gis"), 'all' );
    wp_localize_script( 'priemuses-js', 'pm_reCaptcha',
            array(
                'key_v2' => defined('RECAPTCHA_V2_KEY') ? RECAPTCHA_V2_KEY : '',
                'key_v3' => defined('RECAPTCHA_V3_KEY') ? RECAPTCHA_V3_KEY : '',
            )
        );
}



add_action( 'wp_footer', 'priemuses_footer_scripts' );
function priemuses_footer_scripts() {
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

add_filter( 'document_title_separator', 'priemuses_document_title_separator' );
function priemuses_document_title_separator( $sep ) {
    $sep = '|';
    return $sep;
}

add_filter( 'the_title', 'priemuses_title' );
function priemuses_title( $title ) {
    if ( $title == '' ) {
        return '...';
    } else {
        return $title;
    }
}


add_filter( 'intermediate_image_sizes_advanced', 'priemuses_image_insert_override' );
function priemuses_image_insert_override( $sizes ) {
    unset( $sizes['medium_large'] );
    return $sizes;
}

add_action( 'wp_head', 'priemuses_pingback_header' );
function priemuses_pingback_header() {
    if ( is_singular() && pings_open() ) {
        printf( '<link rel="pingback" href="%s" />' . "\n", esc_url( get_bloginfo( 'pingback_url' ) ) );
    }
}

function priemuses_custom_pings( $comment ) {
    ?>
    <li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
    <?php
}

function my_wp_nav_menu_args( $args = '' ) {
    if( is_user_logged_in() ) { 
        $args['menu'] = 'logged-in';
    } else { 
        $args['menu'] = 'logged-out';
    } 
    return $args;
}
add_filter( 'wp_nav_menu_args', 'my_wp_nav_menu_args' );

function my_acf_google_map_api( $api ){
    
    $api['key'] = GOOGLE_API_KEY;

    
    return $api;
    
}

add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');

class SentryErrorHandler {
    public function handle_exception( \WP_Error $error ):int {
        \Sentry\captureException( $error );
    }
}

function register_sentry_error_handler( $class_instance, string $register_method ) {
    $class_instance::{$register_method}( new SentryErrorHandler() );
}

add_action( 'community_directory_register_error_handler', 'register_sentry_error_handler', 10, 2 );

function add_nonce_to_script( $tag, $handle, $source ) {
    $nonce_generator = NonceGenerator::get_instance();
    
    $search = '/(src=\'[^\']+\')/';
    $replace = '$1 nonce="' . $nonce_generator->get_nonce() . '"';
    $subject = $tag;

    $output = preg_replace( $search, $replace, $subject);
    return $output;
}

add_filter( 'script_loader_tag', 'add_nonce_to_script', 10, 3 );
