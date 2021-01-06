
(function ($) {
	loadRecaptcha = {
		onSubmit: function (token) {
     		$('.uwp-registration-form')[0].submit();
		},
		registration: function () {
			var $button = $('.uwp_register_submit');

			$button.on('click', function(e) {
				e.preventDefault();
				grecaptcha.execute(pm_reCaptcha.key_v3, {action: 'submit'})
					.then(function(token) {
						loadRecaptcha.onSubmit(token)
		          	});
			});

			

			var captchaContainer = null;
		    var loadCaptcha = function() {
		      captchaContainer = grecaptcha.render('captcha_container', {
		        'sitekey' : pm_reCaptcha.key_v2,
		      });
		    };

			$button.before('<div id="captcha_container"></div>')
			loadCaptcha();
		}
	}

	function loadRecaptchaInstances() {
		if (/^\/registra/.test(location.pathname)) loadRecaptcha.registration();
	}


	$(document).ready(function () {
		if (window.grecaptcha) {
			grecaptcha.ready(loadRecaptchaInstances);
		}	
	})
})(jQuery);