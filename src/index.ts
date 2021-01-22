import '@/index.styl';
import reCaptchaInit from 'ThirdParty/Recaptcha/Recaptcha.ts';
import Search from '@/Search/index.ts';
import initFAQ from '@/Templates/Page/FAQ';

(function ($) {
	$(() => {
		Search.init(jQuery);
        reCaptchaInit();
        initFAQ();
	})
})(jQuery);