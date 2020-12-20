<?php

get_header();

?>

    <main id="content" class="container">
        <?php if ( is_active_sidebar( 'home_page_widget' ) ) { ?>

         <aside class="in-header widget-area right" role="complementary">
            <?php dynamic_sidebar( 'home_page_widget' ); ?>
         </aside>

        <?php } ?>
    </main>

<?php get_footer(); ?>