const fs = require('fs');

const xml = fs.readFileSync('extractor/document.xml', 'utf-8');

// Count tables
const tableMatches = xml.match(/<w:tbl[\s>]/g) || [];
console.log('Total tables found:', tableMatches.length);

// Let's inspect paragraphs and tables in order
// We can parse the document sequentially!
