<nav id="nav" class="container header-nav">
    <div class="row">
        <div class="col-5 col-md-8">
            <label for="mobileHamburger" class="hamburger d-md-none">
                <span class="icon dashicons dashicons-menu center"></span>
                <span class="center text"><?= pm__( 'Menu') ?></span>
            </label>
            <?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
        </div>

        <div class="search-wrapper col-7 col-md-4">
            <?php load_from_templates( 'inc/search/search-bar', [ 'primary' => true ], false ); ?>
            <?php load_from_templates( 'inc/search/search-overlay', [], true ); ?>
        </div>
    </div>
</nav>