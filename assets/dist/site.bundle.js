/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Modules/CommunityDirectory/index.ts":
/*!*************************************************!*\
  !*** ./src/Modules/CommunityDirectory/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommunityDirectory_Profile_index_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/CommunityDirectory/Profile/index.styl */ "./src/Modules/CommunityDirectory/Profile/index.styl");
/* harmony import */ var _CommunityDirectory_OffersNeeds_index_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/CommunityDirectory/OffersNeeds/index.styl */ "./src/Modules/CommunityDirectory/OffersNeeds/index.styl");
/* harmony import */ var _CommunityDirectory_Location_location_list_styl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/CommunityDirectory/Location/location-list.styl */ "./src/Modules/CommunityDirectory/Location/location-list.styl");


/***/ }),

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
/* harmony import */ var _index_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.styl */ "./src/Modules/Search/index.styl");
/* harmony import */ var _Helpers_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Helpers/index */ "./src/Modules/Helpers/index.ts");


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
        $resultsContainer: null,
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
            var data = (0,_Helpers_index__WEBPACK_IMPORTED_MODULE_1__.getFormData)(this.els.$form);
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

/***/ "./src/Modules/Templates/index.ts":
/*!****************************************!*\
  !*** ./src/Modules/Templates/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Page_index_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page/index.styl */ "./src/Modules/Templates/Page/index.styl");
/* harmony import */ var _Registration_index_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Registration/index.styl */ "./src/Modules/Templates/Registration/index.styl");




/***/ }),

/***/ "./src/Modules/index.ts":
/*!******************************!*\
  !*** ./src/Modules/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Global_index_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Global/index.styl */ "./src/Modules/Global/index.styl");
/* harmony import */ var _Global_header_styl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Global/header.styl */ "./src/Modules/Global/header.styl");
/* harmony import */ var _Global_nav_styl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Global/nav.styl */ "./src/Modules/Global/nav.styl");
/* harmony import */ var _Global_grid_styl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Global/grid.styl */ "./src/Modules/Global/grid.styl");
/* harmony import */ var _CommunityDirectory_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/CommunityDirectory/index */ "./src/Modules/CommunityDirectory/index.ts");
/* harmony import */ var _Templates_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Templates/index */ "./src/Modules/Templates/index.ts");
/* harmony import */ var ThirdParty_Recaptcha_Recaptcha_styl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ThirdParty/Recaptcha/Recaptcha.styl */ "./src/ThirdParty/Recaptcha/Recaptcha.styl");









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
    $('.uwp-registration-form')[0].onsubmit();
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
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/index */ "./src/Modules/index.ts");
/* harmony import */ var ThirdParty_Recaptcha_Recaptcha_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ThirdParty/Recaptcha/Recaptcha.ts */ "./src/ThirdParty/Recaptcha/Recaptcha.ts");
/* harmony import */ var _Search_index_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Search/index.ts */ "./src/Modules/Search/index.ts");



(function ($) {
    $(document).ready(function () {
        _Search_index_ts__WEBPACK_IMPORTED_MODULE_2__.default.init(jQuery);
        (0,ThirdParty_Recaptcha_Recaptcha_ts__WEBPACK_IMPORTED_MODULE_1__.default)();
    });
})(jQuery);


/***/ }),

