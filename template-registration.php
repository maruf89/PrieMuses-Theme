<?php
// /* Template Name: Register */

if (is_user_logged_in()) {
    wp_redirect('/redaguok');
}

get_header(); ?>

<section class="row">
    <article id="content" class="col-xs-12 col-sm-9 col-md-6 mr-auto ml-auto" role="main">

        <?php the_content(); ?>

    </article>
</section>

<?php get_footer(); ?>
