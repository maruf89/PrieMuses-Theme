<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="//gmpg.org/xfn/11">
<?php wp_head(); ?>
</head>
<body <?php body_class( 'preload' ); ?>>
<?php //wp_body_open hook if WordPress 5.2
    if ( function_exists( 'wp_body_open' ) ) { wp_body_open(); } ?>
<a class="screen-reader-text" href="#content" title="<?php esc_attr_e( 'Skip to content', 'prie-muses' ); ?>"><?php _e( 'Skip to content', 'prie-muses' ); ?></a>
<?php load_from_templates( 'inc/nav/mobile-nav-menu', [], true ); ?>
<div class="container-fluid main-content">
    <header class="page-header container d-none d-md-block">
        <div class="row">
            <section id="masthead" class="col-xs-12 col-md-8" role="banner">
                <div class="hgroup">
                    <?php ob_start() ?>
                        <a href="<?php esc_url( home_url( '/' ) ); ?>/"
                           class="gtag"
                           data-ga-event="click"
                           data-ga-params='{"value": "header homepage link", "from": "<?= $pagename ?>"}'><?php bloginfo('name'); ?></a>
                    <?php $title = ob_get_clean(); ?>
                    <h1 class="site-title">
                        <?php
                            $site_title = sprintf( pm__( 'Directory of Everyone %s' ), $title );
                            echo $site_title;
                        ?>
                    </h1>
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
                <?php load_from_templates( 'inc/nav/header-nav', [], true ); ?>
            </div>
        </div>
    </section>
    <div class="d-md-none mobile-site-title"><?= $site_title ?></div>
