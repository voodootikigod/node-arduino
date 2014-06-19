Node Arduino
============

This package is designed to allow you to control and program an arduino chipset with JavaScript. It leverages the node-serialport code base, so ensure that you have that installed. In order to see what this package can do, please watch [this presentation from JSConf EU 2010](http://jsconf.eu/2010/speaker/livingroombindmotion_function.html) by [Nikolai Onken](http://twitter.com/nonken) and [Jörn Zaefferer](http://bassistance.de/).

How To Use
==========

Using node-arduino is pretty easy because it is pretty basic. It is essentially a wrapper with arduino specific message handling around the node-serialport library.

To Install
----------

<pre>
npm install git://github.com/kyungw00k/node-arduino.git
</pre>

To Use
------
* Opening an arduino board:

<pre>
var arduino = require("arduino") 
  , myBoard = arduino.connect("/dev/tty-usbserial1");
</pre>

* Getting pin 7 digital value

<pre>
var arduino = require("arduino")
  , myBoard = arduino.connect("/dev/tty-usbserial1");

myBoard.pinMode(7, arduino.INPUT);

setInterval(function () {
  myBoard.digitalRead(7, function(data) {
	console.log(data);
  });
}, 100);
</pre>
