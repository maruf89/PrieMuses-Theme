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

var $ = null;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    opts: {
        inited: 0,
        appendClass: '_appended',
        processing: '_processing',
        processed: '_processed',
        noResults: '_no-results',
    },
    els: {
        $search: null,
        $input: null,
        $form: null,
        $bg: null,
        $bgSlot: null,
        $searchResultsContainer: null,
    },
    init: function (_$) {
        $ = _$;
        if (this.opts.inited)
            return;
        this.opts.inited = 1;
        this.els.$search = $('#searchBox');
        this.els.$input = this.els.$search.find('.search-input');
        var $bg = this.els.$bg = $('#searchOverlay');
        this.els.$form = this.els.$bg.find('form');
        this.els.$innerInput = this.els.$bg.find('.search-input');
        this.els.$searchResultsContainer = $('#searchResultsContainer');
        $bg.appendTo(document.body);
        this.els.$input.on('focus', this.methods.loadBackdrop.bind(this));
        $bg.on('click', '.click-trap', function (e) {
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
        onClose: function () {
            this.els.$bg.removeClass(this.opts.appendClass);
        },
        onSubmit: function (e) {
            e.preventDefault();
            this.methods.triggerProcessing.call(this, true, false);
            this.els.$searchResultsContainer.empty();
            var data = (0,_Helpers_index__WEBPACK_IMPORTED_MODULE_0__.getFormData)(this.els.$form);
            var errors = this.methods.validateSearch.call(this, data);
            var that = this;
            if (!errors.length) {
                $.ajax({
                    type: 'POST',
                    url: pm.restBase + 'search/all',
                    data: {
                        search: data.search,
                        type: data.search_type,
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-WP-Nonce', pm.wp_nonce);
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
            }
        },
        triggerProcessing: function (loading, loaded) {
            this.els.$bg.toggleClass(this.opts.processing, loading).toggleClass(this.opts.processed, loaded);
            if (loading)
                this.els.$bg.removeClass(this.opts.noResults);
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
/* harmony import */ var _Search_index_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Search/index.ts */ "./src/Modules/Search/index.ts");
/* harmony import */ var _Templates_Page_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Templates/Page/page */ "./src/Modules/Templates/Page/page.ts");




(function ($) {
    $(function () {
        _Search_index_ts__WEBPACK_IMPORTED_MODULE_2__.default.init(jQuery);
        (0,ThirdParty_Recaptcha_Recaptcha_ts__WEBPACK_IMPORTED_MODULE_1__.default)();
        (0,_Templates_Page_page__WEBPACK_IMPORTED_MODULE_3__.default)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9IZWxwZXJzL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1NlYXJjaC9pbmRleC50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9UZW1wbGF0ZXMvUGFnZS9wYWdlLnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9UaGlyZFBhcnR5L1JlY2FwdGNoYS9SZWNhcHRjaGEudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL2luZGV4LnN0eWwiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPLFNBQVMsV0FBVyxDQUFDLEtBQUs7SUFDN0IsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzdDLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUV2QixNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3JDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMs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OztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJzaXRlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtRGF0YSgkZm9ybSkge1xuICAgIHZhciB1bmluZGV4ZWRfYXJyYXkgPSAkZm9ybS5zZXJpYWxpemVBcnJheSgpO1xuICAgIHZhciBpbmRleGVkX2FycmF5ID0ge307XG5cbiAgICBqUXVlcnkubWFwKHVuaW5kZXhlZF9hcnJheSwgZnVuY3Rpb24obiwgaSl7XG4gICAgICAgIGluZGV4ZWRfYXJyYXlbblsnbmFtZSddXSA9IG5bJ3ZhbHVlJ107XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5kZXhlZF9hcnJheTtcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vX3R5cGVzL21haW4uZC50c1wiIC8+XG5cbmltcG9ydCB7IGdldEZvcm1EYXRhIH0gZnJvbSAnQC9IZWxwZXJzL2luZGV4JztcblxubGV0ICQ6dHlwZW9mIGpRdWVyeSA9IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBvcHRzOiB7XG4gICAgICAgIGluaXRlZDogMCxcbiAgICAgICAgLy8gQ2xhc3MgbmFtZXNcbiAgICAgICAgYXBwZW5kQ2xhc3M6ICdfYXBwZW5kZWQnLCAvLyBTZWFyY2ggYWN0aXZlXG4gICAgICAgIHByb2Nlc3Npbmc6ICdfcHJvY2Vzc2luZycsIC8vIGxvYWRpbmcgY2xhc3NcbiAgICAgICAgcHJvY2Vzc2VkOiAnX3Byb2Nlc3NlZCcsIC8vIFNlYXJjaCBsb2FkZWRcbiAgICAgICAgbm9SZXN1bHRzOiAnX25vLXJlc3VsdHMnLFxuICAgIH0sXG4gICAgLy8gZWxlbWVudHNcbiAgICBlbHM6IHtcbiAgICAgICAgJHNlYXJjaDogbnVsbCxcbiAgICAgICAgJGlucHV0OiBudWxsLFxuICAgICAgICAkZm9ybTogbnVsbCwgLy8gdGhlIGZvcm0gaW4gdGhlIG92ZXJsYXlcbiAgICAgICAgJGJnOiBudWxsLFxuICAgICAgICAkYmdTbG90OiBudWxsLFxuICAgICAgICAkc2VhcmNoUmVzdWx0c0NvbnRhaW5lcjogbnVsbCxcbiAgICB9LFxuXHRpbml0OiBmdW5jdGlvbihfJDp0eXBlb2YgalF1ZXJ5KSB7XG4gICAgICAgICQgPSBfJDtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5pbml0ZWQpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIC8vIHNvIGFzIG5vdCB0byByZSBjYWxsXG5cdFx0dGhpcy5vcHRzLmluaXRlZCA9IDE7XG5cbiAgICAgICAgdGhpcy5lbHMuJHNlYXJjaCA9ICQoJyNzZWFyY2hCb3gnKTtcbiAgICAgICAgdGhpcy5lbHMuJGlucHV0ID0gdGhpcy5lbHMuJHNlYXJjaC5maW5kKCcuc2VhcmNoLWlucHV0Jyk7XG4gICAgICAgIHZhciAkYmcgPSB0aGlzLmVscy4kYmcgPSAkKCcjc2VhcmNoT3ZlcmxheScpO1xuXG4gICAgICAgIHRoaXMuZWxzLiRmb3JtID0gdGhpcy5lbHMuJGJnLmZpbmQoJ2Zvcm0nKTtcbiAgICAgICAgdGhpcy5lbHMuJGlubmVySW5wdXQgPSB0aGlzLmVscy4kYmcuZmluZCgnLnNlYXJjaC1pbnB1dCcpO1xuICAgICAgICB0aGlzLmVscy4kc2VhcmNoUmVzdWx0c0NvbnRhaW5lciA9ICQoJyNzZWFyY2hSZXN1bHRzQ29udGFpbmVyJyk7XG5cbiAgICAgICAgJGJnLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB0aGlzLmVscy4kaW5wdXQub24oJ2ZvY3VzJywgdGhpcy5tZXRob2RzLmxvYWRCYWNrZHJvcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICAkYmcub24oJ2NsaWNrJywgJy5jbGljay10cmFwJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0ID09IGUuY3VycmVudFRhcmdldCAmJiB0aGlzLm1ldGhvZHMub25DbG9zZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKCdzdWJtaXQnLCAnZm9ybScsIHRoaXMubWV0aG9kcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblxuXHRcdFxuXHR9LFxuXHRtZXRob2RzOiB7XG5cdFx0bG9hZEJhY2tkcm9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmVscy4kYmcuYWRkQ2xhc3ModGhpcy5vcHRzLmFwcGVuZENsYXNzKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxzLiRpbm5lcklucHV0WzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIDApO1xuICAgICAgICB9LFxuICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy5yZW1vdmVDbGFzcyh0aGlzLm9wdHMuYXBwZW5kQ2xhc3MpO1xuICAgICAgICB9LFxuICAgICAgICBvblN1Ym1pdDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tZXRob2RzLnRyaWdnZXJQcm9jZXNzaW5nLmNhbGwodGhpcywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmVscy4kc2VhcmNoUmVzdWx0c0NvbnRhaW5lci5lbXB0eSgpO1xuICAgICAgICAgICAgdmFyIGRhdGE6e3NlYXJjaD86c3RyaW5nLCBzZWFyY2hfdHlwZT86c3RyaW5nfSA9IGdldEZvcm1EYXRhKHRoaXMuZWxzLiRmb3JtKTtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSB0aGlzLm1ldGhvZHMudmFsaWRhdGVTZWFyY2guY2FsbCh0aGlzLCBkYXRhKTtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCFlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gaXMgdmFsaWRcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogcG0ucmVzdEJhc2UgKyAnc2VhcmNoL2FsbCcsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaDogZGF0YS5zZWFyY2gsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBkYXRhLnNlYXJjaF90eXBlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoIHhociApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCAnWC1XUC1Ob25jZScsIHBtLndwX25vbmNlICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1ldGhvZHMucmVzdWx0c0xvYWRlZC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZTpDRFJlc3BvbnNlKTpDRFJlc3BvbnNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciAnICsgcmVzcG9uc2UucmVzdWx0LCByZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQubWV0aG9kcy50cmlnZ2VyUHJvY2Vzc2luZy5jYWxsKHRoYXQsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSW52YWxpZFxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRyaWdnZXJQcm9jZXNzaW5nOiBmdW5jdGlvbiggbG9hZGluZzpib29sZWFuLCBsb2FkZWQ6Ym9vbGVhbikge1xuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLnRvZ2dsZUNsYXNzKFxuICAgICAgICAgICAgICAgIHRoaXMub3B0cy5wcm9jZXNzaW5nLFxuICAgICAgICAgICAgICAgIGxvYWRpbmdcbiAgICAgICAgICAgICkudG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLnByb2Nlc3NlZCxcbiAgICAgICAgICAgICAgICBsb2FkZWRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmICggbG9hZGluZyApIHRoaXMuZWxzLiRiZy5yZW1vdmVDbGFzcyh0aGlzLm9wdHMubm9SZXN1bHRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsaWRhdGVTZWFyY2g6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gW107XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkYXRhLnNlYXJjaCA9PSAnJykge1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiU2VhcmNoIG11c3Qgbm90IGJlIGVtcHR5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZGF0YS5zZWFyY2ggJiYgZGF0YS5zZWFyY2gubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKFwiVGhlIHNlYXJjaCBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycyBsb25nXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgICAgICB9LFxuICAgICAgICByZXN1bHRzTG9hZGVkOiBmdW5jdGlvbiAocmVzOnN0cmluZykge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2U6Q0RSZXNwb25zZSA9IEpTT04ucGFyc2UocmVzKTtcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2UucmVzdWx0ICE9PSAyMDAgKSB0aHJvdyByZXNwb25zZTtcblxuICAgICAgICAgICAgY29uc3QgaGFzUmVzdWx0cyA9ICEhcmVzcG9uc2UuZGF0YS5yZXN1bHRzO1xuXG4gICAgICAgICAgICB0aGlzLmVscy4kYmcudG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLm5vUmVzdWx0cywgIWhhc1Jlc3VsdHNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChoYXNSZXN1bHRzICYmIHJlc3BvbnNlLmRhdGEuaHRtbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxzLiRzZWFyY2hSZXN1bHRzQ29udGFpbmVyLmh0bWwocmVzcG9uc2UuZGF0YS5odG1sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHR9XG59OyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaW5pdENvbm5lY3QoKTtcbiAgICBpbml0RkFRKCk7XG59XG5cbmZ1bmN0aW9uIGluaXRGQVEoKTpib29sZWFuIHtcbiAgICBjb25zdCAkRkFRID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0ZBUScpO1xuXG4gICAgaWYgKCEkRkFRKSByZXR1cm4gZmFsc2U7XG5cbiAgICBqUXVlcnkoJEZBUSkub24oJ2NsaWNrJywgJ2gzJywgZXZlbnQgPT4geyBqUXVlcnkoZXZlbnQudGFyZ2V0KS50b2dnbGVDbGFzcygndG9nZ2xlZCcpOyB9KVxuICAgIFxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBpbml0Q29ubmVjdCgpOmJvb2xlYW4ge1xuICAgIGNvbnN0ICRib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhZ2VDb25uZWN0Jyk7XG5cbiAgICBpZiAoISRib2R5KSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCAkbG9naW4gPSBqUXVlcnkoJy51d3AtbG9naW4tY2xhc3MnKTtcbiAgICBcbiAgICAkbG9naW4uZmluZCgnLnV3cC1sb2dpbi1mb3JtJylcbiAgICAgICAgLmF0dHIoJ2VuY3R5cGUnLCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpXG4gICAgICAgIC5hdHRyKCdhY3Rpb24nLCAnL3dwL3dwLWxvZ2luLnBocCcpO1xuXG4gICAgJGxvZ2luLmZpbmQoJyN1c2VybmFtZScpLmF0dHIoJ2lkJywgJ3VzZXJfbG9naW4nKS5hdHRyKCduYW1lJywgJ2xvZycpO1xuICAgICRsb2dpbi5maW5kKCcjcGFzc3dvcmQnKS5hdHRyKCdpZCcsICd1c2VyX3Bhc3MnKS5hdHRyKCduYW1lJywgJ3B3ZCcpO1xuXG4gICAgY29uc3QgJG5hdkxpbmtzID0galF1ZXJ5KCcubmF2LWxpbmsnKTtcbiAgICBqUXVlcnkoJGJvZHkpLm9uKCdjbGljaycsICcubmF2LWxpbmsnLCBldmVudCA9PiB7XG4gICAgICAgICRuYXZMaW5rcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGpRdWVyeShldmVudC50YXJnZXQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0cnVlO1xufSIsImNvbnN0IG9uU3VibWl0ID0gKHRva2VuOnN0cmluZykgPT4ge1xuXHQkKCcudXdwLXJlZ2lzdHJhdGlvbi1mb3JtJylbMF0ub25zdWJtaXQobmV3IEV2ZW50KCdzdWJtaXQnKSk7XG59XG5cbmNvbnN0IHJlZ2lzdHJhdGlvbiA9ICgpID0+IHtcblx0dmFyICRidXR0b24gPSAkKCcudXdwX3JlZ2lzdGVyX3N1Ym1pdCcpO1xuXG5cdCRidXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZTpFdmVudCkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRncmVjYXB0Y2hhLmV4ZWN1dGUocG0ucmVjYXB0Y2hhLmtleV92Mywge2FjdGlvbjogJ3N1Ym1pdCd9KVxuXHRcdFx0LnRoZW4ob25TdWJtaXQpO1xuXHR9KTtcblxuXHR2YXIgY2FwdGNoYUNvbnRhaW5lciA9IG51bGw7XG4gICAgdmFyIGxvYWRDYXB0Y2hhID0gZnVuY3Rpb24oKSB7XG4gICAgICBjYXB0Y2hhQ29udGFpbmVyID0gZ3JlY2FwdGNoYS5yZW5kZXIoJ2NhcHRjaGFfY29udGFpbmVyJywge1xuICAgICAgICAnc2l0ZWtleScgOiBwbS5yZWNhcHRjaGEua2V5X3YyLFxuICAgICAgfSk7XG4gICAgfTtcblxuXHQkYnV0dG9uLmJlZm9yZSgnPGRpdiBpZD1cImNhcHRjaGFfY29udGFpbmVyXCI+PC9kaXY+Jylcblx0bG9hZENhcHRjaGEoKTtcbn07XG5cbmNvbnN0IGxvYWRSZWNhcHRjaGFJbnN0YW5jZXMgPSAoKSA9PiB7XG5cdGlmICgvXlxcL3JlZ2lzdHJhLy50ZXN0KGxvY2F0aW9uLnBhdGhuYW1lKSkgcmVnaXN0cmF0aW9uKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHdpbmRvdy5ncmVjYXB0Y2hhICYmIGdyZWNhcHRjaGEucmVhZHkobG9hZFJlY2FwdGNoYUluc3RhbmNlcyk7IiwiaW1wb3J0ICdAL2luZGV4LnN0eWwnO1xuaW1wb3J0IHJlQ2FwdGNoYUluaXQgZnJvbSAnVGhpcmRQYXJ0eS9SZWNhcHRjaGEvUmVjYXB0Y2hhLnRzJztcbmltcG9ydCBTZWFyY2ggZnJvbSAnQC9TZWFyY2gvaW5kZXgudHMnO1xuaW1wb3J0IGluaXRQYWdlcyBmcm9tICdAL1RlbXBsYXRlcy9QYWdlL3BhZ2UnO1xuXG4oZnVuY3Rpb24gKCQpIHtcblx0JCgoKSA9PiB7XG5cdFx0U2VhcmNoLmluaXQoalF1ZXJ5KTtcbiAgICAgICAgcmVDYXB0Y2hhSW5pdCgpO1xuICAgICAgICBpbml0UGFnZXMoKTtcblx0fSlcbn0pKGpRdWVyeSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9