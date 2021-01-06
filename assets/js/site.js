

(function ($) {
	loadRecaptcha = {
		onSubmit: function (token) {
     		$('.uwp-registration-form')[0].submit();
		},
		registration: function () {
			var $button = $('.uwp_register_submit');
				// .addClass('g-recaptcha')
				// .attr('data-callback', 'loadRecaptcha.onSubmit')
				// .attr('data-action', 'submit')
				// .attr('data-sitekey', pm_reCaptcha.key);

			$button.on('click', function(e) {
				e.preventDefault();
				grecaptcha.execute(pm_reCaptcha.key, {action: 'submit'})
					.then(function(token) {
						debugger;
						loadRecaptcha.onSubmit(token)
		              	// Add your logic to submit to your backend server here.
		          	});
			});

			

			var captchaContainer = null;
		    var loadCaptcha = function() {
		      captchaContainer = grecaptcha.render('captcha_container', {
		        'sitekey' : pm_reCaptcha.key,
		        'callback' : function(response) {
		          console.log(response);
		        }
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