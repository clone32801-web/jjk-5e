import React, { useState, useMemo } from 'react';
import { 
  Scroll, 
  Search, 
  Shield, 
  Zap, 
  Heart, 
  Brain, 
  Layers, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Filter, 
  X, 
  ChevronDown,
  Star,
  Flame,
  Eye
} from 'lucide-react';
import featsData from '../data/feats.json';
import techniquesData from '../data/techniques.json';
import { useTheme } from '../context/ThemeContext';

export default function FeatsView({ activeCategory: propCategory, setActiveCategory: propSetCategory }) {
  const [internalCategory, setInternalCategory] = useState('Barrier Feats');
  const activeCategory = propCategory || internalCategory;
  const setActiveCategory = propSetCategory || setInternalCategory;
  const [search, setSearch] = useState('');
  const [selectedTechnique, setSelectedTechnique] = useState('all');
  const { currentTheme } = useTheme();

  const catIcons = {
    'Barrier Feats': { icon: Shield, kanji: '結界', vi: 'Kết Giới' },
    'Cursed Energy Feats': { icon: Zap, kanji: '呪力', vi: 'Chú Lực' },
    'Physical Feats': { icon: Heart, kanji: '肉体', vi: 'Thể Chất' },
    'Reverse Cursed Technique Feats': { icon: Zap, kanji: '反転', vi: 'Phản Chuyển' },
    'Skill Feats': { icon: Brain, kanji: '技能', vi: 'Kỹ Năng' },
    'Technique Feats': { icon: Scroll, kanji: '術式', vi: 'Thuật Thức Bẩm Sinh' },
  };

  // Compile all technique feats into an enriched searchable list
  const allTechniqueFeats = useMemo(() => {
    const list = [];
    techniquesData.forEach(t => {
      t.feats?.forEach(f => {
        list.push({
          ...f,
          techniqueName: t.name,
          techniqueVietnameseName: t.vietnameseName || '',
          techniqueCharacter: t.character || '',
          techniqueCategory: t.category || '',
        });
      });
    });
    return list;
  }, []);

  // Sorted list of techniques that have feats for the filter selector
  const techniquesList = useMemo(() => {
    return techniquesData
      .filter(t => t.feats && t.feats.length > 0)
      .map(t => ({
        name: t.name,
        vietnameseName: t.vietnameseName || '',
        character: t.character || '',
        featsCount: t.feats.length,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Popular / prominent techniques for quick filter pills
  const popularTechniques = useMemo(() => [
    { name: 'Limitless', vi: 'Vô Hạ Hạn' },
    { name: 'Ten Shadows', vi: 'Thập Chủng Ảnh' },
    { name: 'Shrine', vi: 'Ngự Hạp Tử' },
    { name: 'Idle Transfiguration', vi: 'Vô Tác Chuyển Biến' },
    { name: 'Boogie Woogie', vi: 'Bất Nghĩa Du Hí' },
    { name: 'Ratio', vi: 'Tỷ Lệ 7:3' },
    { name: 'Blood Manipulation', vi: 'Xích Huyết' },
    { name: 'Star Rage', vi: 'Tinh Nộ' },
    { name: 'Disaster Flames', vi: 'Hỏa Diễm' },
    { name: 'Projection Sorcery', vi: 'Đầu Chiếu 24 FPS' },
    { name: 'Pachinko Fever', vi: 'Tọa Sát Bác Đồ' },
    { name: 'Puppet Manipulation', vi: 'Khôi Lỗi' },
    { name: 'Cursed Speech', vi: 'Chú Ngôn' },
    { name: 'Straw Doll Technique', vi: 'Hình Nhân Rơm' },
    { name: 'Comedian', vi: 'Hài Kịch Gia' },
  ], []);

  // Metadata of currently selected technique for banner card
  const activeTechniqueInfo = useMemo(() => {
    if (selectedTechnique === 'all') return null;
    return techniquesData.find(t => t.name === selectedTechnique);
  }, [selectedTechnique]);

  const currentList = useMemo(() => {
    if (activeCategory === 'Technique Feats') {
      const q = search.trim().toLowerCase();
      return allTechniqueFeats.filter(f => {
        const matchTech = selectedTechnique === 'all' || f.techniqueName === selectedTechnique;
        const matchSearch = !q || (
          f.name.toLowerCase().includes(q) ||
          f.techniqueName.toLowerCase().includes(q) ||
          (f.techniqueVietnameseName && f.techniqueVietnameseName.toLowerCase().includes(q)) ||
          (f.techniqueCharacter && f.techniqueCharacter.toLowerCase().includes(q)) ||
          (f.character && f.character.toLowerCase().includes(q)) ||
          f.description.toLowerCase().includes(q) ||
          (f.prerequisite && f.prerequisite.toLowerCase().includes(q))
        );
        return matchTech && matchSearch;
      });
    }

    const baseList = featsData[activeCategory] || [];
    const q = search.trim().toLowerCase();
    return baseList.filter(f => 
      f.name.toLowerCase().includes(q) ||
      (f.vietnameseName && f.vietnameseName.toLowerCase().includes(q)) ||
      f.description.toLowerCase().includes(q) ||
      (f.descriptionEn && f.descriptionEn.toLowerCase().includes(q)) ||
      (f.prerequisite && f.prerequisite.toLowerCase().includes(q)) ||
      (f.prerequisiteEn && f.prerequisiteEn.toLowerCase().includes(q)) ||
      (f.character && f.character.toLowerCase().includes(q))
    );
  }, [activeCategory, search, selectedTechnique, allTechniqueFeats]);

  const categories = [
    { id: 'Barrier Feats', label: 'Kết Giới (Barrier)', count: featsData['Barrier Feats']?.length || 0 },
    { id: 'Cursed Energy Feats', label: 'Chú Lực (Cursed Energy)', count: featsData['Cursed Energy Feats']?.length || 0 },
    { id: 'Reverse Cursed Technique Feats', label: 'Phản Chuyển (RCT)', count: featsData['Reverse Cursed Technique Feats']?.length || 0 },
    { id: 'Physical Feats', label: 'Thể Chất (Physical)', count: featsData['Physical Feats']?.length || 0 },
    { id: 'Skill Feats', label: 'Kỹ Năng (Skill)', count: featsData['Skill Feats']?.length || 0 },
    { id: 'Technique Feats', label: 'Thuật Thức Bẩm Sinh (Innate)', count: allTechniqueFeats.length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Decorative Watermark */}
      <div className="absolute right-6 top-8 font-kanji font-black text-7xl text-white/[0.02] pointer-events-none select-none hidden lg:block">
        呪術秘術
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Feats &amp; Customization
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
          Kỳ tài chuyên sâu bổ trợ kết giới, chú lực, thể chất, RCT, chiêu thức bí truyền riêng của từng thuật thức và hướng dẫn đa lớp nhân vật.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#232636] pb-4 mb-8 overflow-x-auto no-scrollbar">
        {categories.map(cat => {
          const info = catIcons[cat.id] || { icon: Scroll, kanji: '術' };
          const Icon = info.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSearch('');
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? `${currentTheme.bgAccent} ${currentTheme.accentClass} border ${currentTheme.borderAccent} shadow-sm`
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#12131A]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label || cat.id}</span>
              <span className="font-kanji text-[10px] opacity-40 hidden sm:inline">{info.kanji}</span>
              <span className="px-1.5 py-0.2 text-[10px] bg-[#0A0A0C] text-slate-400 rounded-full font-mono border border-[#232636]">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Technique Feats Filter Bar */}
      {activeCategory === 'Technique Feats' ? (
            <div className="bg-[#12131A] border border-[#232636] rounded-2xl p-4 sm:p-5 mb-6 shadow-xl space-y-4">
              
              {/* Row 1: Technique Dropdown + Search + Clear */}
              <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                
                {/* Select Dropdown for 79 Techniques */}
                <div className="relative flex-1 min-w-[260px]">
                  <div className="flex items-center space-x-2 mb-1.5 md:hidden">
                    <Filter className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-xs font-bold text-slate-300 font-mono">Chọn thuật thức:</span>
                  </div>
                  <div className="relative">
                    <select
                      value={selectedTechnique}
                      onChange={(e) => setSelectedTechnique(e.target.value)}
                      className="w-full appearance-none bg-[#0A0A0C] border border-[#282B3E] hover:border-purple-500/60 focus:border-purple-500 rounded-xl px-3.5 py-2 pr-9 text-xs font-sans text-white focus:outline-none transition-all shadow-inner cursor-pointer"
                    >
                      <option value="all">
                        ⚡ Tất cả thuật thức (79 thuật thức — 245 Feats)
                      </option>
                      
                      <optgroup label="⭐ Thuật Thức Tiêu Biểu">
                        {popularTechniques.map(p => {
                          const full = techniquesList.find(t => t.name === p.name);
                          return (
                            <option key={`pop-${p.name}`} value={p.name}>
                              ★ {p.name} — {p.vi} {full ? `(${full.featsCount} feats)` : ''}
                            </option>
                          );
                        })}
                      </optgroup>

                      <optgroup label="📜 Tất Cả Thuật Thức (A - Z)">
                        {techniquesList.map(t => (
                          <option key={t.name} value={t.name}>
                            {t.name} {t.vietnameseName ? `— ${t.vietnameseName}` : ''} {t.character ? `[${t.character}]` : ''} ({t.featsCount} feats)
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Text Search Box */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm tên feat, điều kiện, nhân vật..."
                    className="w-full pl-9 pr-8 py-2 bg-[#0A0A0C] border border-[#282B3E] focus:border-purple-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none font-sans"
                  />
                  {search && (
                    <button 
                      onClick={() => setSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Counter & Reset */}
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-xs text-purple-300/90 font-mono bg-purple-950/40 border border-purple-800/40 px-2.5 py-1.5 rounded-xl">
                    {currentList.length} Feats
                  </span>
                  {(selectedTechnique !== 'all' || search) && (
                    <button
                      onClick={() => {
                        setSelectedTechnique('all');
                        setSearch('');
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono flex items-center space-x-1 border border-slate-700 transition-colors"
                      title="Bỏ lọc và xem toàn bộ"
                    >
                      <X className="w-3 h-3" />
                      <span>Xóa lọc</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Row 2: Popular Techniques Quick Filter Pills */}
              <div className="pt-2 border-t border-[#1C1F2D]">
                <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-500 shrink-0 mr-1 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Lọc nhanh:</span>
                  </span>

                  <button
                    onClick={() => setSelectedTechnique('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all shrink-0 ${
                      selectedTechnique === 'all'
                        ? 'bg-purple-600 text-white font-bold shadow-sm shadow-purple-600/30'
                        : 'bg-[#0A0A0C] text-slate-400 hover:text-slate-200 border border-[#232636]'
                    }`}
                  >
                    Tất cả (79)
                  </button>

                  {popularTechniques.map(p => {
                    const isSelected = selectedTechnique === p.name;
                    return (
                      <button
                        key={p.name}
                        onClick={() => setSelectedTechnique(p.name)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-sans transition-all shrink-0 ${
                          isSelected
                            ? 'bg-purple-600 text-white font-bold shadow-sm shadow-purple-600/30 border border-purple-400'
                            : 'bg-[#0A0A0C] text-slate-300 hover:text-white hover:bg-[#161824] border border-[#232636]'
                        }`}
                      >
                        <span>{p.name}</span>
                        <span className="text-[10px] text-slate-400 ml-1">({p.vi})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            /* Standard Search Input for other categories */
            <div className="bg-[#12131A] border border-[#232636] rounded-2xl p-4 mb-6 shadow-xl flex items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Tìm trong ${activeCategory}...`}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#0A0A0C] border border-[#232636] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-sans"
                />
              </div>
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                {currentList.length} kết quả
              </span>
            </div>
          )}

          {/* Active Technique Banner (Shown when a specific technique is selected) */}
          {activeCategory === 'Technique Feats' && activeTechniqueInfo && (
            <div className="rounded-2xl bg-gradient-to-r from-purple-950/30 via-[#131522] to-[#0D0E16] border border-purple-500/30 p-4 sm:p-5 mb-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Scroll className="w-4 h-4 text-amber-400" />
                  <h3 className="text-base font-bold text-white font-display">
                    {activeTechniqueInfo.name}
                  </h3>
                  {activeTechniqueInfo.vietnameseName && (
                    <span className="text-xs font-semibold text-amber-300 font-sans">
                      • {activeTechniqueInfo.vietnameseName}
                    </span>
                  )}
                  {activeTechniqueInfo.kanji && (
                    <span className="font-kanji text-xs text-slate-500">
                      {activeTechniqueInfo.kanji}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  {activeTechniqueInfo.character && (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-[#1B1D2C] border border-[#2D3148] text-purple-300 font-mono text-[11px]">
                      <User className="w-3 h-3 text-purple-400" />
                      <span>Đại diện: {activeTechniqueInfo.character}</span>
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[11px]">
                    {activeTechniqueInfo.feats?.length || 0} Feats Độc Quyền
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedTechnique('all')}
                className="px-3 py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/50 text-purple-200 text-xs font-mono flex items-center space-x-1.5 transition-colors self-end sm:self-center"
              >
                <X className="w-3.5 h-3.5" />
                <span>Xem tất cả thuật thức</span>
              </button>
            </div>
          )}

          {/* Grid of Feats */}
          {currentList.length === 0 ? (
            <div className="rounded-2xl bg-[#12131A] border border-[#232636] p-12 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <div className="text-sm font-bold text-white">Không tìm thấy feat nào</div>
              <p className="text-xs text-slate-500">
                Thử chọn thuật thức khác hoặc xóa từ khóa tìm kiếm.
              </p>
              <button
                onClick={() => {
                  setSelectedTechnique('all');
                  setSearch('');
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all inline-block"
              >
                Hiển thị tất cả
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentList.map((feat, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-[#12131A] border border-[#232636] hover:border-[#383C54] shadow-lg flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-sm font-bold text-white font-display group-hover:text-amber-200 transition-colors">
                          {feat.name}
                        </h3>
                        {feat.vietnameseName && (
                          <div className="text-[11px] text-amber-300 font-sans font-medium mt-0.5">
                            {feat.vietnameseName}
                          </div>
                        )}
                      </div>

                      {/* Clickable Technique Badge Button */}
                      {feat.techniqueName && (
                        <button
                          onClick={() => setSelectedTechnique(feat.techniqueName)}
                          className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-[#1B1D2A] text-purple-300 border border-purple-500/30 hover:bg-purple-900/40 hover:border-purple-400 hover:text-white transition-all shrink-0 flex items-center space-x-1"
                          title={`Lọc riêng thuật thức: ${feat.techniqueName}`}
                        >
                          <Scroll className="w-2.5 h-2.5 text-purple-400" />
                          <span>{feat.techniqueName}</span>
                        </button>
                      )}
                    </div>

                    {/* Character representation */}
                    {(feat.character || feat.techniqueCharacter) && (
                      <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-[#161824] border border-[#2A2E44] text-[10px] font-mono text-purple-300 mb-2.5">
                        <User className="w-2.5 h-2.5 text-purple-400" />
                        <span>Đại diện: {feat.character || feat.techniqueCharacter}</span>
                      </div>
                    )}

                    {/* Prerequisite */}
                    {feat.prerequisite && (
                      <div className="text-[10px] font-mono text-purple-400/90 mb-3 bg-[#171822] px-2.5 py-1 rounded-lg border border-[#232738]">
                        {feat.prerequisite}
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                      {feat.description}
                    </p>

                    {/* Original English Rule Toggle */}
                    {feat.descriptionEn && (
                      <details className="mt-3 group/orig">
                        <summary className="text-[11px] font-mono text-slate-500 hover:text-slate-300 cursor-pointer list-none flex items-center gap-1.5 transition-colors">
                          <span className="text-[10px] text-purple-400 group-open/orig:rotate-90 transition-transform">▶</span>
                          <span>📄 Văn bản gốc tiếng Anh (Original Rule)</span>
                        </summary>
                        <div className="mt-2 p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-slate-400 font-sans leading-relaxed whitespace-pre-line">
                          {feat.prerequisiteEn && (
                            <div className="text-[10px] font-mono text-purple-300/80 mb-1.5 pb-1 border-b border-white/5">
                              {feat.prerequisiteEn}
                            </div>
                          )}
                          {feat.descriptionEn}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

    </div>
  );
}
