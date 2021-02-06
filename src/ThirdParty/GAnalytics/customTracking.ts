const can = () => !!window.gtag;
let $:JQueryStatic;

export function init(_$:JQueryStatic) {
    $ = _$;
    if (!can()) return;
    
    $(document.body).on('click', '.gtag', e => {
        if (e.target === e.currentTarget) gaElem(e.target);
    });
}

export const gaElem = !can() ? () => {} : ( elem:HTMLElement ) => {
    const data = $(elem).data();
    const command = data.gaCommand || 'event';
    const eventName = data.gaEvent;
    const params = data.gaParams || {};

    if (!eventName) {
        console.error('Invalid gaElem call using:', data);
        return;
    }

    // console.log( 'gaElem()', command, eventName, params );
    gtag(command, eventName, params);
}

export const gaTrack = !can() ? () => {} : (eventName:string, params:{} = {}, command:string = 'event') => {
    // console.log( 'gaTrack()', command, eventName, params );
    gtag(command, eventName, params);
}