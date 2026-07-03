chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "open_gemini_tab") {
    chrome.tabs.create({
      url: message.url || "https://gemini.google.com/app"
    }).catch(err => console.error("Gemini tab error:", err));
  }
});