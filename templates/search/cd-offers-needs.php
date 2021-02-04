<?php // Individual Offer Need result

$instance = $args[ 'instance' ];
// TODO: add highlighting
$search = $args[ 'search' ] ?? '';
$hide_location = $args[ 'hide_location' ] ?? false;
$hide_product_service = $args[ 'hide_product_service' ] ?? false;

if ( !$hide_location ) $location = $instance->get_location();

$photo = $instance->get_acf_image();
if ( $photo ) {
    $non_retina = $photo[ 'sizes' ][ 'cd_thumb' ];
    $retina = $photo[ 'sizes' ][ 'cd_thumb@2x' ];
}
?>

<div class="on search-result">
    <a href="<?= $instance->get_link() ?>" title="<?= $instance->post_title ?>">
        <?php if ( $photo ): ?>
            <div class="img-container non-retina" style="background: url(<?= $non_retina ?>) no-repeat center;">
                <img class="d-none d-sm-none" src="<?= $non_retina ?>" />
            </div>
            <div class="img-container retina" style="background: url(<?= $retina ?>) no-repeat center;">
                <img class="d-none d-sm-none" src="<?= $retina ?>" />
            </div>
        <?php endif; ?>
    </a>

    <div class="card p-3">
        <div class="copy">
            <a href="<?= $instance->get_link() ?>" title="<?= $instance->post_title ?>" class="main-link">
                <h5 class="title"><?= $instance->post_title ?></h5>
                <div class="excerpt"><?= $instance->get_acf_description() ?></div>
            </a>
            <?php if ( !$hide_location ): ?>
                <a href="<?= $location->get_display_link() ?>"
                   title="<?= $location->display_name ?>"
                   class="location d-icon">
                    <?= $location->display_name ?>
                </a>
            <?php endif; if( !$hide_product_service ): ?>
                <?= $instance->get_product_service_link( 'product-service d-icon' ) ?>
            <?php endif; ?>
        </div>
    </div>
</div>