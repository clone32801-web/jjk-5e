import fs from 'fs';

const featureLevels = {
  'juggernaut': {
    'Equipment': 1,
    'Innate Technique': 1,
    'Combat Prowess': 1,
    'Unarmored Defense': 1,
    'Focus': 2,
    'Reckless Blows': 2,
    'Ability Score Improvement': 4,
    'Extra Attack': 5,
    'Pursuer': 5,
    'Honed Instincts': 7,
    'Brutal Blows': 9,
    'Lock In': 10,
    'Curse Resistance': 14,
    'Endless Focus': 15,
    'Unstoppable': 20
  },
  'scout': {
    'Equipment': 1,
    'Innate Technique': 1,
    'Quick Strikes': 1,
    'Unparalleled Movement': 1,
    'Swift Movement': 2,
    'Sharp Eyes': 2,
    'Ability Score Improvement': 4,
    'Eagle Eyes': 5,
    'Extra Attack': 5,
    'Evasion': 7,
    'Tactical Retreat': 10,
    'Scanning Eyes': 13,
    'Sixth Sense': 14,
    'Swift Dodge': 17,
    'Unfathomable Speed': 20
  },
  'strategist': {
    'Equipment': 1,
    'Innate Technique': 1,
    'Quick Recovery': 1,
    'Technique Creativity': 2,
    'Ability Score Improvement': 4,
    'Sorcerous Restoration': 15,
    'Signature Move': 20
  },
  'shikigami-user': {
    'Equipment': 1,
    'Innate Technique': 1,
    'Shikigami Companion': 1,
    'Martial Arts': 1,
    'Shared Technique': 2,
    'Ability Score Improvement': 4,
    'Coordinated Blow': 5,
    'Shikigami Improvement': 7,
    'United Front': 10,
    'Advanced Shikigami': 13,
    'Swift Escape': 17,
    'Perfected Bond': 20
  },
  'support-specialist': {
    'Equipment': 1,
    'Innate Technique': 1,
    'Curtain': 1,
    'Barrier Technique': 2,
    'Ability Score Improvement': 4,
    'Reverse Cursed Technique': 5,
    'Reverse Technique Understanding': 10,
    'Mastered Reverse Technique': 17,
    'Permanent Techniques': 20
  },
  'warrior': {
    'Equipment': 1,
    'Innate Technique': 1,
    'Combat Prowess': 1,
    'Unarmored Defense': 1,
    'Undaunted': 2,
    'Ability Score Improvement': 4,
    'Extra Attack': 5,
    'Battle Readiness': 7,
    'Unstoppable': 9,
    'Steel Spirit': 14,
    'Unerring Blows': 15
  },
  'heavenly-restriction': {
    'Equipment': 1,
    'Restrained Body': 1,
    'Unarmored Movement': 1,
    'Martial Arts': 1,
    'Body Improvements': 2,
    'Fighting Style': 2,
    'Ideal': 3,
    'Ability Score Improvement': 4,
    'Extra Attack': 5,
    'Improved Body': 7,
    'Resistant': 7,
    'Weapon Specialist': 9,
    'Celestial Body': 10,
    'Improved Fighting Style': 14,
    'Demigod\'s Figure': 15,
    'God of War': 20,
    'Sorcerer Hunter': 3,
    'Fighter\'s Drive': 9,
    'All Things I can Handle': 13,
    'You Lost to a Monkey': 17,
    'Vengeful Fury': 3,
    'Bloodlust': 9,
    'Immense Anger': 13,
    'Follow Your Wrath': 17,
    'Superhuman Might': 2,
    'Monstrous Might': 9,
    'Godly Might': 17,
    'Destructive Force': 20,
    'Strong Leap': 2,
    'Strength Technique': 2,
    'Sonic Speed': 2,
    'Sight Speed': 9,
    'Light Speed': 17,
    'Supersonic Reflexes': 2,
    'Lighting Reflexes': 9,
    'Hardened Skin': 2,
    'Iron Skin': 9,
    'Adamantine Skin': 17,
    'Minor Precognition': 2,
    'Precognition': 9,
    'Major Precognition': 17,
    'Minor Enhanced Senses': 2,
    'Medium Enhanced Senses': 9,
    'Major Enhanced Senses': 17
  }
};

const invalidFeatureNames = ['Tools: None', 'Saving Throws: Intelligence, Wisdom', 'Saving Throws: Wisdom, Charisma'];

['src/data/classes.json', 'data/classes.json'].forEach(file => {
  if (!fs.existsSync(file)) return;
  const classes = JSON.parse(fs.readFileSync(file, 'utf8'));

  classes.forEach(c => {
    const classMap = featureLevels[c.id] || {};
    
    // Filter out invalid items
    c.features = c.features.filter(f => !invalidFeatureNames.includes(f.name.trim()));

    // Assign level
    c.features.forEach(f => {
      const trimmed = f.name.trim();
      if (classMap[trimmed] !== undefined) {
        f.level = classMap[trimmed];
      } else {
        // Fallback detection from description
        const match = (f.description || '').match(/(?:starting at|at|beginning at|by|reach|when you reach|finally at)\s+(\d+)(?:st|nd|rd|th)\s+level/i) ||
                      (f.description || '').match(/(\d+)(?:st|nd|rd|th)\s+level/i);
        f.level = match ? parseInt(match[1]) : 1;
      }
    });

    // Sort features by level
    c.features.sort((a, b) => (a.level || 0) - (b.level || 0));
    console.log(`Updated ${c.name}: ${c.features.length} features, all with levels!`);
  });

  fs.writeFileSync(file, JSON.stringify(classes, null, 2), 'utf8');
});
