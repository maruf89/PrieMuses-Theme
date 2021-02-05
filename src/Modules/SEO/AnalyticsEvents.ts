import { gaElem } from 'ThirdParty/GAnalytics/customTracking.ts';

export function init() {
    if (!cdData || !cdData.events) return;

    // @ts-ignore
    window.addEventListener(cdData.events.map.popupOpen, trackMapEvent);
    // @ts-ignore
    window.addEventListener(cdData.events.map.popupClose, trackMapEvent);
}

function trackMapEvent({ detail }) {
    const { $element, e } = detail;
    const target = $element.find('[data-ga-event]').first();
    if (target.length) gaElem(target);
}