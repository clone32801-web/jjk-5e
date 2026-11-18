import fs from 'fs';

const ceFormulas = {
  'juggernaut': 'Cấp độ + CE modifier',
  'scout': 'Cấp độ + CE modifier',
  'strategist': '2x Cấp độ + CE modifier (Bể CE lớn nhất)',
  'shikigami-user': 'Cấp độ + CE modifier',
  'support-specialist': 'Cấp độ + CE modifier + Proficiency Bonus',
  'warrior': 'Cấp độ + CE modifier',
  'heavenly-restriction': '0 CE (Tuyệt đối không có Chú lực)'
};

const hitDiceLabels = {
  'juggernaut': 'd12 (Thể lực Đấu Sĩ Tank)',
  'scout': 'd8 (Cơ Động & Tốc Độ)',
  'strategist': 'd6 (Pháp Đài Chú Thuật)',
  'shikigami-user': 'd8 (Thức Thần Sư)',
  'support-specialist': 'd6 (Kết Giới Sư)',
  'warrior': 'd10 (Võ Sĩ Chú Cụ)',
  'heavenly-restriction': 'd12 (Thể Chất Quái Vật)'
};

// Strategist 10 Metamagic options
const strategistCreativities = [
  {
    name: 'Careful Technique (Chú Thuật Thận Trọng)',
    cost: '1 Cursed Energy',
    description: 'Khi thi triển thuật thức buộc sinh vật khác phải tung xúc xắc Cứu nguy (Saving Throw), bạn có thể chi 1 CE để chọn số đồng minh tối đa bằng CE modifier tự động thành công và không nhận sát thương.'
  },
  {
    name: 'Distant Technique (Chú Thuật Viễn Cự)',
    cost: '1 Cursed Energy',
    description: 'Nhân đôi tầm bắn của thuật thức (từ 5ft trở lên), hoặc biến thuật thức tầm chạm (Touch) thành tầm bắn xa 30 feet.'
  },
  {
    name: 'Empowered Technique (Cường Hóa Uy Lực)',
    cost: '1 Cursed Energy',
    description: 'Khi gieo xúc xắc sát thương cho thuật thức, chi 1 CE để gieo lại số lượng xúc xắc tối đa bằng CE modifier và lấy kết quả mới. Có thể dùng đồng thời với tùy chọn Biến hóa khác.'
  },
  {
    name: 'Extended Technique (Kéo Dài Hiệu Lực)',
    cost: '1 Cursed Energy',
    description: 'Khi thi triển thuật thức có thời lượng từ 1 phút trở lên, chi 1 CE để nhân đôi thời lượng duy trì (tối đa 24 giờ).'
  },
  {
    name: 'Heightened Technique (Gia Tăng Áp Chế)',
    cost: '3 Cursed Energy',
    description: 'Chi 3 CE để khiến 1 mục tiêu phải chịu Disadvantage (bất lợi) trong lần tung xúc xắc Cứu nguy đầu tiên chống lại thuật thức.'
  },
  {
    name: 'Quickened Technique (Thần Tốc Niệm)',
    cost: '2 Cursed Energy',
    description: 'Biến thời gian thi triển của thuật thức từ 1 Action thành 1 Bonus Action.'
  },
  {
    name: 'Seeking Technique (Chú Thuật Truy Tìm)',
    cost: '2 Cursed Energy',
    description: 'Nếu bạn tấn công bằng thuật thức mà bị trượt (Miss), chi 2 CE để gieo lại d20 và lấy kết quả mới. Có thể kết hợp với tùy chọn Biến hóa khác.'
  },
  {
    name: 'Subtle Technique (Chú Thuật Vô Thanh)',
    cost: '1 Cursed Energy',
    description: 'Chi 1 CE để thi triển thuật thức mà không cần thực hiện thủ ấn (Somatic) hay niệm chú khẩu ngữ (Verbal).'
  },
  {
    name: 'Transmuted Technique (Chuyển Hóa Thuộc Tính)',
    cost: '1 Cursed Energy',
    description: 'Chi 1 CE để đổi loại sát thương của thuật thức sang một trong các hệ: Axít (Acid), Băng (Cold), Hỏa (Fire), Lôi (Lightning), Độc (Poison), hoặc Sấm (Thunder).'
  },
  {
    name: 'Twinned Technique (Song Sinh Thuật Thức)',
    cost: 'Bằng CE gốc của chiêu',
    description: 'Khi thi triển thuật thức đơn mục tiêu, chi thêm lượng CE bằng với chi phí gốc để bắn thêm vào mục tiêu thứ 2 trong tầm bắn.'
  }
];

