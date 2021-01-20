<?php
// Loads the entity as a single box
$instance = $args[ 'instance' ];
$search = $args[ 'search' ];
$st = pm_template_styles( 'card' );

?>

<div class="col-6 col-md-4">
    <a class="search-entity search-result" href="<?= $instance->get_display_link( $instance ) ?>">
        <?php load_from_templates( 'inc/listing-img', [ 'photo' => $instance->get_acf_picture() ] ); ?>
        <div class="<?= $st[ 'outer' ] ?> text-wrap">
            <h4 class="title"><?= $instance->get_acf_location_name() ?>
        </div>
    </a>
</div>