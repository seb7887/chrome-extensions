function getStorageValues(fn: Function) {
  chrome.storage.sync.get(
    {
      urls: ['https://github.com/*'],
      gitlaburls: ['https://gitlab.com/'],
      contextMenu: {
        saveas: true,
        download: true
      }
    },
    items => {
      fn(items);
    }
  );
}

export default getStorageValues;
