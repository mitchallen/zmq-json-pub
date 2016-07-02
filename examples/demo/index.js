/*
* Author: Mitch Allen
*/

"use strict";

// TODO - update require when project is live

var ZmqJsonPub = require('../../zmq-json-pub'),
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



