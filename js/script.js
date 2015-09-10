window.onload = function(){
	
	var canvas = document.getElementById("canvas");
	var c = canvas.getContext("2d");
	document.addEventListener('keydown', doKeyDown, true);

	var cw = 400,
			ch = 400,
			lastKey;
	
	function doKeyDown(e){
		if(e.keyCode == 37){//left
			player.update("x", -50);
			lastKey = "left";
		}else if(e.keyCode == 38){//up
			player.update("y", -50);
			lastKey = "up";
		}else if(e.keyCode == 39){//right
			player.update("x", 50);
			lastKey = "right";
		}else if (e.keyCode == 40){//down
			player.update("y", 50);
			lastKey = "down";
		}else{
			//do nothing
		}
	}
	
	var levels = [
	  {
	    name: "Level 1",
	    walls: [2,3,4]
	  },
	  {
	    name: "Level 2",
	    walls: [19,20,21]
	  }
	];
	
	
	var walls = [];
	
	function Wall(I){
	  I.w = 50;
	  I.h = 50;
	  I.color = "#272D2D";
	  I.draw = function(){
	    c.fillStyle = "white";
	    c.fillRect(this.x, this.y, 50, 50);
	    c.fillStyle = this.color;
	    roundedRect(c, this.x + 2, this.y + 2, this.w - 4, this.h - 4, 9);
	  }
	  return I;
	}
	
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
	
	function drawMap(){
	  levels[1].walls.forEach(function(i){
	    walls.push(Wall({
	      x: (i%8 * 50),
	      y: (Math.floor(i/8) * 50)
	    }));
	  })
	}
	
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
  
  //Utility function that determines if something collides
  function collides(a, b) {
		return a.x == b.x &&
      a.y == b.y;
	}

  function handleCollisionsWithWalls() {
		walls.forEach(function(wall) {
			if (collides(wall, player)) {
			  console.log("collision");
			  if(lastKey == "left"){
			    player.update("x", 50);
			  }else if(lastKey == "up"){
			    player.update("y", 50);
			  }else if(lastKey == "right"){
			    player.update("x", -50);
			  }else if(lastKey == "down"){
			    player.update("y", -50);
			  }else{
			    //Do nothing
			  }	
			}
		});
		
	}

	function update(){
		player.x = player.x.clamp(0, cw - player.width);
		player.y = player.y.clamp(0, ch - player.height);
		handleCollisionsWithWalls();
	}

	function draw(){
		canvas.width = canvas.width;

		drawBoard();
		walls.forEach(function(wall){
		  //console.log(wall);
		  wall.draw();
		})
		player.draw();
	}

	var FPS = 30;

	function start_game(){
		drawMap();
		refreshIntervalId = setInterval(function(){
			update();
			draw();
		}, 1000 / FPS);
	}

	start_game();
}
