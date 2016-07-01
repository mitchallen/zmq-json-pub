/*
* Author: Mitch Allen
*/

"use strict";

// TODO - update require when project is live

var ZmqJsonPub = require('../../zmq-json-pub'),
    config = require('./config'),
    pub = new ZmqJsonPub();

pub.verbose = config.verbose; 
pub.publish(config.endpoint);

let data = {
    type: "heartbeat",
    status: "OK",
    message: 'service is running',
    timestamp: Date.now()
}

function heartbeat() {
    data.timestamp = Date.now();
    let result = pub.send(data);
    if (result) {
        console.log("heartbeat sent at " + new Date(data.timestamp));
    } else {
        console.error("error sending message");
    }  
    setTimeout(heartbeat, config.interval); 
}

console.log("Sending hearbeat every " + config.interval / 1000 + " seconds")

heartbeat();




