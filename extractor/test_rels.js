const fs = require('fs');

// Check rels
const relsXml = fs.readFileSync('extractor/document.xml.rels', 'utf-8');
const relMatches = relsXml.matchAll(/<Relationship Id="([^"]+)" Type="[^"]*image" Target="([^"]+)"\/>/g);
const relMap = {};
for (const match of relMatches) {
  relMap[match[1]] = match[2]; // e.g. rId10 -> media/image5.png
}
console.log('Image relationships found:', Object.keys(relMap).length);
console.log('Sample relationships:', Object.entries(relMap).slice(0, 5));
