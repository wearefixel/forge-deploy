/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ForgeDeploy.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ForgeDeploy.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    environments: {
      type: Array,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      last: {},
      loadingCommits: true,
      commits: [],
      selectedCommit: null,
      total: 0,
      page: 0
    };
  },
  created: function created() {
    this.getLast();
    this.getCommits();
  },
  watch: {
    page: function page() {
      this.getCommits();
    }
  },
  methods: {
    getLast: function getLast() {
      var _this = this;
      this.$axios.get(cp_url("fixel/forge-deploy/last")).then(function (response) {
        _this.last = response.data;
      });
    },
    getCommits: function getCommits() {
      var _this2 = this;
      this.loadingCommits = true;
      this.$axios.get(cp_url("fixel/forge-deploy/commits?page=" + this.page)).then(function (response) {
        _this2.loadingCommits = false;
        _this2.commits = response.data.commits;
        _this2.total = response.data.total;
      });
    },
    selectCommit: function selectCommit(hash) {
      var _this3 = this;
      if (this.selectedCommit && this.selectedCommit.hash === hash) {
        this.selectedCommit = null;
        return;
      }
      this.selectedCommit = null;
      this.$axios.get(cp_url("fixel/forge-deploy/commits/" + hash)).then(function (response) {
        _this3.selectedCommit = {
          hash: hash,
          changes: response.data
        };
      });
    },
    deploy: function deploy(environment, hash) {
      var _this4 = this;
      if (!confirm("Are you sure you want to deploy to ".concat(environment, "?"))) {
        return;
      }
      this.$axios.post(cp_url("fixel/forge-deploy/deploy/".concat(environment, "/").concat(hash)))["catch"](function (error) {
        _this4.$toast.error(error.response.data.message);
      }).then(function (response) {
        _this4.$toast.success(response.data.message);
        _this4.getLast();
      });
    },
    prev: function prev() {
      this.page = Math.max(0, this.page - 1);
    },
    next: function next() {
      this.page = Math.min(this.maxPages, this.page + 1);
    }
  },
  computed: {
    maxPages: function maxPages() {
      return Math.floor(this.total / this.perPage);
    }
  }
});

/***/ }),

/***/ "./resources/js/components/ForgeDeploy.vue":
/*!*************************************************!*\
  !*** ./resources/js/components/ForgeDeploy.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ForgeDeploy_vue_vue_type_template_id_c2bf99da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ForgeDeploy.vue?vue&type=template&id=c2bf99da& */ "./resources/js/components/ForgeDeploy.vue?vue&type=template&id=c2bf99da&");
/* harmony import */ var _ForgeDeploy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForgeDeploy.vue?vue&type=script&lang=js& */ "./resources/js/components/ForgeDeploy.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ForgeDeploy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ForgeDeploy_vue_vue_type_template_id_c2bf99da___WEBPACK_IMPORTED_MODULE_0__.render,
  _ForgeDeploy_vue_vue_type_template_id_c2bf99da___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ForgeDeploy.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/ForgeDeploy.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/components/ForgeDeploy.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgeDeploy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ForgeDeploy.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ForgeDeploy.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgeDeploy_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ForgeDeploy.vue?vue&type=template&id=c2bf99da&":
