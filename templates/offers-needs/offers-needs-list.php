<?php

$instances = $args[ 'instances' ];
$title = $args[ 'title' ] ?? '';
$type = $args[ 'attrs' ][ 'type' ];
$single_template = $args[ 'single_template' ];
$single_template_args = $args[ 'single_template_args' ];

?>

<section class="cd-offers-needs">
    <?= $title ?>
    <ul class="cd-<?= $type ?>-list">
        <?php foreach ( $instances as $index => $instance ) {
            load_template( $single_template, false, array_merge( array(
                'instance' => $instance,
                'index' => $index,
            ), $single_template_args, $args[ 'attrs' ] ) );
        } ?>
    </ul>
</section>