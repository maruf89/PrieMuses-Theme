<?php

$instances = $args[ 'instances' ];
$single_template = $args[ 'single_template' ];

?>

<ul class="row location-list">
    <?php foreach ( $instances as $instance ): ?>
        <li class="col-6 p-2">
            <?php
                load_template( $single_template, false, array(
                	'instance' => $instance,
                	'style_class' => 'card'
                ) );
            ?>
        </li>
    <?php endforeach; ?>
</ul>