webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
var _jsxFileName = "/Users/changhwanoh/practice/js/React/NodeBird/frontend/pages/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;


var dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: "jenny"
    },
    content: "first post",
    img: ""
  }]
};

var Home = function Home() {
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, dummy.isLoggedIn && __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    style: {
      marginBottom: 20
    },
    encType: "multipart/form-data",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Input"].TextArea, {
    maxLength: 140,
    placeholder: "\uD3EC\uC2A4\uD2B8\uB97C \uC791\uC131\uD574\uC8FC\uC138\uC694",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, __jsx("input", {
    type: "file",
    multiple: true,
    hidden: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
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
      lineNumber: 34
    },
    __self: this
  }, "\uC9F9\uC9F9")), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, dummy.imagePaths.map(function (v, i) {
    return __jsx("div", {
      key: v,
      style: {
        display: "inline-block"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
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
        lineNumber: 49
      },
      __self: this
    }), __jsx("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      },
      __self: this
    }, "\uC81C\uAC70")));
  }))), dummy.mainPosts.map(function (c) {
    return __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Card"], {
      key: c.createdAt,
      cover: c.img && __jsx("img", {
        alt: "example",
        src: c.img,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        },
        __self: this
      }),
      actions: [__jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
        type: "retweet",
        key: "retweet",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        },
        __self: this
      }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
        type: "heart",
        key: "heart",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
        type: "message",
        key: "message",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      }), __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
        type: "ellipsis",
        key: "ellipsis",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        },
        __self: this
      })],
      extra: __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, "\uD314\uB85C\uC6B0"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65
      },
      __self: this
    }, __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Card"].Meta, {
      avatar: __jsx(antd__WEBPACK_IMPORTED_MODULE_1__["Avatar"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        },
        __self: this
      }, c.User.nickname[0]),
      title: c.User.nickname,
      description: c.content,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 76
      },
      __self: this
    }));
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ })

})
//# sourceMappingURL=index.js.c7b262c04f058fac8e89.hot-update.js.map