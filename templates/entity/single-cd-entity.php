<?php

use  Maruf89\PrieMuses\Includes\CommunityDirectoryHelper as CD;

CD::plugin_required_page( true );

get_header();

global $post;

$entity = apply_filters( 'community_directory_get_entity', $post->ID, $post->post_author, $post );
$entity_id = $entity->post_id;
$photo = $entity->get_featured();

?>

    <main id="content" class="container">
        <div class="row mb-5">
            <?php if ( !empty( $photo ) ): ?>
                <div class="col-12 col-md-12 profile-row">
                    <div class="profile-div" style="background: url(<?= $entity->get_featured() ?>) no-repeat center;">
                        <img src="<?= $entity->get_featured() ?>" class="d-none" />
                    </div>
                </div>
            <?php endif; ?>
            <div class="col-12 col-md-12 text-center mb-3">
                <div class="row">
                    <div class="col-12 col-sm-10 col-md-6 m-auto format-html">
                        <h1><?= $entity->post_title ?></h1>
                        <div class="divider"></div>
                        <p>
                            <?= $entity->get_acf_about() ?>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-5 text-center">
            <div class="col-12 col-md-6 m-auto">
                <h2><?= __( 'Preferred Method of Contact', 'community-directory' ) ?></h2>
                <p><?= $entity->get_acf_contact_method() ?></p>
                <?php if ( !empty( $entity->get_acf_email() ) ): ?>
                    <p>
                        <b><?= __( 'Contact Email', 'community-directory' ) ?>:</b> 
                        <a href="mailto:<?= $entity->get_acf_email(); ?>"><?= $entity->get_acf_email(); ?></a>
                    </p>
                <?php endif; ?>
                <?php if ( !empty( $entity->get_acf_tel() ) ): ?>
                    <p><b><?= __( 'Contact Telephone', 'community-directory' ) ?>:</b> <?= $entity->get_acf_tel(); ?></p>
                <?php endif; ?>
                <?php if ( !empty( $entity->get_acf_website() ) ): ?>
                    <p>
                        <b><?= __( 'Website', 'community-directory' ) ?>:</b> 
                        <a href="<?= $entity->get_acf_website(); ?>" target=_blank><?= $entity->get_acf_website(); ?></a>
                    </p>
                <?php endif; ?>
                <?php if ( !empty( $entity->get_acf_facebook() ) ): ?>
                    <p>
                        <b><?= __( 'Facebook', 'community-directory' ) ?>:</b> 
                        <a href="<?= $entity->get_acf_facebook(); ?>" target=_blank><?= $entity->get_acf_facebook(); ?></a>
                </p>
                <?php endif; ?>
                <?php if ( !empty( $entity->get_acf_youtube() ) ): ?>
                    <p>
                        <b><?= __( 'Youtube Channel', 'community-directory' ) ?>:</b> 
                        <a href="<?= $entity->get_acf_youtube(); ?>" target=_blank><?= $entity->get_acf_youtube(); ?></a>
                </p>
                <?php endif; ?>
            </div>
        </div>
        
        <div class="row mb-5">
            <div class="col-12 col-md-6">
                <?php ob_start(); ?>
                    <h2 class="text-center mb-4"><?= _n( 'Offer', 'Offers', 3, 'community-directory' ) ?></h2>
                <?php $title = ob_get_clean(); ?>
                <?php do_shortcode( "[community_directory_list_offers_needs entity_id='$entity_id' title='$title' type='offer' ]" ); ?>
            </div>
            <div class="col-12 col-md-6">
                <?php ob_start(); ?>
                    <h2 class="text-center mb-4"><?= _n( 'Need', 'Needs', 3, 'community-directory' ) ?></h2>
                <?php $title = ob_get_clean(); ?>
                <?php do_shortcode( "[community_directory_list_offers_needs entity_id='$entity_id' title='$title' type='need' ]" ); ?>
            </div>
        </div>

        <?php if ( $entity->share_location() ): ?>
            <h3><?= pm__( 'Visiting Information' ) ?></h3>
                <?php if ( !empty( $entity->get_acf_visit_info() ) ): ?>
                    <p class="visit-info mb-3">
                        <?= $entity->get_acf_visit_info(); ?>
                    </p>
                <?php endif; ?>
                
            <div class="row mb-5 map-row">
                <div class="col-12">
                    <?php do_shortcode( "[community_directory_list_entities type='map' entity_id='$post->ID' ]" ); ?>
                </div>
            </div>
        <?php endif; ?>
    </main>

<?php get_footer(); ?>