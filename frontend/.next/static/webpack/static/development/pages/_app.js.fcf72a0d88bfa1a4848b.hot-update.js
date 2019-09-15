webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./pages/signup.js":
/*!*************************!*\
  !*** ./pages/signup.js ***!
  \*************************/
/*! exports provided: useInput, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useInput", function() { return useInput; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var _reducers_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../reducers/user */ "./reducers/user.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _jsxFileName = "/Users/changhwanoh/practice/js/React/NodeBird/frontend/pages/signup.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;




var useInput = function useInput() {
  var initValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(initValue),
      value = _useState[0],
      setter = _useState[1];

  var handler = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (e) {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

var Signup = function Signup() {
  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      passwordCheck = _useState2[0],
      setPasswordCheck = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(""),
      term = _useState3[0],
      setTerm = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      passwordError = _useState4[0],
      setPasswordError = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      termError = _useState5[0],
      setTermError = _useState5[1];

  var _useInput = useInput(""),
      _useInput2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useInput, 2),
      id = _useInput2[0],
      onChangeId = _useInput2[1];

  var _useInput3 = useInput(""),
      _useInput4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useInput3, 2),
      nick = _useInput4[0],
      onChangeNick = _useInput4[1];

  var _useInput5 = useInput(""),
      _useInput6 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useInput5, 2),
      password = _useInput6[0],
      onChangePassword = _useInput6[1];

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();
  var onSubmit = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (e) {
    e.preventDefault();

    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if (!term) {
      return setTermError(true);
    }

    dispatch(Object(_reducers_user__WEBPACK_IMPORTED_MODULE_3__["signUpAction"])({
      id: id,
      password: password,
      nick: nick
    }));
  }, [password, passwordCheck, term]);
  var onChangePasswordCheck = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (e) {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);
  var onChangeTerm = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (e) {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Form"], {
    onSubmit: onSubmit,
    style: {
      padding: 10
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, __jsx("label", {
    htmlFor: "user-id",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, "\uC544\uC774\uB514"), __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  }), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Input"], {
    name: "user-id",
    value: id,
    required: true,
    onChange: onChangeId,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: this
  })), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: this
  }, __jsx("label", {
    htmlFor: "user-nick",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: this
  }, "\uB2C9\uB124\uC784"), __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Input"], {
    name: "user-nick",
    value: nick,
    required: true,
    onChange: onChangeNick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  })), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: this
  }, __jsx("label", {
    htmlFor: "user-password",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }, "\uBE44\uBC00\uBC88\uD638"), __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: this
  }), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Input"], {
    type: "password",
    name: "user-password",
    value: password,
    required: true,
    onChange: onChangePassword,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  })), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93
    },
    __self: this
  }, __jsx("label", {
    htmlFor: "user-password-check",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: this
  }, "\uBE44\uBC00\uBC88\uD638 \uCCB4\uD06C"), __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    },
    __self: this
  }), __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Input"], {
    type: "password",
    name: "user-password-check",
    value: passwordCheck,
    required: true,
    onChange: onChangePasswordCheck,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96
    },
    __self: this
  }), passwordError && __jsx("div", {
    style: {
      color: "red"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104
    },
    __self: this
  }, "\uBE44\uBC00\uBC88\uD638\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.")), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109
    },
    __self: this
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Checkbox"], {
    name: "user-term",
    checked: term,
    onChange: onChangeTerm,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110
    },
    __self: this
  }, "\uB3D9\uC758\uD569\uB2C8\uB2E4\x1D"), termError && __jsx("div", {
    style: {
      color: "red"
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118
    },
    __self: this
  }, "\uC57D\uAD00\uC5D0 \uB3D9\uC758\uD558\uC154\uC57C \uD569\uB2C8\uB2E4.")), __jsx("div", {
    style: {
      marginTop: 10
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123
    },
    __self: this
  }, __jsx(antd__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    type: "primary",
    htmlType: "submit",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124
    },
    __self: this
  }, "\uAC00\uC785\uD558\uAE30"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Signup);

/***/ })

})
//# sourceMappingURL=_app.js.fcf72a0d88bfa1a4848b.hot-update.js.map