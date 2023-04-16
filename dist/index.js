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
var picked = null;
var pickedIndex = null;
var delay = function delay(ms) {
  setTimeout(function () {
    console.log('hi');
  }, ms);
};

// createTodo
$input.addEventListener('keypress', function (e) {
  if (e.keyCode === 13 && e.target.value) {
    createTodo(e);
  }
});
// input enter
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
var render = function render() {
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
  items.sort(function (a, b) {
    if (a.key < b.key && a.status === 'progress' && b.status === 'progress') {
      return 1;
    }
    if (a.key > b.key && a.status === 'progress' && b.status === 'progress') {
      return -1;
    }
    return 0;
  });

  // 하단 정보부 버튼 카운트 관리
  $clearButton.children[1].innerText = "(".concat(completeArray.length, ")");
  document.querySelector('.todo-list-counter').innerHTML = items.length;
  $todoListContents.innerHTML = "\n  ".concat(items.map(function (item) {
    return "\n  <li class=\"todo-list-item ".concat(item.status, "\" id=\"").concat(item.id, "\">\n    <div class=\"todo-list-absolute\">\n      <span class=\"material-icons\" dropzone=\"true\">\n        drag_handle\n      </span>\n      <span>\n        ").concat(item.description, "\n      </span>\n    </div>\n  </li>");
  }).join(''));
};
// 랜더 함수 끝

var createTodo = function createTodo(e) {
  var $todoListItems = document.querySelectorAll('.todo-list-item');
  var $todoListCounter = document.querySelector('.todo-list-counter');
  var item = new TodoItem(itemId++, e.target.value, new Date().getTime());
  progressArray.length > 0 ? progressArray.unshift(item) : progressArray.push(item);
  e.target.value = '';
  render();

  // 테스트
  // const dragSrcEl = document.querySelector('.material-icons');
  // dragSrcEl.addEventListener('mousedown', handleMouseDown);
};

$todoListContents.addEventListener('mousedown', contentsActiveEvent);
$todoListContents.addEventListener('mouseup', mouseUpTestEvent);

// 투두리스트 눌렀을 때 발생하는 이벤트 mousedown
function contentsActiveEvent(event) {
  downTimeStamp = event.timeStamp;
  if (event.target.tagName !== 'LI') {
    return false;
  }
}

