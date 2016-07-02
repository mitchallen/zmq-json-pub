zmq-json-pub.js
================

A node.js module for publishing JSON messages via 0MQ (ZeroMQ)
--------------------------------------------------------------

## Install 0MQ

On a Mac:

    $ brew install zmq

To verify the installation

    $ man zmq

 See [__zeromq.org__](http://zeromq.org)

## Install zmq-json-pub in your project

    $ npm init
    $ npm install zmq-json-pub --save

## Usage 

The complete project can be found in the __examples/demo__ folder.

This example shows how to create a simple app that publishes a heartbeat JSON message every 3 seconds.  The example JSON is completely arbitrary. You can specify your own JSON format.

File: __examples/demo/config.js__

    var config = {};
    config.endpoint = "tcp://*:5431";
    config.verbose = true;
    config.interval = 3000;    // micro seconds
    module.exports = config;

File: __examples/demo/index.js__

	"use strict";

	var ZmqJsonPub = require('zmq-json-pub'),
    	config = require('./config'),
    	pub = new ZmqJsonPub();

	pub.publish(config.endpoint);

	let data = {
    	type: "heartbeat",
    	status: "OK",
    	message: 'service is running',
    	timestamp: Date.now()
	}

	function heartbeat() {
    	data.timestamp = Date.now();
    	console.log("sending heartbeat at " + new Date(data.timestamp));
    	pub.send(data, function(err) {
        	if (err) {
            	console.log(err);
            	return;
        	}
    	}); 
    	setTimeout(heartbeat, config.interval); 
	}

	console.log("Sending heartbeat every " + config.interval / 1000 + " seconds")

	setTimeout(heartbeat, config.interval);

	/*
    	Handle termination can close pub.
	*/

	//  terminator === the termination handler.
	function terminator(sig) {
   		if (typeof sig === "string") {
    		console.log('%s: Received %s - terminating Node server ...',
            	Date(Date.now()), sig);
      		console.log("Closing publisher before exit");
      		pub.close();
      		process.exit(1);
   		}
   		console.log('%s: Node server stopped.', Date(Date.now()) );
	}

	//  Process on exit and signals.
	process.on('exit', function() { terminator(); });

	['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
	 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'
	].forEach(function(element, index, array) {
    	process.on(element, function() { terminator(element); });
	});

To run:

	$ node index.js

To stop press __Ctrl-C__.

## Tests

Tests assume that __mocha__ has been installed globally.  If not execute the following:

    $ npm install -g mocha

Run the tests *from the projects root folder* in one of the following ways:

    $ mocha --recursive --timeout 20000
    
Or

    $ npm test
    
Or if you feel like kickin' it old skool:

    make test

### Testing by Version

To run the tests for each version (currently there is only one version (v0001)):

    $ mocha --timeout 5000 --recursive test/v0001/*test.js

The tests generate log files in a logs/ folder under the projects root folder.

* * *

## Repo(s)

* [bitbucket.org/mitchallen/zmq-json-pub.git](https://bitbucket.org/mitchallen/zmq-json-pub.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.0 release notes

* Initial release

