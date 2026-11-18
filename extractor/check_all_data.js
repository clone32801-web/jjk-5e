const fs = require('fs');

const races = JSON.parse(fs.readFileSync('data/races.json'));
console.log('Races:', races.map(r => `${r.name} (${r.traits.length} traits, ${r.images.length} images)`));

const equip = JSON.parse(fs.readFileSync('data/equipment.json'));
console.log('Equipment:');
console.log(`- Armor rows: ${equip.armor.length}`);
console.log(`- Melee weapons rows: ${equip.weaponsMelee.length}`);
console.log(`- Ranged weapons rows: ${equip.weaponsRanged.length}`);
console.log(`- Cursed Tools: ${equip.cursedTools.length}`);
console.log(`  Sample tools: ${equip.cursedTools.slice(0, 5).map(t => `${t.name} (${t.grade})`).join(', ')}`);

const feats = JSON.parse(fs.readFileSync('data/feats.json'));
console.log('Feats categories:');
for (const [cat, list] of Object.entries(feats)) {
  console.log(`- ${cat}: ${list.length} feats (Sample: ${list.slice(0, 3).map(f => f.name).join(', ')})`);
}

const rules = JSON.parse(fs.readFileSync('data/rules.json'));
console.log('Rules:');
console.log(`- Binding Vows text length: ${rules.bindingVows.text.length}, Misfortune table rows: ${rules.bindingVows.misfortuneTable.length}`);
console.log(`- Domain Expansion text length: ${rules.domainExpansion.text.length}, Refinement table rows: ${rules.domainExpansion.refinementTable.length}`);
console.log(`- Combat tables: Limb damage (${rules.combatAndTables.limbDamageTable.length}), Grading (${rules.combatAndTables.gradingTable.length}), Fall damage (${rules.combatAndTables.fallDamageTable.length}), Soul awareness (${rules.combatAndTables.soulAwarenessTable.length})`);