const featureMeta = {
  // Juggernaut
  'Focus': { action: 'Bonus Action', tag: 'Trạng Thái: Focus' },
  'Reckless Blows': { tag: 'Cận Chiến Liều Lĩnh' },
  'Pursuer': { action: 'Bonus Action', tag: 'Trạng Thái: Focus' },
  'Lock In': { tag: 'Trạng Thái: Focus' },
  'Curse Resistance': { tag: 'Trạng Thái: Focus' },
  'Endless Focus': { tag: 'Trạng Thái: Focus' },
  'Extra Attack': { action: 'Action', tag: 'Đòn Đánh Liên Hoàn' },
  'Honed Instincts': { tag: 'Phản Xạ' },
  'Brutal Blows': { tag: 'Chí Mạng' },
  'Unstoppable': { tag: 'Tối Thượng (Capstone)' },

  // Scout
  'Quick Strikes': { tag: 'Võ Thuật' },
  'Unparalleled Movement': { tag: 'Tốc Độ & Cơ Động' },
  'Swift Movement': { action: 'Bonus Action', tag: 'Cơ Động' },
  'Sharp Eyes': { action: 'Bonus Action', tag: 'Trinh Sát' },
  'Eagle Eyes': { tag: 'Thị Giác' },
  'Evasion': { tag: 'Né Tránh Diện Rộng' },
  'Tactical Retreat': { action: 'Reaction', tag: 'Phản Xạ Rút Lui' },
  'Scanning Eyes': { tag: 'Dò Điểm Yếu' },
  'Sixth Sense': { tag: 'Giác Quan' },
  'Swift Dodge': { action: 'Reaction', tag: 'Né Tránh' },
  'Unfathomable Speed': { tag: 'Tối Thượng (Capstone)' },

  // Strategist
  'Quick Recovery': { tag: 'Hồi Phục CE' },
  'Technique Creativity': { tag: 'Biến Hóa Thuật Thức' },
  'Sorcerous Restoration': { tag: 'Hồi Phục CE' },
  'Signature Move': { tag: 'Tối Thượng (Capstone)' },

  // Shikigami User
  'Shikigami Companion': { action: 'Action', tag: 'Triệu Hồi Thức Thần' },
  'Martial Arts': { tag: 'Thể Thuật' },
  'Shared Technique': { tag: 'Phối Hợp Thức Thần' },
  'Coordinated Blow': { tag: 'Gọng Kìm Thức Thần' },
  'Shikigami Improvement': { tag: 'Tiến Hóa Thức Thần' },
  'United Front': { action: 'Reaction', tag: 'Hỗ Trợ Thức Thần' },
  'Advanced Shikigami': { tag: 'Thức Thần Cấp Cao' },
  'Swift Escape': { action: 'Reaction', tag: 'Thoát Hiểm' },
  'Perfected Bond': { tag: 'Tối Thượng (Capstone)' },

  // Support Specialist
  'Curtain': { action: 'Action', tag: 'Rèm Che Giấu' },
  'Barrier Technique': { action: 'Action', tag: 'Kết Giới Bảo Vệ' },
  'Reverse Cursed Technique': { action: 'Action', tag: 'Phản Chuyển / RCT' },
  'Reverse Technique Understanding': { tag: 'Phản Chuyển / RCT' },
  'Mastered Reverse Technique': { tag: 'Phản Chuyển / RCT' },
  'Permanent Techniques': { tag: 'Tối Thượng (Capstone)' },

  // Warrior
  'Combat Prowess': { tag: 'Võ Thuật Chú Cụ' },
  'Unarmored Defense': { tag: 'Phòng Ngự' },
  'Undaunted': { action: 'Bonus Action', tag: 'Kiên Cường' },
  'Battle Readiness': { tag: 'Sẵn Sàng Chiến Đấu' },
  'Steel Spirit': { tag: 'Tinh Thần Thép' },
  'Unerring Blows': { tag: 'Đòn Đánh Chuẩn Xác' },

  // Heavenly Restriction
  'Restrained Body': { tag: 'Thể Chất 0 CE' },
  'Unarmored Movement': { tag: 'Tốc Độ Di Chuyển' },
  'Body Improvements': { tag: 'Cải Tiến Cơ Thể' },
  'Fighting Style': { tag: 'Thế Đánh Chiến Binh' },
  'Ideal': { tag: 'Lý Tưởng' },
  'Improved Body': { tag: 'Thể Chất' },
  'Resistant': { tag: 'Kháng Phép / Area' },
  'Weapon Specialist': { tag: 'Bậc Thầy Vũ Khí' },
  'Celestial Body': { tag: 'Thần Thể Bất Khả Xâm Phạm' },
  'Improved Fighting Style': { tag: 'Thế Đánh Nâng Cao' },
  'Demigod\'s Figure': { tag: 'Thể Chất Bán Thần' },
  'God of War': { tag: 'Tối Thượng (Capstone)' }
};

['src/data/classes.json', 'data/classes.json'].forEach(file => {
  if (!fs.existsSync(file)) return;
  const classes = JSON.parse(fs.readFileSync(file, 'utf8'));

  classes.forEach(c => {
    // 1. Add CE Formula & Hit Dice label
    c.ceFormula = ceFormulas[c.id] || 'Cấp độ + CE modifier';
    c.hitDiceLabel = hitDiceLabels[c.id] || 'd8';

    // 2. Separate Starting Equipment
    const eqIdx = c.features.findIndex(f => f.name.toLowerCase() === 'equipment');
    if (eqIdx !== -1) {
      const eqItem = c.features[eqIdx];
      c.startingEquipment = eqItem.description;
      // Remove from features array so features are 100% combat/lore!
      c.features.splice(eqIdx, 1);
    }

    // 3. Strategist Technique Creativities
    if (c.id === 'strategist') {
      c.techniqueCreativities = strategistCreativities;
    }

    // 4. Enrich features with action and tag
    c.features.forEach(f => {
      const meta = featureMeta[f.name.trim()];
      if (meta) {
        if (meta.action) f.action = meta.action;
        if (meta.tag) f.tag = meta.tag;
      }
    });

    // Also update coreFeatures if Heavenly Restriction
    if (c.id === 'heavenly-restriction' && c.coreFeatures) {
      c.coreFeatures = c.features;
    }
  });

  fs.writeFileSync(file, JSON.stringify(classes, null, 2), 'utf8');
  console.log(`[${file}] Enriched classes data successfully!`);
});
