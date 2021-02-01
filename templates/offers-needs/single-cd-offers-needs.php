<?php

use Maruf89\CommunityDirectory\Includes\instances\OfferNeed;

global $post;
$instance = OfferNeed::get_instance( null, null, $post );
$single_template = $args[ 'single_template' ];

get_header();

?>

    <main id="content" class="container on-preview">
        <?php load_template( $single_template, false, array(
                'instance' => $instance,
            ) );
        ?>
    </main>

<?php get_footer(); ?>