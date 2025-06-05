"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/iso-url";
exports.ids = ["vendor-chunks/iso-url"];
exports.modules = {

/***/ "(ssr)/../../node_modules/iso-url/index.js":
/*!*******************************************!*\
  !*** ../../node_modules/iso-url/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst {\n    URLWithLegacySupport,\n    format,\n    URLSearchParams,\n    defaultBase\n} = __webpack_require__(/*! ./src/url */ \"(ssr)/../../node_modules/iso-url/src/url.js\");\nconst relative = __webpack_require__(/*! ./src/relative */ \"(ssr)/../../node_modules/iso-url/src/relative.js\");\n\nmodule.exports = {\n    URL: URLWithLegacySupport,\n    URLSearchParams,\n    format,\n    relative,\n    defaultBase\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzL2lzby11cmwvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsRUFBRSxtQkFBTyxDQUFDLDhEQUFXO0FBQ3ZCLGlCQUFpQixtQkFBTyxDQUFDLHdFQUFnQjs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIi9Vc2Vycy9ub2JvZHkxL1dvcmsvcTN4L3NjYWZmb2xkLWljcC9ub2RlX21vZHVsZXMvaXNvLXVybC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHtcbiAgICBVUkxXaXRoTGVnYWN5U3VwcG9ydCxcbiAgICBmb3JtYXQsXG4gICAgVVJMU2VhcmNoUGFyYW1zLFxuICAgIGRlZmF1bHRCYXNlXG59ID0gcmVxdWlyZSgnLi9zcmMvdXJsJyk7XG5jb25zdCByZWxhdGl2ZSA9IHJlcXVpcmUoJy4vc3JjL3JlbGF0aXZlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFVSTDogVVJMV2l0aExlZ2FjeVN1cHBvcnQsXG4gICAgVVJMU2VhcmNoUGFyYW1zLFxuICAgIGZvcm1hdCxcbiAgICByZWxhdGl2ZSxcbiAgICBkZWZhdWx0QmFzZVxufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/iso-url/index.js\n");

/***/ }),

/***/ "(ssr)/../../node_modules/iso-url/src/relative.js":
/*!**************************************************!*\
  !*** ../../node_modules/iso-url/src/relative.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst { URLWithLegacySupport, format } = __webpack_require__(/*! ./url */ \"(ssr)/../../node_modules/iso-url/src/url.js\");\n\nmodule.exports = (url, location = {}, protocolMap = {}, defaultProtocol) => {\n    let protocol = location.protocol ?\n        location.protocol.replace(':', '') :\n        'http';\n\n    // Check protocol map\n    protocol = (protocolMap[protocol] || defaultProtocol || protocol) + ':';\n    let urlParsed;\n\n    try {\n        urlParsed = new URLWithLegacySupport(url);\n    } catch (err) {\n        urlParsed = {};\n    }\n\n    const base = Object.assign({}, location, {\n        protocol: protocol || urlParsed.protocol,\n        host: location.host || urlParsed.host\n    });\n\n    return new URLWithLegacySupport(url, format(base)).toString();\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzL2lzby11cmwvc3JjL3JlbGF0aXZlLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLFFBQVEsK0JBQStCLEVBQUUsbUJBQU8sQ0FBQywwREFBTzs7QUFFeEQsb0NBQW9DLGtCQUFrQjtBQUN0RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL25vYm9keTEvV29yay9xM3gvc2NhZmZvbGQtaWNwL25vZGVfbW9kdWxlcy9pc28tdXJsL3NyYy9yZWxhdGl2ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgVVJMV2l0aExlZ2FjeVN1cHBvcnQsIGZvcm1hdCB9ID0gcmVxdWlyZSgnLi91cmwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAodXJsLCBsb2NhdGlvbiA9IHt9LCBwcm90b2NvbE1hcCA9IHt9LCBkZWZhdWx0UHJvdG9jb2wpID0+IHtcbiAgICBsZXQgcHJvdG9jb2wgPSBsb2NhdGlvbi5wcm90b2NvbCA/XG4gICAgICAgIGxvY2F0aW9uLnByb3RvY29sLnJlcGxhY2UoJzonLCAnJykgOlxuICAgICAgICAnaHR0cCc7XG5cbiAgICAvLyBDaGVjayBwcm90b2NvbCBtYXBcbiAgICBwcm90b2NvbCA9IChwcm90b2NvbE1hcFtwcm90b2NvbF0gfHwgZGVmYXVsdFByb3RvY29sIHx8IHByb3RvY29sKSArICc6JztcbiAgICBsZXQgdXJsUGFyc2VkO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgdXJsUGFyc2VkID0gbmV3IFVSTFdpdGhMZWdhY3lTdXBwb3J0KHVybCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHVybFBhcnNlZCA9IHt9O1xuICAgIH1cblxuICAgIGNvbnN0IGJhc2UgPSBPYmplY3QuYXNzaWduKHt9LCBsb2NhdGlvbiwge1xuICAgICAgICBwcm90b2NvbDogcHJvdG9jb2wgfHwgdXJsUGFyc2VkLnByb3RvY29sLFxuICAgICAgICBob3N0OiBsb2NhdGlvbi5ob3N0IHx8IHVybFBhcnNlZC5ob3N0XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFVSTFdpdGhMZWdhY3lTdXBwb3J0KHVybCwgZm9ybWF0KGJhc2UpKS50b1N0cmluZygpO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/iso-url/src/relative.js\n");

