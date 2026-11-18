# ⛩️ Jujutsu Kaisen 5e System Compendium

Trang web tra cứu toàn diện hệ thống **Jujutsu Kaisen 5e (JJK 5e)** - chuyển thể từ bộ sách luật hơn 410 trang của tác giả **[I watch Anime]** trên nền tảng D&D 5th Edition.

---

## 🌟 Tính Năng Nổi Bật

- 🔮 **Thuật Thức Bẩm Sinh (Innate Techniques)**: Tra cứu toàn bộ **80 thuật thức** (*Limitless, Shrine, Ten Shadows, Idle Transfiguration, Boogie Woogie, Ratio...*). Lọc theo Cấp độ (1, 3, 6, 11, 18, 20), có Bành trướng Lãnh địa hay không, chi phí Chú lực (CE Cost) và loại Action.
- 🥋 **7 Lớp Nhân Vật (Classes)**: *Juggernaut, Scout, Strategist, Shikigami User, Support Specialist, Warrior* và *Heavenly Restriction (Thiên Dữ Chú Phược - 0 CE)* kèm bảng tiến trình 20 cấp độ, Hit Dice, Proficiencies và tính năng chi tiết.
- 🩸 **4 Nhóm Chủng Tộc (Races)**: *Human Races, Cursed Vessel, Cursed Corpses, Cursed Spirits* kèm đặc tính và phân nhánh.
- 🗡️ **Kho Chú Cụ & Trang Bị (Equipment)**: Bảng Áo giáp, Vũ khí cận chiến & tầm xa, và **29 Chú cụ** từ Cấp 4 đến Đặc Cấp (*Special Grade*).
- 📜 **Hơn 100 Kỳ Tài (Feats)**: Barrier Feats, Cursed Energy Feats, Physical Feats, RCT Feats, Skill Feats và toàn bộ Feat chuyên biệt của từng thuật thức.
- 📖 **Sổ Tay Quy Tắc Chú Thuật (Sorcery Rules)**: Tra cứu nhanh Ràng buộc (*Binding Vows*), Hắc Thiểm (*Black Flash*), Phục hồi Phản chuyển (*RCT*), Lãnh địa & bảng Refinement 0-1000 điểm, và Bảng Sát thương Đứt chi (*Limb Damage Table*).
- 🔍 **Tìm Kiếm Toàn Cục Tức Thì (`Ctrl + K`)**: Gõ tên chiêu thức, nhân vật, thuật ngữ để nhảy ngay đến thông tin chỉ trong 0.1s.
- 🧮 **Công Cụ Tương Tác (Mini Tools)**:
  - **Máy tính Chú lực & DC**: Tự động tính CE Pool, Save DC, Attack Bonus, Bể máu RCT theo Level và Class.
  - **Mô phỏng Va chạm Lãnh địa (Domain Clash)**: So sánh điểm Refinement và tính số lượt áp chế.
  - **Xúc xắc Chấn thương Đứt chi (d6 Limb Roller)**: Xác định vị trí chấn thương và ngưỡng sát thương đứt chi.

---

## 🚀 Hướng Dẫn Chạy Ứng Dụng

### 1. Chạy trên máy cá nhân (Local Development)
Mở PowerShell hoặc Command Prompt tại thư mục dự án và chạy:

```bash
# Khởi chạy dev server
npm run dev
```
Sau đó mở trình duyệt truy cập: **`http://localhost:5173`**

### 2. Đóng gói bản Production
```bash
npm run build
```
Thư mục `dist/` sẽ chứa toàn bộ website tĩnh (HTML, CSS, JS, hình ảnh) sẵn sàng đưa lên hosting.

### 3. Deploy miễn phí lên mạng (Vercel / Netlify / GitHub Pages)
- **Vercel**: Cài Vercel CLI (`npx vercel`) hoặc liên kết repo GitHub với Vercel để deploy chỉ trong 1 phút.
- **Netlify**: Kéo thả thư mục `dist/` vào [Netlify Drop](https://app.netlify.com/drop).
- **GitHub Pages**: Đẩy code lên GitHub và kích hoạt GitHub Pages với Vite.

---

## 📁 Cấu Trúc Dự Án

```
├── data/                  # Dữ liệu JSON gốc đã trích xuất từ jjk 5e.docx
│   ├── techniques.json    # 80 Thuật thức bẩm sinh & Feats
│   ├── classes.json       # 7 Classes & Bảng tiến trình 20 cấp độ
│   ├── races.json         # Chủng tộc & Phân nhánh
│   ├── equipment.json     # Chú cụ, Áo giáp, Vũ khí
│   ├── feats.json         # Kỳ tài các hệ
│   └── rules.json         # Quy tắc lãnh địa, ràng buộc, đứt chi
├── public/
│   └── images/            # 355 hình ảnh minh họa chất lượng cao
├── src/
│   ├── components/        # Các view giao diện chuyên biệt
│   │   ├── Navbar.jsx
│   │   ├── GlobalSearchModal.jsx
│   │   ├── TechniquesView.jsx
│   │   ├── ClassesView.jsx
│   │   ├── RacesView.jsx
│   │   ├── EquipmentView.jsx
│   │   ├── FeatsView.jsx
│   │   ├── RulesView.jsx
│   │   └── ToolsView.jsx
│   ├── App.jsx            # Điều hướng chính & phím tắt Ctrl+K
│   └── index.css          # Giao diện Dark Anime + hiệu ứng Chú Lực
└── extractor/             # Script bóc tách tự động từ .docx
```
