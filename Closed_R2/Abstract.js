// game.js for Perlenspiel 3.2

// The "use strict" directive in the following line is important. Don't alter or remove it!
"use strict";

// The following comment lines are for JSLint/JSHint. Don't alter or remove them!

/*jslint nomen: true, white: true */
/*global PS */


// Uncomment the following BLOCK to expose PS.init() event handler:
var gameOn = true;
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
	color : PS.COLOR_BLACK,
    hasMoved : false,
    hint : false
};

var timer ={
    timed : null,
	count : 0,
    x: null, // last place ball was last 30 seconds
    y:null, // last place the ball was last 30 seconds
	time: function(){
		timer.count++;
		if(timer.count % 4 == 0){
		    eMove();		    

        }
        if(timer.count % 20 == 0 && player.hasMoved == false && player.hint == false){
		    player.hint = true;
            if ( db && PS.dbValid( db ) ) {
                PS.dbEvent( db, "Hint Given", 1 ); // val can be anything
            }
		    hint();
        }
        if(timer.count % 20 == 0){
            if ( db && PS.dbValid( db ) ) {
                PS.dbEvent( db, "New NPC Spawned", 1 ); // val can be anything
            }
		    createNPC();
            playSound(1);

            PS.statusColor(0x404040);
        }
        if(timer.count %80 == 0){
		    timer.x = player.x;
		    timer.y = player.y;
        }
        if(timer.count % 80 == 0 && player.hint == true){
            PS.glyph(14,14,0);
            PS.glyph(13,15,0);
            PS.glyph(15,15,0);
            PS.glyph(14,15,0);

        }
        if(timer.count % 165 == 0){
		    if(timer.x === player.x && timer.y == player.y){
		        gameOver();
            }
        }

	}
};

var NPC ={
    location: new Array(),
    color: 0xB1B1B1
};

var db = "Black Sheep";

function finalize(){
    PS.gridSize( grid.x, grid.y );
    PS.gridColor(0x404040);
    PS.color(player.x,player.y,player.color);
    timer.timed = PS.timerStart(5,timer.time);
    PS.borderColor(PS.ALL,PS.ALL,grid.color);

    var array = [0,0];
    NPC.location.push(array)
    PS.statusColor(grid.color);
    PS.statusText("Black Sheep");
    PS.statusFade(20);

    PS.audioLoad("start",{path: "Sounds/"});
    PS.audioLoad("end",{path: "Sounds/"});
    PS.audioPlay("start",{path: "Sounds/"});



}


PS.init = function( system, options ) {
    "use strict";
    if ( db ) {
        db = PS.dbInit( db, { login : finalize } );
        if ( db === PS.ERROR ) {
            db = null;
        }
    }
    else {
        finalize();
    }
};


PS.keyDown = function(key,shift,ctrl,option){
	"use strict";
if(gameOn == true){
    if(key == PS.KEY_ARROW_LEFT || key == 83 || key == 97){
        player.hasMoved = true;
        if(player.x == fade.min || hittingNPC(player.x-1,player.y) == true){

        }
        else{
            PS.color(player.x,player.y,grid.color);
            player.x = player.x - 1;
            PS.color(player.x,player.y,player.color);
	    playSound(2);
        }

    }
    else if(key == PS.KEY_ARROW_DOWN || key == 83 || key == 115){
        player.hasMoved = true;
        if(player.y == fade.max ||  hittingNPC(player.x,player.y + 1) == true){

        }
        else{
            PS.color(player.x,player.y,grid.color);
            player.y = player.y + 1;
            PS.color(player.x,player.y,player.color);
	    playSound(2);
        }

    }
    else if(key == PS.KEY_ARROW_RIGHT || key == 68 || key == 100){
        player.hasMoved = true;
        if(player.x == fade.max ||  hittingNPC(player.x+1,player.y) == true){

        }
        else{
            PS.color(player.x,player.y,grid.color);
            player.x = player.x + 1;
            PS.color(player.x,player.y,player.color);
	    playSound(2);
        }

    }
    else if(key == PS.KEY_ARROW_UP || key == 87 || key == 119 ){
        player.hasMoved = true;
        if(player.y == fade.min ||  hittingNPC(player.x,player.y - 1) == true){

        }
        else{
            PS.color(player.x,player.y,grid.color);
            player.y = player.y - 1;
            PS.color(player.x,player.y,player.color);
	    playSound(2);
        }

    }

}
	
};

