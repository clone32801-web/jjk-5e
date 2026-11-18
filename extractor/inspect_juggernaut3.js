const fs = require('fs');

const xml = fs.readFileSync('extractor/document.xml', 'utf-8');
const pMatches = [...xml.matchAll(/<w:p(?:[\s>][\s\S]*?<\/w:p>|\/>)/g)];

let lines = [];
for (let i = 320; i < 390 && i < pMatches.length; i++) {
  const p = pMatches[i][0];
  const textMatches = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
  const t = textMatches.map(m => m.replace(/<[^>]+>/g, '')).join('').trim();
  const styleMatch = p.match(/<w:pStyle w:val="([^"]+)"\/>/);
  const style = styleMatch ? styleMatch[1] : '';
  if (t) lines.push(`[${i}] [${style || 'p'}] ${t}`);
}
console.log(lines.slice(0, 40).join('\n'));
