/*
Author: Mitch Allen
*/

"use strict";

var zmq = require('zmq');

function ZmqJsonPub() {
    this.pub     = zmq.socket('pub');
    this.name    = require("./package").name;
    this.version = require("./package").version;
    this.verbose = true;
}

module.exports = ZmqJsonPub;

ZmqJsonPub.prototype.verbose = false;

ZmqJsonPub.prototype.publish = function (endpoint) {
    // var verbose = this.verbose;
    this.pub.bind(endpoint, function (err) {
        if (this.verbose) {
            console.log(
                'Listening for zmq subscribers on ',
                endpoint
            );
        }
        if (err) {
            console.error(err);
        }
    }.bind(this));
};

ZmqJsonPub.prototype.send = function (data) {
    if (!data) {
        if (this.verbose) {
            console.error("send called with no body specified");
        }
        return false;
    }
    this.pub.send(JSON.stringify(data));
    return true;
};

ZmqJsonPub.prototype.close = function () {
    this.pub.close();
};