function eMove(){
    var i = 0;
    clean();
    for(i ; i < NPC.location.length; i++){
        var loc = NPC.location[i];
        if(loc[0] < player.x && !(loc[0] + 1 == player.x && loc[1] == player.y)){
            if(hittingNPC(loc[0] + 1,loc[1]) == true){

            }
            else{
                loc[0] = loc[0] + 1;
            }

        }
        if(loc[0] > player.x && !(loc[0] - 1 == player.x && loc[1] == player.y)){
            if(hittingNPC(loc[0] - 1,loc[1]) == true){

            }
            else{
                loc[0] = loc[0] - 1;
            }


        }
        if(loc[1] < player.y && !(loc[1] +1 == player.y && loc[0] == player.x)){
            if(hittingNPC(loc[0],loc[1] + 1) == true){

            }
            else{
                loc[1] = loc[1] + 1;
            }

        }
        if(loc[1] > player.y && !(loc[1] - 1 == player.y && loc[0] == player.x)){
            if(hittingNPC(loc[0],loc[1] - 1) == true){

            }
            else{
                loc[1] = loc[1] - 1;
            }

        }
        NPC.location[i] = loc;
    }

    redraw();
}

function clean(){
    for(var i = 0; i < NPC.location.length; i++){
        var loc = NPC.location[i];
        PS.color(loc[0],loc[1],grid.color);
    }

}

function redraw(){
    for(var i = 0 ; i < NPC.location.length; i++){
        var loc = NPC.location[i];
        PS.color(loc[0],loc[1],NPC.color);
    }

}

PS.shutdown = function( options ) {
    if ( db && PS.dbValid( db ) ) {
        PS.dbEvent( db, "shutdown", true );
        PS.dbSend( db, "bmoriarty", { discard : true } );
    }
};

function hittingNPC(x,y){
    for(var i = 0 ; i < NPC.location.length; i++){
        var array = NPC.location[i];

        if(x == array[0] && y == array[1]){
            return true
        }
    }
    return false
}

function createNPC(){
    var x = Math.floor(Math.random() *16);
    var y = Math.floor(Math.random() *16);

    var array = [x,y];
    NPC.location.push(array);
}
function gameOver() {
    PS.timerStop(timer.timed);
    endGame();
    if ( db && PS.dbValid( db ) ) {
        PS.dbEvent( db, "gameover", true );
            PS.dbSend( db, "bmoriarty", { discard : true } );
            db = null;
    }


}

function hint(){
    PS.glyph(14,14,0x77);
    PS.glyph(13,15,0x61);
    PS.glyph(15,15,0x64);
    PS.glyph(14,15,0x73);

}
function endGame(){
    PS.audioStop("start",{path: "Sounds/"});
    PS.audioPlay("end",{path: "Sounds/"});
    gameOn = false;
    PS.fade(PS.ALL,PS.ALL,20);
    PS.statusColor(PS.COLOR_WHITE);
    PS.color(PS.ALL,PS.ALL,NPC.color);
}

function playSound(x){
    switch(x){
        case 1:
            var y = Math.floor(Math.random() * 4);
            switch(y){
                case 0:
                    PS.audioLoad("spawn1",{path: "Sounds/"});
                    PS.audioPlay("spawn1",{path: "Sounds/"});
                    break;
                case 1:
                    PS.audioLoad("spawn2",{path: "Sounds/"});
                    PS.audioPlay("spawn2",{path: "Sounds/"});
                    break;
                case 2:
                    PS.audioLoad("spawn3",{path: "Sounds/"});
                    PS.audioPlay("spawn3",{path: "Sounds/"});
                    break;
                case 3:
                    PS.audioLoad("spawn4",{path: "Sounds/"});
                    PS.audioPlay("spawn4",{path: "Sounds/"});
                    break;

            }
            break;
        case 2:
            var y = Math.floor(Math.random() * 4);
            switch(y){
                case 0:
                    PS.audioLoad("beep1",{path: "Sounds/"});
                    PS.audioPlay("beep1",{path: "Sounds/",volume: 0.10});
                    break;
                case 1:
                    PS.audioLoad("beep2",{path: "Sounds/"});
                    PS.audioPlay("beep2",{path: "Sounds/",volume: 0.10});
                    break;
                case 2:
                    PS.audioLoad("beep3",{path: "Sounds/"});
                    PS.audioPlay("beep3",{path: "Sounds/",volume: 0.10});
                    break;
                case 3:
                    PS.audioLoad("beep4",{path: "Sounds/"});
                    PS.audioPlay("beep4",{path: "Sounds/",volume: 0.10});
                    break;

            }

    }
}
