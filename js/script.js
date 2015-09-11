window.onload = function(){
	
	var canvas = document.getElementById("canvas");
	var c = canvas.getContext("2d");
	document.addEventListener('keydown', doKeyDown, true);

	var cw = 400,
			ch = 400,
			lastKey,
			currentLevel = 0,
			flipped = false,
			switched = 1,
			goal,
			start;
	
	function doKeyDown(e){
		if(e.keyCode == 37){//left
			player.update("x", -50 * switched);
			lastKey = "left";
		}else if(e.keyCode == 38){//up
			player.update("y", -50 * switched);
			lastKey = "up";
		}else if(e.keyCode == 39){//right
			player.update("x", 50 * switched);
			lastKey = "right";
		}else if (e.keyCode == 40){//down
			player.update("y", 50 * switched);
			lastKey = "down";
		}else{
			//do nothing
		}
	}
	
	/* LEVELS DICTIONARY */
	var levels = [
	  {
	    name: "Level 1",
	    walls: [2,3,4],
	    triggers: [5],
	    floors: [10,11,12],
	    switches: [19],
	    start: 0,
	    goal: 63
	  },
	  {
	    name: "Level 2",
	    walls: [19,20,21],
	    triggers: [6, 34],
	    floors: []
	  }
	];
	
	
	var walls = [];
	var triggers = [];
	var floors = [];
	var switches = [];

	function Tile(I){
	  I.w = 50;
	  I.h = 50;
	  I.colors = {
	  	"wall":"#848887", 
	  	"floor": "white", 
	  	"trigger": "#F7EF99", 
	  	"switch": "#43ADF5",
	  	"goal": "#23CE6B"
	  };
	  I.draw = function(){
	    c.fillStyle = this.colors[this.type];
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

	/* PLAYER  */
	var player = {
		bcolor: "white",
		color: "#A846A0",
		width: 50,
		height: 50,
		x: 0,
		y: 0,

		draw: function(){
      c.fillStyle = this.color;
			roundedRect(c, this.x+5, this.y+5, this.width -10, this.height -10, 10);
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
	  flipped = false;
	  walls.length = 0;
	  floors.length = 0;
	  triggers.length = 0;
	  switches.length = 0;
	  levels[currentLevel].walls.forEach(function(i){
	    walls.push(Tile({
	      x: (i%8 * 50),
	      y: (Math.floor(i/8) * 50),
	      type: "wall"
	    }));
	  });
	  levels[currentLevel].triggers.forEach(function(i){
	    triggers.push(Tile({
	      x: (i%8 * 50),
	      y: (Math.floor(i/8) * 50),
	      type: "trigger"
	    }))
	  });
	  levels[currentLevel].floors.forEach(function(i){
	    floors.push(Tile({
	      x: (i%8 * 50),
	      y: (Math.floor(i/8) * 50),
	      type: "floor"
	    }))
	  });
	  levels[currentLevel].switches.forEach(function(i){
	  	switches.push(Tile({
	  		x: (i%8 * 50),
	      y: (Math.floor(i/8) * 50),
	      type: "switch"
	  	}))
	  })
	}
	
	function flipMap(){
	  flipped = true;
	  walls.length = 0;
	  floors.length = 0;
	  triggers.length = 0;
	  switches.length = 0;
	  levels[currentLevel].walls.forEach(function(i){
	    floors.push(Tile({
	      x: (i%8 * 50),
	      y: (Math.floor(i/8) * 50),
	      type: "floor" 
	    }))
	  });
	  levels[currentLevel].floors.forEach(function(i){
	    walls.push(Tile({
	      x: (i%8 * 50),
	      y: (Math.floor(i/8) * 50),
	      type: "wall" 
	    }))
	  });
	  levels[currentLevel].triggers.forEach(function(i){
	    triggers.push(Tile({
	      x: (i%8 * 50),
	      y: (Math.floor(i/8) * 50),
	      type: "trigger"
	    }))
	  });
	  levels[currentLevel].switches.forEach(function(i){
	  	switches.push(Tile({
	  		x: (i%8 * 50),
	      y: (Math.floor(i/8) * 50),
	      type: "switch"
	  	}))
	  });
	}

	function switchKeys(){

	}
	
	/* UTILITY FUNCTIONS */
	
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
  
  // Utility function that determines if something collides
  function collides(a, b) {
		return a.x == b.x &&
      a.y == b.y;
	}

  // When player collides with Walls
  function handleCollisionsWithWalls() {
		walls.forEach(function(wall) {
			if (collides(wall, player)) {
			  console.log("collision");
			  if(lastKey == "left"){
			    player.update("x", 50 * switched);
			  }else if(lastKey == "up"){
			    player.update("y", 50 * switched);
			  }else if(lastKey == "right"){
			    player.update("x", -50 * switched);
			  }else if(lastKey == "down"){
			    player.update("y", -50 * switched);
			  }else{
			    //Do nothing
			  }	
			}
		});
		triggers.forEach(function(trigger){
		  if(collides(trigger, player) && !flipped){
		    console.log("triggered");
		    flipMap()
		    //Take care of infinite loop
		  }
		});
		switches.forEach(function(s){
			if(collides(s, player) && switched == 1){
				switched = -1;
			}
		})
		if(collides(goal,player)){
			console.log("Level Complete");
		}
		
	}

  /* GAME FUNCTIONS */

	function update(){
		player.x = player.x.clamp(0, cw - player.width);
		player.y = player.y.clamp(0, ch - player.height);
		handleCollisionsWithWalls();
	}

	function draw(){
		canvas.width = canvas.width;

		drawBoard();
		walls.forEach(function(w){
		  w.draw();
		});
		triggers.forEach(function(t){
		  t.draw();
		});
		switches.forEach(function(s){
			s.draw();
		})
		goal.draw();
		player.draw();
	}

	var FPS = 30;

	function start_level(){
		drawMap();
		goal = Tile({
			x: (levels[currentLevel].goal % 8 * 50),
			y: (Math.floor(levels[currentLevel].goal /8) * 50),
			type: "goal"
		})
	}

	function start_game(){
		start_level();
		refreshIntervalId = setInterval(function(){
			update();
			draw();
		}, 1000 / FPS);
	}

	start_game();
}
