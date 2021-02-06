<?php

$instances = $args[ 'instances' ];
$single_template = $args[ 'single_template' ];
$classes = $args[ 'classes' ] ?? '';

?>

<ul class="row location-list <?= $classes ?>">
    <?php foreach ( $instances as $instance ): ?>
        <?php
            load_template( $single_template, false, array(
                'instance' => $instance,
                'style_class' => 'card'
            ) );
        ?>
    <?php endforeach; ?>
</ul>