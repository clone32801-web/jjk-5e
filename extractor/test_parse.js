const fs = require('fs');

const xml = fs.readFileSync('extractor/document.xml', 'utf-8');
console.log('XML read successfully, length:', xml.length);

// Let's inspect unique paragraph styles
const styleMatches = xml.matchAll(/<w:pStyle w:val="([^"]+)"\/>/g);
const styles = {};
for (const match of styleMatches) {
  styles[match[1]] = (styles[match[1]] || 0) + 1;
}
console.log('Paragraph styles found:');
console.log(styles);
