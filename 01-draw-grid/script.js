var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	boxes = [];

for($i = 0; $i <= 5; $i++) {
	for($j = 0; $j <= 5; $j++) {
		boxes.push({ x:$i*100, y:$j*100});
	}
}

for (let box of boxes) {
	context.fillRect(box.x, box.y, 90, 90);
}

function inBox(x, y, box) {
	return ((x >= box.x) &&
		(x <= box.x + 90) &&
		(y >= box.y) &&
		(y <= box.y + 90)
		);
}

canvas.addEventListener("click", function(event) {
	rect = canvas.getBoundingClientRect();

	x = event.clientX - rect.left;
	y = event.clientY - rect.top;

	for(let box of boxes) {
		if (inBox(x, y, box)) {
			context.fillStyle = "red";
			context.fillRect(box.x, box.y, 90, 90);
			break;
		}
	}
});

canvas.addEventListener("mousemove", function(event) {
	rect = canvas.getBoundingClientRect();

	x = event.clientX - rect.left;
	y = event.clientY - rect.top;

	for(let box of boxes) {
		if (inBox(x, y, box)) {
			canvas.style.cursor = "pointer";
			break;
		}
		else {
			canvas.style.cursor = "auto";
		}

	}
});
