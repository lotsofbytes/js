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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var images = [];

// preload images

for (i = 0; i < 36; i++) {
	j = i + 1; // filename start with 1
	images[i] = new Image();
	images[i].src = j < 10 ? 'images/JoCard_0' + j + '.jpg' : 'images/JoCard_' + j + '.jpg';
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function inCell(x, y, target) {
	return x >= target.x && x <= target.x + 90 && y >= target.y && y <= target.y + 90;
}

function whichCell(cells, x, y) {
	let i = 0;
	for (let cell of cells) {
		if (inCell(x, y, cell)) return i;
		i++;
	}

	return false; // not on any cell
}

function isAdjacentToBlank(cells, clicked, blank) {
	return true;
}

function swapImageAndBlank(cells, clicked, blank) {
	targetImageNum = cells[clicked].img;

	console.log('clicked=' + clicked + ' blank=' + blank);

	cells[clicked].img = null;
	cells[blank].img = targetImageNum;

	return cells;
}

window.onload = function () {

	let canvas = document.getElementById("canvas"),
	    context = canvas.getContext("2d"),
	    cells = [],
	    blank;

	// randomize numbers for images
	random = shuffleArray(Array.from(Array(36).keys()));
	blank = Math.floor(Math.random() * 34); // random between 0 to 35

	// initialize cells
	let b = 0;
	for ($i = 0; $i <= 5; $i++) {
		for ($j = 0; $j <= 5; $j++) {

			imageNum = random.shift();

			if (b === blank) imageNum = null;

			cells[b] = { x: $i * 100, y: $j * 100, img: imageNum };
			b++;
		}
	}

	// display images
	displayGrid();

	function displayGrid() {
		for (i = 0; i < 36; i++) {
			if (cells[i].img === null) {
				context.fillStyle = "black";
				context.fillRect(cells[i].x, cells[i].y, 90, 90);
			} else {
				context.drawImage(images[cells[i].img], cells[i].x, cells[i].y);
			}
		}
	}

	canvas.addEventListener("click", function (event) {
		rect = canvas.getBoundingClientRect();

		x = event.clientX - rect.left;
		y = event.clientY - rect.top;

		clicked = whichCell(cells, x, y);

		if (clicked !== false) {
			if (isAdjacentToBlank(cells, clicked, blank)) {
				cells = swapImageAndBlank(cells, clicked, blank);
				blank = clicked;
				displayGrid();
			}
			//			context.fillStyle = "red";
			//			context.fillRect(cell.x, cell.y, 90, 90);
		}
	});

	canvas.addEventListener("mousemove", function (event) {
		rect = canvas.getBoundingClientRect();

		x = event.clientX - rect.left;
		y = event.clientY - rect.top;

		clicked = whichCell(cells, x, y);

		if (clicked !== false) {
			canvas.style.cursor = "pointer";
		} else {
			canvas.style.cursor = "auto";
		}
	});
};

/***/ })
/******/ ]);