// 이벤트 mouseup
function mouseUpTestEvent(e) {
  console.log(downTimeStamp, 'asdsa', e.timeStamp);
  upTimeStamp = e.timeStamp;
  if (upTimeStamp - downTimeStamp > 800) {
    //2초이상 눌렸을 때 코드 실행
    console.log('0.8초이상');
    // 떳어 들어 올렸어 여기 밑에 요소 인덱스 체크해
  } else {
    console.log('0.8초미만', downTimeStamp);
    var targetId = e.target.id;
    var totalArray = [].concat(progressArray, completeArray);
    totalArray.forEach(function (el, idx) {
      if (el.id === Number(targetId)) {
        if (el.status === 'progress') {
          el.completeItem();
          console.log(idx, 'index');
          progressArray.splice(idx, 1);
          completeArray.push(el);
          console.log(progressArray, 'asd', completeArray);
        } else {
          el.cancelItem();
          completeArray.splice(idx - progressArray.length, 1);
          progressArray.push(el);
        }
        render();
      }
    });
  }
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

// function handleMouseDown(e) {
//   e.preventDefault();
//   picked = e.target.parentNode;
//   pickedIndex = [...picked.parentNode.parentNode.children].indexOf(
//     picked.parentNode
//   );
//   const el = e.target.parentNode;
//   el.classList.add('move');
//   const $area = document.querySelector('.todo-list-wrapper');
//   const pointerWidthArea =
//     document.querySelector('.todo-list-wrapper').offsetWidth + 20;
//   const pointerHeightArea =
//     document.querySelector('.todo-list-wrapper').offsetHeight + 20;

//   moveAt(e.pageX, e.pageY);
//   function moveAt(pageX, pageY) {
//     el.style.left = pageX - el.offsetWidth / 3 + 'px';
//     el.style.top = pageY - el.offsetHeight / 2 + 'px';
//   }
//   function onMouseMove(event) {
//     if (
//       parseInt(el.style.left) < (window.innerWidth - pointerWidthArea) / 2 ||
//       parseInt(el.style.top) < $area.offsetTop ||
//       parseInt(el.style.top) > pointerHeightArea ||
//       parseInt(el.style.left) > pointerWidthArea
//     ) {
//       clearAbsolute(el);
//       el.onmouseup = null;
//       document.removeEventListener('mousemove', onMouseMove);
//       el.removeEventListener('mouseup', mouseUpEvent);
//       return false;
//     }
//     moveAt(event.pageX, event.pageY);
//   }

//   document.addEventListener('mousemove', onMouseMove);
//   const mouseUpEvent = function (event) {
//     el.style.display = 'none';
//     const dropZone = document.elementFromPoint(event.clientX, event.clientY);
//     el.style.display = 'flex';
//     const index = [
//       ...dropZone.parentNode.parentNode.parentNode.children,
//     ].indexOf(dropZone.parentNode.parentNode);
//     document.removeEventListener('mousemove', onMouseMove);
//     el.onmouseup = null;

//     // console.log(index, pickedIndex, dropZone.parentNode.parentNode, dropZone);
//     if (!dropZone.parentNode.classList.contains('todo-list-absolute')) {
//       clearAbsolute(el);
//       return false;
//     }

//     if (index > pickedIndex) {
//       dropZone.parentNode.parentNode.after(picked.parentNode);
//     } else {
//       dropZone.parentNode.parentNode.before(picked.parentNode);
//     }

//     clearAbsolute(el);
//     console.log(mouseUpEvent);
//     el.removeEventListener('mouseup', mouseUpEvent);
//   };
//   el.addEventListener('mouseup', mouseUpEvent);
//   window.onkeydown = (e) => {
//     if (e.keyCode === 27) {
//       el.removeEventListener('mouseup', mouseUpEvent);
//       document.removeEventListener('mousemove', onMouseMove);
//       clearAbsolute(el);
//     }
//   };

//   function clearAbsolute(el) {
//     el.style.position = '';
//     el.style.zIndex = '';
//     el.style.left = '';
//     el.style.top = '';
//     el.classList.remove('move');
//   }
// }

function clearAbsolute(el) {
  el.style.position = '';
  el.style.zIndex = '';
  el.style.left = '';
  el.style.top = '';
  el.classList.remove('move');
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  /* user-select: none; */\r\n}\r\n\r\nul,\r\nol {\r\n  list-style: none;\r\n}\r\n\r\na {\r\n  color: inherit;\r\n  text-decoration: none;\r\n}\r\n\r\ninput {\r\n  -webkit-appearance: none;\r\n  -moz-appearance: none;\r\n  appearance: none;\r\n}", "",{"version":3,"sources":["webpack://./src/styles/reset.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,uBAAuB;AACzB;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,wBAAwB;EACxB,qBAAqB;EACrB,gBAAgB;AAClB","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  /* user-select: none; */\r\n}\r\n\r\nul,\r\nol {\r\n  list-style: none;\r\n}\r\n\r\na {\r\n  color: inherit;\r\n  text-decoration: none;\r\n}\r\n\r\ninput {\r\n  -webkit-appearance: none;\r\n  -moz-appearance: none;\r\n  appearance: none;\r\n}"],"sourceRoot":""}]);
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
___CSS_LOADER_EXPORT___.push([module.id, "/* =========== layouts ============= */\r\nbutton {\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list {\r\n  background-color: #f1f1f1;\r\n  width: 100%;\r\n  min-height: 100vh;\r\n  padding-bottom: 40px;\r\n}\r\n\r\n.todo-list-title {\r\n  font-size: 30px;\r\n  text-align: center;\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.todo-list-wrapper {\r\n  width: 89.33%;\r\n  margin: 0 auto;\r\n  border: 1px solid #111;\r\n  box-sizing: border-box;\r\n  padding: 20px;\r\n  background-color: #fff;\r\n}\r\n\r\n.todo-list-input {\r\n  width: 100%;\r\n  height: 40px;\r\n  box-sizing: border-box;\r\n  padding: 10px;\r\n  border: 1px dashed #ccc;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-input:focus {\r\n  outline: 1px solid #eb4656;\r\n}\r\n\r\n.todo-list-input::placeholder {\r\n  color: #ccc;\r\n}\r\n\r\n.todo-list-contents {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.todo-list-contents .todo-list-item {\r\n  display: flex;\r\n  align-items: center;\r\n  min-height: 20px;\r\n  border-bottom: 1px solid #ccc;\r\n  color: #000;\r\n  font-size: 12px;\r\n  padding: 10px 7px 10px 0px;\r\n  width: 100%;\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list-absolute {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.todo-list-absolute.move {\r\n  position: absolute;\r\n  z-index: 999;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.move {\r\n  border-bottom: none;\r\n}\r\n\r\n.todo-list-contents .todo-list-item span {\r\n  margin-right: 5px;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.complete {\r\n  /* text-decoration: line-through; */\r\n  color: #ccc;\r\n}\r\n\r\n/* ========= 하단 정보부 ========= */\r\n.todo-list-info {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-top: 10px;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-buttons button,\r\n.todo-list-clear button {\r\n  background-color: #f1f1f1;\r\n  color: #000;\r\n  outline: none;\r\n  border-radius: 2px;\r\n  border: 1px solid #222;\r\n  font-size: 12px;\r\n  padding: 5px;\r\n}\r\n\r\n.todo-list-buttons button.active {\r\n  color: #eb4656;\r\n  font-weight: 500;\r\n  border: 1px solid #eb4656;\r\n}", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA,sCAAsC;AACtC;EACE,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,sBAAsB;EACtB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,eAAe;AACjB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,gBAAgB;EAChB,6BAA6B;EAC7B,WAAW;EACX,eAAe;EACf,0BAA0B;EAC1B,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,mCAAmC;EACnC,WAAW;AACb;;AAEA,+BAA+B;AAC/B;EACE,WAAW;EACX,aAAa;EACb,8BAA8B;EAC9B,gBAAgB;EAChB,eAAe;AACjB;;AAEA;;EAEE,yBAAyB;EACzB,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,sBAAsB;EACtB,eAAe;EACf,YAAY;AACd;;AAEA;EACE,cAAc;EACd,gBAAgB;EAChB,yBAAyB;AAC3B","sourcesContent":["/* =========== layouts ============= */\r\nbutton {\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list {\r\n  background-color: #f1f1f1;\r\n  width: 100%;\r\n  min-height: 100vh;\r\n  padding-bottom: 40px;\r\n}\r\n\r\n.todo-list-title {\r\n  font-size: 30px;\r\n  text-align: center;\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.todo-list-wrapper {\r\n  width: 89.33%;\r\n  margin: 0 auto;\r\n  border: 1px solid #111;\r\n  box-sizing: border-box;\r\n  padding: 20px;\r\n  background-color: #fff;\r\n}\r\n\r\n.todo-list-input {\r\n  width: 100%;\r\n  height: 40px;\r\n  box-sizing: border-box;\r\n  padding: 10px;\r\n  border: 1px dashed #ccc;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-input:focus {\r\n  outline: 1px solid #eb4656;\r\n}\r\n\r\n.todo-list-input::placeholder {\r\n  color: #ccc;\r\n}\r\n\r\n.todo-list-contents {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.todo-list-contents .todo-list-item {\r\n  display: flex;\r\n  align-items: center;\r\n  min-height: 20px;\r\n  border-bottom: 1px solid #ccc;\r\n  color: #000;\r\n  font-size: 12px;\r\n  padding: 10px 7px 10px 0px;\r\n  width: 100%;\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list-absolute {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.todo-list-absolute.move {\r\n  position: absolute;\r\n  z-index: 999;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.move {\r\n  border-bottom: none;\r\n}\r\n\r\n.todo-list-contents .todo-list-item span {\r\n  margin-right: 5px;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.complete {\r\n  /* text-decoration: line-through; */\r\n  color: #ccc;\r\n}\r\n\r\n/* ========= 하단 정보부 ========= */\r\n.todo-list-info {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-top: 10px;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-buttons button,\r\n.todo-list-clear button {\r\n  background-color: #f1f1f1;\r\n  color: #000;\r\n  outline: none;\r\n  border-radius: 2px;\r\n  border: 1px solid #222;\r\n  font-size: 12px;\r\n  padding: 5px;\r\n}\r\n\r\n.todo-list-buttons button.active {\r\n  color: #eb4656;\r\n  font-weight: 500;\r\n  border: 1px solid #eb4656;\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7QUNBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uaG4vLi9zcmMvYXBwLmpzIiwid2VicGFjazovL25obi8uL3NyYy9hcHAuY3NzIiwid2VicGFjazovL25obi8uL3NyYy9zdHlsZXMvcmVzZXQuY3NzIiwid2VicGFjazovL25obi8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL25obi8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vbmhuLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vbmhuLy4vc3JjL2FwcC5jc3M/YTY3MiIsIndlYnBhY2s6Ly9uaG4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vbmhuLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9uaG4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vbmhuLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL25obi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL25obi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL25obi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9uaG4vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbmhuL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9uaG4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9uaG4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9uaG4vd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL25obi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCAkdG9kb0xpc3RDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QtY29udGVudHMnKTtcclxuY29uc3QgJGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC1pbnB1dCcpO1xyXG5jb25zdCAkYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2RvLWxpc3QtYnV0dG9ucyBidXR0b24nKTtcclxuY29uc3QgJGNsZWFyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC1jbGVhciA+IGJ1dHRvbicpO1xyXG5jb25zdCBwcm9ncmVzc0FycmF5ID0gW107XHJcbmNvbnN0IGNvbXBsZXRlQXJyYXkgPSBbXTtcclxubGV0IGRvd25UaW1lU3RhbXAgPSBudWxsO1xyXG5sZXQgdXBUaW1lU3RhbXAgPSBudWxsO1xyXG5sZXQgaXRlbUlkID0gMDtcclxubGV0IHBpY2tlZCA9IG51bGw7XHJcbmxldCBwaWNrZWRJbmRleCA9IG51bGw7XHJcblxyXG5jb25zdCBkZWxheSA9IChtcykgPT4ge1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coJ2hpJyk7XHJcbiAgfSwgbXMpO1xyXG59O1xyXG5cclxuLy8gY3JlYXRlVG9kb1xyXG4kaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xyXG4gIGlmIChlLmtleUNvZGUgPT09IDEzICYmIGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICBjcmVhdGVUb2RvKGUpO1xyXG4gIH1cclxufSk7XHJcbi8vIGlucHV0IGVudGVyXHJcblxyXG5jbGFzcyBUb2RvSXRlbSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBpZCxcclxuICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgY3JlYXREdHRtLFxyXG4gICAga2V5ID0gaWQsXHJcbiAgICBzdGF0dXMgPSAncHJvZ3Jlc3MnLFxyXG4gICAgY29tcGxldGVEdHRtXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLmNyZWF0RHR0bSA9IGNyZWF0RHR0bTtcclxuICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICB0aGlzLmNvbXBsZXRlRHR0bSA9IGNvbXBsZXRlRHR0bTtcclxuICB9XHJcblxyXG4gIGNvbXBsZXRlSXRlbSgpIHtcclxuICAgIHRoaXMuY29tcGxldGVEdHRtID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB0aGlzLnN0YXR1cyA9ICdjb21wbGV0ZSc7XHJcbiAgfVxyXG5cclxuICBjYW5jZWxJdGVtKCkge1xyXG4gICAgdGhpcy5jb21wbGV0ZUR0dG0gPSBudWxsO1xyXG4gICAgdGhpcy5zdGF0dXMgPSAncHJvZ3Jlc3MnO1xyXG4gIH1cclxufVxyXG5cclxuLy8g656c642UIO2VqOyImFxyXG5jb25zdCByZW5kZXIgPSAoKSA9PiB7XHJcbiAgbGV0IGl0ZW1zO1xyXG4gIGNvbnN0ICRidXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZG8tbGlzdC1idXR0b25zID4gYnV0dG9uJyk7XHJcblxyXG4gIC8vIO2VmOuNmCDrsoTtirwg7KCV67O067aAIOuIjOuggOydhCDrlYxcclxuICBpZiAoJGJ1dHRvbnNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgLy8gYWxsIOuIjOugpCDsnojsnYQg65WMXHJcbiAgICBpdGVtcyA9IFsuLi5wcm9ncmVzc0FycmF5LCAuLi5jb21wbGV0ZUFycmF5XTtcclxuICB9IGVsc2UgaWYgKCRidXR0b25zWzFdLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgIC8vIGFjdGl2ZSDriIzroIAg7J6I7J2EIOuVjFxyXG4gICAgaXRlbXMgPSBbLi4ucHJvZ3Jlc3NBcnJheV07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIOy7tO2UjOumrO2KuCDriIzroKQg7J6I7J2EIOuVjFxyXG4gICAgaXRlbXMgPSBbLi4uY29tcGxldGVBcnJheV07XHJcbiAgfVxyXG5cclxuICBpdGVtcy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICBpZiAoYS5rZXkgPCBiLmtleSAmJiBhLnN0YXR1cyA9PT0gJ3Byb2dyZXNzJyAmJiBiLnN0YXR1cyA9PT0gJ3Byb2dyZXNzJykge1xyXG4gICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuICAgIGlmIChhLmtleSA+IGIua2V5ICYmIGEuc3RhdHVzID09PSAncHJvZ3Jlc3MnICYmIGIuc3RhdHVzID09PSAncHJvZ3Jlc3MnKSB7XHJcbiAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG4gIH0pO1xyXG5cclxuICAvLyDtlZjri6gg7KCV67O067aAIOuyhO2KvCDsubTsmrTtirgg6rSA66asXHJcbiAgJGNsZWFyQnV0dG9uLmNoaWxkcmVuWzFdLmlubmVyVGV4dCA9IGAoJHtjb21wbGV0ZUFycmF5Lmxlbmd0aH0pYDtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0LWNvdW50ZXInKS5pbm5lckhUTUwgPSBpdGVtcy5sZW5ndGg7XHJcblxyXG4gICR0b2RvTGlzdENvbnRlbnRzLmlubmVySFRNTCA9IGBcclxuICAke2l0ZW1zXHJcbiAgICAgIC5tYXAoXHJcbiAgICAgICAgKGl0ZW0pID0+IGBcclxuICA8bGkgY2xhc3M9XCJ0b2RvLWxpc3QtaXRlbSAke2l0ZW0uc3RhdHVzfVwiIGlkPVwiJHtpdGVtLmlkfVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInRvZG8tbGlzdC1hYnNvbHV0ZVwiPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgZHJvcHpvbmU9XCJ0cnVlXCI+XHJcbiAgICAgICAgZHJhZ19oYW5kbGVcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8c3Bhbj5cclxuICAgICAgICAke2l0ZW0uZGVzY3JpcHRpb259XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvbGk+YFxyXG4gICAgICApXHJcbiAgICAgIC5qb2luKCcnKX1gO1xyXG59O1xyXG4vLyDrnpzrjZQg7ZWo7IiYIOuBnVxyXG5cclxuY29uc3QgY3JlYXRlVG9kbyA9IChlKSA9PiB7XHJcbiAgY29uc3QgJHRvZG9MaXN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1saXN0LWl0ZW0nKTtcclxuICBjb25zdCAkdG9kb0xpc3RDb3VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC1jb3VudGVyJyk7XHJcbiAgY29uc3QgaXRlbSA9IG5ldyBUb2RvSXRlbShpdGVtSWQrKywgZS50YXJnZXQudmFsdWUsIG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICBwcm9ncmVzc0FycmF5Lmxlbmd0aCA+IDBcclxuICAgID8gcHJvZ3Jlc3NBcnJheS51bnNoaWZ0KGl0ZW0pXHJcbiAgICA6IHByb2dyZXNzQXJyYXkucHVzaChpdGVtKTtcclxuICBlLnRhcmdldC52YWx1ZSA9ICcnO1xyXG4gIHJlbmRlcigpO1xyXG5cclxuICAvLyDthYzsiqTtirhcclxuICAvLyBjb25zdCBkcmFnU3JjRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWF0ZXJpYWwtaWNvbnMnKTtcclxuICAvLyBkcmFnU3JjRWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgaGFuZGxlTW91c2VEb3duKTtcclxufTtcclxuXHJcbiR0b2RvTGlzdENvbnRlbnRzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGNvbnRlbnRzQWN0aXZlRXZlbnQpO1xyXG4kdG9kb0xpc3RDb250ZW50cy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcFRlc3RFdmVudCk7XHJcblxyXG4vLyDtiKzrkZDrpqzsiqTtirgg64iM66CA7J2EIOuVjCDrsJzsg53tlZjripQg7J2067Kk7Yq4IG1vdXNlZG93blxyXG5mdW5jdGlvbiBjb250ZW50c0FjdGl2ZUV2ZW50KGV2ZW50KSB7XHJcbiAgZG93blRpbWVTdGFtcCA9IGV2ZW50LnRpbWVTdGFtcDtcclxuICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgIT09ICdMSScpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOydtOuypO2KuCBtb3VzZXVwXHJcbmZ1bmN0aW9uIG1vdXNlVXBUZXN0RXZlbnQoZSkge1xyXG4gIGNvbnNvbGUubG9nKGRvd25UaW1lU3RhbXAsICdhc2RzYScsIGUudGltZVN0YW1wKTtcclxuICB1cFRpbWVTdGFtcCA9IGUudGltZVN0YW1wO1xyXG4gIGlmICh1cFRpbWVTdGFtcCAtIGRvd25UaW1lU3RhbXAgPiA4MDApIHtcclxuICAgIC8vMuy0iOydtOyDgSDriIzroLjsnYQg65WMIOy9lOuTnCDsi6TtlolcclxuICAgIGNvbnNvbGUubG9nKCcwLjjstIjsnbTsg4EnKTtcclxuICAgIC8vIOuWs+yWtCDrk6TslrQg7Jis66C47Ja0IOyXrOq4sCDrsJHsl5Ag7JqU7IaMIOyduOuNseyKpCDssrTtgaztlbRcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJzAuOOy0iOuvuOunjCcsIGRvd25UaW1lU3RhbXApO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldElkID0gZS50YXJnZXQuaWQ7XHJcbiAgICBjb25zdCB0b3RhbEFycmF5ID0gWy4uLnByb2dyZXNzQXJyYXksIC4uLmNvbXBsZXRlQXJyYXldO1xyXG5cclxuICAgIHRvdGFsQXJyYXkuZm9yRWFjaCgoZWwsIGlkeCkgPT4ge1xyXG4gICAgICBpZiAoZWwuaWQgPT09IE51bWJlcih0YXJnZXRJZCkpIHtcclxuICAgICAgICBpZiAoZWwuc3RhdHVzID09PSAncHJvZ3Jlc3MnKSB7XHJcbiAgICAgICAgICBlbC5jb21wbGV0ZUl0ZW0oKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGlkeCwgJ2luZGV4Jyk7XHJcbiAgICAgICAgICBwcm9ncmVzc0FycmF5LnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgY29tcGxldGVBcnJheS5wdXNoKGVsKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHByb2dyZXNzQXJyYXksICdhc2QnLCBjb21wbGV0ZUFycmF5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZWwuY2FuY2VsSXRlbSgpO1xyXG4gICAgICAgICAgY29tcGxldGVBcnJheS5zcGxpY2UoaWR4IC0gcHJvZ3Jlc3NBcnJheS5sZW5ndGgsIDEpO1xyXG4gICAgICAgICAgcHJvZ3Jlc3NBcnJheS5wdXNoKGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuLy8g7ZWY64uoIOygleuztOu2gCDsnbTrsqTtirgg66as7Iqk64SIXHJcbiRidXR0b25zLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsaXN0RmlsdGVyKTtcclxufSk7XHJcblxyXG4vLyDtlZjri6gg7KCV67O067aAIOuyhO2KvCDtgbTrpq0g7IucIOydtOuypO2KuCDsvZTrk5xcclxuZnVuY3Rpb24gbGlzdEZpbHRlcihlKSB7XHJcbiAgJGJ1dHRvbnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gIH0pO1xyXG4gIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gIHJlbmRlcigpO1xyXG59XHJcblxyXG4vLyDsmYTro4wgVG9kbyDsgq3soJxcclxuJGNsZWFyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYXJUb2RvKTtcclxuZnVuY3Rpb24gY2xlYXJUb2RvKCkge1xyXG4gIGNvbnN0IGNoZWNrRGF0YSA9IGNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbGVhciB0aGUgdG9kb2xpc3Q/Jyk7XHJcbiAgaWYgKGNoZWNrRGF0YSkge1xyXG4gICAgY29tcGxldGVBcnJheS5zcGxpY2UoMCk7XHJcbiAgICByZW5kZXIoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93bihlKSB7XHJcbi8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4vLyAgIHBpY2tlZCA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XHJcbi8vICAgcGlja2VkSW5kZXggPSBbLi4ucGlja2VkLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZHJlbl0uaW5kZXhPZihcclxuLy8gICAgIHBpY2tlZC5wYXJlbnROb2RlXHJcbi8vICAgKTtcclxuLy8gICBjb25zdCBlbCA9IGUudGFyZ2V0LnBhcmVudE5vZGU7XHJcbi8vICAgZWwuY2xhc3NMaXN0LmFkZCgnbW92ZScpO1xyXG4vLyAgIGNvbnN0ICRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC13cmFwcGVyJyk7XHJcbi8vICAgY29uc3QgcG9pbnRlcldpZHRoQXJlYSA9XHJcbi8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0LXdyYXBwZXInKS5vZmZzZXRXaWR0aCArIDIwO1xyXG4vLyAgIGNvbnN0IHBvaW50ZXJIZWlnaHRBcmVhID1cclxuLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3Qtd3JhcHBlcicpLm9mZnNldEhlaWdodCArIDIwO1xyXG5cclxuLy8gICBtb3ZlQXQoZS5wYWdlWCwgZS5wYWdlWSk7XHJcbi8vICAgZnVuY3Rpb24gbW92ZUF0KHBhZ2VYLCBwYWdlWSkge1xyXG4vLyAgICAgZWwuc3R5bGUubGVmdCA9IHBhZ2VYIC0gZWwub2Zmc2V0V2lkdGggLyAzICsgJ3B4JztcclxuLy8gICAgIGVsLnN0eWxlLnRvcCA9IHBhZ2VZIC0gZWwub2Zmc2V0SGVpZ2h0IC8gMiArICdweCc7XHJcbi8vICAgfVxyXG4vLyAgIGZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50KSB7XHJcbi8vICAgICBpZiAoXHJcbi8vICAgICAgIHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpIDwgKHdpbmRvdy5pbm5lcldpZHRoIC0gcG9pbnRlcldpZHRoQXJlYSkgLyAyIHx8XHJcbi8vICAgICAgIHBhcnNlSW50KGVsLnN0eWxlLnRvcCkgPCAkYXJlYS5vZmZzZXRUb3AgfHxcclxuLy8gICAgICAgcGFyc2VJbnQoZWwuc3R5bGUudG9wKSA+IHBvaW50ZXJIZWlnaHRBcmVhIHx8XHJcbi8vICAgICAgIHBhcnNlSW50KGVsLnN0eWxlLmxlZnQpID4gcG9pbnRlcldpZHRoQXJlYVxyXG4vLyAgICAgKSB7XHJcbi8vICAgICAgIGNsZWFyQWJzb2x1dGUoZWwpO1xyXG4vLyAgICAgICBlbC5vbm1vdXNldXAgPSBudWxsO1xyXG4vLyAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbi8vICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwRXZlbnQpO1xyXG4vLyAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICB9XHJcbi8vICAgICBtb3ZlQXQoZXZlbnQucGFnZVgsIGV2ZW50LnBhZ2VZKTtcclxuLy8gICB9XHJcblxyXG4vLyAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcclxuLy8gICBjb25zdCBtb3VzZVVwRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuLy8gICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbi8vICAgICBjb25zdCBkcm9wWm9uZSA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XHJcbi8vICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4vLyAgICAgY29uc3QgaW5kZXggPSBbXHJcbi8vICAgICAgIC4uLmRyb3Bab25lLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuLFxyXG4vLyAgICAgXS5pbmRleE9mKGRyb3Bab25lLnBhcmVudE5vZGUucGFyZW50Tm9kZSk7XHJcbi8vICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XHJcbi8vICAgICBlbC5vbm1vdXNldXAgPSBudWxsO1xyXG5cclxuLy8gICAgIC8vIGNvbnNvbGUubG9nKGluZGV4LCBwaWNrZWRJbmRleCwgZHJvcFpvbmUucGFyZW50Tm9kZS5wYXJlbnROb2RlLCBkcm9wWm9uZSk7XHJcbi8vICAgICBpZiAoIWRyb3Bab25lLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2RvLWxpc3QtYWJzb2x1dGUnKSkge1xyXG4vLyAgICAgICBjbGVhckFic29sdXRlKGVsKTtcclxuLy8gICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGlmIChpbmRleCA+IHBpY2tlZEluZGV4KSB7XHJcbi8vICAgICAgIGRyb3Bab25lLnBhcmVudE5vZGUucGFyZW50Tm9kZS5hZnRlcihwaWNrZWQucGFyZW50Tm9kZSk7XHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICBkcm9wWm9uZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuYmVmb3JlKHBpY2tlZC5wYXJlbnROb2RlKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBjbGVhckFic29sdXRlKGVsKTtcclxuLy8gICAgIGNvbnNvbGUubG9nKG1vdXNlVXBFdmVudCk7XHJcbi8vICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcEV2ZW50KTtcclxuLy8gICB9O1xyXG4vLyAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZVVwRXZlbnQpO1xyXG4vLyAgIHdpbmRvdy5vbmtleWRvd24gPSAoZSkgPT4ge1xyXG4vLyAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcclxuLy8gICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXBFdmVudCk7XHJcbi8vICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcclxuLy8gICAgICAgY2xlYXJBYnNvbHV0ZShlbCk7XHJcbi8vICAgICB9XHJcbi8vICAgfTtcclxuXHJcbi8vICAgZnVuY3Rpb24gY2xlYXJBYnNvbHV0ZShlbCkge1xyXG4vLyAgICAgZWwuc3R5bGUucG9zaXRpb24gPSAnJztcclxuLy8gICAgIGVsLnN0eWxlLnpJbmRleCA9ICcnO1xyXG4vLyAgICAgZWwuc3R5bGUubGVmdCA9ICcnO1xyXG4vLyAgICAgZWwuc3R5bGUudG9wID0gJyc7XHJcbi8vICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZlJyk7XHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG5mdW5jdGlvbiBjbGVhckFic29sdXRlKGVsKSB7XHJcbiAgZWwuc3R5bGUucG9zaXRpb24gPSAnJztcclxuICBlbC5zdHlsZS56SW5kZXggPSAnJztcclxuICBlbC5zdHlsZS5sZWZ0ID0gJyc7XHJcbiAgZWwuc3R5bGUudG9wID0gJyc7XHJcbiAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnbW92ZScpO1xyXG59XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyBmcm9tIFwiLSEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy9yZXNldC5jc3NcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzFfX18gZnJvbSBcIi0hLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMvc3R5bGUuY3NzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiDrpqzshYsgY3NzICovXFxyXFxuXFxyXFxuLyogc3R5bGUgY3NzICovXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2FwcC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsV0FBVzs7QUFHWCxjQUFjXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIOumrOyFiyBjc3MgKi9cXHJcXG5AaW1wb3J0IHVybCguL3N0eWxlcy9yZXNldC5jc3MpO1xcclxcblxcclxcbi8qIHN0eWxlIGNzcyAqL1xcclxcbkBpbXBvcnQgdXJsKC4vc3R5bGVzL3N0eWxlLmNzcyk7XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgLyogdXNlci1zZWxlY3Q6IG5vbmU7ICovXFxyXFxufVxcclxcblxcclxcbnVsLFxcclxcbm9sIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmEge1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmlucHV0IHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXHJcXG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcXHJcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvcmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVix1QkFBdUI7QUFDekI7O0FBRUE7O0VBRUUsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixxQkFBcUI7RUFDckIsZ0JBQWdCO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIC8qIHVzZXItc2VsZWN0OiBub25lOyAqL1xcclxcbn1cXHJcXG5cXHJcXG51bCxcXHJcXG5vbCB7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG5hIHtcXHJcXG4gIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG5pbnB1dCB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxuICBhcHBlYXJhbmNlOiBub25lO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiA9PT09PT09PT09PSBsYXlvdXRzID09PT09PT09PT09PT0gKi9cXHJcXG5idXR0b24ge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbiAgcGFkZGluZy1ib3R0b206IDQwcHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtdGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAzMHB4O1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC13cmFwcGVyIHtcXHJcXG4gIHdpZHRoOiA4OS4zMyU7XFxyXFxuICBtYXJnaW46IDAgYXV0bztcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxMTE7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtaW5wdXQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlcjogMXB4IGRhc2hlZCAjY2NjO1xcclxcbiAgZm9udC1zaXplOiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWlucHV0OmZvY3VzIHtcXHJcXG4gIG91dGxpbmU6IDFweCBzb2xpZCAjZWI0NjU2O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWlucHV0OjpwbGFjZWhvbGRlciB7XFxyXFxuICBjb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1jb250ZW50cyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC13cmFwOiB3cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIG1pbi1oZWlnaHQ6IDIwcHg7XFxyXFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcXHJcXG4gIGNvbG9yOiAjMDAwO1xcclxcbiAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgcGFkZGluZzogMTBweCA3cHggMTBweCAwcHg7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1hYnNvbHV0ZSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1hYnNvbHV0ZS5tb3ZlIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHotaW5kZXg6IDk5OTtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1jb250ZW50cyAudG9kby1saXN0LWl0ZW0ubW92ZSB7XFxyXFxuICBib3JkZXItYm90dG9tOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbSBzcGFuIHtcXHJcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbS5jb21wbGV0ZSB7XFxyXFxuICAvKiB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDsgKi9cXHJcXG4gIGNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4vKiA9PT09PT09PT0g7ZWY64uoIOygleuztOu2gCA9PT09PT09PT0gKi9cXHJcXG4udG9kby1saXN0LWluZm8ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1idXR0b25zIGJ1dHRvbixcXHJcXG4udG9kby1saXN0LWNsZWFyIGJ1dHRvbiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmMWYxO1xcclxcbiAgY29sb3I6ICMwMDA7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgIzIyMjtcXHJcXG4gIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1idXR0b25zIGJ1dHRvbi5hY3RpdmUge1xcclxcbiAgY29sb3I6ICNlYjQ2NTY7XFxyXFxuICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2ViNDY1NjtcXHJcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsc0NBQXNDO0FBQ3RDO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLDZCQUE2QjtFQUM3QixXQUFXO0VBQ1gsZUFBZTtFQUNmLDBCQUEwQjtFQUMxQixXQUFXO0VBQ1gsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLFdBQVc7QUFDYjs7QUFFQSwrQkFBK0I7QUFDL0I7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixnQkFBZ0I7RUFDaEIsZUFBZTtBQUNqQjs7QUFFQTs7RUFFRSx5QkFBeUI7RUFDekIsV0FBVztFQUNYLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLHlCQUF5QjtBQUMzQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiA9PT09PT09PT09PSBsYXlvdXRzID09PT09PT09PT09PT0gKi9cXHJcXG5idXR0b24ge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbiAgcGFkZGluZy1ib3R0b206IDQwcHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtdGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAzMHB4O1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC13cmFwcGVyIHtcXHJcXG4gIHdpZHRoOiA4OS4zMyU7XFxyXFxuICBtYXJnaW46IDAgYXV0bztcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxMTE7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtaW5wdXQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlcjogMXB4IGRhc2hlZCAjY2NjO1xcclxcbiAgZm9udC1zaXplOiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWlucHV0OmZvY3VzIHtcXHJcXG4gIG91dGxpbmU6IDFweCBzb2xpZCAjZWI0NjU2O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWlucHV0OjpwbGFjZWhvbGRlciB7XFxyXFxuICBjb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1jb250ZW50cyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC13cmFwOiB3cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIG1pbi1oZWlnaHQ6IDIwcHg7XFxyXFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcXHJcXG4gIGNvbG9yOiAjMDAwO1xcclxcbiAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgcGFkZGluZzogMTBweCA3cHggMTBweCAwcHg7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1hYnNvbHV0ZSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1hYnNvbHV0ZS5tb3ZlIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHotaW5kZXg6IDk5OTtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1jb250ZW50cyAudG9kby1saXN0LWl0ZW0ubW92ZSB7XFxyXFxuICBib3JkZXItYm90dG9tOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbSBzcGFuIHtcXHJcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbS5jb21wbGV0ZSB7XFxyXFxuICAvKiB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDsgKi9cXHJcXG4gIGNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4vKiA9PT09PT09PT0g7ZWY64uoIOygleuztOu2gCA9PT09PT09PT0gKi9cXHJcXG4udG9kby1saXN0LWluZm8ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1idXR0b25zIGJ1dHRvbixcXHJcXG4udG9kby1saXN0LWNsZWFyIGJ1dHRvbiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmMWYxO1xcclxcbiAgY29sb3I6ICMwMDA7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgIzIyMjtcXHJcXG4gIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1idXR0b25zIGJ1dHRvbi5hY3RpdmUge1xcclxcbiAgY29sb3I6ICNlYjQ2NTY7XFxyXFxuICBmb250LXdlaWdodDogNTAwO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgI2ViNDY1NjtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLypcclxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xyXG4gIHZhciBsaXN0ID0gW107XHJcblxyXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xyXG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XHJcbiAgICAgIGlmIChpdGVtWzRdKSB7XHJcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpdGVtWzJdKSB7XHJcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobmVlZExheWVyKSB7XHJcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcclxuICAgICAgaWYgKG5lZWRMYXllcikge1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW1bMl0pIHtcclxuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpdGVtWzRdKSB7XHJcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH0pLmpvaW4oXCJcIik7XHJcbiAgfTtcclxuXHJcbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xyXG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xyXG4gICAgfVxyXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuICAgIGlmIChkZWR1cGUpIHtcclxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcclxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XHJcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcclxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xyXG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAobWVkaWEpIHtcclxuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcclxuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XHJcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChzdXBwb3J0cykge1xyXG4gICAgICAgIGlmICghaXRlbVs0XSkge1xyXG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcclxuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgcmV0dXJuIGxpc3Q7XHJcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xyXG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcclxuICBpZiAoIWNzc01hcHBpbmcpIHtcclxuICAgIHJldHVybiBjb250ZW50O1xyXG4gIH1cclxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xyXG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xyXG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XHJcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XHJcbiAgfVxyXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcclxufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYXBwLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYXBwLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIHN0eWxlc0luRE9NID0gW107XHJcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcclxuICB2YXIgcmVzdWx0ID0gLTE7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcclxuICAgICAgcmVzdWx0ID0gaTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcclxuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xyXG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XHJcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xyXG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XHJcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcclxuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xyXG4gICAgdmFyIG9iaiA9IHtcclxuICAgICAgY3NzOiBpdGVtWzFdLFxyXG4gICAgICBtZWRpYTogaXRlbVsyXSxcclxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxyXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcclxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cclxuICAgIH07XHJcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XHJcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XHJcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xyXG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xyXG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xyXG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXHJcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcclxuICAgICAgICByZWZlcmVuY2VzOiAxXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcclxuICB9XHJcbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xyXG59XHJcbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XHJcbiAgYXBpLnVwZGF0ZShvYmopO1xyXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcclxuICAgIGlmIChuZXdPYmopIHtcclxuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhcGkucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICByZXR1cm4gdXBkYXRlcjtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgbGlzdCA9IGxpc3QgfHwgW107XHJcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcclxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XHJcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xyXG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xyXG4gICAgfVxyXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcclxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XHJcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XHJcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcclxuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcclxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xyXG4gIH07XHJcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgbWVtbyA9IHt9O1xyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXHJcbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcclxuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xyXG5cclxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXHJcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcclxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xyXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxyXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XHJcbiAgfVxyXG4gIHJldHVybiBtZW1vW3RhcmdldF07XHJcbn1cclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xyXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcclxuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XHJcbiAgaWYgKCF0YXJnZXQpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XHJcbiAgfVxyXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XHJcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcclxuICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xyXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XHJcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xyXG4gIGlmIChub25jZSkge1xyXG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cclxuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcclxuICB2YXIgY3NzID0gXCJcIjtcclxuICBpZiAob2JqLnN1cHBvcnRzKSB7XHJcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xyXG4gIH1cclxuICBpZiAob2JqLm1lZGlhKSB7XHJcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcclxuICB9XHJcbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XHJcbiAgaWYgKG5lZWRMYXllcikge1xyXG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xyXG4gIH1cclxuICBjc3MgKz0gb2JqLmNzcztcclxuICBpZiAobmVlZExheWVyKSB7XHJcbiAgICBjc3MgKz0gXCJ9XCI7XHJcbiAgfVxyXG4gIGlmIChvYmoubWVkaWEpIHtcclxuICAgIGNzcyArPSBcIn1cIjtcclxuICB9XHJcbiAgaWYgKG9iai5zdXBwb3J0cykge1xyXG4gICAgY3NzICs9IFwifVwiO1xyXG4gIH1cclxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcclxuICB9XHJcblxyXG4gIC8vIEZvciBvbGQgSUVcclxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXHJcbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcclxufVxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXHJcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcbn1cclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xyXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXHJcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cclxuICAgIH07XHJcbiAgfVxyXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuICByZXR1cm4ge1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XHJcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcclxuICAgIH0sXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcclxuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xyXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xyXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuICB9IGVsc2Uge1xyXG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcbiAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL2FwcC5jc3MnO1xyXG5pbXBvcnQgJy4vYXBwLmpzJzsiXSwibmFtZXMiOlsiJHRvZG9MaXN0Q29udGVudHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCIkaW5wdXQiLCIkYnV0dG9ucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCIkY2xlYXJCdXR0b24iLCJwcm9ncmVzc0FycmF5IiwiY29tcGxldGVBcnJheSIsImRvd25UaW1lU3RhbXAiLCJ1cFRpbWVTdGFtcCIsIml0ZW1JZCIsInBpY2tlZCIsInBpY2tlZEluZGV4IiwiZGVsYXkiLCJtcyIsInNldFRpbWVvdXQiLCJjb25zb2xlIiwibG9nIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlDb2RlIiwidGFyZ2V0IiwidmFsdWUiLCJjcmVhdGVUb2RvIiwiVG9kb0l0ZW0iLCJpZCIsImRlc2NyaXB0aW9uIiwiY3JlYXREdHRtIiwia2V5IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwic3RhdHVzIiwiY29tcGxldGVEdHRtIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NyZWF0ZUNsYXNzIiwiY29tcGxldGVJdGVtIiwiRGF0ZSIsImdldFRpbWUiLCJjYW5jZWxJdGVtIiwicmVuZGVyIiwiaXRlbXMiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImNvbmNhdCIsInNvcnQiLCJhIiwiYiIsImNoaWxkcmVuIiwiaW5uZXJUZXh0IiwiaW5uZXJIVE1MIiwibWFwIiwiaXRlbSIsImpvaW4iLCIkdG9kb0xpc3RJdGVtcyIsIiR0b2RvTGlzdENvdW50ZXIiLCJ1bnNoaWZ0IiwicHVzaCIsImNvbnRlbnRzQWN0aXZlRXZlbnQiLCJtb3VzZVVwVGVzdEV2ZW50IiwiZXZlbnQiLCJ0aW1lU3RhbXAiLCJ0YWdOYW1lIiwidGFyZ2V0SWQiLCJ0b3RhbEFycmF5IiwiZm9yRWFjaCIsImVsIiwiaWR4IiwiTnVtYmVyIiwic3BsaWNlIiwibGlzdEZpbHRlciIsInJlbW92ZSIsImFkZCIsImNsZWFyVG9kbyIsImNoZWNrRGF0YSIsImNvbmZpcm0iLCJjbGVhckFic29sdXRlIiwic3R5bGUiLCJwb3NpdGlvbiIsInpJbmRleCIsImxlZnQiLCJ0b3AiXSwic291cmNlUm9vdCI6IiJ9