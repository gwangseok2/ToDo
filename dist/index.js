/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var $todoListContents = document.querySelector('.todo-list-contents');
var $input = document.querySelector('.todo-list-input');
var $buttons = document.querySelectorAll('.todo-list-buttons button');
var $clearButton = document.querySelector('.todo-list-clear > button');
var progressArray = [];
var completeArray = [];
var downTimeStamp = null;
var upTimeStamp = null;
var itemId = 0;
var moveTarget = null;
var moveTargetId = null;
var check = true;
var upIndex = null;
var downIndex = null;

// createTodo
$input.addEventListener('keypress', function (e) {
  if (e.keyCode === 13 && e.target.value) {
    createTodo(e);
  }
});
var TodoItem = /*#__PURE__*/function () {
  function TodoItem(id, description, creatDttm) {
    var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : id;
    var status = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'progress';
    var completeDttm = arguments.length > 5 ? arguments[5] : undefined;
    _classCallCheck(this, TodoItem);
    this.id = id;
    this.description = description;
    this.creatDttm = creatDttm;
    this.key = key;
    this.status = status;
    this.completeDttm = completeDttm;
  }
  _createClass(TodoItem, [{
    key: "completeItem",
    value: function completeItem() {
      this.completeDttm = new Date().getTime();
      this.status = 'complete';
    }
  }, {
    key: "cancelItem",
    value: function cancelItem() {
      this.completeDttm = null;
      this.status = 'progress';
    }
  }]);
  return TodoItem;
}(); // 랜더 함수
var render = function render(type) {
  var items;
  var $buttons = document.querySelectorAll('.todo-list-buttons > button');

  // 하던 버튼 정보부 눌렀을 때
  if ($buttons[0].classList.contains('active')) {
    // all 눌려 있을 때
    items = [].concat(progressArray, completeArray);
  } else if ($buttons[1].classList.contains('active')) {
    // active 눌렀 있을 때
    items = [].concat(progressArray);
  } else {
    // 컴플리트 눌려 있을 때
    items = [].concat(completeArray);
  }
  if (type === 'change') {
    items.sort(function (a, b) {
      if (a.key < b.key && a.status === 'progress' && b.status === 'progress') {
        return 1;
      }
      if (a.key > b.key && a.status === 'progress' && b.status === 'progress') {
        return -1;
      }
      return 0;
    });
  } else {
    items.sort(function (a, b) {
      if (a.id < b.id && a.status === 'progress' && b.status === 'progress') {
        return 1;
      }
      if (a.id > b.id && a.status === 'progress' && b.status === 'progress') {
        return -1;
      }
      return 0;
    });
  }

  // 하단 정보부 버튼 카운트 관리
  $clearButton.children[1].innerText = "(".concat(completeArray.length, ")");
  document.querySelector('.todo-list-counter').innerHTML = items.length;
  $todoListContents.innerHTML = "\n  ".concat(items.map(function (item) {
    return "\n  <li class=\"todo-list-item ".concat(item.status, "\" id=\"").concat(item.id, "\">\n    <div class=\"todo-list-absolute\">\n      <span class=\"material-icons\" dropzone=\"true\">\n        drag_handle\n      </span>\n      <span>\n        ").concat(item.description, "\n      </span>\n    </div>\n  </li>");
  }).join(''));
};
// 랜더 함수 끝

var createTodo = function createTodo(e) {
  var item = new TodoItem(itemId++, e.target.value, new Date().getTime());
  progressArray.length > 0 ? progressArray.unshift(item) : progressArray.push(item);
  e.target.value = '';
  render();
  return item;
};
$todoListContents.addEventListener('mousedown', mouseDownEvent);
$todoListContents.addEventListener('mouseup', mouseUpEvent);

// 투두리스트 눌렀을 때 발생하는 이벤트 mousedown
function mouseDownEvent(e) {
  downTimeStamp = e.timeStamp;
  if (e.target.tagName === 'SPAN' && !e.target.parentNode.parentNode.classList.contains('complete')) {
    $todoListContents.classList.add('hover');
    check = false;
    dragEvent(e);
    $todoListContents.addEventListener('mouseleave', mouseOutTestEvent);
    var clickIndex = Number(e.target.parentNode.parentNode.id);
    downIndex = progressArray.findIndex(function (x) {
      return x.id === clickIndex;
    });
  }
}

// 이벤트 mouseup
function mouseUpEvent(e) {
  upTimeStamp = e.timeStamp;
  $todoListContents.classList.remove('hover');
  if (upTimeStamp - downTimeStamp < 800 && e.target.tagName === 'LI' && check) {
    var targetId = e.target.id;
    var totalArray = [].concat(progressArray, completeArray);
    totalArray.forEach(function (el, idx) {
      if (el.id === Number(targetId)) {
        if (el.status === 'progress') {
          el.completeItem();
          console.log(idx, 'index');
          progressArray.splice(idx, 1);
          completeArray.push(el);
        } else {
          el.cancelItem();
          completeArray.splice(idx - progressArray.length, 1);
          progressArray.push(el);
        }
        render();
      }
    });
  } else {
    var upId = null;
    if (e.target.tagName === 'SPAN') {
      upId = e.target.parentNode.parentNode.id;
    } else {
      upId = e.target.id;
    }
    upIndex = progressArray.findIndex(function (x) {
      return x.id === Number(upId);
    });
    var sortArrKey = progressArray[upIndex].key;
    var downArrkey = progressArray[downIndex].key;
    progressArray[upIndex].key = downArrkey;
    progressArray[downIndex].key = sortArrKey;
    render('change');
    clearAbsolute();
  }
  check = true;
}
function dragEvent(e) {
  moveTarget = e.target.parentNode;
  moveTargetId = moveTarget.parentNode.id;
  moveTarget.classList.add('move');
  $todoListContents.addEventListener('mousemove', moveAt);
  function moveAt(e) {
    if (e.target.classList.contains('.todo-list-item')) {
      e.target.classList.add('preview');
    }
    moveTarget.style.left = e.pageX - moveTarget.offsetWidth + 'px';
    moveTarget.style.top = e.pageY - moveTarget.offsetHeight / 2 + 'px';
  }

  // esc 눌렀 을 때 드래그 취소
  window.onkeydown = function (e) {
    if (e.keyCode === 27) {
      $todoListContents.removeEventListener('mousemove', moveAt);
      clearAbsolute();
    }
  };
}
function mouseOutTestEvent() {
  clearAbsolute();
}

