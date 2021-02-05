/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Modules/Helpers/index.ts":
/*!**************************************!*\
  !*** ./src/Modules/Helpers/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFormData": () => /* binding */ getFormData
/* harmony export */ });
function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    jQuery.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
}


/***/ }),

/***/ "./src/Modules/SEO/AnalyticsEvents.ts":
/*!********************************************!*\
  !*** ./src/Modules/SEO/AnalyticsEvents.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => /* binding */ init
/* harmony export */ });
/* harmony import */ var ThirdParty_GAnalytics_customTracking_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ThirdParty/GAnalytics/customTracking.ts */ "./src/ThirdParty/GAnalytics/customTracking.ts");

function init() {
    if (!cdData || !cdData.events)
        return;
    window.addEventListener(cdData.events.map.popupOpen, trackMapEvent);
    window.addEventListener(cdData.events.map.popupClose, trackMapEvent);
}
function trackMapEvent(_a) {
    var detail = _a.detail;
    var $element = detail.$element, e = detail.e;
    var target = $element.find('[data-ga-event]').first();
    if (target.length)
        (0,ThirdParty_GAnalytics_customTracking_ts__WEBPACK_IMPORTED_MODULE_0__.gaElem)(target);
}


/***/ }),

/***/ "./src/Modules/Search/index.ts":
/*!*************************************!*\
  !*** ./src/Modules/Search/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _Helpers_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Helpers/index */ "./src/Modules/Helpers/index.ts");
/* harmony import */ var ThirdParty_GAnalytics_customTracking_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ThirdParty/GAnalytics/customTracking.ts */ "./src/ThirdParty/GAnalytics/customTracking.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var $ = null;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    opts: {
        inited: 0,
        appendClass: '_appended',
        processing: '_processing',
        processed: '_processed',
        noResults: '_no-results',
        hasErrors: '_has-errors',
    },
    els: {
        $search: null,
        $triggerInput: null,
        $form: null,
        $bg: null,
        $bgSlot: null,
        $searchResultsContainer: null,
        $searchBy: null,
        $searchErrors: null,
        $advancedOptions: null,
    },
    init: function (_$) {
        $ = _$;
        if (this.opts.inited)
            return;
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
        $bg.on('click', '.click-trap', function (e) {
            e.target == e.currentTarget && this.methods.onClose.call(this);
        }.bind(this))
            .on('submit', 'form', this.methods.onSubmit.bind(this));
        this.els.$advancedOptions.on('click', 'input:checked', this.methods.toggleChecked.bind(this));
        this.methods.initSearchBy.call(this);
    },
    methods: {
        initSearchBy: function () {
            var _this = this;
            var taxonomies = cdData.taxonomyType;
            var $optContainer = this.els.$advancedOptions;
            var previous;
            var updateShowHideOptionSections = function (e) {
                if (e && e.target) {
                    if (previous === e.target)
                        return;
                    previous = e.target;
                }
                var curTypes = _this.els.$searchBy.find('input:checked').data().searchTypes;
                Object.keys(taxonomies).forEach(function (key) {
                    $optContainer.find('.' + taxonomies[key])[curTypes.includes(key) ? 'show' : 'hide']();
                });
                if (e && e.target)
                    (0,ThirdParty_GAnalytics_customTracking_ts__WEBPACK_IMPORTED_MODULE_1__.gaElem)(e.target);
            };
            this.els.$searchBy.on('click', 'input', updateShowHideOptionSections);
            updateShowHideOptionSections(null);
        },
        loadBackdrop: function (e) {
            this.els.$bg.addClass(this.opts.appendClass);
            (0,ThirdParty_GAnalytics_customTracking_ts__WEBPACK_IMPORTED_MODULE_1__.gaElem)(e.target);
            setTimeout(function () {
                this.els.$innerInput[0].focus();
            }.bind(this), 0);
        },
        onClose: function () {
            this.els.$bg.removeClass(this.opts.appendClass);
        },
        toggleChecked: function (e) {
            var data = e.target.dataset;
            var is = +e.target.checked;
            var disable = +data.wasChecked === is;
            if (disable) {
                e.target.checked = false;
                data.wasChecked = 0;
            }
            else
                data.wasChecked = 1;
            try {
                var tax = e.target.name.match(/\[([a-z-]+)\]/);
                if (Array.isArray(tax)) {
                    var taxonomy = tax[1];
                    var value = e.target.nextElementSibling.textContent;
                    var action = disable ? 'disable' : 'enable';
                    (0,ThirdParty_GAnalytics_customTracking_ts__WEBPACK_IMPORTED_MODULE_1__.gaTrack)('interaction', {
                        screen_name: 'search',
                        action: action + " " + taxonomy,
                        value: value
                    });
                }
            }
            catch (error) {
                console.error(error);
            }
        },
        onSubmit: function (e) {
            this.els.$bg.removeClass(this.opts.hasErrors);
            e.preventDefault();
            this.methods.triggerProcessing.call(this, true, false);
            this.els.$searchResultsContainer.empty();
            var data = (0,_Helpers_index__WEBPACK_IMPORTED_MODULE_0__.getFormData)(this.els.$form);
            var hasTaxonomies = false;
            var taxonomy = Object.keys(data)
                .filter(function (key) { return /^taxonomy/.test(key); })
                .reduce(function (acc, tax) {
                hasTaxonomies = true;
                acc[tax.match(/\[([a-z-]+)\]/)[1]] = data[tax];
                return acc;
            }, {});
            var errors = this.methods.validateSearch.call(this, data);
            var that = this;
            if (!errors.length) {
                $.ajax({
                    type: 'POST',
                    url: pm.restBase + 'search/all',
                    data: __assign(__assign({}, data), { type: data.search_type }),
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-WP-Nonce', pm.wp_nonce);
                        var gaParams = {
                            screen_name: 'search',
                            action: "search " + data.search_type,
                        };
                        if (hasTaxonomies)
                            Object.keys(taxonomy).forEach(function (tax) { return gaParams["taxonomy[" + tax + "]"] = taxonomy[tax]; });
                        if (data.search)
                            gaParams.search = data.search;
                        (0,ThirdParty_GAnalytics_customTracking_ts__WEBPACK_IMPORTED_MODULE_1__.gaTrack)('interaction', gaParams);
                    },
                    dataType: 'json'
                })
                    .then(this.methods.resultsLoaded.bind(this), function (response) {
                    console.log('Error ' + response.result, response.message);
                    return response;
                })
                    .then(function () {
                    that.methods.triggerProcessing.call(that, false, true);
                });
            }
            else {
                this.els.$searchErrors.append(errors.map(function (err) { return "<span>" + err + "</span>"; }).join('<br />'));
                this.els.$bg.addClass(this.opts.hasErrors);
                this.methods.triggerProcessing.call(this, false, false);
            }
        },
        triggerProcessing: function (loading, loaded) {
            this.els.$bg.toggleClass(this.opts.processing, loading).toggleClass(this.opts.processed, loaded);
            if (loading)
                this.els.$bg.removeClass(this.opts.noResults);
        },
        validateSearch: function (data) {
            var errors = [];
            var keys = Object.keys(data);
            var hasTax = keys.some(function (key) { return /^taxonomy/.test(key); });
            if (!hasTax && data.search == '') {
                errors.push("Search must not be empty");
            }
            if (data.search && data.search.length < 2) {
                errors.push("The search must be at least 2 characters long");
            }
            return errors;
        },
        resultsLoaded: function (res) {
            var response = JSON.parse(res);
            if (response.result !== 200)
                throw response;
            var hasResults = !!response.data.results;
            this.els.$bg.toggleClass(this.opts.noResults, !hasResults);
            if (hasResults && response.data.html) {
                this.els.$searchResultsContainer.html(response.data.html);
            }
        }
    }
});


