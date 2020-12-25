<?php get_header(); ?>

<div class="container">
    <main id="content" class="row content">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <div class="entry-content">
                <?php if ( has_post_thumbnail() ) { the_post_thumbnail(); } ?>
                <?php the_content(); ?>
                <div class="entry-links"><?php wp_link_pages(); ?></div>
            </div>
        </article>
    <?php endwhile; endif; ?>
    </main>
</div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>