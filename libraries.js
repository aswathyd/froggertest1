// object constructor for most objects (vehicles, logs, inlets, etc.)
function objectArray(sX, sY, w, h, y, n, s, d) {
	this.spriteX = sX;
	this.spriteY = sY;
	this.width = w;
	this.height = h;
	this.y = y;
	this.num = n;
	this.speed = s;
	this.direction = d;
	this.xCoords = new Array();
	if (this.direction == directions.left) {
		this.startX = Math.floor(Math.random() * (width / this.num));
		for (i = 0; i < this.num; i++) {
			this.xCoords[i] = this.startX + i * (width / this.num + this.width);
		}
	} else {
		this.startX = Math.floor(Math.random() * (width / this.num));
		for (i = 0; i < this.num; i++) {
			this.xCoords[i] = this.startX + i * (width / this.num + this.width);
		}
	}
}

var vehicleLibrary = {
	pink: new objectArray(10, 268, 28, 20, 455, 4, 2, directions.left),
	white: new objectArray(46, 264, 28, 24, 420, 3, 1, directions.right),
	yellow: new objectArray(81, 265, 24, 26, 385, 4, 1, directions.left),
	tank: new objectArray(12, 302, 24, 21, 350, 5, 2, directions.right),
	truck: new objectArray(104, 302, 46, 18, 315, 3, 2, directions.left)
}

var logLibrary = {
	shortRight: new objectArray(10, 230, 85, 21, 110, 3, 3, directions.right),
	shortLeft: new objectArray(10, 230, 85, 21, 215, 3, 3, directions.left),
	mediumRight: new objectArray(10, 197, 117, 22, 180, 2, 2, directions.right),
	mediumLeft: new objectArray(10, 197, 117, 22, 180, 2, 2, directions.left),
	longRight: new objectArray(10, 166, 180, 22, 250, 2, 3, directions.right),
	longLeft: new objectArray(10, 166, 180, 22, 145, 2, 3, directions.left)
}

// Frogger!!!
function frog(d, x, y) {
	this.direction = d;
	if (this.direction == directions.left) {
		this.x = x - colSize / 2;
		this.y = y;
		this.jumpX = this.x + colSize / 4;
		this.jumpY = this.y;
		this.spriteX = 81;
		this.spriteY = 337;
		this.spriteJumpX = 112;
		this.spriteJumpY = 338;
		this.width = 18;
		this.height = 23;
		this.jumpWidth = 25;
		this.jumpHeight = 22;
	} else if (this.direction == directions.up) {
		this.x = x;
		this.y = y - laneSize;
		this.jumpX = this.x;
		this.jumpY = this.y + laneSize / 2;
		this.spriteX = 12;
		this.spriteY = 367;
		this.spriteJumpX = 45;
		this.spriteJumpY = 365;
		this.width = 23;
		this.height = 17;
		this.jumpWidth = 22;
		this.jumpHeight = 25;
	} else if (this.direction == directions.right) {
		this.x = x + colSize / 2;
		this.y = y;
		this.jumpX = this.x - colSize / 4;
		this.jumpY = this.y;
		this.spriteX = 14;
		this.spriteY = 333;
		this.spriteJumpX = 45;
		this.spriteJumpY = 335;
		this.width = 17;
		this.height = 23;
		this.jumpWidth = 25;
		this.jumpHeight = 22;
	} else if (this.direction == directions.down) {
		this.x = x;
		this.y = y + laneSize;
		this.jumpX = this.x;
		this.jumpY = this.y - laneSize / 2;
		this.spriteX = 81;
		this.spriteY = 370;
		this.spriteJumpX = 114;
		this.spriteJumpY = 366;
		this.width = 23;
		this.height = 17;
		this.jumpWidth = 22;
		this.jumpHeight = 25;
	}
	this.reset = function() {
		this.x = 187;
		this.y = 490;
		this.direction = directions.up;
	}
}
