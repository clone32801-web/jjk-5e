const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Loading document.xml...');
const xml = fs.readFileSync(path.join(__dirname, 'document.xml'), 'utf-8');

console.log('Loading rels...');
const relsXml = fs.readFileSync(path.join(__dirname, 'document.xml.rels'), 'utf-8');
const relMatches = relsXml.matchAll(/<Relationship Id="([^"]+)" Type="[^"]*image" Target="([^"]+)"\/>/g);
const relMap = {};
for (const match of relMatches) {
  relMap[match[1]] = match[2].replace(/^media\//, '');
}

function extractText(str) {
  const matches = str.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
  return matches.map(m => m.replace(/<[^>]+>/g, '')).join('');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function parseFeatureDetails(text) {
  let level = null;
  const levelMatch = text.match(/(?:starting at|at|beginning at|finally, at|at last at)\s+(\d+)(?:st|nd|rd|th)\s+level/i);
  if (levelMatch) {
    level = parseInt(levelMatch[1], 10);
  }

  let action = null;
  const actionMatch = text.match(/\bas\s+(?:an?|a)\s+(action|bonus action|reaction|free action|full-turn action|full turn action)/i);
  if (actionMatch) {
    action = actionMatch[1].replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  let cost = null;
  const costMatch = text.match(/(?:for|costing|spend|spends)\s+((?:up to\s+)?[0-9]+(?:\s*(?:to|-)\s*[0-9]+)?\s*(?:CE|Cursed Energy)|(?:CE|Cursed Energy)\s+up to\s+[^.,;\n]+)/i);
  if (costMatch) {
    cost = costMatch[1].trim();
  }

  return { level, action, cost };
}

console.log('Tokenizing document elements...');
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
    const isBold = pXml.includes('<w:b/>') || pXml.includes('<w:b ');
    
    const imgMatches = [...pXml.matchAll(/<a:blip[^>]+r:embed="([^"]+)"/g)];
    const images = imgMatches.map(im => relMap[im[1]]).filter(Boolean);
    
    blocks.push({
      type: 'p',
      style,
      text,
      isBold,
      images,
    });
  }
}
console.log(`Parsed ${blocks.length} blocks.`);

// ==========================================
// 1. EXTRACT INNATE TECHNIQUE FEATS
// ==========================================
const techniqueFeatsMap = {};
let inITFeats = false;
let currentITFeatTech = '';
let currentFeatObj = null;

for (let i = 0; i < blocks.length; i++) {
  const b = blocks[i];
  if (b.type === 'p' && b.style === 'Heading3' && b.text === 'Innate Technique Feats') {
    inITFeats = true;
    continue;
  }
  if (inITFeats) {
    if (b.type === 'p' && (b.style === 'Heading1' || b.style === 'Heading2')) {
      inITFeats = false;
      if (currentFeatObj && currentITFeatTech) {
        if (!techniqueFeatsMap[currentITFeatTech]) techniqueFeatsMap[currentITFeatTech] = [];
        techniqueFeatsMap[currentITFeatTech].push(currentFeatObj);
        currentFeatObj = null;
        currentITFeatTech = null;
      }
      break;
    }
    if (b.type === 'p' && b.style === 'Heading4' && b.text) {
      if (currentFeatObj && currentITFeatTech) {
        if (!techniqueFeatsMap[currentITFeatTech]) techniqueFeatsMap[currentITFeatTech] = [];
        techniqueFeatsMap[currentITFeatTech].push(currentFeatObj);
      }
      currentITFeatTech = b.text.trim();
      currentFeatObj = null;
      continue;
    }
    if (currentITFeatTech && b.type === 'p' && b.text) {
      if (b.text.toLowerCase().startsWith('prerequisite') || b.text.toLowerCase().startsWith('prerequisites:')) {
        if (currentFeatObj) {
          currentFeatObj.prerequisite = b.text;
        }
      } else if (!currentFeatObj || (currentFeatObj.description && b.isBold && b.text.length < 60)) {
        if (currentFeatObj) {
          if (!techniqueFeatsMap[currentITFeatTech]) techniqueFeatsMap[currentITFeatTech] = [];
          techniqueFeatsMap[currentITFeatTech].push(currentFeatObj);
        }
        currentFeatObj = {
          name: b.text,
          prerequisite: '',
          description: '',
        };
      } else {
        if (currentFeatObj) {
          currentFeatObj.description = (currentFeatObj.description ? currentFeatObj.description + '\n\n' : '') + b.text;
        } else {
          currentFeatObj = {
            name: b.text,
            prerequisite: '',
            description: '',
          };
        }
      }
    }
  }
}
if (currentFeatObj && currentITFeatTech) {
  if (!techniqueFeatsMap[currentITFeatTech]) techniqueFeatsMap[currentITFeatTech] = [];
  techniqueFeatsMap[currentITFeatTech].push(currentFeatObj);
}
console.log(`Extracted feats for ${Object.keys(techniqueFeatsMap).length} Innate Techniques.`);

// ==========================================
// 2. EXTRACT INNATE TECHNIQUES WITH REFINED FEATURES
// ==========================================
const techniques = [];
let inIT = false;
let currentTech = null;
let currentFeature = null;

for (let i = 0; i < blocks.length; i++) {
  const b = blocks[i];
  if (b.type === 'p' && b.style === 'Heading2' && b.text === 'Innate Techniques') {
    inIT = true;
    continue;
  }
  if (inIT) {
    if (b.type === 'p' && b.style === 'Heading2' && b.text === 'Heavenly Restriction') {
      if (currentFeature && currentTech) currentTech.features.push(currentFeature);
      if (currentTech) techniques.push(currentTech);
      currentFeature = null;
      currentTech = null;
      inIT = false;
      break;
    }
    if (b.type === 'p' && b.style === 'Heading3' && b.text) {
      if (currentFeature && currentTech) currentTech.features.push(currentFeature);
      if (currentTech) techniques.push(currentTech);
      currentFeature = null;
      currentTech = {
        id: slugify(b.text),
        name: b.text.trim(),
        description: '',
        images: [...b.images],
        features: [],
        tables: [],
        domain: null,
        feats: techniqueFeatsMap[b.text.trim()] || [],
      };
      continue;
    }
    if (currentTech) {
      if (b.images && b.images.length) {
        currentTech.images.push(...b.images);
      }
      if (b.type === 'table') {
        currentTech.tables.push(b.rows);
      } else if (b.type === 'p' && b.text) {
        // Is this a feature title?
        // Heading4, or short bold title, or starts with 'Domain Expansion'
        const isDomain = b.text.toLowerCase().startsWith('domain expansion');
        const isTitle = (b.isBold && b.text.length < 55 && !b.text.endsWith('.')) || isDomain || b.style === 'Heading4';

        if (isTitle) {
          if (currentFeature) {
            currentTech.features.push(currentFeature);
          }
          currentFeature = {
            name: b.text.trim(),
            level: null,
            action: null,
            cost: null,
            description: '',
          };
          if (isDomain) {
            currentFeature.level = 18;
          }
        } else {
          if (currentFeature) {
            currentFeature.description = (currentFeature.description ? currentFeature.description + '\n\n' : '') + b.text;
            // Parse details if not set
            const details = parseFeatureDetails(b.text);
            if (!currentFeature.level && details.level) currentFeature.level = details.level;
            if (!currentFeature.action && details.action) currentFeature.action = details.action;
            if (!currentFeature.cost && details.cost) currentFeature.cost = details.cost;
          } else {
            currentTech.description = (currentTech.description ? currentTech.description + '\n\n' : '') + b.text;
          }
        }
      }
    }
  }
}
if (currentFeature && currentTech) currentTech.features.push(currentFeature);
if (currentTech) techniques.push(currentTech);

// Post-process domain property & clean features
techniques.forEach(t => {
  t.images = [...new Set(t.images)];
  const domainFeat = t.features.find(f => f.name.toLowerCase().startsWith('domain expansion'));
  if (domainFeat) {
    t.domain = {
      name: domainFeat.name,
      description: domainFeat.description,
      cost: domainFeat.cost || '20 Cursed Energy',
    };
  }
});

console.log(`Extracted ${techniques.length} Innate Techniques with refined features.`);
fs.writeFileSync(path.join(outDir, 'techniques.json'), JSON.stringify(techniques, null, 2));

// ==========================================
// 3. EXTRACT CLASSES (Including Heavenly Restriction)
// ==========================================
const classNames = ['Juggernaut', 'Scout', 'Strategist', 'Shikigami User', 'Support Specialist', 'Warrior', 'Heavenly Restriction'];
const classesData = [];

for (const cName of classNames) {
  let inClass = false;
  let classObj = {
    id: slugify(cName),
    name: cName,
    description: '',
    hitDice: '',
    proficienciesText: '',
    table: [],
    features: [],
    images: [],
  };
  let curClassFeature = null;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === 'p' && b.style === 'Heading2' && b.text === cName) {
      inClass = true;
      continue;
    }
    if (inClass) {
      if (b.type === 'p' && (b.style === 'Heading1' || b.style === 'Heading2')) {
        break;
      }
      if (b.images && b.images.length) classObj.images.push(...b.images);
      
      if (b.type === 'table') {
        if (!classObj.table.length) classObj.table = b.rows;
      } else if (b.type === 'p' && b.text) {
        if (b.text.startsWith('Hit Points') || b.text.startsWith('Hit Dice:')) {
          classObj.hitDice = b.text;
        } else if (b.text.startsWith('Proficiencies') || b.text.startsWith('Armor:')) {
          classObj.proficienciesText = (classObj.proficienciesText ? classObj.proficienciesText + '\n' : '') + b.text;
        } else if (b.isBold && b.text.length < 55 && !b.text.endsWith('.')) {
          if (curClassFeature) classObj.features.push(curClassFeature);
          curClassFeature = {
            name: b.text.trim(),
            description: '',
          };
        } else {
          if (curClassFeature) {
            curClassFeature.description = (curClassFeature.description ? curClassFeature.description + '\n\n' : '') + b.text;
          } else {
            classObj.description = (classObj.description ? classObj.description + '\n\n' : '') + b.text;
          }
        }
      }
    }
  }
  if (curClassFeature) classObj.features.push(curClassFeature);
  classObj.images = [...new Set(classObj.images)];
  classesData.push(classObj);
}
console.log(`Extracted ${classesData.length} Classes.`);
fs.writeFileSync(path.join(outDir, 'classes.json'), JSON.stringify(classesData, null, 2));

