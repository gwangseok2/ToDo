/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var $todoListContents = document.querySelector(".todo-list-contents");
var $input = document.querySelector(".todo-list-input");
var clearCount = 0;
var picked = null;
var pickedIndex = null;
var testCode = function testCode(message) {
  alert(message);
};
var delay = function delay(ms) {
  setTimeout(function () {
    console.log("딜레이");
  }, ms);
};
$input.addEventListener("keypress", function (e) {
  console.log("hi");
  createTodo(e);
});
// input enter
var createTodo = function createTodo(e) {
  alert("실행");
  var $todoListItems = document.querySelectorAll(".todo-list-item");
  var $todoListCounter = document.querySelector(".todo-list-counter");
  if (e.keyCode === 13 && e.target.value) {
    var temp = document.createElement("li");
    temp.classList.add("todo-list-item");
    temp.setAttribute("data-time", new Date().getTime());
    temp.setAttribute("dropzone", "true");
    temp.innerHTML = "<div class=\"todo-list-absolute\">\n    <span class=\"material-icons\" dropzone=\"true\">\n    drag_handle\n  </span><span>".concat(e.target.value, "</span></div>");
    e.target.value = "";
    $todoListCounter.innerText = $todoListItems.length + 1;
    if ($todoListItems.length > 0) {
      $todoListContents.prepend(temp);
    } else {
      $todoListContents.append(temp);
    }

    // 테스트
    var dragSrcEl = document.querySelector(".material-icons");
    dragSrcEl.addEventListener("mousedown", handleMouseDown);
  }

  // 추가한 요소 이벤트 부착
  var $dragEventTarget = document.querySelectorAll(".todo-list-item");
  for (var i = 0; i < $dragEventTarget.length; i++) {
    $dragEventTarget[i].addEventListener("mousedown", contentsActiveEvent);
  }
};
function contentsActiveEvent(event, length) {
  var timesTarget = document.querySelectorAll(".todo-list-item");
  if (event.target.tagName !== "LI") {
    return false;
  }
  // 클래스 유무 체크
  if (event.target.classList.contains("active")) {
    event.target.classList.remove("active");
    var compare = function compare(a, b) {
      if (a.getAttribute("data-time") < b.getAttribute("data-time")) {
        return 1;
      }
      if (a.getAttribute("data-time") > b.getAttribute("data-time")) {
        return -1;
      }
      return 0;
    };
    var sortTime = Array.from(timesTarget).sort(compare);
    sortTime.forEach(function (time) {
      $todoListContents.appendChild(time);
    });
    clearCount--;
  } else {
    event.target.classList.add("active");
    clearCount++;
    $todoListContents.append(event.target);
  }

  // active-button 활성 중 눌렀을 때 listFilter 함수 실행
  if (document.querySelector(".active-button").classList.contains("active")) {
    listFilter("active");
  } else if (document.querySelector(".completed-button").classList.contains("active")) {
    listFilter("");
  }

  // 카운터초기화
  document.querySelector(".todo-list-clear-counter").innerText = "(".concat(clearCount, ")");
}
function listFilter(filterType, event) {
  var $buttons = document.querySelectorAll(".todo-list-buttons button");
  var $todoListItems = document.querySelectorAll(".todo-list-item");
  if (event) {
    $buttons.forEach(function (el) {
      el.classList.remove("active");
    });
    event.target.classList.add("active");
  }
  if (filterType === "all") {
    for (var i = 0; i < $todoListItems.length; i++) {
      $todoListItems[i].style.display = "flex";
    }
  } else if (filterType === "active") {
    for (var _i = 0; _i < $todoListItems.length; _i++) {
      if ($todoListItems[_i].classList.contains("active")) {
        $todoListItems[_i].style.display = "none";
      } else {
        $todoListItems[_i].style.display = "flex";
      }
    }
  } else {
    for (var _i2 = 0; _i2 < $todoListItems.length; _i2++) {
      if (!$todoListItems[_i2].classList.contains("active")) {
        $todoListItems[_i2].style.display = "none";
      } else {
        $todoListItems[_i2].style.display = "flex";
      }
    }
  }
}
function clearTodo() {
  var checkData = confirm("Are you sure you want to clear the todolist?");
  var leftCount = document.querySelector(".todo-list-counter").innerText;
  if (checkData) {
    var count = 0;
    document.querySelectorAll(".todo-list-item").forEach(function (el) {
      if (el.classList.contains("active")) {
        $todoListContents.removeChild(el);
        count++;
      }
    });
    document.querySelector(".todo-list-counter").innerText = leftCount - count;
    clearCount = 0;
    document.querySelector(".todo-list-clear-counter").innerText = "(".concat(clearCount, ")");
  }
}
function handleMouseDown(e) {
  e.preventDefault();
  picked = e.target.parentNode;
  pickedIndex = _toConsumableArray(picked.parentNode.parentNode.children).indexOf(picked.parentNode);
  var el = e.target.parentNode;
  el.classList.add("move");
  var $area = document.querySelector(".todo-list-wrapper");
  var pointerWidthArea = document.querySelector(".todo-list-wrapper").offsetWidth + 20;
  var pointerHeightArea = document.querySelector(".todo-list-wrapper").offsetHeight + 20;
  moveAt(e.pageX, e.pageY);
  function moveAt(pageX, pageY) {
    el.style.left = pageX - el.offsetWidth / 3 + "px";
    el.style.top = pageY - el.offsetHeight / 2 + "px";
  }
  function onMouseMove(event) {
    if (parseInt(el.style.left) < (window.innerWidth - pointerWidthArea) / 2 || parseInt(el.style.top) < $area.offsetTop || parseInt(el.style.top) > pointerHeightArea || parseInt(el.style.left) > pointerWidthArea) {
      clearAbsolute(el);
      el.onmouseup = null;
      document.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", mouseUpEvent);
      return false;
    }
    moveAt(event.pageX, event.pageY);
  }
  document.addEventListener("mousemove", onMouseMove);
  var mouseUpEvent = function mouseUpEvent(event) {
    el.style.display = "none";
    var dropZone = document.elementFromPoint(event.clientX, event.clientY);
    el.style.display = "flex";
    var index = _toConsumableArray(dropZone.parentNode.parentNode.parentNode.children).indexOf(dropZone.parentNode.parentNode);
    document.removeEventListener("mousemove", onMouseMove);
    el.onmouseup = null;

    // console.log(index, pickedIndex, dropZone.parentNode.parentNode, dropZone);
    if (!dropZone.parentNode.classList.contains("todo-list-absolute")) {
      clearAbsolute(el);
      return false;
    }
    console.log(index, pickedIndex);
    if (index > pickedIndex) {
      dropZone.parentNode.parentNode.after(picked.parentNode);
    } else {
      dropZone.parentNode.parentNode.before(picked.parentNode);
    }
    clearAbsolute(el);
    console.log(mouseUpEvent);
    el.removeEventListener("mouseup", mouseUpEvent);
  };
  el.addEventListener("mouseup", mouseUpEvent);
  window.onkeydown = function (e) {
    if (e.keyCode === 27) {
      el.removeEventListener("mouseup", mouseUpEvent);
      document.removeEventListener("mousemove", onMouseMove);
      clearAbsolute(el);
    }
  };
  function clearAbsolute(el) {
    el.style.position = "";
    el.style.zIndex = "";
    el.style.left = "";
    el.style.top = "";
    el.classList.remove("move");
  }
}
console.log(createTodo);

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
___CSS_LOADER_EXPORT___.push([module.id, "/* =========== layouts ============= */\r\nbutton {\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list {\r\n  background-color: #f1f1f1;\r\n  width: 100%;\r\n  min-height: 100vh;\r\n  padding-bottom: 40px;\r\n}\r\n\r\n.todo-list-title {\r\n  font-size: 30px;\r\n  text-align: center;\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.todo-list-wrapper {\r\n  width: 89.33%;\r\n  margin: 0 auto;\r\n  border: 1px solid #111;\r\n  box-sizing: border-box;\r\n  padding: 20px;\r\n  background-color: #fff;\r\n}\r\n\r\n.todo-list-input {\r\n  width: 100%;\r\n  height: 40px;\r\n  box-sizing: border-box;\r\n  padding: 10px;\r\n  border: 1px dashed #ccc;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-input:focus {\r\n  outline: 1px solid #eb4656;\r\n}\r\n\r\n.todo-list-input::placeholder {\r\n  color: #ccc;\r\n}\r\n\r\n.todo-list-contents {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.todo-list-contents .todo-list-item {\r\n  display: flex;\r\n  align-items: center;\r\n  min-height: 20px;\r\n  border-bottom: 1px solid #ccc;\r\n  color: #000;\r\n  font-size: 12px;\r\n  padding: 10px 7px 10px 0px;\r\n  width: 100%;\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list-absolute {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.todo-list-absolute.move {\r\n  position: absolute;\r\n  z-index: 999;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.move {\r\n  border-bottom: none;\r\n}\r\n\r\n.todo-list-contents .todo-list-item span {\r\n  margin-right: 5px;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.active {\r\n  /* text-decoration: line-through; */\r\n  color: #ccc;\r\n}\r\n\r\n/* ========= 하단 정보부 ========= */\r\n.todo-list-info {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-top: 10px;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-buttons button,\r\n.todo-list-clear button {\r\n  background-color: #f1f1f1;\r\n  color: #000;\r\n  outline: none;\r\n  border-radius: 2px;\r\n  border: 1px solid #222;\r\n  font-size: 12px;\r\n  padding: 5px;\r\n}\r\n\r\n.todo-list-buttons button.active {\r\n  color: #eb4656;\r\n  font-weight: 500;\r\n}", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA,sCAAsC;AACtC;EACE,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,WAAW;EACX,iBAAiB;EACjB,oBAAoB;AACtB;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,sBAAsB;EACtB,sBAAsB;EACtB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,aAAa;EACb,uBAAuB;EACvB,eAAe;AACjB;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,gBAAgB;EAChB,6BAA6B;EAC7B,WAAW;EACX,eAAe;EACf,0BAA0B;EAC1B,WAAW;EACX,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,mCAAmC;EACnC,WAAW;AACb;;AAEA,+BAA+B;AAC/B;EACE,WAAW;EACX,aAAa;EACb,8BAA8B;EAC9B,gBAAgB;EAChB,eAAe;AACjB;;AAEA;;EAEE,yBAAyB;EACzB,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,sBAAsB;EACtB,eAAe;EACf,YAAY;AACd;;AAEA;EACE,cAAc;EACd,gBAAgB;AAClB","sourcesContent":["/* =========== layouts ============= */\r\nbutton {\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list {\r\n  background-color: #f1f1f1;\r\n  width: 100%;\r\n  min-height: 100vh;\r\n  padding-bottom: 40px;\r\n}\r\n\r\n.todo-list-title {\r\n  font-size: 30px;\r\n  text-align: center;\r\n  margin-bottom: 30px;\r\n}\r\n\r\n.todo-list-wrapper {\r\n  width: 89.33%;\r\n  margin: 0 auto;\r\n  border: 1px solid #111;\r\n  box-sizing: border-box;\r\n  padding: 20px;\r\n  background-color: #fff;\r\n}\r\n\r\n.todo-list-input {\r\n  width: 100%;\r\n  height: 40px;\r\n  box-sizing: border-box;\r\n  padding: 10px;\r\n  border: 1px dashed #ccc;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-input:focus {\r\n  outline: 1px solid #eb4656;\r\n}\r\n\r\n.todo-list-input::placeholder {\r\n  color: #ccc;\r\n}\r\n\r\n.todo-list-contents {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.todo-list-contents .todo-list-item {\r\n  display: flex;\r\n  align-items: center;\r\n  min-height: 20px;\r\n  border-bottom: 1px solid #ccc;\r\n  color: #000;\r\n  font-size: 12px;\r\n  padding: 10px 7px 10px 0px;\r\n  width: 100%;\r\n  cursor: pointer;\r\n}\r\n\r\n.todo-list-absolute {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.todo-list-absolute.move {\r\n  position: absolute;\r\n  z-index: 999;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.move {\r\n  border-bottom: none;\r\n}\r\n\r\n.todo-list-contents .todo-list-item span {\r\n  margin-right: 5px;\r\n}\r\n\r\n.todo-list-contents .todo-list-item.active {\r\n  /* text-decoration: line-through; */\r\n  color: #ccc;\r\n}\r\n\r\n/* ========= 하단 정보부 ========= */\r\n.todo-list-info {\r\n  width: 100%;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  margin-top: 10px;\r\n  font-size: 14px;\r\n}\r\n\r\n.todo-list-buttons button,\r\n.todo-list-clear button {\r\n  background-color: #f1f1f1;\r\n  color: #000;\r\n  outline: none;\r\n  border-radius: 2px;\r\n  border: 1px solid #222;\r\n  font-size: 12px;\r\n  padding: 5px;\r\n}\r\n\r\n.todo-list-buttons button.active {\r\n  color: #eb4656;\r\n  font-weight: 500;\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDNURhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDYkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7OztBQ0FtQiIsInNvdXJjZXMiOlsid2VicGFjazovL25obi8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vbmhuLy4vc3JjL2FwcC5jc3MiLCJ3ZWJwYWNrOi8vbmhuLy4vc3JjL3N0eWxlcy9yZXNldC5jc3MiLCJ3ZWJwYWNrOi8vbmhuLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vbmhuLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9uaG4vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9uaG4vLi9zcmMvYXBwLmNzcz9hNjcyIiwid2VicGFjazovL25obi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9uaG4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL25obi8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9uaG4vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vbmhuLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vbmhuLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vbmhuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL25obi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9uaG4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL25obi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL25obi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL25obi93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vbmhuLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0ICR0b2RvTGlzdENvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3QtY29udGVudHNcIik7XG5jb25zdCAkaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdC1pbnB1dFwiKTtcbmxldCBjbGVhckNvdW50ID0gMDtcbmxldCBwaWNrZWQgPSBudWxsO1xubGV0IHBpY2tlZEluZGV4ID0gbnVsbDtcblxuY29uc3QgdGVzdENvZGUgPSAobWVzc2FnZSkgPT4ge1xuICBhbGVydChtZXNzYWdlKTtcbn07XG5cbmNvbnN0IGRlbGF5ID0gKG1zKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwi65Sc66CI7J20XCIpO1xuICB9LCBtcyk7XG59O1xuXG4kaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChlKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwiaGlcIik7XG4gIGNyZWF0ZVRvZG8oZSk7XG59KTtcbi8vIGlucHV0IGVudGVyXG5jb25zdCBjcmVhdGVUb2RvID0gKGUpID0+IHtcbiAgYWxlcnQoXCLsi6TtlolcIik7XG4gIGNvbnN0ICR0b2RvTGlzdEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWxpc3QtaXRlbVwiKTtcbiAgY29uc3QgJHRvZG9MaXN0Q291bnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0LWNvdW50ZXJcIik7XG4gIGlmIChlLmtleUNvZGUgPT09IDEzICYmIGUudGFyZ2V0LnZhbHVlKSB7XG4gICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICB0ZW1wLmNsYXNzTGlzdC5hZGQoXCJ0b2RvLWxpc3QtaXRlbVwiKTtcbiAgICB0ZW1wLnNldEF0dHJpYnV0ZShcImRhdGEtdGltZVwiLCBuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgdGVtcC5zZXRBdHRyaWJ1dGUoXCJkcm9wem9uZVwiLCBcInRydWVcIik7XG4gICAgdGVtcC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cInRvZG8tbGlzdC1hYnNvbHV0ZVwiPlxuICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBkcm9wem9uZT1cInRydWVcIj5cbiAgICBkcmFnX2hhbmRsZVxuICA8L3NwYW4+PHNwYW4+JHtlLnRhcmdldC52YWx1ZX08L3NwYW4+PC9kaXY+YDtcbiAgICBlLnRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgJHRvZG9MaXN0Q291bnRlci5pbm5lclRleHQgPSAkdG9kb0xpc3RJdGVtcy5sZW5ndGggKyAxO1xuXG4gICAgaWYgKCR0b2RvTGlzdEl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICR0b2RvTGlzdENvbnRlbnRzLnByZXBlbmQodGVtcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICR0b2RvTGlzdENvbnRlbnRzLmFwcGVuZCh0ZW1wKTtcbiAgICB9XG5cbiAgICAvLyDthYzsiqTtirhcbiAgICBjb25zdCBkcmFnU3JjRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1hdGVyaWFsLWljb25zXCIpO1xuICAgIGRyYWdTcmNFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU1vdXNlRG93bik7XG4gIH1cblxuICAvLyDstpTqsIDtlZwg7JqU7IaMIOydtOuypO2KuCDrtoDssKlcbiAgY29uc3QgJGRyYWdFdmVudFRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1saXN0LWl0ZW1cIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgJGRyYWdFdmVudFRhcmdldC5sZW5ndGg7IGkrKykge1xuICAgICRkcmFnRXZlbnRUYXJnZXRbaV0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBjb250ZW50c0FjdGl2ZUV2ZW50KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY29udGVudHNBY3RpdmVFdmVudChldmVudCwgbGVuZ3RoKSB7XG4gIGNvbnN0IHRpbWVzVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWxpc3QtaXRlbVwiKTtcbiAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSBcIkxJXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8g7YG0656Y7IqkIOycoOustCDssrTtgaxcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBjb25zdCBjb21wYXJlID0gKGEsIGIpID0+IHtcbiAgICAgIGlmIChhLmdldEF0dHJpYnV0ZShcImRhdGEtdGltZVwiKSA8IGIuZ2V0QXR0cmlidXRlKFwiZGF0YS10aW1lXCIpKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgaWYgKGEuZ2V0QXR0cmlidXRlKFwiZGF0YS10aW1lXCIpID4gYi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRpbWVcIikpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICBjb25zdCBzb3J0VGltZSA9IEFycmF5LmZyb20odGltZXNUYXJnZXQpLnNvcnQoY29tcGFyZSk7XG4gICAgc29ydFRpbWUuZm9yRWFjaCgodGltZSkgPT4ge1xuICAgICAgJHRvZG9MaXN0Q29udGVudHMuYXBwZW5kQ2hpbGQodGltZSk7XG4gICAgfSk7XG4gICAgY2xlYXJDb3VudC0tO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGNsZWFyQ291bnQrKztcbiAgICAkdG9kb0xpc3RDb250ZW50cy5hcHBlbmQoZXZlbnQudGFyZ2V0KTtcbiAgfVxuXG4gIC8vIGFjdGl2ZS1idXR0b24g7Zmc7ISxIOykkSDriIzroIDsnYQg65WMIGxpc3RGaWx0ZXIg7ZWo7IiYIOyLpO2WiVxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hY3RpdmUtYnV0dG9uXCIpLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgIGxpc3RGaWx0ZXIoXCJhY3RpdmVcIik7XG4gIH0gZWxzZSBpZiAoXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wbGV0ZWQtYnV0dG9uXCIpLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKVxuICApIHtcbiAgICBsaXN0RmlsdGVyKFwiXCIpO1xuICB9XG5cbiAgLy8g7Lm07Jq07YSw7LSI6riw7ZmUXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIudG9kby1saXN0LWNsZWFyLWNvdW50ZXJcIlxuICApLmlubmVyVGV4dCA9IGAoJHtjbGVhckNvdW50fSlgO1xufVxuZnVuY3Rpb24gbGlzdEZpbHRlcihmaWx0ZXJUeXBlLCBldmVudCkge1xuICBjb25zdCAkYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1saXN0LWJ1dHRvbnMgYnV0dG9uXCIpO1xuICBjb25zdCAkdG9kb0xpc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudG9kby1saXN0LWl0ZW1cIik7XG5cbiAgaWYgKGV2ZW50KSB7XG4gICAgJGJ1dHRvbnMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgfSk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gIH1cblxuICBpZiAoZmlsdGVyVHlwZSA9PT0gXCJhbGxcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJHRvZG9MaXN0SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICR0b2RvTGlzdEl0ZW1zW2ldLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZmlsdGVyVHlwZSA9PT0gXCJhY3RpdmVcIikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJHRvZG9MaXN0SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICgkdG9kb0xpc3RJdGVtc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgJHRvZG9MaXN0SXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHRvZG9MaXN0SXRlbXNbaV0uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8ICR0b2RvTGlzdEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoISR0b2RvTGlzdEl0ZW1zW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAkdG9kb0xpc3RJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkdG9kb0xpc3RJdGVtc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyVG9kbygpIHtcbiAgY29uc3QgY2hlY2tEYXRhID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbGVhciB0aGUgdG9kb2xpc3Q/XCIpO1xuICBjb25zdCBsZWZ0Q291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdC1jb3VudGVyXCIpLmlubmVyVGV4dDtcbiAgaWYgKGNoZWNrRGF0YSkge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50b2RvLWxpc3QtaXRlbVwiKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAkdG9kb0xpc3RDb250ZW50cy5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3QtY291bnRlclwiKS5pbm5lclRleHQgPSBsZWZ0Q291bnQgLSBjb3VudDtcbiAgICBjbGVhckNvdW50ID0gMDtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIudG9kby1saXN0LWNsZWFyLWNvdW50ZXJcIlxuICAgICkuaW5uZXJUZXh0ID0gYCgke2NsZWFyQ291bnR9KWA7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBwaWNrZWQgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xuICBwaWNrZWRJbmRleCA9IFsuLi5waWNrZWQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkcmVuXS5pbmRleE9mKFxuICAgIHBpY2tlZC5wYXJlbnROb2RlXG4gICk7XG4gIGNvbnN0IGVsID0gZS50YXJnZXQucGFyZW50Tm9kZTtcbiAgZWwuY2xhc3NMaXN0LmFkZChcIm1vdmVcIik7XG4gIGNvbnN0ICRhcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3Qtd3JhcHBlclwiKTtcbiAgY29uc3QgcG9pbnRlcldpZHRoQXJlYSA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3Qtd3JhcHBlclwiKS5vZmZzZXRXaWR0aCArIDIwO1xuICBjb25zdCBwb2ludGVySGVpZ2h0QXJlYSA9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3Qtd3JhcHBlclwiKS5vZmZzZXRIZWlnaHQgKyAyMDtcblxuICBtb3ZlQXQoZS5wYWdlWCwgZS5wYWdlWSk7XG4gIGZ1bmN0aW9uIG1vdmVBdChwYWdlWCwgcGFnZVkpIHtcbiAgICBlbC5zdHlsZS5sZWZ0ID0gcGFnZVggLSBlbC5vZmZzZXRXaWR0aCAvIDMgKyBcInB4XCI7XG4gICAgZWwuc3R5bGUudG9wID0gcGFnZVkgLSBlbC5vZmZzZXRIZWlnaHQgLyAyICsgXCJweFwiO1xuICB9XG4gIGZ1bmN0aW9uIG9uTW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKFxuICAgICAgcGFyc2VJbnQoZWwuc3R5bGUubGVmdCkgPCAod2luZG93LmlubmVyV2lkdGggLSBwb2ludGVyV2lkdGhBcmVhKSAvIDIgfHxcbiAgICAgIHBhcnNlSW50KGVsLnN0eWxlLnRvcCkgPCAkYXJlYS5vZmZzZXRUb3AgfHxcbiAgICAgIHBhcnNlSW50KGVsLnN0eWxlLnRvcCkgPiBwb2ludGVySGVpZ2h0QXJlYSB8fFxuICAgICAgcGFyc2VJbnQoZWwuc3R5bGUubGVmdCkgPiBwb2ludGVyV2lkdGhBcmVhXG4gICAgKSB7XG4gICAgICBjbGVhckFic29sdXRlKGVsKTtcbiAgICAgIGVsLm9ubW91c2V1cCA9IG51bGw7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXBFdmVudCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIG1vdmVBdChldmVudC5wYWdlWCwgZXZlbnQucGFnZVkpO1xuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XG4gIGNvbnN0IG1vdXNlVXBFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBjb25zdCBkcm9wWm9uZSA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIGNvbnN0IGluZGV4ID0gW1xuICAgICAgLi4uZHJvcFpvbmUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2hpbGRyZW4sXG4gICAgXS5pbmRleE9mKGRyb3Bab25lLnBhcmVudE5vZGUucGFyZW50Tm9kZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XG4gICAgZWwub25tb3VzZXVwID0gbnVsbDtcblxuICAgIC8vIGNvbnNvbGUubG9nKGluZGV4LCBwaWNrZWRJbmRleCwgZHJvcFpvbmUucGFyZW50Tm9kZS5wYXJlbnROb2RlLCBkcm9wWm9uZSk7XG4gICAgaWYgKCFkcm9wWm9uZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucyhcInRvZG8tbGlzdC1hYnNvbHV0ZVwiKSkge1xuICAgICAgY2xlYXJBYnNvbHV0ZShlbCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGluZGV4LCBwaWNrZWRJbmRleCk7XG4gICAgaWYgKGluZGV4ID4gcGlja2VkSW5kZXgpIHtcbiAgICAgIGRyb3Bab25lLnBhcmVudE5vZGUucGFyZW50Tm9kZS5hZnRlcihwaWNrZWQucGFyZW50Tm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRyb3Bab25lLnBhcmVudE5vZGUucGFyZW50Tm9kZS5iZWZvcmUocGlja2VkLnBhcmVudE5vZGUpO1xuICAgIH1cblxuICAgIGNsZWFyQWJzb2x1dGUoZWwpO1xuICAgIGNvbnNvbGUubG9nKG1vdXNlVXBFdmVudCk7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2VVcEV2ZW50KTtcbiAgfTtcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2VVcEV2ZW50KTtcbiAgd2luZG93Lm9ua2V5ZG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXBFdmVudCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbiAgICAgIGNsZWFyQWJzb2x1dGUoZWwpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBjbGVhckFic29sdXRlKGVsKSB7XG4gICAgZWwuc3R5bGUucG9zaXRpb24gPSBcIlwiO1xuICAgIGVsLnN0eWxlLnpJbmRleCA9IFwiXCI7XG4gICAgZWwuc3R5bGUubGVmdCA9IFwiXCI7XG4gICAgZWwuc3R5bGUudG9wID0gXCJcIjtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwibW92ZVwiKTtcbiAgfVxufVxuXG5jb25zb2xlLmxvZyhjcmVhdGVUb2RvKTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyBmcm9tIFwiLSEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy9yZXNldC5jc3NcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzFfX18gZnJvbSBcIi0hLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMvc3R5bGUuY3NzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5pKF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiDrpqzshYsgY3NzICovXFxyXFxuXFxyXFxuLyogc3R5bGUgY3NzICovXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2FwcC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsV0FBVzs7QUFHWCxjQUFjXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIOumrOyFiyBjc3MgKi9cXHJcXG5AaW1wb3J0IHVybCguL3N0eWxlcy9yZXNldC5jc3MpO1xcclxcblxcclxcbi8qIHN0eWxlIGNzcyAqL1xcclxcbkBpbXBvcnQgdXJsKC4vc3R5bGVzL3N0eWxlLmNzcyk7XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgLyogdXNlci1zZWxlY3Q6IG5vbmU7ICovXFxyXFxufVxcclxcblxcclxcbnVsLFxcclxcbm9sIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmEge1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxufVxcclxcblxcclxcbmlucHV0IHtcXHJcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXHJcXG4gIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcXHJcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxyXFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvcmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVix1QkFBdUI7QUFDekI7O0FBRUE7O0VBRUUsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsY0FBYztFQUNkLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHdCQUF3QjtFQUN4QixxQkFBcUI7RUFDckIsZ0JBQWdCO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIC8qIHVzZXItc2VsZWN0OiBub25lOyAqL1xcclxcbn1cXHJcXG5cXHJcXG51bCxcXHJcXG5vbCB7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG5hIHtcXHJcXG4gIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG5pbnB1dCB7XFxyXFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxuICBhcHBlYXJhbmNlOiBub25lO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiA9PT09PT09PT09PSBsYXlvdXRzID09PT09PT09PT09PT0gKi9cXHJcXG5idXR0b24ge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMWYxZjE7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbiAgcGFkZGluZy1ib3R0b206IDQwcHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtdGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAzMHB4O1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC13cmFwcGVyIHtcXHJcXG4gIHdpZHRoOiA4OS4zMyU7XFxyXFxuICBtYXJnaW46IDAgYXV0bztcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMxMTE7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtaW5wdXQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGJvcmRlcjogMXB4IGRhc2hlZCAjY2NjO1xcclxcbiAgZm9udC1zaXplOiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWlucHV0OmZvY3VzIHtcXHJcXG4gIG91dGxpbmU6IDFweCBzb2xpZCAjZWI0NjU2O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWlucHV0OjpwbGFjZWhvbGRlciB7XFxyXFxuICBjb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1jb250ZW50cyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC13cmFwOiB3cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIG1pbi1oZWlnaHQ6IDIwcHg7XFxyXFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcXHJcXG4gIGNvbG9yOiAjMDAwO1xcclxcbiAgZm9udC1zaXplOiAxMnB4O1xcclxcbiAgcGFkZGluZzogMTBweCA3cHggMTBweCAwcHg7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1hYnNvbHV0ZSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1hYnNvbHV0ZS5tb3ZlIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHotaW5kZXg6IDk5OTtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1jb250ZW50cyAudG9kby1saXN0LWl0ZW0ubW92ZSB7XFxyXFxuICBib3JkZXItYm90dG9tOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbSBzcGFuIHtcXHJcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbS5hY3RpdmUge1xcclxcbiAgLyogdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7ICovXFxyXFxuICBjb2xvcjogI2NjYztcXHJcXG59XFxyXFxuXFxyXFxuLyogPT09PT09PT09IO2VmOuLqCDsoJXrs7TrtoAgPT09PT09PT09ICovXFxyXFxuLnRvZG8tbGlzdC1pbmZvIHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICBmb250LXNpemU6IDE0cHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtYnV0dG9ucyBidXR0b24sXFxyXFxuLnRvZG8tbGlzdC1jbGVhciBidXR0b24ge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YxZjFmMTtcXHJcXG4gIGNvbG9yOiAjMDAwO1xcclxcbiAgb3V0bGluZTogbm9uZTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMyMjI7XFxyXFxuICBmb250LXNpemU6IDEycHg7XFxyXFxuICBwYWRkaW5nOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtYnV0dG9ucyBidXR0b24uYWN0aXZlIHtcXHJcXG4gIGNvbG9yOiAjZWI0NjU2O1xcclxcbiAgZm9udC13ZWlnaHQ6IDUwMDtcXHJcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsc0NBQXNDO0FBQ3RDO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLDZCQUE2QjtFQUM3QixXQUFXO0VBQ1gsZUFBZTtFQUNmLDBCQUEwQjtFQUMxQixXQUFXO0VBQ1gsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLFdBQVc7QUFDYjs7QUFFQSwrQkFBK0I7QUFDL0I7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixnQkFBZ0I7RUFDaEIsZUFBZTtBQUNqQjs7QUFFQTs7RUFFRSx5QkFBeUI7RUFDekIsV0FBVztFQUNYLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsZ0JBQWdCO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qID09PT09PT09PT09IGxheW91dHMgPT09PT09PT09PT09PSAqL1xcclxcbmJ1dHRvbiB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3Qge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YxZjFmMTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgbWluLWhlaWdodDogMTAwdmg7XFxyXFxuICBwYWRkaW5nLWJvdHRvbTogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC10aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDMwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LXdyYXBwZXIge1xcclxcbiAgd2lkdGg6IDg5LjMzJTtcXHJcXG4gIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgIzExMTtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBwYWRkaW5nOiAyMHB4O1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1pbnB1dCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogNDBweDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgYm9yZGVyOiAxcHggZGFzaGVkICNjY2M7XFxyXFxuICBmb250LXNpemU6IDE0cHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtaW5wdXQ6Zm9jdXMge1xcclxcbiAgb3V0bGluZTogMXB4IHNvbGlkICNlYjQ2NTY7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtaW5wdXQ6OnBsYWNlaG9sZGVyIHtcXHJcXG4gIGNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtY29udGVudHMgLnRvZG8tbGlzdC1pdGVtIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgbWluLWhlaWdodDogMjBweDtcXHJcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xcclxcbiAgY29sb3I6ICMwMDA7XFxyXFxuICBmb250LXNpemU6IDEycHg7XFxyXFxuICBwYWRkaW5nOiAxMHB4IDdweCAxMHB4IDBweDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWFic29sdXRlIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWFic29sdXRlLm1vdmUge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgei1pbmRleDogOTk5O1xcclxcbn1cXHJcXG5cXHJcXG4udG9kby1saXN0LWNvbnRlbnRzIC50b2RvLWxpc3QtaXRlbS5tb3ZlIHtcXHJcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtY29udGVudHMgLnRvZG8tbGlzdC1pdGVtIHNwYW4ge1xcclxcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxyXFxufVxcclxcblxcclxcbi50b2RvLWxpc3QtY29udGVudHMgLnRvZG8tbGlzdC1pdGVtLmFjdGl2ZSB7XFxyXFxuICAvKiB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDsgKi9cXHJcXG4gIGNvbG9yOiAjY2NjO1xcclxcbn1cXHJcXG5cXHJcXG4vKiA9PT09PT09PT0g7ZWY64uoIOygleuztOu2gCA9PT09PT09PT0gKi9cXHJcXG4udG9kby1saXN0LWluZm8ge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1idXR0b25zIGJ1dHRvbixcXHJcXG4udG9kby1saXN0LWNsZWFyIGJ1dHRvbiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFmMWYxO1xcclxcbiAgY29sb3I6ICMwMDA7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgIzIyMjtcXHJcXG4gIGZvbnQtc2l6ZTogMTJweDtcXHJcXG4gIHBhZGRpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnRvZG8tbGlzdC1idXR0b25zIGJ1dHRvbi5hY3RpdmUge1xcclxcbiAgY29sb3I6ICNlYjQ2NTY7XFxyXFxuICBmb250LXdlaWdodDogNTAwO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKlxyXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XHJcbiAgdmFyIGxpc3QgPSBbXTtcclxuXHJcbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XHJcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcclxuICAgICAgaWYgKGl0ZW1bNF0pIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW1bMl0pIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcclxuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XHJcbiAgICAgIH1cclxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xyXG4gICAgICBpZiAobmVlZExheWVyKSB7XHJcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbVsyXSkge1xyXG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW1bNF0pIHtcclxuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfSkuam9pbihcIlwiKTtcclxuICB9O1xyXG5cclxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XHJcbiAgICB9XHJcbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG4gICAgaWYgKGRlZHVwZSkge1xyXG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xyXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcclxuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xyXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XHJcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChtZWRpYSkge1xyXG4gICAgICAgIGlmICghaXRlbVsyXSkge1xyXG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcclxuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHN1cHBvcnRzKSB7XHJcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XHJcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xyXG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICByZXR1cm4gbGlzdDtcclxufTsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XHJcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xyXG4gIGlmICghY3NzTWFwcGluZykge1xyXG4gICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XHJcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XHJcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcclxuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcclxuICB9XHJcbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xyXG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9hcHAuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcclxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xyXG4gIHZhciByZXN1bHQgPSAtMTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xyXG4gICAgICByZXN1bHQgPSBpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xyXG4gIHZhciBpZENvdW50TWFwID0ge307XHJcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XHJcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcclxuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XHJcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcclxuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xyXG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XHJcbiAgICB2YXIgb2JqID0ge1xyXG4gICAgICBjc3M6IGl0ZW1bMV0sXHJcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxyXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXHJcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxyXG4gICAgICBsYXllcjogaXRlbVs1XVxyXG4gICAgfTtcclxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcclxuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcclxuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XHJcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XHJcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XHJcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcclxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxyXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xyXG4gIH1cclxuICByZXR1cm4gaWRlbnRpZmllcnM7XHJcbn1cclxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcclxuICBhcGkudXBkYXRlKG9iaik7XHJcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xyXG4gICAgaWYgKG5ld09iaikge1xyXG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFwaS5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiB1cGRhdGVyO1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICBsaXN0ID0gbGlzdCB8fCBbXTtcclxuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xyXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcclxuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XHJcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XHJcbiAgICB9XHJcbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xyXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcclxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcclxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xyXG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xyXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XHJcbiAgfTtcclxufTsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBtZW1vID0ge307XHJcblxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cclxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xyXG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XHJcblxyXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcclxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxyXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXHJcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XHJcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcclxuICB9XHJcbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcclxufVxyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXHJcbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xyXG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcclxuICBpZiAoIXRhcmdldCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcclxuICB9XHJcbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcclxuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xyXG4gIHJldHVybiBlbGVtZW50O1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXHJcbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcclxuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XHJcbiAgaWYgKG5vbmNlKSB7XHJcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xyXG4gIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xyXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xyXG4gIHZhciBjc3MgPSBcIlwiO1xyXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcclxuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XHJcbiAgfVxyXG4gIGlmIChvYmoubWVkaWEpIHtcclxuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xyXG4gIH1cclxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcclxuICBpZiAobmVlZExheWVyKSB7XHJcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XHJcbiAgfVxyXG4gIGNzcyArPSBvYmouY3NzO1xyXG4gIGlmIChuZWVkTGF5ZXIpIHtcclxuICAgIGNzcyArPSBcIn1cIjtcclxuICB9XHJcbiAgaWYgKG9iai5tZWRpYSkge1xyXG4gICAgY3NzICs9IFwifVwiO1xyXG4gIH1cclxuICBpZiAob2JqLnN1cHBvcnRzKSB7XHJcbiAgICBjc3MgKz0gXCJ9XCI7XHJcbiAgfVxyXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xyXG4gIH1cclxuXHJcbiAgLy8gRm9yIG9sZCBJRVxyXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cclxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcclxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxufVxyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXHJcbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcclxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxyXG4gICAgfTtcclxuICB9XHJcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG4gIHJldHVybiB7XHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcclxuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xyXG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXHJcbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XHJcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vYXBwLmNzcyc7XG5pbXBvcnQgJy4vYXBwLmpzJzsiXSwibmFtZXMiOlsiJHRvZG9MaXN0Q29udGVudHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCIkaW5wdXQiLCJjbGVhckNvdW50IiwicGlja2VkIiwicGlja2VkSW5kZXgiLCJ0ZXN0Q29kZSIsIm1lc3NhZ2UiLCJhbGVydCIsImRlbGF5IiwibXMiLCJzZXRUaW1lb3V0IiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY3JlYXRlVG9kbyIsIiR0b2RvTGlzdEl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsIiR0b2RvTGlzdENvdW50ZXIiLCJrZXlDb2RlIiwidGFyZ2V0IiwidmFsdWUiLCJ0ZW1wIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsIkRhdGUiLCJnZXRUaW1lIiwiaW5uZXJIVE1MIiwiY29uY2F0IiwiaW5uZXJUZXh0IiwibGVuZ3RoIiwicHJlcGVuZCIsImFwcGVuZCIsImRyYWdTcmNFbCIsImhhbmRsZU1vdXNlRG93biIsIiRkcmFnRXZlbnRUYXJnZXQiLCJpIiwiY29udGVudHNBY3RpdmVFdmVudCIsImV2ZW50IiwidGltZXNUYXJnZXQiLCJ0YWdOYW1lIiwiY29udGFpbnMiLCJyZW1vdmUiLCJjb21wYXJlIiwiYSIsImIiLCJnZXRBdHRyaWJ1dGUiLCJzb3J0VGltZSIsIkFycmF5IiwiZnJvbSIsInNvcnQiLCJmb3JFYWNoIiwidGltZSIsImFwcGVuZENoaWxkIiwibGlzdEZpbHRlciIsImZpbHRlclR5cGUiLCIkYnV0dG9ucyIsImVsIiwic3R5bGUiLCJkaXNwbGF5IiwiY2xlYXJUb2RvIiwiY2hlY2tEYXRhIiwiY29uZmlybSIsImxlZnRDb3VudCIsImNvdW50IiwicmVtb3ZlQ2hpbGQiLCJwcmV2ZW50RGVmYXVsdCIsInBhcmVudE5vZGUiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJjaGlsZHJlbiIsImluZGV4T2YiLCIkYXJlYSIsInBvaW50ZXJXaWR0aEFyZWEiLCJvZmZzZXRXaWR0aCIsInBvaW50ZXJIZWlnaHRBcmVhIiwib2Zmc2V0SGVpZ2h0IiwibW92ZUF0IiwicGFnZVgiLCJwYWdlWSIsImxlZnQiLCJ0b3AiLCJvbk1vdXNlTW92ZSIsInBhcnNlSW50Iiwid2luZG93IiwiaW5uZXJXaWR0aCIsIm9mZnNldFRvcCIsImNsZWFyQWJzb2x1dGUiLCJvbm1vdXNldXAiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibW91c2VVcEV2ZW50IiwiZHJvcFpvbmUiLCJlbGVtZW50RnJvbVBvaW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJpbmRleCIsImFmdGVyIiwiYmVmb3JlIiwib25rZXlkb3duIiwicG9zaXRpb24iLCJ6SW5kZXgiXSwic291cmNlUm9vdCI6IiJ9