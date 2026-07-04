chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "open_gemini_tab") {
    chrome.tabs.create({
      url: message.url || "https://gemini.google.com/app"
    }).catch(err => console.error("Gemini tab error:", err));
  }
  
  // NEW: Support for AI Commands tab
  if (message.action === "open_ai_commands_tab") {
    chrome.tabs.create({
      url: message.url || "https://sites.google.com/view/educationsmart/Q1W2/ai-commands"
    }).catch(err => console.error("AI Commands tab error:", err));
  }
});