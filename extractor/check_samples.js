const fs = require('fs');

const techs = JSON.parse(fs.readFileSync('data/techniques.json'));
const list = ['Shrine', 'Ten Shadows', 'Idle Transfiguration', 'Boogie Woogie', 'Ratio'];

list.forEach(name => {
  const t = techs.find(x => x.name.toLowerCase() === name.toLowerCase());
  if (t) {
    console.log('=== ' + t.name + ' ===');
    console.log('Feats:', t.feats.map(f => f.name));
    console.log('Images:', t.images);
    console.log('Tables:', t.tables.length);
  }
});
