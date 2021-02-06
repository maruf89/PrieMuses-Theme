<?php

$instance = $args[ 'instance' ];
$style = $args[ 'style_class' ] ?? '';
$is_map = $args[ 'is_map' ] ?? false;
$st = pm_template_styles( $style );

if ( $is_map )
    $tags = 'data-ga-event="map interaction"
             data-ga-params=\'{"action":"popup",
                               "type": "location",
                               "value": "' . $instance->slug . '"
                              }\'';

if ( $photo = $instance->get_featured( 'cd_thumb' ) )
    $photo = [
        'non_retina' => $photo,
        'retina' => $instance->get_featured( 'cd_thumb@2x' ),
    ];

?>
<li class="block single">
    <a class="<?= $st[ 'outer' ] ?> cd-instance"
    <?= $tags ?? '' ?>
    href="<?= $instance->get_display_link() ?>"
    >
        <div class="<?= $st[ 'inner' ] ?> text-center">
            <?php load_from_templates( 'inc/listing-img', [ 'photo' => $photo ] ); ?>
            <div class="text">
                <h4><?= $instance->display_name ?></h4>
                <h5><?= sprintf( _n( '%d Inhabitant', '%d Inhabitants', $instance->active_inhabitants, 'community-directory' ), $instance->active_inhabitants ) ?></h5>
            </div>
        </div>
    </a>
</li>