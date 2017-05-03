import { Puzzle } from './Puzzle';

var johnny = new Puzzle();

window.onload = function () {

	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");

	johnny.display(context);

	canvas.addEventListener("click", function(event) {
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
