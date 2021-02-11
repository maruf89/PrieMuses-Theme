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
            if (data.search && data.search.length < 3) {
                errors.push("The search must be at least 3 characters long");
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
    addHashActiveClass();
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
function addHashActiveClass() {
    if (!window.location.hash)
        return;
    var $el = jQuery(window.location.hash);
    if ($el.length)
        $el.addClass('active');
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
var gaElem = !can() ? function () { } : function (elem) {
    var data = $(elem).data();
    var command = data.gaCommand || 'event';
    var eventName = data.gaEvent;
    var params = data.gaParams || {};
    if (!eventName) {
        console.error('Invalid gaElem call using:', data);
        return;
    }
    gtag(command, eventName, params);
};
var gaTrack = !can() ? function () { } : function (eventName, params, command) {
    if (params === void 0) { params = {}; }
    if (command === void 0) { command = 'event'; }
    gtag(command, eventName, params);
};


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
/* harmony import */ var templates_entity_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! templates/entity/entity */ "./templates/entity/entity.ts");







(function ($) {
    $(function () {
        (0,ThirdParty_GAnalytics_customTracking_ts__WEBPACK_IMPORTED_MODULE_2__.init)($);
        (0,_SEO_AnalyticsEvents_ts__WEBPACK_IMPORTED_MODULE_3__.init)();
        _Search_index_ts__WEBPACK_IMPORTED_MODULE_4__.default.init($);
        (0,templates_entity_entity__WEBPACK_IMPORTED_MODULE_6__.default)($);
        (0,_Templates_Page_page__WEBPACK_IMPORTED_MODULE_5__.default)();
        (0,ThirdParty_Recaptcha_Recaptcha_ts__WEBPACK_IMPORTED_MODULE_1__.default)();
    });
})(jQuery);


/***/ }),

