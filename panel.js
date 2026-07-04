let currentView = 'main';

// Main Menu
function showMainScreen() {
    document.body.innerHTML = `
        <div class="card">
            <div class="header">SlimeSparx</div>
            <p>Select a solver:</p>
            
            <button id="readerSolverBtn" style="margin-bottom: 12px;">Sparx Reader Solver</button>
            <button id="mathsSolverBtn">Sparx Maths Solver</button>
        </div>
    `;

    document.getElementById('readerSolverBtn').addEventListener('click', showReaderSolver);
    document.getElementById('mathsSolverBtn').addEventListener('click', showMathsSolver);
}

// Reader Solver
function showReaderSolver() {
    document.body.innerHTML = `
        <div class="card">
            <div class="header">Sparx Reader Solver</div>
            <p>Text selection is active.</p>
            
            <button id="geminiSideBtn" style="margin-bottom: 8px;">Open Gemini in Side Panel</button>
            <button id="aiCommandsSideBtn" style="margin-bottom: 8px;">Open AI Commands</button>
            
            <button id="geminiTabBtn" style="margin-bottom: 8px;">Open Gemini in New Tab</button>
            <button id="aiCommandsTabBtn">Open AI Commands in New Tab</button>
            
            <button id="backMainBtn" style="margin-top: 16px; background: #666;">Back to Main Menu</button>
        </div>
    `;

    document.getElementById('geminiSideBtn').addEventListener('click', showGeminiInPanel);
    document.getElementById('aiCommandsSideBtn').addEventListener('click', showAICommandsInPanel);
    document.getElementById('geminiTabBtn').addEventListener('click', openGeminiInTab);
    document.getElementById('aiCommandsTabBtn').addEventListener('click', openAICommandsInTab);
    document.getElementById('backMainBtn').addEventListener('click', showMainScreen);
}

// Maths Solver
function showMathsSolver() {
    document.body.innerHTML = `
        <div class="card">
            <div class="header">Sparx Maths Solver</div>
            <p>Choose AI assistance or notepad:</p>
            
            <button id="geminiSideBtnMath" style="margin-bottom: 8px;">Open Gemini in Side Panel</button>
            <button id="aiCommandsSideBtnMath" style="margin-bottom: 8px;">Open AI Commands</button>
            
            <button id="geminiTabBtnMath" style="margin-bottom: 8px;">Open Gemini in New Tab</button>
            <button id="aiCommandsTabBtnMath" style="margin-bottom: 16px;">Open AI Commands in New Tab</button>
            
            <button id="notepadBtn" style="background: #34a853;">Bookwork Notepad</button>
            
            <button id="backMainBtnMath" style="margin-top: 16px; background: #666;">Back to Main Menu</button>
        </div>
    `;

    document.getElementById('geminiSideBtnMath').addEventListener('click', showGeminiInPanel);
    document.getElementById('aiCommandsSideBtnMath').addEventListener('click', showAICommandsInPanel);
    document.getElementById('geminiTabBtnMath').addEventListener('click', openGeminiInTab);
    document.getElementById('aiCommandsTabBtnMath').addEventListener('click', openAICommandsInTab);
    document.getElementById('notepadBtn').addEventListener('click', showNotepad);
    document.getElementById('backMainBtnMath').addEventListener('click', showMainScreen);
}

// Gemini embed
function showGeminiInPanel() {
    const isFromReader = document.getElementById('readerSolverBtn') !== null || 
                        (document.querySelector('.header') && document.querySelector('.header').textContent.includes('Reader'));
    
    document.body.innerHTML = `
        <div style="width:100%; height:100%; display:flex; flex-direction:column;">
            <div style="padding:10px 12px; background:#1a73e8; color:white; font-weight:bold; display:flex; align-items:center; justify-content:space-between;">
                <span>Gemini AI</span>
                <button id="backBtnGemini" style="padding:6px 12px; font-size:13px; background:white; color:#1a73e8; border:none; border-radius:4px; cursor:pointer;">Back</button>
            </div>
            <iframe src="https://gemini.google.com/app" style="flex:1; border:none; width:100%;" allow="clipboard-write; microphone; camera; geolocation; clipboard-read"></iframe>
        </div>
    `;
    
    document.getElementById('backBtnGemini').addEventListener('click', () => {
        if (isFromReader) showReaderSolver();
        else showMathsSolver();
    });
}

// AI Commands embed
function showAICommandsInPanel() {
    const isFromReader = document.getElementById('readerSolverBtn') !== null || 
                        (document.querySelector('.header') && document.querySelector('.header').textContent.includes('Reader'));
    
    document.body.innerHTML = `
        <div style="width:100%; height:100%; display:flex; flex-direction:column;">
            <div style="padding:10px 12px; background:#34a853; color:white; font-weight:bold; display:flex; align-items:center; justify-content:space-between;">
                <span>AI Commands</span>
                <button id="backBtnAI" style="padding:6px 12px; font-size:13px; background:white; color:#34a853; border:none; border-radius:4px; cursor:pointer;">Back</button>
            </div>
            <iframe src="https://sites.google.com/view/educationsmart/Q1W2/ai-commands" style="flex:1; border:none; width:100%;" allow="clipboard-write; microphone; camera; geolocation; clipboard-read"></iframe>
        </div>
    `;
    
    document.getElementById('backBtnAI').addEventListener('click', () => {
        if (isFromReader) showReaderSolver();
        else showMathsSolver();
    });
}

// Tab functions
function openGeminiInTab() {
    chrome.runtime.sendMessage({ action: "open_gemini_tab", url: "https://gemini.google.com/app" });
}

function openAICommandsInTab() {
    chrome.runtime.sendMessage({ action: "open_ai_commands_tab", url: "https://sites.google.com/view/educationsmart/Q1W2/ai-commands" });
}

// Bookwork Notepad
function showNotepad() {
    document.body.innerHTML = `
        <div style="width:100%; height:100%; display:flex; flex-direction:column; background:#f8f9fa;">
            <div style="padding:10px 12px; background:#34a853; color:white; font-weight:bold; display:flex; align-items:center; justify-content:space-between;">
                <span>Bookwork Notepad</span>
                <button id="backBtnNotepad" style="padding:6px 12px; font-size:13px; background:white; color:#34a853; border:none; border-radius:4px; cursor:pointer;">Back</button>
            </div>
            <textarea id="notepadArea" style="flex:1; padding:12px; border:none; font-family: monospace; font-size: 14px; resize:none; width:100%; box-sizing:border-box;" placeholder="Enter your bookwork notes here..."></textarea>
        </div>
    `;

    const textarea = document.getElementById('notepadArea');
    
    chrome.storage.local.get('bookworkNotes', (data) => {
        textarea.value = data.bookworkNotes || '';
    });

    textarea.addEventListener('input', () => {
        chrome.storage.local.set({ bookworkNotes: textarea.value });
    });

    document.getElementById('backBtnNotepad').addEventListener('click', showMathsSolver);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showMainScreen();
});