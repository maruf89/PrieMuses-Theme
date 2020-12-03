<?php
// /* Template Name: EditProfile */

if (!is_user_logged_in()) {
    wp_redirect(wp_login_url("http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"));
}

$user_id = wp_get_current_user()->ID;
$post_id = 'user_' . $user_id;

$fields = community_directory_get_acf_fields();

$field_keys = array();
foreach ($edit_profile_fields_to_show as $field) {
    if (isset($fields[$field]))
        array_push($field_keys, $fields[$field]);
}

acf_form_head();
get_header(); ?>

<section class="row">
    <div class="container">
        <div class="row">
    <article id="content" class="col-xs-12 col-lg-12" role="main">
        <br />
        <br />
        <?php

            if ( have_posts() ) {
             
                the_post(); ?>
         
                <h2><?php the_title(); ?></h2>
         
                <?php

                acf_form(array(
                    'post_id' => $post_id,
                    'fields' => $field_keys,
                    'submit_value' => 'Atnaujinkit',
                    'updated_message' => 'Atnaujinta!'
                ));
            }
        ?>

        


    </article>
</div>
</div>
</section>

    <?php get_footer(); ?>