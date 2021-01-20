<?php

$instances = $args[ 'instances' ];
$type = $args[ 'attrs' ][ 'type' ];

$template_file = apply_filters( 'community_directory_template_offer-need/offer-need-single.php', '' );

?>

<section class="cd-offers-needs">
    <ul class="cd-<?= $type ?>-list">
        <?php foreach ( $instances as $index => $instance ) {
            load_template( $template_file, false, array(
                'instance' => $instance,
                'index' => $index,
                'type' => $type,
            ) );
        } ?>
    </ul>
</section>