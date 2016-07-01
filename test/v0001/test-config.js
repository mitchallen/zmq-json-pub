"use strict";

var config = {};

config.publisher = {};
config.publisher.endpoint = "tcp://*:5431";

config.logVersion = "00-01";  // Used in log name.
config.versionLabel = " [" + config.logVersion + "]"; // Used in test labels.

config.verbose = true;

module.exports = config; 