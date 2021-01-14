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
/* harmony import */ var _index_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/index.styl */ "./src/Modules/index.styl");
/* harmony import */ var ThirdParty_Recaptcha_Recaptcha_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ThirdParty/Recaptcha/Recaptcha.ts */ "./src/ThirdParty/Recaptcha/Recaptcha.ts");
/* harmony import */ var _Search_index_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Search/index.ts */ "./src/Modules/Search/index.ts");



(function ($) {
    $(document).ready(function () {
        _Search_index_ts__WEBPACK_IMPORTED_MODULE_2__.default.init(jQuery);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9IZWxwZXJzL2luZGV4LnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9Nb2R1bGVzL1NlYXJjaC9pbmRleC50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvVGhpcmRQYXJ0eS9SZWNhcHRjaGEvUmVjYXB0Y2hhLnRzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvLi9zcmMvTW9kdWxlcy9pbmRleC5zdHlsIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9QcmllTXVzZXMtVGhlbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1ByaWVNdXNlcy1UaGVtZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTyxTQUFTLFdBQVcsQ0FBQyxLQUFLO0lBQzdCLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM3QyxJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFFdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsVUFBUyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxhQUFh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QUFDLENBQUM7SUFFTCxPQUFPLENBQUMsTUFBTSxDQUFDLG9DQUFvQyxDQUFDO0lBQ3BELFdBQVcsRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUYsSUFBTSxzQkFBc0IsR0FBRztJQUM5QixJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUFFLFlBQVksRUFBRSxDQUFDO0FBQzNELENBQUM7QUFFRCxpRUFBZSxjQUFNLGFBQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxFQUE3RCxDQUE2RCxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1QjdEO0FBQ3dDO0FBQ3ZCO0FBRXZDLENBQUMsVUFBVSxDQUFDO0lBQ1gsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNqQiwwREFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLDBFQUFhLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDVFg7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHNGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7O1VDTkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoic2l0ZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybURhdGEoJGZvcm0pIHtcbiAgICB2YXIgdW5pbmRleGVkX2FycmF5ID0gJGZvcm0uc2VyaWFsaXplQXJyYXkoKTtcbiAgICB2YXIgaW5kZXhlZF9hcnJheSA9IHt9O1xuXG4gICAgalF1ZXJ5Lm1hcCh1bmluZGV4ZWRfYXJyYXksIGZ1bmN0aW9uKG4sIGkpe1xuICAgICAgICBpbmRleGVkX2FycmF5W25bJ25hbWUnXV0gPSBuWyd2YWx1ZSddO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGluZGV4ZWRfYXJyYXk7XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL190eXBlcy9tYWluLmQudHNcIiAvPlxuXG5pbXBvcnQgeyBnZXRGb3JtRGF0YSB9IGZyb20gJ0AvSGVscGVycy9pbmRleCc7XG5cbmxldCAkOnR5cGVvZiBqUXVlcnkgPSBudWxsO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgb3B0czoge1xuICAgICAgICBpbml0ZWQ6IDAsXG4gICAgICAgIC8vIENsYXNzIG5hbWVzXG4gICAgICAgIGFwcGVuZENsYXNzOiAnX2FwcGVuZGVkJywgLy8gU2VhcmNoIGFjdGl2ZVxuICAgICAgICBwcm9jZXNzaW5nOiAnX3Byb2Nlc3NpbmcnLCAvLyBsb2FkaW5nIGNsYXNzXG4gICAgICAgIHByb2Nlc3NlZDogJ19wcm9jZXNzZWQnLCAvLyBTZWFyY2ggbG9hZGVkXG4gICAgICAgIG5vUmVzdWx0czogJ19uby1yZXN1bHRzJyxcbiAgICB9LFxuICAgIC8vIGVsZW1lbnRzXG4gICAgZWxzOiB7XG4gICAgICAgICRzZWFyY2g6IG51bGwsXG4gICAgICAgICRpbnB1dDogbnVsbCxcbiAgICAgICAgJGZvcm06IG51bGwsIC8vIHRoZSBmb3JtIGluIHRoZSBvdmVybGF5XG4gICAgICAgICRiZzogbnVsbCxcbiAgICAgICAgJGJnU2xvdDogbnVsbCxcbiAgICAgICAgJHNlYXJjaFJlc3VsdHNDb250YWluZXI6IG51bGwsXG4gICAgfSxcblx0aW5pdDogZnVuY3Rpb24oXyQ6dHlwZW9mIGpRdWVyeSkge1xuICAgICAgICAkID0gXyQ7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuaW5pdGVkKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAvLyBzbyBhcyBub3QgdG8gcmUgY2FsbFxuXHRcdHRoaXMub3B0cy5pbml0ZWQgPSAxO1xuXG4gICAgICAgIHRoaXMuZWxzLiRzZWFyY2ggPSAkKCcjc2VhcmNoQm94Jyk7XG4gICAgICAgIHRoaXMuZWxzLiRpbnB1dCA9IHRoaXMuZWxzLiRzZWFyY2guZmluZCgnLnNlYXJjaC1pbnB1dCcpO1xuICAgICAgICB2YXIgJGJnID0gdGhpcy5lbHMuJGJnID0gJCgnI3NlYXJjaE92ZXJsYXknKTtcblxuICAgICAgICB0aGlzLmVscy4kZm9ybSA9IHRoaXMuZWxzLiRiZy5maW5kKCdmb3JtJyk7XG4gICAgICAgIHRoaXMuZWxzLiRpbm5lcklucHV0ID0gdGhpcy5lbHMuJGJnLmZpbmQoJy5zZWFyY2gtaW5wdXQnKTtcbiAgICAgICAgdGhpcy5lbHMuJHNlYXJjaFJlc3VsdHNDb250YWluZXIgPSAkKCcjc2VhcmNoUmVzdWx0c0NvbnRhaW5lcicpO1xuXG4gICAgICAgICRiZy5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgdGhpcy5lbHMuJGlucHV0Lm9uKCdmb2N1cycsIHRoaXMubWV0aG9kcy5sb2FkQmFja2Ryb3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgJGJnLm9uKCdjbGljaycsICcuY2xpY2stdHJhcCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldCA9PSBlLmN1cnJlbnRUYXJnZXQgJiYgdGhpcy5tZXRob2RzLm9uQ2xvc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbignc3VibWl0JywgJ2Zvcm0nLCB0aGlzLm1ldGhvZHMub25TdWJtaXQuYmluZCh0aGlzKSk7XG5cblx0XHRcblx0fSxcblx0bWV0aG9kczoge1xuXHRcdGxvYWRCYWNrZHJvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5lbHMuJGJnLmFkZENsYXNzKHRoaXMub3B0cy5hcHBlbmRDbGFzcyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVscy4kaW5uZXJJbnB1dFswXS5mb2N1cygpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmVscy4kYmcucmVtb3ZlQ2xhc3ModGhpcy5vcHRzLmFwcGVuZENsYXNzKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubWV0aG9kcy50cmlnZ2VyUHJvY2Vzc2luZy5jYWxsKHRoaXMsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaFJlc3VsdHNDb250YWluZXIuZW1wdHkoKTtcbiAgICAgICAgICAgIHZhciBkYXRhOntzZWFyY2g/OnN0cmluZywgc2VhcmNoX3R5cGU/OnN0cmluZ30gPSBnZXRGb3JtRGF0YSh0aGlzLmVscy4kZm9ybSk7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gdGhpcy5tZXRob2RzLnZhbGlkYXRlU2VhcmNoLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICghZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHBtLnJlc3RCYXNlICsgJ3NlYXJjaC9hbGwnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2g6IGRhdGEuc2VhcmNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZGF0YS5zZWFyY2hfdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKCB4aHIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlciggJ1gtV1AtTm9uY2UnLCBwbS53cF9ub25jZSApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXRob2RzLnJlc3VsdHNMb2FkZWQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlOkNEUmVzcG9uc2UpOkNEUmVzcG9uc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yICcgKyByZXNwb25zZS5yZXN1bHQsIHJlc3BvbnNlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5tZXRob2RzLnRyaWdnZXJQcm9jZXNzaW5nLmNhbGwodGhhdCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJbnZhbGlkXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHJpZ2dlclByb2Nlc3Npbmc6IGZ1bmN0aW9uKCBsb2FkaW5nOmJvb2xlYW4sIGxvYWRlZDpib29sZWFuKSB7XG4gICAgICAgICAgICB0aGlzLmVscy4kYmcudG9nZ2xlQ2xhc3MoXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRzLnByb2Nlc3NpbmcsXG4gICAgICAgICAgICAgICAgbG9hZGluZ1xuICAgICAgICAgICAgKS50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMucHJvY2Vzc2VkLFxuICAgICAgICAgICAgICAgIGxvYWRlZFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKCBsb2FkaW5nICkgdGhpcy5lbHMuJGJnLnJlbW92ZUNsYXNzKHRoaXMub3B0cy5ub1Jlc3VsdHMpO1xuICAgICAgICB9LFxuICAgICAgICB2YWxpZGF0ZVNlYXJjaDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRhdGEuc2VhcmNoID09ICcnKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJTZWFyY2ggbXVzdCBub3QgYmUgZW1wdHlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkYXRhLnNlYXJjaCAmJiBkYXRhLnNlYXJjaC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goXCJUaGUgc2VhcmNoIG11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzIGxvbmdcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICAgIH0sXG4gICAgICAgIHJlc3VsdHNMb2FkZWQ6IGZ1bmN0aW9uIChyZXM6c3RyaW5nKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZTpDRFJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXMpO1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5yZXN1bHQgIT09IDIwMCApIHRocm93IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICBjb25zdCBoYXNSZXN1bHRzID0gISFyZXNwb25zZS5kYXRhLnJlc3VsdHM7XG5cbiAgICAgICAgICAgIHRoaXMuZWxzLiRiZy50b2dnbGVDbGFzcyhcbiAgICAgICAgICAgICAgICB0aGlzLm9wdHMubm9SZXN1bHRzLCAhaGFzUmVzdWx0c1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGhhc1Jlc3VsdHMgJiYgcmVzcG9uc2UuZGF0YS5odG1sKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbHMuJHNlYXJjaFJlc3VsdHNDb250YWluZXIuaHRtbChyZXNwb25zZS5kYXRhLmh0bWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cbn07IiwiY29uc3Qgb25TdWJtaXQgPSAodG9rZW46c3RyaW5nKSA9PiB7XG5cdCQoJy51d3AtcmVnaXN0cmF0aW9uLWZvcm0nKVswXS5vbnN1Ym1pdCgpO1xufVxuXG5jb25zdCByZWdpc3RyYXRpb24gPSAoKSA9PiB7XG5cdHZhciAkYnV0dG9uID0gJCgnLnV3cF9yZWdpc3Rlcl9zdWJtaXQnKTtcblxuXHQkYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGU6RXZlbnQpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Z3JlY2FwdGNoYS5leGVjdXRlKHBtLnJlY2FwdGNoYS5rZXlfdjMsIHthY3Rpb246ICdzdWJtaXQnfSlcblx0XHRcdC50aGVuKG9uU3VibWl0KTtcblx0fSk7XG5cblx0dmFyIGNhcHRjaGFDb250YWluZXIgPSBudWxsO1xuICAgIHZhciBsb2FkQ2FwdGNoYSA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2FwdGNoYUNvbnRhaW5lciA9IGdyZWNhcHRjaGEucmVuZGVyKCdjYXB0Y2hhX2NvbnRhaW5lcicsIHtcbiAgICAgICAgJ3NpdGVrZXknIDogcG0ucmVjYXB0Y2hhLmtleV92MixcbiAgICAgIH0pO1xuICAgIH07XG5cblx0JGJ1dHRvbi5iZWZvcmUoJzxkaXYgaWQ9XCJjYXB0Y2hhX2NvbnRhaW5lclwiPjwvZGl2PicpXG5cdGxvYWRDYXB0Y2hhKCk7XG59O1xuXG5jb25zdCBsb2FkUmVjYXB0Y2hhSW5zdGFuY2VzID0gKCkgPT4ge1xuXHRpZiAoL15cXC9yZWdpc3RyYS8udGVzdChsb2NhdGlvbi5wYXRobmFtZSkpIHJlZ2lzdHJhdGlvbigpO1xufVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB3aW5kb3cuZ3JlY2FwdGNoYSAmJiBncmVjYXB0Y2hhLnJlYWR5KGxvYWRSZWNhcHRjaGFJbnN0YW5jZXMpOyIsImltcG9ydCAnQC9pbmRleC5zdHlsJztcbmltcG9ydCByZUNhcHRjaGFJbml0IGZyb20gJ1RoaXJkUGFydHkvUmVjYXB0Y2hhL1JlY2FwdGNoYS50cyc7XG5pbXBvcnQgU2VhcmNoIGZyb20gJ0AvU2VhcmNoL2luZGV4LnRzJztcblxuKGZ1bmN0aW9uICgkKSB7XG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcblx0XHRTZWFyY2guaW5pdChqUXVlcnkpO1xuXHRcdHJlQ2FwdGNoYUluaXQoKTtcblx0fSlcbn0pKGpRdWVyeSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9