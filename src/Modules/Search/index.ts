/// <reference path="../../_types/main.d.ts" />

import { getFormData } from '@/Helpers/index';
import { gaElem, gaTrack } from 'ThirdParty/GAnalytics/customTracking.ts';

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
        $triggerInput: null,
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
        this.els.$triggerInput = this.els.$search.find('.search-input');
        var $bg = this.els.$bg = $('#searchOverlay');

        this.els.$form = this.els.$bg.find('form');
        this.els.$innerInput = this.els.$bg.find('.search-input');
        this.els.$searchResultsContainer = $('#searchResultsContainer');
        this.els.$searchBy = $('#searchBy');
        this.els.$advancedOptions = $('#searchOptions');
        this.els.$searchErrors = $('#searchErrors');

        $bg.appendTo(document.body);
        this.els.$triggerInput.on('focus', this.methods.loadBackdrop.bind(this));

        $bg.on('click', '.click-trap', function(e) {
                e.target == e.currentTarget && this.methods.onClose.call(this);
            }.bind(this))
            .on('submit', 'form', this.methods.onSubmit.bind(this));

        this.els.$advancedOptions.on('click', 'input:checked', this.methods.toggleChecked.bind(this));
        this.methods.initSearchBy.call(this);
	},
	methods: {
        /**
         * Depending on what's being searched, shows or hides advanced option taxonomy sections
         */
        initSearchBy() {
            const taxonomies = cdData.taxonomyType;
            const $optContainer = this.els.$advancedOptions;
            let previous;
            const updateShowHideOptionSections = e => {
                if (e && e.target) {
                    if (previous === e.target) return;
                    previous = e.target;
                }
                const curTypes = this.els.$searchBy.find('input:checked').data().searchTypes;
                Object.keys(taxonomies).forEach(key => {
                    $optContainer.find('.' + taxonomies[key])[curTypes.includes(key) ? 'show' : 'hide']();
                });
                if (e && e.target) gaElem(e.target);
            }
            
            this.els.$searchBy.on('click', 'input', updateShowHideOptionSections);
            updateShowHideOptionSections(null);
        },
		loadBackdrop(e) {
            this.els.$bg.addClass(this.opts.appendClass);
            gaElem(e.target);
            setTimeout(function () {
                this.els.$innerInput[0].focus();
            }.bind(this), 0);
        },
        onClose() {
            this.els.$bg.removeClass(this.opts.appendClass);
        },
        toggleChecked(e) {
            const data = e.target.dataset;
            const is = +e.target.checked
            const disable = +data.wasChecked === is;
            
            if (disable) {
                e.target.checked = false;
                data.wasChecked = 0;
            } else data.wasChecked = 1;

            // ga tracking
            try {
                const tax = e.target.name.match(/\[([a-z-]+)\]/);
                if (Array.isArray(tax)) {
                    const taxonomy = tax[1];
                    const value = e.target.nextElementSibling.textContent;
                    const action = disable ? 'disable' : 'enable';
                    gaTrack('interaction', {
                        screen_name: 'search',
                        action: `${action} ${taxonomy}`,
                        value
                    });
                }
            } catch (error) {
                console.error(error);
            }
        },
        onSubmit(e) {
            this.els.$bg.removeClass(this.opts.hasErrors);
            e.preventDefault();
            this.methods.triggerProcessing.call(this, true, false);
            
            this.els.$searchResultsContainer.empty();
            var data:{search?:string, search_type?:string} = getFormData(this.els.$form);
            let hasTaxonomies = false;
            const taxonomy = Object.keys(data)
                .filter(key => /^taxonomy/.test(key))
                .reduce((acc, tax) => {
                    hasTaxonomies = true;
                    acc[tax.match(/\[([a-z-]+)\]/)[1]] = data[tax];
                    return acc;
                }, {});
            var errors = this.methods.validateSearch.call(this, data);
            var that = this;

            if (!errors.length) {
                // is valid
                $.ajax({
                    type: 'POST',
                    url: cdData.restBase + 'search/all',
                    data: {
                        ...data,
                        type: data.search_type,
                    },
                    beforeSend: function ( xhr ) {
                        xhr.setRequestHeader( 'X-WP-Nonce', pm.wp_nonce );
                        const gaParams:any = {
                            screen_name: 'search',
                            action: `search ${data.search_type}`,
                        }
                        if (hasTaxonomies)
                            Object.keys(taxonomy).forEach(tax => gaParams[`taxonomy[${tax}]`] = taxonomy[tax] );
                        if (data.search) gaParams.search = data.search;
                        gaTrack('interaction', gaParams);
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

            if (loading) this.els.$bg.removeClass(this.opts.noResults);
        },
        validateSearch(data) {
            var errors = [];

            const keys = Object.keys(data);
            const hasTax = keys.some(key => /^taxonomy/.test(key));
            
            if (data.search && data.search.length < 3) {
                errors.push("The search must be at least 3 characters long");
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