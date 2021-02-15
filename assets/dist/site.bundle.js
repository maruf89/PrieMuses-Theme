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
                    url: cdData.restBase + 'search/all',
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
/* harmony export */   "default": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "getAcfFieldByKey": () => /* binding */ getAcfFieldByKey,
/* harmony export */   "getUnscaledSrc": () => /* binding */ getUnscaledSrc
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
            'body-edit': 'editable',
            'loading': 'loading',
        };
        this.editEnabled = false;
        this.firstTime = true;
        this.els = {
            $parent: null,
            $profilePhoto: null,
            $form: null,
        };
        if (!acf) {
            console.error('Missing ACF js library');
            return;
        }
        this.els.$parent = $parent;
        this.els.$profilePhoto = $('#profilePhoto');
        this.els.$form = $('#acf-form');
        if (this.els.$form.length)
            this.bindElements();
    }
    EntityPage.prototype.bindElements = function () {
        this.els.$parent
            .on('click', '.toggle-edit', this.toggleEdit.bind(this))
            .on('click', '.save-acf-form', this.validateForm.bind(this));
        this.els.$form.off('submit').on('submit', function (e) { e.preventDefault(); });
        if (window.location.hash === EntityPage.editHash)
            this.els.$parent.find('.toggle-edit').first().trigger('click');
    };
    EntityPage.prototype.toggleEdit = function (e) {
        e.preventDefault();
        this.editEnabled = !this.editEnabled;
        this.els.$parent.toggleClass(this.classes['body-edit'], this.editEnabled);
        window.location.hash = this.editEnabled ? EntityPage.editHash : '';
        this.onFirstTime();
    };
    EntityPage.prototype.dirtifyForm = function () {
        var acfForm;
        if (acfForm = this.els.$form.data('acf'))
            acfForm.set('status', null);
    };
    EntityPage.prototype.toggleLoading = function (isLoading) {
        this.els.$parent.toggleClass(this.classes.loading, isLoading);
    };
    EntityPage.prototype.validateForm = function (e) {
        e.preventDefault();
        this.toggleLoading(true);
        this.dirtifyForm();
        var validated = false;
        var onSuccess = this.submitAjax.bind(this);
        return acf.validateForm({
            form: this.els.$form,
            success: function () {
                validated = true;
                onSuccess();
            },
            complete: function () {
                if (!validated)
                    this.toggleLoading(false);
            }.bind(this)
        });
    };
    EntityPage.prototype.submitAjax = function () {
        var $form = this.els.$form;
        acf.lockForm($form);
        var formData = acf.prepareForAjax(acf.serialize($form));
        formData.action = 'acf/save_post';
        $.ajax({
            url: acf.get('ajaxurl'),
            data: formData,
            type: 'post',
            dataType: 'json',
            context: this,
            success: this.afterSubmit.bind(this),
            error: function (err) {
                acf.unlockForm($form);
                this.toggleLoading(false);
                alert(err);
            },
        });
    };
    EntityPage.prototype.afterSubmit = function (_a) {
        var success = _a.success, slug = _a.slug;
        this.toggleLoading(false);
        if (!success)
            return alert(pm.translate.form_submission_error);
        var curSlug = this.getCurEntitySlug();
        var newUrl = window.location.pathname.replace(curSlug, slug);
        window.location.href = newUrl;
    };
    EntityPage.prototype.getCurEntitySlug = function () {
        var parts = window.location.pathname.split('/').reverse();
        parts.length = 2;
        if (!parts[0])
            parts.shift();
        return parts[0];
    };
    EntityPage.prototype.onFirstTime = function () {
        if (!this.firstTime)
            return;
        var $profilePicField = getAcfFieldByKey('entity', 'picture_key');
        var $pic = $profilePicField.find('img');
        $pic[0].src = getUnscaledSrc($pic[0].src) || this.els.$profilePhoto.data().defaultPhoto;
        this.firstTime = false;
    };
    EntityPage.editHash = '#edit';
    return EntityPage;
}());
function getAcfFieldByKey(type, key) {
    var field = cdData.acf[type][key].replace(/_/g, '-');
    var className = ".acf-" + field;
    console.log('field name', className);
    return jQuery(className);
}
function getUnscaledSrc(src) {
    var key = 'scaled';
    var scaledKey = key.split('').reverse().join('');
    var srcReversed = src.split('').reverse().join('');
    var reversedIndex = srcReversed.indexOf(scaledKey);
    if (reversedIndex === -1)
        return '';
    var index = src.length - (reversedIndex + scaledKey.length);
    var pattern = new RegExp(key + "-[^.]+");
    var sizeMatch = src.substr(index).match(pattern);
    if (!Array.isArray(sizeMatch))
        return '';
    return src.replace(sizeMatch[0], key);
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9IZWxwZXJzL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1NFTy9BbmFseXRpY3NFdmVudHMudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL01vZHVsZXMvU2VhcmNoL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1RlbXBsYXRlcy9QYWdlL3BhZ2UudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL1RoaXJkUGFydHkvR0FuYWx5dGljcy9jdXN0b21UcmFja2luZy50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvVGhpcmRQYXJ0eS9SZWNhcHRjaGEvUmVjYXB0Y2hhLnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi90ZW1wbGF0ZXMvZW50aXR5L2VudGl0eS50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9pbmRleC5zdHlsIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFB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RSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyRCxJQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELElBQUksYUFBYSxLQUFLLENBQUMsQ0FBQztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBRXBDLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlELElBQU0sT0FBTyxHQUFHLElBQUksTUFBTSxDQUFJLEdBQUcsV0FBUSxDQUFDLENBQUM7SUFDM0MsSUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFFekMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUUxQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNoS0Q7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoic2l0ZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybURhdGEoJGZvcm0pIHtcbiAgICB2YXIgdW5pbmRleGVkX2FycmF5ID0gJGZvcm0uc2VyaWFsaXplQXJyYXkoKTtcbiAgICB2YXIgaW5kZXhlZF9hcnJheSA9IHt9O1xuXG4gICAgalF1ZXJ5Lm1hcCh1bmluZGV4ZWRfYXJyYXksIGZ1bmN0aW9uKG4sIGkpe1xuICAgICAgICBpbmRleGVkX2FycmF5W25bJ25hbWUnXV0gPSBuWyd2YWx1ZSddO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGluZGV4ZWRfYXJyYXk7XG59IiwiaW1wb3J0IHsgZ2FFbGVtIH0gZnJvbSAnVGhpcmRQYXJ0eS9HQW5hbHl0aWNzL2N1c3RvbVRyYWNraW5nLnRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKCFjZERhdGEgfHwgIWNkRGF0YS5ldmVudHMpIHJldHVybjtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihjZERhdGEuZXZlbnRzLm1hcC5wb3B1cE9wZW4sIHRyYWNrTWFwRXZlbnQpO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihjZERhdGEuZXZlbnRzLm1hcC5wb3B1cENsb3NlLCB0cmFja01hcEV2ZW50KTtcbn1cblxuZnVuY3Rpb24gdHJhY2tNYXBFdmVudCh7IGRldGFpbCB9KSB7XG4gICAgY29uc3QgeyAkZWxlbWVudCwgZSB9ID0gZGV0YWlsO1xuICAgIGNvbnN0IHRhcmdldCA9ICRlbGVtZW50LmZpbmQoJ1tkYXRhLWdhLWV2ZW50XScpLmZpcnN0KCk7XG4gICAgaWYgKHRhcmdldC5sZW5ndGgpIGdhRWxlbSh0YXJnZXQpO1xufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9fdHlwZXMvbWFpbi5kLnRzXCIgLz5cblxuaW1wb3J0IHsgZ2V0Rm9ybURhdGEgfSBmcm9tICdAL0hlbHBlcnMvaW5kZXgnO1xuaW1wb3J0IHsgZ2FFbGVtLCBnYVRyYWNrIH0gZnJvbSAnVGhpcmRQYXJ0eS9HQW5hbHl0aWNzL2N1c3RvbVRyYWNraW5nLnRzJztcblxubGV0ICQ6dHlwZW9mIGpRdWVyeSA9IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBvcHRzOiB7XG4gICAgICAgIGluaXRlZDogMCxcbiAgICAgICAgLy8gQ2xhc3MgbmFtZXNcbiAgICAgICAgYXBwZW5kQ2xhc3M6ICdfYXBwZW5kZWQnLCAvLyBTZWFyY2ggYWN0aXZlXG4gICAgICAgIHByb2Nlc3Npbmc6ICdfcHJvY2Vzc2luZycsIC8vIGxvYWRpbmcgY2xhc3NcbiAgICAgICAgcHJvY2Vzc2VkOiAnX3Byb2Nlc3NlZCcsIC8vIFNlYXJjaCBsb2FkZWRcbiAgICAgICAgbm9SZXN1bHRzOiAnX25vLXJlc3VsdHMnLFxuICAgICAgICBoYXNFcnJvcnM6ICdfaGFzLWVycm9ycycsXG4gICAgfSxcbiAgICAvLyBlbGVtZW50c1xuICAgIGVsczoge1xuICAgICAgICAkc2VhcmNoOiBudWxsLFxuICAgICAgICAkdHJpZ2dlcklucHV0OiBudWxsLFxuICAgICAgICAkZm9ybTogbnVsbCwgLy8gdGhlIGZvcm0gaW4gdGhlIG92ZXJsYXlcbiAgICAgICAgJGJnOiBudWxsLFxuICAgICAgICAkYmdTbG90OiBudWxsLFxuICAgICAgICAkc2VhcmNoUmVzdWx0c0NvbnRhaW5lcjogbnVsbCxcbiAgICAgICAgJHNlYXJjaEJ5OiBudWxsLCAvLyB0aGUgZGl2IGNvbnRhaW5pbmcgdGhlIHByaW1hcnkgZmlsdGVycyB0byBzZWFyY2ggYnlcbiAgICAgICAgJHNlYXJjaEVycm9yczogbnVsbCwgLy8gY29udGFpbmVyIGZvciBkaXNwbGF5IGVycm9yc1xuICAgICAgICAkYWR2YW5jZWRPcHRpb25zOiBudWxsLCAvLyBFbCBmb3IgdGhlIGNhdGVnb3J5IGZpbHRlcnNcbiAgICB9LFxuXHRpbml0OiBmdW5jdGlvbihfJDp0eXBlb2YgalF1ZXJ5KSB7XG4gICAgICAgICQgPSBfJDtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5pbml0ZWQpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIC8vIHNvIGFzIG5vdCB0byByZSBjYWxsXG5cdFx0dGhpcy5vcHRzLmluaXRlZCA9IDE7XG5cbiAgICAgICAgdGhpcy5lbHMuJHNlYXJjaCA9ICQoJyNzZWFyY2hCb3gnKTtcbiAgICAgICAgdGhpcy5lbHMuJHRyaWdnZXJJbnB1dCA9IHRoaXMuZWxzLiRzZWFyY2guZmluZCgnLnNlYXJjaC1pbnB1dCcpO1xuICAgICAgICB2YXIgJGJnID0gdGhpcy5lbHMuJGJnID0gJCgnI3NlYXJjaE92ZXJsYXknKTtcblxuICAgICAgICB0aGlzLmVscy4kZm9ybSA9IHRoaXMuZWxzLiRiZy5maW5kKCdmb3JtJyk7XG4gICAgICAgIHRoaXMuZWxzLiRpbm5lcklucHV0ID0gdGhpcy5lbHMuJGJnLmZpbmQoJy5zZWFyY2gtaW5wdXQnKTtcbiAgICAgICAgdGhpcy5lbHMuJHNlYXJjaFJlc3VsdHNDb250YWluZXIgPSAkKCcjc2VhcmNoUmVzdWx0c0NvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLmVscy4kc2VhcmNoQnkgPSAkKCcjc2VhcmNoQnknKTtcbiAgICAgICAgdGhpcy5lbHMuJGFkdmFuY2VkT3B0aW9ucyA9ICQoJyNzZWFyY2hPcHRpb25zJyk7XG4gICAgICAgIHRoaXMuZWxzLiRzZWFyY2hFcnJvcnMgPSAkKCcjc2VhcmNoRXJyb3JzJyk7XG5cbiAgICAgICAgJGJnLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB0aGlzLmVscy4kdHJpZ2dlcklucHV0Lm9uKCdmb2N1cycsIHRoaXMubWV0aG9kcy5sb2FkQmFja2Ryb3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgJGJnLm9uKCdjbGljaycsICcuY2xpY2stdHJhcCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldCA9PSBlLmN1cnJlbnRUYXJnZXQgJiYgdGhpcy5tZXRob2RzLm9uQ2xvc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbignc3VibWl0JywgJ2Zvcm0nLCB0aGlzLm1ldGhvZHMub25TdWJtaXQuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5lbHMuJGFkdmFuY2VkT3B0aW9ucy5vbignY2xpY2snLCAnaW5wdXQ6Y2hlY2tlZCcsIHRoaXMubWV0aG9kcy50b2dnbGVDaGVja2VkLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLm1ldGhvZHMuaW5pdFNlYXJjaEJ5LmNhbGwodGhpcyk7XG5cdH0sXG5cdG1ldGhvZHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlcGVuZGluZyBvbiB3aGF0J3MgYmVpbmcgc2VhcmNoZWQsIHNob3dzIG9yIGhpZGVzIGFkdmFuY2VkIG9wdGlvbiB0YXhvbm9teSBzZWN0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgaW5pdFNlYXJjaEJ5KCkge1xuICAgICAgICAgICAgY29uc3QgdGF4b25vbWllcyA9IGNkRGF0YS50YXhvbm9teVR5cGU7XG4gICAgICAgICAgICBjb25zdCAkb3B0Q29udGFpbmVyID0gdGhpcy5lbHMuJGFkdmFuY2VkT3B0aW9ucztcbiAgICAgICAgICAgIGxldCBwcmV2aW91cztcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVNob3dIaWRlT3B0aW9uU2VjdGlvbnMgPSBlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZSAmJiBlLnRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXMgPT09IGUudGFyZ2V0KSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGN1clR5cGVzID0gdGhpcy5lbHMuJHNlYXJjaEJ5LmZpbmQoJ2lucHV0OmNoZWNrZWQnKS5kYXRhKCkuc2VhcmNoVHlwZXM7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGF4b25vbWllcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkb3B0Q29udGFpbmVyLmZpbmQoJy4nICsgdGF4b25vbWllc1trZXldKVtjdXJUeXBlcy5pbmNsdWRlcyhrZXkpID8gJ3Nob3cnIDogJ2hpZGUnXSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChlICYmIGUudGFyZ2V0KSBnYUVsZW0oZS50YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmVscy4kc2VhcmNoQnkub24oJ2NsaWNrJywgJ2lucHV0JywgdXBkYXRlU2hvd0hpZGVPcHRpb25TZWN0aW9ucyk7XG4gICAgICAgICAgICB1cGRhdGVTaG93SGlkZU9wdGlvblNlY3Rpb25zKG51bGwpO1xuICAgICAgICB9LFxuXHRcdGxvYWRCYWNrZHJvcChlKSB7XG4gICAgICAgICAgICB0aGlzLmVscy4kYmcuYWRkQ2xhc3ModGhpcy5vcHRzLmFwcGVuZENsYXNzKTtcbiAgICAgICAgICAgIGdhRWxlbShlLnRhcmdldCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVscy4kaW5uZXJJbnB1dFswXS5mb2N1cygpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbG9zZSgpIHtcbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy5yZW1vdmVDbGFzcyh0aGlzLm9wdHMuYXBwZW5kQ2xhc3MpO1xuICAgICAgICB9LFxuICAgICAgICB0b2dnbGVDaGVja2VkKGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBlLnRhcmdldC5kYXRhc2V0O1xuICAgICAgICAgICAgY29uc3QgaXMgPSArZS50YXJnZXQuY2hlY2tlZFxuICAgICAgICAgICAgY29uc3QgZGlzYWJsZSA9ICtkYXRhLndhc0NoZWNrZWQgPT09IGlzO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZGlzYWJsZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkYXRhLndhc0NoZWNrZWQgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGRhdGEud2FzQ2hlY2tlZCA9IDE7XG5cbiAgICAgICAgICAgIC8vIGdhIHRyYWNraW5nXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRheCA9IGUudGFyZ2V0Lm5hbWUubWF0Y2goL1xcWyhbYS16LV0rKVxcXS8pO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRheCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGF4b25vbXkgPSB0YXhbMV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb24gPSBkaXNhYmxlID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIGdhVHJhY2soJ2ludGVyYWN0aW9uJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuX25hbWU6ICdzZWFyY2gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBgJHthY3Rpb259ICR7dGF4b25vbXl9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3VibWl0KGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy5yZW1vdmVDbGFzcyh0aGlzLm9wdHMuaGFzRXJyb3JzKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubWV0aG9kcy50cmlnZ2VyUHJvY2Vzc2luZy5jYWxsKHRoaXMsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaFJlc3VsdHNDb250YWluZXIuZW1wdHkoKTtcbiAgICAgICAgICAgIHZhciBkYXRhOntzZWFyY2g/OnN0cmluZywgc2VhcmNoX3R5cGU/OnN0cmluZ30gPSBnZXRGb3JtRGF0YSh0aGlzLmVscy4kZm9ybSk7XG4gICAgICAgICAgICBsZXQgaGFzVGF4b25vbWllcyA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgdGF4b25vbXkgPSBPYmplY3Qua2V5cyhkYXRhKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoa2V5ID0+IC9edGF4b25vbXkvLnRlc3Qoa2V5KSlcbiAgICAgICAgICAgICAgICAucmVkdWNlKChhY2MsIHRheCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBoYXNUYXhvbm9taWVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYWNjW3RheC5tYXRjaCgvXFxbKFthLXotXSspXFxdLylbMV1dID0gZGF0YVt0YXhdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSB0aGlzLm1ldGhvZHMudmFsaWRhdGVTZWFyY2guY2FsbCh0aGlzLCBkYXRhKTtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCFlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gaXMgdmFsaWRcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogY2REYXRhLnJlc3RCYXNlICsgJ3NlYXJjaC9hbGwnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5kYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZGF0YS5zZWFyY2hfdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKCB4aHIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciggJ1gtV1AtTm9uY2UnLCBwbS53cF9ub25jZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FQYXJhbXM6YW55ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlbl9uYW1lOiAnc2VhcmNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IGBzZWFyY2ggJHtkYXRhLnNlYXJjaF90eXBlfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzVGF4b25vbWllcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0YXhvbm9teSkuZm9yRWFjaCh0YXggPT4gZ2FQYXJhbXNbYHRheG9ub215WyR7dGF4fV1gXSA9IHRheG9ub215W3RheF0gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnNlYXJjaCkgZ2FQYXJhbXMuc2VhcmNoID0gZGF0YS5zZWFyY2g7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYVRyYWNrKCdpbnRlcmFjdGlvbicsIGdhUGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy5yZXN1bHRzTG9hZGVkLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlOkNEUmVzcG9uc2UpOkNEUmVzcG9uc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yICcgKyByZXNwb25zZS5yZXN1bHQsIHJlc3BvbnNlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tZXRob2RzLnRyaWdnZXJQcm9jZXNzaW5nLmNhbGwodGhhdCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVscy4kc2VhcmNoRXJyb3JzLmFwcGVuZChlcnJvcnMubWFwKGVyciA9PiBgPHNwYW4+JHtlcnJ9PC9zcGFuPmApLmpvaW4oJzxiciAvPicpKVxuICAgICAgICAgICAgICAgIHRoaXMuZWxzLiRiZy5hZGRDbGFzcyh0aGlzLm9wdHMuaGFzRXJyb3JzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMudHJpZ2dlclByb2Nlc3NpbmcuY2FsbCh0aGlzLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0cmlnZ2VyUHJvY2Vzc2luZyggbG9hZGluZzpib29sZWFuLCBsb2FkZWQ6Ym9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLnRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5wcm9jZXNzaW5nLFxuICAgICAgICAgICAgICAgIGxvYWRpbmdcbiAgICAgICAgICAgICkudG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLnByb2Nlc3NlZCxcbiAgICAgICAgICAgICAgICBsb2FkZWRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChsb2FkaW5nKSB0aGlzLmVscy4kYmcucmVtb3ZlQ2xhc3ModGhpcy5vcHRzLm5vUmVzdWx0cyk7XG4gICAgICAgIH0sXG4gICAgICAgIHZhbGlkYXRlU2VhcmNoKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBbXTtcblxuICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpO1xuICAgICAgICAgICAgY29uc3QgaGFzVGF4ID0ga2V5cy5zb21lKGtleSA9PiAvXnRheG9ub215Ly50ZXN0KGtleSkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZGF0YS5zZWFyY2ggJiYgZGF0YS5zZWFyY2gubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiVGhlIHNlYXJjaCBtdXN0IGJlIGF0IGxlYXN0IDMgY2hhcmFjdGVycyBsb25nXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgICAgICB9LFxuICAgICAgICByZXN1bHRzTG9hZGVkKHJlczpzdHJpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlOkNEUmVzcG9uc2UgPSBKU09OLnBhcnNlKHJlcyk7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnJlc3VsdCAhPT0gMjAwICkgdGhyb3cgcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IGhhc1Jlc3VsdHMgPSAhIXJlc3BvbnNlLmRhdGEucmVzdWx0cztcblxuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLnRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5ub1Jlc3VsdHMsICFoYXNSZXN1bHRzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoaGFzUmVzdWx0cyAmJiByZXNwb25zZS5kYXRhLmh0bWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVscy4kc2VhcmNoUmVzdWx0c0NvbnRhaW5lci5odG1sKHJlc3BvbnNlLmRhdGEuaHRtbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0fVxufTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KCkge1xuICAgIGluaXRDb25uZWN0KCk7XG4gICAgaW5pdEZBUSgpO1xuICAgIGFkZEhhc2hBY3RpdmVDbGFzcygpO1xufVxuXG5mdW5jdGlvbiBpbml0RkFRKCk6Ym9vbGVhbiB7XG4gICAgY29uc3QgJEZBUSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGQVEnKTtcblxuICAgIGlmICghJEZBUSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgalF1ZXJ5KCRGQVEpLm9uKCdjbGljaycsICdoMycsIGV2ZW50ID0+IHsgalF1ZXJ5KGV2ZW50LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ3RvZ2dsZWQnKTsgfSlcbiAgICBcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaW5pdENvbm5lY3QoKTpib29sZWFuIHtcbiAgICBjb25zdCAkYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlQ29ubmVjdCcpO1xuXG4gICAgaWYgKCEkYm9keSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgJGxvZ2luID0galF1ZXJ5KCcudXdwLWxvZ2luLWNsYXNzJyk7XG4gICAgXG4gICAgJGxvZ2luLmZpbmQoJy51d3AtbG9naW4tZm9ybScpXG4gICAgICAgIC5hdHRyKCdlbmN0eXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKVxuICAgICAgICAuYXR0cignYWN0aW9uJywgJy93cC93cC1sb2dpbi5waHAnKTtcblxuICAgICRsb2dpbi5maW5kKCcjdXNlcm5hbWUnKS5hdHRyKCdpZCcsICd1c2VyX2xvZ2luJykuYXR0cignbmFtZScsICdsb2cnKTtcbiAgICAkbG9naW4uZmluZCgnI3Bhc3N3b3JkJykuYXR0cignaWQnLCAndXNlcl9wYXNzJykuYXR0cignbmFtZScsICdwd2QnKTtcblxuICAgIGNvbnN0ICRuYXZMaW5rcyA9IGpRdWVyeSgnLm5hdi1saW5rJyk7XG4gICAgalF1ZXJ5KCRib2R5KS5vbignY2xpY2snLCAnLm5hdi1saW5rJywgZXZlbnQgPT4ge1xuICAgICAgICAkbmF2TGlua3MucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoZXZlbnQudGFyZ2V0KS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBBZGRzIGFuIGFjdGl2ZSBjbGFzcyB0byBhbnkgZWxlbWVudCBtYXRjaGluZyB0aGUgdXJsJ3MgaGFzaFxuICovXG5mdW5jdGlvbiBhZGRIYXNoQWN0aXZlQ2xhc3MoKSB7XG4gICAgaWYgKCF3aW5kb3cubG9jYXRpb24uaGFzaCkgcmV0dXJuO1xuICAgIGNvbnN0ICRlbCA9ICBqUXVlcnkod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgIGlmICgkZWwubGVuZ3RoKSAkZWwuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xufSIsImNvbnN0IGNhbiA9ICgpID0+ICEhd2luZG93Lmd0YWc7XG5sZXQgJDpKUXVlcnlTdGF0aWM7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KF8kOkpRdWVyeVN0YXRpYykge1xuICAgICQgPSBfJDtcbiAgICBpZiAoIWNhbigpKSByZXR1cm47XG4gICAgXG4gICAgJChkb2N1bWVudC5ib2R5KS5vbignY2xpY2snLCAnLmd0YWcnLCBlID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQpIGdhRWxlbShlLnRhcmdldCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBnYUVsZW0gPSAhY2FuKCkgPyAoKSA9PiB7fSA6ICggZWxlbTpIVE1MRWxlbWVudCApID0+IHtcbiAgICBjb25zdCBkYXRhID0gJChlbGVtKS5kYXRhKCk7XG4gICAgY29uc3QgY29tbWFuZCA9IGRhdGEuZ2FDb21tYW5kIHx8ICdldmVudCc7XG4gICAgY29uc3QgZXZlbnROYW1lID0gZGF0YS5nYUV2ZW50O1xuICAgIGNvbnN0IHBhcmFtcyA9IGRhdGEuZ2FQYXJhbXMgfHwge307XG5cbiAgICBpZiAoIWV2ZW50TmFtZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdJbnZhbGlkIGdhRWxlbSBjYWxsIHVzaW5nOicsIGRhdGEpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coICdnYUVsZW0oKScsIGNvbW1hbmQsIGV2ZW50TmFtZSwgcGFyYW1zICk7XG4gICAgZ3RhZyhjb21tYW5kLCBldmVudE5hbWUsIHBhcmFtcyk7XG59XG5cbmV4cG9ydCBjb25zdCBnYVRyYWNrID0gIWNhbigpID8gKCkgPT4ge30gOiAoZXZlbnROYW1lOnN0cmluZywgcGFyYW1zOnt9ID0ge30sIGNvbW1hbmQ6c3RyaW5nID0gJ2V2ZW50JykgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCAnZ2FUcmFjaygpJywgY29tbWFuZCwgZXZlbnROYW1lLCBwYXJhbXMgKTtcbiAgICBndGFnKGNvbW1hbmQsIGV2ZW50TmFtZSwgcGFyYW1zKTtcbn0iLCJjb25zdCBvblN1Ym1pdCA9ICh0b2tlbjpzdHJpbmcpID0+IHtcblx0JCgnLnV3cC1yZWdpc3RyYXRpb24tZm9ybScpWzBdLm9uc3VibWl0KG5ldyBFdmVudCgnc3VibWl0JykpO1xufVxuXG5jb25zdCByZWdpc3RyYXRpb24gPSAoKSA9PiB7XG5cdHZhciAkYnV0dG9uID0gJCgnLnV3cF9yZWdpc3Rlcl9zdWJtaXQnKTtcblxuXHQkYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGU6RXZlbnQpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Z3JlY2FwdGNoYS5leGVjdXRlKHBtLnJlY2FwdGNoYS5rZXlfdjMsIHthY3Rpb246ICdzdWJtaXQnfSlcblx0XHRcdC50aGVuKG9uU3VibWl0KTtcblx0fSk7XG5cblx0dmFyIGNhcHRjaGFDb250YWluZXIgPSBudWxsO1xuICAgIHZhciBsb2FkQ2FwdGNoYSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2FwdGNoYUNvbnRhaW5lciA9IGdyZWNhcHRjaGEucmVuZGVyKCdjYXB0Y2hhX2NvbnRhaW5lcicsIHtcbiAgICAgICAgJ3NpdGVrZXknIDogcG0ucmVjYXB0Y2hhLmtleV92MixcbiAgICAgIH0pO1xuICAgIH07XG5cblx0JGJ1dHRvbi5iZWZvcmUoJzxkaXYgaWQ9XCJjYXB0Y2hhX2NvbnRhaW5lclwiPjwvZGl2PicpXG5cdGxvYWRDYXB0Y2hhKCk7XG59O1xuXG5jb25zdCBsb2FkUmVjYXB0Y2hhSW5zdGFuY2VzID0gKCkgPT4ge1xuXHRpZiAoL15cXC9yZWdpc3RyYS8udGVzdChsb2NhdGlvbi5wYXRobmFtZSkpIHJlZ2lzdHJhdGlvbigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB3aW5kb3cuZ3JlY2FwdGNoYSAmJiBncmVjYXB0Y2hhLnJlYWR5KGxvYWRSZWNhcHRjaGFJbnN0YW5jZXMpOyIsImltcG9ydCAnQC9pbmRleC5zdHlsJztcbmltcG9ydCByZUNhcHRjaGFJbml0IGZyb20gJ1RoaXJkUGFydHkvUmVjYXB0Y2hhL1JlY2FwdGNoYS50cyc7XG5pbXBvcnQgeyBpbml0IGFzIGdBbmFseXRpY3NJbml0IH0gZnJvbSAnVGhpcmRQYXJ0eS9HQW5hbHl0aWNzL2N1c3RvbVRyYWNraW5nLnRzJztcbmltcG9ydCB7IGluaXQgYXMgYW5hbHl0aWNzRXZlbnRzIH0gZnJvbSAnQC9TRU8vQW5hbHl0aWNzRXZlbnRzLnRzJztcbmltcG9ydCBTZWFyY2ggZnJvbSAnQC9TZWFyY2gvaW5kZXgudHMnO1xuaW1wb3J0IGluaXRQYWdlcyBmcm9tICdAL1RlbXBsYXRlcy9QYWdlL3BhZ2UnO1xuaW1wb3J0IGluaXRFbnRpdHkgZnJvbSAndGVtcGxhdGVzL2VudGl0eS9lbnRpdHknO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0JCgoKSA9PiB7XG4gICAgICAgIGdBbmFseXRpY3NJbml0KCQpO1xuICAgICAgICBhbmFseXRpY3NFdmVudHMoKTtcbiAgICAgICAgU2VhcmNoLmluaXQoJCk7XG4gICAgICAgIGluaXRFbnRpdHkoJCk7XG4gICAgICAgIGluaXRQYWdlcygpO1xuICAgICAgICByZUNhcHRjaGFJbml0KCk7XG5cbiAgICAgICAgLy8gJChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcygncHJlbG9hZCcpO1xuXHR9KVxufSkoalF1ZXJ5KTsiLCJsZXQgJDpKUXVlcnlTdGF0aWM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChfJDpKUXVlcnlTdGF0aWMpIHtcbiAgICAkID0gXyQ7XG4gICAgbGV0ICRlbCA9ICQoJyNlbnRpdHlQYWdlJyk7XG4gICAgaWYgKCRlbC5sZW5ndGgpIG5ldyBFbnRpdHlQYWdlKCRlbCk7XG59XG5cbmNsYXNzIEVudGl0eVBhZ2Uge1xuICAgIHB1YmxpYyBjbGFzc2VzID0ge1xuICAgICAgICAnYm9keS1lZGl0JzogJ2VkaXRhYmxlJyxcbiAgICAgICAgJ2xvYWRpbmcnOiAnbG9hZGluZycsXG4gICAgfTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZWRpdEhhc2ggPSAnI2VkaXQnO1xuXG4gICAgcHJpdmF0ZSBlZGl0RW5hYmxlZDpib29sZWFuID0gZmFsc2U7XG4gICAgLy8gZmlyc3QgdGltZSB0b2dnbGluZyBlZGl0XG4gICAgcHJpdmF0ZSBmaXJzdFRpbWU6Ym9vbGVhbiA9IHRydWU7XG4gICAgXG4gICAgcHJpdmF0ZSBlbHMgPSB7XG4gICAgICAgICRwYXJlbnQ6IG51bGwsXG4gICAgICAgICRwcm9maWxlUGhvdG86IG51bGwsXG4gICAgICAgICRmb3JtOiBudWxsLFxuICAgIH07XG4gICAgXG4gICAgY29uc3RydWN0b3IoJHBhcmVudDpKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XG4gICAgICAgIGlmICghYWNmKSB7IGNvbnNvbGUuZXJyb3IoJ01pc3NpbmcgQUNGIGpzIGxpYnJhcnknKTsgcmV0dXJuIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZWxzLiRwYXJlbnQgPSAkcGFyZW50O1xuICAgICAgICB0aGlzLmVscy4kcHJvZmlsZVBob3RvID0gJCgnI3Byb2ZpbGVQaG90bycpO1xuICAgICAgICB0aGlzLmVscy4kZm9ybSA9ICQoJyNhY2YtZm9ybScpO1xuXG4gICAgICAgIGlmICh0aGlzLmVscy4kZm9ybS5sZW5ndGgpIHRoaXMuYmluZEVsZW1lbnRzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBiaW5kRWxlbWVudHMoKSB7XG4gICAgICAgIHRoaXMuZWxzLiRwYXJlbnRcbiAgICAgICAgICAgIC5vbignY2xpY2snLCAnLnRvZ2dsZS1lZGl0JywgdGhpcy50b2dnbGVFZGl0LmJpbmQodGhpcykpXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgJy5zYXZlLWFjZi1mb3JtJywgdGhpcy52YWxpZGF0ZUZvcm0uYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuZWxzLiRmb3JtLm9mZignc3VibWl0Jykub24oJ3N1Ym1pdCcsIChlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgfSk7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoID09PSBFbnRpdHlQYWdlLmVkaXRIYXNoKVxuICAgICAgICAgICAgdGhpcy5lbHMuJHBhcmVudC5maW5kKCcudG9nZ2xlLWVkaXQnKS5maXJzdCgpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUVkaXQoZTpFdmVudCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuZWRpdEVuYWJsZWQgPSAhdGhpcy5lZGl0RW5hYmxlZDtcbiAgICAgICAgdGhpcy5lbHMuJHBhcmVudC50b2dnbGVDbGFzcyh0aGlzLmNsYXNzZXNbJ2JvZHktZWRpdCddLCB0aGlzLmVkaXRFbmFibGVkKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB0aGlzLmVkaXRFbmFibGVkID8gRW50aXR5UGFnZS5lZGl0SGFzaCA6ICcnO1xuXG4gICAgICAgIHRoaXMub25GaXJzdFRpbWUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRpcnRpZnlGb3JtKCkge1xuICAgICAgICBsZXQgYWNmRm9ybTtcbiAgICAgICAgaWYgKGFjZkZvcm0gPSB0aGlzLmVscy4kZm9ybS5kYXRhKCdhY2YnKSkgYWNmRm9ybS5zZXQoJ3N0YXR1cycsIG51bGwpXG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUxvYWRpbmcoaXNMb2FkaW5nOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5lbHMuJHBhcmVudC50b2dnbGVDbGFzcyh0aGlzLmNsYXNzZXMubG9hZGluZywgaXNMb2FkaW5nKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGVGb3JtKGU6RXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnRvZ2dsZUxvYWRpbmcodHJ1ZSk7XG4gICAgICAgIHRoaXMuZGlydGlmeUZvcm0oKTtcbiAgICAgICAgbGV0IHZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvblN1Y2Nlc3MgPSB0aGlzLnN1Ym1pdEFqYXguYmluZCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGFjZi52YWxpZGF0ZUZvcm0oe1xuICAgICAgICAgICAgZm9ybTogdGhpcy5lbHMuJGZvcm0sXG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgb25TdWNjZXNzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkYXRlZCkgdGhpcy50b2dnbGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN1Ym1pdEFqYXgoKSB7XG4gICAgICAgIGNvbnN0ICRmb3JtID0gdGhpcy5lbHMuJGZvcm07XG4gICAgICAgIGFjZi5sb2NrRm9ybSgkZm9ybSk7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gYWNmLnByZXBhcmVGb3JBamF4KGFjZi5zZXJpYWxpemUoJGZvcm0pKTtcbiAgICAgICAgZm9ybURhdGEuYWN0aW9uID0gJ2FjZi9zYXZlX3Bvc3QnO1xuICAgICAgICBcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogYWNmLmdldCgnYWpheHVybCcpLFxuICAgICAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgY29udGV4dDogdGhpcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRoaXMuYWZ0ZXJTdWJtaXQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGVycm9yKGVycikge1xuICAgICAgICAgICAgICAgIGFjZi51bmxvY2tGb3JtKCRmb3JtKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KGVycik7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFmdGVyU3VibWl0KHsgc3VjY2Vzcywgc2x1ZyB9KSB7XG4gICAgICAgIHRoaXMudG9nZ2xlTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXN1Y2Nlc3MpXG4gICAgICAgICAgICByZXR1cm4gYWxlcnQocG0udHJhbnNsYXRlLmZvcm1fc3VibWlzc2lvbl9lcnJvcik7XG5cbiAgICAgICAgY29uc3QgY3VyU2x1ZyA9IHRoaXMuZ2V0Q3VyRW50aXR5U2x1ZygpO1xuICAgICAgICBjb25zdCBuZXdVcmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZShjdXJTbHVnLCBzbHVnKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBuZXdVcmw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDdXJFbnRpdHlTbHVnKCk6c3RyaW5nIHtcbiAgICAgICAgbGV0IHBhcnRzOnN0cmluZ1tdID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykucmV2ZXJzZSgpO1xuICAgICAgICBwYXJ0cy5sZW5ndGggPSAyO1xuICAgICAgICAvLyBJZiB1cmwgZW5kcyBpbiBhIHNsYXNoLCBkaXNjYXJkIGl0XG4gICAgICAgIGlmICghcGFydHNbMF0pIHBhcnRzLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiBwYXJ0c1swXTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRmlyc3RUaW1lKCkge1xuICAgICAgICBpZiAoIXRoaXMuZmlyc3RUaW1lKSByZXR1cm47XG5cbiAgICAgICAgLy8gQ2hhbmdlIGltYWdlIHNpemUgb2YgcHJvZmlsZSBwaWN0dXJlXG4gICAgICAgIGNvbnN0ICRwcm9maWxlUGljRmllbGQgPSBnZXRBY2ZGaWVsZEJ5S2V5KCdlbnRpdHknLCAncGljdHVyZV9rZXknKTtcbiAgICAgICAgY29uc3QgJHBpYyA9ICRwcm9maWxlUGljRmllbGQuZmluZCgnaW1nJyk7XG4gICAgICAgICRwaWNbMF0uc3JjID0gZ2V0VW5zY2FsZWRTcmMoJHBpY1swXS5zcmMpIHx8IHRoaXMuZWxzLiRwcm9maWxlUGhvdG8uZGF0YSgpLmRlZmF1bHRQaG90bztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZmlyc3RUaW1lID0gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWNmRmllbGRCeUtleSh0eXBlOnN0cmluZywga2V5OnN0cmluZykge1xuICAgIGNvbnN0IGZpZWxkID0gY2REYXRhLmFjZlt0eXBlXVtrZXldLnJlcGxhY2UoL18vZywgJy0nKTtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBgLmFjZi0ke2ZpZWxkfWA7XG4gICAgY29uc29sZS5sb2coJ2ZpZWxkIG5hbWUnLCBjbGFzc05hbWUpO1xuICAgIHJldHVybiBqUXVlcnkoY2xhc3NOYW1lKTtcbn1cblxuLyoqXG4gKiBTZWFyY2hlcyB0aHJvdWdoIGFuIGltYWdlIHNyYyB3aXRoICdzY2FsZWQnIGF0IGl0cyBlbmQgYW5kIHJlbW92ZXMgdGhlIHNjYWxpbmcgYWZ0ZXIgaXRcbiAqIEBwYXJhbSBzcmMgICBzdHJpbmcgICAgICBpbWFnZSBzcmNcbiAqIEByZXR1cm5zICAgICBzdHJpbmcgICAgICB1bnNjYWxlZCBzcmNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVuc2NhbGVkU3JjKHNyYzpzdHJpbmcpOnN0cmluZyB7XG4gICAgY29uc3Qga2V5ID0gJ3NjYWxlZCdcbiAgICBjb25zdCBzY2FsZWRLZXkgPSBrZXkuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbiAgICBjb25zdCBzcmNSZXZlcnNlZCA9IHNyYy5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xuICAgIGNvbnN0IHJldmVyc2VkSW5kZXggPSBzcmNSZXZlcnNlZC5pbmRleE9mKHNjYWxlZEtleSk7XG4gICAgaWYgKHJldmVyc2VkSW5kZXggPT09IC0xKSByZXR1cm4gJyc7XG5cbiAgICBjb25zdCBpbmRleCA9IHNyYy5sZW5ndGggLSAocmV2ZXJzZWRJbmRleCArIHNjYWxlZEtleS5sZW5ndGgpO1xuICAgIGNvbnN0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKGAke2tleX0tW14uXStgKTtcbiAgICBjb25zdCBzaXplTWF0Y2ggPSBzcmMuc3Vic3RyKGluZGV4KS5tYXRjaChwYXR0ZXJuKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2l6ZU1hdGNoKSkgcmV0dXJuICcnO1xuXG4gICAgcmV0dXJuIHNyYy5yZXBsYWNlKHNpemVNYXRjaFswXSwga2V5KTtcblxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==