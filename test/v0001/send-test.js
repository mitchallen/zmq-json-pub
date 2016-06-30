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
        pub.publish(publisher.endpoint);
    });
    it('should send message', function (done) {
        let result = pub.send('message one');
        result.should.eql(true);
        done(); // Required or test will timeout
    });
    it('should not send an message with no message', function (done) {
        let result = pub.send();
        result.should.eql(false);
        done(); // Required or test will timeout
    });
    after(function () {
        pub.close();
    });
});