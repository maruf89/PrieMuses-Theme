<?php
// Loads the entity as a single box
$instance = $args[ 'instance' ];
$style = $args[ 'style_class' ] ?? '';
$st = pm_template_styles( $style );

?>

<a class="single" href="<?= $instance->get_link() ?>">
    <?php load_from_templates( 'inc/listing-img', [ 'photo' => $instance->get_acf_picture() ] ); ?>
    <div class="<?= $st[ 'outer' ] ?> text-wrap">
        <h4 class="title"><?= $instance->get_acf_location_name() ?>
    </div>
</a>