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
var path = new Array();

var grid ={
    x: 11,
    y: 11
};
var ball = {
    image: null,
    x:5,
    y:7,
    touched: false,
    moving:false
};
var timer ={
    timed: null,
    xMove: null,
    yMove: null,
    count:1,
    countDown:190,
    animating: false,
    sound: false;
    played: false;
    time:function(){
        timer.count++;
        if(timer.xMove != null && timer.count % 1 == 0){
            if(timer.xMove > grid.x - 1 || timer.xMove < 0){
                if(timer.xMove > ball.x){
                    timer.xMove = ball.x - 1;
                    timer.sound = true;
                }
                else{
                    timer.xMove = ball.x + 1;
                    timer.sound = true;
                }
            }
            if(timer.yMove > grid.y - 1 || timer.yMove < 0){
                if(timer.yMove > ball.y){
                    timer.yMove = ball.y - 1;
                    timer.sound = true;
                }
                else{
                    timer.yMove = ball.y + 1;
                    timer.sound = true;
                }
            }
            PS.spriteMove(ball.image,timer.xMove,timer.yMove);
            PS.alpha(ball.x,ball.y,PS.ALPHA_OPAQUE);
            ball.x = timer.xMove;
            ball.y = timer.yMove;
            timer.xMove = null;
            timer.yMove = null;
            timer.animating = false;
            if(timer.sound == true && timer.played){
                playSound();
                timer.played = true;

            }
            if(path.length != 0){
                movement();
            }
        }
        else if(timer.count % 6 == 0 && timer.animating == false){

            if(ball.y < grid.y -1){
                ball.y++;
                PS.spriteMove(ball.image,ball.x,ball.y);
                PS.alpha(ball.x,ball.y-1,PS.ALPHA_OPAQUE);
                timer.played = false;

            }
        }
    }
};

var level ={
    level1: true,
    level2: false,

};


PS.init = function( system, options ) {
	// Uncomment the following code line to verify operation:
	 PS.gridSize( grid.x, grid.y);
	 PS.gridColor( 0x4468a3 );
	 PS.borderColor(PS.ALL,PS.ALL,PS.COLOR_BLUE);

	 ball.image = PS.spriteSolid(1,1);
	 PS.spriteMove(ball.image,ball.x,ball.y);
	 timer.timed = PS.timerStart(5,timer.time);


    PS.audioLoad( "fx_coin4", { lock: true } ); // load & lock click sound
    PS.audioLoad( "fx_coin5", { lock: true } );
    PS.audioLoad( "fx_coin6", { lock: true } );
    PS.audioLoad( "fx_coin7", { lock: true } );
    PS.audioLoad( "fx_coin8", { lock: true } );


    // Add any other initialization code you need here.
};
function playSound(){
    timer.sound = false;
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
        ball.touched = true;
    }

};

PS.release = function(x,y,data,opyions){
    if(ball.touched == true) {
        var launchX = ball.x + (ball.x - x);
        var launchY = ball.y + (ball.y - y);
        path = PS.line(ball.x, ball.y, launchX, launchY); // path is the entire list of the x and y movement
        movement();
        ball.touched = false;
    }
};

function movement() {
    if (path.length != 0 && timer.animating == false) {
        var array = path[0]; // array contains the movement of x and y of a single movement
        timer.xMove = array[0];
        timer.yMove = array[1];
        if (path.length > 1) {
            path.shift();

        }
        else{
            path = [];
        }
    }
}