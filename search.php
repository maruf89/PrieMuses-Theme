<?php get_header(); ?>
<main id="content">
	<?php if ( have_posts() ) : ?>
		<header class="header">
		<h1 class="entry-title"><?php printf( pmesc_html__( 'Search Results for: %s' ), get_search_query() ); ?></h1>
		</header>
		<?php while ( have_posts() ) : the_post(); ?>
			<?php get_template_part( 'entry' ); ?>
		<?php endwhile; ?>

		<?php get_template_part( 'nav', 'below' ); ?>

	<?php else : ?>

		<article id="post-0" class="post no-results not-found">
			<header class="header">
			<h1 class="entry-title"><?php pmesc_html_e( 'Nothing Found' ); ?></h1>
			</header>
			<div class="entry-content">
			<p><?php pmesc_html_e( 'Sorry, nothing matched your search. Please try again.' ); ?></p>
			<?php get_search_form(); ?>
			</div>
		</article>
	<?php endif; ?>
</main>
<?php get_sidebar(); ?>
<?php get_footer(); ?>