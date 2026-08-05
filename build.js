const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'index.html');
const outputDir = path.join(__dirname, 'dist');
const outputPath = path.join(outputDir, 'index.html');

let html = fs.readFileSync(sourcePath, 'utf8');

const privacyPage = String.raw`
<!-- ═══ PRIVACY POLICY ═══ -->
<div class="page" id="page-privacy">
  <div style="max-width:760px;margin:0 auto;padding:60px 28px 80px">
    <div style="margin-bottom:48px">
      <div style="font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:10px">Legal</div>
      <h1 style="font-size:2.5rem;font-weight:800;color:var(--text);letter-spacing:-.03em;margin-bottom:12px">Privacy Policy</h1>
      <p style="color:var(--text3);font-size:.875rem">Last updated: August 5, 2026</p>
    </div>

    <div style="background:var(--pale);border:1.5px solid rgba(108,99,255,0.15);border-radius:16px;padding:20px 24px;margin-bottom:40px">
      <p style="font-size:.875rem;color:var(--text2);line-height:1.75">This Privacy Policy explains what information Agentorry collects, how we use it, and the choices available to you when you use our marketplace.</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:36px;font-size:.9rem;color:var(--text2);line-height:1.8">
      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">1. Information We Collect</h2>
        <p>We may collect information you provide directly, including your name, email address, account details, profile information, product listings, files you upload, messages, reviews, and support requests.</p>
        <p style="margin-top:10px">We may also collect technical information automatically, such as your IP address, browser and device information, pages visited, actions taken, timestamps, and diagnostic or security logs.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">2. How We Use Information</h2>
        <p>We use information to provide and maintain Agentorry, create and secure accounts, operate marketplace features, process and record transactions, communicate with users, personalize the experience, prevent fraud and abuse, respond to support requests, and improve the platform.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">3. Cookies and Local Storage</h2>
        <p>Agentorry may use cookies and similar browser technologies to keep you signed in, remember preferences such as your selected theme, protect accounts, understand platform usage, and improve performance. You can manage cookies through your browser settings, although disabling them may affect some features.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">4. Marketplace Activity</h2>
        <p>Information you choose to make public, such as your creator name, profile, product descriptions, ratings, and reviews, may be visible to other users. Messages and transaction-related information may be shared with the relevant buyer or seller when needed to provide the service.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">5. How We Share Information</h2>
        <p>We may share information with service providers that help us host, secure, analyze, support, and operate Agentorry; with buyers or sellers involved in a transaction; when required by law; to protect users and the platform; or as part of a merger, financing, acquisition, or sale of assets.</p>
        <p style="margin-top:10px">We do not sell your personal information to third parties.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">6. Data Retention</h2>
        <p>We retain information for as long as reasonably necessary to provide Agentorry, maintain transaction and security records, resolve disputes, enforce agreements, and comply with legal obligations. Retention periods may vary depending on the type of information.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">7. Data Security</h2>
        <p>We use reasonable technical and organizational measures designed to protect personal information. No internet service or storage system can guarantee absolute security, so users should also protect their passwords and devices.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">8. Your Choices and Rights</h2>
        <p>You may be able to access, update, correct, or delete certain account information through your profile. Depending on where you live, you may also have legal rights regarding access, correction, deletion, restriction, objection, portability, or withdrawal of consent.</p>
        <p style="margin-top:10px">To make a privacy request, contact us using the details below. We may need to verify your identity before completing a request.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">9. Age Requirement</h2>
        <p>Agentorry is intended for users who are at least 18 years old. We do not knowingly collect personal information from children under 18.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">10. International Processing</h2>
        <p>Your information may be processed in countries other than the country where you live. Where required, we use appropriate safeguards for international data transfers.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">11. Changes to This Policy</h2>
        <p>We may update this Privacy Policy as Agentorry changes. We will update the date above and may provide an additional notice when changes are significant.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">12. Contact</h2>
        <p>For questions or requests related to privacy, contact us:</p>
        <div style="margin-top:12px;padding:16px 20px;background:var(--pale);border:1.5px solid rgba(108,99,255,0.15);border-radius:12px">
          <div style="font-weight:700;color:var(--text);margin-bottom:4px">Agentorry</div>
          <div style="color:var(--accent);font-weight:600">hello@agentorry.com</div>
          <div style="color:var(--text3);font-size:.82rem;margin-top:4px">We respond within 24 hours</div>
        </div>
      </div>
    </div>
  </div>
</div>

`;

