"use strict";

/* global describe, before, it, it, ... after */

var request = require('supertest'),
    should = require('should'),
    sleep = require('sleep'),
    config = require('./test-config'),
    ZmqJsonPub = require('../../zmq-json-pub'),
    publisher = config.publisher,
    pub = null;

describe('send suite ' + config.versionLabel, function () {
    before(function () {
        pub = new ZmqJsonPub();
        pub.verbose = config.verbose; 
        pub.publish(publisher.endpoint);
    });
    it('should send message', function (done) {
        pub.send('message one');
        done(); 
    });
    it('should not send a message with no body', function (done) {
        pub.send();
        done(); 
    });
    it('should call error callback if no body', function (done) {
        var caughtError = false;
        pub.send(null, function(err) {
            caughtError = true;
            console.error(err);
        });
        caughtError.should.eql(true);
        done(); 
    });
    after(function () {
        pub.close();
    });
});