<?php

$location = isset( $args[ 'location' ] ) ? $args[ 'location' ] : $args[ 'instance' ];
$style_class = isset( $args[ 'style_class' ] ) ? $args[ 'style_class' ] : '';

// Optional classes that can be applied to the cards
$styles = array(
    // Loads Bootstrap Cards
    'card' => [
        'outer' => 'card',
        'inner' => 'card-body'
    ],
    // Default nothing
    '' => [
        'outer' => '',
        'inner' => ''
    ]
);

$st = $styles[ $style_class ];

$non_retina = $location->get_featured( 'cd_thumb' );
if ( $non_retina ) $retina = $location->get_featured( 'cd_thumb@2x' );
?>

<a class="<?= $st[ 'outer' ] ?> cd-location photo"
   href="/<?= __( 'location', 'community-directory' ) . "/$location->slug" ?>"
   >
    <div class="<?= $st[ 'inner' ] ?> text-center">
        <?php if ( $non_retina ): ?>
            <div class="img-container non-retina" style="background: url(<?= $non_retina ?>) no-repeat center;">
                <img class="d-none d-sm-none" src="<?= $non_retina ?>" />
            </div>
            <div class="img-container retina" style="background: url(<?= $retina ?>) no-repeat center;">
                <img class="d-none d-sm-none" src="<?= $retina ?>" />
            </div>
        <?php endif; ?>
        <div class="text">
            <h4><?= $location->display_name ?></h4>
            <h5><?= sprintf( _n( '%d Inhabitant', '%d Inhabitants', $location->active_inhabitants, 'community-directory' ), $location->active_inhabitants ) ?></h5>
        </div>
    </div>
</a>