function runGame() {
	setInterval(function() {
		if (time > 0) {
			if (deathPause > 0) {
				runDeath();
			} else if (movePause > 0) {
				runMove();
			} else {
				runRegular();
			}
		} else {
			runEndGame();
		}
	}, timeInterval);
}
function runDeath() {drawGame();drawDeadFrog();drawDeadFrogMsg();deathPause--;}
function runMove() {update();drawGame();drawMovingFrog();movePause--;}
function runRegular() {update();drawGame();drawFrog(frogger);}
function runEndGame() {
	drawGame();
	deadFrog = {
		x: frogger.x,
		y: frogger.y
	}
	drawDeadFrog();
	clickOn = true;		// allows user to play again
	time = 0;
	if (score > highScore) {
		highScore = score;
		localStorage["highScore"] = highScore;
		isNewHighScore = true;
	}
	drawGameOver();
}
function update() {
	updateMovingObjects(vehicles);
	updateMovingObjects(logs);
	updateFly();
	if (isHome()) {
		updateHome();
	} else {
		if (isCollisionDeath()) {
			updateCollisionDeath();
		} else if (isUpArrow) {
			score += 10;
			isUpArrow = false;
		}
	}
	time--;
}
function updateMovingObjects(objectArray) {
	for (i = 0; i < objectArray.length; i++) {
		for (j = 0; j < objectArray[i].num; j++) {
			if (objectArray[i].direction == directions.left) {
				if (objectArray[i].xCoords[j] <= 0 - objectArray[i].width) {
					objectArray[i].xCoords[j] = 399 + objectArray[i].width;
				} else {
					objectArray[i].xCoords[j] -= objectArray[i].speed;
				}
			} else {
				if (objectArray[i].xCoords[j] >= 399 + objectArray[i].width) {
					objectArray[i].xCoords[j] = 0 - objectArray[i].width;
				} else {
					objectArray[i].xCoords[j] += objectArray[i].speed;
				}
			}
		}
	}
}
function updateFly() {
	if (fly[0].isActive) {
		if (fly[0].intervalsActive == 0) {
			fly[0].isActive = false;
		} else {
			fly[0].intervalsActive--;
			drawFly();
		}
	} else {
		initFly();
	}
}
function isCollisionWith(objectArray, isMoving) {
	var xSpan, ySpan;
	for (i = 0; i < objectArray.length; i++) {
		ySpan = (frogger.y >= objectArray[i].y && frogger.y <= objectArray[i].y + objectArray[i].height) || (frogger.y + frogger.height >= objectArray[i].y && frogger.y <= objectArray[i].y + objectArray[i].height);
		for (j = 0; j < objectArray[i].num; j++) {
			xSpan = (frogger.x >= objectArray[i].xCoords[j] && frogger.x <= objectArray[i].xCoords[j] + objectArray[i].width) || (objectArray[i].xCoords[j] >= frogger.x && objectArray[i].xCoords[j] <= frogger.x + frogger.width);
			if (xSpan && ySpan) {
				if (isMoving) {
					moveFrogWith(objectArray[i]);
				}
				return true;
			}
		}
	}
	return false;
}
function moveFrogWith(object) {
	if (object.direction == directions.left) {
		frogger.x -= object.speed;
	} else {
		frogger.x += object.speed;
	}
}
function isHome() {
	return isCollisionWith(inlets, false) && !isCollisionWith(frogsHome, false) && !isCollisionWith(badlands, false);
}
function isCollisionDeath() {
	return isCollisionWith(vehicles, false) || (frogger.y < 262 && (!isCollisionWith(logs, true) || (frogger.x <= 0 || frogger.x + frogger.width >= 399) || isCollisionWith(badlands, false)));
}
function updateCollisionDeath() {
	deadFrog = {
		x: frogger.x,
		y: frogger.y
	};
	numLives--;
	gameOver = numLives <= 0;
	isUpArrow = false;
	if (gameOver) {
		runEndGame();
	} else {
		frogger.reset();
		deathPause = 50;
		movePause = 0;
	}
}
function updateHome() {
	score += 50 + Math.round(time * (timeInterval / 1000));
	numHome++;
	if (fly[0].isActive && isCollisionWith(fly, false)) {
		score += 200;
		fly[0].isActive = false;
		fly[0].intervalsActive = 0;
	}
	updateFrogsHome();
	frogger.reset();
	if (numHome % 5 == 0) {
		score += 1000;
		increaseLevel();
	}
}
function updateFrogsHome() {
	var x;
	if (frogger.x <= 95) {
		x = 15;
	} else if (frogger.x <= 178) {
		x = 100;
	} else if (frogger.x <= 265) {
		x = 185;
	} else if (frogger.x <= 348) {
		x = 270;
	} else {
		x = 355;
	}
	frogsHome.push({
		homeFrog: new frog(directions.up, x, 114),
		num: 1,
		xCoords: new Array(),
		y: 72,
		width: 23,
		height: 17
	});
	frogsHome[frogsHome.length - 1].xCoords[0] = frogsHome[frogsHome.length - 1].homeFrog.x;
}
function increaseLevel() {
	level++;
	initObjects();
	increaseSpeed(vehicles);
	increaseSpeed(logs);
}
function increaseSpeed(objectArray) {
	for (i = 0; i < objectArray.length; i++) {
		objectArray[i].speed++;
	}
}
function eventListener() {
	$(document).keydown(function(event) {
		var arrow = {
			left: 37,
			up: 38,
			right: 39,
			down: 40
		}
		if (deathPause == 0) {
			if (event.which == arrow.left || event.keyCode == arrow.left) {
				frogger = new frog(directions.left, frogger.x, frogger.y);
				movePause = 2;
			} else if (event.which == arrow.up || event.keyCode == arrow.up) {
				frogger = new frog(directions.up, frogger.x, frogger.y);
				movePause = 2;
				isUpArrow = true;
			} else if (event.which == arrow.right || event.keyCode == arrow.right) {
				frogger = new frog(directions.right, frogger.x, frogger.y);
				movePause = 2;
			} else if ((event.which == arrow.down || event.keyCode == arrow.down) && frogger.y < 485) {
				frogger = new frog(directions.down, frogger.x, frogger.y);
				movePause = 2;
			} else {
				return;
			}
		} else {
			return;
		}
		event.preventDefault();
	});
	$("#clickSubmit").click(function() {
		if (clickOn) {
			submitScore();
		}
	});
	$("#clickPlay").click(function() {
		if (clickOn) {
			init();
		}
	});
}
function submitScore() {
	var username = window.prompt("Please enter your username:");
	while (username == null || username == "") {
		username = window.prompt("Oops! Please enter your username again:");
	}
	var postURL = "http://vast-tundra-5648.herokuapp.com/submit.json";
	$.post(postURL, {
		game_title: "Frogger",
		username: username,
		score: score
	});
	init();
}
