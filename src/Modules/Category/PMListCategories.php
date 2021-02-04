<?php

namespace Maruf89\PrieMuses\Modules\Category;

class PMListCategories {
    protected static function pm_walk_category_tree( ...$args ) {
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
    public static function list( $args = '' ) {
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
                $output = '<div class="' . esc_attr( $parsed_args['class'] ) . '"><legend>' . $parsed_args['title_li'] . '</legend><div>';
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
            $output .= static::pm_walk_category_tree( $categories, $depth, $parsed_args );
        }
     
        if ( $parsed_args['title_li']
            && ( ! empty( $categories ) || ! $parsed_args['hide_title_if_empty'] )
        ) {
            if ( 'list' === $parsed_args['style'] ) $output .= '</ul></li>';
            else if ( 'form' === $parsed_args['style'] ) $output .= '</div></div>';
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
}