const fs = require('fs');
const path = require('path');

async function main() {
  const sourceUrl = 'https://agentorry.com/?gradient-source=' + Date.now();
  const response = await fetch(sourceUrl, {
    headers: { 'User-Agent': 'Agentorry-Vercel-Build' }
  });

  if (!response.ok) {
    throw new Error(`Could not fetch the current Agentorry production site: ${response.status}`);
  }

  let html = await response.text();

  const requiredMarkers = [
    'id="page-privacy"',
    'id="page-terms"',
    'hero-title-v2',
    'hero-agent',
    'hero-automation',
    'theme-toggle-float'
  ];

  for (const marker of requiredMarkers) {
    if (!html.includes(marker)) {
      throw new Error(`Required live-site marker is missing: ${marker}`);
    }
  }

  const gradientStyle = `
<style id="agentorry-synced-hero-gradient">
@keyframes agentorryHeroGradientFlow{
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

.hero-word.hero-agent,
.hero-word.hero-automation{
  background:linear-gradient(
    90deg,
    #c55ce2 0%,
    #ec4899 22%,
    #8b5cf6 48%,
    #6c63ff 72%,
    #38bdf8 100%
  )!important;
  background-size:260% 100%!important;
  background-position:0% 50%;
  animation:agentorryHeroGradientFlow 6s ease-in-out infinite!important;
  -webkit-background-clip:text!important;
  background-clip:text!important;
  -webkit-text-fill-color:transparent!important;
}

.hero-plus{
  background:linear-gradient(
    90deg,
    #c55ce2 0%,
    #ec4899 22%,
    #8b5cf6 48%,
    #6c63ff 72%,
    #38bdf8 100%
  )!important;
  background-size:260% 100%!important;
  background-position:0% 50%;
  animation:agentorryHeroGradientFlow 6s ease-in-out infinite!important;
}

@media (prefers-reduced-motion:reduce){
  .hero-word.hero-agent,
  .hero-word.hero-automation,
  .hero-plus{
    animation:none!important;
    background-position:50% 50%!important;
  }
}
</style>`;

  const existingStyle = /\n?<style id="agentorry-synced-hero-gradient">[\s\S]*?<\/style>/;
  if (existingStyle.test(html)) {
    html = html.replace(existingStyle, '\n' + gradientStyle);
  } else {
    html = html.replace('</head>', gradientStyle + '\n</head>');
  }

  const outputDir = path.join(__dirname, 'public');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');

  console.log('Agentorry synchronized hero gradient built successfully');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
