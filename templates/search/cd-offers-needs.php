<?php // Individual Offer Need result

$instance = $args[ 'instance' ];
// TODO: add highlighting
$search = $args[ 'search' ] ?? '';
$hide_location = $args[ 'hide_location' ] ?? false;
$hide_product_service = $args[ 'hide_product_service' ] ?? false;

if ( !$hide_location ) $location = $instance->get_location();
?>

<div class="on search-result block">
    <a href="<?= $instance->get_link() ?>" title="<?= $instance->post_title ?>">
        <?php load_from_templates( 'inc/listing-img', [ 'photo' => $instance->get_acf_image() ] ); ?>
    </a>

    <div class="card p-3">
        <div class="copy">
            <a href="<?= $instance->get_link() ?>" title="<?= $instance->post_title ?>" class="main-link">
                <h5 class="title"><?= $instance->post_title ?></h5>
                <p class="excerpt"><?= trim_copy( $instance->get_acf_description() ) ?></p>
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