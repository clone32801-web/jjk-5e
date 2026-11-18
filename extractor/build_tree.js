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

// Map into sections
let currentH1 = 'Introduction';
let currentH2 = '';
let currentH3 = '';
let currentH4 = '';

const chapters = {};

for (const b of blocks) {
  if (b.type === 'p' && b.style) {
    if (b.style === 'Heading1') {
      currentH1 = b.text || 'Untitled Chapter';
      currentH2 = '';
      currentH3 = '';
      currentH4 = '';
      if (!chapters[currentH1]) chapters[currentH1] = { title: currentH1, sections: {}, blocks: [] };
      continue;
    } else if (b.style === 'Heading2') {
      currentH2 = b.text || 'Untitled Section';
      currentH3 = '';
      currentH4 = '';
      if (!chapters[currentH1]) chapters[currentH1] = { title: currentH1, sections: {}, blocks: [] };
      if (!chapters[currentH1].sections[currentH2]) {
        chapters[currentH1].sections[currentH2] = { title: currentH2, subSections: {}, blocks: [] };
      }
      continue;
    } else if (b.style === 'Heading3') {
      currentH3 = b.text || 'Untitled SubSection';
      currentH4 = '';
      if (!chapters[currentH1]) chapters[currentH1] = { title: currentH1, sections: {}, blocks: [] };
      if (!chapters[currentH1].sections[currentH2]) chapters[currentH1].sections[currentH2] = { title: currentH2, subSections: {}, blocks: [] };
      if (!chapters[currentH1].sections[currentH2].subSections[currentH3]) {
        chapters[currentH1].sections[currentH2].subSections[currentH3] = { title: currentH3, items: {}, blocks: [] };
      }
      continue;
    } else if (b.style === 'Heading4') {
      currentH4 = b.text || 'Untitled Item';
      if (!chapters[currentH1]) chapters[currentH1] = { title: currentH1, sections: {}, blocks: [] };
      if (!chapters[currentH1].sections[currentH2]) chapters[currentH1].sections[currentH2] = { title: currentH2, subSections: {}, blocks: [] };
      if (!chapters[currentH1].sections[currentH2].subSections[currentH3]) chapters[currentH1].sections[currentH2].subSections[currentH3] = { title: currentH3, items: {}, blocks: [] };
      if (!chapters[currentH1].sections[currentH2].subSections[currentH3].items[currentH4]) {
        chapters[currentH1].sections[currentH2].subSections[currentH3].items[currentH4] = { title: currentH4, blocks: [] };
      }
      continue;
    }
  }

  // Put block in lowest open level
  if (!chapters[currentH1]) chapters[currentH1] = { title: currentH1, sections: {}, blocks: [] };
  const ch = chapters[currentH1];
  
  if (currentH2 && ch.sections[currentH2]) {
    const sec = ch.sections[currentH2];
    if (currentH3 && sec.subSections[currentH3]) {
      const sub = sec.subSections[currentH3];
      if (currentH4 && sub.items[currentH4]) {
        sub.items[currentH4].blocks.push(b);
      } else {
        sub.blocks.push(b);
      }
    } else {
      sec.blocks.push(b);
    }
  } else {
    ch.blocks.push(b);
  }
}

console.log('Chapters found:');
for (const [chName, chData] of Object.entries(chapters)) {
  const secNames = Object.keys(chData.sections);
  console.log(`- [${chName}]: ${secNames.length} sections (${secNames.slice(0, 5).join(', ')}${secNames.length > 5 ? '...' : ''})`);
}

// Check Innate Techniques count
const itSection = chapters['Classes']?.sections['Innate Techniques'];
if (itSection) {
  const itNames = Object.keys(itSection.subSections);
  console.log(`Innate Techniques count: ${itNames.length}`);
  console.log(`Techniques: ${itNames.slice(0, 15).join(', ')}...`);
}
