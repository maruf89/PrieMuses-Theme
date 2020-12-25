<?php

$entity = $args[ 'entity' ];
$photo = $entity->get_acf_picture();
if ( $photo ) {
    $non_retina = $photo[ 'sizes' ][ 'cd_thumb' ];
    $retina = $photo[ 'sizes' ][ 'cd_thumb@2x' ];
}
?>

<div class="entity col-xs-12 col-md-4 p-3 mb-3">
    <a href="<?= $entity->get_display_link( $entity ) ?>">
    	<?php if ( $photo ): ?>
	    	<div class="img-container non-retina" style="background: url(<?= $non_retina ?>) no-repeat center;">
	            <img class="d-none d-sm-none" src="<?= $non_retina ?>" />
	        </div>
            <div class="img-container retina" style="background: url(<?= $retina ?>) no-repeat center;">
                <img class="d-none d-sm-none" src="<?= $retina ?>" />
            </div>
	    <?php endif; ?>
    <div class="card p-3">
        <h4 class="m-0"><?= $entity->get_acf_location_name() ?>
    </div>
    </a>
</div>