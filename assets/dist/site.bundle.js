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
    initBody();
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
function initBody() {
    if (jQuery(document).height() < window.outerHeight)
        jQuery(document.body).addClass('insufficient-content');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9IZWxwZXJzL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1NlYXJjaC9pbmRleC50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9UZW1wbGF0ZXMvUGFnZS9wYWdlLnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9UaGlyZFBhcnR5L1JlY2FwdGNoYS9SZWNhcHRjaGEudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL2luZGV4LnN0eWwiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPLFNBQVMsV0FBVyxDQUFDLEtBQUs7SUFDN0IsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzdDLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUV2QixNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3JDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDUDZDO0FBRTlDLElBQUksQ0FBQyxHQUFpQixJQUFJLENBQUM7QUFFM0IsaUVBQWU7SUFDWCxJQUFJLEVBQUU7UUFDRixNQUFNLEVBQUUsQ0FBQztRQUVULFdBQVcsRUFBRSxXQUFXO1FBQ3hCLFVBQVUsRUFBRSxhQUFhO1FBQ3pCLFNBQVMsRUFBRSxZQUFZO1FBQ3ZCLFNBQVMsRUFBRSxhQUFhO0tBQzNCO0lBRUQsR0FBRyxFQUFFO1FBQ0QsT0FBTyxFQUFFLElBQUk7UUFDYixNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRSxJQUFJO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxPQUFPLEVBQUUsSUFBSTtRQUNiLHVCQUF1QixFQUFFLElBQUk7S0FDaEM7SUFDSixJQUFJLEVBQUUsVUFBUyxFQUFnQjtRQUN4QixDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1AsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPO1FBR25DLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBRWhFLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFbEUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVMsQ0FBQztZQUNqQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDWixFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUduRSxDQUFDO0lBQ0QsT0FBTyxFQUFFO1FBQ1IsWUFBWSxFQUFFO1lBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsVUFBVSxDQUFDO2dCQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckIsQ0FBQztRQUNELE9BQU8sRUFBRTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFDRCxRQUFRLEVBQUUsVUFBUyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXZELElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDekMsSUFBSSxJQUFJLEdBQXlDLDJEQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3RSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUVoQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFFaEIsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDSCxJQUFJLEVBQUUsTUFBTTtvQkFDWixHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsR0FBRyxZQUFZO29CQUMvQixJQUFJLEVBQUU7d0JBQ0YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO3dCQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7cUJBQ3pCO29CQUNELFVBQVUsRUFBRSxVQUFXLEdBQUc7d0JBQ3RCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBRSxZQUFZLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBRSxDQUFDO29CQUN0RCxDQUFDO29CQUNELFFBQVEsRUFBRSxNQUFNO2lCQUNuQixDQUFDO3FCQUNELElBQUksQ0FDRCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBRXJDLFVBQVUsUUFBbUI7b0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxPQUFPLFFBQVEsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDO3FCQUNMLElBQUksQ0FBQztvQkFDRixJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMzRCxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUFNO2FBR047UUFDTCxDQUFDO1FBQ0QsaUJBQWlCLEVBQUUsVUFBVSxPQUFlLEVBQUUsTUFBYztZQUN4RCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNwQixPQUFPLENBQ1YsQ0FBQyxXQUFXLENBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQ25CLE1BQU0sQ0FDVCxDQUFDO1lBRUYsSUFBSyxPQUFPO2dCQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFDRCxjQUFjLEVBQUUsVUFBVSxJQUFJO1lBQzFCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVoQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFO2dCQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7YUFDM0M7WUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLCtDQUErQyxDQUFDLENBQUM7YUFDaEU7WUFFRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBQ0QsYUFBYSxFQUFFLFVBQVUsR0FBVTtZQUMvQixJQUFNLFFBQVEsR0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLElBQUssUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHO2dCQUFHLE1BQU0sUUFBUSxDQUFDO1lBRTlDLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUUzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUNuQyxDQUFDO1lBRUYsSUFBSSxVQUFVLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0Q7UUFDTCxDQUFDO0tBQ1A7Q0FDRCxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN4SWEsU0FBUyxJQUFJO0lBQ3hCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLE9BQU87SUFDWixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTVDLElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGVBQUssSUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6RixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxXQUFXO0lBQ2hCLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFckQsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUV6QixJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1NBQ3pCLElBQUksQ0FBQyxTQUFTLEVBQUUscUJBQXFCLENBQUM7U0FDdEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBRXhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRXJFLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBSztRQUN4QyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELFNBQVMsUUFBUTtJQUViLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxXQUFXO1FBQzlDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDL0QsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDM0NELElBQU0sUUFBUSxHQUFHLFVBQUMsS0FBWTtJQUM3QixDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsSUFBTSxZQUFZLEdBQUc7SUFDcEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFFeEMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBUyxDQUFPO1FBQ25DLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNuQixVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxDQUFDO2FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLElBQUksV0FBVyxHQUFHO1FBQ2hCLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUU7WUFDeEQsU0FBUyxFQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTTtTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7SUFFTCxPQUFPLENBQUMsTUFBTSxDQUFDLG9DQUFvQyxDQUFDO0lBQ3BELFdBQVcsRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUYsSUFBTSxzQkFBc0IsR0FBRztJQUM5QixJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUFFLFlBQVksRUFBRSxDQUFDO0FBQzNELENBQUM7QUFFRCxpRUFBZSxjQUFNLGFBQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxFQUE3RCxDQUE2RCxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUI3RDtBQUN3QztBQUN2QjtBQUNPO0FBRTlDLENBQUMsVUFBVSxDQUFDO0lBQ1gsQ0FBQyxDQUFDO1FBQ0QsMERBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNkLDBFQUFhLEVBQUUsQ0FBQztRQUNoQiw2REFBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztBQ1hYOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6InNpdGUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1EYXRhKCRmb3JtKSB7XG4gICAgdmFyIHVuaW5kZXhlZF9hcnJheSA9ICRmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgdmFyIGluZGV4ZWRfYXJyYXkgPSB7fTtcblxuICAgIGpRdWVyeS5tYXAodW5pbmRleGVkX2FycmF5LCBmdW5jdGlvbihuLCBpKXtcbiAgICAgICAgaW5kZXhlZF9hcnJheVtuWyduYW1lJ11dID0gblsndmFsdWUnXTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbmRleGVkX2FycmF5O1xufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9fdHlwZXMvbWFpbi5kLnRzXCIgLz5cblxuaW1wb3J0IHsgZ2V0Rm9ybURhdGEgfSBmcm9tICdAL0hlbHBlcnMvaW5kZXgnO1xuXG5sZXQgJDp0eXBlb2YgalF1ZXJ5ID0gbnVsbDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG9wdHM6IHtcbiAgICAgICAgaW5pdGVkOiAwLFxuICAgICAgICAvLyBDbGFzcyBuYW1lc1xuICAgICAgICBhcHBlbmRDbGFzczogJ19hcHBlbmRlZCcsIC8vIFNlYXJjaCBhY3RpdmVcbiAgICAgICAgcHJvY2Vzc2luZzogJ19wcm9jZXNzaW5nJywgLy8gbG9hZGluZyBjbGFzc1xuICAgICAgICBwcm9jZXNzZWQ6ICdfcHJvY2Vzc2VkJywgLy8gU2VhcmNoIGxvYWRlZFxuICAgICAgICBub1Jlc3VsdHM6ICdfbm8tcmVzdWx0cycsXG4gICAgfSxcbiAgICAvLyBlbGVtZW50c1xuICAgIGVsczoge1xuICAgICAgICAkc2VhcmNoOiBudWxsLFxuICAgICAgICAkaW5wdXQ6IG51bGwsXG4gICAgICAgICRmb3JtOiBudWxsLCAvLyB0aGUgZm9ybSBpbiB0aGUgb3ZlcmxheVxuICAgICAgICAkYmc6IG51bGwsXG4gICAgICAgICRiZ1Nsb3Q6IG51bGwsXG4gICAgICAgICRzZWFyY2hSZXN1bHRzQ29udGFpbmVyOiBudWxsLFxuICAgIH0sXG5cdGluaXQ6IGZ1bmN0aW9uKF8kOnR5cGVvZiBqUXVlcnkpIHtcbiAgICAgICAgJCA9IF8kO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmluaXRlZCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgLy8gc28gYXMgbm90IHRvIHJlIGNhbGxcblx0XHR0aGlzLm9wdHMuaW5pdGVkID0gMTtcblxuICAgICAgICB0aGlzLmVscy4kc2VhcmNoID0gJCgnI3NlYXJjaEJveCcpO1xuICAgICAgICB0aGlzLmVscy4kaW5wdXQgPSB0aGlzLmVscy4kc2VhcmNoLmZpbmQoJy5zZWFyY2gtaW5wdXQnKTtcbiAgICAgICAgdmFyICRiZyA9IHRoaXMuZWxzLiRiZyA9ICQoJyNzZWFyY2hPdmVybGF5Jyk7XG5cbiAgICAgICAgdGhpcy5lbHMuJGZvcm0gPSB0aGlzLmVscy4kYmcuZmluZCgnZm9ybScpO1xuICAgICAgICB0aGlzLmVscy4kaW5uZXJJbnB1dCA9IHRoaXMuZWxzLiRiZy5maW5kKCcuc2VhcmNoLWlucHV0Jyk7XG4gICAgICAgIHRoaXMuZWxzLiRzZWFyY2hSZXN1bHRzQ29udGFpbmVyID0gJCgnI3NlYXJjaFJlc3VsdHNDb250YWluZXInKTtcblxuICAgICAgICAkYmcuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIHRoaXMuZWxzLiRpbnB1dC5vbignZm9jdXMnLCB0aGlzLm1ldGhvZHMubG9hZEJhY2tkcm9wLmJpbmQodGhpcykpO1xuXG4gICAgICAgICRiZy5vbignY2xpY2snLCAnLmNsaWNrLXRyYXAnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQgPT0gZS5jdXJyZW50VGFyZ2V0ICYmIHRoaXMubWV0aG9kcy5vbkNsb3NlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgICAgICAub24oJ3N1Ym1pdCcsICdmb3JtJywgdGhpcy5tZXRob2RzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXG5cdFx0XG5cdH0sXG5cdG1ldGhvZHM6IHtcblx0XHRsb2FkQmFja2Ryb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy5hZGRDbGFzcyh0aGlzLm9wdHMuYXBwZW5kQ2xhc3MpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJGlubmVySW5wdXRbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5hcHBlbmRDbGFzcyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMudHJpZ2dlclByb2Nlc3NpbmcuY2FsbCh0aGlzLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZWxzLiRzZWFyY2hSZXN1bHRzQ29udGFpbmVyLmVtcHR5KCk7XG4gICAgICAgICAgICB2YXIgZGF0YTp7c2VhcmNoPzpzdHJpbmcsIHNlYXJjaF90eXBlPzpzdHJpbmd9ID0gZ2V0Rm9ybURhdGEodGhpcy5lbHMuJGZvcm0pO1xuICAgICAgICAgICAgdmFyIGVycm9ycyA9IHRoaXMubWV0aG9kcy52YWxpZGF0ZVNlYXJjaC5jYWxsKHRoaXMsIGRhdGEpO1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoIWVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBwbS5yZXN0QmFzZSArICdzZWFyY2gvYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiBkYXRhLnNlYXJjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGRhdGEuc2VhcmNoX3R5cGUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICggeGhyICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoICdYLVdQLU5vbmNlJywgcG0ud3Bfbm9uY2UgKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWV0aG9kcy5yZXN1bHRzTG9hZGVkLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlOkNEUmVzcG9uc2UpOkNEUmVzcG9uc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yICcgKyByZXNwb25zZS5yZXN1bHQsIHJlc3BvbnNlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tZXRob2RzLnRyaWdnZXJQcm9jZXNzaW5nLmNhbGwodGhhdCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJbnZhbGlkXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJpZ2dlclByb2Nlc3Npbmc6IGZ1bmN0aW9uKCBsb2FkaW5nOmJvb2xlYW4sIGxvYWRlZDpib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLmVscy4kYmcudG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLnByb2Nlc3NpbmcsXG4gICAgICAgICAgICAgICAgbG9hZGluZ1xuICAgICAgICAgICAgKS50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMucHJvY2Vzc2VkLFxuICAgICAgICAgICAgICAgIGxvYWRlZFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKCBsb2FkaW5nICkgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5ub1Jlc3VsdHMpO1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0ZVNlYXJjaDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRhdGEuc2VhcmNoID09ICcnKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJTZWFyY2ggbXVzdCBub3QgYmUgZW1wdHlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkYXRhLnNlYXJjaCAmJiBkYXRhLnNlYXJjaC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJUaGUgc2VhcmNoIG11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzIGxvbmdcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc3VsdHNMb2FkZWQ6IGZ1bmN0aW9uIChyZXM6c3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZTpDRFJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5yZXN1bHQgIT09IDIwMCApIHRocm93IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICBjb25zdCBoYXNSZXN1bHRzID0gISFyZXNwb25zZS5kYXRhLnJlc3VsdHM7XG5cbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMubm9SZXN1bHRzLCAhaGFzUmVzdWx0c1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGhhc1Jlc3VsdHMgJiYgcmVzcG9uc2UuZGF0YS5odG1sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaFJlc3VsdHNDb250YWluZXIuaHRtbChyZXNwb25zZS5kYXRhLmh0bWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cbn07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpbml0Q29ubmVjdCgpO1xuICAgIGluaXRGQVEoKTtcbiAgICBpbml0Qm9keSgpO1xufVxuXG5mdW5jdGlvbiBpbml0RkFRKCk6Ym9vbGVhbiB7XG4gICAgY29uc3QgJEZBUSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdGQVEnKTtcblxuICAgIGlmICghJEZBUSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgalF1ZXJ5KCRGQVEpLm9uKCdjbGljaycsICdoMycsIGV2ZW50ID0+IHsgalF1ZXJ5KGV2ZW50LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ3RvZ2dsZWQnKTsgfSlcbiAgICBcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaW5pdENvbm5lY3QoKTpib29sZWFuIHtcbiAgICBjb25zdCAkYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlQ29ubmVjdCcpO1xuXG4gICAgaWYgKCEkYm9keSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgJGxvZ2luID0galF1ZXJ5KCcudXdwLWxvZ2luLWNsYXNzJyk7XG4gICAgXG4gICAgJGxvZ2luLmZpbmQoJy51d3AtbG9naW4tZm9ybScpXG4gICAgICAgIC5hdHRyKCdlbmN0eXBlJywgJ211bHRpcGFydC9mb3JtLWRhdGEnKVxuICAgICAgICAuYXR0cignYWN0aW9uJywgJy93cC93cC1sb2dpbi5waHAnKTtcblxuICAgICRsb2dpbi5maW5kKCcjdXNlcm5hbWUnKS5hdHRyKCdpZCcsICd1c2VyX2xvZ2luJykuYXR0cignbmFtZScsICdsb2cnKTtcbiAgICAkbG9naW4uZmluZCgnI3Bhc3N3b3JkJykuYXR0cignaWQnLCAndXNlcl9wYXNzJykuYXR0cignbmFtZScsICdwd2QnKTtcblxuICAgIGNvbnN0ICRuYXZMaW5rcyA9IGpRdWVyeSgnLm5hdi1saW5rJyk7XG4gICAgalF1ZXJ5KCRib2R5KS5vbignY2xpY2snLCAnLm5hdi1saW5rJywgZXZlbnQgPT4ge1xuICAgICAgICAkbmF2TGlua3MucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBqUXVlcnkoZXZlbnQudGFyZ2V0KS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaW5pdEJvZHkoKSB7XG4gICAgLy8gSWYgc2hvcnQgc2NyZWVuLCBhZGQgY2xhc3MgdG8gbWFrZSBmb290ZXIgc3RpY2sgdG8gYm90dG9tXG4gICAgaWYgKGpRdWVyeShkb2N1bWVudCkuaGVpZ2h0KCkgPCB3aW5kb3cub3V0ZXJIZWlnaHQpXG4gICAgICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hZGRDbGFzcygnaW5zdWZmaWNpZW50LWNvbnRlbnQnKTtcbn0iLCJjb25zdCBvblN1Ym1pdCA9ICh0b2tlbjpzdHJpbmcpID0+IHtcblx0JCgnLnV3cC1yZWdpc3RyYXRpb24tZm9ybScpWzBdLm9uc3VibWl0KG5ldyBFdmVudCgnc3VibWl0JykpO1xufVxuXG5jb25zdCByZWdpc3RyYXRpb24gPSAoKSA9PiB7XG5cdHZhciAkYnV0dG9uID0gJCgnLnV3cF9yZWdpc3Rlcl9zdWJtaXQnKTtcblxuXHQkYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGU6RXZlbnQpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Z3JlY2FwdGNoYS5leGVjdXRlKHBtLnJlY2FwdGNoYS5rZXlfdjMsIHthY3Rpb246ICdzdWJtaXQnfSlcblx0XHRcdC50aGVuKG9uU3VibWl0KTtcblx0fSk7XG5cblx0dmFyIGNhcHRjaGFDb250YWluZXIgPSBudWxsO1xuICAgIHZhciBsb2FkQ2FwdGNoYSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2FwdGNoYUNvbnRhaW5lciA9IGdyZWNhcHRjaGEucmVuZGVyKCdjYXB0Y2hhX2NvbnRhaW5lcicsIHtcbiAgICAgICAgJ3NpdGVrZXknIDogcG0ucmVjYXB0Y2hhLmtleV92MixcbiAgICAgIH0pO1xuICAgIH07XG5cblx0JGJ1dHRvbi5iZWZvcmUoJzxkaXYgaWQ9XCJjYXB0Y2hhX2NvbnRhaW5lclwiPjwvZGl2PicpXG5cdGxvYWRDYXB0Y2hhKCk7XG59O1xuXG5jb25zdCBsb2FkUmVjYXB0Y2hhSW5zdGFuY2VzID0gKCkgPT4ge1xuXHRpZiAoL15cXC9yZWdpc3RyYS8udGVzdChsb2NhdGlvbi5wYXRobmFtZSkpIHJlZ2lzdHJhdGlvbigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB3aW5kb3cuZ3JlY2FwdGNoYSAmJiBncmVjYXB0Y2hhLnJlYWR5KGxvYWRSZWNhcHRjaGFJbnN0YW5jZXMpOyIsImltcG9ydCAnQC9pbmRleC5zdHlsJztcbmltcG9ydCByZUNhcHRjaGFJbml0IGZyb20gJ1RoaXJkUGFydHkvUmVjYXB0Y2hhL1JlY2FwdGNoYS50cyc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJ0AvU2VhcmNoL2luZGV4LnRzJztcbmltcG9ydCBpbml0UGFnZXMgZnJvbSAnQC9UZW1wbGF0ZXMvUGFnZS9wYWdlJztcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoKCkgPT4ge1xuXHRcdFNlYXJjaC5pbml0KGpRdWVyeSk7XG4gICAgICAgIHJlQ2FwdGNoYUluaXQoKTtcbiAgICAgICAgaW5pdFBhZ2VzKCk7XG5cdH0pXG59KShqUXVlcnkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==