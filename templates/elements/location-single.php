<?php $location = $args['location']; ?>

<a class="card cd-location photo" href="/<?= __( 'location', 'community-directory' ) . "/$location->slug" ?>">
    <div class="card-body text-center">
        <div class="img-container non-retina" style="background: url(<?= $location->get_featured( 'cd_thumb' ) ?>) no-repeat center;">
            <img class="d-none d-sm-none" src="<?= $location->get_featured( 'cd_thumb' ) ?>" />
        </div>
        <div class="img-container retina" style="background: url(<?= $location->get_featured( 'cd_thumb@2x' ) ?>) no-repeat center;">
            <img class="d-none d-sm-none" src="<?= $location->get_featured( 'cd_thumb@2x' ) ?>" />
        </div>
        <div class="text">
            <h4><?= $location->display_name ?></h4>
            <h5><?= sprintf( _n( '%d Inhabitant', '%d Inhabitants', $location->active_inhabitants, 'community-directory' ), $location->active_inhabitants ) ?></h5>
        </div>
    </div>
</a>