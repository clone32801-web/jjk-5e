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
      { id: 'concept', title: '1. Khái Niệm & Định Danh', vi: 'Hình tượng, lý tưởng, ràng buộc', icon: User },
      { id: 'race', title: '2. Lựa Chọn Chủng Tộc', vi: 'Nhân loại, Vật chứa, Chú hài, Chú linh', icon: Users },
      { id: 'class', title: '3. Lớp Nhân Vật', vi: '7 Class & phong cách chiến đấu', icon: Swords },
      { id: 'ability-scores', title: '4. Chỉ Số Thuộc Tính', vi: 'Standard Array & Thuộc tính CE', icon: Brain },
      { id: 'technique', title: '5. Thuật Thức Bẩm Sinh', vi: '79 Thuật thức hoặc Thiên Dữ Chú Phược', icon: Flame },
      { id: 'background', title: '6. Xuất Thân & Tâm Thế', vi: '5 Xuất thân & Triết lý sống', icon: Compass },
      { id: 'equipment', title: '7. Trang Bị Khởi Đầu', vi: 'Đồng phục, vũ khí & Chú cụ', icon: Shield },
      { id: 'combat-stats', title: '8. Tính Chỉ Số Chiến Đấu', vi: 'Công thức HP, AC, CE DC & Attack', icon: Activity },
      { id: 'progression', title: '9. Cấp Độ 1 & Thăng Cấp', vi: 'XP, Milestones & Feats', icon: Award },
    ],
    techniques: [
      { id: 'all', title: 'Tất cả Thuật Thức', vi: 'Toàn bộ 79 thuật thức', icon: Sparkles },
      { id: 'clans', title: 'Ngự Tam Gia', vi: 'Gojo, Zenin, Kamo', icon: Crown },
      { id: 'curses', title: 'Chú Linh & Oán Linh', vi: 'Thuật thức nguyền hồn', icon: Skull },
      { id: 'shikigami', title: 'Thức Thần & Triệu Hồi', vi: 'Triệu hoán & ảnh chú', icon: Users },
      { id: 'manipulation', title: 'Thao Túng & Biến Đổi', vi: 'Điều khiển vật thể/năng lượng', icon: Zap },
      { id: 'conceptual', title: 'Hiện Đại & Khái Niệm', vi: 'Quy luật & khái niệm mới', icon: Sparkles },
      { id: 'domain', title: 'Có Lãnh Địa (75)', vi: 'Sở hữu Bành Trướng Lãnh Địa', icon: Flame },
    ],
    classes: [
      { id: 'juggernaut', title: 'Juggernaut', vi: 'Đấu Sĩ / Brawler Tank', icon: Swords },
      { id: 'scout', title: 'Scout', vi: 'Trinh Sát / Cơ Động Cao', icon: Compass },
      { id: 'strategist', title: 'Strategist', vi: 'Quân Sư / CE Tối Đa', icon: Brain },
      { id: 'shikigami-user', title: 'Shikigami User', vi: 'Triệu Hồi / Thức Thần', icon: Users },
      { id: 'support-specialist', title: 'Support Specialist', vi: 'Kết Giới / Hỗ Trợ Màn', icon: Shield },
      { id: 'warrior', title: 'Warrior', vi: 'Võ Sĩ / Bậc Thầy Chú Cụ', icon: Hammer },
      { id: 'heavenly-restriction', title: 'Heavenly Restriction', vi: '0 Chú Lực / Thể Chất Quái Vật', icon: Skull },
    ],
    races: [
      { id: 'human-races', title: 'Human Races', vi: 'Nhân Loại & Chú Thuật Gia', icon: Users },
      { id: 'cursed-vessel', title: 'Cursed Vessel', vi: 'Vật Chứa Chú Vật Tái Sinh', icon: Skull },
      { id: 'cursed-corpses', title: 'Cursed Corpses', vi: 'Chú Hài Độc Lập', icon: Shield },
      { id: 'cursed-spirits', title: 'Cursed Spirits', vi: 'Nguyền Hồn & Oán Linh', icon: Sparkles },
    ],
    backgrounds: [
      { id: 'backgrounds', title: 'Xuất Thân Căn Bản', vi: '5 Xuất thân (Gia tộc, Bình dân...)', icon: Compass },
      { id: 'mindsets', title: 'Tâm Thế & Lý Tưởng', vi: 'Triết lý chiến đấu & động lực', icon: Heart },
    ],
    equipment: [
      { id: 'cursed-tools', title: 'Chú Cụ (Cursed Tools)', vi: 'Cấp 4 → Đặc Cấp (28 món)', icon: Flame },
      { id: 'packs', title: 'Gói Khởi Đầu', vi: 'Quân trang chú thuật sư', icon: Package },
      { id: 'semi-cursed', title: 'Rèn Bán Chú Cụ', vi: 'Quy tắc tẩm chú lực vào vũ khí', icon: Hammer },
      { id: 'armor', title: 'Áo Giáp & Khiên', vi: 'Đồng phục & giáp bảo hộ', icon: Shield },
      { id: 'melee', title: 'Vũ Khí Cận Chiến', vi: 'Kiếm, đao, côn, thương...', icon: Swords },
      { id: 'ranged', title: 'Vũ Khí Tầm Xa', vi: 'Cung, súng lục, súng trường...', icon: Crosshair },
      { id: 'wealth', title: 'Tiền Tệ & Định Giá', vi: 'Tỷ giá Yên / GP & bảng giá bán', icon: Coins },
    ],
    feats: [
      { id: 'Barrier Feats', title: 'Barrier Feats', vi: 'Kết Giới (Đơn Giản, Màn...)', icon: Shield },
      { id: 'Cursed Energy Feats', title: 'Cursed Energy Feats', vi: 'Thao túng Chú lực & Gia cố', icon: Zap },
      { id: 'Physical Feats', title: 'Physical Feats', vi: 'Thể chất & Tốc độ siêu phàm', icon: Heart },
      { id: 'Reverse Cursed Technique Feats', title: 'RCT Feats', vi: 'Thuật Thức Phản Chuyển', icon: Sparkles },
      { id: 'Skill Feats', title: 'Skill Feats', vi: 'Kỹ năng chuyên biệt chú thuật', icon: Brain },
      { id: 'Technique Feats', title: 'Technique Feats', vi: 'Kỳ tài theo Thuật thức bẩm sinh', icon: Scroll },
    ],
    rules: [
      { id: 'cursed-energy', title: 'Cursed Energy', vi: 'Chú Lực Căn Bản', icon: Layers },
      { id: 'binding-vows', title: 'Binding Vows', vi: 'Ràng Buộc & Khế Ước', icon: Zap },
      { id: 'breakthroughs', title: 'Breakthroughs', vi: 'Đột Phá & Phản Chuyển', icon: Sparkles },
      { id: 'domain-expansion', title: 'Barriers & Domain', vi: 'Kết Giới & Lãnh Địa', icon: Flame },
      { id: 'limb-damage', title: 'Limb Damage Table', vi: 'Bảng Tổn Thương Đứt Chi', icon: Skull },
      { id: 'maximum-output', title: 'Maximum Output', vi: 'Cực Phiên & Quá Tải', icon: Activity },
      { id: 'the-zone', title: 'The Zone', vi: 'Trạng Thái 120% Tiềm Năng', icon: Sparkles },
      { id: 'rules-of-thumb', title: 'Rules of Thumb', vi: 'Quy Tắc Chỉ Dẫn Cốt Lõi', icon: Award },
      { id: 'optional-rules', title: 'Combat & Action Economy', vi: 'Hành Động & Chiến Đấu', icon: Swords },
      { id: 'multiclassing', title: 'Multiclassing Rules', vi: 'Quy Tắc Đa Lớp', icon: Layers },
    ],
    tools: [
      { id: 'ce-calc', title: 'Máy Tính Chú Lực (CE Calc)', vi: 'Bể CE, Save DC & Bể RCT', icon: Calculator },
      { id: 'domain-clash', title: 'Va Chạm Lãnh Địa', vi: 'Mô phỏng đọ độ tinh xảo Refinement', icon: Flame },
      { id: 'limb-dice', title: 'Xúc Xắc Đứt Chi', vi: 'Tung xúc xắc 1d6 chấn thương', icon: Dices },
    ],
  };

  const navItems = [
    { 
      id: 'creation', 
      label: 'Tạo Nhân Vật', 
      sub: 'Cẩm nang & Trình tạo char', 
      kanji: '作成', 
      count: '9 Bước', 
      icon: UserPlus 
    },
    { 
      id: 'techniques', 
      label: 'Thuật Thức', 
      sub: '79 Thuật thức bẩm sinh', 
      kanji: '術式', 
      count: '79', 
      icon: Sparkles 
    },
    { 
      id: 'classes', 
      label: 'Lớp Nhân Vật', 
      sub: '7 Lớp chú thuật sư', 
      kanji: '等級', 
      count: '7', 
      icon: Swords 
    },
    { 
      id: 'races', 
      label: 'Chủng Tộc', 
      sub: '4 Chủng tộc đặc thù', 
      kanji: '種族', 
      count: '4', 
      icon: Users 
    },
    { 
      id: 'backgrounds', 
      label: 'Xuất Thân & Tâm Thế', 
      sub: '5 Xuất thân & Lý tưởng', 
      kanji: '背景', 
      count: '5', 
      icon: Compass 
    },
    { 
      id: 'equipment', 
      label: 'Chú Cụ & Giáp', 
      sub: '28 Chú cụ & Quân trang', 
      kanji: '呪具', 
      count: '28', 
      icon: Shield 
    },
    { 
      id: 'feats', 
      label: 'Kỳ Tài (Feats)', 
      sub: '100+ Kỹ năng & Chú thuật', 
      kanji: '秘術', 
      count: '100+', 
      icon: Scroll 
    },
    { 
      id: 'rules', 
      label: 'Sổ Tay Luật', 
      sub: 'Intricacies of Sorcery', 
      kanji: '規則', 
      count: '10 Mục', 
      icon: BookOpen 
    },
    { 
      id: 'tools', 
      label: 'Công Cụ Mini', 
      sub: 'Tính CE & Quay thưởng', 
      kanji: '計算', 
      count: '3 App', 
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
