import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Zap, 
  Skull, 
  Layers, 
  AlertTriangle, 
  Sparkles, 
  Eye, 
  Shield, 
  Heart, 
  Brain, 
  User, 
  Crosshair, 
  Activity, 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  Coins, 
  Hammer,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  TrendingUp,
  Target,
  Swords,
  Ghost,
  ArrowDown
} from 'lucide-react';
import rulesData from '../data/rules.json';
import { useTheme } from '../context/ThemeContext';

export default function RulesView({ activeSection: propActiveSection, setActiveSection: propSetActiveSection }) {
  const [localActiveSection, setLocalActiveSection] = useState('cursed-energy');
  const activeSection = propActiveSection || localActiveSection;
  const setActiveSection = propSetActiveSection || setLocalActiveSection;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentTheme } = useTheme();

  // 10 SECTIONS: CHAPTER 7 INTRICACIES + MULTICLASSING RULES
  const sections = [
    { id: 'cursed-energy', title: 'Cursed Energy & Techniques', vi: 'Chú Lực & Thuật Thức Căn Bản', kanji: '呪力・術式', icon: Layers },
    { id: 'binding-vows', title: 'Binding Vows', vi: 'Ràng Buộc & Khế Ước', kanji: '縛り', icon: Zap },
    { id: 'breakthroughs', title: 'Breakthroughs', vi: 'Đột Phá & Phản Chuyển', kanji: '覚醒・反転', icon: Sparkles },
    { id: 'domain-expansion', title: 'Barriers & Domain Expansion', vi: 'Kết Giới & Bành Trướng Lãnh Địa', kanji: '結界・領域展開', icon: Flame },
    { id: 'limb-damage', title: 'Limb Damage Table', vi: 'Bảng Tổn Thương Đứt Chi', kanji: '部位欠損', icon: Skull },
    { id: 'maximum-output', title: 'Maximum Output', vi: 'Cực Phiên & Quá Tải', kanji: '極大出力', icon: Activity },
    { id: 'the-zone', title: 'The Zone', vi: 'Trạng Thái 120% Tiềm Năng', kanji: 'ゾーン', icon: Sparkles },
    { id: 'rules-of-thumb', title: 'Rules of Thumb', vi: 'Quy Tắc Chỉ Dẫn Cốt Lõi', kanji: '基本指針', icon: Award },
    { id: 'optional-rules', title: 'Combat & Action Economy', vi: 'Hành Động & Cơ Chế Chiến Đấu', kanji: '戦闘行動', icon: Swords },
    { id: 'multiclassing', title: 'Multiclassing Rules', vi: 'Quy Tắc Đa Lớp', kanji: '複業', icon: Layers },
  ];

  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const currentSectionObj = sections[currentIndex] || sections[0];
  const ActiveIcon = currentSectionObj.icon;
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  // Single dynamic raw English text for the active section
  const activeRawEnglish = useMemo(() => {
    switch (activeSection) {
      case 'cursed-energy':
        return rulesData.cursedEnergy?.rawEnglish;
      case 'binding-vows':
        return rulesData.bindingVows?.rawEnglish;
      case 'breakthroughs':
        return rulesData.breakthroughs?.rawEnglish;
      case 'domain-expansion':
        return rulesData.domainExpansion?.rawEnglish;
      case 'limb-damage':
        return rulesData.combatAndLimbDamage?.rawEnglish;
      case 'maximum-output':
        return rulesData.maximumOutput?.rawEnglish;
      case 'the-zone':
        return rulesData.theZone?.rawEnglish;
      case 'rules-of-thumb':
        return rulesData.gradingAndDMRules?.rawEnglish;
      case 'optional-rules':
        return rulesData.optionalRules?.rawEnglish;
      case 'multiclassing':
        return rulesData.multiclassing?.rawEnglish;
      default:
        return null;
    }
  }, [activeSection]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Decorative Watermark */}
      <div className="absolute right-6 top-8 font-kanji font-black text-7xl text-white/[0.02] pointer-events-none select-none hidden lg:block">
        呪術秘伝
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            Chapter 7: Intricacies of Sorcery
          </span>
          <span className="text-[10px] font-mono text-slate-500">Chuẩn 1:1 theo sách gốc &amp; eidorii.com</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Intricacies of Sorcery
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
          Cẩm nang quy tắc chú thuật chuyên sâu 10 chuyên đề: Chú Lực Căn Bản, Ràng Buộc, Đột Phá, Bành Trướng Lãnh Địa, Bảng Đứt Chi, Xuất Lực Cực Đại, Trạng Thái The Zone, Quy Tắc Chỉ Dẫn, Luật Tuỳ Chọn DM và Quy Tắc Đa Lớp Nhân Vật.
        </p>
      </div>

        {/* Mobile Quick Section Switcher (< lg) */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#12131A] border border-[#232636] text-white shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl ${currentTheme.bgAccent} border ${currentTheme.borderAccent}`}>
                <ActiveIcon className={`w-4 h-4 ${currentTheme.accentClass}`} />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Chuyên đề hiện tại ({currentIndex + 1}/{sections.length})</div>
                <div className="text-sm font-bold text-white leading-tight">{currentSectionObj.vi}</div>
                <div className="text-[11px] text-slate-400 font-mono">{currentSectionObj.title}</div>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1.5 rounded-xl border border-purple-500/20">
              <span>Đổi mục</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {isMobileMenuOpen && (
            <div className="mt-2 p-2 rounded-2xl bg-[#12131A] border border-[#232636] space-y-1 shadow-2xl">
              {sections.map(sec => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSection(sec.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                      isActive 
                        ? `${currentTheme.bgAccent} ${currentTheme.accentClass} ${currentTheme.borderAccent} font-semibold border` 
                        : 'text-slate-300 hover:text-white hover:bg-[#181926]'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-bold">{sec.vi}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{sec.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop Section Switcher (>= lg: 2 rows of 5 cards) */}
        <div className="hidden lg:grid grid-cols-5 gap-2.5 mb-8">
          {sections.map(sec => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`p-3 rounded-xl border text-left transition-colors flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#15161E] border-white/20 text-white ring-1 ring-white/10'
                    : 'bg-[#0E0F14] border-white/[0.07] text-zinc-400 hover:text-zinc-200 hover:bg-[#12131A]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isActive ? currentTheme.accentClass : 'text-zinc-500'}`} />
                  <span className="font-kanji text-[10px] text-zinc-500 font-bold">{sec.kanji}</span>
                </div>
                <div>
                  <div className="text-xs font-bold font-display text-white line-clamp-1">{sec.vi}</div>
                  <div className="text-[10px] text-zinc-500 font-mono truncate">{sec.title}</div>
                </div>
              </button>
            );
          })}
        </div>

      {/* Main Content Area (Full width) */}
      <div className="space-y-8 w-full">
        
        {/* ========================================================= */}
        {/* TAB 1: CURSED ENERGY */}
        {/* ========================================================= */}
        {activeSection === 'cursed-energy' && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171824] via-[#101117] to-[#0A0A0C] border border-[#232636] relative overflow-hidden shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3 inline-block">
                Nền Tảng Năng Lượng Tiêu Cực • 呪力基礎
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {rulesData.cursedEnergy.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl font-sans">
                {rulesData.cursedEnergy.description}
              </p>
            </div>

            {/* Basic Cursed Energy Manipulation */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-4 flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Thao Túng Chú Lực Căn Bản</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Các phương thức cơ bản mà bất kỳ Chú thuật sư nào cũng có thể vận dụng để điều khiển Chú lực thô vào chiến đấu và sinh tồn:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {rulesData.cursedEnergy.basicManipulation.map((bm, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#202332] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-amber-300 font-display text-sm">{bm.name}</span>
                        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/30 border border-cyan-900/30 px-2 py-0.5 rounded-md">{bm.cost}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mb-2">Hành động: {bm.action}</div>
                      <p className="text-slate-300 text-xs font-sans leading-relaxed">{bm.effect}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Average Cursed Energy Table */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
              <h3 className="text-base sm:text-lg font-bold text-cyan-300 font-display mb-2 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>Bảng Lượng Chú Lực Trung Bình</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Lượng Chú lực tổng thể của một cá nhân phụ thuộc vào thiên bẩm bẩm sinh đối với Chú thuật thay vì số lượng cảm xúc tiêu cực đơn thuần:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#202332]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-64">Phân Loại Đối Tượng</th>
                      <th className="px-4 py-3 font-semibold w-28">Lượng CE</th>
                      <th className="px-4 py-3 font-semibold">Bối Cảnh &amp; Mức Độ Sức Mạnh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.cursedEnergy.averageCE.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20">
                        <td className="px-4 py-3 font-display text-white font-bold">{row.classification}</td>
                        <td className="px-4 py-3 font-mono text-cyan-300 font-bold text-sm">{row.ce}</td>
                        <td className="px-4 py-3 font-sans text-slate-300 leading-relaxed text-xs">{row.context}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cursed Techniques Overview */}
            {rulesData.cursedEnergy.cursedTechniques && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl space-y-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {rulesData.cursedEnergy.cursedTechniques.title}
                  </h3>
                </div>

                <div className="p-4 rounded-2xl bg-[#0E0F16] border border-purple-500/20 text-xs font-sans text-purple-200/90 leading-relaxed italic">
                  💡 {rulesData.cursedEnergy.cursedTechniques.analogy}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rulesData.cursedEnergy.cursedTechniques.categories.map((cat, cIdx) => (
                    <div key={cIdx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#202332] flex flex-col justify-between">
                      <div>
                        <span className="font-bold text-purple-300 font-display text-xs block mb-1.5">
                          {cat.name}
                        </span>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed">
                          {cat.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}



          </div>
        )}
            {/* ========================================================= */}

        {/* TAB 2: BINDING VOWS */}
        {/* ========================================================= */}
        {activeSection === 'binding-vows' && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171A24] via-[#101217] to-[#0A0A0C] border border-cyan-900/40 relative overflow-hidden shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3 inline-block">
                Khế Ước Trao Đổi Đồng Giá • 縛り
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {rulesData.bindingVows.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl font-sans">
                {rulesData.bindingVows.description}
              </p>
            </div>

            {/* Solo Binding Vow Examples */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Mẫu Ràng Buộc Cá Nhân Thực Chiến</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rulesData.bindingVows.soloVows.map((vow, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#232636] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h4 className="text-sm font-bold text-amber-300 font-display">{vow.name}</h4>
                        {vow.character && (
                          <span className="text-[10px] font-mono text-purple-300 shrink-0">[{vow.character}]</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans italic mb-2">"{vow.vow}"</p>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">{vow.tradeoff}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi Binding Vows */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-3">
                Ràng Buộc Tương Hỗ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rulesData.bindingVows.multiVows.map((mv, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#232636]">
                    <div className="flex justify-between items-center mb-1.5">
                      <h4 className="text-sm font-bold text-cyan-300 font-display">{mv.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{mv.req}</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">{mv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 9 DM Guidelines */}
            <div className="rounded-3xl bg-[#12131A] border border-amber-900/30 p-6 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-amber-300 font-display mb-2 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>9 Nguyên Tắc Cảnh Báo Cho DM Khi Duyệt Ràng Buộc Tự Tạo</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Để giữ cân bằng game và tránh các mánh lới lạm dụng lách luật, người quản trò (DM) cần cảnh giác với 9 kiểu đề xuất ràng buộc sau:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {rulesData.bindingVows.dmGuidelines.map((g, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0A0C] border border-[#202332]">
                    <span className="font-bold text-white block mb-1">{g.rule}</span>
                    <span className="text-slate-400 text-[11px] font-sans leading-relaxed">{g.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Misfortune Table */}
            <div className="rounded-3xl bg-[#12131A] border border-rose-900/40 p-6 shadow-xl overflow-hidden">
              <div className="flex items-center space-x-2 text-rose-400 font-bold mb-2 font-display">
                <AlertTriangle className="w-5 h-5" />
                <span>Bảng Bất Hạnh Khi Phá Vỡ Ràng Buộc (1d6)</span>
              </div>
              <p className="text-xs text-slate-400 font-sans mb-4">
                "Kẻ dám bội tín phá vỡ khế ước chú thuật sẽ phải gánh chịu tai hoạ giáng xuống đầu từ quy luật vũ trụ."
              </p>

              <div className="overflow-x-auto rounded-2xl border border-rose-950/40">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171822] text-rose-300 font-mono text-[10px] uppercase border-b border-[#232636]">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-24">1d6 Roll</th>
                      <th className="px-4 py-3 font-semibold">Hậu Quả Giáng Xuống Kẻ Phá Vỡ Ràng Buộc</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.bindingVows.misfortuneTable.slice(1).map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-rose-950/20">
                        <td className="px-4 py-3 font-mono font-bold text-rose-400">{row[0]}</td>
                        <td className="px-4 py-3 font-sans text-slate-300 leading-relaxed">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>


          </div>
        )}
            {/* ========================================================= */}

        {/* TAB 3: BREAKTHROUGHS */}
        {/* ========================================================= */}
        {activeSection === 'breakthroughs' && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#20101C] via-[#150F18] to-[#0A0A0C] border border-red-900/40 relative overflow-hidden shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30 mb-3 inline-block">
                Tia Chớp Đen &amp; Đột Phá • 黒閃
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {rulesData.breakthroughs.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl font-sans">
                {rulesData.breakthroughs.description}
              </p>
            </div>

            {/* Black Flash Card */}
            <div className="rounded-3xl bg-[#12131A] border border-red-500/40 p-6 shadow-xl">
              <div className="flex items-center space-x-2 text-red-400 font-display font-bold text-lg mb-2">
                <Flame className="w-5 h-5 text-red-500" />
                <span>{rulesData.breakthroughs.blackFlash.title}</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                {rulesData.breakthroughs.blackFlash.desc}
              </p>
              
              <div className="p-4 rounded-2xl bg-[#0A0A0C] border border-red-900/30 text-xs text-slate-200 font-sans whitespace-pre-line leading-relaxed">
                <strong className="text-red-400 block mb-1">Cơ Chế Đổ Xúc Xắc Kích Hoạt:</strong>
                {rulesData.breakthroughs.blackFlash.mechanics}
              </div>
            </div>

            {/* Reverse Cursed Technique (RCT) Card */}
            <div className="rounded-3xl bg-[#12131A] border border-emerald-500/30 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-2.5 mb-3">
                <Heart className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white font-display">
                  {rulesData.breakthroughs.rct.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-4">
                {rulesData.breakthroughs.rct.awakening}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#0A0A0C] border border-[#202332]">
                  <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold mb-1">Công Thức Bể Máu:</span>
                  <span className="text-emerald-300 font-bold font-mono">{rulesData.breakthroughs.rct.poolFormula}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0A0A0C] border border-[#202332]">
                  <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold mb-1">Tỷ Lệ Chuyển Đổi:</span>
                  <span className="text-cyan-300 font-bold font-mono">{rulesData.breakthroughs.rct.conversionRate}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0A0A0C] border border-[#202332]">
                  <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold mb-1">Hồi Phục Đứt Chi:</span>
                  <span className="text-amber-300 font-bold">{rulesData.breakthroughs.rct.injuryHealing}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0A0A0C] border border-[#202332]">
                  <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold mb-1">Tự Làm Đầy:</span>
                  <span className="text-purple-300 font-bold">{rulesData.breakthroughs.rct.recharge}</span>
                </div>
              </div>
            </div>

            {/* Awakened Understanding Progression */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
              <h3 className="text-base font-bold text-white font-display mb-4 flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Tiến Trình Giác Ngộ Chú Lực Sau Đột Phá</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {rulesData.breakthroughs.awakenedProgression.map((stage, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#232636] flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-amber-300 uppercase font-bold mb-1">{stage.req}</div>
                      <h4 className="text-sm font-bold text-white font-display mb-2">{stage.stage}</h4>
                      <p className="text-xs text-slate-300 font-sans mb-1.5">{stage.strike}</p>
                      {stage.reinforce && <p className="text-xs text-slate-400 font-sans mb-1.5">{stage.reinforce}</p>}
                      {stage.efficiency && <p className="text-xs text-cyan-300 font-sans">{stage.efficiency}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Specific Understandings */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
              <h3 className="text-base font-bold text-white font-display mb-3">
                Giác Ngộ Độc Quyền Theo Lớp Nhân Vật
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Quy tắc tuỳ chọn: Nhân vật thuộc lớp tương ứng và đạt từ 2 Đột phá (Breakthrough) có thể thức tỉnh 1 đặc quyền độc quyền dưới đây:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {rulesData.breakthroughs.classUnderstandings.map((cu, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0A0C] border border-[#202332]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-amber-300 font-display">{cu.cls}</span>
                      <span className="text-[10px] font-mono text-cyan-300">{cu.feature}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] font-sans leading-relaxed">{cu.effect}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cursed Physiology for Cursed Spirits */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
              <div className="flex items-center space-x-2.5 mb-2">
                <Skull className="w-5 h-5 text-red-400" />
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  {rulesData.breakthroughs.cursedPhysiology.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                {rulesData.breakthroughs.cursedPhysiology.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {rulesData.breakthroughs.cursedPhysiology.attributes.map((att, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0A0A0C] border border-[#202332]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white font-sans">{att.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-red-950/40 text-red-300 border border-red-800/40">{att.cost}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] font-sans leading-relaxed">{att.effect}</p>
                  </div>
                ))}
              </div>
            </div>


          </div>
        )}
            {/* ========================================================= */}

        {/* TAB 4: DOMAIN EXPANSION */}
        {/* ========================================================= */}
        {activeSection === 'domain-expansion' && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171824] via-[#101117] to-[#0A0A0C] border border-[#232636] relative overflow-hidden shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3 inline-block">
                Đỉnh Cao Chú Thuật • 領域展開
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {rulesData.domainExpansion.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl font-sans">
                {rulesData.domainExpansion.description}
              </p>

              {/* Core Domain Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#232636] text-xs">
                <div className="p-3 rounded-xl bg-[#0A0A0C] border border-[#202332]">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Chi Phí Chuẩn:</span>
                  <span className="text-cyan-300 font-bold font-mono">{rulesData.domainExpansion.basics.cost}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0A0C] border border-[#202332]">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Thời Gian Thi Triển:</span>
                  <span className="text-amber-300 font-bold">{rulesData.domainExpansion.basics.action}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0A0C] border border-[#202332]">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Quy Mô Kết Giới:</span>
                  <span className="text-slate-200 font-bold">{rulesData.domainExpansion.basics.radius}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0A0A0C] border border-[#202332]">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Thời Gian Duy Trì:</span>
                  <span className="text-purple-300 font-bold">{rulesData.domainExpansion.basics.duration}</span>
                </div>
              </div>
            </div>

            {/* Barriers & Curtains Section */}
            {rulesData.domainExpansion.barriers && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <span>{rulesData.domainExpansion.barriers.title}</span>
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded-full">
                    Căn Bản Không Gian
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans mb-5 leading-relaxed">
                  {rulesData.domainExpansion.barriers.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rulesData.domainExpansion.barriers.types.map((b, bIdx) => (
                    <div key={bIdx} className="p-4 rounded-2xl bg-[#0A0A0C] border border-[#202332] hover:border-cyan-500/30 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-cyan-300 font-display text-sm">{b.name}</span>
                          <span className="text-xs font-kanji text-slate-500">{b.kanji}</span>
                        </div>
                        <span className="inline-block text-[10px] font-mono text-purple-300 bg-purple-950/30 border border-purple-800/30 px-2 py-0.5 rounded mb-2">
                          {b.cost}
                        </span>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technique Burnout & Recovery Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Burnout Card */}
              <div className="rounded-3xl bg-[#12131A] border border-amber-900/30 p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-amber-300 font-display mb-2 flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>{rulesData.domainExpansion.burnout.title}</span>
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    {rulesData.domainExpansion.burnout.desc}
                  </p>
                  
                  <div className="space-y-2.5">
                    {rulesData.domainExpansion.burnout.effects.map((eff, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#0A0A0C] border border-[#202332] text-xs">
                        <span className="font-bold text-white block mb-0.5">{eff.name}</span>
                        <span className="text-slate-400 text-[11px] font-sans leading-relaxed">{eff.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Burnout Recovery via RCT */}
              <div className="rounded-3xl bg-gradient-to-br from-[#151224] to-[#0A0A0E] border border-purple-500/40 p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold mb-3">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Bí Thuật Đỉnh Cao Của Gojo &amp; Sukuna</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mb-2">
                    {rulesData.domainExpansion.burnout.recovery.title}
                  </h3>
                  <div className="text-[11px] font-mono text-amber-300 mb-3 bg-[#0A0A0C] p-2.5 rounded-xl border border-[#242738]">
                    Yêu cầu: {rulesData.domainExpansion.burnout.recovery.req}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-line">
                    {rulesData.domainExpansion.burnout.recovery.desc}
                  </p>
                </div>
              </div>

            </div>

            {/* Refinement Table (0 - 1000) */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2 flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Bảng Điểm Tinh Xảo Lãnh Địa (0 – 1000)</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Điểm Tinh Xảo (1 đến 1000) là thước đo độ hoàn thiện kết giới. Càng đạt điểm cao, Lãnh địa càng mở khoá các cơ chế chiến đấu tối thượng:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#202332]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-28">Refinement</th>
                      <th className="px-4 py-3 font-semibold w-52">Đặc Quyền (Perk)</th>
                      <th className="px-4 py-3 font-semibold">Mô Tả Chi Tiết</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.domainExpansion.refinementTable.slice(1).map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/20">
                        <td className="px-4 py-3 font-mono font-bold text-amber-300">{row[0]}</td>
                        <td className="px-4 py-3 font-display font-bold text-white">{row[1]}</td>
                        <td className="px-4 py-3 font-sans text-slate-300 leading-relaxed">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Domain Clashes Table & Barrierless Domain */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Domain Clashes */}
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
                <h3 className="text-base font-bold text-white font-display mb-2 flex items-center space-x-2">
                  <Crosshair className="w-4 h-4 text-cyan-400" />
                  <span>Tranh Chấp Lãnh Địa (Domain Clash)</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-3">
                  Khi hai lãnh địa mở cùng lúc, đòn tất trúng Sure-Hit của cả hai bị triệt tiêu lẫn nhau. Bên có điểm Refinement cao hơn sẽ dần áp đảo và phá huỷ lãnh địa đối phương theo số round dưới đây:
                </p>

                <div className="overflow-x-auto rounded-xl border border-[#202332]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                      <tr>
                        <th className="px-3 py-2 font-semibold">Độ Chênh Lệch Điểm</th>
                        <th className="px-3 py-2 font-semibold">Số Round Phá Huỷ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C1E2B]">
                      {rulesData.domainExpansion.clashTable.slice(1).map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/20">
                          <td className="px-3 py-2 font-mono text-cyan-300 font-bold">{row[0]}</td>
                          <td className="px-3 py-2 font-mono text-amber-300 font-bold">{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Barrierless Domain */}
              <div className="rounded-3xl bg-gradient-to-br from-[#1C1322] to-[#0A0A0C] border border-red-500/30 p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-mono font-bold mb-3">
                    <span>Thần Kỹ • 神技</span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    {rulesData.domainExpansion.barrierlessDomain.title}
                  </h3>
                  <div className="text-[11px] font-mono text-red-300 mb-3 bg-[#0A0A0C] p-2.5 rounded-xl border border-red-900/30">
                    {rulesData.domainExpansion.barrierlessDomain.req}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
                    {rulesData.domainExpansion.barrierlessDomain.desc}
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                    {rulesData.domainExpansion.barrierlessDomain.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-red-900/30 text-[11px] text-slate-400 font-sans">
                  <strong className="text-white">Lãnh địa bán hoàn thiện (Incomplete Domain):</strong> {rulesData.domainExpansion.incompleteDomains.desc}
                </div>
              </div>

            </div>

          </div>
        )}
            {/* ========================================================= */}

        {/* TAB 5: LIMB DAMAGE TABLE */}
        {/* ========================================================= */}
        {activeSection === 'limb-damage' && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#201014] via-[#150F11] to-[#0A0A0C] border border-red-900/40 relative overflow-hidden shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30 mb-3 inline-block">
                Quy Tắc Tàn Khốc Thực Chiến • 部位欠損
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {rulesData.combatAndLimbDamage.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl font-sans">
                Bảng tổn thương đứt rời chi thể, quy tắc sinh lý chú linh siêu hình, thức thần và thiên dữ chú phược.
              </p>
            </div>

            {/* Limb Damage Table */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
              <h3 className="text-base sm:text-lg font-bold text-red-400 font-display mb-2 flex items-center space-x-2">
                <Skull className="w-5 h-5 text-red-500" />
                <span>Bảng Sát Thương Đứt Chi (1d6)</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Chỉ áp dụng với các chiêu thức có hiệu ứng chặt chém/phá huỷ chi cụ thể. Để làm đứt lìa chi hoàn toàn đòi hỏi sát thương gấp đôi ngưỡng yêu cầu:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#202332]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                    <tr>
                      <th className="px-3 py-3 font-semibold w-16">1d6</th>
                      <th className="px-4 py-3 font-semibold w-32">Bộ Phận</th>
                      <th className="px-4 py-3 font-semibold w-36">Ngưỡng Yêu Cầu</th>
                      <th className="px-4 py-3 font-semibold">Gãy Chi (Broken Limb)</th>
                      <th className="px-4 py-3 font-semibold">Đứt Lìa Chi (Lost Limb)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.combatAndLimbDamage.limbDamageTable.slice(1).map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-red-950/20">
                        <td className="px-3 py-3 font-mono font-bold text-red-400">{row[0]}</td>
                        <td className="px-4 py-3 font-display font-bold text-white">{row[1]}</td>
                        <td className="px-4 py-3 font-mono text-cyan-300 font-bold">{row[2]}</td>
                        <td className="px-4 py-3 font-sans text-amber-300">{row[3]}</td>
                        <td className="px-4 py-3 font-sans text-red-400 font-bold">{row[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cursed Spirits Nature in Combat */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
              <h3 className="text-base font-bold text-white font-display mb-3 flex items-center space-x-2">
                <Skull className="w-4 h-4 text-purple-400" />
                <span>Đặc Tính Chiến Đấu Của Chú Linh</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {rulesData.combatAndLimbDamage.curseNature.map((cn, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0A0C] border border-[#202332]">
                    <span className="font-bold text-purple-300 block mb-1">{cn.trait}</span>
                    <span className="text-slate-300 font-sans leading-relaxed text-[11px]">{cn.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shikigami & Heavenly Restriction Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Shikigami Nature */}
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
                <h3 className="text-base font-bold text-cyan-300 font-display mb-3 flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>Quy Tắc Thức Thần</span>
                </h3>
                <div className="space-y-2.5 text-xs">
                  {rulesData.combatAndLimbDamage.shikigamiNature.map((sn, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#0A0A0C] border border-[#202332]">
                      <span className="font-bold text-white block mb-0.5">{sn.trait}</span>
                      <span className="text-slate-400 text-[11px] font-sans leading-relaxed">{sn.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heavenly Restriction Combat */}
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
                <h3 className="text-base font-bold text-amber-300 font-display mb-3 flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Chiến Đấu Của Thiên Dữ Chú Phược (Toji &amp; Maki)</span>
                </h3>
                <div className="space-y-2.5 text-xs">
                  {rulesData.combatAndLimbDamage.heavenlyRestriction.map((hr, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#0A0A0C] border border-[#202332]">
                      <span className="font-bold text-white block mb-0.5">{hr.trait}</span>
                      <span className="text-slate-400 text-[11px] font-sans leading-relaxed">{hr.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Fall Damage Table */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
              <h3 className="text-base font-bold text-white font-display mb-2">Bảng Sát Thương Ngã Theo Kích Cỡ (Fall Damage Table)</h3>
              <p className="text-xs text-slate-400 font-sans mb-3">
                Mỗi 10ft rơi tự do gây sát thương Bludgeoning tương ứng theo size category của sinh vật hoặc vật thể:
              </p>
              <div className="overflow-x-auto rounded-xl border border-[#202332]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                    <tr>
                      {rulesData.combatAndLimbDamage.fallDamageTable[0].map((c, i) => (
                        <th key={i} className="px-4 py-2 font-semibold">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.combatAndLimbDamage.fallDamageTable.slice(1).map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20">
                        <td className="px-4 py-2 font-display text-white font-bold">{row[0]}</td>
                        <td className="px-4 py-2 font-mono text-cyan-300 font-bold">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* JJK Special Status Conditions */}
            {rulesData.combatAndLimbDamage.conditions && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
                <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-amber-400" />
                  <span>Bảng Tra Cứu Trạng Thái Đặc Thù Chú Thuật</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-4">
                  Các trạng thái chiến đấu đặc thù của Jujutsu Kaisen 5e bổ trợ cho các trạng thái chuẩn của D&amp;D 5e:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {rulesData.combatAndLimbDamage.conditions.map((cond, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0A0A0C] border border-[#202332] flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-amber-300 font-display text-sm">{cond.name}</span>
                        </div>
                        <div className="text-[10px] font-mono text-purple-300 mb-1.5">Nguồn: {cond.source}</div>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed">{cond.effect}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
            {/* ========================================================= */}

        {/* TAB 6: MAXIMUM OUTPUT */}
        {/* ========================================================= */}
        {activeSection === 'maximum-output' && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171D24] via-[#101418] to-[#0A0A0C] border border-cyan-800/40 relative overflow-hidden shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3 inline-block">
                Xuất Lực Cực Hạn • 極大出力
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {rulesData.maximumOutput.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl font-sans">
                {rulesData.maximumOutput.description}
              </p>
            </div>

            {/* Maximum Output Activation Card */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-cyan-300 font-display mb-2 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>Kích Hoạt Maximum Output (Xuất Lực Cực Đại)</span>
              </h3>
              <div className="flex flex-wrap gap-2 mb-4 text-xs font-mono">
                <span className="px-3 py-1 rounded-lg bg-[#0A0A0C] border border-[#202332] text-amber-300 font-bold">
                  Điều kiện: {rulesData.maximumOutput.activation.req}
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#0A0A0C] border border-[#202332] text-cyan-300 font-bold">
                  Chi phí: {rulesData.maximumOutput.activation.cost}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {rulesData.maximumOutput.activation.benefits.map((b, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0A0C] border border-[#202332] flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 font-sans leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reduced Output Table */}
            <div className="rounded-3xl bg-[#12131A] border border-amber-900/30 p-6 shadow-xl overflow-hidden">
              <h3 className="text-base sm:text-lg font-bold text-amber-300 font-display mb-2 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Bảng 9 Tầng Giảm Xuất Lực (Reduced Output)</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Nếu dùng Maximum Output nhiều hơn 1 lần trong round hoặc khi đang duy trì chiêu Maximum Output khác, nhân vật phải đổ CE Check DC 15 (+2 DC mỗi tầng đang có). Thất bại sẽ nhận tầng Reduced Output:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#202332]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-28">Tầng Quá Tải</th>
                      <th className="px-4 py-3 font-semibold w-36">Giảm Xuất Lực</th>
                      <th className="px-4 py-3 font-semibold">Hình Phạt Xúc Xắc / Bán Kính / Trần CE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.maximumOutput.reducedOutputTable.slice(1).map((row, idx) => (
                      <tr key={idx} className="hover:bg-amber-950/20">
                        <td className="px-4 py-3 font-mono font-bold text-amber-400">{row[0]}</td>
                        <td className="px-4 py-3 font-mono font-bold text-rose-400">{row[1]}</td>
                        <td className="px-4 py-3 font-sans text-slate-300 leading-relaxed">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 p-3.5 rounded-xl bg-[#0A0A0C] border border-[#202332] text-xs text-slate-300 font-sans flex items-center space-x-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong className="text-white">Cách hoá giải Quá Tải:</strong> {rulesData.maximumOutput.recovery}</span>
              </div>
            </div>


          </div>
        )}
            {/* ========================================================= */}

        {/* TAB 7: THE ZONE */}
        {/* ========================================================= */}
        {activeSection === 'the-zone' && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#241334] via-[#170E24] to-[#0A0A0E] border border-purple-500/50 relative overflow-hidden shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3 inline-block">
                Cảnh Giới Tuyệt Đối • 120% Tiềm Năng • ゾーン
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {rulesData.breakthroughs.theZone.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl font-sans">
                {rulesData.breakthroughs.theZone.desc}
              </p>
            </div>

            {/* Core Mechanics & Benefits */}
            <div className="rounded-3xl bg-[#12131A] border border-purple-500/30 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-2 text-purple-300 font-display font-bold text-base sm:text-lg mb-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>6 Đặc Quyền Siêu Phàm Trong Trạng Thái The Zone</span>
              </div>
              <p className="text-xs text-slate-400 font-sans mb-6">
                {rulesData.breakthroughs.theZone.duration}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rulesData.breakthroughs.theZone.benefits.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#0E0F16] border border-purple-900/40 flex items-start space-x-3">
                    <div className="w-7 h-7 rounded-lg bg-purple-950/60 border border-purple-800/50 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-mono font-bold text-purple-400">0{idx + 1}</span>
                    </div>
                    <span className="text-xs text-purple-100 font-sans leading-relaxed pt-0.5">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* The Zone Lore & Connection Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-[#0E0F16] border border-[#232636]">
                <h4 className="text-sm font-bold text-amber-300 font-display mb-2 flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Kích Hoạt Liên Hoàn Hắc Thiểm</span>
                </h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Khi bước vào The Zone, việc nhận <strong className="text-purple-300">+1 Black Flash Range</strong> giúp mở rộng xác suất tiếp tục tung ra Hắc Thiểm trong các lượt tiếp theo. Mỗi đòn Hắc Thiểm tung ra thành công sẽ tiếp tục làm mới và <strong className="text-amber-300">cộng dồn thời gian duy trì của The Zone</strong> thêm 1 phút!
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#0E0F16] border border-[#232636]">
                <h4 className="text-sm font-bold text-cyan-300 font-display mb-2 flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-emerald-400" />
                  <span>Cứu Nguy Khẩn Cấp Bằng The Zone</span>
                </h4>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Ngay tại thời khắc chạm tới The Zone, cơ thể Chú thuật sư tự động được thanh tẩy: <strong className="text-emerald-300">xoá bỏ ngay lập tức Technique Burnout</strong> (không cần chờ 1 phút) và <strong className="text-cyan-300">làm đầy lập tức 100% bể máu Phản Chuyển (RCT Pool)</strong>, tạo nên những màn lội ngược dòng kinh điển như trong đại chiến Shinjuku.
                </p>
              </div>
            </div>


          </div>
        )}
            {/* ========================================================= */}

        {/* TAB 8: RULES OF THUMB */}
        {/* ========================================================= */}
        {activeSection === 'rules-of-thumb' && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171824] via-[#101117] to-[#0A0A0C] border border-[#232636] relative overflow-hidden shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-3 inline-block">
                Quy Tắc Chỉ Dẫn Cốt Lõi • 基本指針
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                Rules of Thumb (Quy Tắc Chỉ Dẫn Cốt Lõi)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl font-sans">
                Bộ quy tắc kinh nghiệm nền tảng trong thế giới Jujutsu Kaisen: Hệ thống phân cấp &amp; thăng chức, bảng định giá chú cụ &amp; thù lao nhiệm vụ, bản chất Thực thể Chú linh - Thức thần, cùng quy tắc nhận thức và sát thương linh hồn.
              </p>
            </div>

            {/* 14 Rules of Thumb Topics Index Bar */}
            <div className="p-5 rounded-3xl bg-[#0E0F16] border border-[#232636]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-white font-display flex items-center space-x-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>14 Chuyên Đề Cốt Lõi Rules of Thumb</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Nhấp vào từng mục để chuyển nhanh chuyên đề tương ứng</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {[
                  { name: '1. Grading System', target: 'rules-of-thumb', sub: 'Hệ Thống Phân Cấp' },
                  { name: '2. Cursed Techniques', target: 'cursed-energy', sub: 'Bản Chất Thuật Thức' },
                  { name: '3. Technique Burnout', target: 'domain-expansion', sub: 'Kiệt Sức Thuật Thức' },
                  { name: '4. Cursed Spirits', target: 'rules-of-thumb', sub: 'Bản Chất Chú Linh' },
                  { name: '5. Shikigami', target: 'rules-of-thumb', sub: 'Quy Tắc Thức Thần' },
                  { name: '6. Heavenly Restrict.', target: 'rules-of-thumb', sub: 'Thiên Dữ Chú Phược' },
                  { name: '7. Falling', target: 'optional-rules', sub: 'Sát Thương Rơi' },
                  { name: '8. Action Economy', target: 'optional-rules', sub: 'Cơ Cấu Hành Động' },
                  { name: '9. Actions', target: 'optional-rules', sub: 'Hành Động Đặc Thù' },
                  { name: '10. Barriers', target: 'domain-expansion', sub: 'Kết Giới & Màn' },
                  { name: '11. Reincarnated', target: 'rules-of-thumb', sub: 'Tái Sinh & Đoạt Xá' },
                  { name: '12. Domain Expansion', target: 'domain-expansion', sub: 'Bành Trướng Lãnh Địa' },
                  { name: '13. Incomplete Domain', target: 'domain-expansion', sub: 'Lãnh Địa Bất Toàn' },
                  { name: '14. Soul Damage', target: 'rules-of-thumb', sub: 'Sát Thương Linh Hồn' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSection(item.target)}
                    className="p-2.5 rounded-xl bg-[#141520] hover:bg-[#1E2030] border border-[#202332] hover:border-purple-500/40 text-left transition-all group flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-bold text-white group-hover:text-purple-300 font-display line-clamp-1">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-slate-400 font-sans mt-0.5 line-clamp-1">
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 1. Grading System Table */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2 flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Thang Đo Tiêu Chuẩn Phân Cấp Chú Thuật</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Thước đo chuẩn trong Jujutsu Kaisen để so sánh độ nguy hiểm của Chú linh và sức mạnh Chú thuật sư với các vũ khí quân sự quy ước:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#202332]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-32">Cấp Bậc</th>
                      <th className="px-4 py-3 font-semibold">Mô Tả &amp; Đối Tượng</th>
                      <th className="px-4 py-3 font-semibold w-28">Khoảng CR</th>
                      <th className="px-4 py-3 font-semibold w-64">Thước Đo Chuẩn (Benchmark)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.gradingAndDMRules.gradingTable.slice(1).map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20">
                        <td className="px-4 py-3 font-mono font-bold text-purple-300">{row[0]}</td>
                        <td className="px-4 py-3 font-sans text-slate-300">{row[1]}</td>
                        <td className="px-4 py-3 font-mono text-cyan-300 font-bold">{row[2]}</td>
                        <td className="px-4 py-3 font-sans font-bold text-amber-300">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Promotion System Card */}
            {rulesData.gradingAndDMRules.promotionSystem && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
                <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span>{rulesData.gradingAndDMRules.promotionSystem.title}</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-4">
                  Quy trình nghiêm ngặt của Hội Đồng Chú Thuật để thăng cấp từ Cấp 4 lên Cấp 1, và ngoại lệ của Đặc Cấp:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rulesData.gradingAndDMRules.promotionSystem.steps.map((st, sIdx) => (
                    <div key={sIdx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#202332] flex flex-col justify-between">
                      <div>
                        <span className="font-bold text-purple-300 font-display text-xs block mb-1.5">
                          {st.stage}
                        </span>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed">
                          {st.rule}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Cursed Tool Pricing Table */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
              <h3 className="text-base font-bold text-amber-300 font-display mb-3 flex items-center space-x-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Định Giá &amp; Phân Cấp Chú Cụ (Cursed Tool Pricing &amp; Rarity)</span>
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[#202332]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Phân Cấp</th>
                      <th className="px-3 py-2 font-semibold">Độ Hiếm</th>
                      <th className="px-3 py-2 font-semibold">Mô Tả &amp; Uy Lực</th>
                      <th className="px-3 py-2 font-semibold">Khung Giá ($ USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.gradingAndDMRules.cursedToolPricing.slice(1).map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20">
                        <td className="px-3 py-2 font-mono font-bold text-white">{row[0]}</td>
                        <td className="px-3 py-2 font-mono text-slate-400">{row[1]}</td>
                        <td className="px-3 py-2 font-sans text-slate-300 text-xs">{row[2]}</td>
                        <td className="px-3 py-2 font-mono text-emerald-300 font-bold">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Mission Payouts Table */}
            {rulesData.gradingAndDMRules.missionPayouts && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
                <h3 className="text-base font-bold text-emerald-300 font-display mb-2 flex items-center space-x-2">
                  <Coins className="w-4 h-4 text-emerald-400" />
                  <span>Bảng Thù Lao Nhiệm Vụ Diệt Trừ</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-3">
                  Mức thù lao tài chính chính thức chi trả cho Chú thuật sư sau khi hoàn thành nhiệm vụ thanh trừng theo từng cấp bậc:
                </p>
                <div className="overflow-x-auto rounded-xl border border-[#202332]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                      <tr>
                        <th className="px-3 py-2 font-semibold w-40">Cấp Bậc Nhiệm Vụ</th>
                        <th className="px-3 py-2 font-semibold w-48 text-emerald-300">Khung Thù Lao ($ USD)</th>
                        <th className="px-3 py-2 font-semibold">Tính Chất &amp; Quy Mô Nhiệm Vụ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C1E2B]">
                      {rulesData.gradingAndDMRules.missionPayouts.map((mp, mIdx) => (
                        <tr key={mIdx} className="hover:bg-slate-800/20">
                          <td className="px-3 py-2 font-mono font-bold text-purple-300">{mp.grade}</td>
                          <td className="px-3 py-2 font-mono font-bold text-emerald-300">{mp.payout}</td>
                          <td className="px-3 py-2 font-sans text-slate-300 text-xs">{mp.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. Cursed Spirits & Shikigami Section */}
            {rulesData.gradingAndDMRules.cursedSpiritsAndShikigami && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
                    <Ghost className="w-5 h-5 text-indigo-400" />
                    <span>{rulesData.gradingAndDMRules.cursedSpiritsAndShikigami.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-1">
                    Hai dạng thực thể siêu nhiên đối lập trong hệ thống Chú thuật: Chú linh hình thành từ bóng tối tâm lý và Thức thần do Chú thuật sư làm chủ.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cursed Spirits Box */}
                  <div className="p-5 rounded-2xl bg-[#0E0F16] border border-rose-900/30 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-rose-300 font-display">
                          {rulesData.gradingAndDMRules.cursedSpiritsAndShikigami.cursedSpirits.title}
                        </h4>
                        <span className="font-kanji text-xs text-rose-400 font-bold">
                          {rulesData.gradingAndDMRules.cursedSpiritsAndShikigami.cursedSpirits.kanji}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans italic mb-4">
                        {rulesData.gradingAndDMRules.cursedSpiritsAndShikigami.cursedSpirits.origin}
                      </p>
                      <div className="space-y-3">
                        {rulesData.gradingAndDMRules.cursedSpiritsAndShikigami.cursedSpirits.rules.map((cr, cIdx) => (
                          <div key={cIdx} className="p-3 rounded-xl bg-[#141520] border border-[#202332]">
                            <span className="font-bold text-rose-200 text-xs block mb-1 font-display">{cr.name}</span>
                            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{cr.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Shikigami Box */}
                  <div className="p-5 rounded-2xl bg-[#0E0F16] border border-cyan-900/30 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-cyan-300 font-display">
                          {rulesData.gradingAndDMRules.cursedSpiritsAndShikigami.shikigami.title}
                        </h4>
                        <span className="font-kanji text-xs text-cyan-400 font-bold">
                          {rulesData.gradingAndDMRules.cursedSpiritsAndShikigami.shikigami.kanji}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans italic mb-4">
                        {rulesData.gradingAndDMRules.cursedSpiritsAndShikigami.shikigami.origin}
                      </p>
                      <div className="space-y-3">
                        {rulesData.gradingAndDMRules.cursedSpiritsAndShikigami.shikigami.rules.map((sr, sIdx) => (
                          <div key={sIdx} className="p-3 rounded-xl bg-[#141520] border border-[#202332]">
                            <span className="font-bold text-cyan-200 text-xs block mb-1 font-display">{sr.name}</span>
                            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">{sr.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. Soul Awareness & Soul Damage */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
              <h3 className="text-base sm:text-lg font-bold text-purple-300 font-display mb-2 flex items-center space-x-2">
                <Eye className="w-5 h-5 text-purple-400" />
                <span>Nhận Thức Linh Hồn &amp; Sát Thương Linh Hồn (Soul Awareness &amp; Damage)</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-3">
                {rulesData.soulAwareness.soulDamageRules || 'Sát thương Linh Hồn (Soul Damage) trừ trực tiếp vào Max HP và vô hiệu hoá RCT.'}
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#202332]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-24">Cấp Độ</th>
                      <th className="px-4 py-3 font-semibold w-52">Kỹ Năng Linh Hồn</th>
                      <th className="px-4 py-3 font-semibold">Hiệu Quả Chiến Đấu Thực Tế</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.soulAwareness.levels.slice(1).map((row, idx) => (
                      <tr key={idx} className="hover:bg-purple-950/20">
                        <td className="px-4 py-3 font-mono font-bold text-purple-400">{row[0]}</td>
                        <td className="px-4 py-3 font-display font-bold text-white">{row[1]}</td>
                        <td className="px-4 py-3 font-sans text-slate-300 leading-relaxed">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 7. Reincarnated Soul Contest */}
            {rulesData.soulAwareness.reincarnatedRules && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
                <h3 className="text-base font-bold text-purple-300 font-display mb-2 flex items-center space-x-2">
                  <User className="w-5 h-5 text-purple-400" />
                  <span>{rulesData.soulAwareness.reincarnatedRules.title}</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-4 leading-relaxed">
                  {rulesData.soulAwareness.reincarnatedRules.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rulesData.soulAwareness.reincarnatedRules.rules.map((rr, rIdx) => (
                    <div key={rIdx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#202332]">
                      <span className="font-bold text-cyan-300 font-display text-xs block mb-1.5">
                        {rr.name}
                      </span>
                      <p className="text-slate-300 text-xs font-sans leading-relaxed">
                        {rr.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. Object Soul Awareness Table (Maki & Toji) */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
              <h3 className="text-base font-bold text-cyan-300 font-display mb-2">
                Nhận Thức Linh Hồn Đồ Vật Vô Cơ (Object Soul Awareness — Maki &amp; Toji)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-[#202332]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold w-24">Cấp Độ</th>
                      <th className="px-4 py-2.5 font-semibold w-60">Kỹ Năng Đồ Vật</th>
                      <th className="px-4 py-2.5 font-semibold">Hiệu Quả</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.soulAwareness.objectSoulLevels.slice(1).map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20">
                        <td className="px-4 py-2.5 font-mono font-bold text-cyan-400">{row[0]}</td>
                        <td className="px-4 py-2.5 font-display font-bold text-white">{row[1]}</td>
                        <td className="px-4 py-2.5 font-sans text-slate-300 leading-relaxed">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 9. Heavenly Restriction (Thiên Dữ Chú Phược) */}
            {rulesData.combatAndLimbDamage.heavenlyRestriction && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
                <h3 className="text-base sm:text-lg font-bold text-amber-300 font-display mb-2 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span>Thiên Dữ Chú Phược (Heavenly Restriction • 天与呪縛)</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-4 leading-relaxed">
                  Một dạng ràng buộc cưỡng chế bẩm sinh: từ bỏ hoàn toàn chú lực (0 CE) để đổi lấy thể chất siêu phàm đạt đến cảnh giới phi nhân loại, ngũ giác sắc bén phi thường, hoặc ngược lại (Kokichi Muta / Mechamaru đánh đổi thể xác tàn tật lấy tầm bao phủ chú lực toàn quốc).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {rulesData.combatAndLimbDamage.heavenlyRestriction.map((hr, hIdx) => (
                    <div key={hIdx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#202332] flex flex-col justify-between">
                      <div>
                        <span className="font-bold text-amber-300 font-display text-xs block mb-1.5">
                          {hr.trait}
                        </span>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed">
                          {hr.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 9: COMBAT & ACTION ECONOMY */}
        {/* ========================================================= */}
        {activeSection === 'optional-rules' && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171824] via-[#101117] to-[#0A0A0C] border border-[#232636] relative overflow-hidden shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3 inline-block">
                Hệ Thống Chiến Đấu • 戦闘行動
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                Combat &amp; Action Economy (Hành Động &amp; Cơ Chế Chiến Đấu)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl font-sans">
                Bộ quy tắc hành động chuẩn trong lượt của JJK 5e, danh mục các hành động đặc thù (Imbue, Clash, Calling Shots), bảng sát thương rơi tự do theo kích cỡ sinh vật và các tuỳ biến chiến đấu tàn khốc của DM.
              </p>
            </div>

            {/* 1. Action Economy Overview */}
            {rulesData.gradingAndDMRules.actionEconomy && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
                <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-amber-400" />
                  <span>{rulesData.gradingAndDMRules.actionEconomy.title}</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-4">
                  {rulesData.gradingAndDMRules.actionEconomy.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {rulesData.gradingAndDMRules.actionEconomy.components.map((ac, aIdx) => (
                    <div key={aIdx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#202332] flex flex-col justify-between">
                      <div>
                        <span className="font-bold text-amber-300 font-display text-xs block mb-1">
                          {ac.type}
                        </span>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed">
                          {ac.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Special Combat Actions */}
            {rulesData.gradingAndDMRules.combatActions && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
                <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2 flex items-center space-x-2">
                  <Swords className="w-5 h-5 text-cyan-400" />
                  <span>Danh Mục Hành Động Chiến Đấu Đặc Thù</span>
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-4">
                  Các hành động chuyên biệt được các Chú thuật sư sử dụng thường xuyên trong giao tranh:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rulesData.gradingAndDMRules.combatActions.map((ca, cIdx) => (
                    <div key={cIdx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#202332] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-cyan-300 font-display text-xs">{ca.name}</span>
                          <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-1.5 py-0.2 rounded border border-purple-800/30">{ca.type}</span>
                        </div>
                        <p className="text-slate-300 text-xs font-sans leading-relaxed">{ca.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Falling & Collision Rules */}
            {rulesData.gradingAndDMRules.fallingRules && (
              <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-rose-300 font-display flex items-center space-x-2 mb-1">
                    <ArrowDown className="w-5 h-5 text-rose-400" />
                    <span>{rulesData.gradingAndDMRules.fallingRules.title}</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Tốc độ rơi chuẩn: <strong className="text-white">{rulesData.gradingAndDMRules.fallingRules.speed}</strong> | Ngưỡng tối đa: <strong className="text-white">{rulesData.gradingAndDMRules.fallingRules.maxDistance}</strong>. {rulesData.gradingAndDMRules.fallingRules.condition}
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#202332]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                      <tr>
                        <th className="px-3 py-2 font-semibold">Kích Cỡ Sinh Vật</th>
                        <th className="px-3 py-2 font-semibold text-rose-300">Sát Thương / 10 ft Rơi</th>
                        <th className="px-3 py-2 font-semibold text-amber-300">Sát Thương Tối Đa (200 ft)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C1E2B]">
                      {rulesData.gradingAndDMRules.fallingRules.damageTable.slice(1).map((fr, fIdx) => (
                        <tr key={fIdx} className="hover:bg-slate-800/20">
                          <td className="px-3 py-2 font-mono font-bold text-white">{fr[0]}</td>
                          <td className="px-3 py-2 font-mono font-bold text-rose-300">{fr[1]}</td>
                          <td className="px-3 py-2 font-mono text-amber-300">{fr[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0A0A0C] border border-[#202332] text-xs font-sans text-slate-300 leading-relaxed">
                  <strong className="text-cyan-300 block mb-1">Va Chạm Đè Người (Fall Collision):</strong>
                  {rulesData.gradingAndDMRules.fallingRules.collisionRule}
                </div>
              </div>
            )}

            {/* 4. DM House Rules */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl">
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2 flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <span>Các Cơ Chế Chiến Đấu Bổ Trợ Của DM</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Các quy tắc tùy chọn chính thức từ tác giả JJK 5e giúp trận chiến thêm phần kịch tính và tàn khốc:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {rulesData.gradingAndDMRules.dmOptionalRules.map((op, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#0E0F16] border border-[#202332] flex flex-col justify-between">
                    <div>
                      <span className="font-bold text-cyan-300 block mb-1 font-display text-sm">{op.name}</span>
                      <span className="text-slate-300 text-xs font-sans leading-relaxed">{op.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        )}
            {/* ========================================================= */}

        {/* TAB 10: MULTICLASSING RULES */}
        {/* ========================================================= */}{activeSection === 'multiclassing' && (
          <div className="space-y-6">
            
            {/* Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171824] via-[#101117] to-[#0A0A0C] border border-[#232636] relative overflow-hidden shadow-2xl">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3 inline-block">
                Tiến Trình Kết Hợp • 複業規則
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                {rulesData.multiclassing?.title || 'Quy Tắc Đa Lớp Nhân Vật'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl font-sans">
                {rulesData.multiclassing?.description}
              </p>
            </div>

            {/* Prerequisites Table */}
            <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Bảng Điều Kiện Chỉ Số Tối Thiểu (Stat Prerequisites: 13+)</span>
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-4">
                Để đủ điều kiện phân bổ cấp độ vào một Lớp nhân vật mới, nhân vật cần đáp ứng chỉ số tối thiểu (thường là 13) ở cả Lớp hiện tại và Lớp dự định đa lớp:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-[#232636]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0E0F16] text-slate-400 font-mono uppercase text-[10px] border-b border-[#232636]">
                    <tr>
                      <th className="px-4 py-3">Lớp Nhân Vật</th>
                      <th className="px-4 py-3">Điều Kiện Điểm Chỉ Số</th>
                      <th className="px-4 py-3">Định Vị &amp; Vai Trò</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1C1E2B]">
                    {rulesData.multiclassing?.prerequisites?.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/20">
                        <td className="px-4 py-3 font-bold text-white font-display">{row.class}</td>
                        <td className="px-4 py-3 font-mono text-cyan-300 font-bold">{row.stat}</td>
                        <td className="px-4 py-3 font-sans text-slate-300">{row.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Core Rules Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rulesData.multiclassing?.rules?.map((rule, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#0E0F16] border border-[#232636] shadow-lg flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-amber-300 font-display mb-2 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{rule.title}</span>
                    </h4>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Dynamic Single Original English Rulebook Text Toggle */}
        {activeRawEnglish && (
          <details className="mt-8 rounded-3xl bg-[#0E0F16] border border-[#232636] p-5 group/orig shadow-xl">
            <summary className="text-xs font-mono text-purple-400 hover:text-purple-300 cursor-pointer list-none flex items-center justify-between transition-colors">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-purple-400 group-open/orig:rotate-90 transition-transform">▶</span>
                <span className="font-bold">📄 Văn bản quy tắc gốc tiếng Anh (Original Rulebook: {currentSectionObj.title})</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Bấm để mở / thu gọn</span>
            </summary>
            <div className="mt-4 p-4 rounded-2xl bg-black/60 border border-white/5 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
              {activeRawEnglish}
            </div>
          </details>
        )}

        {/* Bottom Prev / Next Navigator */}
        <div className="mt-12 pt-6 border-t border-[#232636] flex items-center justify-between gap-4">
          {prevSection ? (
            <button
              onClick={() => {
                setActiveSection(prevSection.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-3 px-4 py-3 rounded-2xl bg-[#12131A] hover:bg-[#181924] border border-[#232636] hover:border-purple-500/40 text-slate-300 hover:text-white transition-all group shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Mục trước</div>
                <div className="text-xs font-bold font-display">{prevSection.title}</div>
                <div className="text-[10px] text-slate-400 font-sans">{prevSection.vi}</div>
              </div>
            </button>
          ) : <div />}

          {nextSection && (
            <button
              onClick={() => {
                setActiveSection(nextSection.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-3 px-4 py-3 rounded-2xl bg-[#12131A] hover:bg-[#181924] border border-[#232636] hover:border-purple-500/40 text-slate-300 hover:text-white transition-all group ml-auto shadow-lg"
            >
              <div className="text-right">
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Mục tiếp theo</div>
                <div className="text-xs font-bold font-display">{nextSection.title}</div>
                <div className="text-[10px] text-slate-400 font-sans">{nextSection.vi}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
