<?php
// Loads the entity as a single box
$instance = $args[ 'instance' ];
$style = $args[ 'style_class' ] ?? '';
$is_map = $args[ 'is_map' ] ?? false;
$st = pm_template_styles( $style );

if ( $is_map )
    $tags = 'data-ga-event="map interaction"
             data-ga-params=\'{"action":"popup",
                               "type": "entity",
                               "value": "' . $instance->get_acf_location_name() . '"
                              }\'';

?>

<a class="single block" <?= $tags ?? '' ?> href="<?= $instance->get_link() ?>">
    <?php load_from_templates( 'inc/listing-img', [ 'photo' => $instance->get_acf_picture() ] ); ?>
    <div class="<?= $st[ 'outer' ] ?> text-wrap">
        <h4 class="title"><?= $instance->get_acf_location_name() ?>
    </div>
</a>