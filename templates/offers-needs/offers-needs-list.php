<?php

$instances = $args[ 'instances' ];
$title = $args[ 'title' ] ?? '';
$type = $args[ 'attrs' ][ 'type' ];
$single_template = $args[ 'single_template' ];
$single_template_args = $args[ 'single_template_args' ];

$classes = $args[ 'classes' ] ?? '';

?>

<section class="cd-offers-needs">
    <?= $title ?>
    <ul class="on-list <?= $classes ?>">
        <?php foreach ( $instances as $index => $instance ) {
            load_template( $single_template, false, array_merge( array(
                'instance' => $instance,
                'index' => $index,
            ), $single_template_args, $args[ 'attrs' ] ) );
        } ?>
    </ul>
</section>