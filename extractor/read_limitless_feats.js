const fs = require('fs');

const xml = fs.readFileSync('extractor/document.xml', 'utf-8');
const pMatches = [...xml.matchAll(/<w:p(?:[\s>][\s\S]*?<\/w:p>|\/>)/g)];

for (let i = 5742; i < 5770 && i < pMatches.length; i++) {
  const p = pMatches[i][0];
  const textMatches = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
  const t = textMatches.map(m => m.replace(/<[^>]+>/g, '')).join('').trim();
  const styleMatch = p.match(/<w:pStyle w:val="([^"]+)"\/>/);
  console.log(`[${i}] (${styleMatch ? styleMatch[1] : 'p'}): ${t}`);
}