// ==========================================
// 4. EXTRACT RACES
// ==========================================
const raceSectionNames = ['Human Races', 'Cursed Vessel', 'Cursed Corpses', 'Cursed Spirits'];
const racesData = [];

for (const rName of raceSectionNames) {
  let inRace = false;
  let raceObj = {
    id: slugify(rName),
    name: rName,
    description: '',
    traits: [],
    images: [],
  };
  let curTrait = null;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === 'p' && b.style === 'Heading2' && b.text === rName) {
      inRace = true;
      continue;
    }
    if (inRace) {
      if (b.type === 'p' && (b.style === 'Heading1' || b.style === 'Heading2')) {
        break;
      }
      if (b.images && b.images.length) raceObj.images.push(...b.images);
      
      if (b.type === 'p' && b.text) {
        if (b.isBold && b.text.length < 55 && !b.text.endsWith('.')) {
          if (curTrait) raceObj.traits.push(curTrait);
          curTrait = {
            name: b.text.trim(),
            description: '',
          };
        } else {
          if (curTrait) {
            curTrait.description = (curTrait.description ? curTrait.description + '\n\n' : '') + b.text;
          } else {
            raceObj.description = (raceObj.description ? raceObj.description + '\n\n' : '') + b.text;
          }
        }
      }
    }
  }
  if (curTrait) raceObj.traits.push(curTrait);
  raceObj.images = [...new Set(raceObj.images)];
  racesData.push(raceObj);
}
console.log(`Extracted ${racesData.length} Races.`);
fs.writeFileSync(path.join(outDir, 'races.json'), JSON.stringify(racesData, null, 2));

