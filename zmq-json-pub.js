/*
Author: Mitch Allen
*/

"use strict";

var zmq = require('zmq');

function ZmqJsonPub() {
    this.pub     = zmq.socket('pub');
    this.name    = require("./package").name;
    this.version = require("./package").version;

}

module.exports = ZmqJsonPub;

ZmqJsonPub.prototype.publish = function (endpoint) {
    this.pub.bind(endpoint, function (err) {
        console.log(
            'Listening for zmq subscribers on ',
            endpoint
        );
        if (err) {
            console.error(err);
        }
    });
};

ZmqJsonPub.prototype.send = function (message) {
    if (!message) {
        console.error("send called with no message specified");
        return false;
    }
    // this.pub.send(JSON.stringify(spec.message));
    this.pub.send(message);
    return true;
};

ZmqJsonPub.prototype.close = function () {
    this.pub.close();
};
