// game.js for Perlenspiel 3.2

// The "use strict" directive in the following line is important. Don't alter or remove it!
"use strict";

// The following comment lines are for JSLint/JSHint. Don't alter or remove them!

/*jslint nomen: true, white: true */
/*global PS */

/*
This is a template for creating new Perlenspiel games.
All event-handling functions are commented out by default.
Uncomment and add code to the event handlers required by your project.
*/

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
[system] = an object containing engine and platform information; see API documentation for details.
[options] = an object with optional parameters; see API documentation for details.
*/

// Uncomment the following BLOCK to expose PS.init() event handler:
var grid={
	x : 16,
	y : 16,
	color : PS.COLOR_WHITE
};

var fade={
	max :15,
	min :0
};

var player={
	x: 5,
	y: 5,
	color : PS.COLOR_BLACK
};

var timer ={
	count : 0,
	time: function(){
		timer.count++;
	}
};


PS.init = function( system, options ) {

	PS.gridSize( grid.x, grid.y );
	PS.gridColor(0x404040);
	PS.statusText("");
	PS.color(player.x,player.y,player.color);


};
PS.keyDown = function(key,shift,ctrl,option){
	"use strict";

	if(key == PS.KEY_ARROW_LEFT || key == 83 || key == 97){
		if(player.x == fade.min){

		}
		else{
			PS.color(player.x,player.y,grid.color);
            player.x = player.x - 1;
            PS.color(player.x,player.y,player.color);
        }

    }
    else if(key == PS.KEY_ARROW_DOWN || key == 83 || key == 115){
		if(player.y == fade.max){

		}
		else{
            PS.color(player.x,player.y,grid.color);
            player.y = player.y + 1;
            PS.color(player.x,player.y,player.color);
		}

    }
    else if(key == PS.KEY_ARROW_RIGHT || key == 68 || key == 100){
		if(player.x == fade.max){

		}
		else{
            PS.color(player.x,player.y,grid.color);
            player.x = player.x + 1;
            PS.color(player.x,player.y,player.color);
		}

    }
    else if(key == PS.KEY_ARROW_UP || key == 87 || key == 119 ){
		if(player.y == fade.min){

		}
		else{
            PS.color(player.x,player.y,grid.color);
            player.y = player.y - 1;
            PS.color(player.x,player.y,player.color);
		}

    }

};


