/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Puzzle {

	constructor() {
		// randomize numbers for images
		let random = this.shuffleArray(Array.from(Array(36).keys()));

		this.cells = [];
		this.blank = Math.floor(Math.random() * 34); // random between 0 to 35

		// initialize cells
		let index = 0;

		for (let i = 0; i <= 5; i++) {
			for (let j = 0; j <= 5; j++) {

				let imageNum = random.shift();

				if (index === this.blank) imageNum = null; // blank

				this.cells[index] = {
					x: i * 100,
					y: j * 100,
					img: imageNum
				};
				index++;
			}
		}

		// preload images
		this.images = [];

		for (let i = 0; i < 36; i++) {
			let j = i + 1; // filename start with 1
			this.images[i] = new Image();
			this.images[i].src = j < 10 ? 'images/JoCard_0' + j + '.jpg' : 'images/JoCard_' + j + '.jpg';
		}
	}

	shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	inCell(x, y, target) {
		return x >= target.x && x <= target.x + 90 && y >= target.y && y <= target.y + 90;
	}

	whichCell(x, y) {
		let i = 0;
		for (let cell of this.cells) {
			if (this.inCell(x, y, cell)) return i;
			i++;
		}
		return false; // not on any cell
	}

	isAdjacentToBlank(clicked) {
		return true;
	}

	swapImageAndBlank(clicked) {
		let target = this.cells[clicked].img;

		console.log('clicked=' + clicked + ' blank=' + this.blank);

		this.cells[clicked].img = null;
		this.cells[this.blank].img = target;
		this.blank = clicked;
	}

	display(context) {

		for (let i = 0; i < 36; i++) {
			if (this.cells[i].img === null) {
				context.fillStyle = "black";
				context.fillRect(this.cells[i].x, this.cells[i].y, 90, 90);
			} else {
				context.drawImage(this.images[this.cells[i].img], this.cells[i].x, this.cells[i].y);
			}
		}
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Puzzle;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Puzzle__ = __webpack_require__(0);


var johnny = new __WEBPACK_IMPORTED_MODULE_0__Puzzle__["a" /* Puzzle */]();

window.onload = function () {

	var canvas = document.getElementById("canvas"),
	    context = canvas.getContext("2d");

	johnny.display(context);

	canvas.addEventListener("click", function (event) {
		let rect = canvas.getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;
		let clicked = johnny.whichCell(x, y);

		if (clicked !== false) {
			if (johnny.isAdjacentToBlank(clicked)) {
				johnny.swapImageAndBlank(clicked);
				johnny.display(context);
			}
			//			context.fillStyle = "red";
			//			context.fillRect(cell.x, cell.y, 90, 90);
		}
	});

	canvas.addEventListener("mousemove", function (event) {
		let rect = canvas.getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;
		let clicked = johnny.whichCell(x, y);

		if (clicked !== false) {
			canvas.style.cursor = "pointer";
		} else {
			canvas.style.cursor = "auto";
		}
	});
};

/***/ })
/******/ ]);