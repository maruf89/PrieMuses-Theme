<?php

/**
 * This file links the class file for the Theme and through it, any additional classes.
 * Functions should be added to the Theme Class, except for unusual circumstances.
 *
 * This Theme base code is intended for use in WordPress 5.0 or newer running on PHP 7.0 or newer.
 * If that condition doesn't match, the theme will output a warning and WordPress will revert back
 * to the default theme.
 */
if ( version_compare( $wp_version, '5.0', '<' ) || version_compare( PHP_VERSION, '7.0', '<' ) ) {
    require get_template_directory() . '/utilities/backcompat.php';
} else {
    /*
     * This lot auto-loads a class or trait just when you need it. You don't need to
     * use require, include or anything to get the class/trait files, as long
     * as they are stored in the correct folder and use the correct namespaces.
     *
     * See http://www.php-fig.org/psr/psr-4/ for an explanation of the file structure.
     */
    spl_autoload_register(
        function ( $class_name ) {
            if ( false !== strpos( $class_name, 'Maruf89\PrieMuses' ) ) {
                $classes_dir = realpath( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR . 'src';
                $class_file  = str_replace('\\', '/', str_replace( 'Maruf89\PrieMuses\\', DIRECTORY_SEPARATOR, $class_name ) ) . '.php';
                require_once $classes_dir . $class_file;
            }
        }
    );

    /**
     * Returns the Theme Instance
     *
     * @return Object Theme Object
     */
    if ( ! function_exists( 'PREFIX_theme' ) ) {
        function PREFIX_theme() {
            return Maruf89\PrieMuses\Theme::getInstance();
        }
    }
    PREFIX_theme();
    PREFIX_theme()->run();

    /**
     * $content_width is a WordPress requirement
     * https://codex.wordpress.org/Content_Width
     *
     * Customize this value for your website. (Referencing the max. width of the main
     * content column at desktop resolution.)
     *
     * @var int
     */
    $content_width = 600;
}

/**
 * Global function to easily load templates from the templates directory
 * 
 * @param   $file_name      string          The filename inside the templates directory, without .php
 * @param   $args           ?array          Optional arguments to pass
 * @param   $require_once   ?boolean        (default:false)
 * @param   $return         ?boolean        Whether we should return the value of the file, or not (default:false)
 */
function load_from_templates( string $file_name, array $args = [], bool $require_once = false, bool $return = false ) {
    $template_dir = apply_filters( 'priemuses_template_dir', '' );
    $_template_file = get_stylesheet_directory() . "$template_dir/$file_name.php";

    global $posts, $post, $wp_query, $wpdb, $wp, $user_ID;

	if ( is_array( $wp_query->query_vars ) )
		extract( $wp_query->query_vars, EXTR_SKIP );

	if ( isset( $s ) )
		$s = esc_attr( $s );

    if ( $return ) {
        if ( $require_once ) return require_once $_template_file;
        else return require $_template_file;
    }
    if ( $require_once ) return require_once $_template_file;
    else return require $_template_file;
}

/**
 * Returns an asset's path
 */
function asset( string $file, $type = 'image' ):string {
    return get_template_directory_uri() . "/assets/$type/$file";
}

function pm_template_styles( string $style_class = '' ):array {
    // Optional classes that can be applied to the cards
    $styles = array(
        // Loads Bootstrap Cards
        'card' => [
            'outer' => 'card',
            'inner' => 'card-body'
        ],
        // Default nothing
        '' => [
            'outer' => '',
            'inner' => ''
        ]
    );
    return $styles[ $style_class ];
}

function trim_copy( string $copy, int $limit = 100, bool $strip_tags = true, bool $ellipses = true ) {
    if ( $strip_tags ) $copy = strip_tags( $copy );
    $copy = trim( $copy );
    if ( strlen( $copy ) < $limit ) return $copy;
    $ellipses_symbol = $ellipses ? '…' : '';
    return trim( mb_substr( $copy, 0, $limit, 'utf8' ) ) . $ellipses_symbol;
}

function formatted_die( string $message, bool $footer = false, bool $header = false, bool $is_html = false ) {
    if ( $header ) get_header();
        ?>
        <main class="error death">
            <?= $is_html ? $message : "<h2>$message</h2>" ?>
        </main>
        <?php
    if ( $footer ) get_footer();
    die();
}

function required_ast( array $field_group ) {
    if ( $field_group[ 'required' ]): ?>
        <span class="required-ast">*</span>
    <?php endif;
}

// Deal with images uploaded from the front-end while allowing ACF to do it's thing
function my_acf_pre_save_post($post_id) {

    if ( !function_exists('wp_handle_upload') ) {
        require_once(ABSPATH . 'wp-admin/includes/file.php');
    }
    
    // Move file to media library
    $movefile = wp_handle_upload( $_FILES['my_image_upload'], array('test_form' => false) );
    
    // If move was successful, insert WordPress attachment
    if ( $movefile && !isset($movefile['error']) ) {
        $wp_upload_dir = wp_upload_dir();
        $attachment = array(
        'guid' => $wp_upload_dir['url'] . '/' . basename($movefile['file']),
        'post_mime_type' => $movefile['type'],
        'post_title' => preg_replace( '/\.[^.]+$/', ”, basename($movefile['file']) ),
        'post_content' => ”,
        'post_status' => 'inherit'
        );
        $attach_id = wp_insert_attachment($attachment, $movefile['file']);
        
        // Assign the file as the featured image
        set_post_thumbnail($post_id, $attach_id);
        update_field('my_image_upload', $attach_id, $post_id);
    
    }
    
    return $post_id;
    
}

add_filter('acf/pre_save_post' , 'my_acf_pre_save_post');