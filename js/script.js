window.onload = function(){
	
	var canvas = document.getElementById("canvas");
	var c = canvas.getContext("2d");
	document.addEventListener('keydown', doKeyDown, true);

	var cw = 400,
			ch = 400;
	
	function doKeyDown(e){
		if(e.keyCode == 37){//right
			player.update("x", -50);
		}else if(e.keyCode == 38){//up
			player.update("y", -50);
		}else if(e.keyCode == 39){//left
			player.update("x", 50);
		}else if (e.keyCode == 40){//down
			player.update("y", 50);
		}else{
			//do nothing
		}
	}
	
	var map = {
	  name: "Level 1",
	  walls: [2,3, 4],
	  drawMap: function(){
	    for (var i = 0; i < this.walls.length; i++){
	      var x = this.walls[i] % 8;
	      var y = Math.floor(this.walls[i] / 8);
	      c.fillStyle = "white";
	      c.fillRect(x * 50, y * 50, 50, 50);
	      c.fillStyle = "#272D2D";
	      roundedRect(c, x * 50 + 2, y * 50 + 2, 50 - 4, 50 - 4, 10);
	    }
	  }
	};
	
	function drawBoard(){
		for (var x = 0; x <= cw; x += 50) {
      c.moveTo(x, 0);
      c.lineTo(x, ch);
		}


    for (var x = 0; x <= ch; x += 50) {
      c.moveTo(0, x);
      c.lineTo(cw, x);
		}

		c.strokeStyle = "black";
		c.stroke();
	}

	/* CREATE THE PLAYER */
	var player = {
		bcolor: "white",
		color: "#A846A0",
		width: 50,
		height: 50,
		x: 0,
		y: 0,

		draw: function(){
		  c.fillStyle = this.bcolor;
		  c.fillRect(this.x, this.y, this.width, this.height);
			c.fillStyle = this.color;
			c.strokeStyle = this.color;
			roundedRect(c, this.x+3, this.y+3, this.width -6, this.height -6, 10);
		},

		update: function(direction, value){
			if(direction == "x"){
				this.x += value;
			}
			else{
				this.y += value;
			}
		}
	};
	
	
	// Draw a rounded rectangle utility function
	function roundedRect(ctx,x,y,width,height,radius){
    ctx.beginPath();
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y+height-radius);
    ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
    ctx.lineTo(x+width-radius,y+height);
    ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    ctx.lineTo(x+width,y+radius);
    ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
    ctx.lineTo(x+radius,y);
    ctx.quadraticCurveTo(x,y,x,y+radius);
    ctx.fill();
  }

	function update(){
		player.x = player.x.clamp(0, cw - player.width);
		player.y = player.y.clamp(0, cw - player.height);
	}

	function draw(){
		canvas.width = canvas.width;

		drawBoard();
		player.draw();
		map.drawMap();
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