// ==========================================
// 5. EXTRACT EQUIPMENT & CURSED TOOLS
// ==========================================
const equipmentData = {
  wealth: '',
  armor: [],
  weaponsMelee: [],
  weaponsRanged: [],
  cursedTools: [],
};

let inEquip = false;
let currentEquipSec = '';
let currentToolGrade = '';
let currentTool = null;

for (let i = 0; i < blocks.length; i++) {
  const b = blocks[i];
  if (b.type === 'p' && b.style === 'Heading1' && b.text === 'Equipment') {
    inEquip = true;
    continue;
  }
  if (inEquip) {
    if (b.type === 'p' && b.style === 'Heading1') {
      if (currentTool) equipmentData.cursedTools.push(currentTool);
      inEquip = false;
      break;
    }
    if (b.type === 'p' && b.style === 'Heading2') {
      currentEquipSec = b.text.trim();
      continue;
    }
    if (b.type === 'p' && b.style === 'Heading3' && b.text.includes('Grade Tools')) {
      if (currentTool) equipmentData.cursedTools.push(currentTool);
      currentTool = null;
      currentToolGrade = b.text.trim();
      continue;
    }
    
    if (b.type === 'table') {
      if (currentEquipSec.includes('Armor')) {
        equipmentData.armor = b.rows;
      } else if (currentEquipSec.includes('Weapons')) {
        if (!equipmentData.weaponsMelee.length) equipmentData.weaponsMelee = b.rows;
        else equipmentData.weaponsRanged = b.rows;
      }
    } else if (b.type === 'p' && b.text) {
      if (currentToolGrade) {
        if (b.isBold && b.text.length < 55 && !b.text.endsWith('.')) {
          if (currentTool) equipmentData.cursedTools.push(currentTool);
          currentTool = {
            name: b.text.trim(),
            grade: currentToolGrade,
            description: '',
            images: [...b.images],
          };
        } else if (currentTool) {
          currentTool.description = (currentTool.description ? currentTool.description + '\n\n' : '') + b.text;
          if (b.images && b.images.length) currentTool.images.push(...b.images);
        }
      } else if (currentEquipSec.includes('Wealth')) {
        equipmentData.wealth = (equipmentData.wealth ? equipmentData.wealth + '\n\n' : '') + b.text;
      }
    }
  }
}
if (currentTool) equipmentData.cursedTools.push(currentTool);
equipmentData.cursedTools.forEach(ct => {
  ct.images = [...new Set(ct.images)];
});
console.log(`Extracted Equipment tables and ${equipmentData.cursedTools.length} Cursed Tools.`);
fs.writeFileSync(path.join(outDir, 'equipment.json'), JSON.stringify(equipmentData, null, 2));

