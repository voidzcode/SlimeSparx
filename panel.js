let currentView = 'dashboard';

// Dashboard View
function showDashboard() {
    document.body.innerHTML = `
        <div class="card">
            <div class="header">SlimeSparx Dashboard</div>
            <p>Sparx Reader text selection is active.<br>Choose how to use Gemini AI:</p>
            
            <button id="geminiSideBtn">📍 Open Gemini in Side Panel</button>
            <button id="geminiTabBtn" style="margin-top: 12px; background: #34a853;">🌐 Open Gemini in New Tab</button>
        </div>
    `;

    // Re-attach listeners
    document.getElementById('geminiSideBtn').addEventListener('click', showGeminiInPanel);
    document.getElementById('geminiTabBtn').addEventListener('click', openGeminiInTab);
}

// Gemini in Side Panel View
function showGeminiInPanel() {
    document.body.innerHTML = `
        <div style="width:100%; height:100%; display:flex; flex-direction:column; background:#f8f9fa;">
            <div style="padding:10px 12px; background:#1a73e8; color:white; font-weight:bold; display:flex; align-items:center; justify-content:space-between;">
                <span>Gemini AI — Side Panel Mode</span>
                <button id="backBtn" style="padding:6px 12px; font-size:13px; background:white; color:#1a73e8; border:none; border-radius:4px; cursor:pointer;">← Back to Dashboard</button>
            </div>
            <iframe id="geminiFrame" 
                    src="https://gemini.google.com/app" 
                    style="flex:1; border:none; width:100%;" 
                    allow="clipboard-write; microphone; camera; geolocation"></iframe>
        </div>
    `;

    document.getElementById('backBtn').addEventListener('click', showDashboard);
}

// Open in New Tab
function openGeminiInTab() {
    chrome.runtime.sendMessage({
        action: "open_gemini_tab",
        url: "https://gemini.google.com/app"
    });
}

// Initialize
showDashboard();