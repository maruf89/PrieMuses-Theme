<?php

use Maruf89\CommunityDirectory\Includes\{TaxonomyProductService, TaxonomyLocation, ClassOffersNeeds};
use Maruf89\CommunityDirectory\Includes\instances\OfferNeed;


$term = get_queried_object();
$source = $args[ 'source' ];

get_header(); ?>

<main class="container full-body">
    <article class="tax tax-ps row">
        <div class="col-12 col-sm-4">
            <?php load_from_templates( 'inc/taxonomy/categories_lists' ); ?>
        </div>
        <div class="col-12 col-sm-8">
            <div class="row">
                <?php
                $args = array(
                        'post_type'             => ClassOffersNeeds::$post_type,
                        'posts_per_page'        => 50,
                        'post_status'           => 'publish',
                        'tax_query'             => array(
                                                    array(
                                                        'taxonomy' => $source::$taxonomy,
                                                        'field'    => 'slug',
                                                        'terms'    => $term->slug,
                                                    ),
                                                ),
                        'ignore_sticky_posts'   => true
                    );
                $_posts = new WP_Query( $args );

                ?>
                <h1><?= $term->name ?></h1>
                <ul class="masonry spaced">
                    <?php
                    foreach ( $_posts->posts as $offer_need ) {
                        $instance = OfferNeed::get_instance( null, null, $offer_need );
                        load_from_templates( 'search/cd-offers-needs', [
                            'instance' => $instance,
                            'hide_product_service' => $source === TaxonomyProductService::class,
                            'hide_location' => $source === TaxonomyLocation::class
                        ] );
                    } ?>
                </ul>

                <?php wp_reset_postdata(); //important ?>
            </div>
        </div>
    </article>
</main>

<?php get_footer(); ?>