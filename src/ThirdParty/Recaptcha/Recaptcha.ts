const onSubmit = (token:string) => {
	$('.uwp-registration-form')[0].onsubmit();
}

const registration = () => {
	var $button = $('.uwp_register_submit');

	$button.on('click', function(e:Event) {
		e.preventDefault();
		grecaptcha.execute(pm.recaptcha.key_v3, {action: 'submit'})
			.then(onSubmit);
	});

	var captchaContainer = null;
    var loadCaptcha = function() {
      captchaContainer = grecaptcha.render('captcha_container', {
        'sitekey' : pm.recaptcha.key_v2,
      });
    };

	$button.before('<div id="captcha_container"></div>')
	loadCaptcha();
};

const loadRecaptchaInstances = () => {
	if (/^\/registra/.test(location.pathname)) registration();
}

export default () => window.grecaptcha && grecaptcha.ready(loadRecaptchaInstances);