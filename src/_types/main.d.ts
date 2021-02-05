// _types/main.d.ts

declare var window: any;
declare var pm: any;
declare var grecaptcha: any;
declare const cdData:cdData;

declare let jqXHR: any;

interface CDResponse {
	result: number,
	data?: any,
	message?: string
}

interface cdData {
    restBase:string
    ajaxUrl:string
    translations: {
        [name:string]:string
    }
    postType: {
        [name:string]:string
    }
    pages?: {
        [name:string]: {
            acf: { [name:string]:string }
        }
    }
    taxonomyType: {
        [name:string]:string
    }
    map: {
        accessToken:string
        defaultCoords:[number, number]
    },
    wp_nonce:string
    edit_others_entities:boolean,
    events: {
        [name:string]: {
            [name:string]:string
        }
    }
}