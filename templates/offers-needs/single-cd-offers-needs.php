<?php

use  Maruf89\PrieMuses\Includes\CommunityDirectoryHelper as CD;

CD::plugin_required_page( true );

global $post;
$instance = CD::get('OfferNeed')::get_instance( null, null, $post );
$single_template = $args[ 'single_template' ] ?? apply_filters(
    "community_directory_template_offers-needs/offers-needs-single.php", ''
);

get_header();

?>

    <main id="content" class="container on-preview">
        <?php load_template( $single_template, false, array(
                'instance' => $instance,
            ) );
        ?>
    </main>

<?php get_footer(); ?>