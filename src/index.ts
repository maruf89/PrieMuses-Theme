import '@/index.styl';
import reCaptchaInit from 'ThirdParty/Recaptcha/Recaptcha.ts';
import Search from '@/Search/index.ts';
import initPages from '@/Templates/Page/page';

(function ($) {
	$(() => {
		Search.init(jQuery);
        reCaptchaInit();
        initPages();
	})
})(jQuery);