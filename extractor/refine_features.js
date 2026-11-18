const fs = require('fs');

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

// Test with Shrine
const sample1 = 'At 3rd level, you learn how to cleave living targets in one fell swoop. As an action for up to 10 Cursed Energy, you can touch a creature...';
console.log('Sample 1 (Cleave):', parseFeatureDetails(sample1));

const sample2 = 'Beginning at 1st level, you gain the ability to use your manipulation over space to protect yourself effectively. As a bonus action for 1 Cursed Energy, you can encase yourself...';
console.log('Sample 2 (Infinity):', parseFeatureDetails(sample2));