// 하단 정보부 이벤트 리스너
$buttons.forEach(function (el) {
  el.addEventListener('click', listFilter);
});

// 하단 정보부 버튼 클릭 시 이벤트 코드
function listFilter(e) {
  $buttons.forEach(function (el) {
    el.classList.remove('active');
  });
  e.target.classList.add('active');
  render();
}

// 완료 Todo 삭제
$clearButton.addEventListener('click', clearTodo);
function clearTodo() {
  var checkData = confirm('Are you sure you want to clear the todolist?');
  if (checkData) {
    completeArray.splice(0);
    render();
  }
}
function clearAbsolute() {
  moveTarget.style.position = '';
  moveTarget.style.zIndex = '';
  moveTarget.style.left = '';
  moveTarget.style.top = '';
  moveTarget.classList.remove('move');
  $todoListContents.classList.remove('hover');
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/app.css":
/*!***********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/app.css ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_reset_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./styles/reset.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./styles/style.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_styles_reset_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_styles_style_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* 리셋 css */\r\n\r\n/* style css */", "",{"version":3,"sources":["webpack://./src/app.css"],"names":[],"mappings":"AAAA,WAAW;;AAGX,cAAc","sourcesContent":["/* 리셋 css */\r\n@import url(./styles/reset.css);\r\n\r\n/* style css */\r\n@import url(./styles/style.css);"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/reset.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  user-select: none;\r\n}\r\n\r\nul,\r\nol {\r\n  list-style: none;\r\n}\r\n\r\na {\r\n  color: inherit;\r\n  text-decoration: none;\r\n}\r\n\r\ninput {\r\n  -webkit-appearance: none;\r\n  -moz-appearance: none;\r\n  appearance: none;\r\n}", "",{"version":3,"sources":["webpack://./src/styles/reset.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,iBAAiB;AACnB;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,wBAAwB;EACxB,qBAAqB;EACrB,gBAAgB;AAClB","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  user-select: none;\r\n}\r\n\r\nul,\r\nol {\r\n  list-style: none;\r\n}\r\n\r\na {\r\n  color: inherit;\r\n  text-decoration: none;\r\n}\r\n\r\ninput {\r\n  -webkit-appearance: none;\r\n  -moz-appearance: none;\r\n  appearance: none;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* =========== layouts ============= */\r\nbutton {\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list {\r\n  background-color: #f1f1f1;\r\n  width: 100%;\r\n  min-height: 100vh;\r\n  padding-bottom: 40px;\r\n}\r\n\r\n.todo-list-title {\r\n  font-size: 30px;\r\n  text-align: center;\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.todo-list-wrapper {\r\n  width: 89.33%;\r\n  margin: 0 auto;\r\n  border: 1px solid #111;\r\n  box-sizing: border-box;\r\n  padding: 20px;\r\n  background-color: #fff;\r\n}\r\n\r\n.todo-list-input {\r\n  width: 100%;\r\n  height: 40px;\r\n  box-sizing: border-box;\r\n  padding: 10px;\r\n  border: 1px dashed #ccc;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-input:focus {\r\n  outline: 1px solid #eb4656;\r\n}\r\n\r\n.todo-list-input::placeholder {\r\n  color: #ccc;\r\n}\r\n\r\n.todo-list-contents {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.todo-list-contents .todo-list-item {\r\n  display: flex;\r\n  align-items: center;\r\n  min-height: 20px;\r\n  border-bottom: 1px solid #ccc;\r\n  color: #000;\r\n  font-size: 12px;\r\n  padding: 10px 7px 10px 0px;\r\n  width: 100%;\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list-absolute {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.todo-list-absolute.move {\r\n  position: absolute;\r\n  z-index: 999;\r\n}\r\n\r\n.todo-list-contents.hover .todo-list-item:hover {\r\n  border-left: 3px solid #1f80fd;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.move {\r\n  border-bottom: none;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.preview {\r\n  border-left: 3px solid #1f80fd;\r\n}\r\n\r\n.todo-list-contents .todo-list-item span {\r\n  padding-right: 5px;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.complete {\r\n  /* text-decoration: line-through; */\r\n  color: #ccc;\r\n  position: relative;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.complete::after {\r\n  content: \"\";\r\n  position: absolute;\r\n  display: block;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  right: 10px;\r\n  width: 20px;\r\n  height: 20px;\r\n  background-repeat: no-repeat;\r\n  background-size: 100%;\r\n  background-image: url('https://w7.pngwing.com/pngs/976/878/png-transparent-black-check-illustration-black-and-white-pattern-black-checkmark-angle-white-sport.png');\r\n}\r\n\r\n\r\n\r\n/* ========= 하단 정보부 ========= */\r\n.todo-list-info {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-top: 10px;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-buttons button,\r\n.todo-list-clear button {\r\n  background-color: #f1f1f1;\r\n  color: #000;\r\n  outline: none;\r\n  border-radius: 2px;\r\n  border: 1px solid #222;\r\n  font-size: 12px;\r\n  padding: 5px;\r\n}\r\n\r\n.todo-list-buttons button.active {\r\n  color: #eb4656;\r\n  font-weight: 500;\r\n  border: 1px solid #eb4656;\r\n}", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA,sCAAsC;AACtC;EACE,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,sBAAsB;EACtB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,eAAe;AACjB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,gBAAgB;EAChB,6BAA6B;EAC7B,WAAW;EACX,eAAe;EACf,0BAA0B;EAC1B,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,mCAAmC;EACnC,WAAW;EACX,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,cAAc;EACd,QAAQ;EACR,2BAA2B;EAC3B,WAAW;EACX,WAAW;EACX,YAAY;EACZ,4BAA4B;EAC5B,qBAAqB;EACrB,mKAAmK;AACrK;;;;AAIA,+BAA+B;AAC/B;EACE,WAAW;EACX,aAAa;EACb,8BAA8B;EAC9B,gBAAgB;EAChB,eAAe;AACjB;;AAEA;;EAEE,yBAAyB;EACzB,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,sBAAsB;EACtB,eAAe;EACf,YAAY;AACd;;AAEA;EACE,cAAc;EACd,gBAAgB;EAChB,yBAAyB;AAC3B","sourcesContent":["/* =========== layouts ============= */\r\nbutton {\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list {\r\n  background-color: #f1f1f1;\r\n  width: 100%;\r\n  min-height: 100vh;\r\n  padding-bottom: 40px;\r\n}\r\n\r\n.todo-list-title {\r\n  font-size: 30px;\r\n  text-align: center;\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.todo-list-wrapper {\r\n  width: 89.33%;\r\n  margin: 0 auto;\r\n  border: 1px solid #111;\r\n  box-sizing: border-box;\r\n  padding: 20px;\r\n  background-color: #fff;\r\n}\r\n\r\n.todo-list-input {\r\n  width: 100%;\r\n  height: 40px;\r\n  box-sizing: border-box;\r\n  padding: 10px;\r\n  border: 1px dashed #ccc;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-input:focus {\r\n  outline: 1px solid #eb4656;\r\n}\r\n\r\n.todo-list-input::placeholder {\r\n  color: #ccc;\r\n}\r\n\r\n.todo-list-contents {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.todo-list-contents .todo-list-item {\r\n  display: flex;\r\n  align-items: center;\r\n  min-height: 20px;\r\n  border-bottom: 1px solid #ccc;\r\n  color: #000;\r\n  font-size: 12px;\r\n  padding: 10px 7px 10px 0px;\r\n  width: 100%;\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list-absolute {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.todo-list-absolute.move {\r\n  position: absolute;\r\n  z-index: 999;\r\n}\r\n\r\n.todo-list-contents.hover .todo-list-item:hover {\r\n  border-left: 3px solid #1f80fd;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.move {\r\n  border-bottom: none;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.preview {\r\n  border-left: 3px solid #1f80fd;\r\n}\r\n\r\n.todo-list-contents .todo-list-item span {\r\n  padding-right: 5px;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.complete {\r\n  /* text-decoration: line-through; */\r\n  color: #ccc;\r\n  position: relative;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.complete::after {\r\n  content: \"\";\r\n  position: absolute;\r\n  display: block;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  right: 10px;\r\n  width: 20px;\r\n  height: 20px;\r\n  background-repeat: no-repeat;\r\n  background-size: 100%;\r\n  background-image: url('https://w7.pngwing.com/pngs/976/878/png-transparent-black-check-illustration-black-and-white-pattern-black-checkmark-angle-white-sport.png');\r\n}\r\n\r\n\r\n\r\n/* ========= 하단 정보부 ========= */\r\n.todo-list-info {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-top: 10px;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-buttons button,\r\n.todo-list-clear button {\r\n  background-color: #f1f1f1;\r\n  color: #000;\r\n  outline: none;\r\n  border-radius: 2px;\r\n  border: 1px solid #222;\r\n  font-size: 12px;\r\n  padding: 5px;\r\n}\r\n\r\n.todo-list-buttons button.active {\r\n  color: #eb4656;\r\n  font-weight: 500;\r\n  border: 1px solid #eb4656;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/app.css":
/*!*********************!*\
  !*** ./src/app.css ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./app.css */ "./node_modules/css-loader/dist/cjs.js!./src/app.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_app_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.css */ "./src/app.css");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.js */ "./src/app.js");
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_js__WEBPACK_IMPORTED_MODULE_1__);


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7Ozs7Ozs7Ozs7O0FDNURhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FtQiIsInNvdXJjZXMiOlsid2VicGFjazovL25obi8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vbmhuLy4vc3JjL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vbmhuLy4vc3JjL3N0eWxlcy9yZXNldC5jc3MiLCJ3ZWJwYWNrOi8vbmhuLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vbmhuLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9uaG4vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9uaG4vLi9zcmMvYXBwLmNzcz9hNjcyIiwid2VicGFjazovL25obi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9uaG4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL25obi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9uaG4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbmhuLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbmhuLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbmhuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25obi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uaG4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25obi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25obi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25obi93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbmhuLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0ICR0b2RvTGlzdENvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC1jb250ZW50cycpO1xyXG5jb25zdCAkaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0LWlucHV0Jyk7XHJcbmNvbnN0ICRidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGlzdC1idXR0b25zIGJ1dHRvbicpO1xyXG5jb25zdCAkY2xlYXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0LWNsZWFyID4gYnV0dG9uJyk7XHJcbmNvbnN0IHByb2dyZXNzQXJyYXkgPSBbXTtcclxuY29uc3QgY29tcGxldGVBcnJheSA9IFtdO1xyXG5sZXQgZG93blRpbWVTdGFtcCA9IG51bGw7XHJcbmxldCB1cFRpbWVTdGFtcCA9IG51bGw7XHJcbmxldCBpdGVtSWQgPSAwO1xyXG5sZXQgbW92ZVRhcmdldCA9IG51bGw7XHJcbmxldCBtb3ZlVGFyZ2V0SWQgPSBudWxsO1xyXG5sZXQgY2hlY2sgPSB0cnVlO1xyXG5sZXQgdXBJbmRleCA9IG51bGw7XHJcbmxldCBkb3duSW5kZXggPSBudWxsO1xyXG5cclxuLy8gY3JlYXRlVG9kb1xyXG4kaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gIGlmIChlLmtleUNvZGUgPT09IDEzICYmIGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICBjcmVhdGVUb2RvKGUpO1xyXG4gIH1cclxufSk7XHJcblxyXG5jbGFzcyBUb2RvSXRlbSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpZCxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgY3JlYXREdHRtLFxyXG4gICAga2V5ID0gaWQsXHJcbiAgICBzdGF0dXMgPSAncHJvZ3Jlc3MnLFxyXG4gICAgY29tcGxldGVEdHRtXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLmNyZWF0RHR0bSA9IGNyZWF0RHR0bTtcclxuICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICB0aGlzLmNvbXBsZXRlRHR0bSA9IGNvbXBsZXRlRHR0bTtcclxuICB9XHJcblxyXG4gIGNvbXBsZXRlSXRlbSgpIHtcclxuICAgIHRoaXMuY29tcGxldGVEdHRtID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB0aGlzLnN0YXR1cyA9ICdjb21wbGV0ZSc7XHJcbiAgfVxyXG5cclxuICBjYW5jZWxJdGVtKCkge1xyXG4gICAgdGhpcy5jb21wbGV0ZUR0dG0gPSBudWxsO1xyXG4gICAgdGhpcy5zdGF0dXMgPSAncHJvZ3Jlc3MnO1xyXG4gIH1cclxufVxyXG5cclxuLy8g656c642UIO2VqOyImFxyXG5jb25zdCByZW5kZXIgPSAodHlwZSkgPT4ge1xyXG4gIGxldCBpdGVtcztcclxuICBjb25zdCAkYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWxpc3QtYnV0dG9ucyA+IGJ1dHRvbicpO1xyXG5cclxuICAvLyDtlZjrjZgg67KE7Yq8IOygleuztOu2gCDriIzroIDsnYQg65WMXHJcbiAgaWYgKCRidXR0b25zWzBdLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgIC8vIGFsbCDriIzroKQg7J6I7J2EIOuVjFxyXG4gICAgaXRlbXMgPSBbLi4ucHJvZ3Jlc3NBcnJheSwgLi4uY29tcGxldGVBcnJheV07XHJcbiAgfSBlbHNlIGlmICgkYnV0dG9uc1sxXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAvLyBhY3RpdmUg64iM66CAIOyeiOydhCDrlYxcclxuICAgIGl0ZW1zID0gWy4uLnByb2dyZXNzQXJyYXldO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyDsu7TtlIzrpqztirgg64iM66CkIOyeiOydhCDrlYxcclxuICAgIGl0ZW1zID0gWy4uLmNvbXBsZXRlQXJyYXldO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGUgPT09ICdjaGFuZ2UnKSB7XHJcbiAgICBpdGVtcy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGlmIChhLmtleSA8IGIua2V5ICYmIGEuc3RhdHVzID09PSAncHJvZ3Jlc3MnICYmIGIuc3RhdHVzID09PSAncHJvZ3Jlc3MnKSB7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGEua2V5ID4gYi5rZXkgJiYgYS5zdGF0dXMgPT09ICdwcm9ncmVzcycgJiYgYi5zdGF0dXMgPT09ICdwcm9ncmVzcycpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgaXRlbXMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBpZiAoYS5pZCA8IGIuaWQgJiYgYS5zdGF0dXMgPT09ICdwcm9ncmVzcycgJiYgYi5zdGF0dXMgPT09ICdwcm9ncmVzcycpIHtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYS5pZCA+IGIuaWQgJiYgYS5zdGF0dXMgPT09ICdwcm9ncmVzcycgJiYgYi5zdGF0dXMgPT09ICdwcm9ncmVzcycpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIO2VmOuLqCDsoJXrs7TrtoAg67KE7Yq8IOy5tOyatO2KuCDqtIDrpqxcclxuICAkY2xlYXJCdXR0b24uY2hpbGRyZW5bMV0uaW5uZXJUZXh0ID0gYCgke2NvbXBsZXRlQXJyYXkubGVuZ3RofSlgO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QtY291bnRlcicpLmlubmVySFRNTCA9IGl0ZW1zLmxlbmd0aDtcclxuXHJcbiAgJHRvZG9MaXN0Q29udGVudHMuaW5uZXJIVE1MID0gYFxyXG4gICR7aXRlbXNcclxuICAgICAgLm1hcChcclxuICAgICAgICAoaXRlbSkgPT4gYFxyXG4gIDxsaSBjbGFzcz1cInRvZG8tbGlzdC1pdGVtICR7aXRlbS5zdGF0dXN9XCIgaWQ9XCIke2l0ZW0uaWR9XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwidG9kby1saXN0LWFic29sdXRlXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBkcm9wem9uZT1cInRydWVcIj5cclxuICAgICAgICBkcmFnX2hhbmRsZVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICAgIDxzcGFuPlxyXG4gICAgICAgICR7aXRlbS5kZXNjcmlwdGlvbn1cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9saT5gXHJcbiAgICAgIClcclxuICAgICAgLmpvaW4oJycpfWA7XHJcbn07XHJcbi8vIOuenOuNlCDtlajsiJgg64GdXHJcblxyXG5jb25zdCBjcmVhdGVUb2RvID0gKGUpID0+IHtcclxuICBjb25zdCBpdGVtID0gbmV3IFRvZG9JdGVtKGl0ZW1JZCsrLCBlLnRhcmdldC52YWx1ZSwgbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gIHByb2dyZXNzQXJyYXkubGVuZ3RoID4gMFxyXG4gICAgPyBwcm9ncmVzc0FycmF5LnVuc2hpZnQoaXRlbSlcclxuICAgIDogcHJvZ3Jlc3NBcnJheS5wdXNoKGl0ZW0pO1xyXG4gIGUudGFyZ2V0LnZhbHVlID0gJyc7XHJcbiAgcmVuZGVyKCk7XHJcbiAgcmV0dXJuIGl0ZW07XHJcbn07XHJcblxyXG4kdG9kb0xpc3RDb250ZW50cy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd25FdmVudCk7XHJcbiR0b2RvTGlzdENvbnRlbnRzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwRXZlbnQpO1xyXG5cclxuLy8g7Yis65GQ66as7Iqk7Yq4IOuIjOuggOydhCDrlYwg67Cc7IOd7ZWY64qUIOydtOuypO2KuCBtb3VzZWRvd25cclxuZnVuY3Rpb24gbW91c2VEb3duRXZlbnQoZSkge1xyXG4gIGRvd25UaW1lU3RhbXAgPSBlLnRpbWVTdGFtcDtcclxuICBpZiAoXHJcbiAgICBlLnRhcmdldC50YWdOYW1lID09PSAnU1BBTicgJiZcclxuICAgICFlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb21wbGV0ZScpXHJcbiAgKSB7XHJcbiAgICAkdG9kb0xpc3RDb250ZW50cy5jbGFzc0xpc3QuYWRkKCdob3ZlcicpO1xyXG4gICAgY2hlY2sgPSBmYWxzZTtcclxuICAgIGRyYWdFdmVudChlKTtcclxuICAgICR0b2RvTGlzdENvbnRlbnRzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBtb3VzZU91dFRlc3RFdmVudCk7XHJcbiAgICBjb25zdCBjbGlja0luZGV4ID0gTnVtYmVyKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZS5pZCk7XHJcbiAgICBkb3duSW5kZXggPSBwcm9ncmVzc0FycmF5LmZpbmRJbmRleCgoeCkgPT4geC5pZCA9PT0gY2xpY2tJbmRleCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDsnbTrsqTtirggbW91c2V1cFxyXG5mdW5jdGlvbiBtb3VzZVVwRXZlbnQoZSkge1xyXG4gIHVwVGltZVN0YW1wID0gZS50aW1lU3RhbXA7XHJcbiAgJHRvZG9MaXN0Q29udGVudHMuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXInKTtcclxuXHJcbiAgaWYgKHVwVGltZVN0YW1wIC0gZG93blRpbWVTdGFtcCA8IDgwMCAmJiBlLnRhcmdldC50YWdOYW1lID09PSAnTEknICYmIGNoZWNrKSB7XHJcbiAgICBjb25zdCB0YXJnZXRJZCA9IGUudGFyZ2V0LmlkO1xyXG4gICAgY29uc3QgdG90YWxBcnJheSA9IFsuLi5wcm9ncmVzc0FycmF5LCAuLi5jb21wbGV0ZUFycmF5XTtcclxuXHJcbiAgICB0b3RhbEFycmF5LmZvckVhY2goKGVsLCBpZHgpID0+IHtcclxuICAgICAgaWYgKGVsLmlkID09PSBOdW1iZXIodGFyZ2V0SWQpKSB7XHJcbiAgICAgICAgaWYgKGVsLnN0YXR1cyA9PT0gJ3Byb2dyZXNzJykge1xyXG4gICAgICAgICAgZWwuY29tcGxldGVJdGVtKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhpZHgsICdpbmRleCcpO1xyXG4gICAgICAgICAgcHJvZ3Jlc3NBcnJheS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgIGNvbXBsZXRlQXJyYXkucHVzaChlbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGVsLmNhbmNlbEl0ZW0oKTtcclxuICAgICAgICAgIGNvbXBsZXRlQXJyYXkuc3BsaWNlKGlkeCAtIHByb2dyZXNzQXJyYXkubGVuZ3RoLCAxKTtcclxuICAgICAgICAgIHByb2dyZXNzQXJyYXkucHVzaChlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IHVwSWQgPSBudWxsO1xyXG4gICAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdTUEFOJykge1xyXG4gICAgICB1cElkID0gZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmlkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdXBJZCA9IGUudGFyZ2V0LmlkO1xyXG4gICAgfVxyXG4gICAgdXBJbmRleCA9IHByb2dyZXNzQXJyYXkuZmluZEluZGV4KCh4KSA9PiB4LmlkID09PSBOdW1iZXIodXBJZCkpO1xyXG4gICAgY29uc3Qgc29ydEFycktleSA9IHByb2dyZXNzQXJyYXlbdXBJbmRleF0ua2V5O1xyXG4gICAgY29uc3QgZG93bkFycmtleSA9IHByb2dyZXNzQXJyYXlbZG93bkluZGV4XS5rZXk7XHJcbiAgICBwcm9ncmVzc0FycmF5W3VwSW5kZXhdLmtleSA9IGRvd25BcnJrZXk7XHJcbiAgICBwcm9ncmVzc0FycmF5W2Rvd25JbmRleF0ua2V5ID0gc29ydEFycktleTtcclxuICAgIHJlbmRlcignY2hhbmdlJyk7XHJcbiAgICBjbGVhckFic29sdXRlKCk7XHJcbiAgfVxyXG5cclxuICBjaGVjayA9IHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWdFdmVudChlKSB7XHJcbiAgbW92ZVRhcmdldCA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgbW92ZVRhcmdldElkID0gbW92ZVRhcmdldC5wYXJlbnROb2RlLmlkO1xyXG4gIG1vdmVUYXJnZXQuY2xhc3NMaXN0LmFkZCgnbW92ZScpO1xyXG5cclxuICAkdG9kb0xpc3RDb250ZW50cy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3ZlQXQpO1xyXG5cclxuICBmdW5jdGlvbiBtb3ZlQXQoZSkge1xyXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnLnRvZG8tbGlzdC1pdGVtJykpIHtcclxuICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgncHJldmlldycpO1xyXG4gICAgfVxyXG4gICAgbW92ZVRhcmdldC5zdHlsZS5sZWZ0ID0gZS5wYWdlWCAtIG1vdmVUYXJnZXQub2Zmc2V0V2lkdGggKyAncHgnO1xyXG4gICAgbW92ZVRhcmdldC5zdHlsZS50b3AgPSBlLnBhZ2VZIC0gbW92ZVRhcmdldC5vZmZzZXRIZWlnaHQgLyAyICsgJ3B4JztcclxuICB9XHJcblxyXG4gIC8vIGVzYyDriIzroIAg7J2EIOuVjCDrk5zrnpjqt7gg7Leo7IaMXHJcbiAgd2luZG93Lm9ua2V5ZG93biA9IChlKSA9PiB7XHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xyXG4gICAgICAkdG9kb0xpc3RDb250ZW50cy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3ZlQXQpO1xyXG4gICAgICBjbGVhckFic29sdXRlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW91c2VPdXRUZXN0RXZlbnQoKSB7XHJcbiAgY2xlYXJBYnNvbHV0ZSgpO1xyXG59XHJcblxyXG4vLyDtlZjri6gg7KCV67O067aAIOydtOuypO2KuCDrpqzsiqTrhIhcclxuJGJ1dHRvbnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpc3RGaWx0ZXIpO1xyXG59KTtcclxuXHJcbi8vIO2VmOuLqCDsoJXrs7TrtoAg67KE7Yq8IO2BtOumrSDsi5wg7J2067Kk7Yq4IOy9lOuTnFxyXG5mdW5jdGlvbiBsaXN0RmlsdGVyKGUpIHtcclxuICAkYnV0dG9ucy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgfSk7XHJcbiAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgcmVuZGVyKCk7XHJcbn1cclxuXHJcbi8vIOyZhOujjCBUb2RvIOyCreygnFxyXG4kY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGVhclRvZG8pO1xyXG5mdW5jdGlvbiBjbGVhclRvZG8oKSB7XHJcbiAgY29uc3QgY2hlY2tEYXRhID0gY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsZWFyIHRoZSB0b2RvbGlzdD8nKTtcclxuICBpZiAoY2hlY2tEYXRhKSB7XHJcbiAgICBjb21wbGV0ZUFycmF5LnNwbGljZSgwKTtcclxuICAgIHJlbmRlcigpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJBYnNvbHV0ZSgpIHtcclxuICBtb3ZlVGFyZ2V0LnN0eWxlLnBvc2l0aW9uID0gJyc7XHJcbiAgbW92ZVRhcmdldC5zdHlsZS56SW5kZXggPSAnJztcclxuICBtb3ZlVGFyZ2V0LnN0eWxlLmxlZnQgPSAnJztcclxuICBtb3ZlVGFyZ2V0LnN0eWxlLnRvcCA9ICcnO1xyXG4gIG1vdmVUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbW92ZScpO1xyXG4gICR0b2RvTGlzdENvbnRlbnRzLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyJyk7XHJcbn1cclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF8wX19fIGZyb20gXCItIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzL3Jlc2V0LmNzc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMV9fXyBmcm9tIFwiLSEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy9zdHlsZS5jc3NcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLmkoX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF8wX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLmkoX19fQ1NTX0xPQURFUl9BVF9SVUxFX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIOumrOyFiyBjc3MgKi9cXHJcXG5cXHJcXG4vKiBzdHlsZSBjc3MgKi9cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvYXBwLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxXQUFXOztBQUdYLGNBQWNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyog66as7IWLIGNzcyAqL1xcclxcbkBpbXBvcnQgdXJsKC4vc3R5bGVzL3Jlc2V0LmNzcyk7XFxyXFxuXFxyXFxuLyogc3R5bGUgY3NzICovXFxyXFxuQGltcG9ydCB1cmwoLi9zdHlsZXMvc3R5bGUuY3NzKTtcIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxudWwsXFxyXFxub2wge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuYSB7XFxyXFxuICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuaW5wdXQge1xcclxcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcclxcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xcclxcbiAgYXBwZWFyYW5jZTogbm9uZTtcXHJcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9yZXNldC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLGlCQUFpQjtBQUNuQjs7QUFFQTs7RUFFRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usd0JBQXdCO0VBQ3hCLHFCQUFxQjtFQUNyQixnQkFBZ0I7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbnVsLFxcclxcbm9sIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmEge1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmlucHV0IHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXHJcXG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcXHJcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qID09PT09PT09PT09IGxheW91dHMgPT09PT09PT09PT09PSAqL1xcclxcbmJ1dHRvbiB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3Qge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YxZjFmMTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWluLWhlaWdodDogMTAwdmg7XFxyXFxuICBwYWRkaW5nLWJvdHRvbTogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC10aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDMwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LXdyYXBwZXIge1xcclxcbiAgd2lkdGg6IDg5LjMzJTtcXHJcXG4gIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgIzExMTtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBwYWRkaW5nOiAyMHB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1pbnB1dCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogNDBweDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgYm9yZGVyOiAxcHggZGFzaGVkICNjY2M7XFxyXFxuICBmb250LXNpemU6IDE0cHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtaW5wdXQ6Zm9jdXMge1xcclxcbiAgb3V0bGluZTogMXB4IHNvbGlkICNlYjQ2NTY7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtaW5wdXQ6OnBsYWNlaG9sZGVyIHtcXHJcXG4gIGNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtY29udGVudHMgLnRvZG8tbGlzdC1pdGVtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgbWluLWhlaWdodDogMjBweDtcXHJcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xcclxcbiAgY29sb3I6ICMwMDA7XFxyXFxuICBmb250LXNpemU6IDEycHg7XFxyXFxuICBwYWRkaW5nOiAxMHB4IDdweCAxMHB4IDBweDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWFic29sdXRlIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWFic29sdXRlLm1vdmUge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgei1pbmRleDogOTk5O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzLmhvdmVyIC50b2RvLWxpc3QtaXRlbTpob3ZlciB7XFxyXFxuICBib3JkZXItbGVmdDogM3B4IHNvbGlkICMxZjgwZmQ7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtY29udGVudHMgLnRvZG8tbGlzdC1pdGVtLm1vdmUge1xcclxcbiAgYm9yZGVyLWJvdHRvbTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1jb250ZW50cyAudG9kby1saXN0LWl0ZW0ucHJldmlldyB7XFxyXFxuICBib3JkZXItbGVmdDogM3B4IHNvbGlkICMxZjgwZmQ7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtY29udGVudHMgLnRvZG8tbGlzdC1pdGVtIHNwYW4ge1xcclxcbiAgcGFkZGluZy1yaWdodDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbS5jb21wbGV0ZSB7XFxyXFxuICAvKiB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDsgKi9cXHJcXG4gIGNvbG9yOiAjY2NjO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbS5jb21wbGV0ZTo6YWZ0ZXIge1xcclxcbiAgY29udGVudDogXFxcIlxcXCI7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIHRvcDogNTAlO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcclxcbiAgcmlnaHQ6IDEwcHg7XFxyXFxuICB3aWR0aDogMjBweDtcXHJcXG4gIGhlaWdodDogMjBweDtcXHJcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxyXFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ2h0dHBzOi8vdzcucG5nd2luZy5jb20vcG5ncy85NzYvODc4L3BuZy10cmFuc3BhcmVudC1ibGFjay1jaGVjay1pbGx1c3RyYXRpb24tYmxhY2stYW5kLXdoaXRlLXBhdHRlcm4tYmxhY2stY2hlY2ttYXJrLWFuZ2xlLXdoaXRlLXNwb3J0LnBuZycpO1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4vKiA9PT09PT09PT0g7ZWY64uoIOygleuztOu2gCA9PT09PT09PT0gKi9cXHJcXG4udG9kby1saXN0LWluZm8ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1idXR0b25zIGJ1dHRvbixcXHJcXG4udG9kby1saXN0LWNsZWFyIGJ1dHRvbiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmMWYxO1xcclxcbiAgY29sb3I6ICMwMDA7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgIzIyMjtcXHJcXG4gIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1idXR0b25zIGJ1dHRvbi5hY3RpdmUge1xcclxcbiAgY29sb3I6ICNlYjQ2NTY7XFxyXFxuICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2ViNDY1NjtcXHJcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsc0NBQXNDO0FBQ3RDO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLDZCQUE2QjtFQUM3QixXQUFXO0VBQ1gsZUFBZTtFQUNmLDBCQUEwQjtFQUMxQixXQUFXO0VBQ1gsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLFdBQVc7RUFDWCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxRQUFRO0VBQ1IsMkJBQTJCO0VBQzNCLFdBQVc7RUFDWCxXQUFXO0VBQ1gsWUFBWTtFQUNaLDRCQUE0QjtFQUM1QixxQkFBcUI7RUFDckIsbUtBQW1LO0FBQ3JLOzs7O0FBSUEsK0JBQStCO0FBQy9CO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsZ0JBQWdCO0VBQ2hCLGVBQWU7QUFDakI7O0FBRUE7O0VBRUUseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsWUFBWTtBQUNkOztBQUVBO0VBQ0UsY0FBYztFQUNkLGdCQUFnQjtFQUNoQix5QkFBeUI7QUFDM0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogPT09PT09PT09PT0gbGF5b3V0cyA9PT09PT09PT09PT09ICovXFxyXFxuYnV0dG9uIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmMWYxO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG4gIHBhZGRpbmctYm90dG9tOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LXRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMzBweDtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3Qtd3JhcHBlciB7XFxyXFxuICB3aWR0aDogODkuMzMlO1xcclxcbiAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAjMTExO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWlucHV0IHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBib3JkZXI6IDFweCBkYXNoZWQgI2NjYztcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1pbnB1dDpmb2N1cyB7XFxyXFxuICBvdXRsaW5lOiAxcHggc29saWQgI2ViNDY1NjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1pbnB1dDo6cGxhY2Vob2xkZXIge1xcclxcbiAgY29sb3I6ICNjY2M7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtY29udGVudHMge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1jb250ZW50cyAudG9kby1saXN0LWl0ZW0ge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBtaW4taGVpZ2h0OiAyMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XFxyXFxuICBjb2xvcjogIzAwMDtcXHJcXG4gIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gIHBhZGRpbmc6IDEwcHggN3B4IDEwcHggMHB4O1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtYWJzb2x1dGUge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtYWJzb2x1dGUubW92ZSB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB6LWluZGV4OiA5OTk7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtY29udGVudHMuaG92ZXIgLnRvZG8tbGlzdC1pdGVtOmhvdmVyIHtcXHJcXG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzFmODBmZDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1jb250ZW50cyAudG9kby1saXN0LWl0ZW0ubW92ZSB7XFxyXFxuICBib3JkZXItYm90dG9tOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbS5wcmV2aWV3IHtcXHJcXG4gIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzFmODBmZDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1jb250ZW50cyAudG9kby1saXN0LWl0ZW0gc3BhbiB7XFxyXFxuICBwYWRkaW5nLXJpZ2h0OiA1cHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtY29udGVudHMgLnRvZG8tbGlzdC1pdGVtLmNvbXBsZXRlIHtcXHJcXG4gIC8qIHRleHQtZGVjb3JhdGlvbjogbGluZS10aHJvdWdoOyAqL1xcclxcbiAgY29sb3I6ICNjY2M7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtY29udGVudHMgLnRvZG8tbGlzdC1pdGVtLmNvbXBsZXRlOjphZnRlciB7XFxyXFxuICBjb250ZW50OiBcXFwiXFxcIjtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgdG9wOiA1MCU7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxyXFxuICByaWdodDogMTBweDtcXHJcXG4gIHdpZHRoOiAyMHB4O1xcclxcbiAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgnaHR0cHM6Ly93Ny5wbmd3aW5nLmNvbS9wbmdzLzk3Ni84NzgvcG5nLXRyYW5zcGFyZW50LWJsYWNrLWNoZWNrLWlsbHVzdHJhdGlvbi1ibGFjay1hbmQtd2hpdGUtcGF0dGVybi1ibGFjay1jaGVja21hcmstYW5nbGUtd2hpdGUtc3BvcnQucG5nJyk7XFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbi8qID09PT09PT09PSDtlZjri6gg7KCV67O067aAID09PT09PT09PSAqL1xcclxcbi50b2RvLWxpc3QtaW5mbyB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgZm9udC1zaXplOiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWJ1dHRvbnMgYnV0dG9uLFxcclxcbi50b2RvLWxpc3QtY2xlYXIgYnV0dG9uIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7XFxyXFxuICBjb2xvcjogIzAwMDtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAjMjIyO1xcclxcbiAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWJ1dHRvbnMgYnV0dG9uLmFjdGl2ZSB7XFxyXFxuICBjb2xvcjogI2ViNDY1NjtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAjZWI0NjU2O1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKlxyXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XHJcbiAgdmFyIGxpc3QgPSBbXTtcclxuXHJcbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XHJcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcclxuICAgICAgaWYgKGl0ZW1bNF0pIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW1bMl0pIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XHJcbiAgICAgIH1cclxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xyXG4gICAgICBpZiAobmVlZExheWVyKSB7XHJcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbVsyXSkge1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW1bNF0pIHtcclxuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfSkuam9pbihcIlwiKTtcclxuICB9O1xyXG5cclxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XHJcbiAgICB9XHJcbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG4gICAgaWYgKGRlZHVwZSkge1xyXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xyXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcclxuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xyXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XHJcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChtZWRpYSkge1xyXG4gICAgICAgIGlmICghaXRlbVsyXSkge1xyXG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcclxuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHN1cHBvcnRzKSB7XHJcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XHJcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xyXG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICByZXR1cm4gbGlzdDtcclxufTsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XHJcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xyXG4gIGlmICghY3NzTWFwcGluZykge1xyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XHJcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XHJcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcclxuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcclxuICB9XHJcbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xyXG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcclxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xyXG4gIHZhciByZXN1bHQgPSAtMTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xyXG4gICAgICByZXN1bHQgPSBpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xyXG4gIHZhciBpZENvdW50TWFwID0ge307XHJcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XHJcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcclxuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XHJcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcclxuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xyXG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XHJcbiAgICB2YXIgb2JqID0ge1xyXG4gICAgICBjc3M6IGl0ZW1bMV0sXHJcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxyXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXHJcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxyXG4gICAgICBsYXllcjogaXRlbVs1XVxyXG4gICAgfTtcclxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcclxuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcclxuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XHJcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XHJcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XHJcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcclxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxyXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xyXG4gIH1cclxuICByZXR1cm4gaWRlbnRpZmllcnM7XHJcbn1cclxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcclxuICBhcGkudXBkYXRlKG9iaik7XHJcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xyXG4gICAgaWYgKG5ld09iaikge1xyXG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFwaS5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiB1cGRhdGVyO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICBsaXN0ID0gbGlzdCB8fCBbXTtcclxuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xyXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcclxuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XHJcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XHJcbiAgICB9XHJcbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xyXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcclxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcclxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xyXG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xyXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XHJcbiAgfTtcclxufTsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBtZW1vID0ge307XHJcblxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cclxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xyXG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XHJcblxyXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcclxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxyXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXHJcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XHJcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcclxuICB9XHJcbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcclxufVxyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXHJcbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xyXG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcclxuICBpZiAoIXRhcmdldCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcclxuICB9XHJcbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcclxuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xyXG4gIHJldHVybiBlbGVtZW50O1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXHJcbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcclxuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XHJcbiAgaWYgKG5vbmNlKSB7XHJcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xyXG4gIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xyXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xyXG4gIHZhciBjc3MgPSBcIlwiO1xyXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcclxuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XHJcbiAgfVxyXG4gIGlmIChvYmoubWVkaWEpIHtcclxuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xyXG4gIH1cclxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcclxuICBpZiAobmVlZExheWVyKSB7XHJcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XHJcbiAgfVxyXG4gIGNzcyArPSBvYmouY3NzO1xyXG4gIGlmIChuZWVkTGF5ZXIpIHtcclxuICAgIGNzcyArPSBcIn1cIjtcclxuICB9XHJcbiAgaWYgKG9iai5tZWRpYSkge1xyXG4gICAgY3NzICs9IFwifVwiO1xyXG4gIH1cclxuICBpZiAob2JqLnN1cHBvcnRzKSB7XHJcbiAgICBjc3MgKz0gXCJ9XCI7XHJcbiAgfVxyXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xyXG4gIH1cclxuXHJcbiAgLy8gRm9yIG9sZCBJRVxyXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cclxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcclxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxufVxyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXHJcbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcclxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxyXG4gICAgfTtcclxuICB9XHJcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG4gIHJldHVybiB7XHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcclxuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xyXG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXHJcbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XHJcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vYXBwLmNzcyc7XHJcbmltcG9ydCAnLi9hcHAuanMnOyJdLCJuYW1lcyI6WyIkdG9kb0xpc3RDb250ZW50cyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRpbnB1dCIsIiRidXR0b25zIiwicXVlcnlTZWxlY3RvckFsbCIsIiRjbGVhckJ1dHRvbiIsInByb2dyZXNzQXJyYXkiLCJjb21wbGV0ZUFycmF5IiwiZG93blRpbWVTdGFtcCIsInVwVGltZVN0YW1wIiwiaXRlbUlkIiwibW92ZVRhcmdldCIsIm1vdmVUYXJnZXRJZCIsImNoZWNrIiwidXBJbmRleCIsImRvd25JbmRleCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5Q29kZSIsInRhcmdldCIsInZhbHVlIiwiY3JlYXRlVG9kbyIsIlRvZG9JdGVtIiwiaWQiLCJkZXNjcmlwdGlvbiIsImNyZWF0RHR0bSIsImtleSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsInN0YXR1cyIsImNvbXBsZXRlRHR0bSIsIl9jbGFzc0NhbGxDaGVjayIsIl9jcmVhdGVDbGFzcyIsImNvbXBsZXRlSXRlbSIsIkRhdGUiLCJnZXRUaW1lIiwiY2FuY2VsSXRlbSIsInJlbmRlciIsInR5cGUiLCJpdGVtcyIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY29uY2F0Iiwic29ydCIsImEiLCJiIiwiY2hpbGRyZW4iLCJpbm5lclRleHQiLCJpbm5lckhUTUwiLCJtYXAiLCJpdGVtIiwiam9pbiIsInVuc2hpZnQiLCJwdXNoIiwibW91c2VEb3duRXZlbnQiLCJtb3VzZVVwRXZlbnQiLCJ0aW1lU3RhbXAiLCJ0YWdOYW1lIiwicGFyZW50Tm9kZSIsImFkZCIsImRyYWdFdmVudCIsIm1vdXNlT3V0VGVzdEV2ZW50IiwiY2xpY2tJbmRleCIsIk51bWJlciIsImZpbmRJbmRleCIsIngiLCJyZW1vdmUiLCJ0YXJnZXRJZCIsInRvdGFsQXJyYXkiLCJmb3JFYWNoIiwiZWwiLCJpZHgiLCJjb25zb2xlIiwibG9nIiwic3BsaWNlIiwidXBJZCIsInNvcnRBcnJLZXkiLCJkb3duQXJya2V5IiwiY2xlYXJBYnNvbHV0ZSIsIm1vdmVBdCIsInN0eWxlIiwibGVmdCIsInBhZ2VYIiwib2Zmc2V0V2lkdGgiLCJ0b3AiLCJwYWdlWSIsIm9mZnNldEhlaWdodCIsIndpbmRvdyIsIm9ua2V5ZG93biIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJsaXN0RmlsdGVyIiwiY2xlYXJUb2RvIiwiY2hlY2tEYXRhIiwiY29uZmlybSIsInBvc2l0aW9uIiwiekluZGV4Il0sInNvdXJjZVJvb3QiOiIifQ==