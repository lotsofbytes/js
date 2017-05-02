var images = [];

// preload images

for (let i = 0; i < 36; i++) {
	j = i + 1; // filename start with 1
	images[i] = new Image();
	images[i].src = (j < 10) ? 'images/JoCard_0' + j + '.jpg' : 'images/JoCard_' + j + '.jpg';
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
	return ((x >= target.x) &&
		(x <= target.x + 90) &&
		(y >= target.y) &&
		(y <= target.y + 90)
		);
}

function whichCell(cells, x, y) {
	let i = 0;
	for(let cell of cells) {
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
	for($i = 0; $i <= 5; $i++) {
		for($j = 0; $j <= 5; $j++) {

			imageNum = random.shift();

			if (b === blank) imageNum = null;

			cells[b] = {x:$i*100, y:$j*100, img: imageNum};
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
			}
			else {
				context.drawImage(images[cells[i].img], cells[i].x, cells[i].y);
			}
		}
	}

	canvas.addEventListener("click", function(event) {
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

	canvas.addEventListener("mousemove", function(event) {
		rect = canvas.getBoundingClientRect();

		x = event.clientX - rect.left;
		y = event.clientY - rect.top;

		clicked = whichCell(cells, x, y);

		if (clicked !== false) {
			canvas.style.cursor = "pointer";
		}
		else {
			canvas.style.cursor = "auto";
		}
	});
}
