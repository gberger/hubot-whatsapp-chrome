hubot-whatsapp-chrome
=====================

A Chrome extension that functions as a Hubot adapter for Whatsapp.

How to
------

 * Configure your Hubot to use the adapter `hubot-socket.io-adapter`
    * If you're not running your Hubot in localhost, change the URL in `background.js`
 * Install this repository as a Chrome extension ([how?](http://superuser.com/questions/247651/how-does-one-install-an-extension-for-chrome-browser-from-the-local-file-system))
 * Open http://web.whatsapp.com in your browser and authenticate
 * Open the conversation you want Hubot to respond to
    * Note: DO NOT change conversations!
 * Click the extension button (it looks like a puzzle piece)

![Screenshot](/fluff/ss.png?raw=true)


How it works
------------

When you click the button, it runs `background.js`. This script inserts `inject.js` into the web page.

**inject** is responsible for polling the conversation and detecting new messages. When a message is detected, it sends it to **background**, which in turns sends it to Hubot via a websocket. 

If a response is received from Hubot, **background** sends that back to **inject**, which then puts the message in the compose box and clicks send.

It's pretty hacky and could break at any point.


Disclaimer
----------

Use at your own risk. Not responsible for any consequences, including, but not limited to, the banning of your WhatsApp account.