// ==========================================
// 6. EXTRACT FEATS
// ==========================================
const featsCategories = ['Barrier Feats', 'Cursed Energy Feats', 'Physical Feats', 'Reverse Cursed Technique Feats', 'Skill Feats'];
const featsData = {};

for (const fCat of featsCategories) {
  featsData[fCat] = [];
  let inCat = false;
  let curFeat = null;
  
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === 'p' && b.style === 'Heading3' && b.text === fCat) {
      inCat = true;
      continue;
    }
    if (inCat) {
      if (b.type === 'p' && (b.style === 'Heading1' || b.style === 'Heading2' || b.style === 'Heading3')) {
        if (curFeat) featsData[fCat].push(curFeat);
        break;
      }
      if (b.type === 'p' && b.text) {
        if (b.isBold && b.text.length < 55 && !b.text.endsWith('.')) {
          if (curFeat) featsData[fCat].push(curFeat);
          curFeat = {
            name: b.text.trim(),
            prerequisite: '',
            description: '',
            images: [...b.images],
          };
        } else if (curFeat) {
          if (b.text.toLowerCase().startsWith('prerequisite')) {
            curFeat.prerequisite = b.text;
          } else {
            curFeat.description = (curFeat.description ? curFeat.description + '\n\n' : '') + b.text;
          }
          if (b.images && b.images.length) curFeat.images.push(...b.images);
        }
      }
    }
  }
  if (curFeat) featsData[fCat].push(curFeat);
  featsData[fCat].forEach(f => {
    f.images = [...new Set(f.images)];
  });
}
console.log(`Extracted Generic Feats: ${Object.keys(featsData).map(k => `${k}: ${featsData[k].length}`).join(', ')}.`);
fs.writeFileSync(path.join(outDir, 'feats.json'), JSON.stringify(featsData, null, 2));

