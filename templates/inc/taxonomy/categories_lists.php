<?php
use Maruf89\CommunityDirectory\Includes\{TaxonomyProductService, TaxonomyLocation, ClassOffersNeeds};
use Maruf89\PrieMuses\Modules\Category\PMListCategories;

$return = $return ?? false;

$default_args = array(
    'echo' => !$return,
    'depth' => 3,
    'show_count' => true,
);

$taxonomies = [
    'product_service' => [
        'taxonomy' => TaxonomyProductService::$taxonomy,
        'title_li' => __( 'Product Service Types', 'community-directory' )
    ],
    'location' => [
        'taxonomy' => TaxonomyLocation::$taxonomy,
        'title_li' => _x( 'Locations', 'search', 'community-directory' )
    ]
];

if ( isset( $args[ 'taxonomies' ] ) ) $taxonomies = array_intersect_key( $taxonomies, $args[ 'taxonomies '] );

$args = wp_parse_args( $args ?? [], $default_args );

$return_html = $return ? '' : null;

foreach ( $taxonomies as $key => $tax ) {
    $_args = $args;
    $_args[ 'taxonomy' ] = $tax[ 'taxonomy' ];
    $_args[ 'title_li' ] = $tax[ 'title_li' ];
    if ( $return ) $return_html .= PMListCategories::list( $_args );
    else PMListCategories::list( $_args );
}

if ( $return ) return $return_html;