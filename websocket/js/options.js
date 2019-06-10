function $(id) {
  return document.getElementById(id);
}

function resetOptions() {
  localStorage.server = "wss://echo.websocket.org";
  localStorage.notificationTimeout = "5000";
  localStorage.reconnectTimeout = "3000";
}

function restoreOptions() {
  if (!localStorage.isInitialized) {
    resetOptions();
    localStorage.isInitialized = true;
  }

  $("server").value = localStorage.server;
  $("reconnect").value = localStorage.reconnectTimeout;
}

function submitOptions() {
  localStorage.server = $("server").value;
  localStorage.reconnectTimeout = $("reconnect").value;
}

function saveAndClose() {
  submitOptions();
  chrome.tabs.getSelected(null, tab => {
    chrome.tabs.remove(tab.id);
  });
}

function init() {
  restoreOptions();
  document.querySelector("#save").addEventListener("click", saveAndClose);
}

document.addEventListener("DOMContentLoaded", init);
