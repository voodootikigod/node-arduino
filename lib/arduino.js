/*
 *  node-arduino: Control your Arduino with Node
 *
 *  Copyright (c) 2010 Tobias Schneider
 *  node-arduino is freely distributable under the terms of the MIT license.
 */

var sys = require('sys'),
	SerialPort = require('serialport').SerialPort;

const SERIAL_BAUDRATE = 9600;

const OPC_PIN_MODE         = 0x01;
const OPC_DIGITAL_READ     = 0x02;
const OPC_DIGITAL_WRITE    = 0x03;
const OPC_ANALOG_REFERENCE = 0x04;
const OPC_ANALOG_READ      = 0x05;
const OPC_ANALOG_WRITE     = 0x06;

exports.HIGH = 0x01;
exports.LOW  = 0x00;

exports.INPUT  = 0x00;
exports.OUTPUT = 0x01;

exports.true  = 0x01;
exports.false = 0x00;

exports.EXTERNAL = 0x00;
exports.DEFAULT  = 0x01;
exports.INTERNAL = 0x03;

Board = function (path) {
	var receivedDataQueue = [], // Data Temporary Stored
		callback = {};          // Callback Function Map for read functions

	this.callback = callback;

	this.sp = new SerialPort(path, {baudrate: SERIAL_BAUDRATE});

	this.sp.on( "data", function( data ) {
		var pin,
			value;

		receivedDataQueue.push(data);

		if ( (data+'').indexOf('#') == -1 ) {
			return ;
		}

		data = receivedDataQueue.join('').split('#')[0];
		receivedDataQueue.length = 0;

		data = +data;

		if ( data && data > 1 ) {
			pin = data >> 16;
			value = data & 0xFFFF;

			if ( !callback['pin'+pin] ) {
				sys.puts('no callback');
				sys.puts('pin : '+pin+', value : '+value);
			} else {
				callback['pin'+pin](value);
			}
		}
	});
};

Board.prototype = {
	pinMode : function (pin, mode) {
		this.sp.write(new Buffer([OPC_PIN_MODE, pin, mode]), 3);
	},

	digitalRead : function (pin, callback) {
		this.sp.write(new Buffer([OPC_DIGITAL_READ, pin]), 2);

		if ( typeof callback == 'function' ) {
			this.callback['pin'+pin] = callback;
		}
	},

	digitalWrite : function (pin, val) {
		this.sp.write(new Buffer([OPC_DIGITAL_WRITE, pin, val]), 3);
	},
			  
	analogReference : function (type) {
		this.sp.write(new Buffer([OPC_ANALOG_REFERENCE, type]), 2);
	},

	analogRead : function (pin, callback) {
		this.sp.write(new Buffer([OPC_ANALOG_READ, pin]), 2);

		if ( typeof callback == 'function' ) {
			this.callback['pin'+pin] = callback;
		}
	},

	analogWrite : function (pin, val) {
		this.sp.write(new Buffer([OPC_ANALOG_WRITE, pin, val]), 3);
	},

	close: function () {
		this.sp.close();
	}
};

exports.connect = function (path) {
	return new Board(path);
};
