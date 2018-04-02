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
var ball = {
    image: null,
    x:5,
    y:7,
    touched: false,
    moving:false
};
var timer ={
    count:1,
    time:function(){
        timer.count++;
        if(timer.count % 6 == 0 && ball.moving == false){
            if(ball.y < grid.y -1){
                ball.y++;
                PS.spriteMove(ball.image,ball.x,ball.y);
                PS.alpha(ball.x,ball.y-1,PS.ALPHA_OPAQUE);

            }
        }
    }
};

var level ={
    level1: true,
    level2: false,

};
var grid ={
    x: 11,
    y: 11
};

PS.init = function( system, options ) {
	// Uncomment the following code line to verify operation:
    PS.debug();
	 PS.gridSize( grid.x, grid.y);
	 PS.gridColor( 0x4468a3 );
	 PS.borderColor(PS.ALL,PS.ALL,PS.COLOR_BLUE);

	 PS.statusText( "Ball" );

	 ball.image = PS.spriteSolid(1,1);
	 PS.spriteMove(ball.image,ball.x,ball.y);
	 PS.timerStart(5,timer.time);


    PS.audioLoad( "fx_coin4", { lock: true } ); // load & lock click sound
    PS.audioLoad( "fx_coin5", { lock: true } );
    PS.audioLoad( "fx_coin6", { lock: true } );
    PS.audioLoad( "fx_coin7", { lock: true } );
    PS.audioLoad( "fx_coin8", { lock: true } );


    // Add any other initialization code you need here.
};
function playSound(){
    var coin = Math.floor(Math.random() * 5) + 1

    if(coin == 1 )
    {
        PS.audioPlay("fx_coin4");
    }
    else if(coin == 2)
    {
        PS.audioPlay("fx_coin5");
    }

    else if(coin == 3)
    {
        PS.audioPlay("fx_coin6");
    }
    else if(coin == 4)
    {
        PS.audioPlay("fx_coin7");
    }
    else if(coin == 5)
    {
        PS.audioPlay("fx_coin8");
    }
}
PS.touch = function(x ,y,data,options){

    if(x == ball.x && y == ball.y){
        PS.statusText("Touched Ball");
        ball.touched = true;
    }

};

PS.release = function(x,y,data,opyions){
    var path = null;
    if(ball.touched == true) {
        var launchX = ball.x + (ball.x - x);
        var launchY = ball.y + (ball.y - y);
        path = PS.line(ball.x, ball.y, launchX, launchY);
        movement(path);
        ball.touched = false;
    }
};

function movement(path){
    var i;
    ball.moving = true;
    for(i = 0; i < path.length; i++){
        
        var array = path[i];
        var x = array[0];
        var y = array[1];
        if(x > grid.x - 1 || x < 0){
            if(x > ball.x){
                x = ball.x - 1;
            }
            else{
                x = ball.x +1;
            }
        }
        if(y > grid.y - 1 || y < 0){
            if(y > ball.y){
                y = ball.y - 1;
            }
            else{
                y = ball.y + 1;
            }
        }
        PS.spriteMove(ball.image,x,y);
        PS.alpha(ball.x,ball.y,PS.ALPHA_OPAQUE);
        ball.x = x;
        ball.y = y;
    }
    ball.moving = false;

}
