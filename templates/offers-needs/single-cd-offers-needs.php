<?php

use Maruf89\CommunityDirectory\Includes\instances\OfferNeed;

global $post;
$instance = OfferNeed::get_instance( null, null, $post );
$template_file = apply_filters( 'community_directory_template_offers-needs/offers-needs-single.php', '' );

get_header();

?>

    <main id="content" class="container on-preview">
        <?php load_template( $template_file, false, array(
                'instance' => $instance,
            ) );
        ?>
    </main>

<?php get_footer(); ?>