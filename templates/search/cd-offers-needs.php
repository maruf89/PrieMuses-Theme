<?php // Individual Offer Need result

$instance = $args[ 'instance' ];
$search = $args[ 'search' ];
$photo = $instance->get_acf_image();
if ( $photo ) {
    $non_retina = $photo[ 'sizes' ][ 'cd_thumb' ];
    $retina = $photo[ 'sizes' ][ 'cd_thumb@2x' ];
}
?>

<div class="on col-xs-12 col-md-5 p-3 mb-3">
    <a class="search-result" href="<?= $instance::get_display_link( $instance ) ?>">
        <?php if ( $photo ): ?>
            <div class="img-container non-retina" style="background: url(<?= $non_retina ?>) no-repeat center;">
                <img class="d-none d-sm-none" src="<?= $non_retina ?>" />
            </div>
            <div class="img-container retina" style="background: url(<?= $retina ?>) no-repeat center;">
                <img class="d-none d-sm-none" src="<?= $retina ?>" />
            </div>
        <?php endif; ?>

        <div class="card p-3">
            <div class="copy">
                <h5 class="title"><?= $instance->post_title ?></h5>
                <div class="excerpt"><?= $instance->get_acf_description() ?></div>
            </div>
        </div>
        
    </a>
</div>