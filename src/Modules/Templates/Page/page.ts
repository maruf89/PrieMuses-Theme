export default function init() {
    initConnect();
    initFAQ();
    addHashActiveClass();
}

function initFAQ():boolean {
    const $FAQ = document.getElementById('FAQ');

    if (!$FAQ) return false;

    jQuery($FAQ).on('click', 'h3', event => { jQuery(event.target).toggleClass('toggled'); })
    
    return true;
}

function initConnect():boolean {
    const $body = document.getElementById('pageConnect');

    if (!$body) return false;

    const $login = jQuery('.uwp-login-class');
    
    $login.find('.uwp-login-form')
        .attr('enctype', 'multipart/form-data')
        .attr('action', '/wp/wp-login.php');

    $login.find('#username').attr('id', 'user_login').attr('name', 'log');
    $login.find('#password').attr('id', 'user_pass').attr('name', 'pwd');

    const $navLinks = jQuery('.nav-link');
    jQuery($body).on('click', '.nav-link', event => {
        $navLinks.removeClass('active');
        jQuery(event.target).addClass('active');
    });

    return true;
}

/**
 * Adds an active class to any element matching the url's hash
 */
function addHashActiveClass() {
    if (!window.location.hash) return;
    const $el =  jQuery(window.location.hash);
    if ($el.length) $el.addClass('active');
}