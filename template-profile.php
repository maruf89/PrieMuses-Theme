<?php
// /* Template Name: Profile */

if (!is_user_logged_in()) {
    wp_redirect(wp_login_url("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"));
}

get_header(); ?>

<section class="row">
    <article id="content" class="c12" role="main">
        <?php
            include( locate_template( 'content-user.php', false, false ) );
        ?>

    </article>
</section>

    <?php get_footer(); ?>