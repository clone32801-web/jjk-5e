import fs from 'fs';

const xml = fs.readFileSync('extractor/document.xml', 'utf8');
const rels = fs.readFileSync('extractor/document.xml.rels', 'utf8');

const relMap = {};
const relRegex = /Id="([^"]+)"[\s\S]*?Target="([^"]+)"/g;
let m;
while ((m = relRegex.exec(rels)) !== null) {
  relMap[m[1]] = m[2].replace('media/', '');
}

const targets = [
  'Disaster Vermin',
  'Esoteric Art',
  'Love Rendezvous',
  'Moon Dregs',
  'Rot',
  'Schrift X',
  'Star Dictator',
  'Tool Manipulation',
  'Centipede Shroud'
];

targets.forEach(target => {
  const p = xml.indexOf('>' + target + '<');
  if (p === -1) {
    console.log(target, 'not found');
    return;
  }
  const nextH3 = xml.indexOf('<w:pStyle w:val="Heading3"', p + target.length + 50);
  const section = xml.substring(p, nextH3 !== -1 ? nextH3 : p + 50000);
  const blipRegex = /<a:blip[^>]+r:embed="([^"]+)"/g;
  const imgs = [];
  let bm;
  while ((bm = blipRegex.exec(section)) !== null) {
    const imgName = relMap[bm[1]];
    if (imgName && !imgs.includes(imgName)) {
      imgs.push(imgName);
    }
  }
  console.log(`${target} -> ${JSON.stringify(imgs)}`);
});
