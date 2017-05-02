import { Puzzle } from './Puzzle';

var images = [];

// p, imagesreload images

for (let i = 0; i < 36; i++) {
	let j = i + 1; // filename start with 1
	images[i] = new Image();
	images[i].src = (j < 10) ? 'images/JoCard_0' + j + '.jpg' : 'images/JoCard_' + j + '.jpg';
}


window.onload = function () {

	var johnny = new Puzzle();

	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");


	// display images
	johnny.display(context, images);

	canvas.addEventListener("click", function(event) {
		let rect = canvas.getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;
		let clicked = johnny.whichCell(x, y);

		if (clicked !== false) {
			if (johnny.isAdjacentToBlank(clicked)) {
				johnny.swapImageAndBlank(clicked);
				johnny.display(context, images);
			}
//			context.fillStyle = "red";
//			context.fillRect(cell.x, cell.y, 90, 90);
		}
	});

	canvas.addEventListener("mousemove", function(event) {
		let rect = canvas.getBoundingClientRect();
		let x = event.clientX - rect.left;
		let y = event.clientY - rect.top;
		let clicked = johnny.whichCell(x, y);

		if (clicked !== false) {
			canvas.style.cursor = "pointer";
		}
		else {
			canvas.style.cursor = "auto";
		}
	});
}
