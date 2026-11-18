import fs from 'fs';

const classStats = {
  'juggernaut': {
    hpAt1st: '12 + CON modifier',
    hpHigher: '+7 (or 1d12) + CON modifier per level',
    proficiencies: {
      armor: 'Light armor, medium armor, shields',
      weapons: 'Simple weapons, martial weapons',
      savingThrows: 'Strength, Constitution',
      skills: 'Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival'
    }
  },
  'scout': {
    hpAt1st: '8 + CON modifier',
    hpHigher: '+5 (or 1d8) + CON modifier per level',
    proficiencies: {
      armor: 'Light armor',
      weapons: 'Simple weapons, handguns, longswords, rapiers, and shortswords',
      savingThrows: 'Dexterity, Wisdom',
      skills: 'Choose three from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival'
    }
  },
  'strategist': {
    hpAt1st: '6 + CON modifier',
    hpHigher: '+4 (or 1d6) + CON modifier per level',
    proficiencies: {
      armor: 'None',
      weapons: 'Daggers, darts, slings, quarterstaffs, and handguns',
      savingThrows: 'Intelligence, Wisdom',
      skills: 'Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion'
    }
  },
  'shikigami-user': {
    hpAt1st: '8 + CON modifier',
    hpHigher: '+5 (or 1d8) + CON modifier per level',
    proficiencies: {
      armor: 'Light Armor',
      weapons: 'Daggers, darts, slings, quarterstaffs, and handguns',
      savingThrows: 'Wisdom, Charisma',
      skills: 'Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion'
    }
  },
  'support-specialist': {
    hpAt1st: '6 + CON modifier',
    hpHigher: '+4 (or 1d6) + CON modifier per level',
    proficiencies: {
      armor: 'None',
      weapons: 'Daggers, darts, slings, quarterstaffs, and handguns',
      savingThrows: 'Intelligence, Wisdom',
      skills: 'Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion'
    }
  },
  'warrior': {
    hpAt1st: '10 + CON modifier',
    hpHigher: '+6 (or 1d10) + CON modifier per level',
    proficiencies: {
      armor: 'All armor, shields',
      weapons: 'Simple weapons, martial weapons',
      savingThrows: 'Strength, Dexterity',
      skills: 'Choose two from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival'
    }
  },
  'heavenly-restriction': {
    hpAt1st: '12 + CON modifier',
    hpHigher: '+7 (or 1d12) + CON modifier per level',
    proficiencies: {
      armor: 'None',
      weapons: 'All weapons',
      savingThrows: 'Strength, Constitution',
      skills: 'Choose two from Acrobatics, Athletics, Insight, Intimidation, Perception, Stealth, and Survival'
    }
  }
};

['src/data/classes.json', 'data/classes.json'].forEach(file => {
  if (!fs.existsSync(file)) return;
  const classes = JSON.parse(fs.readFileSync(file, 'utf8'));

  classes.forEach(c => {
    const s = classStats[c.id];
    if (s) {
      c.hpAt1st = s.hpAt1st;
      c.hpHigher = s.hpHigher;
      c.profData = s.proficiencies;
      delete c.hitDice;
    }
  });

  fs.writeFileSync(file, JSON.stringify(classes, null, 2), 'utf8');
  console.log(`Updated clean English stats for ${file}`);
});
