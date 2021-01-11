"use strict";

(function ($) {
	var initSearch = {
        opts: {
            inited: 0,
            // Class names
            appendClass: '_appended', // Search active
            processing: '_processing', // loading class
            processed: '_processed', // Search loaded
            noResults: '_no-results',
        },
        // elements
        els: {
            $search: null,
            $input: null,
            $form: null, // the form in the overlay
            $bg: null,
            $bgSlot: null,
            $resultsContainer: null,
        },
		init: function() {
            if (this.opts.inited) return;
            
            // so as not to re call
			this.opts.inited = 1;

            this.els.$search = $('#searchBox');
            this.els.$input = this.els.$search.find('.search-input');
            var $bg = this.els.$bg = $('#searchOverlay');

            this.els.$form = this.els.$bg.find('form');
            this.els.$innerInput = this.els.$bg.find('.search-input');
            this.els.$searchResultsContainer = $('#searchResultsContainer');

            $bg.appendTo(document.body);
            this.els.$input.on('focus', this.methods.loadBackdrop.bind(this));

            $bg.on('click', '.click-trap', function(e) {
                    e.target == e.currentTarget && this.methods.onClose.call(this);
                }.bind(this))
                .on('submit', 'form', this.methods.onSubmit.bind(this));

			
		},
		methods: {
			loadBackdrop: function () {
                this.els.$bg.addClass(this.opts.appendClass);
                setTimeout(function () {
                    this.els.$innerInput[0].focus();
                }.bind(this), 0);
            },
            onClose: function() {
                this.els.$bg.removeClass(this.opts.appendClass);
            },
            onSubmit: function(e) {
                e.preventDefault();
                this.methods.triggerProcessing.call(this, true, false);
                
                var data = helper.getFormData(this.els.$form);
                var errors = this.methods.validateSearch.call(this, data);
                var that = this;

                if (!errors.length) {
                    // is valid
                    $.ajax({
                        type: 'POST',
                        url: pm.restBase + 'search/all',
                        data: {
                            search: data.search,
                            type: data.search_type,
                        },
                        beforeSend: function ( xhr ) {
                            xhr.setRequestHeader( 'X-WP-Nonce', pm.wp_nonce );
                        },
                        dataType: 'json'
                    }).then(
                        this.methods.resultsLoaded.bind(this),
                        function (response) {
                            console.log('Error ' + response.result, response.message);
                        })
                    .then(function () {
                        that.methods.triggerProcessing.call(that, false, true);
                    });
                } else {
                    // Invalid

                }
            },
            triggerProcessing: function( loading, loaded) {
                this.els.$bg.toggleClass(
                    this.opts.processing,
                    loading
                ).toggleClass(
                    this.opts.processed,
                    loaded
                );

                if ( loading ) this.els.$bg.removeClass(this.opts.noResults);
            },
            validateSearch: function (data) {
                var errors = [];
                
                if (data.search == '') {
                    errors.push("Search must not be empty");
                }
                
                if (data.search && data.search.length < 2) {
                    errors.push("The search must be at least 2 characters long");
                }

                return errors;
            },
            resultsLoaded: function (res) {
                var response = JSON.parse(res);
                if ( response.result !== 200 ) throw response;

                var hasResults = !!response.data.results;

                this.els.$bg.toggleClass(
                    this.opts.noResults, !hasResults
                );

                if (hasResults && response.data.html) {
                    this.els.$searchResultsContainer.html(response.data.html);
                }
            }
		}
    };
    
    var helper = {
        getFormData: function($form){
            var unindexed_array = $form.serializeArray();
            var indexed_array = {};
        
            $.map(unindexed_array, function(n, i){
                indexed_array[n['name']] = n['value'];
            });
        
            return indexed_array;
        }
    }

	// Do I break reCaptcha by localizing it?
	var loadRecaptcha = {
		onSubmit: function (token) {
     		$('.uwp-registration-form')[0].submit();
		},
		registration: function () {
			var $button = $('.uwp_register_submit');

			$button.on('click', function(e) {
				e.preventDefault();
				grecaptcha.execute(pm.recaptcha.key_v3, {action: 'submit'})
					.then(function(token) {
						loadRecaptcha.onSubmit(token)
		          	});
			});

			var captchaContainer = null;
		    var loadCaptcha = function() {
		      captchaContainer = grecaptcha.render('captcha_container', {
		        'sitekey' : pm.recaptcha.key_v2,
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
        // Load Search
		initSearch.init();

		// Recaptcha init
		if (window.grecaptcha) {
			grecaptcha.ready(loadRecaptchaInstances);
		}	
	})
})(jQuery);