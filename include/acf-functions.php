<?php

define('ACF_USER_FIELDS_ID_KEY', 'acf_user_fields_id_key');
function get_acf_User_Fields_ID() {
    if ( !$ID = wp_cache_get( ACF_USER_FIELDS_ID_KEY ) ) {
        global $wpdb;

        if ( !$post = $wpdb->get_row( $wpdb->prepare(
            "SELECT ID, post_name
            FROM $wpdb->posts
            WHERE post_excerpt = 'user-fields'
            AND post_type = %s",
            ACFG_PT
        ) ) )
            return false;

        $ID = $post->ID;

        wp_cache_set( ACF_USER_FIELDS_ID_KEY, $ID );
    }

    return $ID;
}

define('ACF_USER_FIELDS_FIELDS_KEY', 'acf_user_fields_field_key');
/**
 * Returns the field names for each of the acf-fields under a parent id (default 'user fields')
 * 
 * @return array array of string field names
 */
function get_acf_User_Fields_field_names( $parent_ID = '' ) {
    if( empty( $parent_ID ) ) $parent_ID = get_acf_User_Fields_ID();

    if ( !$field_names = wp_cache_get( ACF_USER_FIELDS_FIELDS_KEY ) ) {
        global $wpdb;
        $field_names = array();

        foreach( $wpdb->get_results( $wpdb->prepare(
            "SELECT post_excerpt, post_name
            FROM $wpdb->posts
            WHERE post_parent = %d
            AND post_type = %s",
            $parent_ID,
            ACF_PT
        )) as $key => $field ) {
            $field_names[$field->post_excerpt] = $field->post_name;
        }

        wp_cache_set( ACF_USER_FIELDS_FIELDS_KEY, serialize($field_names));
    } else {
        dump('from cache');
        $field_names = unserialize( $field_names );
    }

    return $field_names;
}




