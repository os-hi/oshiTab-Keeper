// This script runs on all pages and communicates with the extension popup.js

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message === 'getTabData') {
      const logoUrl = document.querySelector('link[rel="icon"]')?.href || '';
      sendResponse({ url: window.location.href, logo: logoUrl });
    }
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.faviconUrl) {
      fetchFavicon(message.faviconUrl, function (faviconDataUrl) {
        // Do something with the favicon data URL, e.g., save it to local storage
        console.log("Favicon Data URL:", faviconDataUrl);
      });
    }
  });
  