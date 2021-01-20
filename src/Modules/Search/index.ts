/// <reference path="../../_types/main.d.ts" />

import { getFormData } from '@/Helpers/index';

let $:typeof jQuery = null;

export default {
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
        $searchResultsContainer: null,
    },
	init: function(_$:typeof jQuery) {
        $ = _$;
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
            
            this.els.$searchResultsContainer.empty();
            var data:{search?:string, search_type?:string} = getFormData(this.els.$form);
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
                })
                .then(
                    this.methods.resultsLoaded.bind(this),
                    // @ts-ignore
                    function (response:CDResponse):CDResponse {
                        console.log('Error ' + response.result, response.message);
                        return response;
                    })
                .then(function () {
                    that.methods.triggerProcessing.call(that, false, true);
                });
            } else {
                // Invalid

            }
        },
        triggerProcessing: function( loading:boolean, loaded:boolean) {
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
        resultsLoaded: function (res:string) {
            const response:CDResponse = JSON.parse(res);
            if ( response.result !== 200 ) throw response;

            const hasResults = !!response.data.results;

            this.els.$bg.toggleClass(
                this.opts.noResults, !hasResults
            );

            if (hasResults && response.data.html) {
                this.els.$searchResultsContainer.html(response.data.html);
            }
        }
	}
};