let ws;
let notificationId = 0;

function openWebsocket() {
  ws = new WebSocket("wss://echo.websocket.org");

  ws.onopen = () => {
    chrome.browserAction.setIcon({ path: "images/icon_blue.png" });
    chrome.browserAction.setBadgeText({ text: "" });
  };

  ws.onmessage = e => {
    const n_id = `id${notificationId++}`;
    const options = {
      type: "basic",
      title: "Message",
      message: e.data,
      iconUrl: "images/icon_blue.png"
    };
    chrome.notifications.create(n_id, options, () =>
      console.log("notification created")
    );

    setTimeout(() => {
      chrome.notifications.clear(n_id, () =>
        console.log("cleared notification")
      );
    }, 3000);
  };

  ws.onclose = e => {
    ws = undefined;

    chrome.browserAction.setIcon({ path: "images/icon_red.png" });
    chrome.browserAction.setBadgeText({ text: "!" });
  };

  ws.onerror = e => {
    console.log("Websocket error: ", e);
  };
}

(function() {
  openWebsocket();

  chrome.browserAction.onClicked.addListener(() => {
    if (ws === undefined) {
      openWebsocket();
    } else {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(prompt("Send text"));
      }
    }
  });
})();