/***/ }),

/***/ "./src/Modules/Templates/Page/page.ts":
/*!********************************************!*\
  !*** ./src/Modules/Templates/Page/page.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ init
/* harmony export */ });
function init() {
    initConnect();
    initFAQ();
}
function initFAQ() {
    var $FAQ = document.getElementById('FAQ');
    if (!$FAQ)
        return false;
    jQuery($FAQ).on('click', 'h3', function (event) { jQuery(event.target).toggleClass('toggled'); });
    return true;
}
function initConnect() {
    var $body = document.getElementById('pageConnect');
    if (!$body)
        return false;
    var $login = jQuery('.uwp-login-class');
    $login.find('.uwp-login-form')
        .attr('enctype', 'multipart/form-data')
        .attr('action', '/wp/wp-login.php');
    $login.find('#username').attr('id', 'user_login').attr('name', 'log');
    $login.find('#password').attr('id', 'user_pass').attr('name', 'pwd');
    var $navLinks = jQuery('.nav-link');
    jQuery($body).on('click', '.nav-link', function (event) {
        $navLinks.removeClass('active');
        jQuery(event.target).addClass('active');
    });
    return true;
}


/***/ }),

/***/ "./src/ThirdParty/GAnalytics/customTracking.ts":
/*!*****************************************************!*\
  !*** ./src/ThirdParty/GAnalytics/customTracking.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => /* binding */ init,
/* harmony export */   "gaElem": () => /* binding */ gaElem,
/* harmony export */   "gaTrack": () => /* binding */ gaTrack
/* harmony export */ });
var can = function () { return !!window.gtag; };
var $;
function init(_$) {
    $ = _$;
    if (!can())
        return;
    $(document.body).on('click', '.gtag', function (e) {
        if (e.target === e.currentTarget)
            gaElem(e.target);
    });
}
function gaElem(elem) {
    var data = $(elem).data();
    var command = data.gaCommand || 'event';
    var eventName = data.gaEvent;
    var params = data.gaParams || {};
    if (!eventName) {
        console.error('Invalid gaElem call using:', data);
        return;
    }
    gtag(command, eventName, params);
}
function gaTrack(eventName, params, command) {
    if (params === void 0) { params = {}; }
    if (command === void 0) { command = 'event'; }
    gtag(command, eventName, params);
}


/***/ }),

/***/ "./src/ThirdParty/Recaptcha/Recaptcha.ts":
/*!***********************************************!*\
  !*** ./src/ThirdParty/Recaptcha/Recaptcha.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var onSubmit = function (token) {
    $('.uwp-registration-form')[0].onsubmit(new Event('submit'));
};
var registration = function () {
    var $button = $('.uwp_register_submit');
    $button.on('click', function (e) {
        e.preventDefault();
        grecaptcha.execute(pm.recaptcha.key_v3, { action: 'submit' })
            .then(onSubmit);
    });
    var captchaContainer = null;
    var loadCaptcha = function () {
        captchaContainer = grecaptcha.render('captcha_container', {
            'sitekey': pm.recaptcha.key_v2,
        });
    };
    $button.before('<div id="captcha_container"></div>');
    loadCaptcha();
};
var loadRecaptchaInstances = function () {
    if (/^\/registra/.test(location.pathname))
        registration();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () { return window.grecaptcha && grecaptcha.ready(loadRecaptchaInstances); });


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/index.styl */ "./src/Modules/index.styl");
/* harmony import */ var ThirdParty_Recaptcha_Recaptcha_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ThirdParty/Recaptcha/Recaptcha.ts */ "./src/ThirdParty/Recaptcha/Recaptcha.ts");
/* harmony import */ var ThirdParty_GAnalytics_customTracking_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ThirdParty/GAnalytics/customTracking.ts */ "./src/ThirdParty/GAnalytics/customTracking.ts");
/* harmony import */ var _SEO_AnalyticsEvents_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/SEO/AnalyticsEvents.ts */ "./src/Modules/SEO/AnalyticsEvents.ts");
/* harmony import */ var _Search_index_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Search/index.ts */ "./src/Modules/Search/index.ts");
/* harmony import */ var _Templates_Page_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Templates/Page/page */ "./src/Modules/Templates/Page/page.ts");