/***/ "./src/Modules/CommunityDirectory/Location/location-list.styl":
/*!********************************************************************!*\
  !*** ./src/Modules/CommunityDirectory/Location/location-list.styl ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/CommunityDirectory/OffersNeeds/index.styl":
/*!***************************************************************!*\
  !*** ./src/Modules/CommunityDirectory/OffersNeeds/index.styl ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/CommunityDirectory/Profile/index.styl":
/*!***********************************************************!*\
  !*** ./src/Modules/CommunityDirectory/Profile/index.styl ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/Global/grid.styl":
/*!**************************************!*\
  !*** ./src/Modules/Global/grid.styl ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/Global/header.styl":
/*!****************************************!*\
  !*** ./src/Modules/Global/header.styl ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/Global/index.styl":
/*!***************************************!*\
  !*** ./src/Modules/Global/index.styl ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/Global/nav.styl":
/*!*************************************!*\
  !*** ./src/Modules/Global/nav.styl ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/Search/index.styl":
/*!***************************************!*\
  !*** ./src/Modules/Search/index.styl ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/Templates/Page/index.styl":
/*!***********************************************!*\
  !*** ./src/Modules/Templates/Page/index.styl ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/Templates/Registration/index.styl":
/*!*******************************************************!*\
  !*** ./src/Modules/Templates/Registration/index.styl ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/ThirdParty/Recaptcha/Recaptcha.styl":
/*!*************************************************!*\
  !*** ./src/ThirdParty/Recaptcha/Recaptcha.styl ***!
  \*************************************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9Db21tdW5pdHlEaXJlY3RvcnkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL01vZHVsZXMvSGVscGVycy9pbmRleC50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9TZWFyY2gvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL01vZHVsZXMvVGVtcGxhdGVzL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9UaGlyZFBhcnR5L1JlY2FwdGNoYS9SZWNhcHRjaGEudHMiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL0NvbW11bml0eURpcmVjdG9yeS9Mb2NhdGlvbi9sb2NhdGlvbi1saXN0LnN0eWwiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL01vZHVsZXMvQ29tbXVuaXR5RGlyZWN0b3J5L09mZmVyc05lZWRzL2luZGV4LnN0eWwiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL01vZHVsZXMvQ29tbXVuaXR5RGlyZWN0b3J5L1Byb2ZpbGUvaW5kZXguc3R5bCIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9HbG9iYWwvZ3JpZC5zdHlsIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL0dsb2JhbC9oZWFkZXIuc3R5bCIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9HbG9iYWwvaW5kZXguc3R5bCIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9HbG9iYWwvbmF2LnN0eWwiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL01vZHVsZXMvU2VhcmNoL2luZGV4LnN0eWwiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL01vZHVsZXMvVGVtcGxhdGVzL1BhZ2UvaW5kZXguc3R5bCIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9UZW1wbGF0ZXMvUmVnaXN0cmF0aW9uL2luZGV4LnN0eWwiLCJ3ZWJwYWNrOi8vUHJpZU11c2VzLVRoZW1lLy4vc3JjL1RoaXJkUGFydHkvUmVjYXB0Y2hhL1JlY2FwdGNoYS5zdHlsIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBaUQ7QUFDSTtBQUNLOzs7Ozs7Ozs7Ozs7Ozs7QUNGbkQsU0FBUyxXQUFXLENBQUMsS0FBSztJQUM3QixJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDN0MsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBRXZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVMsQ0FBQyxFQUFFLENBQUM7UUFDckMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxDQUFD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O1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJzaXRlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnQC9Db21tdW5pdHlEaXJlY3RvcnkvUHJvZmlsZS9pbmRleC5zdHlsJztcbmltcG9ydCAnQC9Db21tdW5pdHlEaXJlY3RvcnkvT2ZmZXJzTmVlZHMvaW5kZXguc3R5bCc7XG5pbXBvcnQgJ0AvQ29tbXVuaXR5RGlyZWN0b3J5L0xvY2F0aW9uL2xvY2F0aW9uLWxpc3Quc3R5bCc7IiwiZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1EYXRhKCRmb3JtKSB7XG4gICAgdmFyIHVuaW5kZXhlZF9hcnJheSA9ICRmb3JtLnNlcmlhbGl6ZUFycmF5KCk7XG4gICAgdmFyIGluZGV4ZWRfYXJyYXkgPSB7fTtcblxuICAgIGpRdWVyeS5tYXAodW5pbmRleGVkX2FycmF5LCBmdW5jdGlvbihuLCBpKXtcbiAgICAgICAgaW5kZXhlZF9hcnJheVtuWyduYW1lJ11dID0gblsndmFsdWUnXTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbmRleGVkX2FycmF5O1xufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9fdHlwZXMvbWFpbi5kLnRzXCIgLz5cblxuaW1wb3J0ICcuL2luZGV4LnN0eWwnO1xuaW1wb3J0IHsgZ2V0Rm9ybURhdGEgfSBmcm9tICdAL0hlbHBlcnMvaW5kZXgnO1xuXG5sZXQgJDp0eXBlb2YgalF1ZXJ5ID0gbnVsbDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG9wdHM6IHtcbiAgICAgICAgaW5pdGVkOiAwLFxuICAgICAgICAvLyBDbGFzcyBuYW1lc1xuICAgICAgICBhcHBlbmRDbGFzczogJ19hcHBlbmRlZCcsIC8vIFNlYXJjaCBhY3RpdmVcbiAgICAgICAgcHJvY2Vzc2luZzogJ19wcm9jZXNzaW5nJywgLy8gbG9hZGluZyBjbGFzc1xuICAgICAgICBwcm9jZXNzZWQ6ICdfcHJvY2Vzc2VkJywgLy8gU2VhcmNoIGxvYWRlZFxuICAgICAgICBub1Jlc3VsdHM6ICdfbm8tcmVzdWx0cycsXG4gICAgfSxcbiAgICAvLyBlbGVtZW50c1xuICAgIGVsczoge1xuICAgICAgICAkc2VhcmNoOiBudWxsLFxuICAgICAgICAkaW5wdXQ6IG51bGwsXG4gICAgICAgICRmb3JtOiBudWxsLCAvLyB0aGUgZm9ybSBpbiB0aGUgb3ZlcmxheVxuICAgICAgICAkYmc6IG51bGwsXG4gICAgICAgICRiZ1Nsb3Q6IG51bGwsXG4gICAgICAgICRyZXN1bHRzQ29udGFpbmVyOiBudWxsLFxuICAgIH0sXG5cdGluaXQ6IGZ1bmN0aW9uKF8kOnR5cGVvZiBqUXVlcnkpIHtcbiAgICAgICAgJCA9IF8kO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmluaXRlZCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgLy8gc28gYXMgbm90IHRvIHJlIGNhbGxcblx0XHR0aGlzLm9wdHMuaW5pdGVkID0gMTtcblxuICAgICAgICB0aGlzLmVscy4kc2VhcmNoID0gJCgnI3NlYXJjaEJveCcpO1xuICAgICAgICB0aGlzLmVscy4kaW5wdXQgPSB0aGlzLmVscy4kc2VhcmNoLmZpbmQoJy5zZWFyY2gtaW5wdXQnKTtcbiAgICAgICAgdmFyICRiZyA9IHRoaXMuZWxzLiRiZyA9ICQoJyNzZWFyY2hPdmVybGF5Jyk7XG5cbiAgICAgICAgdGhpcy5lbHMuJGZvcm0gPSB0aGlzLmVscy4kYmcuZmluZCgnZm9ybScpO1xuICAgICAgICB0aGlzLmVscy4kaW5uZXJJbnB1dCA9IHRoaXMuZWxzLiRiZy5maW5kKCcuc2VhcmNoLWlucHV0Jyk7XG4gICAgICAgIHRoaXMuZWxzLiRzZWFyY2hSZXN1bHRzQ29udGFpbmVyID0gJCgnI3NlYXJjaFJlc3VsdHNDb250YWluZXInKTtcblxuICAgICAgICAkYmcuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIHRoaXMuZWxzLiRpbnB1dC5vbignZm9jdXMnLCB0aGlzLm1ldGhvZHMubG9hZEJhY2tkcm9wLmJpbmQodGhpcykpO1xuXG4gICAgICAgICRiZy5vbignY2xpY2snLCAnLmNsaWNrLXRyYXAnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQgPT0gZS5jdXJyZW50VGFyZ2V0ICYmIHRoaXMubWV0aG9kcy5vbkNsb3NlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgICAgICAub24oJ3N1Ym1pdCcsICdmb3JtJywgdGhpcy5tZXRob2RzLm9uU3VibWl0LmJpbmQodGhpcykpO1xuXG5cdFx0XG5cdH0sXG5cdG1ldGhvZHM6IHtcblx0XHRsb2FkQmFja2Ryb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy5hZGRDbGFzcyh0aGlzLm9wdHMuYXBwZW5kQ2xhc3MpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJGlubmVySW5wdXRbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5hcHBlbmRDbGFzcyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3VibWl0OiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1ldGhvZHMudHJpZ2dlclByb2Nlc3NpbmcuY2FsbCh0aGlzLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBkYXRhOntzZWFyY2g/OnN0cmluZywgc2VhcmNoX3R5cGU/OnN0cmluZ30gPSBnZXRGb3JtRGF0YSh0aGlzLmVscy4kZm9ybSk7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gdGhpcy5tZXRob2RzLnZhbGlkYXRlU2VhcmNoLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICghZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHBtLnJlc3RCYXNlICsgJ3NlYXJjaC9hbGwnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2g6IGRhdGEuc2VhcmNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZGF0YS5zZWFyY2hfdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKCB4aHIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciggJ1gtV1AtTm9uY2UnLCBwbS53cF9ub25jZSApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLnJlc3VsdHNMb2FkZWQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlOkNEUmVzcG9uc2UpOkNEUmVzcG9uc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yICcgKyByZXNwb25zZS5yZXN1bHQsIHJlc3BvbnNlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tZXRob2RzLnRyaWdnZXJQcm9jZXNzaW5nLmNhbGwodGhhdCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJbnZhbGlkXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJpZ2dlclByb2Nlc3Npbmc6IGZ1bmN0aW9uKCBsb2FkaW5nOmJvb2xlYW4sIGxvYWRlZDpib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLmVscy4kYmcudG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLnByb2Nlc3NpbmcsXG4gICAgICAgICAgICAgICAgbG9hZGluZ1xuICAgICAgICAgICAgKS50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMucHJvY2Vzc2VkLFxuICAgICAgICAgICAgICAgIGxvYWRlZFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKCBsb2FkaW5nICkgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5ub1Jlc3VsdHMpO1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0ZVNlYXJjaDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRhdGEuc2VhcmNoID09ICcnKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJTZWFyY2ggbXVzdCBub3QgYmUgZW1wdHlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkYXRhLnNlYXJjaCAmJiBkYXRhLnNlYXJjaC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJUaGUgc2VhcmNoIG11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzIGxvbmdcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc3VsdHNMb2FkZWQ6IGZ1bmN0aW9uIChyZXM6c3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZTpDRFJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5yZXN1bHQgIT09IDIwMCApIHRocm93IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICBjb25zdCBoYXNSZXN1bHRzID0gISFyZXNwb25zZS5kYXRhLnJlc3VsdHM7XG5cbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMubm9SZXN1bHRzLCAhaGFzUmVzdWx0c1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGhhc1Jlc3VsdHMgJiYgcmVzcG9uc2UuZGF0YS5odG1sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaFJlc3VsdHNDb250YWluZXIuaHRtbChyZXNwb25zZS5kYXRhLmh0bWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cbn07IiwiaW1wb3J0ICcuL1BhZ2UvaW5kZXguc3R5bCc7XG5pbXBvcnQgJy4vUmVnaXN0cmF0aW9uL2luZGV4LnN0eWwnOyIsImltcG9ydCAnQC9HbG9iYWwvaW5kZXguc3R5bCc7XG5pbXBvcnQgJ0AvR2xvYmFsL2hlYWRlci5zdHlsJztcbmltcG9ydCAnQC9HbG9iYWwvbmF2LnN0eWwnO1xuaW1wb3J0ICdAL0dsb2JhbC9ncmlkLnN0eWwnO1xuaW1wb3J0ICdAL0NvbW11bml0eURpcmVjdG9yeS9pbmRleCc7IC8vIGxvYWRzIHN0eWwgZmlsZXMgZnJvbSB0aGVyZVxuaW1wb3J0ICdAL1RlbXBsYXRlcy9pbmRleCc7IC8vIGxvYWRzIHN0eWwgZmlsZXMgZnJvbSB0aGVyZVxuaW1wb3J0ICdUaGlyZFBhcnR5L1JlY2FwdGNoYS9SZWNhcHRjaGEuc3R5bCc7IiwiY29uc3Qgb25TdWJtaXQgPSAodG9rZW46c3RyaW5nKSA9PiB7XG5cdCQoJy51d3AtcmVnaXN0cmF0aW9uLWZvcm0nKVswXS5vbnN1Ym1pdCgpO1xufVxuXG5jb25zdCByZWdpc3RyYXRpb24gPSAoKSA9PiB7XG5cdHZhciAkYnV0dG9uID0gJCgnLnV3cF9yZWdpc3Rlcl9zdWJtaXQnKTtcblxuXHQkYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGU6RXZlbnQpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Z3JlY2FwdGNoYS5leGVjdXRlKHBtLnJlY2FwdGNoYS5rZXlfdjMsIHthY3Rpb246ICdzdWJtaXQnfSlcblx0XHRcdC50aGVuKG9uU3VibWl0KTtcblx0fSk7XG5cblx0dmFyIGNhcHRjaGFDb250YWluZXIgPSBudWxsO1xuICAgIHZhciBsb2FkQ2FwdGNoYSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2FwdGNoYUNvbnRhaW5lciA9IGdyZWNhcHRjaGEucmVuZGVyKCdjYXB0Y2hhX2NvbnRhaW5lcicsIHtcbiAgICAgICAgJ3NpdGVrZXknIDogcG0ucmVjYXB0Y2hhLmtleV92MixcbiAgICAgIH0pO1xuICAgIH07XG5cblx0JGJ1dHRvbi5iZWZvcmUoJzxkaXYgaWQ9XCJjYXB0Y2hhX2NvbnRhaW5lclwiPjwvZGl2PicpXG5cdGxvYWRDYXB0Y2hhKCk7XG59O1xuXG5jb25zdCBsb2FkUmVjYXB0Y2hhSW5zdGFuY2VzID0gKCkgPT4ge1xuXHRpZiAoL15cXC9yZWdpc3RyYS8udGVzdChsb2NhdGlvbi5wYXRobmFtZSkpIHJlZ2lzdHJhdGlvbigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB3aW5kb3cuZ3JlY2FwdGNoYSAmJiBncmVjYXB0Y2hhLnJlYWR5KGxvYWRSZWNhcHRjaGFJbnN0YW5jZXMpOyIsImltcG9ydCAnQC9pbmRleCc7XG5pbXBvcnQgcmVDYXB0Y2hhSW5pdCBmcm9tICdUaGlyZFBhcnR5L1JlY2FwdGNoYS9SZWNhcHRjaGEudHMnO1xuaW1wb3J0IFNlYXJjaCBmcm9tICdAL1NlYXJjaC9pbmRleC50cyc7XG5cbihmdW5jdGlvbiAoJCkge1xuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cdFx0U2VhcmNoLmluaXQoalF1ZXJ5KTtcblx0XHRyZUNhcHRjaGFJbml0KCk7XG5cdH0pXG59KShqUXVlcnkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==