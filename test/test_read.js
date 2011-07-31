/*
 *  node-arduino: Control your Arduino with Node
 *
 *  Copyright (c) 2010 Tobias Schneider
 *  node-arduino is freely distributable under the terms of the MIT license.
 */

var arduino = require('../lib/arduino')
  , board = arduino.connect('/dev/tty.usbmodem621')
  ;

board.pinMode(7, arduino.INPUT);

setInterval(function () {
  board.digitalRead(7, function(data) {
	console.log(data);
  });
}, 100);
