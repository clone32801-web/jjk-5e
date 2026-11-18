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

// Tokenize top-level body children
const bodyStart = xml.indexOf('<w:body>');
const bodyEnd = xml.indexOf('</w:body>');
const bodyXml = xml.slice(bodyStart + 8, bodyEnd);

let pos = 0;
const blocks = [];

while (pos < bodyXml.length) {
  const nextP = bodyXml.indexOf('<w:p', pos);
  const nextTbl = bodyXml.indexOf('<w:tbl', pos);
  
  if (nextP === -1 && nextTbl === -1) break;
  
  if (nextTbl !== -1 && (nextP === -1 || nextTbl < nextP)) {
    // We are at a table
    // Find matching </w:tbl> accounting for nested <w:tbl>
    let depth = 1;
    let scanPos = nextTbl + 6;
    while (depth > 0 && scanPos < bodyXml.length) {
      const openIdx = bodyXml.indexOf('<w:tbl', scanPos);
      const closeIdx = bodyXml.indexOf('</w:tbl>', scanPos);
      
      if (closeIdx === -1) break;
      
      if (openIdx !== -1 && openIdx < closeIdx) {
        depth++;
        scanPos = openIdx + 6;
      } else {
        depth--;
        scanPos = closeIdx + 8;
      }
    }
    
    const tblXml = bodyXml.slice(nextTbl, scanPos);
    pos = scanPos;
    
    // Parse table rows
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
    // We are at a paragraph
    const pEnd = bodyXml.indexOf('</w:p>', nextP);
    if (pEnd === -1) break;
    const pXml = bodyXml.slice(nextP, pEnd + 6);
    pos = pEnd + 6;
    
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
      rawXml: pXml,
    });
  }
}

const tblBlocks = blocks.filter(b => b.type === 'table');
const pBlocks = blocks.filter(b => b.type === 'p');
console.log(`Total blocks: ${blocks.length}. Paragraphs: ${pBlocks.length}, Tables: ${tblBlocks.length}`);
