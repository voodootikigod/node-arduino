Node Arduino
============

Version: 0.2.3 - Released March 20, 2011

*****

This package is designed to allow you to control and program an arduino chipset with JavaScript. It leverages the node-serialport code base, so ensure that you have that installed. In order to see what this package can do, please watch [this presentation from JSConf EU 2010](http://jsconf.eu/2010/speaker/livingroombindmotion_function.html) by [Nikolai Onken](http://twitter.com/nonken) and [Jörn Zaefferer](http://bassistance.de/).

*****

How To Use
==========

Using node-arduino is pretty easy because it is pretty basic. It is essentially a wrapper with arduino specific message handling around the node-serialport library.

To Install
----------

<pre>
  npm install serialport arduino
</pre>

To Use
------

Opening an arduino board:

<pre>
  var arduino = require("arduino");
  var myBoard = arduino.connect("/dev/tty-usbserial1");
</pre>
  
Alpha
-----

This code is still very much alpha and early stage, but that just makes it more fun to work with. If you find an issue/problem, fork it and issue a pull request. No matter what, enjoy and do cool things with this code.