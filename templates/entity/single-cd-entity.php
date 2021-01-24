<?php

use Maruf89\CommunityDirectory\Includes\ClassACF;

get_header();

global $post;

$entity = apply_filters( 'community_directory_get_entity', $post->ID, $post->post_author, $post );
$entity_id = $entity->post_id;
$photo = $entity->get_featured();

?>

    <main id="content" class="container">
        <div class="row mb-5">
            <?php if ( !empty( $photo ) ): ?>
                <div class="col-xs-12 col-sm-12 profile-row">
                    <div class="profile-div" style="background: url(<?= $entity->get_featured() ?>) no-repeat center;">
                        <img src="<?= $entity->get_featured() ?>" class="d-none" />
                    </div>
                </div>
            <?php endif; ?>
            <div class="col-xs-12 col-sm-12 text-center mb-3">
                <div class="row">
                    <div class="col-sm-6 m-auto">
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
            <div class="col-xs-12 col-sm-6 m-auto">
                <h2><?= __( 'Preferred Method of Contact', 'community-directory' ) ?></h2>
                <p><?= $entity->get_acf_contact_method() ?></p>
                <?php if ( !empty( $entity->get_acf_email() ) ): ?>
                    <p><b><?= __( 'Contact Email', 'community-directory' ) ?>:</b> <?= $entity->get_acf_email(); ?></p>
                <?php endif; ?>
                <?php if ( !empty( $entity->get_acf_tel() ) ): ?>
                    <p><b><?= __( 'Contact Telephone', 'community-directory' ) ?>:</b> <?= $entity->get_acf_tel(); ?></p>
                <?php endif; ?>
                <?php if ( !empty( $entity->get_acf_website() ) ): ?>
                    <p><b><?= __( 'Website', 'community-directory' ) ?>:</b> <?= $entity->get_acf_website(); ?></p>
                <?php endif; ?>
                <?php if ( !empty( $entity->get_acf_facebook() ) ): ?>
                    <p><b><?= __( 'Facebook', 'community-directory' ) ?>:</b> <?= $entity->get_acf_facebook(); ?></p>
                <?php endif; ?>
            </div>
        </div>
        
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <h2 class="text-center mb-4"><?= __( 'Offers', 'community-directory' ) ?></h2>
                <?php do_shortcode( "[community_directory_list_offers_needs entity_id='$entity_id' type='offer' ]" ); ?>
            </div>
            <div class="col-xs-12 col-sm-6">
                <h2 class="text-center mb-4"><?= __( 'Needs', 'community-directory' ) ?></h2>
                <?php do_shortcode( "[community_directory_list_offers_needs entity_id='$entity_id' type='need' ]" ); ?>
            </div>
        </div>
    </main>

<?php get_footer(); ?>