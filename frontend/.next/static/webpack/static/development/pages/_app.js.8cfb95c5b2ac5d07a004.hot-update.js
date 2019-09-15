webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./reducers/user.js":
/*!**************************!*\
  !*** ./reducers/user.js ***!
  \**************************/
/*! exports provided: initialState, SIGN_UP, LOG_IN, LOG_OUT, signUpAction, loginAction, logoutAction, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGN_UP", function() { return SIGN_UP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOG_IN", function() { return LOG_IN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOG_OUT", function() { return LOG_OUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signUpAction", function() { return signUpAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginAction", function() { return loginAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logoutAction", function() { return logoutAction; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");

var dummyUser = {
  nickname: "dummy",
  Post: [],
  Followings: [],
  Followers: [],
  signUpData: action.data
};
var initialState = {
  isLoggedIn: false,
  user: null
};
var SIGN_UP = "SIGN_UP";
var LOG_IN = "LOG_IN"; //action의 이름

var LOG_OUT = "LOG_OUT";
var signUpAction = function signUpAction(data) {
  return {
    type: SIGN_UP,
    data: data
  };
};
var loginAction = {
  type: LOG_IN
}; //실제 action

var logoutAction = {
  type: LOG_OUT
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case LOG_IN:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isLoggedIn: true,
          user: dummyUser
        });
      }

    case LOG_OUT:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isLoggedIn: false,
          user: null
        });
      }

    case SIGN_UP:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          signUpData: action.data
        });
      }

    default:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state);
      }
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

})
//# sourceMappingURL=_app.js.8cfb95c5b2ac5d07a004.hot-update.js.map