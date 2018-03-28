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
	myX: 10,
	myY: 10,
	myMomentum = 0,
};

PS.init = function( system, options ) {
	// Uncomment the following code line to verify operation:

	 PS.debug( "PS.init() called\n" );

	 PS.gridSize( 10, 10 );
	 PS.gridColor( 0x4468a3 );
	 PS.borderColor(PS.ALL,PS.ALL,PS.COLOR_WHITE);


	 PS.statusText( "Ball" );

	// Add any other initialization code you need here.
};
