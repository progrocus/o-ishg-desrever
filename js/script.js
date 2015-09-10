window.onload = function(){
	
	var canvas = document.getElementById("canvas");
	var c = canvas.getContext("2d");
	document.addEventListener('keydown', doKeyDown, true);

	var cw = 400,
			ch = 400;
	
	function doKeyDown(e){
		if(e.keyCode == 37){//right
			player.update("x", -40);
		}else if(e.keyCode == 38){//up
			player.update("y", -40);
		}else if(e.keyCode == 39){//left
			player.update("x", 40);
		}else if (e.keyCode == 40){//down
			player.update("y", 40);
		}else{
			//do nothing
		}
	}

	function clearCanvas() {
		canvas.width = canvas.width;
	}
	
	function drawBoard(){
		for (var x = 0; x <= cw; x += 40) {
	    c.moveTo(x, 0);
	    c.lineTo(x, ch);
		}


		for (var x = 0; x <= ch; x += 40) {
	    c.moveTo(0, x);
	    c.lineTo(cw, x);
		}

		c.strokeStyle = "black";
		c.stroke();
	}

	/* CREATE THE PLAYER */
	var player = {
		color: "#A846A0",
		width: 40,
		height: 40,
		x: 0,
		y: 0,

		draw: function(){
			c.fillStyle = this.color;
			c.fillRect(this.x, this.y, this.width, this.height);
		},

		update: function(direction, value){
			if(direction == "x"){
				this.x += value;
			}
			else{
				this.y += value;
			}
		}
	}

	function update(){
		player.x = player.x.clamp(0, cw - player.width);
		player.y = player.y.clamp(0, cw - player.height);
	}

	function draw(){
		canvas.width = canvas.width;

		drawBoard();
		player.draw();
	}

	var FPS = 30;

	function start_game(){
		refreshIntervalId = setInterval(function(){
			update();
			draw();
		}, 1000 / FPS);
	}

	start_game();
}
