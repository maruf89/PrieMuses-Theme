<?php
    $instance = $args[ 'instance' ];
    $type = $instance->get_acf_type();
    $hide_location = $args[ 'hide_location' ] ?? false;
    $hide_product_service = $args[ 'hide_product_service' ] ?? false;
    if ( !$hide_location ) $location = $instance->get_location();

    $type_type = __( 'Offer Type', 'community-directory' );
    if ( $type === 'need' ) $type_type = __( 'Type of Need', 'community-directory' );
?>

<li id="<?= $instance->get_id() ?>" class="cd-on-single card block">
    <div class="card-body">
        <h3 class="title"><?= $instance->post_title ?></h3>
        <?php if ( $instance->has_acf_image() ): ?>
            <figure class="on-img-head">
                <?= $instance->get_featured() ?>
            </figure>
        <?php endif; ?>
        <span class="tag product-or-service">
            <strong><?= $type_type ?>:</strong> <?= $instance->get_offer_need_type() ?>
        </span>
        <?php if ( !$hide_product_service ): ?>
            <span class="tag product-or-service-type">
                <strong><?= __( 'Category', 'community-directory' ) ?>:</strong> 
                <?= $instance->get_product_service_link( 'd-icon product-service' ) ?>
            </span>
        <?php endif; if ( !$hide_location ): ?>
            <span class="tag location">
                <strong><?= __( 'Location', 'community-directory' ) ?>:</strong>
                <a href="<?= $location->get_display_link() ?>" class="location d-icon">
                    <?= $location->display_name ?>
                </a>
            </span>
        <?php endif; ?>
        <span class="tag urgency">
            <strong><?= __( 'Urgency', 'community-directory' ) ?>:</strong> <?= $instance->get_urgency( true ) ?>
        </span>
        <p><?= $instance->get_acf_description() ?></p>
        <?php if ( $instance->has_acf_attachment() ): ?>
            <div class="acf-file-uploader on-attachment" data-library="uploadedTo" data-mime_types="pdf,jpeg,jpg,gif,png" data-uploader="wp">
                <h4><?= __( 'Additional Attachment', 'community-directory' ) ?></h4>
                <a href="<?= $instance->get_acf_attachment()[ 'url' ] ?>" target="_blank">
                    <div class="file-icon">
                        <img data-name="icon" src="/wp/wp-includes/images/media/document.png" alt="">
                    </div>
                </a>
            </div>
        <?php endif; ?>
    </div>
    
</li>