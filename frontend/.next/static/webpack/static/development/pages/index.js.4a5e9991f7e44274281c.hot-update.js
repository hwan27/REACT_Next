webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/PostForm.js":
/*!********************************!*\
  !*** ./components/PostForm.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var _jsxFileName = "/Users/changhwanoh/practice/js/React/NodeBird/frontend/components/PostForm.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var PostForm = function PostForm() {
  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) {
    return state.post;
  }),
      imagePaths = _useSelector.imagePaths;

  return __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    style: {
      margin: "10px 0 20px"
    },
    encType: "multipart/form-data",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Input"].TextArea, {
    maxLength: 140,
    placeholder: "\uD3EC\uC2A4\uD2B8\uB97C \uC791\uC131\uD574\uC8FC\uC138\uC694",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, __jsx("input", {
    type: "file",
    multiple: true,
    hidden: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, "\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC"), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    type: "primary",
    style: {
      "float": "right"
    },
    htmlType: "submit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, "\uC9F9\uC9F9")), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, imagePaths.map(function (v, i) {
    return __jsx("div", {
      key: v,
      style: {
        display: "inline-block"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    }, __jsx("img", {
      src: "http://localhost:3065/" + v,
      style: {
        width: "200px"
      },
      alt: v,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }), __jsx("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      },
      __self: this
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }, "\uC81C\uAC70")));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (PostForm);

/***/ })

})
//# sourceMappingURL=index.js.4a5e9991f7e44274281c.hot-update.js.map