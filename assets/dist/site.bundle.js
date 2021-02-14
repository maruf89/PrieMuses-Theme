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
        return window.location.href = window.location.href.replace(curSlug, slug);
    };
    EntityPage.prototype.getCurEntitySlug = function () {
        var parts = window.location.href.split('/').reverse();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9IZWxwZXJzL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1NFTy9BbmFseXRpY3NFdmVudHMudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL01vZHVsZXMvU2VhcmNoL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1RlbXBsYXRlcy9QYWdlL3BhZ2UudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL1RoaXJkUGFydHkvR0FuYWx5dGljcy9jdXN0b21UcmFja2luZy50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvVGhpcmRQYXJ0eS9SZWNhcHRjaGEvUmVjYXB0Y2hhLnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi90ZW1wbGF0ZXMvZW50aXR5L2VudGl0eS50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9pbmRleC5zdHlsIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTyxTQUFTLFdBQVcsQ0FBQyxLQUFLO0lBQzdCLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM3QyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFFdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxhQUFhLENBQUM7QUFDekIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1RnRTtBQUUxRCxTQUFTLElBQUk7SUFDaEIsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1FBQUUsT0FBTztJQUd0QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRXBFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLEVBQVU7UUFBUixNQUFNO0lBQ25CLFlBQVEsR0FBUSxNQUFNLFNBQWQsRUFBRSxDQUFDLEdBQUssTUFBTSxFQUFYLENBQVk7SUFDL0IsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hELElBQUksTUFBTSxDQUFDLE1BQU07UUFBRSwrRUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiNkM7QUFDNEI7QUFFMUUsSUFBSSxDQUFDLEdBQWlCLElBQUksQ0FBQztBQUUzQixpRUFBZTtJQUNYLElBQUksRUFBRTtRQUNGLE1BQU0sRUFBRSxDQUFDO1FBRVQsV0FBVyxFQUFFLFdBQVc7UUFDeEIsVUFBVSxFQUFFLGFBQWE7UUFDekIsU0FBUyxFQUFFLFlBQVk7UUFDdkIsU0FBUyxFQUFFLGFBQWE7UUFDeEIsU0FBUyxFQUFFLGFBQWE7S0FDM0I7SUFFRCxHQUFHLEVBQUU7UUFDRCxPQUFPLEVBQUUsSUFBSTtRQUNiLGFBQWEsRUFBRSxJQUFJO1FBQ25CLEtBQUssRUFBRSxJQUFJO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxPQUFPLEVBQUUsSUFBSTtRQUNiLHVCQUF1QixFQUFFLElBQUk7UUFDN0IsU0FBUyxFQUFFLElBQUk7UUFDZixhQUFhLEVBQUUsSUFBSTtRQUNuQixnQkFBZ0IsRUFBRSxJQUFJO0tBQ3pCO0lBQ0osSUFBSSxFQUFFLFVBQVMsRUFBZ0I7UUFDeEIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNQLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUduQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFZixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFNUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV6RSxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBUyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNaLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDRCxPQUFPLEVBQUU7UUFJRixZQUFZO1lBQVosaUJBa0JDO1lBakJHLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDdkMsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoRCxJQUFJLFFBQVEsQ0FBQztZQUNiLElBQU0sNEJBQTRCLEdBQUcsV0FBQztnQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDZixJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsTUFBTTt3QkFBRSxPQUFPO29CQUNsQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztpQkFDdkI7Z0JBQ0QsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFDN0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBRztvQkFDL0IsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUMxRixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtvQkFBRSwrRUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztZQUN0RSw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ1AsWUFBWSxZQUFDLENBQUM7WUFDSixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QywrRUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsT0FBTztZQUNILElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFDRCxhQUFhLFlBQUMsQ0FBQztZQUNYLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzlCLElBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPO1lBQzVCLElBQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUM7WUFFeEMsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzthQUN2Qjs7Z0JBQU0sSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFHM0IsSUFBSTtnQkFDQSxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2pELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDcEIsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztvQkFDdEQsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztvQkFDOUMsZ0ZBQU8sQ0FBQyxhQUFhLEVBQUU7d0JBQ25CLFdBQVcsRUFBRSxRQUFRO3dCQUNyQixNQUFNLEVBQUssTUFBTSxTQUFJLFFBQVU7d0JBQy9CLEtBQUs7cUJBQ1IsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQztRQUNELFFBQVEsRUFBUixVQUFTLENBQUM7WUFDTixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUV2RCxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pDLElBQUksSUFBSSxHQUF5QywyREFBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0UsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUM3QixNQUFNLENBQUMsYUFBRyxJQUFJLGtCQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFyQixDQUFxQixDQUFDO2lCQUNwQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztnQkFDYixhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxHQUFHLENBQUM7WUFDZixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDWCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUVoQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFFaEIsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDSCxJQUFJLEVBQUUsTUFBTTtvQkFDWixHQUFHLEVBQUUsTUFBTSxDQUFDLFFBQVEsR0FBRyxZQUFZO29CQUNuQyxJQUFJLHdCQUNHLElBQUksS0FDUCxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FDekI7b0JBQ0QsVUFBVSxFQUFFLFVBQVcsR0FBRzt3QkFDdEIsR0FBRyxDQUFDLGdCQUFnQixDQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFFLENBQUM7d0JBQ2xELElBQU0sUUFBUSxHQUFPOzRCQUNqQixXQUFXLEVBQUUsUUFBUTs0QkFDckIsTUFBTSxFQUFFLFlBQVUsSUFBSSxDQUFDLFdBQWE7eUJBQ3ZDO3dCQUNELElBQUksYUFBYTs0QkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFHLElBQUksZUFBUSxDQUFDLGNBQVksR0FBRyxNQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQTVDLENBQTRDLENBQUUsQ0FBQzt3QkFDeEYsSUFBSSxJQUFJLENBQUMsTUFBTTs0QkFBRSxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQy9DLGdGQUFPLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNyQyxDQUFDO29CQUNELFFBQVEsRUFBRSxNQUFNO2lCQUNuQixDQUFDO3FCQUNELElBQUksQ0FDRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBRXJDLFVBQVUsUUFBbUI7b0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxPQUFPLFFBQVEsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDO3FCQUNMLElBQUksQ0FBQztvQkFDRixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMzRCxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUFNO2dCQUNILElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQUcsSUFBSSxrQkFBUyxHQUFHLFlBQVMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDM0Q7UUFDTCxDQUFDO1FBQ0QsaUJBQWlCLEVBQWpCLFVBQW1CLE9BQWUsRUFBRSxNQUFjO1lBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQ3BCLE9BQU8sQ0FDVixDQUFDLFdBQVcsQ0FDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFDbkIsTUFBTSxDQUNULENBQUM7WUFFRixJQUFJLE9BQU87Z0JBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELGNBQWMsWUFBQyxJQUFJO1lBQ2YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRWhCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFHLElBQUksa0JBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztZQUV2RCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLCtDQUErQyxDQUFDLENBQUM7YUFDaEU7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBQ0QsYUFBYSxFQUFiLFVBQWMsR0FBVTtZQUNwQixJQUFNLFFBQVEsR0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLElBQUssUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHO2dCQUFHLE1BQU0sUUFBUSxDQUFDO1lBRTlDLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUUzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUNuQyxDQUFDO1lBRUYsSUFBSSxVQUFVLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0Q7UUFDTCxDQUFDO0tBQ1A7Q0FDRCxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNwTmEsU0FBUyxJQUFJO0lBQ3hCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsT0FBTyxFQUFFLENBQUM7SUFDVixrQkFBa0IsRUFBRSxDQUFDO0FBQ3pCLENBQUM7QUFFRCxTQUFTLE9BQU87SUFDWixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTVDLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGVBQUssSUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6RixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxXQUFXO0lBQ2hCLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFckQsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUV6QixJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1NBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUscUJBQXFCLENBQUM7U0FDdEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBRXhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRXJFLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBSztRQUN4QyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUtELFNBQVMsa0JBQWtCO0lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUk7UUFBRSxPQUFPO0lBQ2xDLElBQU0sR0FBRyxHQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLElBQUksR0FBRyxDQUFDLE1BQU07UUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUNELElBQU0sR0FBRyxHQUFHLGNBQU0sUUFBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQWIsQ0FBYSxDQUFDO0FBQ2hDLElBQUksQ0FBYyxDQUFDO0FBRVosU0FBUyxJQUFJLENBQUMsRUFBZTtJQUNoQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1AsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUFFLE9BQU87SUFFbkIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFDO1FBQ25DLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsYUFBYTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRU0sSUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQUUsSUFBZ0I7SUFDeEQsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDO0lBQzFDLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDL0IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFFbkMsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsT0FBTztLQUNWO0lBR0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVNLElBQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFDLFNBQWdCLEVBQUUsTUFBYyxFQUFFLE9BQXdCO0lBQXhDLG9DQUFjO0lBQUUsMkNBQXdCO0lBRWxHLElBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzlCRCxJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQVk7SUFDN0IsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUVELElBQU0sWUFBWSxHQUFHO0lBQ3BCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBRXhDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVMsQ0FBTztRQUNuQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUMsQ0FBQzthQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQztJQUN6QixJQUFJLFdBQVcsR0FBRztRQUNoQixnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFO1lBQ3hELFNBQVMsRUFBRyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU07U0FDaEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUwsT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQ0FBb0MsQ0FBQztJQUNwRCxXQUFXLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGLElBQU0sc0JBQXNCLEdBQUc7SUFDOUIsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFBRSxZQUFZLEVBQUUsQ0FBQztBQUMzRCxDQUFDO0FBRUQsaUVBQWUsY0FBTSxhQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsRUFBN0QsQ0FBNkQsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCN0Q7QUFDd0M7QUFDbUI7QUFDZDtBQUM1QjtBQUNPO0FBQ0c7QUFFakQsQ0FBQyxVQUFVLENBQUM7SUFDWCxDQUFDLENBQUM7UUFDSyw2RUFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLDZEQUFlLEVBQUUsQ0FBQztRQUNsQiwwREFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsZ0VBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLDZEQUFTLEVBQUUsQ0FBQztRQUNaLDBFQUFhLEVBQUUsQ0FBQztJQUd2QixDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQlgsSUFBSSxDQUFjLENBQUM7QUFFbkIsNkJBQWUsb0NBQVUsRUFBZTtJQUNwQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ1AsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNCLElBQUksR0FBRyxDQUFDLE1BQU07UUFBRSxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQ7SUFrQkksb0JBQVksT0FBMkI7UUFqQmhDLFlBQU8sR0FBRztZQUNiLFdBQVcsRUFBRSxVQUFVO1lBQ3ZCLFNBQVMsRUFBRSxTQUFTO1NBQ3ZCLENBQUM7UUFJTSxnQkFBVyxHQUFXLEtBQUssQ0FBQztRQUU1QixjQUFTLEdBQVcsSUFBSSxDQUFDO1FBRXpCLFFBQUcsR0FBRztZQUNWLE9BQU8sRUFBRSxJQUFJO1lBQ2IsYUFBYSxFQUFFLElBQUk7WUFDbkIsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDO1FBR0UsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUFDLE9BQU07U0FBRTtRQUU3RCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVoQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVPLGlDQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPO2FBQ1gsRUFBRSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkQsRUFBRSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBQyxJQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFFLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssVUFBVSxDQUFDLFFBQVE7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU0sK0JBQVUsR0FBakIsVUFBa0IsQ0FBTztRQUNyQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVuRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLGdDQUFXLEdBQW5CO1FBQ0ksSUFBSSxPQUFPLENBQUM7UUFDWixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO0lBQ3pFLENBQUM7SUFFTSxrQ0FBYSxHQUFwQixVQUFxQixTQUFpQjtRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLGlDQUFZLEdBQW5CLFVBQW9CLENBQU87UUFDdkIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQUM7WUFDcEIsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSztZQUNwQixPQUFPO2dCQUNILFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLFNBQVMsRUFBRSxDQUFDO1lBQ2hCLENBQUM7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLFNBQVM7b0JBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNmLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTywrQkFBVSxHQUFsQjtRQUNJLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUQsUUFBUSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7UUFFbEMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUN2QixJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLE1BQU07WUFDaEIsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BDLEtBQUssWUFBQyxHQUFHO2dCQUNMLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNmLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sZ0NBQVcsR0FBbkIsVUFBb0IsRUFBaUI7WUFBZixPQUFPLGVBQUUsSUFBSTtRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxPQUFPO1lBQ1IsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRXJELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU8scUNBQWdCLEdBQXhCO1FBQ0ksSUFBSSxLQUFLLEdBQVksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQy9ELEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFTyxnQ0FBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU87UUFHNUIsSUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDbkUsSUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFFeEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQW5IYSxtQkFBUSxHQUFHLE9BQU8sQ0FBQztJQW9IckMsaUJBQUM7Q0FBQTtBQUVNLFNBQVMsZ0JBQWdCLENBQUMsSUFBVyxFQUFFLEdBQVU7SUFDcEQsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZELElBQU0sU0FBUyxHQUFHLFVBQVEsS0FBTyxDQUFDO0lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFPTSxTQUFTLGNBQWMsQ0FBQyxHQUFVO0lBQ3JDLElBQU0sR0FBRyxHQUFHLFFBQVE7SUFDcEIsSUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckQsSUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRCxJQUFJLGFBQWEsS0FBSyxDQUFDLENBQUM7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUVwQyxJQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxJQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBSSxHQUFHLFdBQVEsQ0FBQyxDQUFDO0lBQzNDLElBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUFFLE9BQU8sRUFBRSxDQUFDO0lBRXpDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFFMUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDOUpEOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6InNpdGUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1EYXRhKCRmb3JtKSB7XG4gICAgdmFyIHVuaW5kZXhlZF9hcnJheSA9ICRmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgdmFyIGluZGV4ZWRfYXJyYXkgPSB7fTtcblxuICAgIGpRdWVyeS5tYXAodW5pbmRleGVkX2FycmF5LCBmdW5jdGlvbihuLCBpKXtcbiAgICAgICAgaW5kZXhlZF9hcnJheVtuWyduYW1lJ11dID0gblsndmFsdWUnXTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbmRleGVkX2FycmF5O1xufSIsImltcG9ydCB7IGdhRWxlbSB9IGZyb20gJ1RoaXJkUGFydHkvR0FuYWx5dGljcy9jdXN0b21UcmFja2luZy50cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmICghY2REYXRhIHx8ICFjZERhdGEuZXZlbnRzKSByZXR1cm47XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoY2REYXRhLmV2ZW50cy5tYXAucG9wdXBPcGVuLCB0cmFja01hcEV2ZW50KTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoY2REYXRhLmV2ZW50cy5tYXAucG9wdXBDbG9zZSwgdHJhY2tNYXBFdmVudCk7XG59XG5cbmZ1bmN0aW9uIHRyYWNrTWFwRXZlbnQoeyBkZXRhaWwgfSkge1xuICAgIGNvbnN0IHsgJGVsZW1lbnQsIGUgfSA9IGRldGFpbDtcbiAgICBjb25zdCB0YXJnZXQgPSAkZWxlbWVudC5maW5kKCdbZGF0YS1nYS1ldmVudF0nKS5maXJzdCgpO1xuICAgIGlmICh0YXJnZXQubGVuZ3RoKSBnYUVsZW0odGFyZ2V0KTtcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vX3R5cGVzL21haW4uZC50c1wiIC8+XG5cbmltcG9ydCB7IGdldEZvcm1EYXRhIH0gZnJvbSAnQC9IZWxwZXJzL2luZGV4JztcbmltcG9ydCB7IGdhRWxlbSwgZ2FUcmFjayB9IGZyb20gJ1RoaXJkUGFydHkvR0FuYWx5dGljcy9jdXN0b21UcmFja2luZy50cyc7XG5cbmxldCAkOnR5cGVvZiBqUXVlcnkgPSBudWxsO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgb3B0czoge1xuICAgICAgICBpbml0ZWQ6IDAsXG4gICAgICAgIC8vIENsYXNzIG5hbWVzXG4gICAgICAgIGFwcGVuZENsYXNzOiAnX2FwcGVuZGVkJywgLy8gU2VhcmNoIGFjdGl2ZVxuICAgICAgICBwcm9jZXNzaW5nOiAnX3Byb2Nlc3NpbmcnLCAvLyBsb2FkaW5nIGNsYXNzXG4gICAgICAgIHByb2Nlc3NlZDogJ19wcm9jZXNzZWQnLCAvLyBTZWFyY2ggbG9hZGVkXG4gICAgICAgIG5vUmVzdWx0czogJ19uby1yZXN1bHRzJyxcbiAgICAgICAgaGFzRXJyb3JzOiAnX2hhcy1lcnJvcnMnLFxuICAgIH0sXG4gICAgLy8gZWxlbWVudHNcbiAgICBlbHM6IHtcbiAgICAgICAgJHNlYXJjaDogbnVsbCxcbiAgICAgICAgJHRyaWdnZXJJbnB1dDogbnVsbCxcbiAgICAgICAgJGZvcm06IG51bGwsIC8vIHRoZSBmb3JtIGluIHRoZSBvdmVybGF5XG4gICAgICAgICRiZzogbnVsbCxcbiAgICAgICAgJGJnU2xvdDogbnVsbCxcbiAgICAgICAgJHNlYXJjaFJlc3VsdHNDb250YWluZXI6IG51bGwsXG4gICAgICAgICRzZWFyY2hCeTogbnVsbCwgLy8gdGhlIGRpdiBjb250YWluaW5nIHRoZSBwcmltYXJ5IGZpbHRlcnMgdG8gc2VhcmNoIGJ5XG4gICAgICAgICRzZWFyY2hFcnJvcnM6IG51bGwsIC8vIGNvbnRhaW5lciBmb3IgZGlzcGxheSBlcnJvcnNcbiAgICAgICAgJGFkdmFuY2VkT3B0aW9uczogbnVsbCwgLy8gRWwgZm9yIHRoZSBjYXRlZ29yeSBmaWx0ZXJzXG4gICAgfSxcblx0aW5pdDogZnVuY3Rpb24oXyQ6dHlwZW9mIGpRdWVyeSkge1xuICAgICAgICAkID0gXyQ7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuaW5pdGVkKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAvLyBzbyBhcyBub3QgdG8gcmUgY2FsbFxuXHRcdHRoaXMub3B0cy5pbml0ZWQgPSAxO1xuXG4gICAgICAgIHRoaXMuZWxzLiRzZWFyY2ggPSAkKCcjc2VhcmNoQm94Jyk7XG4gICAgICAgIHRoaXMuZWxzLiR0cmlnZ2VySW5wdXQgPSB0aGlzLmVscy4kc2VhcmNoLmZpbmQoJy5zZWFyY2gtaW5wdXQnKTtcbiAgICAgICAgdmFyICRiZyA9IHRoaXMuZWxzLiRiZyA9ICQoJyNzZWFyY2hPdmVybGF5Jyk7XG5cbiAgICAgICAgdGhpcy5lbHMuJGZvcm0gPSB0aGlzLmVscy4kYmcuZmluZCgnZm9ybScpO1xuICAgICAgICB0aGlzLmVscy4kaW5uZXJJbnB1dCA9IHRoaXMuZWxzLiRiZy5maW5kKCcuc2VhcmNoLWlucHV0Jyk7XG4gICAgICAgIHRoaXMuZWxzLiRzZWFyY2hSZXN1bHRzQ29udGFpbmVyID0gJCgnI3NlYXJjaFJlc3VsdHNDb250YWluZXInKTtcbiAgICAgICAgdGhpcy5lbHMuJHNlYXJjaEJ5ID0gJCgnI3NlYXJjaEJ5Jyk7XG4gICAgICAgIHRoaXMuZWxzLiRhZHZhbmNlZE9wdGlvbnMgPSAkKCcjc2VhcmNoT3B0aW9ucycpO1xuICAgICAgICB0aGlzLmVscy4kc2VhcmNoRXJyb3JzID0gJCgnI3NlYXJjaEVycm9ycycpO1xuXG4gICAgICAgICRiZy5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgdGhpcy5lbHMuJHRyaWdnZXJJbnB1dC5vbignZm9jdXMnLCB0aGlzLm1ldGhvZHMubG9hZEJhY2tkcm9wLmJpbmQodGhpcykpO1xuXG4gICAgICAgICRiZy5vbignY2xpY2snLCAnLmNsaWNrLXRyYXAnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQgPT0gZS5jdXJyZW50VGFyZ2V0ICYmIHRoaXMubWV0aG9kcy5vbkNsb3NlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgICAgICAub24oJ3N1Ym1pdCcsICdmb3JtJywgdGhpcy5tZXRob2RzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuZWxzLiRhZHZhbmNlZE9wdGlvbnMub24oJ2NsaWNrJywgJ2lucHV0OmNoZWNrZWQnLCB0aGlzLm1ldGhvZHMudG9nZ2xlQ2hlY2tlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5tZXRob2RzLmluaXRTZWFyY2hCeS5jYWxsKHRoaXMpO1xuXHR9LFxuXHRtZXRob2RzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXBlbmRpbmcgb24gd2hhdCdzIGJlaW5nIHNlYXJjaGVkLCBzaG93cyBvciBoaWRlcyBhZHZhbmNlZCBvcHRpb24gdGF4b25vbXkgc2VjdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIGluaXRTZWFyY2hCeSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRheG9ub21pZXMgPSBjZERhdGEudGF4b25vbXlUeXBlO1xuICAgICAgICAgICAgY29uc3QgJG9wdENvbnRhaW5lciA9IHRoaXMuZWxzLiRhZHZhbmNlZE9wdGlvbnM7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXM7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVTaG93SGlkZU9wdGlvblNlY3Rpb25zID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUgJiYgZS50YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzID09PSBlLnRhcmdldCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjdXJUeXBlcyA9IHRoaXMuZWxzLiRzZWFyY2hCeS5maW5kKCdpbnB1dDpjaGVja2VkJykuZGF0YSgpLnNlYXJjaFR5cGVzO1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHRheG9ub21pZXMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgJG9wdENvbnRhaW5lci5maW5kKCcuJyArIHRheG9ub21pZXNba2V5XSlbY3VyVHlwZXMuaW5jbHVkZXMoa2V5KSA/ICdzaG93JyA6ICdoaWRlJ10oKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoZSAmJiBlLnRhcmdldCkgZ2FFbGVtKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaEJ5Lm9uKCdjbGljaycsICdpbnB1dCcsIHVwZGF0ZVNob3dIaWRlT3B0aW9uU2VjdGlvbnMpO1xuICAgICAgICAgICAgdXBkYXRlU2hvd0hpZGVPcHRpb25TZWN0aW9ucyhudWxsKTtcbiAgICAgICAgfSxcblx0XHRsb2FkQmFja2Ryb3AoZSkge1xuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLmFkZENsYXNzKHRoaXMub3B0cy5hcHBlbmRDbGFzcyk7XG4gICAgICAgICAgICBnYUVsZW0oZS50YXJnZXQpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJGlubmVySW5wdXRbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xvc2UoKSB7XG4gICAgICAgICAgICB0aGlzLmVscy4kYmcucmVtb3ZlQ2xhc3ModGhpcy5vcHRzLmFwcGVuZENsYXNzKTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlQ2hlY2tlZChlKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gZS50YXJnZXQuZGF0YXNldDtcbiAgICAgICAgICAgIGNvbnN0IGlzID0gK2UudGFyZ2V0LmNoZWNrZWRcbiAgICAgICAgICAgIGNvbnN0IGRpc2FibGUgPSArZGF0YS53YXNDaGVja2VkID09PSBpcztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRpc2FibGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZGF0YS53YXNDaGVja2VkID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBkYXRhLndhc0NoZWNrZWQgPSAxO1xuXG4gICAgICAgICAgICAvLyBnYSB0cmFja2luZ1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXggPSBlLnRhcmdldC5uYW1lLm1hdGNoKC9cXFsoW2Etei1dKylcXF0vKTtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRheG9ub215ID0gdGF4WzFdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGUudGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYWN0aW9uID0gZGlzYWJsZSA/ICdkaXNhYmxlJyA6ICdlbmFibGUnO1xuICAgICAgICAgICAgICAgICAgICBnYVRyYWNrKCdpbnRlcmFjdGlvbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlbl9uYW1lOiAnc2VhcmNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogYCR7YWN0aW9ufSAke3RheG9ub215fWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvblN1Ym1pdChlKSB7XG4gICAgICAgICAgICB0aGlzLmVscy4kYmcucmVtb3ZlQ2xhc3ModGhpcy5vcHRzLmhhc0Vycm9ycyk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMudHJpZ2dlclByb2Nlc3NpbmcuY2FsbCh0aGlzLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZWxzLiRzZWFyY2hSZXN1bHRzQ29udGFpbmVyLmVtcHR5KCk7XG4gICAgICAgICAgICB2YXIgZGF0YTp7c2VhcmNoPzpzdHJpbmcsIHNlYXJjaF90eXBlPzpzdHJpbmd9ID0gZ2V0Rm9ybURhdGEodGhpcy5lbHMuJGZvcm0pO1xuICAgICAgICAgICAgbGV0IGhhc1RheG9ub21pZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IHRheG9ub215ID0gT2JqZWN0LmtleXMoZGF0YSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGtleSA9PiAvXnRheG9ub215Ly50ZXN0KGtleSkpXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYWNjLCB0YXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaGFzVGF4b25vbWllcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGFjY1t0YXgubWF0Y2goL1xcWyhbYS16LV0rKVxcXS8pWzFdXSA9IGRhdGFbdGF4XTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gdGhpcy5tZXRob2RzLnZhbGlkYXRlU2VhcmNoLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICghZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGNkRGF0YS5yZXN0QmFzZSArICdzZWFyY2gvYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGRhdGEuc2VhcmNoX3R5cGUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICggeGhyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoICdYLVdQLU5vbmNlJywgcG0ud3Bfbm9uY2UgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhUGFyYW1zOmFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5fbmFtZTogJ3NlYXJjaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBgc2VhcmNoICR7ZGF0YS5zZWFyY2hfdHlwZX1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1RheG9ub21pZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGF4b25vbXkpLmZvckVhY2godGF4ID0+IGdhUGFyYW1zW2B0YXhvbm9teVske3RheH1dYF0gPSB0YXhvbm9teVt0YXhdICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zZWFyY2gpIGdhUGFyYW1zLnNlYXJjaCA9IGRhdGEuc2VhcmNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FUcmFjaygnaW50ZXJhY3Rpb24nLCBnYVBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMucmVzdWx0c0xvYWRlZC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZTpDRFJlc3BvbnNlKTpDRFJlc3BvbnNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciAnICsgcmVzcG9uc2UucmVzdWx0LCByZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQubWV0aG9kcy50cmlnZ2VyUHJvY2Vzc2luZy5jYWxsKHRoYXQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaEVycm9ycy5hcHBlbmQoZXJyb3JzLm1hcChlcnIgPT4gYDxzcGFuPiR7ZXJyfTwvc3Bhbj5gKS5qb2luKCc8YnIgLz4nKSlcbiAgICAgICAgICAgICAgICB0aGlzLmVscy4kYmcuYWRkQ2xhc3ModGhpcy5vcHRzLmhhc0Vycm9ycyk7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLnRyaWdnZXJQcm9jZXNzaW5nLmNhbGwodGhpcywgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJpZ2dlclByb2Nlc3NpbmcoIGxvYWRpbmc6Ym9vbGVhbiwgbG9hZGVkOmJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMucHJvY2Vzc2luZyxcbiAgICAgICAgICAgICAgICBsb2FkaW5nXG4gICAgICAgICAgICApLnRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5wcm9jZXNzZWQsXG4gICAgICAgICAgICAgICAgbG9hZGVkXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAobG9hZGluZykgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5ub1Jlc3VsdHMpO1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0ZVNlYXJjaChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gW107XG5cbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IGhhc1RheCA9IGtleXMuc29tZShrZXkgPT4gL150YXhvbm9teS8udGVzdChrZXkpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRhdGEuc2VhcmNoICYmIGRhdGEuc2VhcmNoLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChcIlRoZSBzZWFyY2ggbXVzdCBiZSBhdCBsZWFzdCAzIGNoYXJhY3RlcnMgbG9uZ1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICAgICAgfSxcbiAgICAgICAgcmVzdWx0c0xvYWRlZChyZXM6c3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZTpDRFJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5yZXN1bHQgIT09IDIwMCApIHRocm93IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICBjb25zdCBoYXNSZXN1bHRzID0gISFyZXNwb25zZS5kYXRhLnJlc3VsdHM7XG5cbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMubm9SZXN1bHRzLCAhaGFzUmVzdWx0c1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGhhc1Jlc3VsdHMgJiYgcmVzcG9uc2UuZGF0YS5odG1sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaFJlc3VsdHNDb250YWluZXIuaHRtbChyZXNwb25zZS5kYXRhLmh0bWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cbn07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpbml0Q29ubmVjdCgpO1xuICAgIGluaXRGQVEoKTtcbiAgICBhZGRIYXNoQWN0aXZlQ2xhc3MoKTtcbn1cblxuZnVuY3Rpb24gaW5pdEZBUSgpOmJvb2xlYW4ge1xuICAgIGNvbnN0ICRGQVEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnRkFRJyk7XG5cbiAgICBpZiAoISRGQVEpIHJldHVybiBmYWxzZTtcblxuICAgIGpRdWVyeSgkRkFRKS5vbignY2xpY2snLCAnaDMnLCBldmVudCA9PiB7IGpRdWVyeShldmVudC50YXJnZXQpLnRvZ2dsZUNsYXNzKCd0b2dnbGVkJyk7IH0pXG4gICAgXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGluaXRDb25uZWN0KCk6Ym9vbGVhbiB7XG4gICAgY29uc3QgJGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZUNvbm5lY3QnKTtcblxuICAgIGlmICghJGJvZHkpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0ICRsb2dpbiA9IGpRdWVyeSgnLnV3cC1sb2dpbi1jbGFzcycpO1xuICAgIFxuICAgICRsb2dpbi5maW5kKCcudXdwLWxvZ2luLWZvcm0nKVxuICAgICAgICAuYXR0cignZW5jdHlwZScsICdtdWx0aXBhcnQvZm9ybS1kYXRhJylcbiAgICAgICAgLmF0dHIoJ2FjdGlvbicsICcvd3Avd3AtbG9naW4ucGhwJyk7XG5cbiAgICAkbG9naW4uZmluZCgnI3VzZXJuYW1lJykuYXR0cignaWQnLCAndXNlcl9sb2dpbicpLmF0dHIoJ25hbWUnLCAnbG9nJyk7XG4gICAgJGxvZ2luLmZpbmQoJyNwYXNzd29yZCcpLmF0dHIoJ2lkJywgJ3VzZXJfcGFzcycpLmF0dHIoJ25hbWUnLCAncHdkJyk7XG5cbiAgICBjb25zdCAkbmF2TGlua3MgPSBqUXVlcnkoJy5uYXYtbGluaycpO1xuICAgIGpRdWVyeSgkYm9keSkub24oJ2NsaWNrJywgJy5uYXYtbGluaycsIGV2ZW50ID0+IHtcbiAgICAgICAgJG5hdkxpbmtzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgalF1ZXJ5KGV2ZW50LnRhcmdldCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogQWRkcyBhbiBhY3RpdmUgY2xhc3MgdG8gYW55IGVsZW1lbnQgbWF0Y2hpbmcgdGhlIHVybCdzIGhhc2hcbiAqL1xuZnVuY3Rpb24gYWRkSGFzaEFjdGl2ZUNsYXNzKCkge1xuICAgIGlmICghd2luZG93LmxvY2F0aW9uLmhhc2gpIHJldHVybjtcbiAgICBjb25zdCAkZWwgPSAgalF1ZXJ5KHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICBpZiAoJGVsLmxlbmd0aCkgJGVsLmFkZENsYXNzKCdhY3RpdmUnKTtcbn0iLCJjb25zdCBjYW4gPSAoKSA9PiAhIXdpbmRvdy5ndGFnO1xubGV0ICQ6SlF1ZXJ5U3RhdGljO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChfJDpKUXVlcnlTdGF0aWMpIHtcbiAgICAkID0gXyQ7XG4gICAgaWYgKCFjYW4oKSkgcmV0dXJuO1xuICAgIFxuICAgICQoZG9jdW1lbnQuYm9keSkub24oJ2NsaWNrJywgJy5ndGFnJywgZSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gZS5jdXJyZW50VGFyZ2V0KSBnYUVsZW0oZS50YXJnZXQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgZ2FFbGVtID0gIWNhbigpID8gKCkgPT4ge30gOiAoIGVsZW06SFRNTEVsZW1lbnQgKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9ICQoZWxlbSkuZGF0YSgpO1xuICAgIGNvbnN0IGNvbW1hbmQgPSBkYXRhLmdhQ29tbWFuZCB8fCAnZXZlbnQnO1xuICAgIGNvbnN0IGV2ZW50TmFtZSA9IGRhdGEuZ2FFdmVudDtcbiAgICBjb25zdCBwYXJhbXMgPSBkYXRhLmdhUGFyYW1zIHx8IHt9O1xuXG4gICAgaWYgKCFldmVudE5hbWUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignSW52YWxpZCBnYUVsZW0gY2FsbCB1c2luZzonLCBkYXRhKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKCAnZ2FFbGVtKCknLCBjb21tYW5kLCBldmVudE5hbWUsIHBhcmFtcyApO1xuICAgIGd0YWcoY29tbWFuZCwgZXZlbnROYW1lLCBwYXJhbXMpO1xufVxuXG5leHBvcnQgY29uc3QgZ2FUcmFjayA9ICFjYW4oKSA/ICgpID0+IHt9IDogKGV2ZW50TmFtZTpzdHJpbmcsIHBhcmFtczp7fSA9IHt9LCBjb21tYW5kOnN0cmluZyA9ICdldmVudCcpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyggJ2dhVHJhY2soKScsIGNvbW1hbmQsIGV2ZW50TmFtZSwgcGFyYW1zICk7XG4gICAgZ3RhZyhjb21tYW5kLCBldmVudE5hbWUsIHBhcmFtcyk7XG59IiwiY29uc3Qgb25TdWJtaXQgPSAodG9rZW46c3RyaW5nKSA9PiB7XG5cdCQoJy51d3AtcmVnaXN0cmF0aW9uLWZvcm0nKVswXS5vbnN1Ym1pdChuZXcgRXZlbnQoJ3N1Ym1pdCcpKTtcbn1cblxuY29uc3QgcmVnaXN0cmF0aW9uID0gKCkgPT4ge1xuXHR2YXIgJGJ1dHRvbiA9ICQoJy51d3BfcmVnaXN0ZXJfc3VibWl0Jyk7XG5cblx0JGJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihlOkV2ZW50KSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGdyZWNhcHRjaGEuZXhlY3V0ZShwbS5yZWNhcHRjaGEua2V5X3YzLCB7YWN0aW9uOiAnc3VibWl0J30pXG5cdFx0XHQudGhlbihvblN1Ym1pdCk7XG5cdH0pO1xuXG5cdHZhciBjYXB0Y2hhQ29udGFpbmVyID0gbnVsbDtcbiAgICB2YXIgbG9hZENhcHRjaGEgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNhcHRjaGFDb250YWluZXIgPSBncmVjYXB0Y2hhLnJlbmRlcignY2FwdGNoYV9jb250YWluZXInLCB7XG4gICAgICAgICdzaXRla2V5JyA6IHBtLnJlY2FwdGNoYS5rZXlfdjIsXG4gICAgICB9KTtcbiAgICB9O1xuXG5cdCRidXR0b24uYmVmb3JlKCc8ZGl2IGlkPVwiY2FwdGNoYV9jb250YWluZXJcIj48L2Rpdj4nKVxuXHRsb2FkQ2FwdGNoYSgpO1xufTtcblxuY29uc3QgbG9hZFJlY2FwdGNoYUluc3RhbmNlcyA9ICgpID0+IHtcblx0aWYgKC9eXFwvcmVnaXN0cmEvLnRlc3QobG9jYXRpb24ucGF0aG5hbWUpKSByZWdpc3RyYXRpb24oKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gd2luZG93LmdyZWNhcHRjaGEgJiYgZ3JlY2FwdGNoYS5yZWFkeShsb2FkUmVjYXB0Y2hhSW5zdGFuY2VzKTsiLCJpbXBvcnQgJ0AvaW5kZXguc3R5bCc7XG5pbXBvcnQgcmVDYXB0Y2hhSW5pdCBmcm9tICdUaGlyZFBhcnR5L1JlY2FwdGNoYS9SZWNhcHRjaGEudHMnO1xuaW1wb3J0IHsgaW5pdCBhcyBnQW5hbHl0aWNzSW5pdCB9IGZyb20gJ1RoaXJkUGFydHkvR0FuYWx5dGljcy9jdXN0b21UcmFja2luZy50cyc7XG5pbXBvcnQgeyBpbml0IGFzIGFuYWx5dGljc0V2ZW50cyB9IGZyb20gJ0AvU0VPL0FuYWx5dGljc0V2ZW50cy50cyc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJ0AvU2VhcmNoL2luZGV4LnRzJztcbmltcG9ydCBpbml0UGFnZXMgZnJvbSAnQC9UZW1wbGF0ZXMvUGFnZS9wYWdlJztcbmltcG9ydCBpbml0RW50aXR5IGZyb20gJ3RlbXBsYXRlcy9lbnRpdHkvZW50aXR5JztcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoKCkgPT4ge1xuICAgICAgICBnQW5hbHl0aWNzSW5pdCgkKTtcbiAgICAgICAgYW5hbHl0aWNzRXZlbnRzKCk7XG4gICAgICAgIFNlYXJjaC5pbml0KCQpO1xuICAgICAgICBpbml0RW50aXR5KCQpO1xuICAgICAgICBpbml0UGFnZXMoKTtcbiAgICAgICAgcmVDYXB0Y2hhSW5pdCgpO1xuXG4gICAgICAgIC8vICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoJ3ByZWxvYWQnKTtcblx0fSlcbn0pKGpRdWVyeSk7IiwibGV0ICQ6SlF1ZXJ5U3RhdGljO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoXyQ6SlF1ZXJ5U3RhdGljKSB7XG4gICAgJCA9IF8kO1xuICAgIGxldCAkZWwgPSAkKCcjZW50aXR5UGFnZScpO1xuICAgIGlmICgkZWwubGVuZ3RoKSBuZXcgRW50aXR5UGFnZSgkZWwpO1xufVxuXG5jbGFzcyBFbnRpdHlQYWdlIHtcbiAgICBwdWJsaWMgY2xhc3NlcyA9IHtcbiAgICAgICAgJ2JvZHktZWRpdCc6ICdlZGl0YWJsZScsXG4gICAgICAgICdsb2FkaW5nJzogJ2xvYWRpbmcnLFxuICAgIH07XG5cbiAgICBwdWJsaWMgc3RhdGljIGVkaXRIYXNoID0gJyNlZGl0JztcblxuICAgIHByaXZhdGUgZWRpdEVuYWJsZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIC8vIGZpcnN0IHRpbWUgdG9nZ2xpbmcgZWRpdFxuICAgIHByaXZhdGUgZmlyc3RUaW1lOmJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIHByaXZhdGUgZWxzID0ge1xuICAgICAgICAkcGFyZW50OiBudWxsLFxuICAgICAgICAkcHJvZmlsZVBob3RvOiBudWxsLFxuICAgICAgICAkZm9ybTogbnVsbCxcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCRwYXJlbnQ6SlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xuICAgICAgICBpZiAoIWFjZikgeyBjb25zb2xlLmVycm9yKCdNaXNzaW5nIEFDRiBqcyBsaWJyYXJ5Jyk7IHJldHVybiB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVscy4kcGFyZW50ID0gJHBhcmVudDtcbiAgICAgICAgdGhpcy5lbHMuJHByb2ZpbGVQaG90byA9ICQoJyNwcm9maWxlUGhvdG8nKTtcbiAgICAgICAgdGhpcy5lbHMuJGZvcm0gPSAkKCcjYWNmLWZvcm0nKTtcblxuICAgICAgICBpZiAodGhpcy5lbHMuJGZvcm0ubGVuZ3RoKSB0aGlzLmJpbmRFbGVtZW50cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYmluZEVsZW1lbnRzKCkge1xuICAgICAgICB0aGlzLmVscy4kcGFyZW50XG4gICAgICAgICAgICAub24oJ2NsaWNrJywgJy50b2dnbGUtZWRpdCcsIHRoaXMudG9nZ2xlRWRpdC5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKCdjbGljaycsICcuc2F2ZS1hY2YtZm9ybScsIHRoaXMudmFsaWRhdGVGb3JtLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmVscy4kZm9ybS5vZmYoJ3N1Ym1pdCcpLm9uKCdzdWJtaXQnLCAoZSkgPT4geyBlLnByZXZlbnREZWZhdWx0KCk7IH0pO1xuXG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gRW50aXR5UGFnZS5lZGl0SGFzaClcbiAgICAgICAgICAgIHRoaXMuZWxzLiRwYXJlbnQuZmluZCgnLnRvZ2dsZS1lZGl0JykuZmlyc3QoKS50cmlnZ2VyKCdjbGljaycpO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVFZGl0KGU6RXZlbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmVkaXRFbmFibGVkID0gIXRoaXMuZWRpdEVuYWJsZWQ7XG4gICAgICAgIHRoaXMuZWxzLiRwYXJlbnQudG9nZ2xlQ2xhc3ModGhpcy5jbGFzc2VzWydib2R5LWVkaXQnXSwgdGhpcy5lZGl0RW5hYmxlZCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gdGhpcy5lZGl0RW5hYmxlZCA/IEVudGl0eVBhZ2UuZWRpdEhhc2ggOiAnJztcblxuICAgICAgICB0aGlzLm9uRmlyc3RUaW1lKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkaXJ0aWZ5Rm9ybSgpIHtcbiAgICAgICAgbGV0IGFjZkZvcm07XG4gICAgICAgIGlmIChhY2ZGb3JtID0gdGhpcy5lbHMuJGZvcm0uZGF0YSgnYWNmJykpIGFjZkZvcm0uc2V0KCdzdGF0dXMnLCBudWxsKVxuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVMb2FkaW5nKGlzTG9hZGluZzpib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZWxzLiRwYXJlbnQudG9nZ2xlQ2xhc3ModGhpcy5jbGFzc2VzLmxvYWRpbmcsIGlzTG9hZGluZyk7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlRm9ybShlOkV2ZW50KSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy50b2dnbGVMb2FkaW5nKHRydWUpO1xuICAgICAgICB0aGlzLmRpcnRpZnlGb3JtKCk7XG4gICAgICAgIGxldCB2YWxpZGF0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgb25TdWNjZXNzID0gdGhpcy5zdWJtaXRBamF4LmJpbmQodGhpcyk7XG4gICAgICAgIHJldHVybiBhY2YudmFsaWRhdGVGb3JtKHtcbiAgICAgICAgICAgIGZvcm06IHRoaXMuZWxzLiRmb3JtLFxuICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG9uU3VjY2VzcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZWQpIHRoaXMudG9nZ2xlTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdWJtaXRBamF4KCkge1xuICAgICAgICBjb25zdCAkZm9ybSA9IHRoaXMuZWxzLiRmb3JtO1xuICAgICAgICBhY2YubG9ja0Zvcm0oJGZvcm0pO1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IGFjZi5wcmVwYXJlRm9yQWpheChhY2Yuc2VyaWFsaXplKCRmb3JtKSk7XG4gICAgICAgIGZvcm1EYXRhLmFjdGlvbiA9ICdhY2Yvc2F2ZV9wb3N0JztcbiAgICAgICAgXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGFjZi5nZXQoJ2FqYXh1cmwnKSxcbiAgICAgICAgICAgIGRhdGE6IGZvcm1EYXRhLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGNvbnRleHQ6IHRoaXMsXG4gICAgICAgICAgICBzdWNjZXNzOiB0aGlzLmFmdGVyU3VibWl0LmJpbmQodGhpcyksXG4gICAgICAgICAgICBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgICBhY2YudW5sb2NrRm9ybSgkZm9ybSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBhbGVydChlcnIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZnRlclN1Ym1pdCh7IHN1Y2Nlc3MsIHNsdWcgfSkge1xuICAgICAgICB0aGlzLnRvZ2dsZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFzdWNjZXNzKVxuICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KHBtLnRyYW5zbGF0ZS5mb3JtX3N1Ym1pc3Npb25fZXJyb3IpO1xuXG4gICAgICAgIGNvbnN0IGN1clNsdWcgPSB0aGlzLmdldEN1ckVudGl0eVNsdWcoKTtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZShjdXJTbHVnLCBzbHVnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEN1ckVudGl0eVNsdWcoKTpzdHJpbmcge1xuICAgICAgICBsZXQgcGFydHM6c3RyaW5nW10gPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnLycpLnJldmVyc2UoKTtcbiAgICAgICAgcGFydHMubGVuZ3RoID0gMjtcbiAgICAgICAgaWYgKCFwYXJ0c1swXSkgcGFydHMuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHBhcnRzWzBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25GaXJzdFRpbWUoKSB7XG4gICAgICAgIGlmICghdGhpcy5maXJzdFRpbWUpIHJldHVybjtcblxuICAgICAgICAvLyBDaGFuZ2UgaW1hZ2Ugc2l6ZSBvZiBwcm9maWxlIHBpY3R1cmVcbiAgICAgICAgY29uc3QgJHByb2ZpbGVQaWNGaWVsZCA9IGdldEFjZkZpZWxkQnlLZXkoJ2VudGl0eScsICdwaWN0dXJlX2tleScpO1xuICAgICAgICBjb25zdCAkcGljID0gJHByb2ZpbGVQaWNGaWVsZC5maW5kKCdpbWcnKTtcbiAgICAgICAgJHBpY1swXS5zcmMgPSBnZXRVbnNjYWxlZFNyYygkcGljWzBdLnNyYykgfHwgdGhpcy5lbHMuJHByb2ZpbGVQaG90by5kYXRhKCkuZGVmYXVsdFBob3RvO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5maXJzdFRpbWUgPSBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY2ZGaWVsZEJ5S2V5KHR5cGU6c3RyaW5nLCBrZXk6c3RyaW5nKSB7XG4gICAgY29uc3QgZmllbGQgPSBjZERhdGEuYWNmW3R5cGVdW2tleV0ucmVwbGFjZSgvXy9nLCAnLScpO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGAuYWNmLSR7ZmllbGR9YDtcbiAgICBjb25zb2xlLmxvZygnZmllbGQgbmFtZScsIGNsYXNzTmFtZSk7XG4gICAgcmV0dXJuIGpRdWVyeShjbGFzc05hbWUpO1xufVxuXG4vKipcbiAqIFNlYXJjaGVzIHRocm91Z2ggYW4gaW1hZ2Ugc3JjIHdpdGggJ3NjYWxlZCcgYXQgaXRzIGVuZCBhbmQgcmVtb3ZlcyB0aGUgc2NhbGluZyBhZnRlciBpdFxuICogQHBhcmFtIHNyYyAgIHN0cmluZyAgICAgIGltYWdlIHNyY1xuICogQHJldHVybnMgICAgIHN0cmluZyAgICAgIHVuc2NhbGVkIHNyY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VW5zY2FsZWRTcmMoc3JjOnN0cmluZyk6c3RyaW5nIHtcbiAgICBjb25zdCBrZXkgPSAnc2NhbGVkJ1xuICAgIGNvbnN0IHNjYWxlZEtleSA9IGtleS5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xuICAgIGNvbnN0IHNyY1JldmVyc2VkID0gc3JjLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG4gICAgY29uc3QgcmV2ZXJzZWRJbmRleCA9IHNyY1JldmVyc2VkLmluZGV4T2Yoc2NhbGVkS2V5KTtcbiAgICBpZiAocmV2ZXJzZWRJbmRleCA9PT0gLTEpIHJldHVybiAnJztcblxuICAgIGNvbnN0IGluZGV4ID0gc3JjLmxlbmd0aCAtIChyZXZlcnNlZEluZGV4ICsgc2NhbGVkS2V5Lmxlbmd0aCk7XG4gICAgY29uc3QgcGF0dGVybiA9IG5ldyBSZWdFeHAoYCR7a2V5fS1bXi5dK2ApO1xuICAgIGNvbnN0IHNpemVNYXRjaCA9IHNyYy5zdWJzdHIoaW5kZXgpLm1hdGNoKHBhdHRlcm4pO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShzaXplTWF0Y2gpKSByZXR1cm4gJyc7XG5cbiAgICByZXR1cm4gc3JjLnJlcGxhY2Uoc2l6ZU1hdGNoWzBdLCBrZXkpO1xuXG59IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9