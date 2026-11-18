const fs = require('fs');

const xml = fs.readFileSync('extractor/document.xml', 'utf-8');
const pMatches = [...xml.matchAll(/<w:p(?:[\s>][\s\S]*?<\/w:p>|\/>)/g)];

let capture = false;
let lines = [];
for (let i = 0; i < 400; i++) {
  const p = pMatches[i][0];
  const textMatches = p.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
  const t = textMatches.map(m => m.replace(/<[^>]+>/g, '')).join('').trim();
  const styleMatch = p.match(/<w:pStyle w:val="([^"]+)"\/>/);
  const style = styleMatch ? styleMatch[1] : '';
  
  if (style === 'Heading2' && t === 'Juggernaut') {
    capture = true;
  } else if (capture && style === 'Heading2' && t === 'Scout') {
    break;
  }
  
  if (capture && t) {
    lines.push(`[${style || 'p'}] ${t}`);
  }
}
console.log(lines.slice(0, 35).join('\n'));
