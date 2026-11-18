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

// Find body
const bodyMatch = xml.match(/<w:body>([\s\S]*?)<\/w:body>/);
if (!bodyMatch) {
  console.error('No body found');
  process.exit(1);
}
const bodyContent = bodyMatch[1];

// Match top-level elements: <w:p>...</w:p> and <w:tbl>...</w:tbl>
const elemRegex = /(<w:p(?:[\s>][\s\S]*?<\/w:p>|\/>)|<w:tbl(?:[\s>][\s\S]*?<\/w:tbl>|\/>))/g;

let elemCount = 0;
let pCount = 0;
let tblCount = 0;
const blocks = [];

let m;
while ((m = elemRegex.exec(bodyContent)) !== null) {
  elemCount++;
  const raw = m[0];
  if (raw.startsWith('<w:p')) {
    pCount++;
    const styleMatch = raw.match(/<w:pStyle w:val="([^"]+)"\/>/);
    const style = styleMatch ? styleMatch[1] : null;
    const text = extractText(raw).trim();
    
    // Images
    const imgMatches = [...raw.matchAll(/<a:blip[^>]+r:embed="([^"]+)"/g)];
    const images = imgMatches.map(im => relMap[im[1]]).filter(Boolean);

    blocks.push({
      type: 'p',
      style,
      text,
      images,
    });
  } else if (raw.startsWith('<w:tbl')) {
    tblCount++;
    const trMatches = raw.match(/<w:tr[\s\S]*?<\/w:tr>/g) || [];
    const rows = trMatches.map(tr => {
      const tcMatches = tr.match(/<w:tc[\s\S]*?<\/w:tc>/g) || [];
      return tcMatches.map(tc => extractText(tc).trim());
    });
    blocks.push({
      type: 'table',
      rows,
    });
  }
}

console.log(`Parsed ${elemCount} elements: ${pCount} paragraphs, ${tblCount} tables, total blocks: ${blocks.length}`);

// Print first 30 blocks with text
const sample = blocks.filter(b => (b.type === 'p' && b.text) || b.type === 'table').slice(0, 30);
console.log('Sample blocks:');
sample.forEach((b, idx) => {
  if (b.type === 'p') {
    console.log(`[${idx}] P (${b.style || 'normal'}): ${b.text.slice(0, 80)}${b.images.length ? ' [Images: ' + b.images.join(',') + ']' : ''}`);
  } else {
    console.log(`[${idx}] TABLE (${b.rows.length} rows): ${b.rows[0] ? b.rows[0].slice(0, 3).join(' | ') : 'empty'}`);
  }
});
