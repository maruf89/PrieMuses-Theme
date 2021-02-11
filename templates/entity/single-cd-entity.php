<?php

use  Maruf89\PrieMuses\Includes\CommunityDirectoryHelper as CD;

CD::plugin_required_page( true );

get_header();

global $post;

if ( $post ) {
    $entity = apply_filters( 'community_directory_get_entity', $post->ID, $post->post_author, $post );
    $is_current_user = get_current_user_id() == $entity->author_id;
} else {
    $is_current_user = true;
    $entity = CD::get('Entity')::get_active_entity();
}

if ( !$entity )
    formatted_die( sprintf( pm__( 'You must be %slogged in%s to see this page.' ), '<a href="/prisijunk">', '</a>' ), true );

$ACF = CD::get( 'ClassACF' );
$entity_id = $entity->post_id;
$photo = $entity->get_featured();

$default_or = pm__( 'Enter something here…' );
$e_or = function ( $either, string $or = null ) use ($default_or) {
    if ( !empty($either ) ) echo $either;
    else echo !isset( $or ) ? $default_or : $or;
}

?>

    <main class="container p-entity" id="entityPage">
        <?php if ( $is_current_user ): ?>
            <div class="edit-bar">
                <a href="<?= $entity->get_edit_link() ?>" class="trigger-edit btn-primary" id="triggerEdit">
                    <span class="disabled"><?= pm__( 'Edit Profile') ?></span>
                    <span class="enabled"><?= pm__( 'Save Changes' ) ?></span>
                </a>
            </div>
        <?php endif; ?>
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
                        <h1 class="field" data-type="post" data-value="post_title"><?= $entity->post_title ?></h1>
                        <div class="divider"></div>
                        <p class="field" data-type="meta" data-value="<?= $ACF = CD::get( 'ClassACF' ); ?>">
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
                <p class="<?= empty( $entity->get_acf_email() ) ? 'empty-field' : '' ?>">
                    <b><?= __( 'Contact Email', 'community-directory' ) ?>:</b> 
                    <a href="mailto:<?= $entity->get_acf_email(); ?>" class="hide-on-edit">
                        <?= $entity->get_acf_email(); ?>
                    </a>
                    <span class="field inline-block-on-edit" data-type="meta" data-field="<?= $ACF::$entity_email ?>">
                        <?= $e_or( $entity->get_acf_email() ); ?>
                    </span>
                </p>
                <p class="<?= empty( $entity->get_acf_tel() ) ? 'empty-field' : '' ?>">
                    <b><?= __( 'Contact Telephone', 'community-directory' ) ?>:</b> 
                    <span class="field" data-type="meta" data-field="<?= $ACF::$entity_tel ?>">
                        <?= $e_or( $entity->get_acf_tel() ); ?>
                    </span>
                </p>
                <p class="<?= empty( $entity->get_acf_website() ) ? 'empty-field' : '' ?>">
                    <b><?= __( 'Website', 'community-directory' ) ?>:</b> 
                    <a class="hide-on-edit" href="<?= $entity->get_acf_website(); ?>" target=_blank>
                        <?= $entity->get_acf_website(); ?>
                    </a>
                    <span class="field inline-block-on-edit" data-type="meta" data-field="<?= $ACF::$entity_facebook ?>">
                        <?= $e_or( $entity->get_acf_website() ) ?>
                    </span>
                </p>
                <p class="<?= empty( $entity->get_acf_facebook() ) ? 'empty-field' : '' ?>">
                    <b><?= __( 'Facebook', 'community-directory' ) ?>:</b> 
                    <a class="hide-on-edit" href="<?= $entity->get_acf_facebook(); ?>" target=_blank>
                        <?= $entity->get_acf_facebook(); ?>
                    </a>
                    <span class="field inline-block-on-edit" data-type="meta" data-field="<?= $ACF::$entity_facebook ?>">
                        <?= $e_or( $entity->get_acf_facebook() ) ?>
                    </span>
                </p>
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

        <div class="row mb-5 map-row">
            <div class="col-12">
                <?php do_shortcode( "[community_directory_list_entities type='map' entity_id='$post->ID' ]" ); ?>
            </div>
        </div>
    </main>

<?php get_footer(); ?>