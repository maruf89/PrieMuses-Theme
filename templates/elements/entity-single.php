<?php

$entity = $args[ 'entity' ];
$has_photo = $entity->get_acf_picture();
?>

<div class="entity col-xs-12 col-md-4 p-3 mb-3">
    <a href="<?= $entity->get_display_link( $entity ) ?>">
    	<?php if ( $photo ): ?>
	    	<div class="img-container non-retina" style="background: url(<?= $entity->get_featured( 'cd_thumb' ) ?>) no-repeat center;">
	            <img class="d-none d-sm-none" src="<?= $entity->get_featured( 'cd_thumb' ) ?>" />
	        </div>
            <div class="img-container retina" style="background: url(<?= $entity->get_featured( 'cd_thumb@2x' ) ?>) no-repeat center;">
                <img class="d-none d-sm-none" src="<?= $entity->get_featured( 'cd_thumb@2x' ) ?>" />
            </div>
	    <?php endif; ?>
    <div class="card p-3">
        <h4 class="m-0"><?= $entity->get_acf_location_name() ?>
    </div>
    </a>
</div>