const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(file, 'utf8');

// Exact same logo geometry used by the Agentorry navbar (.lm):
// purple rounded square + the same white lightning polygon.
const favicon = `<link rel="icon" type="image/svg+xml" sizes="any" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236c63ff'/%3E%3Cstop offset='100%25' stop-color='%238b85ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='24' height='24' rx='7.25' fill='url(%23g)'/%3E%3Cpolygon points='13,2 4,13 11,13 10,22 20,10 13,10' fill='white'/%3E%3C/svg%3E">`;

// Replace any existing favicon link with the website's exact logo.
if (/<link\s+rel=["']icon["'][^>]*>/i.test(html)) {
  html = html.replace(/<link\s+rel=["']icon["'][^>]*>/i, favicon);
} else {
  html = html.replace('</head>', `${favicon}\n</head>`);
}

// Remove a stale shortcut icon if one exists, then add a matching one for browsers
// that still prefer rel="shortcut icon".
html = html.replace(/\n?<link\s+rel=["']shortcut icon["'][^>]*>/ig, '');
html = html.replace(favicon, `${favicon}\n<link rel="shortcut icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236c63ff'/%3E%3Cstop offset='100%25' stop-color='%238b85ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='24' height='24' rx='7.25' fill='url(%23g)'/%3E%3Cpolygon points='13,2 4,13 11,13 10,22 20,10 13,10' fill='white'/%3E%3C/svg%3E">`);

if (!html.includes("points='13,2 4,13 11,13 10,22 20,10 13,10'")) {
  throw new Error('Agentorry favicon was not injected correctly');
}

fs.writeFileSync(file, html, 'utf8');
console.log('Agentorry favicon now matches the website logo exactly');
