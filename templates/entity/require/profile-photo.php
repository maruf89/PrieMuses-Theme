<?php
    $featured = $entity->get_featured();
    $default_photo = asset( 'default-entity.jpg' );
    if ( empty( $featured ) ) $featured = $default_photo;
?>
<div class="p-profile field-recipient"
     style="background: url(<?= $featured ?>) no-repeat center;"
     id="profilePhoto"
     data-default-photo="<?= $default_photo ?>"
     data-field-type="image"
     data-background-style="true"
     data-key="<?= $cdAcf::$entity_picture_key ?>">
    <?php // img included for SEO ?>
    <img src="<?= $featured ?>" />
</div>