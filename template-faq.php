<?php // /* Template Name: FAQ */ ?>

<?php get_header(); ?>

<main class="container faq" id="FAQ">
    <div id="content" class="row content">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <?php the_content(); ?>
            </article>
        <?php endwhile; endif; ?>
    </div>
</main>

<?php get_footer(); ?>