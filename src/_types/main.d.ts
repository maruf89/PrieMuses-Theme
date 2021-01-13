// _types/main.d.ts

declare var window: any;
declare var pm: any;
declare var grecaptcha: any;

declare let jqXHR: any;

interface CDResponse {
	result: number,
	data?: any,
	message?: string
}