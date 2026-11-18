import fs from 'fs';

const pridefulFeatureNames = ['Sorcerer Hunter', 'Fighter\'s Drive', 'All Things I can Handle', 'You Lost to a Monkey'];
const vengefulFeatureNames = ['Vengeful Fury', 'Bloodlust', 'Immense Anger', 'Follow Your Wrath'];

const bodyImprovementCategories = {
  'strength': {
    id: 'strength',
    name: 'Sức Mạnh (Strength Improvements)',
    tag: 'STR',
    limit: 'Tối đa bằng modifier STR',
    names: ['Superhuman Might', 'Strong Leap', 'Strength Technique', 'Monstrous Might', 'Godly Might', 'Destructive Force']
  },
  'speed': {
    id: 'speed',
    name: 'Tốc Độ & Phản Xạ (Speed Improvements)',
    tag: 'DEX',
    limit: 'Tối đa bằng modifier DEX',
    names: ['Sonic Speed', 'Supersonic Reflexes', 'Sight Speed', 'Lighting Reflexes', 'Light Speed']
  },
  'durability': {
    id: 'durability',
    name: 'Độ Bền & Chống Chịu (Durability Improvements)',
    tag: 'CON',
    limit: 'Tối đa bằng modifier CON',
    names: ['Hardened Skin', 'Iron Skin', 'Adamantine Skin']
  },
  'mind': {
    id: 'mind',
    name: 'Giác Quan & Trực Giác (Sensory Improvements)',
    tag: 'WIS',
    limit: 'Tối đa bằng modifier WIS',
    names: ['Minor Precognition', 'Precognition', 'Major Precognition', 'Minor Enhanced Senses', 'Medium Enhanced Senses', 'Major Enhanced Senses']
  }
};

const allBodyNames = Object.values(bodyImprovementCategories).flatMap(c => c.names);

['src/data/classes.json', 'data/classes.json'].forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  const classes = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const hr = classes.find(c => c.id === 'heavenly-restriction');
  if (!hr) return;

  const allFeatures = hr.features || [];

  // 1. Core Features (Lv 1 - 20)
  const coreFeatures = allFeatures.filter(f => {
    return !pridefulFeatureNames.includes(f.name) &&
           !vengefulFeatureNames.includes(f.name) &&
           !allBodyNames.includes(f.name);
  }).sort((a, b) => (a.level || 0) - (b.level || 0));

  // 2. Ideals
  const pridefulFeatures = allFeatures
    .filter(f => pridefulFeatureNames.includes(f.name))
    .sort((a, b) => (a.level || 0) - (b.level || 0));

  const vengefulFeatures = allFeatures
    .filter(f => vengefulFeatureNames.includes(f.name))
    .sort((a, b) => (a.level || 0) - (b.level || 0));

  const idealsData = {
    title: 'Lý Tưởng (Ideal - Cấp 3)',
    description: 'Tại Cấp 3, do trải nghiệm sống và sự đối xử của giới chú thuật, bạn lựa chọn một Lý tưởng định hình con đường chiến đấu: Kiêu Hãnh (Prideful - phong cách Toji) hoặc Báo Thù (Vengeful - phong cách Maki).',
    subclasses: [
      {
        id: 'prideful',
        name: 'Prideful (Kẻ Kiêu Hãnh)',
        character: 'Toji Fushiguro',
        kanji: '傲',
        color: 'from-amber-600 to-orange-800',
        quote: 'Mày vừa thua một con khỉ thậm chí không có nổi một chút Chú lực đấy.',
        description: 'Lập trường kiêu hãnh khinh miệt giới Chú thuật sư, rèn giũa bản lĩnh thợ săn chuyên nghiệp để bóp nghẹt và đè bẹp những kẻ tự phụ mang dòng máu chú thuật.',
        features: pridefulFeatures
      },
      {
        id: 'vengeful',
        name: 'Vengeful (Kẻ Báo Thù)',
        character: 'Maki Zen\'in',
        kanji: '仇',
        color: 'from-red-600 to-rose-900',
        quote: 'Tao sẽ phá hủy tất cả mọi thứ.',
        description: 'Lấp đầy tâm trí bằng cơn thịnh nộ bùng cháy và khao khát tiêu diệt những kẻ đã đày đọa mình, biến sự căm phẫn tột cùng thành sức mạnh hủy diệt không thể ngăn cản.',
        features: vengefulFeatures
      }
    ]
  };

  // 3. Body Improvements
  const parseCostAndReqs = (f) => {
    const desc = f.description || '';
    const lines = desc.split('\n').filter(Boolean);
    const headerLine = lines[0] || '';
    
    // Extract body points
    const bpMatch = headerLine.match(/(\d+)\s*body\s*points?/i);
    const cost = bpMatch ? `${bpMatch[1]} Body Point${bpMatch[1] > 1 ? 's' : ''}` : '1 Body Point';

    // Extract stat req
    const statMatch = headerLine.match(/(\d+)\s*(Strength|Dexterity|Constitution|Wisdom)/i);
    const statReq = statMatch ? `${statMatch[1]} ${statMatch[2]}` : null;

    // Clean body text (remove the header line)
    const bodyText = lines.slice(1).join('\n\n').trim();

    return {
      name: f.name,
      level: f.level,
      cost,
      statReq,
      description: bodyText || desc
    };
  };

  const categories = Object.values(bodyImprovementCategories).map(cat => {
    const items = allFeatures
      .filter(f => cat.names.includes(f.name))
      .map(parseCostAndReqs)
      .sort((a, b) => (a.level || 0) - (b.level || 0));

    return {
      id: cat.id,
      name: cat.name,
      tag: cat.tag,
      limit: cat.limit,
      items
    };
  });

  const bodyImprovementsData = {
    title: 'Kho Cải Tiến Cơ Thể (Body Improvements List)',
    description: 'Tại Cấp 2, cơ thể bạn không ngừng đột biến và tiến hóa. Bạn nhận được số Điểm Cơ Thể (Body Points) bằng với cấp độ Heavenly Restriction. Các điểm này dùng để mở khóa các nâng cấp thể chất vĩnh viễn không thể thay đổi.',
    categories
  };

  // Attach structured data
  hr.coreFeatures = coreFeatures;
  hr.ideals = idealsData;
  hr.bodyImprovements = bodyImprovementsData;
  
  // Set features to coreFeatures for standard listings
  hr.features = coreFeatures;

  fs.writeFileSync(filePath, JSON.stringify(classes, null, 2), 'utf8');
  console.log(`[${filePath}] Updated Heavenly Restriction structure successfully!`);
});
