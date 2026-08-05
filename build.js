const fs = require('fs');
const path = require('path');

async function main() {
  const sourceUrl = 'https://agentorry.com/?market-features=' + Date.now();
  const response = await fetch(sourceUrl, { headers: { 'User-Agent': 'Agentorry-Vercel-Build' } });
  if (!response.ok) throw new Error(`Could not fetch live Agentorry: ${response.status}`);
  let html = await response.text();

  const markers = ['id="page-home"','id="page-product"','id="page-wishlist"','id="sunCanvas"','function showProduct(','function pcard(','function bindProductCardEvents(','id="theme-toggle-float"'];
  for (const marker of markers) if (!html.includes(marker)) throw new Error(`Missing marker: ${marker}`);

  html = html.replace(
    '<div style="position:relative;overflow:hidden;height:380px;background:linear-gradient(180deg,#ffffff 0%,#f0eeff 40%,#e8e3ff 70%,#f5f0ff 100%)">',
    '<div id="agentorry-sunburst" style="position:relative;overflow:hidden;height:380px;background:linear-gradient(180deg,#ffffff 0%,#f0eeff 40%,#e8e3ff 70%,#f5f0ff 100%)">'
  );

  const featureCss = `
<style id="agentorry-market-features-style">
html[data-theme="dark"] #agentorry-sunburst{background:linear-gradient(180deg,#17152f 0%,#1b1838 42%,#211d48 72%,#141229 100%)!important;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
html[data-theme="dark"] #agentorry-sunburst canvas{opacity:.7}
.market-feature-section{display:none}
.market-feature-section.is-visible{display:block}
.market-feature-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
.market-feature-note{font-size:.74rem;color:var(--text3);line-height:1.55;max-width:520px;margin-top:5px}
.wishlist-heart{position:absolute;top:9px;right:9px;width:35px;height:35px;border-radius:11px;border:1px solid rgba(255,255,255,.55);background:rgba(255,255,255,.9);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;font-size:1rem;color:#5d5a7d;z-index:3;box-shadow:0 4px 16px rgba(0,0,0,.12);transition:.18s}
.wishlist-heart:hover{transform:scale(1.07);color:#e11d48}
.wishlist-heart.saved{color:#e11d48;background:#fff0f4;border-color:rgba(225,29,72,.22)}
html[data-theme="dark"] .wishlist-heart{background:rgba(20,18,42,.9);border-color:rgba(255,255,255,.14);color:#d3d0ef}
html[data-theme="dark"] .wishlist-heart.saved{background:#3a1730;color:#fb7185}
.trust-mini{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0 10px}
.trust-chip{display:inline-flex;align-items:center;gap:4px;padding:3px 7px;border-radius:999px;background:var(--pale2);border:1px solid var(--border);font-size:.59rem;font-weight:700;color:var(--text3);white-space:nowrap}
.trust-chip.good{color:var(--green);background:rgba(22,163,74,.08);border-color:rgba(22,163,74,.18)}
.trust-chip.warn{color:var(--amber);background:rgba(217,119,6,.08);border-color:rgba(217,119,6,.18)}
.product-trust-panel{margin:18px 0 4px;padding:16px;border:1.5px solid var(--border);border-radius:14px;background:var(--pale2)}
.product-trust-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.product-trust-item{padding:11px 12px;border-radius:11px;background:var(--card);border:1px solid var(--border)}
.product-trust-label{font-size:.66rem;text-transform:uppercase;letter-spacing:.07em;font-weight:800;color:var(--text3);margin-bottom:4px}
.product-trust-value{font-size:.78rem;font-weight:750;color:var(--text)}
.product-trust-help{font-size:.68rem;color:var(--text3);line-height:1.5;margin-top:11px}
.pp-wishlist{width:100%;justify-content:center;margin-bottom:10px}
.rank-badge{position:absolute;left:8px;top:8px;padding:4px 9px;border-radius:999px;background:rgba(15,14,26,.82);color:white;font-size:.6rem;font-weight:800;z-index:2;backdrop-filter:blur(8px)}
@media(max-width:620px){.market-feature-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.product-trust-grid{grid-template-columns:1fr}.wishlist-heart{width:32px;height:32px}}
</style>`;

  const oldFeatureCss = /\n?<style id="agentorry-market-features-style">[\s\S]*?<\/style>/;
  html = oldFeatureCss.test(html) ? html.replace(oldFeatureCss, '\n' + featureCss) : html.replace('</head>', featureCss + '\n</head>');

  const featureSections = `
  <div class="sw au market-feature-section" id="agentorry-trending-section">
    <div class="sh"><div class="sh-l"><div class="ey">Real marketplace activity</div><div class="ti">Trending now</div><div class="market-feature-note">Ranked from genuine views, downloads, purchases, ratings, and recent activity. Empty until real activity exists.</div></div><div class="sh-r"><button class="btn bg-btn bsm" onclick="go('marketplace')">Browse all →</button></div></div>
    <div class="market-feature-grid" id="agentorry-trending-grid"></div>
  </div>
  <div class="sw au market-feature-section" id="agentorry-featured-section">
    <div class="sh"><div class="sh-l"><div class="ey">Quality + real engagement</div><div class="ti">Featured products</div><div class="market-feature-note">Chosen from upload validation, documentation, support, secure delivery, and real buyer activity—not paid placement or invented scores.</div></div></div>
    <div class="market-feature-grid" id="agentorry-featured-grid"></div>
  </div>
  <div class="sw au market-feature-section" id="agentorry-recent-section">
    <div class="sh"><div class="sh-l"><div class="ey">Continue exploring</div><div class="ti">Recently viewed</div></div><div class="sh-r"><button class="btn bg-btn bsm" onclick="clearRecentProducts()">Clear</button></div></div>
    <div class="market-feature-grid" id="agentorry-recent-grid"></div>
  </div>
`;

  if (!html.includes('id="agentorry-trending-section"')) {
    html = html.replace('  <div class="sw au">\n    <div class="sh">\n      <div class="sh-l"><div class="ey">Collections</div>', featureSections + '\n  <div class="sw au">\n    <div class="sh">\n      <div class="sh-l"><div class="ey">Collections</div>');
  }

  const uploadFields = `
    <div class="fg"><label class="fl">Documentation</label><select class="fi" id="udocs"><option value="included">Full README and setup guide included</option><option value="partial">Partial documentation</option><option value="missing">No documentation yet</option></select></div>
    <div class="fg"><label class="fl">Seller support</label><select class="fi" id="usupport" onchange="document.getElementById('uresponse-wrap').style.display=this.value==='available'?'block':'none'"><option value="available">Support available after purchase</option><option value="limited">Limited support</option><option value="not_available">No seller support</option></select></div>
    <div class="fg" id="uresponse-wrap"><label class="fl">Typical response time (hours)</label><input class="fi" id="uresponse" type="number" min="1" max="720" value="48"><p style="font-size:.7rem;color:var(--text3);margin-top:4px">Shown as a seller-provided estimate, not an Agentorry guarantee.</p></div>`;
  if (!html.includes('id="udocs"')) {
    html = html.replace('<div class="fg"><label class="fl">Price (USD)</label>', uploadFields + '\n    <div class="fg"><label class="fl">Price (USD)</label>');
  }

  html = html.replace(
    "frameworks:uZip.aiFrameworks||[],\n    published:true",
    "frameworks:uZip.aiFrameworks||[],\n    validation_passed:true,\n    validation_verdict:'Passed',\n    documentation_status:(document.getElementById('udocs')||{}).value||'not_checked',\n    support_status:(document.getElementById('usupport')||{}).value||'not_specified',\n    support_response_hours:((document.getElementById('usupport')||{}).value==='available' ? (parseInt((document.getElementById('uresponse')||{}).value,10)||48) : null),\n    secure_delivery:false,\n    published:true"
  );

  const featureScript = String.raw`
<script id="agentorry-market-features-script">
(function(){
  const PRODUCT_FIELDS='id,title,description,category,price,user_id,created_at,updated_at,published,image_url,validation_passed,validation_verdict,ai_score,frameworks,documentation_status,support_status,support_response_hours,secure_delivery';
  let wishlistIds=new Set();

  function sessionId(){try{let id=localStorage.getItem('agentorry_view_session');if(!id){id='guest_'+crypto.getRandomValues(new Uint32Array(4)).join('_')+'_'+Date.now();localStorage.setItem('agentorry_view_session',id)}return id}catch(e){return 'guest_session_'+Date.now()+'_'+Math.random().toString(36).slice(2)}}
  function requestHeaders(extra){return Object.assign({},authHeaders(),extra||{})}
  async function api(path,opts){try{const r=await fetch(SB+path,opts||{headers:H2});if(!r.ok)return[];return await r.json().catch(()=>[])}catch(e){return[]}}
  async function rpc(name,body){return api('/rest/v1/rpc/'+name,{method:'POST',headers:requestHeaders({'Prefer':'return=representation'}),body:JSON.stringify(body||{})})}
  function fmtDate(value){if(!value)return 'Not available';try{return new Date(value).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}catch(e){return 'Not available'}}
  function docsLabel(p){return p.documentation_status==='included'?'Docs included':p.documentation_status==='partial'?'Partial docs':p.documentation_status==='missing'?'Docs missing':'Docs not checked'}
  function supportLabel(p){if(p.support_status==='available')return p.support_response_hours?'Support · ~'+p.support_response_hours+'h':'Seller support';if(p.support_status==='limited')return 'Limited support';if(p.support_status==='not_available')return 'No seller support';return 'Support not specified'}
  function trustChips(p,compact){const out=[];if(p.validation_passed===true||Number(p.ai_score||0)>=50)out.push('<span class="trust-chip good">✓ Verified upload</span>');if(p.documentation_status==='included')out.push('<span class="trust-chip good">📖 Docs included</span>');else if(p.documentation_status==='partial')out.push('<span class="trust-chip warn">📖 Partial docs</span>');if(p.secure_delivery===true)out.push('<span class="trust-chip good">🔒 Secure download</span>');if(p.support_status==='available')out.push('<span class="trust-chip">💬 Support</span>');if(!compact)out.push('<span class="trust-chip">Updated '+fmtDate(p.updated_at||p.created_at)+'</span>');return out.join('')}
  function heartButton(id){return '<button type="button" class="wishlist-heart '+(wishlistIds.has(String(id))?'saved':'')+'" data-wishlist-id="'+id+'" aria-label="Save to wishlist" title="Save to wishlist">'+(wishlistIds.has(String(id))?'♥':'♡')+'</button>'}
  function syncHearts(){document.querySelectorAll('[data-wishlist-id]').forEach(b=>{const saved=wishlistIds.has(String(b.dataset.wishlistId));b.classList.toggle('saved',saved);b.textContent=saved?'♥':'♡'})}

  async function loadWishlist(){wishlistIds=new Set();if(!user)return wishlistIds;const rows=await api('/rest/v1/wishlist?select=product_id&user_id=eq.'+user.id,{headers:requestHeaders()});if(Array.isArray(rows))rows.forEach(r=>wishlistIds.add(String(r.product_id)));syncHearts();return wishlistIds}
  async function toggleWishlist(id){if(!user){sessionStorage.setItem('redirect','wishlist');go('login');showToast('Sign in to save products');return}const key=String(id),saved=wishlistIds.has(key);if(saved){await fetch(SB+'/rest/v1/wishlist?user_id=eq.'+user.id+'&product_id=eq.'+encodeURIComponent(id),{method:'DELETE',headers:requestHeaders()});wishlistIds.delete(key);showToast('Removed from wishlist')}else{const r=await fetch(SB+'/rest/v1/wishlist?on_conflict=user_id,product_id',{method:'POST',headers:requestHeaders({'Prefer':'resolution=ignore-duplicates,return=minimal'}),body:JSON.stringify({user_id:user.id,product_id:id})});if(!r.ok){showToast('Could not save product');return}wishlistIds.add(key);showToast('Saved to wishlist ♥')}syncHearts();if(document.getElementById('page-wishlist').classList.contains('on'))renderWishlistPage()}

  function localRecent(){try{return JSON.parse(localStorage.getItem('agentorry_recent_products')||'[]')}catch(e){return[]}}
  function saveLocalRecent(id){try{let ids=localRecent().filter(x=>String(x)!==String(id));ids.unshift(String(id));localStorage.setItem('agentorry_recent_products',JSON.stringify(ids.slice(0,12)))}catch(e){}}
  window.clearRecentProducts=function(){try{localStorage.removeItem('agentorry_recent_products')}catch(e){};const s=document.getElementById('agentorry-recent-section');if(s)s.classList.remove('is-visible');if(user)fetch(SB+'/rest/v1/recently_viewed?user_id=eq.'+user.id,{method:'DELETE',headers:requestHeaders()});showToast('Recently viewed cleared')}
  async function recordViewed(p){if(!p||!p.id)return;saveLocalRecent(p.id);rpc('record_product_view',{p_product_id:p.id,p_session_id:sessionId()})}
  async function fetchProducts(ids){if(!ids.length)return[];const rows=await api('/rest/v1/products?select='+PRODUCT_FIELDS+'&published=eq.true&id=in.('+ids.map(encodeURIComponent).join(',')+')',{headers:H2});const map=new Map((Array.isArray(rows)?rows:[]).map(p=>[String(p.id),p]));return ids.map(id=>map.get(String(id))).filter(Boolean)}
  async function ranked(name){const rows=await rpc(name,{p_limit:8});if(!Array.isArray(rows))return[];const products=await fetchProducts(rows.map(r=>r.product_id));const rankMap=new Map(rows.map(r=>[String(r.product_id),r]));return products.map(p=>Object.assign(p,{_rank:rankMap.get(String(p.id))}))}

  const oldPcard=pcard;
  pcard=function(p){let card=oldPcard(p);card=card.replace(/(<div class="pcard-img"[^>]*>)/,'$1'+heartButton(p.id)+(p._rank?'<span class="rank-badge">'+(p._rank.rating>0?'★ '+p._rank.rating:'Active now')+'</span>':''));card=card.replace('<div class="pcard-foot">','<div class="trust-mini">'+trustChips(p,true)+'</div><div class="pcard-foot">');return card};
  const oldHcard=hcard;
  hcard=function(p){let card=oldHcard(p);card=card.replace(/(<div class="hcrd-img"[^>]*>)/,'$1'+heartButton(p.id));card=card.replace('<div class="hcrd-foot">','<div class="trust-mini">'+trustChips(p,true)+'</div><div class="hcrd-foot">');return card};

  bindProductCardEvents=function(container,products){if(!container)return;container.querySelectorAll('[data-wishlist-id]').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();toggleWishlist(btn.dataset.wishlistId)}));container.querySelectorAll('.pcard,.hcrd').forEach(card=>card.addEventListener('click',e=>{if(e.target.closest('.wishlist-heart,.pcard-msg-btn'))return;const p=products.find(x=>String(x.id)===String(card.dataset.productId));if(p)showProduct(p)}));container.querySelectorAll('.pcard-msg-btn').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();const p=products.find(x=>String(x.id)===String(btn.dataset.productId));if(p)messageSeller(p.user_id,p.id,p.title||'Untitled')}));syncHearts()};

  const oldShowProduct=showProduct;
  showProduct=function(p){recordViewed(p);oldShowProduct(p);const buy=document.querySelector('#product-content .pp-buy');if(!buy)return;const main=document.getElementById('pp-main-btn');if(main)main.insertAdjacentHTML('afterend','<button class="btn bg-btn pp-wishlist" data-wishlist-id="'+p.id+'">'+(wishlistIds.has(String(p.id))?'♥ Saved to wishlist':'♡ Save to wishlist')+'</button>');const trust='<div class="product-trust-panel"><div style="font-size:.75rem;font-weight:800;color:var(--text);margin-bottom:10px">Product trust details</div><div class="product-trust-grid">'+'<div class="product-trust-item"><div class="product-trust-label">Upload checks</div><div class="product-trust-value">'+((p.validation_passed===true||Number(p.ai_score||0)>=50)?'✓ Verified upload':'Not verified yet')+'</div></div>'+'<div class="product-trust-item"><div class="product-trust-label">Last updated</div><div class="product-trust-value">'+fmtDate(p.updated_at||p.created_at)+'</div></div>'+'<div class="product-trust-item"><div class="product-trust-label">Documentation</div><div class="product-trust-value">'+docsLabel(p)+'</div></div>'+'<div class="product-trust-item"><div class="product-trust-label">Seller support</div><div class="product-trust-value">'+supportLabel(p)+'</div></div>'+'<div class="product-trust-item"><div class="product-trust-label">Download delivery</div><div class="product-trust-value">'+(p.secure_delivery===true?'🔒 Secure download':'Not marked secure yet')+'</div></div>'+'</div><div class="product-trust-help">“Verified upload” means Agentorry’s automated upload checks passed. It does not guarantee perfect, risk-free, or error-free software. “Secure download” appears only when the file is genuinely delivered through Agentorry’s protected storage.</div></div>';buy.insertAdjacentHTML('beforeend',trust);const w=buy.querySelector('[data-wishlist-id]');if(w)w.onclick=e=>{e.stopPropagation();toggleWishlist(p.id)}};

  async function renderGrid(sectionId,gridId,products){const section=document.getElementById(sectionId),grid=document.getElementById(gridId);if(!section||!grid)return;if(!products.length){section.classList.remove('is-visible');grid.innerHTML='';return}grid.innerHTML=products.map(pcard).join('');bindProductCardEvents(grid,products);section.classList.add('is-visible')}
  async function renderDiscovery(){const [trending,featured]=await Promise.all([ranked('get_trending_products'),ranked('get_featured_products')]);await renderGrid('agentorry-trending-section','agentorry-trending-grid',trending);await renderGrid('agentorry-featured-section','agentorry-featured-grid',featured);let ids=[];if(user){const rows=await api('/rest/v1/recently_viewed?select=product_id,viewed_at&user_id=eq.'+user.id+'&order=viewed_at.desc&limit=8',{headers:requestHeaders()});ids=Array.isArray(rows)?rows.map(r=>r.product_id):[]}if(!ids.length)ids=localRecent().slice(0,8);await renderGrid('agentorry-recent-section','agentorry-recent-grid',await fetchProducts(ids))}
  async function renderWishlistPage(){if(!user)return;await loadWishlist();const products=await fetchProducts([...wishlistIds]);const grid=document.getElementById('wgrid');document.getElementById('wc-c').textContent=products.length+' saved';grid.innerHTML=products.length?products.map(pcard).join(''):'<div style="grid-column:1/-1">'+es('♡','Wishlist empty','Save products you want to revisit',"go('marketplace')")+'</div>';bindProductCardEvents(grid,products)}

  const oldRenderHome=renderHome;
  renderHome=async function(){if(!DB.length)DB=await api('/rest/v1/products?select='+PRODUCT_FIELDS+'&published=eq.true&order=created_at.desc&limit=100',{headers:H2});await loadWishlist();await oldRenderHome();await renderDiscovery()};
  const oldRmp=rmp;
  rmp=async function(){if(!DB.length||DB.some(p=>p.updated_at===undefined))DB=await api('/rest/v1/products?select='+PRODUCT_FIELDS+'&published=eq.true&order=created_at.desc&limit=100',{headers:H2});await loadWishlist();return oldRmp()};
  const oldGo=go;
  go=function(n){oldGo(n);if(n==='wishlist'&&user)setTimeout(renderWishlistPage,0);if(n==='home')setTimeout(renderDiscovery,50)};
  const oldUpdateNav=updateNav;
  updateNav=function(){oldUpdateNav();if(user){const r=document.getElementById('nav-r');if(r&&!r.querySelector('[data-nav-wishlist]'))r.insertAdjacentHTML('afterbegin','<button class="nb nb-g" data-nav-wishlist onclick="go(\'wishlist\')">♡ Wishlist</button>');const ma=document.getElementById('nm-actions');if(ma&&!ma.querySelector('[data-mobile-wishlist]'))ma.insertAdjacentHTML('afterbegin','<button class="nb nb-g" data-mobile-wishlist style="width:100%;justify-content:center" onclick="go(\'wishlist\');toggleMobileMenu()">♡ Wishlist</button>')}};

  loadWishlist().then(()=>{syncHearts();renderDiscovery()});
})();
</script>`;

  const oldFeatureScript = /\n?<script id="agentorry-market-features-script">[\s\S]*?<\/script>/;
  html = oldFeatureScript.test(html) ? html.replace(oldFeatureScript, '\n' + featureScript) : html.replace('</body>', featureScript + '\n</body>');

  if (!html.includes('id="agentorry-trending-section"') || !html.includes('record_product_view') || !html.includes('Product trust details') || !html.includes('id="agentorry-sunburst"')) throw new Error('Marketplace feature validation failed');

  const out = path.join(__dirname,'public');
  fs.mkdirSync(out,{recursive:true});
  fs.writeFileSync(path.join(out,'index.html'),html,'utf8');
  console.log('Wishlist, recently viewed, real rankings, trust details, and dark sunburst built successfully');
}

main().catch(err=>{console.error(err);process.exit(1)});
