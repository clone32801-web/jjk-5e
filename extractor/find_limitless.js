const fs = require('fs');

const xml = fs.readFileSync('extractor/document.xml', 'utf-8');
const pMatches = [...xml.matchAll(/<w:p(?:[\s>][\s\S]*?<\/w:p>|\/>)/g)];

pMatches.forEach((p, idx) => {
  const textMatches = p[0].match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
  const t = textMatches.map(m => m.replace(/<[^>]+>/g, '')).join('').trim();
  if (t === 'Limitless') {
    const styleMatch = p[0].match(/<w:pStyle w:val="([^"]+)"\/>/);
    console.log('Limitless at idx', idx, 'style:', styleMatch ? styleMatch[1] : 'none');
  }
});
