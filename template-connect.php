<?php
/* Template Name: Connect */
// Register/login

if (is_user_logged_in()) {
    wp_redirect('/wp-admin');
}

$register_title = pm__( "Don't have an account?", 'priemuses' );
$register = pm__( 'Register', 'priemuses' );
$login_title = pm__( 'Already have an account?', 'priemuses' );
$login = pm__( 'Log in', 'priemuses' );

get_header(); ?>

<section class="row p-connect" id="pageConnect">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <label class="nav-link active" for="registerTab"><?= $register ?></label>
        </li>
        <li class="nav-item">
            <label class="nav-link" for="loginTab"><?= $login ?></label>
        </li>
    </ul>
    
    <input type="radio" id="registerTab" checked class="d-none tab-select" name="tab" />
    <?= do_shortcode( "[uwp_register title='$register_title'
                                     form_title='$register'
                                     css_class='register'
                    ]");
    ?>
    <input type="radio" id="loginTab" class="d-none tab-select" name="tab" />
    <?= do_shortcode( "[uwp_login title='$login_title'
                                     form_title='$login'
                                     css_class='login'
                    ]");
    ?>

</section>

<?php get_footer(); ?>