(function ($) {
    $(function () {
        (0,ThirdParty_GAnalytics_customTracking_ts__WEBPACK_IMPORTED_MODULE_2__.init)($);
        (0,_SEO_AnalyticsEvents_ts__WEBPACK_IMPORTED_MODULE_3__.init)();
        _Search_index_ts__WEBPACK_IMPORTED_MODULE_4__.default.init($);
        (0,_Templates_Page_page__WEBPACK_IMPORTED_MODULE_5__.default)();
        (0,ThirdParty_Recaptcha_Recaptcha_ts__WEBPACK_IMPORTED_MODULE_1__.default)();
    });
})(jQuery);


/***/ }),

/***/ "./src/Modules/index.styl":
/*!********************************!*\
  !*** ./src/Modules/index.styl ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9IZWxwZXJzL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1NFTy9BbmFseXRpY3NFdmVudHMudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL01vZHVsZXMvU2VhcmNoL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1RlbXBsYXRlcy9QYWdlL3BhZ2UudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL1RoaXJkUGFydHkvR0FuYWx5dGljcy9jdXN0b21UcmFja2luZy50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvVGhpcmRQYXJ0eS9SZWNhcHRjaGEvUmVjYXB0Y2hhLnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9pbmRleC5zdHlsIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTyxTQUFTLFdBQVcsQ0FBQyxLQUFLO0lBQzdCLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM3QyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFFdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxhQUFhLENBQUM7QUFDekIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1RnRTtBQUUxRCxTQUFTLElBQUk7SUFDaEIsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1FBQUUsT0FBTztJQUd0QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRXBFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLEVBQVU7UUFBUixNQUFNO0lBQ25CLFlBQVEsR0FBUSxNQUFNLFNBQWQsRUFBRSxDQUFDLEdBQUssTUFBTSxFQUFYLENBQVk7SUFDL0IsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hELElBQUksTUFBTSxDQUFDLE1BQU07UUFBRSwrRUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiNkM7QUFDNEI7QUFFMUUsSUFBSSxDQUFDLEdBQWlCLElBQUksQ0FBQztBQUUzQixpRUFBZTtJQUNYLElBQUksRUFBRTtRQUNGLE1BQU0sRUFBRSxDQUFDO1FBRVQsV0FBVyxFQUFFLFdBQVc7UUFDeEIsVUFBVSxFQUFFLGFBQWE7UUFDekIsU0FBUyxFQUFFLFlBQVk7UUFDdkIsU0FBUyxFQUFFLGFBQWE7UUFDeEIsU0FBUyxFQUFFLGFBQWE7S0FDM0I7SUFFRCxHQUFHLEVBQUU7UUFDRCxPQUFPLEVBQUUsSUFBSTtRQUNiLGFBQWEsRUFBRSxJQUFJO1FBQ25CLEtBQUssRUFBRSxJQUFJO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxPQUFPLEVBQUUsSUFBSTtRQUNiLHVCQUF1QixFQUFFLElBQUk7UUFDN0IsU0FBUyxFQUFFLElBQUk7UUFDZixhQUFhLEVBQUUsSUFBSTtRQUNuQixnQkFBZ0IsRUFBRSxJQUFJO0tBQ3pCO0lBQ0osSUFBSSxFQUFFLFVBQVMsRUFBZ0I7UUFDeEIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNQLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUduQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFZixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFNUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV6RSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBUyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNaLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDRCxPQUFPLEVBQUU7UUFJRixZQUFZO1lBQVosaUJBa0JDO1lBakJHLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDdkMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoRCxJQUFJLFFBQVEsQ0FBQztZQUNiLElBQU0sNEJBQTRCLEdBQUcsV0FBQztnQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDZixJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsTUFBTTt3QkFBRSxPQUFPO29CQUNsQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztpQkFDdkI7Z0JBQ0QsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFDN0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBRztvQkFDL0IsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUMxRixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtvQkFBRSwrRUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztZQUN0RSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ1AsWUFBWSxZQUFDLENBQUM7WUFDSixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QywrRUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsT0FBTztZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFDRCxhQUFhLFlBQUMsQ0FBQztZQUNYLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzlCLElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQzVCLElBQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUM7WUFFeEMsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzthQUN2Qjs7Z0JBQU0sSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFHM0IsSUFBSTtnQkFDQSxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2pELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDcEIsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztvQkFDdEQsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztvQkFDOUMsZ0ZBQU8sQ0FBQyxhQUFhLEVBQUU7d0JBQ25CLFdBQVcsRUFBRSxRQUFRO3dCQUNyQixNQUFNLEVBQUssTUFBTSxTQUFJLFFBQVU7d0JBQy9CLEtBQUs7cUJBQ1IsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQztRQUNELFFBQVEsRUFBUixVQUFTLENBQUM7WUFDTixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUV2RCxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pDLElBQUksSUFBSSxHQUF5QywyREFBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0UsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUM3QixNQUFNLENBQUMsYUFBRyxJQUFJLGtCQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFyQixDQUFxQixDQUFDO2lCQUNwQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztnQkFDYixhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxHQUFHLENBQUM7WUFDZixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDWCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUVoQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFFaEIsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDSCxJQUFJLEVBQUUsTUFBTTtvQkFDWixHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsR0FBRyxZQUFZO29CQUMvQixJQUFJLHdCQUNHLElBQUksS0FDUCxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FDekI7b0JBQ0QsVUFBVSxFQUFFLFVBQVcsR0FBRzt3QkFDdEIsR0FBRyxDQUFDLGdCQUFnQixDQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFFLENBQUM7d0JBQ2xELElBQU0sUUFBUSxHQUFPOzRCQUNqQixXQUFXLEVBQUUsUUFBUTs0QkFDckIsTUFBTSxFQUFFLFlBQVUsSUFBSSxDQUFDLFdBQWE7eUJBQ3ZDO3dCQUNELElBQUksYUFBYTs0QkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFHLElBQUksZUFBUSxDQUFDLGNBQVksR0FBRyxNQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQTVDLENBQTRDLENBQUUsQ0FBQzt3QkFDeEYsSUFBSSxJQUFJLENBQUMsTUFBTTs0QkFBRSxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQy9DLGdGQUFPLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNyQyxDQUFDO29CQUNELFFBQVEsRUFBRSxNQUFNO2lCQUNuQixDQUFDO3FCQUNELElBQUksQ0FDRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBRXJDLFVBQVUsUUFBbUI7b0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxPQUFPLFFBQVEsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDO3FCQUNMLElBQUksQ0FBQztvQkFDRixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMzRCxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQUcsSUFBSSxrQkFBUyxHQUFHLFlBQVMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDM0Q7UUFDTCxDQUFDO1FBQ0QsaUJBQWlCLEVBQWpCLFVBQW1CLE9BQWUsRUFBRSxNQUFjO1lBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQ3BCLE9BQU8sQ0FDVixDQUFDLFdBQVcsQ0FDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFDbkIsTUFBTSxDQUNULENBQUM7WUFFRixJQUFLLE9BQU87Z0JBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakUsQ0FBQztRQUNELGNBQWMsWUFBQyxJQUFJO1lBQ2YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRWhCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFHLElBQUksa0JBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztZQUV2RCxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFO2dCQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7YUFDM0M7WUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLCtDQUErQyxDQUFDLENBQUM7YUFDaEU7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBQ0QsYUFBYSxFQUFiLFVBQWMsR0FBVTtZQUNwQixJQUFNLFFBQVEsR0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLElBQUssUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHO2dCQUFHLE1BQU0sUUFBUSxDQUFDO1lBRTlDLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUUzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUNuQyxDQUFDO1lBRUYsSUFBSSxVQUFVLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0Q7UUFDTCxDQUFDO0tBQ1A7Q0FDRCxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN4TmEsU0FBUyxJQUFJO0lBQ3hCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDO0FBRUQsU0FBUyxPQUFPO0lBQ1osSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU1QyxJQUFJLENBQUMsSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXhCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxlQUFLLElBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsV0FBVztJQUNoQixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXJELElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFekIsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFFMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUN6QixJQUFJLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDO1NBQ3RDLElBQUksQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUV4QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUVyRSxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQUs7UUFDeEMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENELElBQU0sR0FBRyxHQUFHLGNBQU0sUUFBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQWIsQ0FBYSxDQUFDO0FBQ2hDLElBQUksQ0FBYyxDQUFDO0FBRVosU0FBUyxJQUFJLENBQUMsRUFBZTtJQUNoQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1AsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUFFLE9BQU87SUFFbkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFDO1FBQ25DLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsYUFBYTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRU0sU0FBUyxNQUFNLENBQUUsSUFBZ0I7SUFDcEMsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDO0lBQzFDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDL0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFFbkMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsT0FBTztLQUNWO0lBR0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVNLFNBQVMsT0FBTyxDQUFDLFNBQWdCLEVBQUUsTUFBYyxFQUFFLE9BQXdCO0lBQXhDLG9DQUFjO0lBQUUsMkNBQXdCO0lBRTlFLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlCRCxJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQVk7SUFDN0IsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUVELElBQU0sWUFBWSxHQUFHO0lBQ3BCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBRXhDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVMsQ0FBTztRQUNuQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsQ0FBQzthQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQztJQUN6QixJQUFJLFdBQVcsR0FBRztRQUNoQixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFO1lBQ3hELFNBQVMsRUFBRyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU07U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUwsT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQ0FBb0MsQ0FBQztJQUNwRCxXQUFXLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGLElBQU0sc0JBQXNCLEdBQUc7SUFDOUIsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFBRSxZQUFZLEVBQUUsQ0FBQztBQUMzRCxDQUFDO0FBRUQsaUVBQWUsY0FBTSxhQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsRUFBN0QsQ0FBNkQsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUI3RDtBQUN3QztBQUNtQjtBQUNkO0FBQzVCO0FBQ087QUFFOUMsQ0FBQyxVQUFVLENBQUM7SUFDWCxDQUFDLENBQUM7UUFDSyw2RUFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLDZEQUFlLEVBQUUsQ0FBQztRQUN4QiwwREFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsNkRBQVMsRUFBRSxDQUFDO1FBQ1osMEVBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNmWDs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJzaXRlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtRGF0YSgkZm9ybSkge1xuICAgIHZhciB1bmluZGV4ZWRfYXJyYXkgPSAkZm9ybS5zZXJpYWxpemVBcnJheSgpO1xuICAgIHZhciBpbmRleGVkX2FycmF5ID0ge307XG5cbiAgICBqUXVlcnkubWFwKHVuaW5kZXhlZF9hcnJheSwgZnVuY3Rpb24obiwgaSl7XG4gICAgICAgIGluZGV4ZWRfYXJyYXlbblsnbmFtZSddXSA9IG5bJ3ZhbHVlJ107XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5kZXhlZF9hcnJheTtcbn0iLCJpbXBvcnQgeyBnYUVsZW0gfSBmcm9tICdUaGlyZFBhcnR5L0dBbmFseXRpY3MvY3VzdG9tVHJhY2tpbmcudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpZiAoIWNkRGF0YSB8fCAhY2REYXRhLmV2ZW50cykgcmV0dXJuO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGNkRGF0YS5ldmVudHMubWFwLnBvcHVwT3BlbiwgdHJhY2tNYXBFdmVudCk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGNkRGF0YS5ldmVudHMubWFwLnBvcHVwQ2xvc2UsIHRyYWNrTWFwRXZlbnQpO1xufVxuXG5mdW5jdGlvbiB0cmFja01hcEV2ZW50KHsgZGV0YWlsIH0pIHtcbiAgICBjb25zdCB7ICRlbGVtZW50LCBlIH0gPSBkZXRhaWw7XG4gICAgY29uc3QgdGFyZ2V0ID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtZ2EtZXZlbnRdJykuZmlyc3QoKTtcbiAgICBpZiAodGFyZ2V0Lmxlbmd0aCkgZ2FFbGVtKHRhcmdldCk7XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL190eXBlcy9tYWluLmQudHNcIiAvPlxuXG5pbXBvcnQgeyBnZXRGb3JtRGF0YSB9IGZyb20gJ0AvSGVscGVycy9pbmRleCc7XG5pbXBvcnQgeyBnYUVsZW0sIGdhVHJhY2sgfSBmcm9tICdUaGlyZFBhcnR5L0dBbmFseXRpY3MvY3VzdG9tVHJhY2tpbmcudHMnO1xuXG5sZXQgJDp0eXBlb2YgalF1ZXJ5ID0gbnVsbDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG9wdHM6IHtcbiAgICAgICAgaW5pdGVkOiAwLFxuICAgICAgICAvLyBDbGFzcyBuYW1lc1xuICAgICAgICBhcHBlbmRDbGFzczogJ19hcHBlbmRlZCcsIC8vIFNlYXJjaCBhY3RpdmVcbiAgICAgICAgcHJvY2Vzc2luZzogJ19wcm9jZXNzaW5nJywgLy8gbG9hZGluZyBjbGFzc1xuICAgICAgICBwcm9jZXNzZWQ6ICdfcHJvY2Vzc2VkJywgLy8gU2VhcmNoIGxvYWRlZFxuICAgICAgICBub1Jlc3VsdHM6ICdfbm8tcmVzdWx0cycsXG4gICAgICAgIGhhc0Vycm9yczogJ19oYXMtZXJyb3JzJyxcbiAgICB9LFxuICAgIC8vIGVsZW1lbnRzXG4gICAgZWxzOiB7XG4gICAgICAgICRzZWFyY2g6IG51bGwsXG4gICAgICAgICR0cmlnZ2VySW5wdXQ6IG51bGwsXG4gICAgICAgICRmb3JtOiBudWxsLCAvLyB0aGUgZm9ybSBpbiB0aGUgb3ZlcmxheVxuICAgICAgICAkYmc6IG51bGwsXG4gICAgICAgICRiZ1Nsb3Q6IG51bGwsXG4gICAgICAgICRzZWFyY2hSZXN1bHRzQ29udGFpbmVyOiBudWxsLFxuICAgICAgICAkc2VhcmNoQnk6IG51bGwsIC8vIHRoZSBkaXYgY29udGFpbmluZyB0aGUgcHJpbWFyeSBmaWx0ZXJzIHRvIHNlYXJjaCBieVxuICAgICAgICAkc2VhcmNoRXJyb3JzOiBudWxsLCAvLyBjb250YWluZXIgZm9yIGRpc3BsYXkgZXJyb3JzXG4gICAgICAgICRhZHZhbmNlZE9wdGlvbnM6IG51bGwsIC8vIEVsIGZvciB0aGUgY2F0ZWdvcnkgZmlsdGVyc1xuICAgIH0sXG5cdGluaXQ6IGZ1bmN0aW9uKF8kOnR5cGVvZiBqUXVlcnkpIHtcbiAgICAgICAgJCA9IF8kO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmluaXRlZCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgLy8gc28gYXMgbm90IHRvIHJlIGNhbGxcblx0XHR0aGlzLm9wdHMuaW5pdGVkID0gMTtcblxuICAgICAgICB0aGlzLmVscy4kc2VhcmNoID0gJCgnI3NlYXJjaEJveCcpO1xuICAgICAgICB0aGlzLmVscy4kdHJpZ2dlcklucHV0ID0gdGhpcy5lbHMuJHNlYXJjaC5maW5kKCcuc2VhcmNoLWlucHV0Jyk7XG4gICAgICAgIHZhciAkYmcgPSB0aGlzLmVscy4kYmcgPSAkKCcjc2VhcmNoT3ZlcmxheScpO1xuXG4gICAgICAgIHRoaXMuZWxzLiRmb3JtID0gdGhpcy5lbHMuJGJnLmZpbmQoJ2Zvcm0nKTtcbiAgICAgICAgdGhpcy5lbHMuJGlubmVySW5wdXQgPSB0aGlzLmVscy4kYmcuZmluZCgnLnNlYXJjaC1pbnB1dCcpO1xuICAgICAgICB0aGlzLmVscy4kc2VhcmNoUmVzdWx0c0NvbnRhaW5lciA9ICQoJyNzZWFyY2hSZXN1bHRzQ29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMuZWxzLiRzZWFyY2hCeSA9ICQoJyNzZWFyY2hCeScpO1xuICAgICAgICB0aGlzLmVscy4kYWR2YW5jZWRPcHRpb25zID0gJCgnI3NlYXJjaE9wdGlvbnMnKTtcbiAgICAgICAgdGhpcy5lbHMuJHNlYXJjaEVycm9ycyA9ICQoJyNzZWFyY2hFcnJvcnMnKTtcblxuICAgICAgICAkYmcuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIHRoaXMuZWxzLiR0cmlnZ2VySW5wdXQub24oJ2ZvY3VzJywgdGhpcy5tZXRob2RzLmxvYWRCYWNrZHJvcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAkYmcub24oJ2NsaWNrJywgJy5jbGljay10cmFwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0ID09IGUuY3VycmVudFRhcmdldCAmJiB0aGlzLm1ldGhvZHMub25DbG9zZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKCdzdWJtaXQnLCAnZm9ybScsIHRoaXMubWV0aG9kcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLmVscy4kYWR2YW5jZWRPcHRpb25zLm9uKCdjbGljaycsICdpbnB1dDpjaGVja2VkJywgdGhpcy5tZXRob2RzLnRvZ2dsZUNoZWNrZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubWV0aG9kcy5pbml0U2VhcmNoQnkuY2FsbCh0aGlzKTtcblx0fSxcblx0bWV0aG9kczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVwZW5kaW5nIG9uIHdoYXQncyBiZWluZyBzZWFyY2hlZCwgc2hvd3Mgb3IgaGlkZXMgYWR2YW5jZWQgb3B0aW9uIHRheG9ub215IHNlY3Rpb25zXG4gICAgICAgICAqL1xuICAgICAgICBpbml0U2VhcmNoQnkoKSB7XG4gICAgICAgICAgICBjb25zdCB0YXhvbm9taWVzID0gY2REYXRhLnRheG9ub215VHlwZTtcbiAgICAgICAgICAgIGNvbnN0ICRvcHRDb250YWluZXIgPSB0aGlzLmVscy4kYWR2YW5jZWRPcHRpb25zO1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlU2hvd0hpZGVPcHRpb25TZWN0aW9ucyA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlICYmIGUudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gZS50YXJnZXQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY3VyVHlwZXMgPSB0aGlzLmVscy4kc2VhcmNoQnkuZmluZCgnaW5wdXQ6Y2hlY2tlZCcpLmRhdGEoKS5zZWFyY2hUeXBlcztcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0YXhvbm9taWVzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICRvcHRDb250YWluZXIuZmluZCgnLicgKyB0YXhvbm9taWVzW2tleV0pW2N1clR5cGVzLmluY2x1ZGVzKGtleSkgPyAnc2hvdycgOiAnaGlkZSddKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGUgJiYgZS50YXJnZXQpIGdhRWxlbShlLnRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZWxzLiRzZWFyY2hCeS5vbignY2xpY2snLCAnaW5wdXQnLCB1cGRhdGVTaG93SGlkZU9wdGlvblNlY3Rpb25zKTtcbiAgICAgICAgICAgIHVwZGF0ZVNob3dIaWRlT3B0aW9uU2VjdGlvbnMobnVsbCk7XG4gICAgICAgIH0sXG5cdFx0bG9hZEJhY2tkcm9wKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy5hZGRDbGFzcyh0aGlzLm9wdHMuYXBwZW5kQ2xhc3MpO1xuICAgICAgICAgICAgZ2FFbGVtKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxzLiRpbm5lcklucHV0WzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIDApO1xuICAgICAgICB9LFxuICAgICAgICBvbkNsb3NlKCkge1xuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5hcHBlbmRDbGFzcyk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZUNoZWNrZWQoZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGUudGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgICBjb25zdCBpcyA9ICtlLnRhcmdldC5jaGVja2VkXG4gICAgICAgICAgICBjb25zdCBkaXNhYmxlID0gK2RhdGEud2FzQ2hlY2tlZCA9PT0gaXM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkaXNhYmxlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRhdGEud2FzQ2hlY2tlZCA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgZGF0YS53YXNDaGVja2VkID0gMTtcblxuICAgICAgICAgICAgLy8gZ2EgdHJhY2tpbmdcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGF4ID0gZS50YXJnZXQubmFtZS5tYXRjaCgvXFxbKFthLXotXSspXFxdLyk7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGF4KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXhvbm9teSA9IHRheFsxXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IGRpc2FibGUgPyAnZGlzYWJsZScgOiAnZW5hYmxlJztcbiAgICAgICAgICAgICAgICAgICAgZ2FUcmFjaygnaW50ZXJhY3Rpb24nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5fbmFtZTogJ3NlYXJjaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGAke2FjdGlvbn0gJHt0YXhvbm9teX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25TdWJtaXQoZSkge1xuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5oYXNFcnJvcnMpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tZXRob2RzLnRyaWdnZXJQcm9jZXNzaW5nLmNhbGwodGhpcywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmVscy4kc2VhcmNoUmVzdWx0c0NvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgICAgICAgdmFyIGRhdGE6e3NlYXJjaD86c3RyaW5nLCBzZWFyY2hfdHlwZT86c3RyaW5nfSA9IGdldEZvcm1EYXRhKHRoaXMuZWxzLiRmb3JtKTtcbiAgICAgICAgICAgIGxldCBoYXNUYXhvbm9taWVzID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCB0YXhvbm9teSA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihrZXkgPT4gL150YXhvbm9teS8udGVzdChrZXkpKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgdGF4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhhc1RheG9ub21pZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBhY2NbdGF4Lm1hdGNoKC9cXFsoW2Etei1dKylcXF0vKVsxXV0gPSBkYXRhW3RheF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgdmFyIGVycm9ycyA9IHRoaXMubWV0aG9kcy52YWxpZGF0ZVNlYXJjaC5jYWxsKHRoaXMsIGRhdGEpO1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoIWVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwbS5yZXN0QmFzZSArICdzZWFyY2gvYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGRhdGEuc2VhcmNoX3R5cGUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICggeGhyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoICdYLVdQLU5vbmNlJywgcG0ud3Bfbm9uY2UgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhUGFyYW1zOmFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5fbmFtZTogJ3NlYXJjaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBgc2VhcmNoICR7ZGF0YS5zZWFyY2hfdHlwZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1RheG9ub21pZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGF4b25vbXkpLmZvckVhY2godGF4ID0+IGdhUGFyYW1zW2B0YXhvbm9teVske3RheH1dYF0gPSB0YXhvbm9teVt0YXhdICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zZWFyY2gpIGdhUGFyYW1zLnNlYXJjaCA9IGRhdGEuc2VhcmNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FUcmFjaygnaW50ZXJhY3Rpb24nLCBnYVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMucmVzdWx0c0xvYWRlZC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZTpDRFJlc3BvbnNlKTpDRFJlc3BvbnNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciAnICsgcmVzcG9uc2UucmVzdWx0LCByZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQubWV0aG9kcy50cmlnZ2VyUHJvY2Vzc2luZy5jYWxsKHRoYXQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaEVycm9ycy5hcHBlbmQoZXJyb3JzLm1hcChlcnIgPT4gYDxzcGFuPiR7ZXJyfTwvc3Bhbj5gKS5qb2luKCc8YnIgLz4nKSlcbiAgICAgICAgICAgICAgICB0aGlzLmVscy4kYmcuYWRkQ2xhc3ModGhpcy5vcHRzLmhhc0Vycm9ycyk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLnRyaWdnZXJQcm9jZXNzaW5nLmNhbGwodGhpcywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJpZ2dlclByb2Nlc3NpbmcoIGxvYWRpbmc6Ym9vbGVhbiwgbG9hZGVkOmJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMucHJvY2Vzc2luZyxcbiAgICAgICAgICAgICAgICBsb2FkaW5nXG4gICAgICAgICAgICApLnRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5wcm9jZXNzZWQsXG4gICAgICAgICAgICAgICAgbG9hZGVkXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoIGxvYWRpbmcgKSB0aGlzLmVscy4kYmcucmVtb3ZlQ2xhc3ModGhpcy5vcHRzLm5vUmVzdWx0cyk7XG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkYXRlU2VhcmNoKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBbXTtcblxuICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgICAgICAgICAgY29uc3QgaGFzVGF4ID0ga2V5cy5zb21lKGtleSA9PiAvXnRheG9ub215Ly50ZXN0KGtleSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWhhc1RheCAmJiBkYXRhLnNlYXJjaCA9PSAnJykge1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiU2VhcmNoIG11c3Qgbm90IGJlIGVtcHR5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZGF0YS5zZWFyY2ggJiYgZGF0YS5zZWFyY2gubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiVGhlIHNlYXJjaCBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycyBsb25nXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgICAgICB9LFxuICAgICAgICByZXN1bHRzTG9hZGVkKHJlczpzdHJpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOkNEUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcyk7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnJlc3VsdCAhPT0gMjAwICkgdGhyb3cgcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IGhhc1Jlc3VsdHMgPSAhIXJlc3BvbnNlLmRhdGEucmVzdWx0cztcblxuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLnRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5ub1Jlc3VsdHMsICFoYXNSZXN1bHRzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoaGFzUmVzdWx0cyAmJiByZXNwb25zZS5kYXRhLmh0bWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVscy4kc2VhcmNoUmVzdWx0c0NvbnRhaW5lci5odG1sKHJlc3BvbnNlLmRhdGEuaHRtbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0fVxufTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KCkge1xuICAgIGluaXRDb25uZWN0KCk7XG4gICAgaW5pdEZBUSgpO1xufVxuXG5mdW5jdGlvbiBpbml0RkFRKCk6Ym9vbGVhbiB7XG4gICAgY29uc3QgJEZBUSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGQVEnKTtcblxuICAgIGlmICghJEZBUSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgalF1ZXJ5KCRGQVEpLm9uKCdjbGljaycsICdoMycsIGV2ZW50ID0+IHsgalF1ZXJ5KGV2ZW50LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ3RvZ2dsZWQnKTsgfSlcbiAgICBcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaW5pdENvbm5lY3QoKTpib29sZWFuIHtcbiAgICBjb25zdCAkYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlQ29ubmVjdCcpO1xuXG4gICAgaWYgKCEkYm9keSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgJGxvZ2luID0galF1ZXJ5KCcudXdwLWxvZ2luLWNsYXNzJyk7XG4gICAgXG4gICAgJGxvZ2luLmZpbmQoJy51d3AtbG9naW4tZm9ybScpXG4gICAgICAgIC5hdHRyKCdlbmN0eXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKVxuICAgICAgICAuYXR0cignYWN0aW9uJywgJy93cC93cC1sb2dpbi5waHAnKTtcblxuICAgICRsb2dpbi5maW5kKCcjdXNlcm5hbWUnKS5hdHRyKCdpZCcsICd1c2VyX2xvZ2luJykuYXR0cignbmFtZScsICdsb2cnKTtcbiAgICAkbG9naW4uZmluZCgnI3Bhc3N3b3JkJykuYXR0cignaWQnLCAndXNlcl9wYXNzJykuYXR0cignbmFtZScsICdwd2QnKTtcblxuICAgIGNvbnN0ICRuYXZMaW5rcyA9IGpRdWVyeSgnLm5hdi1saW5rJyk7XG4gICAgalF1ZXJ5KCRib2R5KS5vbignY2xpY2snLCAnLm5hdi1saW5rJywgZXZlbnQgPT4ge1xuICAgICAgICAkbmF2TGlua3MucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoZXZlbnQudGFyZ2V0KS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn0iLCJjb25zdCBjYW4gPSAoKSA9PiAhIXdpbmRvdy5ndGFnO1xubGV0ICQ6SlF1ZXJ5U3RhdGljO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChfJDpKUXVlcnlTdGF0aWMpIHtcbiAgICAkID0gXyQ7XG4gICAgaWYgKCFjYW4oKSkgcmV0dXJuO1xuICAgIFxuICAgICQoZG9jdW1lbnQuYm9keSkub24oJ2NsaWNrJywgJy5ndGFnJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0KSBnYUVsZW0oZS50YXJnZXQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2FFbGVtKCBlbGVtOkhUTUxFbGVtZW50ICkge1xuICAgIGNvbnN0IGRhdGEgPSAkKGVsZW0pLmRhdGEoKTtcbiAgICBjb25zdCBjb21tYW5kID0gZGF0YS5nYUNvbW1hbmQgfHwgJ2V2ZW50JztcbiAgICBjb25zdCBldmVudE5hbWUgPSBkYXRhLmdhRXZlbnQ7XG4gICAgY29uc3QgcGFyYW1zID0gZGF0YS5nYVBhcmFtcyB8fCB7fTtcblxuICAgIGlmICghZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgZ2FFbGVtIGNhbGwgdXNpbmc6JywgZGF0YSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyggJ2dhRWxlbSgpJywgY29tbWFuZCwgZXZlbnROYW1lLCBwYXJhbXMgKTtcbiAgICBndGFnKGNvbW1hbmQsIGV2ZW50TmFtZSwgcGFyYW1zKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhVHJhY2soZXZlbnROYW1lOnN0cmluZywgcGFyYW1zOnt9ID0ge30sIGNvbW1hbmQ6c3RyaW5nID0gJ2V2ZW50Jykge1xuICAgIC8vIGNvbnNvbGUubG9nKCAnZ2FUcmFjaygpJywgY29tbWFuZCwgZXZlbnROYW1lLCBwYXJhbXMgKTtcbiAgICBndGFnKGNvbW1hbmQsIGV2ZW50TmFtZSwgcGFyYW1zKTtcbn0iLCJjb25zdCBvblN1Ym1pdCA9ICh0b2tlbjpzdHJpbmcpID0+IHtcblx0JCgnLnV3cC1yZWdpc3RyYXRpb24tZm9ybScpWzBdLm9uc3VibWl0KG5ldyBFdmVudCgnc3VibWl0JykpO1xufVxuXG5jb25zdCByZWdpc3RyYXRpb24gPSAoKSA9PiB7XG5cdHZhciAkYnV0dG9uID0gJCgnLnV3cF9yZWdpc3Rlcl9zdWJtaXQnKTtcblxuXHQkYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGU6RXZlbnQpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Z3JlY2FwdGNoYS5leGVjdXRlKHBtLnJlY2FwdGNoYS5rZXlfdjMsIHthY3Rpb246ICdzdWJtaXQnfSlcblx0XHRcdC50aGVuKG9uU3VibWl0KTtcblx0fSk7XG5cblx0dmFyIGNhcHRjaGFDb250YWluZXIgPSBudWxsO1xuICAgIHZhciBsb2FkQ2FwdGNoYSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2FwdGNoYUNvbnRhaW5lciA9IGdyZWNhcHRjaGEucmVuZGVyKCdjYXB0Y2hhX2NvbnRhaW5lcicsIHtcbiAgICAgICAgJ3NpdGVrZXknIDogcG0ucmVjYXB0Y2hhLmtleV92MixcbiAgICAgIH0pO1xuICAgIH07XG5cblx0JGJ1dHRvbi5iZWZvcmUoJzxkaXYgaWQ9XCJjYXB0Y2hhX2NvbnRhaW5lclwiPjwvZGl2PicpXG5cdGxvYWRDYXB0Y2hhKCk7XG59O1xuXG5jb25zdCBsb2FkUmVjYXB0Y2hhSW5zdGFuY2VzID0gKCkgPT4ge1xuXHRpZiAoL15cXC9yZWdpc3RyYS8udGVzdChsb2NhdGlvbi5wYXRobmFtZSkpIHJlZ2lzdHJhdGlvbigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB3aW5kb3cuZ3JlY2FwdGNoYSAmJiBncmVjYXB0Y2hhLnJlYWR5KGxvYWRSZWNhcHRjaGFJbnN0YW5jZXMpOyIsImltcG9ydCAnQC9pbmRleC5zdHlsJztcbmltcG9ydCByZUNhcHRjaGFJbml0IGZyb20gJ1RoaXJkUGFydHkvUmVjYXB0Y2hhL1JlY2FwdGNoYS50cyc7XG5pbXBvcnQgeyBpbml0IGFzIGdBbmFseXRpY3NJbml0IH0gZnJvbSAnVGhpcmRQYXJ0eS9HQW5hbHl0aWNzL2N1c3RvbVRyYWNraW5nLnRzJztcbmltcG9ydCB7IGluaXQgYXMgYW5hbHl0aWNzRXZlbnRzIH0gZnJvbSAnQC9TRU8vQW5hbHl0aWNzRXZlbnRzLnRzJztcbmltcG9ydCBTZWFyY2ggZnJvbSAnQC9TZWFyY2gvaW5kZXgudHMnO1xuaW1wb3J0IGluaXRQYWdlcyBmcm9tICdAL1RlbXBsYXRlcy9QYWdlL3BhZ2UnO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0JCgoKSA9PiB7XG4gICAgICAgIGdBbmFseXRpY3NJbml0KCQpO1xuICAgICAgICBhbmFseXRpY3NFdmVudHMoKTtcblx0XHRTZWFyY2guaW5pdCgkKTtcbiAgICAgICAgaW5pdFBhZ2VzKCk7XG4gICAgICAgIHJlQ2FwdGNoYUluaXQoKTtcblx0fSlcbn0pKGpRdWVyeSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9