/*!********************************************************************************!*\
  !*** ./resources/js/components/ForgeDeploy.vue?vue&type=template&id=c2bf99da& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgeDeploy_vue_vue_type_template_id_c2bf99da___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgeDeploy_vue_vue_type_template_id_c2bf99da___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgeDeploy_vue_vue_type_template_id_c2bf99da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ForgeDeploy.vue?vue&type=template&id=c2bf99da& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ForgeDeploy.vue?vue&type=template&id=c2bf99da&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ForgeDeploy.vue?vue&type=template&id=c2bf99da&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/ForgeDeploy.vue?vue&type=template&id=c2bf99da& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "text-sm" }, [
    _c("div", { staticClass: "border-b pb-2 -mx-2 px-2" }, [
      _c("h2", [_vm._v("Last Deployment")]),
      _vm._v(" "),
      _c(
        "ul",
        _vm._l(_vm.last, function (env, key) {
          return _c("li", { key: key, staticClass: "mt-1" }, [
            _c("strong", { staticClass: "titlecase" }, [
              _vm._v(_vm._s(key) + ":"),
            ]),
            _vm._v(" "),
            _c("code", [_vm._v(_vm._s(env ? env.hash.slice(0, 7) : "n/a"))]),
            _vm._v(" "),
            env
              ? _c("span", [
                  _vm._v(_vm._s(new Date(env.time * 1000).toLocaleString())),
                ])
              : _vm._e(),
          ])
        }),
        0
      ),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "-mx-2 px-2" }, [
      _vm.loadingCommits
        ? _c(
            "div",
            { staticClass: "text-center pt-4 pb-2" },
            [_c("loading-graphic")],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.commits.length && !_vm.loadingCommits
        ? _c(
            "ul",
            { staticClass: "divide-y" },
            _vm._l(_vm.commits, function (commit) {
              return _c("li", { key: commit.shortHash, staticClass: "py-2" }, [
                _c(
                  "button",
                  {
                    staticClass:
                      "w-full hover:text-blue duration-100 text-left space-x-1",
                    staticStyle: { outline: "none !important" },
                    attrs: { type: "button" },
                    on: {
                      click: function ($event) {
                        return _vm.selectCommit(commit.hash)
                      },
                    },
                  },
                  [
                    _c("code", { attrs: { title: commit.hash } }, [
                      _vm._v(_vm._s(commit.shortHash)),
                    ]),
                    _vm._v(" "),
                    _c("strong", [_vm._v(_vm._s(commit.author))]),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(commit.message))]),
                  ]
                ),
                _vm._v(" "),
                _vm.selectedCommit && _vm.selectedCommit.hash === commit.hash
                  ? _c("div", { staticClass: "mt-2 space-y-2" }, [
                      _c(
                        "ul",
                        {
                          staticClass:
                            "p-2 rounded text-sm font-mono bg-grey-30 text-grey-70 overflow-auto",
                          staticStyle: { "white-space": "nowrap" },
                        },
                        _vm._l(_vm.selectedCommit.changes, function (change) {
                          return _c("li", { key: change.name }, [
                            _c("code", [
                              _vm._v(_vm._s(change.status.toUpperCase())),
                            ]),
                            _vm._v(
                              " " + _vm._s(change.name) + "\n            "
                            ),
                          ])
                        }),
                        0
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "flex gap-1" },
                        _vm._l(_vm.environments, function (env) {
                          return _c(
                            "button",
                            {
                              key: env,
                              staticClass: "btn",
                              attrs: { type: "submit" },
                              on: {
                                click: function ($event) {
                                  return _vm.deploy(env, commit.hash)
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n              Deploy to " +
                                  _vm._s(env) +
                                  "\n            "
                              ),
                            ]
                          )
                        }),
                        0
                      ),
                    ])
                  : _vm._e(),
              ])
            }),
            0
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.loadingCommits
        ? _c("div", { staticClass: "flex justify-between items-center mt-2" }, [
            _c(
              "button",
              {
                staticClass: "btn",
                attrs: { type: "button", disabled: _vm.page === 0 },
                on: { click: _vm.prev },
              },
              [_vm._v("\n        Prev\n      ")]
            ),
            _vm._v(" "),
            _c("span", [
              _vm._v(
                "Page " +
                  _vm._s(_vm.page + 1) +
                  " of " +
                  _vm._s(_vm.maxPages + 1)
              ),
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn",
                attrs: { type: "button", disabled: _vm.page >= _vm.maxPages },
                on: { click: _vm.next },
              },
              [_vm._v("\n        Next\n      ")]
            ),
          ])
        : _vm._e(),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./resources/js/cp.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_ForgeDeploy_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ForgeDeploy.vue */ "./resources/js/components/ForgeDeploy.vue");

Statamic.booting(function () {
  Statamic.$components.register('forge-deploy', _components_ForgeDeploy_vue__WEBPACK_IMPORTED_MODULE_0__["default"]);
});
})();

/******/ })()
;