// ==========================================
// 7. EXTRACT RULES & INTRICACIES OF SORCERY
// ==========================================
const rulesData = {
  cursedEnergy: { title: 'Cursed Energy Fundamentals', text: '', tables: [] },
  bindingVows: { title: 'Binding Vows & Pacts', text: '', misfortuneTable: [] },
  breakthroughs: { title: 'Breakthroughs (Black Flash & RCT)', text: '' },
  domainExpansion: { title: 'Domain Expansion & Refinement', text: '', refinementTable: [], clashTable: [] },
  combatAndTables: { title: 'Combat Systems & Reference Tables', limbDamageTable: [], gradingTable: [], fallDamageTable: [], soulAwarenessTable: [], text: '' },
};

let inSorcery = false;
let currentSorcerySec = '';

for (let i = 0; i < blocks.length; i++) {
  const b = blocks[i];
  if (b.type === 'p' && b.style === 'Heading1' && b.text.includes('Intricacies of Sorcery')) {
    inSorcery = true;
    continue;
  }
  if (inSorcery) {
    if (b.type === 'p' && b.style === 'Heading1') {
      inSorcery = false;
      break;
    }
    if (b.type === 'p' && b.style === 'Heading2') {
      currentSorcerySec = b.text.trim();
      continue;
    }
    if (b.type === 'table') {
      const header = b.rows[0] ? b.rows[0].join(' ') : '';
      if (header.includes('Refinement')) {
        rulesData.domainExpansion.refinementTable = b.rows;
      } else if (header.includes('Misfortune')) {
        rulesData.bindingVows.misfortuneTable = b.rows;
      } else if (header.includes('Limb') || header.includes('Body Part')) {
        rulesData.combatAndTables.limbDamageTable = b.rows;
      } else if (header.includes('Soul Ability')) {
        rulesData.combatAndTables.soulAwarenessTable = b.rows;
      } else if (header.includes('Fall Damage')) {
        rulesData.combatAndTables.fallDamageTable = b.rows;
      } else if (header.includes('CR Range') || header.includes('Benchmark')) {
        rulesData.combatAndTables.gradingTable = b.rows;
      } else if (header.includes('Rounds Needed')) {
        rulesData.domainExpansion.clashTable = b.rows;
      }
    } else if (b.type === 'p' && b.text) {
      if (currentSorcerySec.includes('Binding Vow')) {
        rulesData.bindingVows.text += '\n\n' + b.text;
      } else if (currentSorcerySec.includes('Domain Expansion')) {
        rulesData.domainExpansion.text += '\n\n' + b.text;
      } else if (currentSorcerySec.includes('Breakthrough')) {
        rulesData.breakthroughs.text += '\n\n' + b.text;
      } else if (currentSorcerySec.includes('Cursed Energy')) {
        rulesData.cursedEnergy.text += '\n\n' + b.text;
      } else {
        rulesData.combatAndTables.text += '\n\n' + b.text;
      }
    }
  }
}
console.log('Extracted Rules and Intricacies of Sorcery.');
fs.writeFileSync(path.join(outDir, 'rules.json'), JSON.stringify(rulesData, null, 2));

console.log('=== DATA EXTRACTION COMPLETE AND REFINED ===');
