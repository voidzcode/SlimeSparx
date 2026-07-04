let currentView = 'dashboard';

// Enhanced Dashboard View
function showDashboard() {
    document.body.innerHTML = `
        <div class="card">
            <div class="header">SlimeSparx Dashboard</div>
            <p>Sparx Reader text selection is active.<br>Choose how to use AI tools:</p>
            
            <button id="geminiSideBtn">Open Gemini in Side Panel</button>
            <button id="aiCommandsSideBtn" style="margin-top: 12px; background: #34a853;">Open AI Commands</button>
            
            <button id="geminiTabBtn" style="margin-top: 12px; background: #1a73e8;">Open Gemini in New Tab</button>
            <button id="aiCommandsTabBtn" style="margin-top: 8px; background: #34a853;">Open AI Commands in New Tab</button>
        </div>
    `;

    // Re-attach all listeners
    document.getElementById('geminiSideBtn').addEventListener('click', showGeminiInPanel);
    document.getElementById('aiCommandsSideBtn').addEventListener('click', showAICommandsInPanel);
    
    document.getElementById('geminiTabBtn').addEventListener('click', openGeminiInTab);
    document.getElementById('aiCommandsTabBtn').addEventListener('click', openAICommandsInTab);
}

// Gemini Side Panel
function showGeminiInPanel() {
    document.body.innerHTML = `
        <div style="width:100%; height:100%; display:flex; flex-direction:column; background:#f8f9fa;">
            <div style="padding:10px 12px; background:#1a73e8; color:white; font-weight:bold; display:flex; align-items:center; justify-content:space-between;">
                <span>Gemini AI — Side Panel Mode</span>
                <button id="backBtn" style="padding:6px 12px; font-size:13px; background:white; color:#1a73e8; border:none; border-radius:4px; cursor:pointer;">← Back</button>
            </div>
            <iframe id="geminiFrame" 
                    src="https://gemini.google.com/app" 
                    style="flex:1; border:none; width:100%;" 
                    allow="clipboard-write; microphone; camera; geolocation; clipboard-read">
            </iframe>
        </div>
    `;

    document.getElementById('backBtn').addEventListener('click', showDashboard);
}

// AI Commands Side Panel
function showAICommandsInPanel() {
    document.body.innerHTML = `
        <div style="width:100%; height:100%; display:flex; flex-direction:column; background:#f8f9fa;">
            <div style="padding:10px 12px; background:#34a853; color:white; font-weight:bold; display:flex; align-items:center; justify-content:space-between;">
                <span>AI Commands Library</span>
                <button id="backBtnAI" style="padding:6px 12px; font-size:13px; background:white; color:#34a853; border:none; border-radius:4px; cursor:pointer;">← Back</button>
            </div>
            <iframe id="aiCommandsFrame" 
                    src="https://sites.google.com/view/educationsmart/Q1W2/ai-commands" 
                    style="flex:1; border:none; width:100%;" 
                    allow="clipboard-write; microphone; camera; geolocation; clipboard-read">
            </iframe>
        </div>
    `;

    document.getElementById('backBtnAI').addEventListener('click', showDashboard);
}

// Open Gemini in New Tab
function openGeminiInTab() {
    chrome.runtime.sendMessage({
        action: "open_gemini_tab",
        url: "https://gemini.google.com/app"
    });
}

// NEW: Open AI Commands in New Tab
function openAICommandsInTab() {
    chrome.runtime.sendMessage({
        action: "open_ai_commands_tab",
        url: "https://sites.google.com/view/educationsmart/Q1W2/ai-commands"
    });
}

// Robust Initialization
document.addEventListener('DOMContentLoaded', () => {
    try {
        showDashboard();
    } catch (error) {
        console.error("SlimeSparx: Failed to initialize dashboard", error);
        document.body.innerHTML = `<div style="padding:20px; color:red; text-align:center;">Error loading SlimeSparx.<br>Please check the console (F12).</div>`;
    }
});