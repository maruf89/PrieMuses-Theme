<?php

get_header();

?>

    <main id="content" class="container">
        <div class="row">
        <?php if ( is_active_sidebar( 'home_page_widget' ) ): ?>
            <section class="home-widget col-12 col-lg-9">
                <?php dynamic_sidebar( 'home_page_widget' ); ?>
            </section>
        <?php endif; if ( is_active_sidebar( 'home_page_sidebar_widget' ) ): ?>
            <aside class="home-aside col-12 col-lg-3">
                <?php dynamic_sidebar( 'home_page_sidebar_widget' ); ?>
            </aside>
        <?php endif; ?>
        </div>
    </main>

<?php get_footer(); ?>