const termsMarker = '<!-- ═══ TERMS ═══ -->';
if (!html.includes('id="page-privacy"')) {
  if (!html.includes(termsMarker)) {
    throw new Error('Terms page marker was not found in index.html');
  }
  html = html.replace(termsMarker, privacyPage + termsMarker);
}

html = html.replace(
  `<div style="display:flex;gap:14px"><p style="cursor:pointer" onclick="go('terms')">Privacy</p><p style="cursor:pointer" onclick="go('terms')">Terms</p></div>`,
  `<div style="display:flex;gap:14px"><p style="cursor:pointer" onclick="go('privacy')">Privacy</p><p style="cursor:pointer" onclick="go('terms')">Terms</p></div>`
);

html = html.replace(
  `<span onclick="openLegal('terms')" style="color:var(--accent);cursor:pointer;font-weight:600">Privacy Policy</span>`,
  `<span onclick="openLegal('privacy')" style="color:var(--accent);cursor:pointer;font-weight:600">Privacy Policy</span>`
);

html = html.replace(
  `<p>Your use of Agentorry is also governed by our Privacy Policy. We collect and process personal data as described in that policy. We do not sell your personal data to third parties.</p>`,
  `<p>Your use of Agentorry is also governed by our <span onclick="go('privacy')" style="color:var(--accent);font-weight:700;cursor:pointer">Privacy Policy</span>. We collect and process personal data as described in that policy. We do not sell your personal data to third parties.</p>`
);

// Security page: welcoming, trust-focused copy for both creators and buyers.
html = html.replace(
  `We built a fortress.<br>Every upload. Every buyer.<br>Every time.`,
  `Built for trust.<br>Every upload. Every transaction.<br>Every time.`
);
html = html.replace(
  `Most marketplaces trust their sellers. We do not. Every single product on Agentorry is validated, scanned, and verified before any buyer can touch it. Zero exceptions.`,
  `Agentorry gives creators a professional place to sell and buyers the confidence to purchase. Every product is scanned and validated before it reaches the marketplace, helping quality sellers stand out and buyers choose with confidence.`
);

// Reviews page: show clear value for both sellers and buyers.
html = html.replace(
  `Real people.<br>Real results.<br>Zero fake reviews.`,
  `Real feedback.<br>Stronger creators.<br>Confident buyers.`
);
html = html.replace(
  `On Agentorry, only verified buyers can leave a review. Not your friends. Not fake accounts. Not paid reviewers. People who actually bought, downloaded, and used the product.`,
  `Reviews come from verified purchases, helping buyers choose with confidence while giving creators useful feedback, stronger credibility, and more opportunities to grow.`
);
html = html.replace(
  `Reviews coming soon`,
  `Be among the first trusted voices`
);
html = html.replace(
  `Be one of the first buyers on Agentorry and leave the first reviews.`,
  `Early buyers can help shape the marketplace, while early sellers can start building credibility from day one.`
);
html = html.replace(
  `Browse marketplace →`,
  `Explore early products →`
);
html = html.replace(
  `✓ Only verified buyers`,
  `✓ Verified purchase feedback`
);
html = html.replace(
  `You cannot review a product unless you have a verified purchase record. No exceptions. No workarounds.`,
  `Reviews are connected to real purchases, helping buyers trust what they read and rewarding creators who deliver great products.`
);
html = html.replace(
  `✓ No self-reviews`,
  `✓ Credibility that grows`
);
html = html.replace(
  `Sellers cannot review their own products. Blocked at the database level — not just the UI. Impossible to game.`,
  `Strong customer experiences build a creator's reputation and make quality products easier for new buyers to discover.`
);
html = html.replace(
  `✓ Rate limited`,
  `✓ Helpful, balanced insights`
);
html = html.replace(
  `Maximum 10 reviews per day per account. Spam review campaigns are automatically blocked.`,
  `Ratings and written feedback help buyers compare options while giving sellers clear ideas for updates and improvements.`
);
html = html.replace(
  `✓ Edit and delete`,
  `✓ Reviews can evolve`
);
html = html.replace(
  `Buyers can update their review if their experience changes. Transparency works both ways.`,
  `Buyers can update feedback as products improve, so creators receive credit for continued support, fixes, and new features.`
);
html = html.replace(
  `Trust is everything.<br>We protect it like it is.`,
  `Trust helps everyone grow.<br>We build around it.`
);
html = html.replace(
  `Browse products with confidence. Every review you read is from a real buyer who actually used it.`,
  `Buyers get clearer decisions. Creators earn stronger reputations. Every verified review helps the whole marketplace improve.`
);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, html, 'utf8');
console.log(`Built ${outputPath}`);
