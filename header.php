<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="//gmpg.org/xfn/11">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php //wp_body_open hook if WordPress 5.2
    if ( function_exists( 'wp_body_open' ) ) { wp_body_open(); } ?>
<a class="screen-reader-text" href="#content" title="<?php esc_attr_e( 'Skip to content', 'prie-muses' ); ?>"><?php _e( 'Skip to content', 'prie-muses' ); ?></a>
<div class="container-fluid main-content">
    <header class="page-header container">
        <div class="row">
            <section id="masthead" class="col-xs-12 col-md-8" role="banner">
                <div class="hgroup">
                    <h1 class="site-title"><a href="<?php esc_url( home_url( '/' ) ); ?>/"><?php bloginfo('name'); ?></a></h1>
                    <h2 class="site-description"><?php bloginfo('description'); ?></h2>
                </div>
            </section>
        </div>
    </header>
        <section class="access row" role="navigation">
            <div class="container">
                <div class="row">
                    <div class="screen-reader-text">
                        <a href="#content" title="<?php esc_attr_e( 'Skip to content', 'prie-muses' ); ?>"><?php esc_html_e( 'Skip to content', 'prie-muses' ); ?></a>
                    </div>
                    <nav id="nav" class="nav-wrapper container">
                        <div class="row">
                            <div class="col-md-8">
                                <?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
                            </div>

                            <div class="search-wrapper col-md-4">
                                <?php get_template_part( 'templates/search', null, [ 'primary' => true ] ); ?>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </section>
