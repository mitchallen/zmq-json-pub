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

ZmqJsonPub.prototype.sendDelay = 1000;  // micro seconds

ZmqJsonPub.prototype.publish = function (endpoint, callback) {
    if (callback  && typeof callback === "function") {
        this.pub.bind(endpoint, callback);
    } else {
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
    }
};

ZmqJsonPub.prototype.send = function (data, callback) {
    if (!data) {
        if (callback  && typeof callback === "function") {
            callback(new Error("send called with no body specified"));
        }
        return;
    }
    setTimeout(function () {
        this.pub.send(JSON.stringify(data));
    }.bind(this), this.sendDelay);
};

ZmqJsonPub.prototype.close = function () {
    this.pub.close();
};
