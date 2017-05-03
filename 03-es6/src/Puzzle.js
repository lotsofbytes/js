export class Puzzle {

	constructor() {
		// randomize numbers for images
		let random = this.shuffleArray(Array.from(Array(36).keys()));

		this.cells = [];
		this.blank = Math.floor(Math.random() * 34); // random between 0 to 35

		// initialize cells
		let index = 0;

		for(let i = 0; i <= 5; i++) {
			for(let j = 0; j <= 5; j++) {

				let imageNum = random.shift();

				if (index === this.blank) imageNum = null; // blank

				this.cells[index] = {
					x: i*100,
					y: j*100,
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
			this.images[i].src = (j < 10) ? 'images/JoCard_0' + j + '.jpg' : 'images/JoCard_' + j + '.jpg';
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
		return ((x >= target.x) &&
			(x <= target.x + 90) &&
			(y >= target.y) &&
			(y <= target.y + 90)
			);
	}

	whichCell(x, y) {
		let i = 0;
		for(let cell of this.cells) {
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
			}
			else {
				context.drawImage(this.images[this.cells[i].img], this.cells[i].x, this.cells[i].y);
			}
		}
	}


}
