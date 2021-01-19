<?php
// /* Template Name: Register */

if (is_user_logged_in()) {
    wp_redirect('/redaguok');
}

get_header(); ?>

<section class="row registration">
    <article id="content" class="col-xs-12 col-sm-9 col-md-6 mr-auto ml-auto" role="main">

    	<h1><?= pm__( 'Registration' )?></h1>
    	<p class="reg-disclaimer"><?= pm__( 'Nothing that you post here will be made public, until you activate your profile upon successfull registration.' ) ?></p>

        <?php the_content(); ?>

    </article>
</section>

<?php get_footer(); ?>
