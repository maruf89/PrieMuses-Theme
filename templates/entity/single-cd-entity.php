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
    formatted_die(
        sprintf( pm__( 'You must be %slogged in%s to see this page.' ), '<a href="/prisijunk">', '</a>' ),
        true
    );

// Get the Community Directory ACF Class which contains the field keys as static variables
$cdAcf = CD::get( 'ClassACF' );
$entity_id = $entity->post_id;
$photo = $entity->get_featured();
$editable = $is_current_user;

$default_or = pm__( 'Enter something here…' );
$e_or = function ( $either, string $or = null ) use ($default_or) {
    if ( !empty($either ) ) echo $either;
    else echo !isset( $or ) ? $default_or : $or;
}

?>

    <main class="container p-entity" id="entityPage">
        <?php if ( $editable ): ?>
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
                    <?php require 'require/profile-photo.php'; ?>
                </div>
            <?php endif; ?>
            <div class="col-12 col-md-12 text-center mb-3">
                <div class="row">
                    <div class="col-12 col-sm-10 col-md-6 m-auto format-html">
                        <?php require 'require/profile-intro.php'; ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mb-5 text-center">
            <div class="col-12 col-md-6 m-auto">
                <?php require 'require/profile-contact-methods.php'; ?>
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

        <?php require 'require/profile-share-location.php' ?>
    </main>

<?php get_footer(); ?>