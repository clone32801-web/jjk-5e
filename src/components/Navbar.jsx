import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Shield, 
  Swords, 
  BookOpen, 
  Scroll, 
  Calculator, 
  Search, 
  Menu, 
  X, 
  Users, 
  Compass, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  Zap, 
  Flame, 
  Skull, 
  Activity, 
  Award, 
  HelpCircle, 
  Crown, 
  Ghost, 
  Hammer, 
  Heart, 
  Brain, 
  Package, 
  Crosshair, 
  Coins, 
  Dices,
  UserPlus,
  User
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  activeCreationStep = 'concept',
  setActiveCreationStep,
  activeCategory = 'all',
  setActiveCategory,
  activeClassId = 'juggernaut',
  setActiveClassId,
  activeRaceId = 'human-races',
  setActiveRaceId,
  activeBackgroundTab = 'backgrounds',
  setActiveBackgroundTab,
  activeEquipmentTab = 'cursed-tools',
  setActiveEquipmentTab,
  activeFeatCategory = 'Barrier Feats',
  setActiveFeatCategory,
  activeRuleSection = 'cursed-energy', 
  setActiveRuleSection, 
  activeToolId = 'ce-calc',
  setActiveToolId,
  onOpenSearch 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedTabs, setExpandedTabs] = useState({
    [activeTab || 'techniques']: true
  });

  const { resonance, setResonance, currentTheme } = useTheme();

  // Exclusive Accordion: When activeTab changes, auto-collapse previous parent tab and expand the new one
  useEffect(() => {
    if (activeTab) {
      setExpandedTabs({
        [activeTab]: true
      });
    }
  }, [activeTab]);

  const handleSelectTab = (id) => {
    window.scrollTo(0, 0);
    if (id === activeTab) {
      // Clicking the already active parent tab toggles its submenu open/close
      setExpandedTabs(prev => ({
        [id]: !prev[id]
      }));
    } else {
      // Switching to a different parent tab: auto-collapse old tab and expand new tab
      setActiveTab(id);
      setExpandedTabs({
        [id]: true
      });
    }
  };

  const handleSelectSubItem = (tabId, subId) => {
    window.scrollTo(0, 0);
    setActiveTab(tabId);
    setExpandedTabs({
      [tabId]: true
    });
    switch (tabId) {
      case 'creation':
        if (setActiveCreationStep) setActiveCreationStep(subId);
        break;
      case 'techniques':
        if (setActiveCategory) setActiveCategory(subId);
        break;
      case 'classes':
        if (setActiveClassId) setActiveClassId(subId);
        break;
      case 'races':
        if (setActiveRaceId) setActiveRaceId(subId);
        break;
      case 'backgrounds':
        if (setActiveBackgroundTab) setActiveBackgroundTab(subId);
        break;
      case 'equipment':
        if (setActiveEquipmentTab) setActiveEquipmentTab(subId);
        break;
      case 'feats':
        if (setActiveFeatCategory) setActiveFeatCategory(subId);
        break;
      case 'rules':
        if (setActiveRuleSection) setActiveRuleSection(subId);
        break;
      case 'tools':
        if (setActiveToolId) setActiveToolId(subId);
        break;
    }
    setMobileMenuOpen(false);
  };

  // Comprehensive sub-menu map for ALL 9 tabs
  const SUBMENUS = {
    creation: [
      { id: 'concept', title: '1. Khái Niệm & Định Danh', vi: 'Hình tượng, lý tưởng & Ràng buộc', icon: User },
      { id: 'race', title: '2. Lựa Chọn Chủng Tộc', vi: 'Nhân loại, Vật chứa, Chú hài, Chú linh', icon: Users },
      { id: 'class', title: '3. Chọn Hệ Phái Chú Thuật', vi: '7 Lớp & Phong cách chiến đấu', icon: Swords },
      { id: 'ability-scores', title: '4. Phân Bổ Điểm Chỉ Số', vi: 'Standard Array & Thuộc tính Chú lực', icon: Brain },
      { id: 'technique', title: '5. Thức Tỉnh Thuật Thức', vi: '79 Thuật thức & Thiên Dữ Chú Phược', icon: Flame },
      { id: 'background', title: '6. Xuất Thân & Tâm Thế', vi: 'Gia tộc danh môn & Triết lý sinh tồn', icon: Compass },
      { id: 'equipment', title: '7. Trang Bị Khởi Đầu', vi: 'Đồng phục Cao đẳng, Binh khí & Chú cụ', icon: Shield },
      { id: 'combat-stats', title: '8. Tính Chỉ Số Chiến Đấu', vi: 'Công thức HP, AC, CE DC & Thưởng đòn đánh', icon: Activity },
      { id: 'progression', title: '9. Cấp Độ 1 & Thăng Cấp', vi: 'Kinh nghiệm XP, Cột mốc & Mở khóa Kỳ tài', icon: Award },
    ],
    techniques: [
      { id: 'all', title: 'Toàn Bộ Thuật Thức (79)', vi: '79 Thuật thức bẩm sinh & Lãnh địa', icon: Sparkles },
      { id: 'clans', title: 'Ngự Tam Gia Danh Môn', vi: 'Huyết kế Gojo, Zenin và Kamo', icon: Crown },
      { id: 'curses', title: 'Chú Linh & Oán Linh', vi: 'Thuật thức nguyền hồn & Tai ương', icon: Skull },
      { id: 'shikigami', title: 'Thức Thần & Triệu Hoán', vi: 'Thức thần thao túng & Ảnh chú', icon: Users },
      { id: 'manipulation', title: 'Thao Túng & Biến Đổi', vi: 'Điều khiển vật chất, cơ thể & Chú lực', icon: Zap },
      { id: 'conceptual', title: 'Hiện Đại & Khái Niệm', vi: 'Quy tắc trừu tượng & Cơ chế hiện đại', icon: Sparkles },
      { id: 'domain', title: 'Bành Trướng Lãnh Địa (75)', vi: 'Đỉnh cao thuật thức sở hữu Lãnh địa', icon: Flame },
    ],
    classes: [
      { id: 'juggernaut', title: 'Đấu Sĩ Tiền Tuyến', vi: 'Juggernaut • Thể thuật vũ bão (Itadori, Todo)', icon: Swords },
      { id: 'scout', title: 'Trinh Sát Cơ Động', vi: 'Scout • Tốc độ & Tập kích du kích (Maki, Mei Mei)', icon: Compass },
      { id: 'strategist', title: 'Quân Sư Điều Lực', vi: 'Strategist • Chú lực khổng lồ (Kenjaku, Nanami)', icon: Brain },
      { id: 'shikigami-user', title: 'Thuật Sư Thức Thần', vi: 'Shikigami User • Triệu hoán & Tác chiến (Megumi)', icon: Users },
      { id: 'support-specialist', title: 'Chuyên Gia Kết Giới', vi: 'Support Specialist • Dựng Màn & Hỗ trợ (Ijichi)', icon: Shield },
      { id: 'warrior', title: 'Võ Sĩ Chú Cụ', vi: 'Warrior • Bậc thầy binh khí (Kusakabe, Yuta)', icon: Hammer },
      { id: 'heavenly-restriction', title: 'Thiên Dữ Chú Phược', vi: 'Heavenly Restriction • 0 Chú lực siêu thể chất (Toji)', icon: Skull },
    ],
    races: [
      { id: 'human-races', title: 'Nhân Loại & Chú Thuật Sư', vi: 'Human Races • Con người thuần túy & Chú thuật gia', icon: Users },
      { id: 'cursed-vessel', title: 'Vật Chứa Chú Vật', vi: 'Cursed Vessel • Vật chứa tái sinh & Cửu Tướng Đồ', icon: Skull },
      { id: 'cursed-corpses', title: 'Chú Hài Độc Lập', vi: 'Cursed Corpses • Búp bê chú thuật đột biến (Panda)', icon: Shield },
      { id: 'cursed-spirits', title: 'Chú Linh & Oán Linh', vi: 'Cursed Spirits • Nguyền hồn tiến hóa & Tai ương', icon: Sparkles },
    ],
    backgrounds: [
      { id: 'backgrounds', title: 'Xuất Thân Căn Bản', vi: '5 Bối cảnh (Gia tộc, Cao đẳng Chú thuật, Bình dân...)', icon: Compass },
      { id: 'mindsets', title: 'Tâm Thế Chiến Đấu', vi: 'Triết lý sinh tử, Động lực nội tâm & Bờ vực cái chết', icon: Heart },
    ],
    equipment: [
      { id: 'cursed-tools', title: 'Kho Tàng Chú Cụ', vi: 'Cấp 4 → Đặc Cấp (28 Bảo vật chú thuật)', icon: Flame },
      { id: 'packs', title: 'Gói Quân Trang Khởi Đầu', vi: 'Hành trang Chú thuật sư nhập học Cao đẳng', icon: Package },
      { id: 'semi-cursed', title: 'Rèn Đúc Bán Chú Cụ', vi: 'Quy tắc tẩm Chú lực lâu dài vào vũ khí thường', icon: Hammer },
      { id: 'armor', title: 'Đồng Phục & Áo Giáp', vi: 'Đồng phục Cao đẳng Chú thuật & Giáp hộ thân', icon: Shield },
      { id: 'melee', title: 'Binh Khí Cận Chiến', vi: 'Kiếm, katana, côn tam khúc, đại đao...', icon: Swords },
      { id: 'ranged', title: 'Vũ Khí Tầm Xa', vi: 'Cung chú thuật, súng ngắn, súng trường...', icon: Crosshair },
      { id: 'wealth', title: 'Tiền Tệ & Định Giá', vi: 'Tỷ giá Yên / GP & Bảng quy đổi kinh tế', icon: Coins },
    ],
    feats: [
      { id: 'Barrier Feats', title: 'Bí Thuật Kết Giới', vi: 'Giản Dị Lãnh Địa, Lạc Hoa Tình, Màn bảo hộ...', icon: Shield },
      { id: 'Cursed Energy Feats', title: 'Thao Túng Chú Lực', vi: 'Gia cố cơ thể, Dòng chảy Chú lực & Tích tụ năng lượng', icon: Zap },
      { id: 'Physical Feats', title: 'Thể Chất Vượt Ngưỡng', vi: 'Sức mạnh cơ bắp, Tốc độ & Phản xạ siêu phàm', icon: Heart },
      { id: 'Reverse Cursed Technique Feats', title: 'Thuật Thức Phản Chuyển', vi: 'Hồi phục sinh mệnh, Trị liệu não bộ & RCT', icon: Sparkles },
      { id: 'Skill Feats', title: 'Kỹ Năng Nghiệp Vụ', vi: 'Thẩm định chú vật, Y thuật & Tri thức bí truyền', icon: Brain },
      { id: 'Technique Feats', title: 'Kỳ Tài Thuật Thức', vi: 'Chiêu thức độc quyền mở rộng theo Thuật thức bẩm sinh', icon: Scroll },
    ],
    rules: [
      { id: 'cursed-energy', title: 'Chú Lực Căn Bản', vi: 'Cảm xúc tiêu cực, Dòng chảy & Khống chế năng lượng', icon: Layers },
      { id: 'binding-vows', title: 'Ràng Buộc & Khế Ước', vi: 'Tự áp đặt, Khế ước đôi bên & Bảng Bất Hạnh', icon: Zap },
      { id: 'breakthroughs', title: 'Đột Phá & Hắc Thiểm', vi: 'Tia chớp đen (Black Flash) & Phản Chuyển (RCT)', icon: Sparkles },
      { id: 'domain-expansion', title: 'Lãnh Địa Bành Trướng', vi: 'Giản Dị Lãnh Địa, Va chạm & Độ tinh xảo Refinement', icon: Flame },
      { id: 'limb-damage', title: 'Tổn Thương Đứt Chi', vi: 'Bảng chấn thương tàn tật, cụt chi & Phục hồi', icon: Skull },
      { id: 'maximum-output', title: 'Cực Phiên & Quá Tải', vi: 'Maximum Output, Vượt ngưỡng & Kiệt sức chú thuật', icon: Activity },
      { id: 'the-zone', title: 'Trạng Thái The Zone', vi: 'Khai mở 120% Tiềm năng tột đỉnh sau Hắc Thiểm', icon: Sparkles },
      { id: 'rules-of-thumb', title: 'Quy Tắc Chỉ Dẫn Cốt Lõi', vi: 'Thang phân cấp CR, Thăng cấp bậc & Thù lao nhiệm vụ', icon: Award },
      { id: 'optional-rules', title: 'Chiến Lược & Giao Tranh', vi: 'Full-Turn Action, Clash đọ đòn & Nhắm điểm yếu', icon: Swords },
      { id: 'multiclassing', title: 'Quy Tắc Đa Lớp', vi: 'Điều kiện chỉ số 13+ & Dung hợp Chú lực', icon: Layers },
    ],
    tools: [
      { id: 'ce-calc', title: 'Máy Tính Chú Lực', vi: 'Tính bể CE, CE Save DC, Đòn đánh & Bể RCT', icon: Calculator },
      { id: 'domain-clash', title: 'Mô Phỏng Va Chạm Lãnh Địa', vi: 'Đọ độ tinh xảo Refinement & Cơ chế Sure-Hit', icon: Flame },
      { id: 'limb-dice', title: 'Xúc Xắc Đứt Chi', vi: 'Tung xúc xắc 1d6 xác định vị trí chấn thương', icon: Dices },
    ],
  };

  const navItems = [
    { 
      id: 'creation', 
      label: 'Tạo Chú Thuật Sư', 
      sub: 'Cẩm nang 9 bước & Thiết lập', 
      kanji: '作成', 
      count: '9 Bước', 
      icon: UserPlus 
    },
    { 
      id: 'techniques', 
      label: 'Thuật Thức Bẩm Sinh', 
      sub: '79 Thuật thức & Lãnh địa', 
      kanji: '術式', 
      count: '79', 
      icon: Sparkles 
    },
    { 
      id: 'classes', 
      label: 'Hệ Phái Chú Thuật', 
      sub: '7 Lớp chiến đấu chuyên biệt', 
      kanji: '系統', 
      count: '7 Lớp', 
      icon: Swords 
    },
    { 
      id: 'races', 
      label: 'Chủng Tộc & Thể Khí', 
      sub: 'Nhân loại, Vật chứa, Chú linh', 
      kanji: '種族', 
      count: '4 Chủng', 
      icon: Users 
    },
    { 
      id: 'backgrounds', 
      label: 'Xuất Thân & Tâm Thế', 
      sub: 'Gia tộc, Bối cảnh & Lý tưởng', 
      kanji: '背景', 
      count: '5 Bối cảnh', 
      icon: Compass 
    },
    { 
      id: 'equipment', 
      label: 'Chú Cụ & Trang Bị', 
      sub: 'Chú cụ, Đồng phục & Binh khí', 
      kanji: '呪具', 
      count: '28 Chú cụ', 
      icon: Shield 
    },
    { 
      id: 'feats', 
      label: 'Kỳ Tài Chú Thuật', 
      sub: '100+ Bí thuật & Kỹ năng bổ trợ', 
      kanji: '秘術', 
      count: '100+', 
      icon: Scroll 
    },
    { 
      id: 'rules', 
      label: 'Bí Truyền Chú Thuật', 
      sub: '10 Chuyên đề Chú thuật nâng cao', 
      kanji: '秘伝', 
      count: '10 Mục', 
      icon: BookOpen 
    },
    { 
      id: 'tools', 
      label: 'Pháp Cụ Đo Lường', 
      sub: 'Tính CE & Mô phỏng Lãnh địa', 
      kanji: '道具', 
      count: '3 Pháp cụ', 
      icon: Calculator 
    },
  ];

  const isSubActive = (tabId, subId) => {
    if (activeTab !== tabId) return false;
    switch (tabId) {
      case 'creation': return activeCreationStep === subId;
      case 'techniques': return activeCategory === subId;
      case 'classes': return activeClassId === subId;
      case 'races': return activeRaceId === subId;
      case 'backgrounds': return activeBackgroundTab === subId;
      case 'equipment': return activeEquipmentTab === subId;
      case 'feats': return activeFeatCategory === subId;
      case 'rules': return activeRuleSection === subId;
      case 'tools': return activeToolId === subId;
      default: return false;
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP VERTICAL SIDEBAR (lg:flex) */}
      {/* ========================================================================= */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 h-screen sticky top-0 bg-[#070709] border-r border-[#232636] z-30 select-none">
        
        {/* Brand & Logo Header */}
        <div className="p-4 border-b border-[#1C1E2B]">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => handleSelectTab('techniques')}
          >
            <div 
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 ${currentTheme.bgAccent} border ${currentTheme.borderAccent} ${currentTheme.glowClass}`}
            >
              <span className="font-kanji font-black text-xl text-white">呪</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-wider text-white uppercase font-display">
                  JJK <span className={currentTheme.accentClass}>5E</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#171822] text-slate-400 rounded border border-[#232636]">
                  v6
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono flex items-center space-x-1">
                <span>Compendium</span>
                <span className="text-slate-600">•</span>
                <span className="font-kanji text-slate-500 font-bold">呪術廻戦</span>
              </p>
            </div>
          </div>

          {/* Quick Search Button (Ctrl + K) */}
          <div className="mt-4">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs bg-[#12131A] hover:bg-[#181924] text-slate-300 border border-[#232636] hover:border-slate-600 rounded-xl transition-all shadow-inner group"
              title="Tìm kiếm nhanh (Ctrl + K)"
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <Search className={`w-4 h-4 text-slate-400 group-hover:${currentTheme.accentClass} transition-colors`} />
                <span className="text-slate-400 group-hover:text-slate-200 truncate">Tìm kiếm nhanh...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#0A0A0C] text-slate-400 border border-[#232636] rounded shrink-0">
                Ctrl K
              </kbd>
            </button>
          </div>
        </div>

        {/* Vertical Navigation Links */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-3 space-y-1">
          <div className="px-3 py-1.5 mb-1 flex items-center justify-between text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">
            <span>Mục Lục Hệ Thống</span>
            <span className="text-[10px] text-purple-400 bg-purple-500/10 px-1.5 py-0.2 rounded border border-purple-500/20 font-mono">
              Compendium
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isTabActive = activeTab === item.id;
              const isExpanded = expandedTabs[item.id];
              const subItems = SUBMENUS[item.id] || [];

              return (
                <div key={item.id} className="space-y-1">
                  {/* Main Tab Button */}
                  <button
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 group border ${
                      isTabActive 
                        ? `${currentTheme.bgAccent} ${currentTheme.accentClass} ${currentTheme.borderAccent} font-semibold shadow-md shadow-purple-950/20` 
                        : 'border-transparent text-slate-300 hover:text-white hover:bg-[#12131A]'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1.5 rounded-lg transition-colors ${
                        isTabActive ? 'bg-white/10 text-white' : 'bg-[#12131A] text-slate-400 group-hover:text-white'
                      }`}>
                        <Icon className="w-4 h-4 shrink-0" />
                      </div>
                      <div className="truncate">
                        <div className={`text-xs font-display tracking-wide truncate ${isTabActive ? 'text-white font-bold' : 'text-slate-200 font-medium'}`}>
                          {item.label}
                        </div>
                        <div className="text-[10px] text-slate-500 font-sans truncate">
                          {item.sub}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isTabActive ? 'bg-white/10 text-white font-bold' : 'bg-[#141520] text-slate-500 border border-[#232636]'
                      }`}>
                        {item.count}
                      </span>
                      {subItems.length > 0 && (
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </button>

                  {/* SUBMENU ITEMS */}
                  {isExpanded && subItems.length > 0 && (
                    <div className="ml-3 pl-2.5 border-l-2 border-[#232636] my-1 space-y-1">
                      {subItems.map(sec => {
                        const SecIcon = sec.icon;
                        const isSubActiveItem = isSubActive(item.id, sec.id);

                        return (
                          <button
                            key={sec.id}
                            onClick={() => handleSelectSubItem(item.id, sec.id)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-all duration-150 group border ${
                              isSubActiveItem
                                ? `${currentTheme.bgAccent} ${currentTheme.accentClass} ${currentTheme.borderAccent} font-semibold shadow-md shadow-purple-950/20`
                                : 'border-transparent text-slate-400 hover:text-white hover:bg-[#12131A]'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5 min-w-0">
                              <SecIcon className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 group-hover:scale-110 ${
                                isSubActiveItem ? currentTheme.accentClass : 'text-slate-500 group-hover:text-slate-300'
                              }`} />
                              <div className="truncate">
                                <div className={`text-[11px] font-display uppercase tracking-wide truncate ${
                                  isSubActiveItem ? 'text-white font-bold' : 'text-slate-300 font-medium'
                                }`}>
                                  {sec.title}
                                </div>
                                <div className="text-[9px] text-slate-500 font-sans truncate">
                                  {sec.vi}
                                </div>
                              </div>
                            </div>
                            {isSubActiveItem && (
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 shadow-sm shadow-purple-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Controls: Theme Picker & Info */}
        <div className="p-3 border-t border-[#1C1E2B] bg-[#090A0F] space-y-2.5">
          {/* Cursed Resonance Theme Picker */}
          <div className="bg-[#12131A] border border-[#232636] rounded-xl p-2 space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span className="uppercase tracking-wider">Cộng Hưởng Chú Lực</span>
              <span className="font-kanji text-purple-400/60">呪力共鳴</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'cyan', label: 'Lục Nhãn', color: '#00D2FF', kanji: '青' },
                { id: 'crimson', label: 'Sukuna', color: '#DC2626', kanji: '赤' },
                { id: 'purple', label: 'Hư Thức', color: '#7C3AED', kanji: '紫' },
              ].map((t) => {
                const isSelected = resonance === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setResonance(t.id)}
                    title={`Cộng hưởng Chú Lực: ${t.label}`}
                    className={`flex items-center justify-center space-x-1 py-1.5 px-1.5 rounded-lg text-xs font-bold transition-all border ${
                      isSelected 
                        ? 'text-white border-white/20 shadow-md scale-[1.02]' 
                        : 'text-slate-400 hover:text-white bg-[#0A0A0E] border-transparent hover:border-[#232636]'
                    }`}
                    style={{
                      backgroundColor: isSelected ? t.color : undefined,
                    }}
                  >
                    <span className="font-kanji text-xs">{t.kanji}</span>
                    <span className="text-[10px] truncate">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Version Note */}
          <div className="px-1 text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>D&amp;D 5E JJK System</span>
            <span className="text-slate-600">v6 2026</span>
          </div>
        </div>

      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE TOP BAR & SLIDE-OUT DRAWER (lg:hidden) */}
      {/* ========================================================================= */}
      <header className="lg:hidden sticky top-0 z-40 w-full bg-[#070709]/95 backdrop-blur-md border-b border-[#232636]">
        <div className="px-4 h-14 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer" 
            onClick={() => handleSelectTab('techniques')}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentTheme.bgAccent} border ${currentTheme.borderAccent}`}>
              <span className="font-kanji font-black text-sm text-white">呪</span>
            </div>
            <div>
              <span className="font-black text-base text-white font-display">
                JJK <span className={currentTheme.accentClass}>5E</span>
              </span>
              <span className="ml-1 text-[9px] font-mono text-slate-500 bg-[#171822] px-1 py-0.5 rounded border border-[#232636]">
                v6
              </span>
            </div>
          </div>

          {/* Right Mobile Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-400 hover:text-white bg-[#12131A] border border-[#232636] rounded-xl"
              title="Tìm kiếm"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-[#12131A] border border-[#232636] rounded-xl"
              title="Mục lục menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Slide-out Panel */}
          <div className="relative w-72 max-w-[85vw] bg-[#070709] border-r border-[#232636] h-full flex flex-col p-4 shadow-2xl z-10 overflow-y-auto">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#232636]">
              <div className="flex items-center space-x-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentTheme.bgAccent} border ${currentTheme.borderAccent}`}>
                  <span className="font-kanji font-black text-sm text-white">呪</span>
                </div>
                <div>
                  <div className="font-black text-sm text-white font-display">JJK 5E COMPENDIUM</div>
                  <div className="text-[10px] text-slate-500 font-mono">D&amp;D 5E JJK EDITION</div>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#12131A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search Button */}
            <div className="mb-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs bg-[#12131A] text-slate-300 border border-[#232636] rounded-xl"
              >
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">Tìm kiếm nhanh...</span>
                </div>
                <kbd className="px-1 text-[9px] font-mono bg-[#0A0A0C] text-slate-500 border border-[#232636] rounded">
                  Ctrl K
                </kbd>
              </button>
            </div>

            {/* Mobile Navigation List */}
            <nav className="flex-1 space-y-1 mb-4 overflow-y-auto no-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isTabActive = activeTab === item.id;
                const isExpanded = expandedTabs[item.id];
                const subItems = SUBMENUS[item.id] || [];

                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all border ${
                        isTabActive 
                          ? `${currentTheme.bgAccent} ${currentTheme.accentClass} ${currentTheme.borderAccent} font-bold shadow-md` 
                          : 'border-transparent text-slate-300 hover:text-white hover:bg-[#12131A]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isTabActive ? currentTheme.accentClass : 'text-slate-400'}`} />
                        <div className="truncate">
                          <div className="text-xs font-bold leading-tight">{item.label}</div>
                          <div className="text-[10px] text-slate-500 font-sans">{item.sub}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isTabActive ? 'bg-white/10 text-white font-bold' : 'bg-[#141520] text-slate-500 border border-[#232636]'
                        }`}>
                          {item.count}
                        </span>
                        {subItems.length > 0 && (
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </button>

                    {/* Merged rules in mobile drawer */}
                    {isExpanded && subItems.length > 0 && (
                      <div className="ml-3 pl-2.5 border-l-2 border-[#232636] my-1 space-y-1">
                        {subItems.map(sec => {
                          const SecIcon = sec.icon;
                          const isSubActiveItem = isSubActive(item.id, sec.id);

                          return (
                            <button
                              key={sec.id}
                              onClick={() => handleSelectSubItem(item.id, sec.id)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left transition-all border ${
                                isSubActiveItem
                                  ? `${currentTheme.bgAccent} ${currentTheme.accentClass} ${currentTheme.borderAccent} font-semibold shadow-md`
                                  : 'border-transparent text-slate-400 hover:text-white hover:bg-[#12131A]'
                              }`}
                            >
                              <div className="flex items-center space-x-2.5 min-w-0">
                                <SecIcon className={`w-3.5 h-3.5 shrink-0 ${isSubActiveItem ? currentTheme.accentClass : 'text-slate-400'}`} />
                                <div className="truncate">
                                  <div className="text-[11px] font-bold uppercase">{sec.title}</div>
                                  <div className="text-[9px] text-slate-500">{sec.vi}</div>
                                </div>
                              </div>
                              {isSubActiveItem && (
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Theme Picker */}
            <div className="mt-auto pt-3 border-t border-[#232636] space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Cộng hưởng Chú Lực</div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'cyan', label: 'Lục Nhãn', color: '#00D2FF', kanji: '青' },
                  { id: 'crimson', label: 'Sukuna', color: '#DC2626', kanji: '赤' },
                  { id: 'purple', label: 'Hư Thức', color: '#7C3AED', kanji: '紫' },
                ].map((t) => {
                  const isSelected = resonance === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setResonance(t.id)}
                      className={`py-1.5 px-1 rounded-lg text-xs font-bold flex items-center justify-center space-x-1 border ${
                        isSelected ? 'text-white border-white/20' : 'text-slate-400 bg-[#12131A] border-transparent'
                      }`}
                      style={{ backgroundColor: isSelected ? t.color : undefined }}
                    >
                      <span className="font-kanji">{t.kanji}</span>
                      <span className="text-[10px] truncate">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
