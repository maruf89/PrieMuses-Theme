import '@/index.styl';
import reCaptchaInit from 'ThirdParty/Recaptcha/Recaptcha.ts';
import { init as gAnalyticsInit } from 'ThirdParty/GAnalytics/customTracking.ts';
import { init as analyticsEvents } from '@/SEO/AnalyticsEvents.ts';
import Search from '@/Search/index.ts';
import initPages from '@/Templates/Page/page';
import initEntity from 'templates/entity/entity';

(function ($) {
	$(() => {
        gAnalyticsInit($);
        analyticsEvents();
        Search.init($);
        initEntity($);
        initPages();
        reCaptchaInit();

        // $(document.body).removeClass('preload');
	})
})(jQuery);