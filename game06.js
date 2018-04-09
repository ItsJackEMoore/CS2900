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

var platforms ={
    //worded numbers is what you assign PS.sprite
    one: null,
    xy1:[0,0], //array where 0 is X and Y is 1
    two: null,
    xy2: [0,0],
    three: null,
    xy3: [0,0],
    four:null,
    xy4: [0,0],
};

var ball = {
    remove: false,
    isOnPlatform: false,
    moves: 1,
    image: null,
    x:5,
    y:7,
    startX: 4,
    startY:7,
    touched: false,
    moving:false,

};

function fixMovement(){

    var x = platforms.xy1[0];
    var y = platforms.xy1[1];
    var x2 = platforms.xy2[0];
    var y2 = platforms.xy2[0];
    var x3 = platforms.xy3[1];
    var y3 = platforms.xy3[0];
    var x4 = platforms.xy4[0];
    var y4 = platforms.xy4[1];
    //hitting the platforms below the y axis
    if (x == ball.x && y == ball.y - 1 || x + 1 == ball.x  && y == ball.y - 1 || x + 2 == ball.x  && y == ball.y - 1 ||
        x2 == ball.x && y2 == ball.y - 1 || x2 + 1 == ball.x  && y2 == ball.y - 1 || x2 + 2 == ball.x  && y2 == ball.y - 1 ||
        x3 == ball.x && y3 == ball.y - 1 || x3 + 1 == ball.x  && y3 == ball.y - 1 || x3 + 2 == ball.x  && y3 == ball.y - 1 ||
        x4 == ball.x && y4== ball.y - 1 || x4 + 1 == ball.x  && y4 == ball.y - 1 || x4 + 2 == ball.x  && y4 == ball.y - 1 ||
        //Hitting the platform when their y's are the same but from the side
        x == ball.x && y == ball.y || x + 1 == ball.x  && y == ball.y || x + 2 == ball.x  && y == ball.y ||
        x == ball.x && y == ball.y || x + 1 == ball.x  && y == ball.y || x + 2 == ball.x  && y == ball.y ||
        x == ball.x && y == ball.y || x + 1 == ball.x  && y == ball.y || x + 2 == ball.x  && y == ball.y ||
        x == ball.x && y == ball.y || x + 1 == ball.x  && y == ball.y || x + 2 == ball.x  && y == ball.y ||
        //Hitting the platform when the balls y is higher
        x == ball.x && y == ball.y + 1 || x + 1 == ball.x  && y == ball.y + 1 || x + 2 == ball.x  && y == ball.y + 1 ||
        x2 == ball.x && y2 == ball.y + 1 || x2 + 1 == ball.x  && y2 == ball.y + 1 || x2 + 2 == ball.x  && y2 == ball.y + 1 ||
        x3 == ball.x && y3 == ball.y + 1 || x3 + 1 == ball.x  && y3 == ball.y + 1 || x3 + 2 == ball.x  && y3 == ball.y + 1 ||
        x4 == ball.x && y4 == ball.y + 1 || x4 + 1 == ball.x  && y4 == ball.y + 1 || x4 + 2 == ball.x  && y4 == ball.y + 1){
        collide();
    }
    else if(ball.y < grid.y -1){
        ball.y++;
        PS.spriteMove(ball.image,ball.x,ball.y);
        PS.alpha(ball.x,ball.y-1,PS.ALPHA_OPAQUE);
        timer.played = false;
    }
}

var timer ={
    test: false,
    gameOver: false,
    timed: null,
    xMove: null,
    yMove: null,
    tutorial: false,
    finish: false,
    count:1,
    firstLoad: true,
    firstClick: false,
    animating: false,
    sound: false,
    played: false,
    array : new Array(), // used when remaking the trajectory of the ball
    time:function(){


        timer.count++;
        if(level.intL > 1){
            PS.statusText(ball.moves);
        }
        if(timer.firstLoad == true) {
            PS.statusText("Click and drag the black square");
            timer.firstLoad = false;
        }
        else if(timer.xMove != null && timer.count % 1 == 0){
            fixMovement();
            if(timer.xMove > grid.x - 1 || timer.xMove < 0 || timer.yMove > grid.y -1 ||
                timer.yMove < 0) {
                collide();
            }

            else if(path.length != 0){
                PS.spriteMove(ball.image,timer.xMove,timer.yMove);
                PS.alpha(ball.x,ball.y,PS.ALPHA_OPAQUE);
                ball.x = timer.xMove;
                ball.y = timer.yMove;
                movement();
            }
            else{
                timer.xMove = null;
                timer.yMove = null;
                timer.animating == false;
            }

        }
        else if(timer.count % 6 == 0 && timer.animating == false){

            if(ball.remove == true){
                ball.moves--;
                ball.remove = false;
            }

            if(ball.y < grid.y -1){
                fixMovement();
            }
            if(level.intL > 1 && ball.moves == 0){
                PS.statusText("Click to try again");
                PS.timerStop(timer.timed);
                timer.gameOver = true;
            }

        }
    }
};

var level ={
    intL: 0,
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
    var coin = Math.floor(Math.random() * 5) + 1;

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
    if(timer.gameOver == true){
        createLevel();
        timer.timed = PS.timerStart(5,timer.time);
    }
    if(timer.tutorial == true && level.intL == 0){
        level.intL++;
        createLevel();
    }
    if(x == ball.x && y == ball.y && timer.firstClick == false && timer.finish == false){
        PS.statusText("Stay in the grid and let go");
        timer.firstClick = true;
    }

    if(x == ball.x && y == ball.y){
        ball.touched = true;
    }

};

PS.release = function(x,y,data,opyions){
    if(ball.touched == true) {
        var launchX = ball.x + (ball.x - x);
        var launchY = ball.y + (ball.y - y);
        path = PS.line(ball.x, ball.y, launchX, launchY); // path is the entire list of the x and y movement
        timer.array = path[path.length - 1];
        movement();
        ball.touched = false;
        if(timer.firstClick == true && timer.tutorial == false && timer.finish == false){
            PS.statusText("Good Job!, Click to Continue");
            timer.tutorial = true;
        }
    }
};

function movement() {
    ball.remove = true;
    timer.test = false;
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
function createLevel(){

    PS.spriteMove(ball.image,ball.startX, ball.startY);
    PS.alpha(ball.x,ball.y,PS.ALPHA_OPAQUE);
    ball.x = ball.startX;
    ball.y = ball.startY;

    switch(level.intL){
        case 1:
            PS.statusText("Land on the blue squares");
            platforms.one = PS.spriteSolid(3,1);
            platforms.xy1 = [8,4];
            PS.spriteSolidColor(platforms.one,0x11C4FF);
            PS.spriteMove(platforms.one,platforms.xy1[0],platforms.xy1[1]);
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }

}
function collide() {
    if(path.length == []){

    }
    else{
        var launchX = ball.x - (ball.x - timer.array[0]);
        var launchY = ball.y + (ball.y - timer.array[1]);
        if(launchX < 0){
            launchX = Math.abs(launchX);
        }
        if(launchX > grid.x)
        {
            launchX = grid.x - 5;
        }
        path = PS.line(ball.x, ball.y,launchX, launchY);
        timer.array = path[path.length - 1];
        timer.test = true;
        playSound();
        movement();
    }


}