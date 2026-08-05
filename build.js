const fs = require('fs');
const path = require('path');

async function main() {
  const sourceUrl = 'https://agentorry.com/?privacy-page-source=' + Date.now();
  const response = await fetch(sourceUrl, {
    headers: { 'User-Agent': 'Agentorry-Vercel-Build' }
  });

  if (!response.ok) {
    throw new Error(`Could not fetch the current Agentorry production site: ${response.status}`);
  }

  let html = await response.text();

  const requiredMarkers = [
    'id="page-terms"',
    'id="cookie-overlay"',
    'The Marketplace for',
    'AI Agents'
  ];

  for (const marker of requiredMarkers) {
    if (!html.includes(marker)) {
      throw new Error(`Required live-site marker is missing: ${marker}`);
    }
  }

  const privacyPage = `
<!-- ═══ PRIVACY POLICY ═══ -->
<div class="page" id="page-privacy">
  <div style="max-width:760px;margin:0 auto;padding:60px 28px 80px">

    <div style="margin-bottom:48px">
      <div style="font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:10px">Legal</div>
      <h1 style="font-size:2.5rem;font-weight:800;color:var(--text);letter-spacing:-.03em;margin-bottom:12px">Privacy Policy</h1>
      <p style="color:var(--text3);font-size:.875rem">Last updated: August 5, 2026</p>
    </div>

    <div style="background:var(--pale);border:1.5px solid rgba(108,99,255,0.15);border-radius:16px;padding:20px 24px;margin-bottom:40px">
      <p style="font-size:.875rem;color:var(--text2);line-height:1.75">Your privacy matters to us. This policy explains what information Agentorry collects, why we use it, and the choices you have when using our marketplace.</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:36px;font-size:.9rem;color:var(--text2);line-height:1.8">
      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">1. Information We Collect</h2>
        <p>We may collect information you provide directly, including your name, email address, account details, seller profile, product listings, support messages, and transaction-related information.</p>
        <p style="margin-top:10px">We may also collect technical information such as your browser type, device information, IP address, pages visited, and actions taken on the platform.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">2. How We Use Information</h2>
        <p>We use information to operate Agentorry, create and secure accounts, process marketplace activity, provide customer support, improve the platform, prevent fraud, communicate important updates, and comply with legal obligations.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">3. Cookies and Preferences</h2>
        <p>We use cookies and similar technologies to keep you signed in, remember your preferences, maintain security, understand platform usage, and improve your experience. You can manage cookies through your browser settings.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">4. How Information Is Shared</h2>
        <p>We do not sell your personal information. We may share information with trusted service providers that help us host the platform, process payments, provide analytics, prevent fraud, or deliver support. These providers may use information only to perform services for Agentorry.</p>
        <p style="margin-top:10px">We may also disclose information when required by law, to protect users, or to defend the rights and security of Agentorry.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">5. Marketplace Transactions</h2>
        <p>When buyers and sellers complete marketplace activity, limited information may be shared as necessary to deliver a product, provide support, handle a dispute, or complete a payment. Payment providers process payment details under their own privacy policies.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">6. Data Security</h2>
        <p>We use reasonable technical and organizational safeguards designed to protect personal information. No online service can guarantee absolute security, so users should also protect their passwords and account access.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">7. Data Retention</h2>
        <p>We retain information for as long as necessary to provide the platform, maintain transaction and security records, resolve disputes, comply with legal requirements, and enforce our agreements.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">8. Your Choices and Rights</h2>
        <p>Depending on your location, you may have rights to access, correct, download, restrict, or request deletion of your personal information. You may also opt out of non-essential communications.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">9. Children's Privacy</h2>
        <p>Agentorry is intended for users who are at least 18 years old. We do not knowingly collect personal information from children.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">10. Changes to This Policy</h2>
        <p>We may update this Privacy Policy as Agentorry develops. When changes are significant, we may provide notice through the platform or by email. The updated date at the top shows when this policy was last revised.</p>
      </div>

      <div>
        <h2 style="font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--border)">11. Contact</h2>
        <p>Questions or requests about this Privacy Policy can be sent through Agentorry's official support channel.</p>
      </div>
    </div>
  </div>
</div>
`;

  if (!html.includes('id="page-privacy"')) {
    html = html.replace('<!-- ═══ TERMS ═══ -->', privacyPage + '\n<!-- ═══ TERMS ═══ -->');
  }

  html = html.replace(
    `<span onclick="openLegal('terms')" style="color:var(--accent);cursor:pointer;font-weight:600">Privacy Policy</span>`,
    `<span onclick="openLegal('privacy')" style="color:var(--accent);cursor:pointer;font-weight:600">Privacy Policy</span>`
  );

  html = html.replace(
    `<div style="display:flex;gap:14px"><p style="cursor:pointer" onclick="go('terms')">Privacy</p><p style="cursor:pointer" onclick="go('terms')">Terms</p></div>`,
    `<div style="display:flex;gap:14px"><p style="cursor:pointer" onclick="go('privacy')">Privacy</p><p style="cursor:pointer" onclick="go('terms')">Terms</p></div>`
  );

  html = html.replace(
    `Your use of Agentorry is also governed by our Privacy Policy. We collect and process personal data as described in that policy. We do not sell your personal data to third parties.`,
    `Your use of Agentorry is also governed by our <span onclick="go('privacy')" style="color:var(--accent);font-weight:700;cursor:pointer">Privacy Policy</span>. We collect and process personal data as described in that policy. We do not sell your personal data to third parties.`
  );

  if (!html.includes(`openLegal('privacy')`) || !html.includes('id="page-privacy"')) {
    throw new Error('Privacy page or Privacy cookie link was not created correctly');
  }

  const outputDir = path.join(__dirname, 'public');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');

  console.log('Agentorry dedicated Privacy Policy page built successfully');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
