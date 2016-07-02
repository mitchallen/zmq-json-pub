"use strict";

/* global describe, before, it, it, ... after */

var request = require('supertest'),
    should = require('should'),
    sleep = require('sleep'),
    config = require('./test-config'),
    ZmqJsonPub = require('../../zmq-json-pub'),
    publisher = config.publisher,
    pub = null;

describe('publish with custom callback ' + config.versionLabel, function () {
    before(function () {
        pub = new ZmqJsonPub();
        pub.verbose = config.verbose; 
        pub.publish(publisher.endpoint, function(err) {
            if(config.verbose) {
                console.log("publishing with custom callback to: "
                + publisher.endpoint);
            }
            if (err) {
                console.error(err);
            }
        });
    });
    it('should send message', function (done) {
        let result = pub.send('message one');
        result.should.eql(true);
        done(); // Required or test will timeout
    });
    it('should not send a message with no body', function (done) {
        let result = pub.send();
        result.should.eql(false);
        done(); // Required or test will timeout
    });
    after(function () {
        pub.close();
    });
});