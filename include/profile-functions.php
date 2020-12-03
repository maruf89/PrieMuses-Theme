<?php

define('MY_PLACE', 'my_place');
define('HOME_NAME', 'home_name');
define('PROFILE_PIC', 'profile_picture');
define('PROFILE_ACTIVE', 'profile_active');
define('ABOUT_US', 'about_us');
define('ACCEPT_VISITORS', 'accept_visitors');
define('OFFERING', 'offering');
define('VISITING_INFO', 'visiting_info');
define('DIRECTIONS', 'directions');
define('CONTACT_INFO', 'contact_info');
define('NAME', 'name');
define('PLACE', 'place');

// Advanced Custom Field Post Type
define('ACF_PT', 'acf-field');
define('ACFG_PT', 'acf-field-group');

// Ordered list of fields to show on edit
global $edit_profile_fields_to_show;
// $edit_profile_fields_to_show = array(
//     MY_PLACE,
//     HOME_NAME,
//     PROFILE_PIC,
//     PROFILE_ACTIVE,
//     ABOUT_US,
//     ACCEPT_VISITORS,
//     VISITING_INFO,
//     DIRECTIONS,
//     OFFERING,
//     CONTACT_INFO
// );
$edit_profile_fields_to_show = array(
    'profile_active',
    'location_name',
    'profile_picture',
    'user_about',
);