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
    myX: 5,
    myY: 5,
    myM: 0,
    oldX: 5,
    oldY: 5,
    changeDir: false,
    hitWall: false,
    hitCeiling: false

};
var timer ={
	count : 0,
    touchedWall: false,

	time:function(){

		timer.count += 1;
		if(ball.myM == 0 || ball.myM == 1){
		    if(timer.count % 2 == 0){
		        redraw();
            }
        }
        else if(ball.myM == 2){
		    if(timer.count % 1 == 0){
		        redraw();
            }

        }
	}
};
var level ={
    level1: true,
    level2: false,
    timeL: 90


};

function knockback(){
    PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
    if(ball.myX == 0 && ball.myM == 0){
        ball.myX++;
        ball.hitWall = false;
        ball.hitCeiling = false;
    }
    else if(ball.myX == 10 && ball.myM == 0) {
        ball.myX--;
        ball.hitWall = false;
        ball.hitCeiling = false;
    }

}
function wallBall(){
    ball.oldX = ball.myX;
    ball.oldY = ball.myY;

    if(ball.oldY == 0 || ball.oldY == 7){
        ball.hitCeiling = true;
    }
    else{
        ball.hitWall = true;
    }
}

function redraw() {
    PS.statusText(ball.myM);

    if (ball.myM == 0 && ball.myY < 7) {
        knockback();
        PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
        ball.myY = ball.myY + 1;
        PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
    }
    else if(ball.hitCeiling == true){
        if(mousePos.mouseX < ball.oldX){
            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myY = ball.myY + 1;
            ball.myX = ball.myX + 1;
            PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
            if (ball.myX == 0 || ball.myY == 7 || ball.myX ==10) {
                ball.myM--;
                playSound();
            }
        }
        else if(mousePos.mouseX > ball.oldX){
            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myY = ball.myY + 1;
            ball.myX = ball.myX - 1;
            PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
            if (ball.myX == 0 || ball.myY == 7 || ball.myX ==10) {
                ball.myM--;
                playSound();
            }
        }
        else if(ball.oldX == 5){
            if(mousePos.mouseX > 5){
                PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
                ball.myY = ball.myY + 1;
                ball.myX = ball.myX - 1;
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                if (ball.myX == 0 || ball.myY == 7 || ball.myX ==10) {
                    ball.myM--;
                    playSound();
                }
            }
            else{
                PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
                ball.myY = ball.myY + 1;
                ball.myX = ball.myX + 1;
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                if (ball.myX == 0 || ball.myY == 7 || ball.myX ==10) {
                    ball.myM--;
                    playSound();
                }
            }
        }
    }
    else if (ball.myM == 1) {
        if (mousePos.mouseX <= ball.oldX + 2 && mousePos.mouseX > ball.oldX && ball.hitWall == false || ball.hitWall == true && ball.myX > 5) {
            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myY = ball.myY - 1;
            ball.myX = ball.myX - 1;
            PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                ball.myM--;
                playSound();
            }
        }
        else if (mousePos.mouseX <= ball.oldX + 4 && mousePos.mouseX > ball.oldX + 2) {

            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);

            ball.myX = ball.myX - 1;
            ball.myY = ball.myY - 1;
            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                ball.myM--;
                playSound();
            }
            else {
                ball.myX = ball.myX - 1;
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);

                if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                    ball.myM--;
                    playSound();
                }

            }


        }
        else if (mousePos.mouseX == ball.oldX + 5) {

            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myY = ball.myY - 1;
            ball.myX = ball.myX - 1;
            if (ball.myX == 0 || ball.myY == 0) {
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                ball.myM--;
                playSound();
            }
            else {
                ball.myX--;
                if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                    PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                    ball.myM--;
                    playSound();
                }
                else {
                    ball.myX--;
                    PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                    if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                        PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                        ball.myM--;
                        playSound();
                    }
                }
            }

        }
        else if (mousePos.mouseX >= ball.oldX - 2 && mousePos.mouseX < ball.oldX && ball.hitWall == false || ball.hitWall == true && ball.myX < 5) {
            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myY = ball.myY - 1;
            ball.myX = ball.myX + 1;
            PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                ball.myM--;
                playSound();
            }
        }
        else if (mousePos.mouseX >= ball.oldX - 4 && mousePos.mouseX < ball.oldX - 2) {

            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);

            ball.myX = ball.myX + 1;
            ball.myY = ball.myY - 1;

            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                ball.myM--;
                playSound();
            }
            else {
                ball.myX = ball.myX + 1;
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                    ball.myM--;
                    playSound();
                }

            }
        }
        else if (mousePos.mouseX == ball.oldX - 5) {

            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myY = ball.myY - 1;
            ball.myX = ball.myX + 1;

            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                ball.myM--;
                playSound();
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
            }
            else {
                ball.myX++;
                if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                    PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                    ball.myM--;
                    playSound();
                }
                else {
                    ball.myX++;
                    PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                    if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                        ball.myM--;
                        playSound();
                    }
                }
            }
        }
    }
    else if (ball.myM == 2) {
        if (mousePos.mouseX <= ball.oldX + 2 && mousePos.mouseX > ball.oldX) {

            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myY = ball.myY - 1;
            ball.myX = ball.myX - 1;
            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                ball.myM--;
                playSound();
                wallBall();
            }
            else {
                ball.myY--;
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                    ball.myM--;
                    playSound();
                    wallBall();
                }

            }
        }
        else if (mousePos.mouseX <= ball.oldX + 4 && mousePos.mouseX > ball.oldX + 2) {

            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myY = ball.myY - 1;
            ball.myX = ball.myX - 1;
            PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                ball.myM--;
                playSound();
                wallBall();
            }
        }
        else if (mousePos.mouseX == ball.oldX + 5) {

            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myX = ball.myX - 1;
            ball.myY = ball.myY - 1;

            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                ball.myM--;
                playSound();
                wallBall();
            }
            else {
                ball.myX = ball.myX - 1;
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);

                if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                    ball.myM--;
                    playSound();
                    wallBall();
                }

            }
        }
        else if (mousePos.mouseX >= ball.oldX - 2 && mousePos.mouseX < ball.oldX) {

            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myY = ball.myY - 1;
            ball.myX = ball.myX + 1;
            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                ball.myM--;
                playSound();
                wallBall();
            }
            else {
                ball.myY--;
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                    ball.myM--;
                    playSound();
                    wallBall();
                }
            }
        }
        else if (mousePos.mouseX >= ball.oldX - 4 && mousePos.mouseX < ball.oldX - 2) {

            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);
            ball.myY = ball.myY - 1;
            ball.myX = ball.myX + 1;
            PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                ball.myM--;
                playSound();
                wallBall();
            }
        }
        else if (mousePos.mouseX == ball.oldX - 5) {

            PS.color(ball.myX, ball.myY, PS.COLOR_WHITE);

            ball.myX = ball.myX + 1;
            ball.myY = ball.myY - 1;
            if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                PS.color(ball.myX,ball.myY,PS.COLOR_BLACK);
                ball.myM--;
                playSound();
                wallBall();
            }
            else {
                ball.myX = ball.myX + 1;
                PS.color(ball.myX, ball.myY, PS.COLOR_BLACK);
                if (ball.myX == 0 || ball.myY == 0 || ball.myX == 10 || ball.myY == 7) {
                    ball.myM--;
                    playSound();
                    wallBall();
                }

            }
        }
    }
}

var mousePos = {
    mouseX: 0,
    mouseY: 0,
    touched: false
};


PS.init = function( system, options ) {
	// Uncomment the following code line to verify operation:

	 PS.gridSize( 11, 11);
	 PS.gridColor( 0x4468a3 );
	 PS.borderColor(PS.ALL,PS.ALL,PS.COLOR_BLUE);

	 PS.statusText( "Ball" );

	 PS.color(ball.myX,ball.myY,PS.COLOR_BLACK);
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
function changeMomentum(x,y){
    if(y < 7 && y > 7){

    }
    else if(y == 8){
        ball.myM = 1;

    }
    else if(y >= 9){
        ball.myM = 2;
    }

}

PS.touch = function(x ,y,data,options){
    if(x == ball.myX && y == ball.myY)
    {
        mousePos.touched = true;

    }


};
PS.release = function(x,y,data,options){
    if(mousePos.touched == true){
        mousePos.mouseX = x;
        mousePos.mouseY = y;
        ball.oldX = ball.myX;
        ball.oldY = ball.myY;
        changeMomentum(mousePos.mouseX, mousePos.mouseY);
        mousePos.touched = false;
    }
};