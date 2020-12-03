<?php

get_header();

$locations = community_directory_get_locations( true, true );

?>

    <main id="content" class="container">
        <ul class="row">
            <?php foreach ( $locations as $location ): ?>
                <li class="col-xs-12 col-md-6 p-2">
                    <a class="card" href="/<?= __( 'location', 'community-directory' ) . "/$location->slug" ?>">
                        <div class="card-body text-center">
                            <h4><?= $location->display_name ?></h4>
                            <div class="divider">&nbsp;</div>
                            <h5><?= sprintf( __( '%d Inhabitants ' ), $location->active_inhabitants ) ?></h5>
                        </div>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </main>

<?php get_footer(); ?>