console.log("SlimeSparx: Text selection fix enabled.");

const forceSelection = () => {
    const css = `
        * { 
            user-select: text !important; 
            -webkit-user-select: text !important; 
            -moz-user-select: text !important;
        }
        body, div, p, span, article, section, main, .content, .reader-container,
        [class*="text"], [class*="content"], [class*="reader"] {
            user-select: text !important;
            -webkit-user-select: text !important;
        }
    `;

    let style = document.getElementById('slime-selection-css');
    if (!style) {
        style = document.createElement('style');
        style.id = 'slime-selection-css';
        (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = css;

    const importantElements = document.querySelectorAll('body, main, article, section, div[class*="content"], div[class*="reader"], div[class*="text"]');
    importantElements.forEach(el => {
        el.style.setProperty('user-select', 'text', 'important');
        el.style.setProperty('-webkit-user-select', 'text', 'important');
    });
};

forceSelection();
setTimeout(forceSelection, 200);
setTimeout(forceSelection, 800);

let lastRun = 0;
new MutationObserver(() => {
    const now = Date.now();
    if (now - lastRun > 600) {
        lastRun = now;
        forceSelection();
    }
}).observe(document.documentElement, {
    childList: true,
    subtree: true
});

window.addEventListener('load', forceSelection);

console.log("SlimeSparx: Text selection monitoring active.");