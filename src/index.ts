import '@/index.styl';
import reCaptchaInit from 'ThirdParty/Recaptcha/Recaptcha.ts';
import { init as gAnalyticsInit } from 'ThirdParty/GAnalytics/customTracking.ts';
import { init as analyticsEvents } from '@/SEO/AnalyticsEvents.ts';
import Search from '@/Search/index.ts';
import initPages from '@/Templates/Page/page';

(function ($) {
	$(() => {
        gAnalyticsInit($);
        analyticsEvents();
		Search.init($);
        initPages();
        reCaptchaInit();
	})
})(jQuery);