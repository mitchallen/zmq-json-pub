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

ZmqJsonPub.prototype.send = function (data) {
    if (!data) {
        console.error("send called with no message specified");
        return false;
    }
    this.pub.send(JSON.stringify(data));
    return true;
};

ZmqJsonPub.prototype.close = function () {
    this.pub.close();
};
