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

// Same as above except 
function return_from_templates( string $file_name, array $args = [], bool $require_once = false ) {
    $template_dir = apply_filters( 'priemuses_template_dir', '' );
    load_template( get_stylesheet_directory() . "$template_dir/$file_name.php", $require_once, $args );
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

function pm_walk_category_tree( ...$args ) {
    // The user's options are the third parameter.
    if ( empty( $args[2]['walker'] ) || ! ( $args[2]['walker'] instanceof Walker ) ) {
        $walker = new PMWalkerCategory;
    } else {
        /**
         * @var Walker $walker
         */
        $walker = $args[2]['walker'];
    }
    return $walker->walk( ...$args );
}

// Copied from wp_list_categories
function pm_list_categories( $args = '' ) {
    $defaults = array(
        'child_of'            => 0,
        'current_category'    => 0,
        'depth'               => 0,
        'echo'                => 1,
        'exclude'             => '',
        'exclude_tree'        => '',
        'feed'                => '',
        'feed_image'          => '',
        'feed_type'           => '',
        'hide_empty'          => 1,
        'hide_title_if_empty' => false,
        'hierarchical'        => true,
        'order'               => 'ASC',
        'orderby'             => 'name',
        'separator'           => '<br />',
        'show_count'          => 0,
        'show_option_all'     => '',
        'show_option_none'    => __( 'No categories' ),
        'style'               => 'list',
        'taxonomy'            => 'category',
        'title_li'            => __( 'Categories' ),
        'use_desc_for_title'  => 1,
    );
 
    $parsed_args = wp_parse_args( $args, $defaults );
 
    if ( ! isset( $parsed_args['pad_counts'] ) && $parsed_args['show_count'] && $parsed_args['hierarchical'] ) {
        $parsed_args['pad_counts'] = true;
    }
 
    // Descendants of exclusions should be excluded too.
    if ( true == $parsed_args['hierarchical'] ) {
        $exclude_tree = array();
 
        if ( $parsed_args['exclude_tree'] ) {
            $exclude_tree = array_merge( $exclude_tree, wp_parse_id_list( $parsed_args['exclude_tree'] ) );
        }
 
        if ( $parsed_args['exclude'] ) {
            $exclude_tree = array_merge( $exclude_tree, wp_parse_id_list( $parsed_args['exclude'] ) );
        }
 
        $parsed_args['exclude_tree'] = $exclude_tree;
        $parsed_args['exclude']      = '';
    }
 
    if ( ! isset( $parsed_args['class'] ) ) {
        $parsed_args['class'] = ( 'category' === $parsed_args['taxonomy'] ) ? 'categories' : $parsed_args['taxonomy'];
    }
 
    if ( ! taxonomy_exists( $parsed_args['taxonomy'] ) ) {
        return false;
    }
 
    $show_option_all  = $parsed_args['show_option_all'];
    $show_option_none = $parsed_args['show_option_none'];
 
    $categories = get_categories( $parsed_args );
 
    $output = '';
 
    if ( $parsed_args['title_li']
        && ( ! empty( $categories ) || ! $parsed_args['hide_title_if_empty'] )
    ) {
        if ( 'list' === $parsed_args['style'] )
            $output = '<li class="' . esc_attr( $parsed_args['class'] ) . '">' . $parsed_args['title_li'] . '<ul>';
        elseif ( 'form' === $parsed_args['style'] )
            $output = '<legend class="' . esc_attr( $parsed_args['class'] ) . '">' . $parsed_args['title_li'] . '</legend><div>';
    }
 
    if ( empty( $categories ) ) {
        if ( ! empty( $show_option_none ) ) {
            if ( 'form' === $parsed_args['style'] ) {
                $output .= '<span class="cat-item-none">' . $show_option_none . '</span>';
            } elseif ( 'list' === $parsed_args['style'] ) {
                $output .= '<li class="cat-item-none">' . $show_option_none . '</li>';
            } else {
                $output .= $show_option_none;
            }
        }
    } else {
        if ( ! empty( $show_option_all ) ) {
 
            $posts_page = '';
 
            // For taxonomies that belong only to custom post types, point to a valid archive.
            $taxonomy_object = get_taxonomy( $parsed_args['taxonomy'] );
            if ( ! in_array( 'post', $taxonomy_object->object_type, true ) && ! in_array( 'page', $taxonomy_object->object_type, true ) ) {
                foreach ( $taxonomy_object->object_type as $object_type ) {
                    $_object_type = get_post_type_object( $object_type );
 
                    // Grab the first one.
                    if ( ! empty( $_object_type->has_archive ) ) {
                        $posts_page = get_post_type_archive_link( $object_type );
                        break;
                    }
                }
            }
 
            // Fallback for the 'All' link is the posts page.
            if ( ! $posts_page ) {
                if ( 'page' === get_option( 'show_on_front' ) && get_option( 'page_for_posts' ) ) {
                    $posts_page = get_permalink( get_option( 'page_for_posts' ) );
                } else {
                    $posts_page = home_url( '/' );
                }
            }
 
            $posts_page = esc_url( $posts_page );
            if ( 'form' === $pargsed_args['style'] ) {
                "<label><input type='checkbox' name='cat_item_all' />$show_option_all</label>";
            } else if ( 'list' === $parsed_args['style'] ) {
                $output .= "<li class='cat-item-all'><a href='$posts_page'>$show_option_all</a></li>";
            } else {
                $output .= "<a href='$posts_page'>$show_option_all</a>";
            }
        }
 
        if ( empty( $parsed_args['current_category'] ) && ( is_category() || is_tax() || is_tag() ) ) {
            $current_term_object = get_queried_object();
            if ( $current_term_object && $parsed_args['taxonomy'] === $current_term_object->taxonomy ) {
                $parsed_args['current_category'] = get_queried_object_id();
            }
        }
 
        if ( $parsed_args['hierarchical'] ) {
            $depth = $parsed_args['depth'];
        } else {
            $depth = -1; // Flat.
        }
        $output .= pm_walk_category_tree( $categories, $depth, $parsed_args );
    }
 
    if ( $parsed_args['title_li'] && 'list' === $parsed_args['style']
        && ( ! empty( $categories ) || ! $parsed_args['hide_title_if_empty'] )
    ) {
        $output .= '</ul></li>';
    }
 
    /**
     * Filters the HTML output of a taxonomy list.
     *
     * @since 2.1.0
     *
     * @param string $output HTML output.
     * @param array  $args   An array of taxonomy-listing arguments.
     */
    $html = apply_filters( 'wp_list_categories', $output, $args );
 
    if ( $parsed_args['echo'] ) {
        echo $html;
    } else {
        return $html;
    }
}