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
        hasErrors: '_has-errors',
    },
    // elements
    els: {
        $search: null,
        $input: null,
        $form: null, // the form in the overlay
        $bg: null,
        $bgSlot: null,
        $searchResultsContainer: null,
        $searchBy: null, // the div containing the primary filters to search by
        $searchErrors: null, // container for display errors
        $advancedOptions: null, // El for the category filters
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
        this.els.$searchBy = $('#searchBy');
        this.els.$advancedOptions = $('#searchOptions');
        this.els.$searchErrors = $('#searchErrors');

        $bg.appendTo(document.body);
        this.els.$input.on('focus', this.methods.loadBackdrop.bind(this));

        $bg.on('click', '.click-trap', function(e) {
                e.target == e.currentTarget && this.methods.onClose.call(this);
            }.bind(this))
            .on('submit', 'form', this.methods.onSubmit.bind(this));

        this.els.$advancedOptions.on('click', 'input:checked', this.methods.toggleChecked.bind(this));
        this.methods.initSearchBy.call(this);
	},
	methods: {
        initSearchBy() {
            const taxonomies = cdData.taxonomyType;
            const $optContainer = this.els.$advancedOptions;
            const updateShowHideOptionSections = () => {
                const curTypes = this.els.$searchBy.find('input:checked').data().searchTypes;
                Object.keys(taxonomies).forEach(key => {
                    $optContainer.find('.' + taxonomies[key])[curTypes.includes(key) ? 'show' : 'hide']();
                });
            }
            
            this.els.$searchBy.on('click', 'input', updateShowHideOptionSections);
            updateShowHideOptionSections();
        },
		loadBackdrop() {
            this.els.$bg.addClass(this.opts.appendClass);
            setTimeout(function () {
                this.els.$innerInput[0].focus();
            }.bind(this), 0);
        },
        onClose() {
            this.els.$bg.removeClass(this.opts.appendClass);
        },
        toggleChecked(e) {
            const data = e.target.dataset;
            const is = +e.target.checked;
            if (+data.wasChecked === is) {
                e.target.checked = false;
                data.wasChecked = 0;
            } else data.wasChecked = 1;
        },
        onSubmit(e) {
            this.els.$bg.removeClass(this.opts.hasErrors);
            e.preventDefault();
            this.methods.triggerProcessing.call(this, true, false);
            
            this.els.$searchResultsContainer.empty();
            var data:{search?:string, search_type?:string, taxonomy?:{}} = getFormData(this.els.$form);
            var errors = this.methods.validateSearch.call(this, data);
            var that = this;

            if (!errors.length) {
                // is valid
                $.ajax({
                    type: 'POST',
                    url: pm.restBase + 'search/all',
                    data: {
                        ...data,
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
                this.els.$searchErrors.append(errors.map(err => `<span>${err}</span>`).join('<br />'))
                this.els.$bg.addClass(this.opts.hasErrors);
                this.methods.triggerProcessing.call(this, false, false);
            }
        },
        triggerProcessing( loading:boolean, loaded:boolean) {
            this.els.$bg.toggleClass(
                this.opts.processing,
                loading
            ).toggleClass(
                this.opts.processed,
                loaded
            );

            if ( loading ) this.els.$bg.removeClass(this.opts.noResults);
        },
        validateSearch(data) {
            var errors = [];

            const keys = Object.keys(data);
            const hasTax = keys.some(key => /^taxonomy/.test(key));
            
            if (!hasTax && data.search == '') {
                errors.push("Search must not be empty");
            }
            
            if (data.search && data.search.length < 2) {
                errors.push("The search must be at least 2 characters long");
            }

            return errors;
        },
        resultsLoaded(res:string) {
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