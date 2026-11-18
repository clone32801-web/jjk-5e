const fs = require('fs');

const xml = fs.readFileSync('extractor/document.xml', 'utf-8');

// Load rels
const relsXml = fs.readFileSync('extractor/document.xml.rels', 'utf-8');
const relMatches = relsXml.matchAll(/<Relationship Id="([^"]+)" Type="[^"]*image" Target="([^"]+)"\/>/g);
const relMap = {};
for (const match of relMatches) {
  relMap[match[1]] = match[2].replace(/^media\//, '');
}

function extractText(str) {
  const matches = str.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
  return matches.map(m => m.replace(/<[^>]+>/g, '')).join('');
}

const bodyStart = xml.indexOf('<w:body>') + 8;
const bodyEnd = xml.indexOf('</w:body>');
const bodyXml = xml.slice(bodyStart, bodyEnd);

let pos = 0;
const blocks = [];

while (pos < bodyXml.length) {
  const nextTag = bodyXml.slice(pos).match(/<w:(p|tbl)[\s>]/);
  if (!nextTag) break;
  const tagType = nextTag[1];
  const tagStart = pos + nextTag.index;
  
  if (tagType === 'tbl') {
    const endTbl = bodyXml.indexOf('</w:tbl>', tagStart);
    if (endTbl === -1) break;
    const tblXml = bodyXml.slice(tagStart, endTbl + 8);
    pos = endTbl + 8;
    
    const trMatches = tblXml.match(/<w:tr[\s\S]*?<\/w:tr>/g) || [];
    const rows = trMatches.map(tr => {
      const tcMatches = tr.match(/<w:tc[\s\S]*?<\/w:tc>/g) || [];
      return tcMatches.map(tc => extractText(tc).trim());
    });
    
    blocks.push({
      type: 'table',
      rows,
    });
  } else {
    const endP = bodyXml.indexOf('</w:p>', tagStart);
    const nextBracket = bodyXml.indexOf('>', tagStart);
    let pXml = '';
    if (bodyXml[nextBracket - 1] === '/') {
      pXml = bodyXml.slice(tagStart, nextBracket + 1);
      pos = nextBracket + 1;
    } else if (endP !== -1) {
      pXml = bodyXml.slice(tagStart, endP + 6);
      pos = endP + 6;
    } else {
      break;
    }
    
    const styleMatch = pXml.match(/<w:pStyle w:val="([^"]+)"\/>/);
    const style = styleMatch ? styleMatch[1] : null;
    const text = extractText(pXml).trim();
    
    const imgMatches = [...pXml.matchAll(/<a:blip[^>]+r:embed="([^"]+)"/g)];
    const images = imgMatches.map(im => relMap[im[1]]).filter(Boolean);
    
    blocks.push({
      type: 'p',
      style,
      text,
      images,
    });
  }
}

// Group into sections based on headings
console.log(`Parsed total blocks: ${blocks.length}`);

// Let's identify all Heading1, Heading2, Heading3 blocks
const headingBlocks = blocks.filter(b => b.type === 'p' && b.style && b.style.startsWith('Heading'));
console.log(`Total heading blocks: ${headingBlocks.length}`);
headingBlocks.slice(0, 30).forEach(h => {
  console.log(`${h.style}: ${h.text}`);
});
