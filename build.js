const fs = require('fs');
const path = require('path');

async function main() {
  const sourceUrl = 'https://agentorry.com/?expanded-terms-source=' + Date.now();
  const response = await fetch(sourceUrl, {
    headers: { 'User-Agent': 'Agentorry-Vercel-Build' }
  });

  if (!response.ok) {
    throw new Error(`Could not fetch the current Agentorry production site: ${response.status}`);
  }

  let html = await response.text();

  const requiredMarkers = [
    'id="page-home"',
    'id="page-privacy"',
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

  const termsPage = `
<!-- ═══ TERMS ═══ -->
<div class="page" id="page-terms">
  <div style="max-width:820px;margin:0 auto;padding:54px 28px 90px">

    <div style="margin-bottom:34px">
      <div style="font-size:.7rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:10px">Legal</div>
      <h1 style="font-size:clamp(2.15rem,5vw,3rem);font-weight:800;color:var(--text);letter-spacing:-.035em;margin-bottom:12px">Terms & Conditions</h1>
      <p style="color:var(--text3);font-size:.82rem">Last updated: August 5, 2026</p>
    </div>

    <div style="background:var(--pale);border:1.5px solid rgba(108,99,255,0.18);border-radius:18px;padding:22px 24px;margin-bottom:30px">
      <div style="font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:8px">Important notice</div>
      <p style="font-size:.84rem;color:var(--text2);line-height:1.75">These Terms form a binding agreement between you and the operator of Agentorry. They contain important rules about marketplace transactions, seller responsibility, refunds, disclaimers, limitations of liability, and dispute resolution. Nothing in these Terms removes rights or remedies that cannot legally be waived.</p>
    </div>

    <div style="background:var(--card);border:1.5px solid var(--border);border-radius:18px;padding:22px 24px;margin-bottom:34px">
      <div style="font-size:.78rem;font-weight:800;color:var(--text);margin-bottom:10px">Key points</div>
      <ul style="padding-left:18px;display:flex;flex-direction:column;gap:7px;font-size:.8rem;color:var(--text2);line-height:1.65">
        <li>Agentorry is a marketplace and generally does not create, own, operate, or guarantee third-party products.</li>
        <li>Sellers are responsible for their products, descriptions, licenses, support, legal compliance, and intellectual-property rights.</li>
        <li>AI products and outputs may be inaccurate, incomplete, unsafe, or unsuitable for a particular use.</li>
        <li>Agentorry is not liable for good-faith accidental errors or third-party conduct except where applicable law does not allow that liability to be excluded.</li>
        <li>Paid transactions are subject to the refund, fee, payment, and dispute rules below.</li>
      </ul>
    </div>

    <div style="display:flex;flex-direction:column;gap:28px;font-size:.84rem;color:var(--text2);line-height:1.78">

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">1. Acceptance of These Terms</h2>
        <p>By accessing, browsing, creating an account, joining the waitlist, uploading a product, purchasing, downloading, reviewing, messaging, or otherwise using Agentorry, you agree to these Terms and the Privacy Policy. If you do not agree, you must not use Agentorry.</p>
        <p style="margin-top:9px">If you use Agentorry for a company or other organization, you confirm that you have authority to bind that organization, and “you” includes both you and that organization.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">2. About Agentorry and Our Marketplace Role</h2>
        <p>Agentorry provides an online marketplace where independent creators may list AI agents, automations, chatbots, workflows, prompt packs, source-code projects, and related digital products. Buyers may discover, evaluate, purchase, and download those products.</p>
        <p style="margin-top:9px">Unless a listing clearly states that Agentorry is the seller, Agentorry is an intermediary and is not the creator, employer, agent, partner, joint venturer, distributor, or legal representative of a third-party seller. A transaction for a third-party product is principally between the buyer and the seller, with Agentorry providing marketplace, payment, security, hosting, and administrative services.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">3. Eligibility and Authority</h2>
        <p>You must be at least 18 years old and legally capable of entering into a binding contract. You may not use Agentorry if applicable law prohibits you from doing so, if you are subject to sanctions that prohibit the transaction, or if your account was previously permanently suspended unless Agentorry gives written permission.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">4. Accounts and Account Security</h2>
        <p>You must provide accurate, current, and complete information and keep it updated. You are responsible for maintaining the confidentiality of your credentials, devices, recovery methods, and account activity. You must promptly notify Agentorry of suspected unauthorized access.</p>
        <p style="margin-top:9px">Agentorry may require identity, business, payment, tax, or ownership verification. We may refuse, limit, suspend, or close accounts where information is false, unverifiable, misleading, duplicated, compromised, or associated with prohibited conduct.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">5. Seller Status and Responsibilities</h2>
        <p>Sellers act independently and are fully responsible for their products and business activity. Each seller represents and warrants that:</p>
        <ul style="margin-top:9px;padding-left:19px;display:flex;flex-direction:column;gap:7px">
          <li>the seller owns the product or has all rights, licenses, permissions, and authority required to list and sell it;</li>
          <li>the product is a genuine AI-related digital product and not a misleading, empty, copied, stolen, unsafe, or falsely advertised file;</li>
          <li>the listing, screenshots, demonstrations, performance claims, compatibility claims, and documentation are accurate and not deceptive;</li>
          <li>the product complies with applicable laws, regulations, platform rules, third-party terms, open-source licenses, privacy obligations, and intellectual-property rights;</li>
          <li>the product does not contain malware, spyware, ransomware, credential theft, undisclosed tracking, destructive code, unauthorized access mechanisms, or concealed harmful functionality;</li>
          <li>the seller will provide reasonable setup information, a README, dependency information, licensing terms, and support details appropriate to the product;</li>
          <li>the seller will not manipulate ratings, downloads, sales, rankings, reviews, referrals, or marketplace activity.</li>
        </ul>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">6. Product Validation and Review</h2>
        <p>Agentorry may use automated and manual systems to scan, classify, validate, reject, quarantine, remove, or investigate products. Validation is a risk-reduction measure, not a certification, warranty, audit, endorsement, or guarantee that a product is secure, lawful, accurate, useful, compatible, complete, or free of vulnerabilities.</p>
        <p style="margin-top:9px">A product may pass validation and still contain defects or risks that were not detected. Buyers remain responsible for reviewing code, documentation, permissions, dependencies, data access, network activity, and deployment settings before running a product in a sensitive or production environment.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">7. AI-Specific Risks and Outputs</h2>
        <p>AI systems are probabilistic and may generate inaccurate, incomplete, biased, offensive, outdated, fabricated, infringing, unsafe, or unexpected outputs. Products may depend on changing models, APIs, prompts, datasets, third-party providers, usage limits, or external services.</p>
        <p style="margin-top:9px">You must independently verify important outputs and must not rely on an Agentorry product as the sole basis for medical, legal, financial, employment, safety-critical, law-enforcement, weapons, emergency, or other high-impact decisions. Sellers must clearly disclose material limitations and required human oversight.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">8. Product Licenses</h2>
        <p>A purchase gives the buyer only the license described in the listing or included license file. If no separate license is stated, the buyer receives a limited, non-exclusive, non-transferable, revocable license to use one copy of the product for the buyer's own lawful personal or internal business use.</p>
        <p style="margin-top:9px">A buyer may not resell, sublicense, publicly redistribute, leak, mirror, re-upload, remove ownership notices from, or commercially exploit the product as a competing product unless the seller expressly permits it in writing. Open-source components remain subject to their applicable licenses.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">9. Buyer Responsibilities</h2>
        <p>Buyers are responsible for confirming that a product meets their needs, reviewing system requirements, maintaining backups, protecting credentials and API keys, using sandboxed or isolated environments where appropriate, and complying with the seller's license and all applicable laws.</p>
        <p style="margin-top:9px">A buyer must not use a product to violate rights, evade security, deceive users, process data without authority, create unlawful content, or cause harm. Downloading a product does not transfer ownership of the product or its intellectual property.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">10. Prices, Platform Fees, and Seller Proceeds</h2>
        <p>Sellers set product prices unless Agentorry states otherwise. Agentorry currently charges a 9% platform fee on paid sales, so the seller generally keeps 91% before taxes, refunds, chargebacks, currency conversion, payment-provider costs, reserves, or other disclosed deductions. Free products have no platform fee.</p>
        <p style="margin-top:9px">Agentorry may change fees with reasonable advance notice, including at least 30 days where practicable. Promotional or early-access fee arrangements may be limited, changed, or withdrawn according to their stated conditions.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">11. Payments, Payouts, Reserves, and Chargebacks</h2>
        <p>Payments and payouts may be processed by third-party payment providers and are subject to their terms, verification requirements, availability, processing times, and restrictions. Agentorry does not guarantee that every payment method, currency, country, or payout route will be available.</p>
        <p style="margin-top:9px">Agentorry may delay, withhold, reverse, offset, or establish a reasonable reserve against seller proceeds where needed to address refunds, disputes, fraud, chargebacks, legal obligations, security concerns, policy violations, negative balances, or payment-provider requirements. Sellers remain responsible for chargebacks and amounts owed because of their products or conduct.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">12. Taxes</h2>
        <p>Users are responsible for determining, reporting, and paying taxes, duties, levies, and governmental charges arising from their use of Agentorry, purchases, sales, or earnings, except where Agentorry is legally required to collect, withhold, report, or remit them. Agentorry may request tax information and may report transaction information to authorities where required.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">13. Refunds and Digital Products</h2>
        <p>Because digital products can be accessed or copied immediately, purchases are generally final except where these Terms, the listing, or mandatory law provides otherwise. A buyer may request a refund within 3 days of purchase when a product materially fails to work as described or is materially different from its listing.</p>
        <p style="margin-top:9px">The buyer must provide order details, a clear explanation, and reasonable evidence. Refunds may be denied where the request is late, unsupported, caused by buyer configuration or unsupported use, concerns a disclosed limitation, or follows substantial download, copying, use, or misuse. Agentorry may consult the seller and may approve, deny, or partially resolve a request based on the available evidence and applicable law.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">14. Reviews, Ratings, and Marketplace Integrity</h2>
        <p>Reviews must reflect a genuine experience and may not be purchased, exchanged, coerced, fabricated, manipulated, posted through duplicate accounts, or used for retaliation. Agentorry may verify purchases, rate-limit activity, remove reviews, adjust rankings, and investigate suspicious behavior.</p>
        <p style="margin-top:9px">Agentorry does not guarantee that every review is accurate or representative. Opinions belong to the reviewer, not Agentorry.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">15. User Content, Listings, and Promotional License</h2>
        <p>You retain ownership of content you submit, subject to third-party rights. You grant Agentorry a worldwide, non-exclusive, royalty-free, sublicensable license to host, store, reproduce, format, display, distribute, and use listing information, product images, names, logos, previews, reviews, and related content to operate, secure, improve, and promote Agentorry and the listed product.</p>
        <p style="margin-top:9px">You confirm that this use will not violate any law, contract, confidentiality duty, privacy right, publicity right, trademark, copyright, patent, or other right.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">16. Intellectual Property Complaints</h2>
        <p>Agentorry may remove or restrict content that is alleged to infringe intellectual property and may suspend repeat infringers. A complaint should identify the protected work, the allegedly infringing material, the complainant's authority, contact information, and a good-faith statement. False or abusive complaints may result in account action and legal responsibility.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">17. Prohibited Products and Conduct</h2>
        <p>You may not use Agentorry to create, upload, sell, purchase, distribute, promote, or facilitate:</p>
        <ul style="margin-top:9px;padding-left:19px;display:flex;flex-direction:column;gap:7px">
          <li>malware, ransomware, spyware, credential theft, destructive code, botnets, unauthorized remote access, or concealed surveillance;</li>
          <li>products intended to unlawfully hack, exploit, bypass security, evade access controls, impersonate others, or steal data;</li>
          <li>fraud, scams, deceptive automation, fake reviews, fake engagement, phishing, spam, account abuse, or platform manipulation;</li>
          <li>stolen, leaked, pirated, counterfeit, plagiarized, or unauthorized intellectual property;</li>
          <li>content or tools that unlawfully discriminate, harass, threaten, exploit, or facilitate physical harm;</li>
          <li>illegal goods, regulated weapons, prohibited drugs, unlawful gambling, sexual exploitation, terrorist activity, or other unlawful or seriously harmful conduct;</li>
          <li>collection, sale, scraping, processing, or disclosure of personal data without a valid legal basis and required notices or consent;</li>
          <li>conduct that interferes with Agentorry, bypasses fees, circumvents transaction systems, overloads infrastructure, probes vulnerabilities without authorization, or disrupts other users.</li>
        </ul>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">18. Third-Party Services, Models, APIs, and Links</h2>
        <p>Products and Agentorry may depend on third-party hosting, payment processors, AI models, APIs, libraries, datasets, websites, or services. Agentorry does not control and is not responsible for their availability, security, pricing, policies, output, changes, suspension, data practices, or conduct.</p>
        <p style="margin-top:9px">A third party may change or discontinue a service at any time, which may cause a product to stop working. Users are responsible for reviewing and complying with third-party terms and costs.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">19. Privacy, Data Protection, and Confidential Information</h2>
        <p>Your use of Agentorry is governed by our <span onclick="go('privacy')" style="color:var(--accent);font-weight:700;cursor:pointer">Privacy Policy</span>. Sellers who process personal data through their products are independently responsible for privacy notices, legal bases, permissions, retention, security, user requests, processor agreements, cross-border transfers, and compliance with applicable data-protection law.</p>
        <p style="margin-top:9px">You must not upload confidential information, trade secrets, personal data, credentials, or proprietary material unless you have authority and appropriate safeguards.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">20. Security and Responsible Disclosure</h2>
        <p>You must not test, scan, access, or exploit Agentorry systems without written authorization. Security concerns should be reported privately through Agentorry's official contact channel and must not be publicly disclosed before Agentorry has a reasonable opportunity to investigate and remediate them.</p>
        <p style="margin-top:9px">No security system is perfect. Agentorry does not guarantee that the platform or any product will be free from vulnerabilities, unauthorized access, data loss, or attacks.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">21. Moderation, Removal, Suspension, and Termination</h2>
        <p>Agentorry may investigate, limit visibility, reject, unpublish, quarantine, remove, preserve, or disclose content and may restrict, suspend, or terminate accounts where reasonably necessary to enforce these Terms, protect users, comply with law or provider requirements, respond to disputes, reduce risk, or protect Agentorry's systems and reputation.</p>
        <p style="margin-top:9px">Where reasonable and legally permitted, Agentorry may provide notice or an opportunity to appeal. Immediate action may be taken where delay could create harm, fraud, security risk, legal exposure, evidence destruction, or continued violations.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">22. Platform Availability, Changes, and Beta Features</h2>
        <p>Agentorry may add, modify, suspend, restrict, replace, or discontinue features, interfaces, limits, categories, eligibility rules, storage, integrations, or services. Early-access, preview, beta, experimental, and free features may be incomplete, unstable, changed without notice, or discontinued.</p>
        <p style="margin-top:9px">Agentorry does not promise continuous availability, a particular uptime, permanent storage, compatibility with every device, or preservation of every listing, message, file, metric, or account. You should maintain your own copies and backups.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">23. Disclaimers of Warranties</h2>
        <p>To the fullest extent permitted by applicable law, Agentorry, the marketplace, all platform features, and third-party products are provided “as is” and “as available,” without warranties or guarantees of any kind. Agentorry disclaims express, implied, statutory, and other warranties, including merchantability, fitness for a particular purpose, title, non-infringement, accuracy, availability, security, compatibility, satisfactory quality, quiet enjoyment, and results.</p>
        <p style="margin-top:9px">Agentorry does not guarantee that products will meet expectations, produce revenue, operate without errors, remain compatible with third-party services, or be suitable for production, regulated, sensitive, or high-risk use.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">24. Limitation of Liability, Including Accidental or Unintentional Issues</h2>
        <p>To the fullest extent permitted by applicable law, Agentorry and its owners, operators, affiliates, personnel, contractors, and service providers will not be liable for indirect, incidental, consequential, special, exemplary, punitive, or enhanced damages, or for lost profits, revenue, business, opportunities, goodwill, reputation, anticipated savings, data, files, credentials, or use, arising from or related to Agentorry, these Terms, a transaction, a seller, a buyer, a product, an AI output, or a third-party service, regardless of the legal theory and even if advised that such damage was possible.</p>
        <p style="margin-top:9px">To the fullest extent permitted by law, Agentorry will not be liable for good-faith, accidental, or unintentional errors, omissions, mistakes, delays, interruptions, failed notifications, incorrect classifications, validation failures, compatibility problems, data loss, unauthorized third-party conduct, security incidents, outages, or service defects, except to the extent directly caused by fraud, willful misconduct, gross negligence, or another liability that applicable law does not allow to be excluded or limited.</p>
        <p style="margin-top:9px">To the fullest extent permitted by law, Agentorry's total aggregate liability for all claims arising during any 12-month period will not exceed the greater of: (a) the platform fees you actually paid directly to Agentorry during the 12 months before the event giving rise to the claim; or (b) US$100. This limitation does not apply where applicable law requires a different remedy or prohibits the limitation.</p>
        <p style="margin-top:9px">Nothing in these Terms prevents any person from bringing a claim or exercising a right that cannot lawfully be waived. No clause guarantees that a claim can never be filed; these clauses define and limit responsibility only to the extent the law permits.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">25. Release Regarding Third-Party Products and Users</h2>
        <p>To the fullest extent permitted by law, you release Agentorry from claims arising solely from the acts, omissions, products, statements, disputes, transactions, data practices, or conduct of independent buyers, sellers, creators, or other third parties. This release does not apply to responsibility that applicable law directly imposes on Agentorry and does not exclude non-waivable consumer rights.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">26. Indemnity for Sellers and Business Users</h2>
        <p>To the fullest extent permitted by law, sellers and users acting for a business agree to defend, indemnify, and hold harmless Agentorry and its owners, operators, affiliates, personnel, and service providers from claims, losses, liabilities, damages, judgments, penalties, investigations, settlements, and reasonable legal costs arising from their products, listings, content, taxes, data processing, infringement, violation of law, breach of these Terms, fraud, misconduct, or dispute with another user.</p>
        <p style="margin-top:9px">This section does not apply to individual consumers to the extent prohibited by consumer-protection law and does not require indemnification for Agentorry's own fraud, willful misconduct, or gross negligence.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">27. Disputes Between Buyers and Sellers</h2>
        <p>Buyers and sellers should first attempt to resolve product, support, licensing, compatibility, and refund disputes directly and in good faith. Agentorry may offer tools, request evidence, restrict funds, or make an administrative marketplace decision, but Agentorry is not required to act as a court, arbitrator, expert witness, or guarantor.</p>
        <p style="margin-top:9px">A marketplace decision does not determine legal rights outside Agentorry and does not prevent a party from using remedies available under applicable law.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">28. Dispute Resolution with Agentorry</h2>
        <p>Before starting formal proceedings against Agentorry, you agree to send a detailed written notice describing the dispute, relevant account and transaction information, the requested resolution, and supporting evidence, and to allow at least 30 days for a good-faith response.</p>
        <p style="margin-top:9px">Any dispute that is not resolved informally will be handled under applicable law by a court or other legally authorized forum with jurisdiction. Any arbitration or class-action waiver will apply only where legally valid, properly disclosed, and enforceable. Mandatory consumer rights, small-claims rights, and rights that cannot legally be waived remain unaffected.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">29. Governing Law and Mandatory Rights</h2>
        <p>These Terms are governed by the law legally applicable to the operator of Agentorry and the relevant transaction, without overriding mandatory consumer, privacy, employment, intellectual-property, tax, competition, or other laws that apply regardless of contractual choice.</p>
        <p style="margin-top:9px">Before Agentorry launches paid transactions at scale, the platform should publish the legal operator's full entity name, registered address, and specific governing-law and forum details. Until then, no provision should be interpreted as inventing a jurisdiction or removing a right granted by mandatory law.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">30. Force Majeure</h2>
        <p>Agentorry is not responsible for delay or failure caused by events beyond reasonable control, including internet or cloud failures, payment-network failures, cyberattacks, model-provider outages, labor disputes, natural disasters, war, terrorism, civil unrest, epidemics, government action, sanctions, power failures, or interruption of suppliers and infrastructure.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">31. Electronic Communications and Notices</h2>
        <p>You consent to receive agreements, notices, receipts, security alerts, policy updates, and transaction communications electronically through the platform, account, or email address you provide. You are responsible for keeping your contact information current and checking communications reasonably associated with your account.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">32. Changes to These Terms</h2>
        <p>Agentorry may update these Terms to reflect new features, risks, laws, business models, payment methods, or operational practices. Material changes may be announced through the platform or by email. The updated date will identify the latest version.</p>
        <p style="margin-top:9px">Where required by law, Agentorry will request renewed consent. Otherwise, continued use after the effective date constitutes acceptance of the updated Terms.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">33. Assignment</h2>
        <p>You may not transfer your account or assign these Terms without Agentorry's written consent. Agentorry may assign these Terms in connection with a merger, acquisition, restructuring, financing, sale of assets, change of control, or transfer of the platform, subject to applicable law.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">34. Severability, Waiver, and Interpretation</h2>
        <p>If a provision is held unlawful or unenforceable, it will be limited or modified to the minimum extent necessary, and the remaining provisions will continue in effect. Failure to enforce a provision is not a waiver. Headings are for convenience and do not control interpretation.</p>
        <p style="margin-top:9px">Terms such as “including” mean “including without limitation.” Any ambiguity will be resolved according to applicable law, including rules protecting consumers where relevant.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">35. Survival</h2>
        <p>Provisions concerning ownership, licenses, payments, taxes, refunds, intellectual property, disclaimers, liability limits, releases, indemnity, disputes, governing law, and any provisions that by their nature should continue will survive account closure or termination.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">36. Entire Agreement and Additional Policies</h2>
        <p>These Terms, the Privacy Policy, listing-specific license terms, payment-provider terms, and any additional policies expressly incorporated by reference form the agreement governing your use of Agentorry. A seller may provide additional product-license terms, but those terms may not reduce mandatory buyer rights or impose obligations on Agentorry without Agentorry's written agreement.</p>
      </section>

      <section>
        <h2 style="font-size:1.08rem;font-weight:800;color:var(--text);margin-bottom:11px;padding-bottom:9px;border-bottom:1px solid var(--border)">37. Contact</h2>
        <p>Questions, notices, legal requests, intellectual-property complaints, and security reports may be sent through Agentorry's official contact page or to:</p>
        <div style="margin-top:12px;padding:17px 20px;background:var(--pale);border:1.5px solid rgba(108,99,255,0.16);border-radius:13px">
          <div style="font-weight:800;color:var(--text);margin-bottom:4px">Agentorry</div>
          <div style="color:var(--accent);font-weight:700">hello@agentorry.com</div>
          <div style="color:var(--text3);font-size:.76rem;margin-top:5px">Include your account email, relevant order or listing ID, and a clear description of the request.</div>
        </div>
      </section>

    </div>

    <div style="margin-top:44px;padding-top:28px;border-top:1px solid var(--border);display:flex;gap:11px;flex-wrap:wrap">
      <button class="btn bp" onclick="go('waitlist')">Join the waitlist →</button>
      <button class="btn bs" onclick="go('privacy')">Privacy Policy</button>
      <button class="btn bg-btn" onclick="go('contact')">Contact us</button>
    </div>
  </div>
</div>
`;

  const termsPattern = /<!-- ═══ TERMS ═══ -->[\s\S]*?(?=<!-- ═══ BLOG POST 2 - SECURITY ═══ -->)/;
  if (!termsPattern.test(html)) {
    throw new Error('Could not locate the complete Terms page block');
  }

  html = html.replace(termsPattern, termsPage + '\n\n');

  if (!html.includes('24. Limitation of Liability, Including Accidental or Unintentional Issues') ||
      !html.includes('37. Contact') ||
      !html.includes('id="page-privacy"')) {
    throw new Error('Expanded Terms validation failed');
  }

  const outputDir = path.join(__dirname, 'public');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');

  console.log('Agentorry expanded Terms & Conditions built successfully');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
