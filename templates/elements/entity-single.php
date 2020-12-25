<?php

$entity = $args[ 'entity' ];
$photo = $entity->get_featured();
?>

<div class="entity col-xs-12 col-md-4 p-3 mb-3">
    <a href="<?= $entity->get_display_link( $entity ) ?>">
    	<?php if ( !empty( $photo ) ): ?>
	    	<div class="img-container" style="background: url(<?= $photo ?>) no-repeat center;">
	            <img class="d-none d-sm-none" src="<?= $photo ?>" />
	        </div>
	    <?php endif; ?>
    <div class="card p-3">
        <h4 class="m-0"><?= $entity->get_acf_location_name() ?>
    </div>
    </a>
</div>