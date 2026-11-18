const fs = require('fs');

const techs = JSON.parse(fs.readFileSync('data/techniques.json'));
const shrine = techs.find(x => x.name === 'Shrine');

console.log('Shrine description:', shrine.description);
console.log('Shrine features count:', shrine.features.length);
shrine.features.forEach((f, i) => {
  console.log(`[Feature ${i}] Name: "${f.name}", Level: ${f.level}, Action: ${f.action}, Cost: ${f.cost}`);
  console.log(`  Description snippet: ${(f.description || '').slice(0, 100)}...`);
});
console.log('Domain:', shrine.domain);
console.log('Feats:', shrine.feats.map(x => x.name));
