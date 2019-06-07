// When page is loaded...
document.addEventListener(
  "DOMContentLoaded",
  () => {
    chrome.tabs.getSelected(null, tab => {
      if (tab.url.indexOf("instagram") > -1) {
        let request = new XMLHttpRequest();
        request.open("GET", tab.url, true);
        request.send(null);
        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            const domParser = new DOMParser();
            const docElement = domParser.parseFromString(
              request.responseText,
              "text/html"
            ).documentElement;
            const metaTags = docElement.getElementsByTagName("meta");
            const media = getMedia(metaTags);
            if (media !== 0) {
              const type = media[0];
              document.getElementById(
                "results"
              ).innerHTML = `one ${type} found`;
              document.getElementById("download-link").innerHTML = "download";
              document.getElementById("download-link").addEventListener(
                "click",
                () => {
                  downloadResource(media[1]);
                },
                false
              );
            } else {
              document.getElementsById("results").innerHTML = "No media found";
            }
          }
        };
      } else {
        document.getElementById("results").innerHTML =
          "You are not currently in Instagram";
      }
    });
  },
  false
);

function getMedia(metaTags) {
  for (let i = 0; i < metaTags.length; i++) {
    if (metaTags[i].getAttribute("property") === "og:video") {
      return ["video", metaTags[i].getAttribute("content")];
    }
  }
  for (let i = 0; i < metaTags.length; i++) {
    if (metaTags[i].getAttribute("property") === "og:image") {
      return ["image", metaTags[i].getAttribute("content")];
    }
  }
  return 0;
}

function forceDownload(blob, filename) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = blob;
  a.click();
}

function downloadResource(url, filename) {
  if (!filename) {
    filename = url
      .split("\\")
      .pop()
      .split("/")
      .pop();
  }

  fetch(url, {
    headers: new Headers({
      Origin: location.origin
    }),
    mode: "cors"
  })
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch(err => console.error(err));
}
