console.log("SlimeSparx: Advanced text selection enabled.");

const forceSelection = () => {
    const css = `
        * { 
            user-select: text !important; 
            -webkit-user-select: text !important; 
            -moz-user-select: text !important; 
        }
        body, div, p, span, article, section, pre, code, textarea {
            user-select: text !important;
        }
    `;

    let style = document.getElementById('slime-selection-css');
    if (!style) {
        style = document.createElement('style');
        style.id = 'slime-selection-css';
        document.head.appendChild(style);
    }
    style.textContent = css;

    document.querySelectorAll('*').forEach(el => {
        el.style.setProperty('user-select', 'text', 'important');
        el.style.setProperty('-webkit-user-select', 'text', 'important');
    });
};

// Multiple execution layers
forceSelection();
setTimeout(forceSelection, 300);
setInterval(forceSelection, 1200);

// Watch for dynamic content changes
new MutationObserver(forceSelection).observe(document.documentElement, {
    childList: true,
    subtree: true
});