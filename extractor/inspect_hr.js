import fs from 'fs';

const xml = fs.readFileSync('extractor/document.xml', 'utf8');
const hrPos = 1975720;
const slice = xml.substring(hrPos, hrPos + 200000);

const pRegex = /<w:p\b[\s\S]*?<\/w:p>/g;
let m;
let count = 0;
while ((m = pRegex.exec(slice)) !== null) {
  const pXml = m[0];
  const styleMatch = pXml.match(/<w:pStyle w:val="([^"]+)"\/>/);
  const text = pXml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const isBold = pXml.includes('<w:b/>') || pXml.includes('<w:b ');
  
  if (styleMatch || (isBold && text.length > 0 && text.length < 60)) {
    console.log(`[${styleMatch ? styleMatch[1] : 'Bold'}] ${text}`);
    count++;
    if (count > 60) break;
  }
}
