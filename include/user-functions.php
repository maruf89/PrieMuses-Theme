<?php

function get_user_by_name_and_place($name, $place) {

    global $wpdb;
    $_meta = $wpdb->usermeta;

    if ( ! $user = $wpdb->get_row( $wpdb->prepare(
        "SELECT meta1.user_id
        FROM $_meta AS meta1
        INNER JOIN $_meta AS meta2
        ON meta1.user_id = meta2.user_id
        WHERE meta1.meta_key = %s
        AND meta1.meta_value = %s
        AND meta2.meta_key = %s
        AND meta2.meta_value = %s",
        HOME_NAME,
        $name,
        MY_PLACE,
        $place
    ) ) )
        return false;

    return get_user_by('ID', $user->user_id);
}

function list_users_by_place($my_place, $li_class = 'li-user') {
    $user_query = new WP_User_Query( array(
        'meta_key' => MY_PLACE,
        'meta_value' => $my_place
    ));

    if ( ! empty( $user_query->get_results() ) ) {
        foreach ( $user_query->get_results() as $user ):
            $name = get_user_meta($user->ID, HOME_NAME, true);
            $url = $my_place . '/' . urlencode($name);
            ?>
            <li class="<?php echo $li_class; ?>">
                <a href="/<?php echo $url ?>"><?php echo $name; ?></a>
            </li>
        <?php endforeach;
    } else {
        echo 'No users found.';
    }
}

function get_user_fields($uri_parts = null) {
    $user = !is_null($uri_parts) ? get_user_by_name_and_place(
            $uri_parts[NAME],
            $uri_parts[PLACE]
        ) : wp_get_current_user();

    if (!$user) return false;

    $meta = get_user_meta($user->ID);

    $return_arr = array();
    foreach ($meta as $key => $val) $return_arr[$key] = $val[0];
    return $return_arr;
}