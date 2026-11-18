const fs = require('fs');

const classes = JSON.parse(fs.readFileSync('data/classes.json'));
classes.forEach(c => {
  console.log(`Class: ${c.name} (${c.id})`);
  console.log(`  HitDice: ${c.hitDice}`);
  console.log(`  Table rows: ${c.table.length}`);
  console.log(`  Features count: ${c.features.length}`);
  console.log(`  Features sample: ${c.features.slice(0, 4).map(f => f.name).join(', ')}`);
});
