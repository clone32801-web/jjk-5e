const fs = require('fs');

const xml = fs.readFileSync('extractor/document.xml', 'utf-8');

// Function to extract text from an xml snippet
function extractText(str) {
  const matches = str.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
  return matches.map(m => m.replace(/<[^>]+>/g, '')).join('');
}

// Find tables
const tblRegex = /<w:tbl[\s\S]*?<\/w:tbl>/g;
let match;
let count = 0;
while ((match = tblRegex.exec(xml)) !== null) {
  count++;
  const tblXml = match[0];
  const trMatches = tblXml.match(/<w:tr[\s\S]*?<\/w:tr>/g) || [];
  const rows = trMatches.map(tr => {
    const tcMatches = tr.match(/<w:tc[\s\S]*?<\/w:tc>/g) || [];
    return tcMatches.map(tc => extractText(tc).trim()).filter(Boolean);
  });
  console.log(`Table ${count}: ${rows.length} rows. Header: [${rows[0] ? rows[0].join(' | ') : 'empty'}]`);
}
