            </div>
            <footer class="container-fluid nav-footer" id="footer">
                <div class="container">
                    <div class="row" id="copyright">
                        <div class="col-12 foot-wrap">
                            <span class="copyright">
                                &copy; <?php echo esc_html( date_i18n( __( 'Y', 'blankslate' ) ) ); ?> <?php echo esc_html( get_bloginfo( 'name' ) ); ?>
                            </span>
                            <?php wp_nav_menu( array( 'theme_location' => 'footer-menu', 'menu' => 'footer' ) ); ?>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        <?php wp_footer(); ?>
    </body>
</html>