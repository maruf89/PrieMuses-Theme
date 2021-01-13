import '@/index';
import reCaptchaInit from 'ThirdParty/Recaptcha/Recaptcha.ts';
import Search from '@/Search/index.ts';

(function ($) {
	$(document).ready(function () {
		Search.init(jQuery);
		reCaptchaInit();
	})
})(jQuery);