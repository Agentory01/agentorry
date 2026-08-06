const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(file, 'utf8');

const style = String.raw`
<style id="agentorry-advertise-cards-v3">
.ads-pricing-grid{
  display:grid!important;
  grid-template-columns:repeat(3,minmax(0,1fr))!important;
  gap:22px!important;
  align-items:stretch!important;
  margin-bottom:64px!important;
  padding:12px 0 8px;
}
.ads-pricing-grid>div{
  position:relative!important;
  min-height:370px;
  display:flex!important;
  flex-direction:column!important;
  overflow:hidden!important;
  border-radius:25px!important;
  padding:30px!important;
  transition:transform .24s ease,border-color .24s ease,box-shadow .24s ease,background .24s ease!important;
}
.ads-pricing-grid>div::before{
  content:'';
  position:absolute;
  inset:0;
  pointer-events:none;
  background:radial-gradient(circle at 50% -18%,rgba(159,145,255,.28),transparent 43%);
  opacity:.78;
}
.ads-pricing-grid>div::after{
  content:'';
  position:absolute;
  left:20px;
  right:20px;
  top:0;
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
}
.ads-pricing-grid>div>*{position:relative;z-index:1}
.ads-pricing-grid>div>div:nth-last-child(2){flex:1}
.ads-pricing-grid>div>button{margin-top:auto!important}
.ads-pricing-grid>div:hover{transform:translateY(-7px)!important}

.ads-pricing-grid>div:nth-child(2){
  background:linear-gradient(155deg,#352c82 0%,#282168 52%,#1b174b 100%)!important;
  border:1px solid rgba(183,170,255,.45)!important;
  box-shadow:0 24px 60px rgba(70,52,190,.36),inset 0 1px 0 rgba(255,255,255,.08)!important;
  transform:translateY(-10px) scale(1.025)!important;
}
.ads-pricing-grid>div:nth-child(2)::before{
  background:radial-gradient(circle at 50% -12%,rgba(197,184,255,.38),transparent 46%);
}
.ads-pricing-grid>div:nth-child(2):hover{transform:translateY(-15px) scale(1.025)!important}
.ads-pricing-grid>div:nth-child(2)>div:first-child{
  border:1px solid rgba(255,255,255,.2)!important;
  box-shadow:0 7px 20px rgba(0,0,0,.2)!important;
}
.ads-pricing-grid>div:nth-child(2) .bw{
  background:rgba(9,8,30,.86)!important;
  color:#c9c4ff!important;
  border:1px solid rgba(183,170,255,.25)!important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.05)!important;
}
.ads-pricing-grid>div:nth-child(2) .bw:hover{
  background:rgba(15,13,45,.98)!important;
  color:#fff!important;
  border-color:rgba(198,187,255,.48)!important;
}

html[data-theme="dark"] .ads-pricing-grid>div:not(:nth-child(2)){
  background:linear-gradient(155deg,rgba(31,29,63,.98),rgba(15,14,35,.99))!important;
  border:1px solid rgba(146,137,255,.38)!important;
  box-shadow:0 18px 46px rgba(0,0,0,.36),inset 0 1px 0 rgba(255,255,255,.04)!important;
}
html[data-theme="dark"] .ads-pricing-grid>div:not(:nth-child(2)):hover{
  border-color:rgba(171,159,255,.64)!important;
  box-shadow:0 24px 58px rgba(75,58,190,.24),inset 0 1px 0 rgba(255,255,255,.055)!important;
}
html[data-theme="dark"] .ads-pricing-grid>div:not(:nth-child(2)) [style*="color:var(--text)"]{color:#f7f5ff!important}
html[data-theme="dark"] .ads-pricing-grid>div:not(:nth-child(2)) [style*="color:var(--text2)"]{color:#d1cde8!important}
html[data-theme="dark"] .ads-pricing-grid>div:not(:nth-child(2)) [style*="color:var(--text3)"]{color:#9c97b8!important}
html[data-theme="dark"] .ads-pricing-grid>div:not(:nth-child(2)) [style*="color:var(--border2)"]{color:#706a91!important}
html[data-theme="dark"] .ads-pricing-grid>div:not(:nth-child(2)) .bp{
  background:linear-gradient(135deg,#786eff,#9c8eff)!important;
  color:#fff!important;
  box-shadow:0 9px 24px rgba(108,99,255,.34)!important;
}
html[data-theme="dark"] .ads-pricing-grid>div:not(:nth-child(2)) .bp:hover{
  box-shadow:0 13px 32px rgba(108,99,255,.48)!important;
}

@media(max-width:900px){
  .ads-pricing-grid{
    grid-template-columns:1fr!important;
    max-width:520px;
    margin-left:auto!important;
    margin-right:auto!important;
  }
  .ads-pricing-grid>div,
  .ads-pricing-grid>div:nth-child(2),
  .ads-pricing-grid>div:nth-child(2):hover{transform:none!important}
}
</style>`;

if (!html.includes('id="agentorry-advertise-cards-v3"')) {
  html = html.replace('</head>', style + '\n</head>');
}

const oldGrid = '<!-- Pricing cards -->\n    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:60px">';
const newGrid = '<!-- Pricing cards -->\n    <div class="ads-pricing-grid">';

if (html.includes(oldGrid)) {
  html = html.replace(oldGrid, newGrid);
} else if (!html.includes('class="ads-pricing-grid"')) {
  throw new Error('Could not find the advertise pricing grid');
}

fs.writeFileSync(file, html, 'utf8');
console.log('Applied premium advertise pricing card styles');
