const fs = require('fs');
const path = require('path');

async function main() {
  const sourceUrl = 'https://agentorry.com/?restore-original-gradient=' + Date.now();
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

  html = html.replace(
    /\n?<style id="agentorry-synced-hero-gradient">[\s\S]*?<\/style>/,
    ''
  );

  const outputDir = path.join(__dirname, 'public');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');

  console.log('Agentorry original hero gradient restored successfully');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
