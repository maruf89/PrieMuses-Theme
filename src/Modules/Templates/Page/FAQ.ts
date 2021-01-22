export default function initFAQ():boolean {
    const $FAQ = document.getElementById('FAQ');

    if (!$FAQ) return false;

    jQuery($FAQ).on('click', 'h3', event => { jQuery(event.target).toggleClass('toggled'); })
    
    return true;
}