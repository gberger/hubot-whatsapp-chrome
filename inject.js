var port = chrome.runtime.connect({name: "channel"});

var ids = {};

var processMessages = function() {
  var newMessages = [];
  var bubbles = $$('.bubble-text');

  for(var i = bubbles.length - 1; i >= 0; i--) {
    var bubble = $$(bubbles[i]);
    var reactid = bubble.data('reactid');

    if (reactid in ids) {
      break;
    }
    ids[reactid] = true;

    var text = bubble.find('.message-text .emojitext').text();

    newMessages.push({
      reactid: reactid,
      text: text,

    });
  }

  return newMessages;
}

var messages = processMessages();
console.log('Existing messages: ', messages);


setInterval(function() {
  console.log("Pooling for new messages...");
  var newMessages = processMessages();
  for (newMessage of newMessages) {
    messages.unshift(newMessage);
    var text = newMessage.text
    console.log("New message, posting to extension: " + text);
    port.postMessage({message: text});
  }
}, 500)

port.onMessage.addListener(function(data) {
  var msg = data.message;
  console.log("Received reply from extension: " + msg);
  $$('div.input').html(msg);
  
  var event = document.createEvent('Event');
  event.initEvent('input', true, true);
  $$('div.input')[0].dispatchEvent(event);

  setTimeout(function() {
    $$('.icon-send').click();
  }, 50);
});


