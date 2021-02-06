<?php

/**
 * Lists entities
 */

$instances = $args[ 'instances' ];

$single_template = $args[ 'single_template' ];
$single_template_args = $args[ 'single_template_args' ] ?? [];
$classes = $args[ 'classes' ] ?? '';

?>

<ul class="entity-list <?= $classes ?>">
    <?php foreach ( $instances as $index => $instance ): ?>
        <?php load_template(
                    $single_template,
                    false,
                    array_merge(
                        array(
                            'instance' => $instance,
                            'index' => $index,
                            'style_class' => 'card',
                        ),
                        $single_template_args,
                    )
                );
        ?>
    <?php endforeach; ?>
</ul>