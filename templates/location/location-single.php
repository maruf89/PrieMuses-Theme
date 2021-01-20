<?php

$instance = $args[ 'instance' ];
$style = $args[ 'style_class' ] ?? '';
$st = pm_template_styles( $style );

if ( $photo = $instance->get_featured( 'cd_thumb' ) )
    $photo = [
        'non_retina' => $photo,
        'retina' => $instance->get_featured( 'cd_thumb@2x' ),
    ];

?>

<a class="<?= $st[ 'outer' ] ?> cd-instance"
   href="/<?= __( 'location', 'community-directory' ) . "/$instance->slug" ?>"
   >
    <div class="<?= $st[ 'inner' ] ?> text-center">
        <?php load_from_templates( 'inc/listing-img', [ 'photo' => $photo ] ); ?>
        <div class="text">
            <h4><?= $instance->display_name ?></h4>
            <h5><?= sprintf( _n( '%d Inhabitant', '%d Inhabitants', $instance->active_inhabitants, 'community-directory' ), $instance->active_inhabitants ) ?></h5>
        </div>
    </div>
</a>