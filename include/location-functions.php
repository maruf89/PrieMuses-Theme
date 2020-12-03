<?php

define('UWP_FORM_FIELDS', 'wp_uwp_form_fields');

// Converts to lower case and replaces all letters to roman safe characters
function place_name_to_slug( $place ) {
    return strtolower( transliterate_string( $place ) );
}

// Capitalizes first letter of place name
function format_display_name( $place ) {
    return ucwords( strtolower( $place ) );
}

function list_places($ppp = -1, $li_class = 'li-place') {
    global $wpdb;
    foreach ( $wpdb->get_results( $wpdb->prepare(
            "SELECT DISTINCT meta_value FROM wp_usermeta WHERE meta_key=%s",
            MY_PLACE
    )) as $key => $row) :?>
        <li class="<?php echo $li_class; ?>">
            <a href="/<?php echo place_name_to_slug($row->meta_value); ?>/visi"><?php echo $row->meta_value; ?></a>
        </li>
    <?php endforeach;
}

define('ACF_MY_PLACE_CACHE_KEY', 'acf_my_place_key');
define('UWP_MY_PLACE_CACHE_KEY', 'uwp_my_place_key');

/**
 * Gets all of the places from the database;
 *
 * @param bool $entire_entry whether to return the entire row entry or just the location choices
 * @return array ACF row entry of places, or an array of just the places if $entire_entry is false
 */
function get_my_place_locations_ACF( $entire_entry = false ) {
    if ( !$data = wp_cache_get( ACF_MY_PLACE_CACHE_KEY ) ) {
        global $wpdb;

        if ( ! $post = $wpdb->get_row( $wpdb->prepare(
            "SELECT post_content
            FROM $wpdb->posts
            WHERE post_type = %s
            AND post_excerpt = %s",
            ACF_PT,
            MY_PLACE
        ) ) )
            return false;

        $data = $post->post_content;

        wp_cache_set(ACF_MY_PLACE_CACHE_KEY, $data);
    }

    $formatted = unserialize( $data );
    return $entire_entry ? $formatted : $formatted['choices'];
}

/**
 * Same thing as above but for Users WP
 */
function get_my_place_locations_UWP() {
    if ( !$data = wp_cache_get( UWP_MY_PLACE_CACHE_KEY ) ) {
        global $wpdb;
        if ( ! $post = $wpdb->get_row( $wpdb->prepare(
            "SELECT option_values
            FROM wp_uwp_form_fields
            WHERE htmlvar_name = %s",
            MY_PLACE
        ) ) )
            return false;

        $data = $post->option_values;
        wp_cache_set(UWP_MY_PLACE_CACHE_KEY, $data);
    }

    return explode(',', $data );
}

/**
 * Adds a new place to the places in the db
 * 
 * @param string $display_place display value of the village name
 * @return string the slug value
 */
function add_new_place( $display_place ) {
    $locations_row_acf = get_my_place_locations_ACF( true );

    // $place = place_name_to_slug( $display_place );

    $display = format_display_name( $display_place );
    $locations_row_acf['choices'][$display] = $display;
    
    update_my_place_locations_ACF( serialize( $locations_row_acf ) );
    update_my_place_locations_UWP( implode( ',', $locations_row_acf['choices'] ) );
}

function update_my_place_locations_ACF( $locations ) {
    global $wpdb;
    $wpdb->update(
        $wpdb->posts,
        array( 'post_content'=>$locations ),
        array( 'post_type' => ACF_PT, 'post_excerpt' => MY_PLACE )
    );
}

function update_my_place_locations_UWP( $locations ) {
    global $wpdb;
    $wpdb->update(
        UWP_FORM_FIELDS,
        array( 'option_values'=>$locations ),
        array( 'htmlvar_name' => MY_PLACE )
    );
}





