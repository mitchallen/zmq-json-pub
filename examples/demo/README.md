
DEMO
================

Demo usage code from the README file.
-------------------------------------------------

### Step 1: Install

Because the __package.json__ file should already contain what you need, simply use this command to install everything:

    $ npm install
    
### Step 2: Run the app

From your projects root folder, execute the following at the command line:

    $ node index.js

The app will send a heartbeat every n seconds via 0MQ. Any subscriber apps listening on the same endpoint should received the heartbeat message.
