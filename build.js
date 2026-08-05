const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'index.html');
const outputDir = path.join(__dirname, 'public');
const outputPath = path.join(outputDir, 'index.html');

let html = fs.readFileSync(sourcePath, 'utf8');

if (!html.includes('id="page-privacy"')) {
  throw new Error('The separate Privacy Policy page is missing from index.html');
}

const replacements = [
  [
    `<div style="display:flex;gap:14px"><p style="cursor:pointer" onclick="go('terms')">Privacy</p><p style="cursor:pointer" onclick="go('terms')">Terms</p></div>`,
    `<div style="display:flex;gap:14px"><p style="cursor:pointer" onclick="go('privacy')">Privacy</p><p style="cursor:pointer" onclick="go('terms')">Terms</p></div>`
  ],
  [
    `<span onclick="openLegal('terms')" style="color:var(--accent);cursor:pointer;font-weight:600">Privacy Policy</span>`,
    `<span onclick="openLegal('privacy')" style="color:var(--accent);cursor:pointer;font-weight:600">Privacy Policy</span>`
  ],
  [
    `<p>Your use of Agentorry is also governed by our Privacy Policy. We collect and process personal data as described in that policy. We do not sell your personal data to third parties.</p>`,
    `<p>Your use of Agentorry is also governed by our <span onclick="go('privacy')" style="color:var(--accent);font-weight:700;cursor:pointer">Privacy Policy</span>. We collect and process personal data as described in that policy. We do not sell your personal data to third parties.</p>`
  ],
  [
    `We built a fortress.<br>Every upload. Every buyer.<br>Every time.`,
    `Built for trust.<br>Every upload. Every transaction.<br>Every time.`
  ],
  [
    `Most marketplaces trust their sellers. We do not. Every single product on Agentorry is validated, scanned, and verified before any buyer can touch it. Zero exceptions.`,
    `Agentorry gives creators a professional place to sell and buyers the confidence to purchase. Every product is scanned and validated before it reaches the marketplace, helping quality sellers stand out and buyers choose with confidence.`
  ],
  [
    `Real people.<br>Real results.<br>Zero fake reviews.`,
    `Real feedback.<br>Stronger creators.<br>Confident buyers.`
  ],
  [
    `On Agentorry, only verified buyers can leave a review. Not your friends. Not fake accounts. Not paid reviewers. People who actually bought, downloaded, and used the product.`,
    `Reviews come from verified purchases, helping buyers choose with confidence while giving creators useful feedback, stronger credibility, and more opportunities to grow.`
  ],
  [
    `<div style="font-weight:700;color:var(--text);margin-bottom:6px">Reviews coming soon</div>`,
    `<div style="font-weight:700;color:var(--text);margin-bottom:6px">Be among the first trusted voices</div>`
  ],
  [
    `<p style="font-size:.82rem;color:var(--text2)">Be one of the first buyers on Agentorry and leave the first reviews.</p>`,
    `<p style="font-size:.82rem;color:var(--text2)">Early buyers can help shape the marketplace, while early sellers can start building credibility from day one.</p>`
  ],
  [
    `<button class="btn bp bsm" style="margin-top:14px" onclick="go('marketplace')">Browse marketplace →</button>`,
    `<button class="btn bp bsm" style="margin-top:14px" onclick="go('marketplace')">Explore early products →</button>`
  ],
  [`✓ Only verified buyers`, `✓ Verified purchase feedback`],
  [
    `You cannot review a product unless you have a verified purchase record. No exceptions. No workarounds.`,
    `Reviews are connected to real purchases, helping buyers trust what they read and rewarding creators who deliver great products.`
  ],
  [`✓ No self-reviews`, `✓ Credibility that grows`],
  [
    `Sellers cannot review their own products. Blocked at the database level — not just the UI. Impossible to game.`,
    `Strong customer experiences build a creator's reputation and make quality products easier for new buyers to discover.`
  ],
  [`✓ Rate limited`, `✓ Helpful, balanced insights`],
  [
    `Maximum 10 reviews per day per account. Spam review campaigns are automatically blocked.`,
    `Ratings and written feedback help buyers compare options while giving sellers clear ideas for updates and improvements.`
  ],
  [`✓ Edit and delete`, `✓ Reviews can evolve`],
  [
    `Buyers can update their review if their experience changes. Transparency works both ways.`,
    `Buyers can update feedback as products improve, so creators receive credit for continued support, fixes, and new features.`
  ],
  [
    `Trust is everything.<br>We protect it like it is.`,
    `Trust helps everyone grow.<br>We build around it.`
  ],
  [
    `Browse products with confidence. Every review you read is from a real buyer who actually used it.`,
    `Buyers get clearer decisions. Creators earn stronger reputations. Every verified review helps the whole marketplace improve.`
  ]
];

for (const [from, to] of replacements) {
  html = html.replace(from, to);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, html, 'utf8');
console.log(`Built ${outputPath}`);