/***/ "./templates/entity/entity.ts":
/*!************************************!*\
  !*** ./templates/entity/entity.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var $;
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_$) {
    $ = _$;
    var $el = $('#entityPage');
    if ($el.length)
        new EntityPage($el);
}
var EntityPage = (function () {
    function EntityPage($parent) {
        this.classes = {
            'body-edit': 'editable'
        };
        this.els = {
            $parent: null,
            $trigger: null
        };
        this.els.$parent = $parent;
        this.els.$trigger = $('#triggerEdit');
        this.bindElements();
    }
    EntityPage.prototype.bindElements = function () {
        this.els.$parent.on('click', "#" + this.els.$trigger[0].id, this.triggerEdit.bind(this));
    };
    EntityPage.prototype.triggerEdit = function (e) {
        e.preventDefault();
        var enable = true;
        this.els.$parent.toggleClass(this.classes['body-edit'], enable);
        this.els.$parent.find('.field').attr('contenteditable', String(enable));
    };
    return EntityPage;
}());


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9IZWxwZXJzL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1NFTy9BbmFseXRpY3NFdmVudHMudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL01vZHVsZXMvU2VhcmNoL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1RlbXBsYXRlcy9QYWdlL3BhZ2UudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL1RoaXJkUGFydHkvR0FuYWx5dGljcy9jdXN0b21UcmFja2luZy50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvVGhpcmRQYXJ0eS9SZWNhcHRjaGEvUmVjYXB0Y2hhLnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi90ZW1wbGF0ZXMvZW50aXR5L2VudGl0eS50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9pbmRleC5zdHlsIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFB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QUM7SUFDTCxpQkFBQztBQUFELENBQUM7Ozs7Ozs7Ozs7OztBQ25DRDs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJzaXRlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtRGF0YSgkZm9ybSkge1xuICAgIHZhciB1bmluZGV4ZWRfYXJyYXkgPSAkZm9ybS5zZXJpYWxpemVBcnJheSgpO1xuICAgIHZhciBpbmRleGVkX2FycmF5ID0ge307XG5cbiAgICBqUXVlcnkubWFwKHVuaW5kZXhlZF9hcnJheSwgZnVuY3Rpb24obiwgaSl7XG4gICAgICAgIGluZGV4ZWRfYXJyYXlbblsnbmFtZSddXSA9IG5bJ3ZhbHVlJ107XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5kZXhlZF9hcnJheTtcbn0iLCJpbXBvcnQgeyBnYUVsZW0gfSBmcm9tICdUaGlyZFBhcnR5L0dBbmFseXRpY3MvY3VzdG9tVHJhY2tpbmcudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpZiAoIWNkRGF0YSB8fCAhY2REYXRhLmV2ZW50cykgcmV0dXJuO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGNkRGF0YS5ldmVudHMubWFwLnBvcHVwT3BlbiwgdHJhY2tNYXBFdmVudCk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGNkRGF0YS5ldmVudHMubWFwLnBvcHVwQ2xvc2UsIHRyYWNrTWFwRXZlbnQpO1xufVxuXG5mdW5jdGlvbiB0cmFja01hcEV2ZW50KHsgZGV0YWlsIH0pIHtcbiAgICBjb25zdCB7ICRlbGVtZW50LCBlIH0gPSBkZXRhaWw7XG4gICAgY29uc3QgdGFyZ2V0ID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtZ2EtZXZlbnRdJykuZmlyc3QoKTtcbiAgICBpZiAodGFyZ2V0Lmxlbmd0aCkgZ2FFbGVtKHRhcmdldCk7XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL190eXBlcy9tYWluLmQudHNcIiAvPlxuXG5pbXBvcnQgeyBnZXRGb3JtRGF0YSB9IGZyb20gJ0AvSGVscGVycy9pbmRleCc7XG5pbXBvcnQgeyBnYUVsZW0sIGdhVHJhY2sgfSBmcm9tICdUaGlyZFBhcnR5L0dBbmFseXRpY3MvY3VzdG9tVHJhY2tpbmcudHMnO1xuXG5sZXQgJDp0eXBlb2YgalF1ZXJ5ID0gbnVsbDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG9wdHM6IHtcbiAgICAgICAgaW5pdGVkOiAwLFxuICAgICAgICAvLyBDbGFzcyBuYW1lc1xuICAgICAgICBhcHBlbmRDbGFzczogJ19hcHBlbmRlZCcsIC8vIFNlYXJjaCBhY3RpdmVcbiAgICAgICAgcHJvY2Vzc2luZzogJ19wcm9jZXNzaW5nJywgLy8gbG9hZGluZyBjbGFzc1xuICAgICAgICBwcm9jZXNzZWQ6ICdfcHJvY2Vzc2VkJywgLy8gU2VhcmNoIGxvYWRlZFxuICAgICAgICBub1Jlc3VsdHM6ICdfbm8tcmVzdWx0cycsXG4gICAgICAgIGhhc0Vycm9yczogJ19oYXMtZXJyb3JzJyxcbiAgICB9LFxuICAgIC8vIGVsZW1lbnRzXG4gICAgZWxzOiB7XG4gICAgICAgICRzZWFyY2g6IG51bGwsXG4gICAgICAgICR0cmlnZ2VySW5wdXQ6IG51bGwsXG4gICAgICAgICRmb3JtOiBudWxsLCAvLyB0aGUgZm9ybSBpbiB0aGUgb3ZlcmxheVxuICAgICAgICAkYmc6IG51bGwsXG4gICAgICAgICRiZ1Nsb3Q6IG51bGwsXG4gICAgICAgICRzZWFyY2hSZXN1bHRzQ29udGFpbmVyOiBudWxsLFxuICAgICAgICAkc2VhcmNoQnk6IG51bGwsIC8vIHRoZSBkaXYgY29udGFpbmluZyB0aGUgcHJpbWFyeSBmaWx0ZXJzIHRvIHNlYXJjaCBieVxuICAgICAgICAkc2VhcmNoRXJyb3JzOiBudWxsLCAvLyBjb250YWluZXIgZm9yIGRpc3BsYXkgZXJyb3JzXG4gICAgICAgICRhZHZhbmNlZE9wdGlvbnM6IG51bGwsIC8vIEVsIGZvciB0aGUgY2F0ZWdvcnkgZmlsdGVyc1xuICAgIH0sXG5cdGluaXQ6IGZ1bmN0aW9uKF8kOnR5cGVvZiBqUXVlcnkpIHtcbiAgICAgICAgJCA9IF8kO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmluaXRlZCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgLy8gc28gYXMgbm90IHRvIHJlIGNhbGxcblx0XHR0aGlzLm9wdHMuaW5pdGVkID0gMTtcblxuICAgICAgICB0aGlzLmVscy4kc2VhcmNoID0gJCgnI3NlYXJjaEJveCcpO1xuICAgICAgICB0aGlzLmVscy4kdHJpZ2dlcklucHV0ID0gdGhpcy5lbHMuJHNlYXJjaC5maW5kKCcuc2VhcmNoLWlucHV0Jyk7XG4gICAgICAgIHZhciAkYmcgPSB0aGlzLmVscy4kYmcgPSAkKCcjc2VhcmNoT3ZlcmxheScpO1xuXG4gICAgICAgIHRoaXMuZWxzLiRmb3JtID0gdGhpcy5lbHMuJGJnLmZpbmQoJ2Zvcm0nKTtcbiAgICAgICAgdGhpcy5lbHMuJGlubmVySW5wdXQgPSB0aGlzLmVscy4kYmcuZmluZCgnLnNlYXJjaC1pbnB1dCcpO1xuICAgICAgICB0aGlzLmVscy4kc2VhcmNoUmVzdWx0c0NvbnRhaW5lciA9ICQoJyNzZWFyY2hSZXN1bHRzQ29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMuZWxzLiRzZWFyY2hCeSA9ICQoJyNzZWFyY2hCeScpO1xuICAgICAgICB0aGlzLmVscy4kYWR2YW5jZWRPcHRpb25zID0gJCgnI3NlYXJjaE9wdGlvbnMnKTtcbiAgICAgICAgdGhpcy5lbHMuJHNlYXJjaEVycm9ycyA9ICQoJyNzZWFyY2hFcnJvcnMnKTtcblxuICAgICAgICAkYmcuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIHRoaXMuZWxzLiR0cmlnZ2VySW5wdXQub24oJ2ZvY3VzJywgdGhpcy5tZXRob2RzLmxvYWRCYWNrZHJvcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAkYmcub24oJ2NsaWNrJywgJy5jbGljay10cmFwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0ID09IGUuY3VycmVudFRhcmdldCAmJiB0aGlzLm1ldGhvZHMub25DbG9zZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKCdzdWJtaXQnLCAnZm9ybScsIHRoaXMubWV0aG9kcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLmVscy4kYWR2YW5jZWRPcHRpb25zLm9uKCdjbGljaycsICdpbnB1dDpjaGVja2VkJywgdGhpcy5tZXRob2RzLnRvZ2dsZUNoZWNrZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubWV0aG9kcy5pbml0U2VhcmNoQnkuY2FsbCh0aGlzKTtcblx0fSxcblx0bWV0aG9kczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVwZW5kaW5nIG9uIHdoYXQncyBiZWluZyBzZWFyY2hlZCwgc2hvd3Mgb3IgaGlkZXMgYWR2YW5jZWQgb3B0aW9uIHRheG9ub215IHNlY3Rpb25zXG4gICAgICAgICAqL1xuICAgICAgICBpbml0U2VhcmNoQnkoKSB7XG4gICAgICAgICAgICBjb25zdCB0YXhvbm9taWVzID0gY2REYXRhLnRheG9ub215VHlwZTtcbiAgICAgICAgICAgIGNvbnN0ICRvcHRDb250YWluZXIgPSB0aGlzLmVscy4kYWR2YW5jZWRPcHRpb25zO1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlU2hvd0hpZGVPcHRpb25TZWN0aW9ucyA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlICYmIGUudGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91cyA9PT0gZS50YXJnZXQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY3VyVHlwZXMgPSB0aGlzLmVscy4kc2VhcmNoQnkuZmluZCgnaW5wdXQ6Y2hlY2tlZCcpLmRhdGEoKS5zZWFyY2hUeXBlcztcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0YXhvbm9taWVzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICRvcHRDb250YWluZXIuZmluZCgnLicgKyB0YXhvbm9taWVzW2tleV0pW2N1clR5cGVzLmluY2x1ZGVzKGtleSkgPyAnc2hvdycgOiAnaGlkZSddKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGUgJiYgZS50YXJnZXQpIGdhRWxlbShlLnRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZWxzLiRzZWFyY2hCeS5vbignY2xpY2snLCAnaW5wdXQnLCB1cGRhdGVTaG93SGlkZU9wdGlvblNlY3Rpb25zKTtcbiAgICAgICAgICAgIHVwZGF0ZVNob3dIaWRlT3B0aW9uU2VjdGlvbnMobnVsbCk7XG4gICAgICAgIH0sXG5cdFx0bG9hZEJhY2tkcm9wKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy5hZGRDbGFzcyh0aGlzLm9wdHMuYXBwZW5kQ2xhc3MpO1xuICAgICAgICAgICAgZ2FFbGVtKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxzLiRpbm5lcklucHV0WzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIDApO1xuICAgICAgICB9LFxuICAgICAgICBvbkNsb3NlKCkge1xuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5hcHBlbmRDbGFzcyk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZUNoZWNrZWQoZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGUudGFyZ2V0LmRhdGFzZXQ7XG4gICAgICAgICAgICBjb25zdCBpcyA9ICtlLnRhcmdldC5jaGVja2VkXG4gICAgICAgICAgICBjb25zdCBkaXNhYmxlID0gK2RhdGEud2FzQ2hlY2tlZCA9PT0gaXM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkaXNhYmxlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRhdGEud2FzQ2hlY2tlZCA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgZGF0YS53YXNDaGVja2VkID0gMTtcblxuICAgICAgICAgICAgLy8gZ2EgdHJhY2tpbmdcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGF4ID0gZS50YXJnZXQubmFtZS5tYXRjaCgvXFxbKFthLXotXSspXFxdLyk7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGF4KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXhvbm9teSA9IHRheFsxXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IGRpc2FibGUgPyAnZGlzYWJsZScgOiAnZW5hYmxlJztcbiAgICAgICAgICAgICAgICAgICAgZ2FUcmFjaygnaW50ZXJhY3Rpb24nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5fbmFtZTogJ3NlYXJjaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGAke2FjdGlvbn0gJHt0YXhvbm9teX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25TdWJtaXQoZSkge1xuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5oYXNFcnJvcnMpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tZXRob2RzLnRyaWdnZXJQcm9jZXNzaW5nLmNhbGwodGhpcywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmVscy4kc2VhcmNoUmVzdWx0c0NvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgICAgICAgdmFyIGRhdGE6e3NlYXJjaD86c3RyaW5nLCBzZWFyY2hfdHlwZT86c3RyaW5nfSA9IGdldEZvcm1EYXRhKHRoaXMuZWxzLiRmb3JtKTtcbiAgICAgICAgICAgIGxldCBoYXNUYXhvbm9taWVzID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCB0YXhvbm9teSA9IE9iamVjdC5rZXlzKGRhdGEpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihrZXkgPT4gL150YXhvbm9teS8udGVzdChrZXkpKVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGFjYywgdGF4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGhhc1RheG9ub21pZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBhY2NbdGF4Lm1hdGNoKC9cXFsoW2Etei1dKylcXF0vKVsxXV0gPSBkYXRhW3RheF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgdmFyIGVycm9ycyA9IHRoaXMubWV0aG9kcy52YWxpZGF0ZVNlYXJjaC5jYWxsKHRoaXMsIGRhdGEpO1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoIWVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwbS5yZXN0QmFzZSArICdzZWFyY2gvYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGRhdGEuc2VhcmNoX3R5cGUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICggeGhyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoICdYLVdQLU5vbmNlJywgcG0ud3Bfbm9uY2UgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhUGFyYW1zOmFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5fbmFtZTogJ3NlYXJjaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBgc2VhcmNoICR7ZGF0YS5zZWFyY2hfdHlwZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1RheG9ub21pZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGF4b25vbXkpLmZvckVhY2godGF4ID0+IGdhUGFyYW1zW2B0YXhvbm9teVske3RheH1dYF0gPSB0YXhvbm9teVt0YXhdICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zZWFyY2gpIGdhUGFyYW1zLnNlYXJjaCA9IGRhdGEuc2VhcmNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FUcmFjaygnaW50ZXJhY3Rpb24nLCBnYVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMucmVzdWx0c0xvYWRlZC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZTpDRFJlc3BvbnNlKTpDRFJlc3BvbnNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciAnICsgcmVzcG9uc2UucmVzdWx0LCByZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQubWV0aG9kcy50cmlnZ2VyUHJvY2Vzc2luZy5jYWxsKHRoYXQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaEVycm9ycy5hcHBlbmQoZXJyb3JzLm1hcChlcnIgPT4gYDxzcGFuPiR7ZXJyfTwvc3Bhbj5gKS5qb2luKCc8YnIgLz4nKSlcbiAgICAgICAgICAgICAgICB0aGlzLmVscy4kYmcuYWRkQ2xhc3ModGhpcy5vcHRzLmhhc0Vycm9ycyk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLnRyaWdnZXJQcm9jZXNzaW5nLmNhbGwodGhpcywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJpZ2dlclByb2Nlc3NpbmcoIGxvYWRpbmc6Ym9vbGVhbiwgbG9hZGVkOmJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMucHJvY2Vzc2luZyxcbiAgICAgICAgICAgICAgICBsb2FkaW5nXG4gICAgICAgICAgICApLnRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5wcm9jZXNzZWQsXG4gICAgICAgICAgICAgICAgbG9hZGVkXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAobG9hZGluZykgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5ub1Jlc3VsdHMpO1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0ZVNlYXJjaChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gW107XG5cbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IGhhc1RheCA9IGtleXMuc29tZShrZXkgPT4gL150YXhvbm9teS8udGVzdChrZXkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRhdGEuc2VhcmNoICYmIGRhdGEuc2VhcmNoLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChcIlRoZSBzZWFyY2ggbXVzdCBiZSBhdCBsZWFzdCAzIGNoYXJhY3RlcnMgbG9uZ1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICAgICAgfSxcbiAgICAgICAgcmVzdWx0c0xvYWRlZChyZXM6c3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZTpDRFJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5yZXN1bHQgIT09IDIwMCApIHRocm93IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICBjb25zdCBoYXNSZXN1bHRzID0gISFyZXNwb25zZS5kYXRhLnJlc3VsdHM7XG5cbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMubm9SZXN1bHRzLCAhaGFzUmVzdWx0c1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGhhc1Jlc3VsdHMgJiYgcmVzcG9uc2UuZGF0YS5odG1sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaFJlc3VsdHNDb250YWluZXIuaHRtbChyZXNwb25zZS5kYXRhLmh0bWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cbn07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpbml0Q29ubmVjdCgpO1xuICAgIGluaXRGQVEoKTtcbiAgICBhZGRIYXNoQWN0aXZlQ2xhc3MoKTtcbn1cblxuZnVuY3Rpb24gaW5pdEZBUSgpOmJvb2xlYW4ge1xuICAgIGNvbnN0ICRGQVEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRkFRJyk7XG5cbiAgICBpZiAoISRGQVEpIHJldHVybiBmYWxzZTtcblxuICAgIGpRdWVyeSgkRkFRKS5vbignY2xpY2snLCAnaDMnLCBldmVudCA9PiB7IGpRdWVyeShldmVudC50YXJnZXQpLnRvZ2dsZUNsYXNzKCd0b2dnbGVkJyk7IH0pXG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGluaXRDb25uZWN0KCk6Ym9vbGVhbiB7XG4gICAgY29uc3QgJGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZUNvbm5lY3QnKTtcblxuICAgIGlmICghJGJvZHkpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0ICRsb2dpbiA9IGpRdWVyeSgnLnV3cC1sb2dpbi1jbGFzcycpO1xuICAgIFxuICAgICRsb2dpbi5maW5kKCcudXdwLWxvZ2luLWZvcm0nKVxuICAgICAgICAuYXR0cignZW5jdHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJylcbiAgICAgICAgLmF0dHIoJ2FjdGlvbicsICcvd3Avd3AtbG9naW4ucGhwJyk7XG5cbiAgICAkbG9naW4uZmluZCgnI3VzZXJuYW1lJykuYXR0cignaWQnLCAndXNlcl9sb2dpbicpLmF0dHIoJ25hbWUnLCAnbG9nJyk7XG4gICAgJGxvZ2luLmZpbmQoJyNwYXNzd29yZCcpLmF0dHIoJ2lkJywgJ3VzZXJfcGFzcycpLmF0dHIoJ25hbWUnLCAncHdkJyk7XG5cbiAgICBjb25zdCAkbmF2TGlua3MgPSBqUXVlcnkoJy5uYXYtbGluaycpO1xuICAgIGpRdWVyeSgkYm9keSkub24oJ2NsaWNrJywgJy5uYXYtbGluaycsIGV2ZW50ID0+IHtcbiAgICAgICAgJG5hdkxpbmtzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KGV2ZW50LnRhcmdldCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogQWRkcyBhbiBhY3RpdmUgY2xhc3MgdG8gYW55IGVsZW1lbnQgbWF0Y2hpbmcgdGhlIHVybCdzIGhhc2hcbiAqL1xuZnVuY3Rpb24gYWRkSGFzaEFjdGl2ZUNsYXNzKCkge1xuICAgIGlmICghd2luZG93LmxvY2F0aW9uLmhhc2gpIHJldHVybjtcbiAgICBjb25zdCAkZWwgPSAgalF1ZXJ5KHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICBpZiAoJGVsLmxlbmd0aCkgJGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcbn0iLCJjb25zdCBjYW4gPSAoKSA9PiAhIXdpbmRvdy5ndGFnO1xubGV0ICQ6SlF1ZXJ5U3RhdGljO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChfJDpKUXVlcnlTdGF0aWMpIHtcbiAgICAkID0gXyQ7XG4gICAgaWYgKCFjYW4oKSkgcmV0dXJuO1xuICAgIFxuICAgICQoZG9jdW1lbnQuYm9keSkub24oJ2NsaWNrJywgJy5ndGFnJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0KSBnYUVsZW0oZS50YXJnZXQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgZ2FFbGVtID0gIWNhbigpID8gKCkgPT4ge30gOiAoIGVsZW06SFRNTEVsZW1lbnQgKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9ICQoZWxlbSkuZGF0YSgpO1xuICAgIGNvbnN0IGNvbW1hbmQgPSBkYXRhLmdhQ29tbWFuZCB8fCAnZXZlbnQnO1xuICAgIGNvbnN0IGV2ZW50TmFtZSA9IGRhdGEuZ2FFdmVudDtcbiAgICBjb25zdCBwYXJhbXMgPSBkYXRhLmdhUGFyYW1zIHx8IHt9O1xuXG4gICAgaWYgKCFldmVudE5hbWUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW52YWxpZCBnYUVsZW0gY2FsbCB1c2luZzonLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKCAnZ2FFbGVtKCknLCBjb21tYW5kLCBldmVudE5hbWUsIHBhcmFtcyApO1xuICAgIGd0YWcoY29tbWFuZCwgZXZlbnROYW1lLCBwYXJhbXMpO1xufVxuXG5leHBvcnQgY29uc3QgZ2FUcmFjayA9ICFjYW4oKSA/ICgpID0+IHt9IDogKGV2ZW50TmFtZTpzdHJpbmcsIHBhcmFtczp7fSA9IHt9LCBjb21tYW5kOnN0cmluZyA9ICdldmVudCcpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyggJ2dhVHJhY2soKScsIGNvbW1hbmQsIGV2ZW50TmFtZSwgcGFyYW1zICk7XG4gICAgZ3RhZyhjb21tYW5kLCBldmVudE5hbWUsIHBhcmFtcyk7XG59IiwiY29uc3Qgb25TdWJtaXQgPSAodG9rZW46c3RyaW5nKSA9PiB7XG5cdCQoJy51d3AtcmVnaXN0cmF0aW9uLWZvcm0nKVswXS5vbnN1Ym1pdChuZXcgRXZlbnQoJ3N1Ym1pdCcpKTtcbn1cblxuY29uc3QgcmVnaXN0cmF0aW9uID0gKCkgPT4ge1xuXHR2YXIgJGJ1dHRvbiA9ICQoJy51d3BfcmVnaXN0ZXJfc3VibWl0Jyk7XG5cblx0JGJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihlOkV2ZW50KSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGdyZWNhcHRjaGEuZXhlY3V0ZShwbS5yZWNhcHRjaGEua2V5X3YzLCB7YWN0aW9uOiAnc3VibWl0J30pXG5cdFx0XHQudGhlbihvblN1Ym1pdCk7XG5cdH0pO1xuXG5cdHZhciBjYXB0Y2hhQ29udGFpbmVyID0gbnVsbDtcbiAgICB2YXIgbG9hZENhcHRjaGEgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNhcHRjaGFDb250YWluZXIgPSBncmVjYXB0Y2hhLnJlbmRlcignY2FwdGNoYV9jb250YWluZXInLCB7XG4gICAgICAgICdzaXRla2V5JyA6IHBtLnJlY2FwdGNoYS5rZXlfdjIsXG4gICAgICB9KTtcbiAgICB9O1xuXG5cdCRidXR0b24uYmVmb3JlKCc8ZGl2IGlkPVwiY2FwdGNoYV9jb250YWluZXJcIj48L2Rpdj4nKVxuXHRsb2FkQ2FwdGNoYSgpO1xufTtcblxuY29uc3QgbG9hZFJlY2FwdGNoYUluc3RhbmNlcyA9ICgpID0+IHtcblx0aWYgKC9eXFwvcmVnaXN0cmEvLnRlc3QobG9jYXRpb24ucGF0aG5hbWUpKSByZWdpc3RyYXRpb24oKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gd2luZG93LmdyZWNhcHRjaGEgJiYgZ3JlY2FwdGNoYS5yZWFkeShsb2FkUmVjYXB0Y2hhSW5zdGFuY2VzKTsiLCJpbXBvcnQgJ0AvaW5kZXguc3R5bCc7XG5pbXBvcnQgcmVDYXB0Y2hhSW5pdCBmcm9tICdUaGlyZFBhcnR5L1JlY2FwdGNoYS9SZWNhcHRjaGEudHMnO1xuaW1wb3J0IHsgaW5pdCBhcyBnQW5hbHl0aWNzSW5pdCB9IGZyb20gJ1RoaXJkUGFydHkvR0FuYWx5dGljcy9jdXN0b21UcmFja2luZy50cyc7XG5pbXBvcnQgeyBpbml0IGFzIGFuYWx5dGljc0V2ZW50cyB9IGZyb20gJ0AvU0VPL0FuYWx5dGljc0V2ZW50cy50cyc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJ0AvU2VhcmNoL2luZGV4LnRzJztcbmltcG9ydCBpbml0UGFnZXMgZnJvbSAnQC9UZW1wbGF0ZXMvUGFnZS9wYWdlJztcbmltcG9ydCBpbml0RW50aXR5IGZyb20gJ3RlbXBsYXRlcy9lbnRpdHkvZW50aXR5JztcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoKCkgPT4ge1xuICAgICAgICBnQW5hbHl0aWNzSW5pdCgkKTtcbiAgICAgICAgYW5hbHl0aWNzRXZlbnRzKCk7XG4gICAgICAgIFNlYXJjaC5pbml0KCQpO1xuICAgICAgICBpbml0RW50aXR5KCQpO1xuICAgICAgICBpbml0UGFnZXMoKTtcbiAgICAgICAgcmVDYXB0Y2hhSW5pdCgpO1xuXHR9KVxufSkoalF1ZXJ5KTsiLCJsZXQgJDpKUXVlcnlTdGF0aWM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfJDpKUXVlcnlTdGF0aWMpIHtcbiAgICAkID0gXyQ7XG4gICAgbGV0ICRlbCA9ICQoJyNlbnRpdHlQYWdlJyk7XG4gICAgaWYgKCRlbC5sZW5ndGgpIG5ldyBFbnRpdHlQYWdlKCRlbCk7XG59XG5cbmNsYXNzIEVudGl0eVBhZ2Uge1xuICAgIHB1YmxpYyBjbGFzc2VzID0ge1xuICAgICAgICAnYm9keS1lZGl0JzogJ2VkaXRhYmxlJ1xuICAgIH07XG4gICAgXG4gICAgcHJpdmF0ZSBlbHMgPSB7XG4gICAgICAgICRwYXJlbnQ6IG51bGwsXG4gICAgICAgICR0cmlnZ2VyOiBudWxsXG4gICAgfTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigkcGFyZW50KSB7XG4gICAgICAgIHRoaXMuZWxzLiRwYXJlbnQgPSAkcGFyZW50O1xuICAgICAgICB0aGlzLmVscy4kdHJpZ2dlciA9ICQoJyN0cmlnZ2VyRWRpdCcpO1xuXG4gICAgICAgIHRoaXMuYmluZEVsZW1lbnRzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBiaW5kRWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMuZWxzLiRwYXJlbnQub24oJ2NsaWNrJywgYCMke3RoaXMuZWxzLiR0cmlnZ2VyWzBdLmlkfWAsIHRoaXMudHJpZ2dlckVkaXQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIHRyaWdnZXJFZGl0KGU6RXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBlbmFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVscy4kcGFyZW50LnRvZ2dsZUNsYXNzKHRoaXMuY2xhc3Nlc1snYm9keS1lZGl0J10sIGVuYWJsZSk7XG4gICAgICAgIHRoaXMuZWxzLiRwYXJlbnQuZmluZCgnLmZpZWxkJykuYXR0cignY29udGVudGVkaXRhYmxlJywgU3RyaW5nKGVuYWJsZSkpO1xuICAgIH1cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=