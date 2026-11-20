import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Swords, 
  DollarSign, 
  Search, 
  Flame, 
  User, 
  Zap, 
  Package, 
  Hammer, 
  Sparkles,
  Info,
  CheckCircle2,
  Crosshair
} from 'lucide-react';
import equipmentData from '../data/equipment.json';
import { useTheme } from '../context/ThemeContext';
import GDocButton from './GDocButton';

export default function EquipmentView({ activeTab: propTab, setActiveTab: propSetTab }) {
  const [internalTab, setInternalTab] = useState('cursed-tools');
  const activeTab = propTab || internalTab;
  const setActiveTab = propSetTab || setInternalTab;
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [search, setSearch] = useState('');
  const { currentTheme } = useTheme();

  const gradeColors = {
    '4th Grade Tools': 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    '3rd Grade Tools': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    '2nd Grade Tools': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    '1st Grade Tools': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    'Special Grade Tools': 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20',
  };

  const filteredTools = useMemo(() => {
    const q = search.trim().toLowerCase();
    return equipmentData.cursedTools.filter(tool => {
      const matchSearch = !q || (
        tool.name.toLowerCase().includes(q) ||
        (tool.vietnameseName && tool.vietnameseName.toLowerCase().includes(q)) ||
        (tool.character && tool.character.toLowerCase().includes(q)) ||
        tool.description.toLowerCase().includes(q)
      );
      const matchGrade = selectedGrade === 'all' || tool.grade === selectedGrade;
      return matchSearch && matchGrade;
    });
  }, [search, selectedGrade]);

  const gradesList = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Special Grade Tools', label: 'Đặc Cấp (Special)' },
    { id: '1st Grade Tools', label: 'Cấp 1 (Grade 1)' },
    { id: '2nd Grade Tools', label: 'Cấp 2 (Grade 2)' },
    { id: '3rd Grade Tools', label: 'Cấp 3 (Grade 3)' },
    { id: '4th Grade Tools', label: 'Cấp 4 (Grade 4)' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Decorative Watermark */}
      <div className="absolute right-6 top-8 font-kanji font-black text-7xl text-white/[0.02] pointer-events-none select-none hidden lg:block">
        特級呪具
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Equipment &amp; Cursed Tools
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
          Kho trang bị hiện đại, áo giáp bảo hộ, kho vũ khí chiến đấu, các gói khởi đầu Chú thuật sư và Chú cụ từ Cấp 4 đến Đặc cấp.
        </p>
      </div>

      {/* Main Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#232636] pb-4 mb-8 gap-3">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'cursed-tools', label: 'Chú Cụ (Cursed Tools)', kanji: '呪具', icon: Flame, count: equipmentData.cursedTools.length },
            { id: 'packs', label: 'Gói Khởi Đầu (Equipment Packs)', kanji: '装備', icon: Package, count: equipmentData.equipmentPacks?.length || 7 },
            { id: 'semi-cursed', label: 'Rèn Bán Chú Cụ & Biến Thể', kanji: '鍛造', icon: Hammer, count: equipmentData.semiCursedRules?.table?.length || 4 },
            { id: 'armor', label: 'Áo Giáp & Khiên', kanji: '防具', icon: Shield, count: equipmentData.armor.length ? equipmentData.armor.length - 1 : 0 },
            { id: 'melee', label: 'Vũ Khí Cận Chiến', kanji: '近接', icon: Swords, count: equipmentData.weaponsMelee.length ? equipmentData.weaponsMelee.length - 1 : 0 },
            { id: 'ranged', label: 'Vũ Khí Tầm Xa', kanji: '遠隔', icon: Crosshair, count: equipmentData.weaponsRanged.length ? equipmentData.weaponsRanged.length - 1 : 0 },
            { id: 'wealth', label: 'Tiền Tệ & Định Giá', kanji: '通貨', icon: DollarSign, count: null },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                  isActive
                    ? `${currentTheme.bgAccent} ${currentTheme.accentClass} border ${currentTheme.borderAccent} ring-1 ring-white/10`
                    : 'text-slate-400 hover:text-slate-200 bg-[#0D0E13] border border-white/[0.08] hover:bg-[#12141C]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className="px-1.5 py-0.2 text-[10px] bg-[#08090C] text-slate-400 rounded-md font-mono border border-white/[0.06]">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <GDocButton 
          type="equipment" 
          targetKey={activeTab} 
          label="GDoc Trang Bị" 
          size="sm" 
        />
      </div>

      {/* Cursed Tools Tab */}
      {activeTab === 'cursed-tools' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-[#0D0E13] border border-white/[0.08] rounded-xl p-3 sm:p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm chú cụ (Playful Cloud, Inverted Spear, Maki, Toji...)..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#08090C] border border-white/[0.08] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white/20 font-sans"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {gradesList.map(g => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGrade(g.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                    selectedGrade === g.id
                      ? currentTheme.btnActive
                      : 'text-slate-400 hover:text-slate-200 bg-[#08090C] border border-white/[0.08]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredTools.map((tool, idx) => {
              const badgeStyle = gradeColors[tool.grade] || 'bg-slate-500/15 text-slate-300 border-slate-500/30';
              return (
                <div 
                  key={idx}
                  className="rounded-xl bg-[#0D0E13] border border-white/[0.08] hover:border-white/[0.14] overflow-hidden flex flex-col justify-between transition-colors"
                >
                  <div>
                    {/* PROPER ASPECT RATIO IMAGE FRAME */}
                    {tool.images?.length > 0 && (
                      <div className="relative w-full h-44 bg-[#08090C] border-b border-white/[0.06] overflow-hidden flex items-center justify-center">
                        <img 
                          src={`/images/${tool.images[0]}`} 
                          alt={tool.name} 
                          className="relative z-10 max-h-full max-w-full object-contain p-2"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}

                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-base font-bold text-white font-display">
                            {tool.name}
                          </h3>
                          {tool.vietnameseName && (
                            <div className="text-xs text-amber-300/90 font-sans font-medium mt-0.5">
                              {tool.vietnameseName}
                            </div>
                          )}
                        </div>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono border uppercase tracking-wider font-bold shrink-0 ${badgeStyle}`}>
                          {tool.grade.replace(' Tools', '')}
                        </span>
                      </div>

                      {tool.character && (
                        <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-[#12141D] border border-white/[0.08] text-[10px] font-mono text-purple-300 mb-2.5">
                          <User className="w-2.5 h-2.5 text-purple-400" />
                          <span>Đại diện: {tool.character}</span>
                        </div>
                      )}

                      {tool.highlightEffect && (
                        <div className="p-2.5 rounded-lg bg-[#141009] border border-amber-500/20 text-[11px] text-amber-200/90 font-sans mb-3 flex items-start space-x-1.5 leading-relaxed">
                          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{tool.highlightEffect}</span>
                        </div>
                      )}

                      <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                        {tool.description}
                      </p>

                      {/* Original English Cursed Tool Rules Collapsible */}
                      {tool.descriptionEn && (
                        <details className="mt-3 group/orig border border-white/[0.06] rounded-lg bg-[#08090C] p-2 text-xs">
                          <summary className="cursor-pointer text-slate-400 hover:text-slate-200 font-mono text-[11px] select-none flex items-center justify-between">
                            <span>[ EN ] Văn bản gốc tiếng Anh (Original Rule)</span>
                            <span className="text-[10px] text-slate-500">▼</span>
                          </summary>
                          <div className="mt-2 text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-line border-t border-white/[0.06] pt-2">
                            {tool.descriptionEn}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Equipment Packs Tab */}
      {activeTab === 'packs' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-5 sm:p-6">
            <div className="flex items-center space-x-3 mb-3">
              <Package className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                Gói Trang Bị Khởi Đầu Của Chú Thuật Sư (Equipment Packs)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-4xl">
              Trang bị khởi đầu cấp từ các trường Chú thuật (Tokyo / Kyoto) hoặc gia tộc bao gồm bộ sưu tập vật phẩm dã chiến, sinh tồn và công nghệ hiện đại. <strong className="text-amber-300">Đặc biệt, mỗi gói đều chứa một Chú cụ cấp thấp độc quyền</strong> mang lại lợi thế chiến thuật rõ nét.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {equipmentData.equipmentPacks?.map((pack, pIdx) => (
              <div 
                key={pIdx}
                className="rounded-xl bg-[#0A0B0E] border border-white/[0.06] hover:border-white/[0.12] p-5 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-white font-display">{pack.name}</h3>
                      <div className="text-xs text-cyan-300 font-sans font-semibold mt-0.5">{pack.vietnameseName}</div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-[#141009] text-amber-300 border border-amber-500/30 shrink-0">
                      {pack.cost}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4">
                    {pack.description}
                  </p>

                  {/* Contents list */}
                  <div className="mb-4">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center space-x-1.5">
                      <span>Vật dụng bao gồm:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                      {pack.contents.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Exclusive Cursed Tool Included */}
                {pack.cursedToolIncluded && (
                  <div className="mt-4 pt-3 border-t border-white/[0.06]">
                    <div className="p-3 rounded-lg bg-[#0E1017] border border-purple-500/20">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center space-x-1.5">
                          <Flame className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-xs font-bold text-purple-200 font-display">
                            {pack.cursedToolIncluded.name}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/40 shrink-0">
                          {pack.cursedToolIncluded.grade}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                        {pack.cursedToolIncluded.effect}
                      </p>
                    </div>
                  </div>
                )}

                {/* Original English Pack Rules Collapsible */}
                {pack.descriptionEn && (
                  <details className="mt-3 group/orig border border-white/[0.06] rounded-lg bg-[#08090C] p-2 text-xs">
                    <summary className="cursor-pointer text-slate-400 hover:text-slate-200 font-mono text-[11px] select-none flex items-center justify-between">
                      <span>[ EN ] Văn bản gốc tiếng Anh (Original Rule)</span>
                      <span className="text-[10px] text-slate-500">▼</span>
                    </summary>
                    <div className="mt-2 text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-line border-t border-white/[0.06] pt-2">
                      {pack.descriptionEn}
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Semi Cursed Tools & Creation Rules Tab */}
      {activeTab === 'semi-cursed' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-5 sm:p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-3">
                  <Hammer className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                    {equipmentData.semiCursedRules?.title || 'Quy Tắc Rèn Bán Chú Cụ (Semi Cursed Tools)'}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-4">
                  {equipmentData.semiCursedRules?.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/[0.06] text-xs">
                  <div className="p-3 rounded-lg bg-[#08090C] border border-white/[0.05]">
                    <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold tracking-wider mb-1">Yêu cầu tiên quyết:</span>
                    <span className="text-amber-300/90 font-sans">{equipmentData.semiCursedRules?.requirements}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#08090C] border border-white/[0.05]">
                    <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold tracking-wider mb-1">Cách thức rèn:</span>
                    <span className="text-slate-300 font-sans">Truyền CE tích lũy HOẶC mang vào thực chiến hàng ngày.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#08090C] border border-white/[0.05]">
                    <span className="text-slate-400 font-mono block text-[10px] uppercase font-bold tracking-wider mb-1">Đặc quyền Tool Maker:</span>
                    <span className="text-cyan-300 font-sans">{equipmentData.semiCursedRules?.specialPerk}</span>
                  </div>
                </div>
              </div>

              {equipmentData.semiCursedRules?.image && (
                <div className="w-full md:w-56 shrink-0 rounded-xl bg-[#08090C] border border-white/[0.08] p-2 flex flex-col items-center">
                  <div className="relative w-full h-44 overflow-hidden rounded-lg flex items-center justify-center">
                    <img 
                      src={`/images/${equipmentData.semiCursedRules.image}`}
                      alt="Yuta forging cursed tool"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 text-center mt-1.5">
                    Yuta rèn katana bằng Chú lực
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Creation Table */}
          <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-5 sm:p-6 overflow-hidden">
            <h3 className="text-sm sm:text-base font-bold text-white font-display mb-4 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Tiến Trình Rèn Bán Chú Cụ 4 Cấp Độ</span>
            </h3>
            
            <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#08090C] text-white font-mono text-[10px] uppercase tracking-wider border-b border-white/[0.08]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Cấp Bậc Bán Chú Cụ</th>
                    <th className="px-4 py-3 font-semibold">Lượng CE Cần Truyền</th>
                    <th className="px-4 py-3 font-semibold">Thời Gian Thực Chiến</th>
                    <th className="px-4 py-3 font-semibold">Hiệu Quả Đạt Được</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] bg-[#0A0B0E]">
                  {equipmentData.semiCursedRules?.table?.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-bold text-amber-300/90 font-mono">{row.grade}</td>
                      <td className="px-4 py-3 font-mono text-cyan-300">{row.ce}</td>
                      <td className="px-4 py-3 font-mono text-slate-300">{row.time}</td>
                      <td className="px-4 py-3 font-sans text-slate-200">{row.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Variant Rule Card */}
          {equipmentData.semiCursedRules?.variantRule && (
            <div className="rounded-2xl bg-[#0D0E13] border border-purple-500/20 p-5 sm:p-6">
              <div className="flex items-center space-x-2.5 mb-3">
                <Zap className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white font-display">
                  {equipmentData.semiCursedRules.variantRule.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                {equipmentData.semiCursedRules.variantRule.description}
              </p>

              {equipmentData.semiCursedRules.variantRule.descriptionEn && (
                <details className="mt-3.5 group/orig border border-white/[0.06] rounded-lg bg-[#08090C] p-2.5 text-xs">
                  <summary className="cursor-pointer text-slate-400 hover:text-slate-200 font-mono text-[11px] select-none flex items-center justify-between">
                    <span>[ EN ] Văn bản gốc tiếng Anh (Original Rule)</span>
                    <span className="text-[10px] text-slate-500">▼</span>
                  </summary>
                  <div className="mt-2 text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-line border-t border-white/[0.06] pt-2">
                    {equipmentData.semiCursedRules.variantRule.descriptionEn}
                  </div>
                </details>
              )}
            </div>
          )}
        </div>
      )}

      {/* Armor Tab */}
      {activeTab === 'armor' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-5 sm:p-6 overflow-hidden">
            <h3 className="text-sm sm:text-base font-bold text-white font-display mb-4">Bảng Áo Giáp &amp; Khiên Bảo Hộ</h3>
            <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#08090C] text-white font-mono text-[10px] uppercase tracking-wider border-b border-white/[0.08]">
                  <tr>
                    {equipmentData.armor[0]?.map((col, i) => (
                      <th key={i} className="px-4 py-3 font-semibold">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] bg-[#0A0B0E]">
                  {equipmentData.armor.slice(1).map((row, rIdx) => {
                    const isHeaderRow = !row[1] && !row[2];
                    if (isHeaderRow) {
                      return (
                        <tr key={rIdx} className="bg-[#10121A]">
                          <td colSpan={3} className="px-4 py-2 font-display font-bold text-amber-300/90 text-xs uppercase tracking-wider">
                            {row[0]}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={rIdx} className="hover:bg-white/[0.02]">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-2.5 font-mono text-xs text-slate-300">{cell}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Armor Rules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0A0B0E] border border-white/[0.06]">
              <span className="text-xs font-bold text-white font-display block mb-1">Thành Thạo Giáp (Proficiency)</span>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Bất kỳ ai cũng có thể mặc giáp. Tuy nhiên chỉ những người có Armor Proficiency của lớp nhân vật mới không bị Disadvantage trong các đòn tấn công, đòn cứu nguy STR/DEX và duy trì kiểm soát Chú lực.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0B0E] border border-white/[0.06]">
              <span className="text-xs font-bold text-white font-display block mb-1">Ẩn Nấp (Stealth Disadvantage)</span>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Các loại áo khoác dày, giáp xích hoặc giáp sắt nặng sẽ khiến người mặc chịu Disadvantage trong các bài kiểm tra Dexterity (Stealth).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0A0B0E] border border-white/[0.06]">
              <span className="text-xs font-bold text-white font-display block mb-1">Khiên (Shields)</span>
              <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                Được chế tạo từ gỗ, kim loại hoặc sợi cường lực. Khiên tăng thêm +2 vào Armor Class (AC) của bạn và đòi hỏi cầm bằng một tay trống.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Melee Weapons Tab */}
      {activeTab === 'melee' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-5 sm:p-6 overflow-hidden">
            <h3 className="text-sm sm:text-base font-bold text-white font-display mb-4">Vũ Khí Cận Chiến (Melee Weapons - 39 Loại)</h3>
            <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#08090C] text-white font-mono text-[10px] uppercase tracking-wider border-b border-white/[0.08]">
                  <tr>
                    {equipmentData.weaponsMelee[1]?.map((col, i) => (
                      <th key={i} className="px-4 py-3 font-semibold">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] bg-[#0A0B0E]">
                  {equipmentData.weaponsMelee.slice(2).map((row, rIdx) => {
                    const isHeaderRow = !row[1] && !row[2];
                    if (isHeaderRow) {
                      return (
                        <tr key={rIdx} className="bg-[#10121A]">
                          <td colSpan={5} className="px-4 py-2 font-display font-bold text-amber-300/90 text-xs uppercase tracking-wider">
                            {row[0]}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={rIdx} className="hover:bg-white/[0.02]">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-2.5 font-mono text-xs text-slate-300">{cell}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Special Weapon Properties */}
          {equipmentData.specialWeaponProperties?.length > 0 && (
            <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-5 sm:p-6">
              <h3 className="text-sm sm:text-base font-bold text-white font-display mb-3 flex items-center space-x-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>Thuộc Tính Vũ Khí Đặc Biệt (Special Weapon Properties)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {equipmentData.specialWeaponProperties.map((prop, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0B0E] border border-white/[0.06] text-xs flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-cyan-300 font-display mb-1 flex items-center space-x-1.5">
                        <span>{prop.property}</span>
                        {prop.vietnameseName && (
                          <span className="text-slate-400 font-sans font-normal text-[11px]">({prop.vietnameseName})</span>
                        )}
                      </div>
                      <div className="text-slate-300 font-sans leading-relaxed">{prop.effect}</div>
                    </div>
                    {prop.effectEn && (
                      <details className="mt-2.5 group/orig border border-white/[0.06] rounded-lg bg-[#08090C] p-2 text-[11px]">
                        <summary className="cursor-pointer text-slate-400 hover:text-slate-200 font-mono text-[10px] select-none flex items-center justify-between">
                          <span>[ EN ] Văn bản gốc tiếng Anh</span>
                          <span className="text-[9px] text-slate-500">▼</span>
                        </summary>
                        <div className="mt-1.5 text-slate-400 font-mono text-[10px] leading-relaxed border-t border-white/[0.06] pt-1.5">
                          {prop.effectEn}
                        </div>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ranged Weapons Tab */}
      {activeTab === 'ranged' && (
        <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-5 sm:p-6 overflow-hidden">
          <h3 className="text-sm sm:text-base font-bold text-white font-display mb-4">Vũ Khí Tầm Xa &amp; Súng Hiện Đại (Ranged Weapons)</h3>
          <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#08090C] text-white font-mono text-[10px] uppercase tracking-wider border-b border-white/[0.08]">
                <tr>
                  {equipmentData.weaponsRanged[0]?.map((col, i) => (
                    <th key={i} className="px-4 py-3 font-semibold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] bg-[#0A0B0E]">
                {equipmentData.weaponsRanged.slice(1).map((row, rIdx) => {
                  const isHeaderRow = !row[1] && !row[2];
                  if (isHeaderRow) {
                    return (
                      <tr key={rIdx} className="bg-[#10121A]">
                        <td colSpan={5} className="px-4 py-2 font-display font-bold text-amber-300/90 text-xs uppercase tracking-wider">
                          {row[0]}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={rIdx} className="hover:bg-white/[0.02]">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-2.5 font-mono text-xs text-slate-300">{cell}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Wealth Tab */}
      {activeTab === 'wealth' && (
        <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-5 sm:p-6 max-w-3xl">
          <h3 className="text-sm sm:text-base font-bold text-white font-display mb-4">Quy Đổi Tiền Tệ &amp; Định Giá Hiện Đại</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line mb-6 font-sans">
            Trong thế giới Jujutsu Kaisen hiện đại, hệ thống kinh tế hoạt động hoàn toàn bằng Đô La Mỹ ($) hoặc Yên Nhật thay thế cho các đồng tiền cổ điển của D&amp;D 5e. Mọi giao dịch từ vũ khí, đạn dược đến thiết bị công nghệ đều quy đổi theo tỷ giá chuẩn dưới đây:
          </p>

          <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.06] text-xs font-mono space-y-2 text-slate-300">
            <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
              <span>• 1 Đồng Đồng (1 Copper Piece - CP):</span>
              <span className="text-amber-300/90 font-bold">$1.00 USD</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
              <span>• 1 Đồng Bạc (1 Silver Piece - SP):</span>
              <span className="text-slate-200 font-bold">$10.00 USD</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
              <span>• 1 Đồng Vàng (1 Gold Piece - GP):</span>
              <span className="text-amber-400/90 font-bold">$100.00 USD</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span>• 1 Điện thoại thông minh (Cellphone):</span>
              <span className="text-cyan-300 font-bold">$400.00 USD</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
