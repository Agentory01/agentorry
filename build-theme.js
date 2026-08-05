const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(file, 'utf8');

const style = `
<style id="floating-theme-style">
#theme-toggle-float{
  position:fixed;
  left:max(18px,env(safe-area-inset-left));
  bottom:max(18px,env(safe-area-inset-bottom));
  width:50px;
  height:50px;
  z-index:99998;
  border:1.5px solid var(--border);
  border-radius:15px;
  background:var(--card);
  color:var(--text);
  box-shadow:0 10px 30px rgba(var(--shadow-col),.18),0 2px 8px rgba(108,99,255,.14);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition:transform .2s ease,border-color .2s ease,background .2s ease,box-shadow .2s ease;
  -webkit-tap-highlight-color:transparent;
}
#theme-toggle-float:hover{
  transform:translateY(-3px) scale(1.03);
  border-color:var(--accent);
  background:var(--pale);
  box-shadow:0 14px 34px rgba(var(--shadow-col),.24),0 4px 14px rgba(108,99,255,.22);
}
#theme-toggle-float:active{transform:scale(.96)}
#theme-toggle-float:focus-visible{outline:3px solid rgba(108,99,255,.28);outline-offset:3px}
#theme-toggle-float svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#theme-toggle-float .float-sun{display:none}
#theme-toggle-float .float-moon{display:block}
html[data-theme="dark"] #theme-toggle-float .float-sun{display:block}
html[data-theme="dark"] #theme-toggle-float .float-moon{display:none}
@media(max-width:560px){
  #theme-toggle-float{
    left:max(14px,env(safe-area-inset-left));
    bottom:max(14px,env(safe-area-inset-bottom));
    width:46px;
    height:46px;
    border-radius:14px;
  }
}
</style>`;

const button = `
<button id="theme-toggle-float" type="button" onclick="toggleTheme()" aria-label="Switch day or night mode" title="Day / Night mode">
  <svg class="float-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  <svg class="float-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
</button>`;

if (!html.includes('id="floating-theme-style"')) {
  html = html.replace('</head>', `${style}\n</head>`);
}

if (!html.includes('id="theme-toggle-float"')) {
  html = html.replace('</body>', `${button}\n</body>`);
}

if (!html.includes('id="theme-toggle-float"') || !html.includes('id="floating-theme-style"')) {
  throw new Error('Floating theme toggle was not injected correctly');
}

fs.writeFileSync(file, html, 'utf8');
console.log('Permanent bottom-left day/night toggle added');
