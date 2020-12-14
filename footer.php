            </div>
            <footer class="container-fluid nav-footer" id="footer">
                <div class="container">
                    <div class="row" id="copyright">
                        <div class="col-md-12">
                            &copy; <?php echo esc_html( date_i18n( __( 'Y', 'blankslate' ) ) ); ?> <?php echo esc_html( get_bloginfo( 'name' ) ); ?>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        <?php wp_footer(); ?>
    </body>
</html>