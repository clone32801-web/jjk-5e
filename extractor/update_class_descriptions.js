import fs from 'fs';

const classDescriptions = {
  'juggernaut': 'Đấu Sĩ Tiên Phong (Frontline Brawler / Tank) — Lớp nhân vật sở hữu lượng máu và thể lực cao nhất hệ thống, chuyên về cận chiến bạo lực và đòn đánh không vũ trang bọc Chú lực (Unarmed Strikes). Khả năng chống chịu phi thường, hấp thụ sát thương và bùng nổ sức mạnh khi áp sát kẻ địch, là lá chắn vững chắc bảo vệ đồng đội ở tuyến đầu.',
  
  'scout': 'Trinh Sát & Sát Thủ Thần Tốc (Speed Striker / Infiltrator) — Bậc thầy về tốc độ di chuyển, phản xạ và khả năng luồn lách chiến trường. Tận dụng sơ hở để tung ra những đòn đánh chí mạng (Critical Hits), giải trừ nguy hiểm bằng né tránh hoàn hảo và chuyên dò tìm dấu vết tàn uế Chú lực trước các trận đánh lớn.',
  
  'strategist': 'Quân Sư & Pháp Đài Chú Lực (Cursed Energy Caster / Controller) — Bậc thầy điều khiển Chú thuật sở hữu bể Chú lực (CE Pool) dồi dào nhất và CE Modifier cao nhất hệ thống. Tối đa hóa uy lực và tầm ảnh hưởng của Thuật thức bẩm sinh, áp chế toàn diện chiến trường bằng hỏa lực chú thuật tầm xa và triển khai Lãnh địa tối thượng.',
  
  'shikigami-user': 'Thức Thần Sư (Summoner / Tactician) — Chuyên gia triệu hồi và thao túng Thức thần chiến đấu. Tận dụng bóng tối, bùa chú hoặc vật dẫn để gọi ra nhiều Thức thần mang thuộc tính chuyên biệt, chia sẻ giác quan và phối hợp gọng kìm linh hoạt để kiểm soát và xoay chuyển cục diện trận đánh.',
  
  'support-specialist': 'Kết Giới Sư & Trợ Lực Sinh Tồn (Barrier Master / Combat Support) — Trụ cột hỗ trợ sống còn của toàn đội. Chuyên sâu về Giản Dị Lãnh Địa (Simple Domain), dựng Rèm che chắn, thanh tẩy nguyền rủa và làm chủ Phản Chuyển Thuật Thức (RCT) để hồi phục sinh lực và vô hiệu hóa đòn Tất Trúng (Sure-Hit) từ Lãnh địa kẻ thù.',
  
  'warrior': 'Võ Sĩ & Bậc Thầy Chú Cụ (Martial Weapon Master / DPS) — Chuyên gia vũ trang công thủ toàn diện, thành thạo tối đa mọi loại Chú cụ và vũ khí chiến đấu. Có khả năng truyền dẫn Chú lực nhuần nhuyễn vào vũ khí, mở khóa các thế đánh liên hoàn uy lực cao và duy trì sát thương vật lý dồn dập trong mọi tình huống.',
  
  'heavenly-restriction': 'Thiên Dữ Chú Phược (Zero Cursed Energy / Physical Juggernaut) — Trường hợp dị biệt tối thượng đánh đổi hoàn toàn Chú lực (0 CE) lấy thể chất đạt đỉnh cao nhân loại. Miễn nhiễm tuyệt đối với hiệu ứng Tất Trúng của Bành trướng Lãnh địa, ngũ quan siêu việt cảm nhận không gian và sở hữu sức mạnh, tốc độ tàn phá thuần túy đè bẹp mọi Chú thuật sư.'
};

const filePaths = ['src/data/classes.json', 'data/classes.json'];

filePaths.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  const classes = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  classes.forEach(c => {
    if (classDescriptions[c.id]) {
      c.description = classDescriptions[c.id];
      console.log(`Updated ${c.name} in ${filePath}`);
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(classes, null, 2), 'utf8');
});
