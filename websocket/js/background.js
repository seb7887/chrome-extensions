const CHAT_EVENT = "chatEvent";
const CONNECTION_LOST = "connectionLost";

let ws;
let notificationId = 0;

if (!localStorage.isInitialized) {
  localStorage.server = "wss://echo.websocket.org";
  localStorage.notificationTimeout = "5000";
  localStorage.reconnectTimeout = "3000";
  localStorage.isInitialized = true;
  chrome.tabs.create({ url: chrome.extension.getURL("html/options.html") });
}

// Connect to the WebSocket Server
function connect() {
  ws = new WebSocket(localStorage.server);

  ws.onopen = onOpen();
  ws.onmessage = e => onMessage(e);
  ws.onclose = e => onClose(e);
  ws.onerror = e => onError(e);
}

function clearNotification(n_id) {
  chrome.notifications.clear(n_id);
}

function createChatNotification(n_id, msg) {
  const options = {
    type: "basic",
    title: "Websocket: Message",
    message: msg,
    iconUrl: "images/icon_blue.png",
    buttons: [
      {
        title: "⤻ Reply",
        iconUrl: "images/icon_blue.png"
      },
      {
        title: "Close",
        iconUrl: "images/icon_blue.png"
      }
    ]
  };

  chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
    if (notifId === n_id) {
      clearNotification(n_id);
      if (btnIdx === 0) {
        ws.send(prompt("Reply: "));
      }
    }
  });
  chrome.notifications.create(n_id, options);

  setTimeout(() => {
    clearNotification(n_id);
  }, parseInt(localStorage.notificationTimeout, 10));
}

function createConnectionLostNotification(n_id) {
  const options = {
    type: "basic",
    title: "Websocket: Alert",
    message: `Lost connection: Retry in 3 seconds`,
    iconUrl: "images/icon_red.png"
  };
  chrome.notifications.create(n_id, options);

  setTimeout(() => {
    clearNotification(n_id);
    connect();
  }, parseInt(localStorage.reconnectTimeout, 10));
}

function popupNotification(e, notificationType) {
  const n_id = `id${notificationId++}`;

  switch (notificationType) {
    case CHAT_EVENT:
      createChatNotification(n_id, e.data);
      break;
    case CONNECTION_LOST:
      createConnectionLostNotification(n_id);
      break;
    default:
      break;
  }
}

function onOpen() {
  chrome.browserAction.setIcon({ path: "images/icon_blue.png" });
  chrome.browserAction.setBadgeText({ text: "" });
}

function onClose(e) {
  ws = undefined;

  chrome.browserAction.setIcon({ path: "images/icon_red.png" });
  chrome.browserAction.setBadgeText({ text: "!" });

  popupNotification(e, CONNECTION_LOST);
}

function onMessage(e) {
  popupNotification(e, CHAT_EVENT);
}

function onError(e) {
  console.log("Websocket error: ", e);
}

(function() {
  connect();

  chrome.browserAction.onClicked.addListener(() => {
    if (ws === undefined) {
      connect();
    } else {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(prompt("Send text"));
      }
    }
  });
})();
