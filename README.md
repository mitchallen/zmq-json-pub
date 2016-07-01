zmq-json-pub.js
================

A node.js module for publishing JSON messages via 0MQ (ZeroMQ)
--------------------------------------------------------------

## Install 0MQ

On a Mac:

    $ brew install zmq

To verify the installation

    $ man zmq

 See [__zeromq.org__](http://zeromq.org)

## Install zmq-json-pub in your project

    $ npm init
    $ npm install zmq-json-pub --save


## Tests

Tests assume that __mocha__ has been installed globally.  If not execute the following:

    $ npm install -g mocha

Run the tests *from the projects root folder* in one of the following ways:

    $ mocha --recursive --timeout 20000
    
Or

    $ npm test
    
Or if you feel like kickin' it old skool:

    make test

### Testing by Version

To run the tests for each version (currently there is only one version (v0001):

    $ mocha --timeout 5000 --recursive test/v0001/*test.js

The tests generate log files in a logs/ folder under the projects root folder.

* * *

## Repo(s)

* [bitbucket.org/mitchallen/zmq-json-pub.git](https://bitbucket.org/mitchallen/zmq-json-pub.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.0 release notes

* Initial release