/***/ }),

/***/ "(ssr)/../../node_modules/iso-url/src/url.js":
/*!*********************************************!*\
  !*** ../../node_modules/iso-url/src/url.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nconst { URL, URLSearchParams, format } = __webpack_require__(/*! url */ \"url\");\n\n// https://github.com/nodejs/node/issues/12682\nconst defaultBase = 'http://localhost';\n\nclass URLWithLegacySupport extends URL {\n    constructor(url = '', base = defaultBase) {\n        super(url, base);\n        this.path = this.pathname + this.search;\n        this.auth =\n            this.username && this.password ?\n                this.username + ':' + this.password :\n                null;\n        this.query =\n            this.search && this.search.startsWith('?') ?\n                this.search.slice(1) :\n                null;\n    }\n\n    format() {\n        return this.toString();\n    }\n}\n\nmodule.exports = {\n    URLWithLegacySupport,\n    URLSearchParams,\n    format,\n    defaultBase\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi4vLi4vbm9kZV9tb2R1bGVzL2lzby11cmwvc3JjL3VybC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixRQUFRLCtCQUErQixFQUFFLG1CQUFPLENBQUMsZ0JBQUs7O0FBRXREO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvbm9ib2R5MS9Xb3JrL3EzeC9zY2FmZm9sZC1pY3Avbm9kZV9tb2R1bGVzL2lzby11cmwvc3JjL3VybC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgVVJMLCBVUkxTZWFyY2hQYXJhbXMsIGZvcm1hdCB9ID0gcmVxdWlyZSgndXJsJyk7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9pc3N1ZXMvMTI2ODJcbmNvbnN0IGRlZmF1bHRCYXNlID0gJ2h0dHA6Ly9sb2NhbGhvc3QnO1xuXG5jbGFzcyBVUkxXaXRoTGVnYWN5U3VwcG9ydCBleHRlbmRzIFVSTCB7XG4gICAgY29uc3RydWN0b3IodXJsID0gJycsIGJhc2UgPSBkZWZhdWx0QmFzZSkge1xuICAgICAgICBzdXBlcih1cmwsIGJhc2UpO1xuICAgICAgICB0aGlzLnBhdGggPSB0aGlzLnBhdGhuYW1lICsgdGhpcy5zZWFyY2g7XG4gICAgICAgIHRoaXMuYXV0aCA9XG4gICAgICAgICAgICB0aGlzLnVzZXJuYW1lICYmIHRoaXMucGFzc3dvcmQgP1xuICAgICAgICAgICAgICAgIHRoaXMudXNlcm5hbWUgKyAnOicgKyB0aGlzLnBhc3N3b3JkIDpcbiAgICAgICAgICAgICAgICBudWxsO1xuICAgICAgICB0aGlzLnF1ZXJ5ID1cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoICYmIHRoaXMuc2VhcmNoLnN0YXJ0c1dpdGgoJz8nKSA/XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2guc2xpY2UoMSkgOlxuICAgICAgICAgICAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgZm9ybWF0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgVVJMV2l0aExlZ2FjeVN1cHBvcnQsXG4gICAgVVJMU2VhcmNoUGFyYW1zLFxuICAgIGZvcm1hdCxcbiAgICBkZWZhdWx0QmFzZVxufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/../../node_modules/iso-url/src/url.js\n");

/***/ })

};
;