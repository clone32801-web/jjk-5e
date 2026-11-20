import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Flame, 
  Zap, 
  X, 
  Scroll, 
  ChevronRight,
  ChevronLeft,
  Maximize2,
  LayoutGrid,
  List,
  User,
  Crown,
  Skull,
  Ghost,
  Eye,
  Clock,
  Table as TableIcon,
  Check,
  Shield
} from 'lucide-react';
import techniquesData from '../data/techniques.json';
import { useTheme } from '../context/ThemeContext';
import GDocButton from './GDocButton';

export default function TechniquesView({ 
  selectedTechniqueId, 
  selectedCategory: propCategory, 
  onSelectCategory 
}) {
  const { currentTheme } = useTheme();

  // Search, Filters & View Mode
  const [search, setSearch] = useState('');
  const [internalCategory, setInternalCategory] = useState('all');
  const selectedCategory = propCategory !== undefined ? propCategory : internalCategory;
  const setSelectedCategory = onSelectCategory || setInternalCategory;
  const [selectedLevel, setSelectedLevel] = useState('all'); // 'all', '1', '3', '6', '11', '18'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Active technique modal state
  const [activeTechnique, setActiveTechnique] = useState(() => {
    if (selectedTechniqueId) {
      return techniquesData.find(t => t.id === selectedTechniqueId) || null;
    }
    return null;
  });

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [activeModalTab, setActiveModalTab] = useState('overview'); // 'overview', 'features', 'domain', 'feats', 'tables'
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImgIndex, setLightboxImgIndex] = useState(0);

  // Sync with prop
  useEffect(() => {
    if (selectedTechniqueId) {
      const match = techniquesData.find(t => t.id === selectedTechniqueId);
      if (match) {
        setActiveTechnique(match);
      }
    }
  }, [selectedTechniqueId]);

  // Reset selected image and tab when changing active technique
  useEffect(() => {
    setSelectedImgIndex(0);
    setActiveModalTab('overview');
    setIsLightboxOpen(false);
  }, [activeTechnique]);

  // Category definitions with counts & badges
  const categories = useMemo(() => [
    { id: 'all', label: 'Tất cả (79)', icon: Sparkles, color: 'text-slate-300' },
    { id: 'clans', label: 'Ngự Tam Gia', icon: Crown, color: 'text-amber-400' },
    { id: 'curses', label: 'Thuật Thức Chú Linh', icon: Skull, color: 'text-rose-400' },
    { id: 'shikigami', label: 'Thức Thần & Triệu Hồi', icon: Ghost, color: 'text-purple-400' },
    { id: 'manipulation', label: 'Thao Túng & Biến Đổi', icon: Zap, color: 'text-cyan-400' },
    { id: 'conceptual', label: 'Hiện Đại & Khái Niệm', icon: Sparkles, color: 'text-emerald-400' },
    { id: 'domain', label: 'Có Lãnh Địa (75)', icon: Flame, color: 'text-amber-400' },
  ], []);

  // Filtered list
  const filteredTechniques = useMemo(() => {
    const q = search.trim().toLowerCase();
    return techniquesData.filter(t => {
      // Search matching across English name, Vietnamese name, Character, description, features, feats, domain
      const matchSearch = !q || (
        t.name.toLowerCase().includes(q) ||
        (t.vietnameseName && t.vietnameseName.toLowerCase().includes(q)) ||
        (t.character && t.character.toLowerCase().includes(q)) ||
        t.description.toLowerCase().includes(q) ||
        (t.domain && (
          t.domain.name.toLowerCase().includes(q) || 
          (t.domain.vietnameseName && t.domain.vietnameseName.toLowerCase().includes(q))
        )) ||
        t.features.some(f => f.name.toLowerCase().includes(q)) ||
        t.feats.some(feat => feat.name.toLowerCase().includes(q))
      );

      // Category matching
      const matchCategory = 
        selectedCategory === 'all' ||
        (selectedCategory === 'domain' ? !!t.domain : t.category === selectedCategory);

      // Level matching
      const matchLevel = 
        selectedLevel === 'all' || 
        t.features.some(f => f.level === parseInt(selectedLevel, 10));

      return matchSearch && matchCategory && matchLevel;
    });
  }, [search, selectedCategory, selectedLevel]);

  // Category labels map
  const categoryLabels = {
    'clans': { name: 'Ngự Tam Gia', color: 'bg-amber-950/60 text-amber-300 border-amber-800/50' },
    'curses': { name: 'Chú Linh', color: 'bg-rose-950/60 text-rose-300 border-rose-800/50' },
    'shikigami': { name: 'Thức Thần', color: 'bg-purple-950/60 text-purple-300 border-purple-800/50' },
    'manipulation': { name: 'Thao Túng', color: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/50' },
    'conceptual': { name: 'Hiện Đại', color: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50' },
  };

  const openLightboxWithImage = (idx) => {
    setLightboxImgIndex(idx);
    setIsLightboxOpen(true);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Decorative Background Vertical Kanji Watermarks */}
      <div className="absolute right-4 top-16 writing-vertical font-kanji font-black text-6xl text-white/[0.02] pointer-events-none select-none hidden lg:block">
        領域展開生得術式
      </div>
      <div className="absolute left-4 top-96 writing-vertical font-kanji font-black text-6xl text-white/[0.02] pointer-events-none select-none hidden lg:block">
        呪力操作黒閃
      </div>

      {/* Hero Banner with JJK Atmosphere */}
      <div className="relative rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-6 sm:p-8 mb-8 overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-xs font-mono font-medium uppercase tracking-wider mb-3">
            <Sparkles className={`w-3.5 h-3.5 ${currentTheme.accentClass}`} />
            <span className="text-zinc-300">Innate Techniques • 生得術式</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight flex items-center gap-3">
            <span>Thuật Thức Bẩm Sinh</span>
            <span className="text-xs font-kanji text-zinc-600 font-normal hidden sm:inline">
              [{techniquesData.length} 術式]
            </span>
          </h1>

          <p className="mt-2 text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
            Kho lưu trữ 79 thuật thức bẩm sinh được khắc sâu trong não bộ của Chú thuật sư. Tra cứu tên Hán Việt, nhân vật đại diện, tiến trình mở khóa kỹ năng và Bành trướng Lãnh địa (*Domain Expansion*).
          </p>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-[#0D0E13] border border-white/[0.08] rounded-xl p-4 sm:p-5 mb-8 space-y-4">
        
        {/* Top Row: Search & View Toggle */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên, Hán Việt, nhân vật (Gojo, Sukuna, Vô Hạ Hạn...)..."
              className="w-full pl-10 pr-4 py-2 bg-[#08090C] border border-white/10 rounded-lg text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500/60 transition-colors font-sans"
            />
            {search && (
              <button 
                onClick={() => setSearch('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Group: Level Filter & View Mode Toggle */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
            
            {/* Level selection */}
            <div className="flex items-center space-x-1 bg-[#08090C] border border-white/10 p-1 rounded-lg">
              <span className="text-[10px] text-zinc-500 px-1.5 font-mono">Cấp:</span>
              {['all', '1', '3', '6', '11', '18'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2 py-0.5 rounded text-xs font-mono font-medium transition-colors ${
                    selectedLevel === lvl
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {lvl === 'all' ? 'Tất cả' : `Lv ${lvl}`}
                </button>
              ))}
            </div>

            {/* View Mode Switcher: Grid vs Table */}
            <div className="flex items-center p-1 bg-[#08090C] border border-white/10 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors flex items-center space-x-1 text-xs font-mono ${
                  viewMode === 'grid' 
                    ? 'bg-white/15 text-white font-bold' 
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Dạng Lưới Thẻ Bài"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lưới</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded transition-colors flex items-center space-x-1 text-xs font-mono ${
                  viewMode === 'table' 
                    ? 'bg-white/15 text-white font-bold' 
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Dạng Bảng Tra Cứu Nhanh"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bảng</span>
              </button>
            </div>

          </div>

        </div>

        {/* Category Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-white/[0.06]">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white border-white/20 font-bold'
                    : 'bg-[#08090C] border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : cat.color}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter & Reset Action */}
        <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-white/[0.06] font-mono">
          <span>
            Hiển thị <span className="font-bold text-white">{filteredTechniques.length}</span> / {techniquesData.length} Thuật Thức
          </span>
          {(search || selectedCategory !== 'all' || selectedLevel !== 'all') && (
            <button 
              onClick={() => { setSearch(''); setSelectedCategory('all'); setSelectedLevel('all'); }}
              className="text-slate-400 hover:text-white underline text-xs"
            >
              Đặt lại toàn bộ bộ lọc
            </button>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 1. GRID VIEW (CARD TILES) */}
      {/* ========================================================================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechniques.map((tech) => {
            const hasImage = tech.images && tech.images.length > 0;
            const coverImg = tech.coverImage || (hasImage ? tech.images[0] : null);
            const catBadge = categoryLabels[tech.category];

            return (
              <div
                key={tech.id}
                onClick={() => setActiveTechnique(tech)}
                className="group relative bg-[#0D0E13] hover:bg-[#111218] border border-white/[0.08] hover:border-white/20 rounded-xl overflow-hidden transition-colors cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Aspect-ratio card image container */}
                  {coverImg ? (
                    <div className="relative w-full h-52 bg-[#070709] border-b border-white/[0.06] overflow-hidden flex items-center justify-center">
                      {/* Ambient blurred backdrop to fill aspect ratio cleanly */}
                      <img 
                        src={`/images/${coverImg}`} 
                        alt="" 
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-125 pointer-events-none"
                      />
                      
                      {/* Full uncropped image matching true dimensions */}
                      <img 
                        src={`/images/${coverImg}`} 
                        alt={tech.name} 
                        className="relative z-10 max-h-full max-w-full object-contain p-2.5 transition-transform duration-200 group-hover:scale-102"
                        loading="lazy"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      
                      {/* Subtle bottom vignette */}
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0D0E13] to-transparent z-10 pointer-events-none" />

                      {/* Image count badge if multiple images */}
                      {tech.images?.length > 1 && (
                        <span className="absolute top-2.5 right-2.5 z-20 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#070709]/90 text-zinc-300 border border-white/10">
                          {tech.images.length} ảnh
                        </span>
                      )}

                      {/* Category tag on image top left */}
                      {catBadge && (
                        <span className={`absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded text-[9px] font-mono font-semibold border ${catBadge.color}`}>
                          {catBadge.name}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-24 bg-[#08090C] border-b border-white/[0.06] flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-zinc-700" />
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    
                    {/* Character representative pill */}
                    {tech.character && (
                      <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-zinc-300 mb-2">
                        <User className="w-2.5 h-2.5 text-zinc-400" />
                        <span className="truncate max-w-[180px]">{tech.character}</span>
                      </div>
                    )}

                    {/* Technique Names: English & Vietnamese */}
                    <div className="mb-2">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                        {tech.name}
                      </h3>
                      {tech.vietnameseName && tech.vietnameseName !== tech.name && (
                        <div className="text-xs text-amber-300/85 font-sans font-medium mt-0.5">
                          {tech.vietnameseName}
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-zinc-500 font-mono mb-2">
                      {tech.features.length} Kỹ năng • {tech.feats?.length || 0} Feats
                    </p>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                      {tech.description || 'Thuật thức bẩm sinh đặc biệt được khắc sâu trong não bộ chú thuật sư.'}
                    </p>
                  </div>
                </div>

                {/* Badges footer */}
                <div className="px-4 sm:px-5 py-2.5 border-t border-white/[0.06] bg-[#090A0E] flex items-center justify-between text-xs">
                  {tech.domain ? (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium text-[10px]">
                      <Flame className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate max-w-[140px]">
                        {tech.domain.vietnameseName 
                          ? tech.domain.vietnameseName.replace('Bành Trướng Lãnh Địa: ', '') 
                          : tech.domain.name.replace('Domain Expansion: ', '')}
                      </span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">Chưa rõ Lãnh địa</span>
                  )}

                  <span className="text-slate-400 group-hover:text-white flex items-center space-x-1 text-xs font-medium transition-colors font-sans">
                    <span>Chi tiết</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TABLE VIEW (COMPACT ROWS) */}
      {/* ========================================================================= */}
      {viewMode === 'table' && (
        <div className="rounded-2xl border border-[#232636] bg-[#12131A] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                <tr>
                  <th className="px-4 py-3.5">Thuật Thức</th>
                  <th className="px-4 py-3.5">Tên Hán Việt</th>
                  <th className="px-4 py-3.5">Nhân Vật Đại Diện</th>
                  <th className="px-4 py-3.5">Hệ Phái</th>
                  <th className="px-4 py-3.5 text-center">Kỹ Năng</th>
                  <th className="px-4 py-3.5">Lãnh Địa Bành Trướng</th>
                  <th className="px-4 py-3.5 text-right">Chi Tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1E2B]">
                {filteredTechniques.map((tech) => {
                  const catBadge = categoryLabels[tech.category];
                  const hasImage = tech.images && tech.images.length > 0;
                  const coverImg = tech.coverImage || (hasImage ? tech.images[0] : null);

                  return (
                    <tr 
                      key={tech.id}
                      onClick={() => setActiveTechnique(tech)}
                      className="hover:bg-slate-800/30 transition-colors cursor-pointer group"
                    >
                      {/* Name & Avatar */}
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#0A0A0C] border border-white/10 shrink-0 flex items-center justify-center">
                            {coverImg ? (
                              <img src={`/images/${coverImg}`} alt="" className="w-full h-full object-contain p-0.5" />
                            ) : (
                              <Sparkles className="w-4 h-4 text-slate-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-purple-300 font-display transition-colors">
                              {tech.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {tech.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Vietnamese name */}
                      <td className="px-4 py-3 text-amber-300/90 font-medium">
                        {tech.vietnameseName || '—'}
                      </td>

                      {/* Character */}
                      <td className="px-4 py-3 font-mono text-[11px] text-purple-300">
                        {tech.character ? (
                          <span className="inline-flex items-center space-x-1">
                            <User className="w-3 h-3 text-purple-400" />
                            <span>{tech.character}</span>
                          </span>
                        ) : '—'}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        {catBadge && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${catBadge.color}`}>
                            {catBadge.name}
                          </span>
                        )}
                      </td>

                      {/* Features & Feats Count */}
                      <td className="px-4 py-3 text-center font-mono text-[11px] text-slate-400">
                        <span className="text-white font-bold">{tech.features.length}</span>
                        {tech.feats?.length > 0 && (
                          <span className="text-slate-500 text-[10px] ml-1">({tech.feats.length} feats)</span>
                        )}
                      </td>

                      {/* Domain Expansion */}
                      <td className="px-4 py-3">
                        {tech.domain ? (
                          <span className="inline-flex items-center space-x-1 text-amber-300 text-[11px] font-medium">
                            <Flame className="w-3 h-3 text-amber-400 shrink-0" />
                            <span className="truncate max-w-[180px]">
                              {tech.domain.vietnameseName 
                                ? tech.domain.vietnameseName.replace('Bành Trướng Lãnh Địa: ', '') 
                                : tech.domain.name.replace('Domain Expansion: ', '')}
                            </span>
                          </span>
                        ) : (
                          <span className="text-slate-600 font-mono text-[11px]">Chưa rõ</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3 text-right">
                        <span className="text-slate-400 group-hover:text-white inline-flex items-center space-x-1 text-xs">
                          <span>Xem</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ENHANCED MODAL DRAWER WITH INTERNAL TABS */}
      {/* ========================================================================= */}
      {activeTechnique && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setActiveTechnique(null)}
        >
          {/* Modal Container */}
          <div 
            className="relative w-full max-w-4xl bg-[#0C0D12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative px-6 py-4 bg-[#090A0E] border-b border-white/[0.08] flex items-center justify-between shrink-0">
              
              <div className="absolute right-16 top-1 text-5xl font-kanji font-black text-white/[0.02] pointer-events-none select-none">
                領域展開
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                    {activeTechnique.name}
                  </h2>
                  <span className="font-kanji text-xs text-zinc-600 font-bold">生得術式</span>

                  {categoryLabels[activeTechnique.category] && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${categoryLabels[activeTechnique.category].color}`}>
                      {categoryLabels[activeTechnique.category].name}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                  {activeTechnique.vietnameseName && (
                    <span className="text-amber-300/90 font-medium">
                      {activeTechnique.vietnameseName}
                    </span>
                  )}
                  {activeTechnique.character && (
                    <span className="text-zinc-500 font-mono flex items-center space-x-1">
                      <span>• Đại diện:</span>
                      <span className="text-zinc-300 font-medium">{activeTechnique.character}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <GDocButton 
                  type="techniques" 
                  targetKey={activeTechnique.id} 
                  label="GDoc Thuật Thức" 
                  size="xs" 
                />

                <button 
                  onClick={() => setActiveTechnique(null)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                  title="Đóng (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Internal Navigation Tabs Bar */}
            <div className="px-6 py-2 bg-[#060709] border-b border-white/[0.06] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => setActiveModalTab('overview')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap border ${
                  activeModalTab === 'overview'
                    ? 'bg-white/15 text-white border-white/20 font-bold'
                    : 'bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Tổng Quan &amp; Ảnh</span>
              </button>

              <button
                onClick={() => setActiveModalTab('features')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  activeModalTab === 'features'
                    ? currentTheme.btnActive
                    : 'text-slate-400 hover:text-white hover:bg-[#141620]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Kỹ Năng Theo Cấp ({activeTechnique.features.length})</span>
              </button>

              {activeTechnique.domain && (
                <button
                  onClick={() => setActiveModalTab('domain')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                    activeModalTab === 'domain'
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : 'text-amber-400 bg-amber-950/30 border border-amber-800/40 hover:bg-amber-900/50'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Lãnh Địa Bành Trướng</span>
                </button>
              )}

              {activeTechnique.feats?.length > 0 && (
                <button
                  onClick={() => setActiveModalTab('feats')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                    activeModalTab === 'feats'
                      ? currentTheme.btnActive
                      : 'text-slate-400 hover:text-white hover:bg-[#141620]'
                  }`}
                >
                  <Scroll className="w-3.5 h-3.5" />
                  <span>Kỳ Tài ({activeTechnique.feats.length} Feats)</span>
                </button>
              )}

              {activeTechnique.tables?.length > 0 && (
                <button
                  onClick={() => setActiveModalTab('tables')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                    activeModalTab === 'tables'
                      ? currentTheme.btnActive
                      : 'text-slate-400 hover:text-white hover:bg-[#141620]'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Bảng Tham Chiếu</span>
                </button>
              )}
            </div>

            {/* Modal Body Content (Tab-dependent) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* ========================================================= */}
              {/* TAB 1: OVERVIEW & ARTWORK */}
              {/* ========================================================= */}
              {activeModalTab === 'overview' && (
                <div className="space-y-6">
                  {/* FEATURED ARTWORK WITH FULLSCREEN TRIGGER */}
                  {activeTechnique.images?.length > 0 && (
                    <div className="relative w-full rounded-2xl bg-[#070709] border border-[#232738] overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4">
                      {/* Ambient backdrop */}
                      <img 
                        src={`/images/${activeTechnique.images[selectedImgIndex] || activeTechnique.images[0]}`} 
                        alt="" 
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 pointer-events-none scale-125"
                      />
                      
                      {/* Main Showcase Image */}
                      <div className="relative z-10 group cursor-pointer" onClick={() => openLightboxWithImage(selectedImgIndex)}>
                        <img 
                          src={`/images/${activeTechnique.images[selectedImgIndex] || activeTechnique.images[0]}`} 
                          alt={activeTechnique.name}
                          className="max-h-72 sm:max-h-80 w-auto max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                        />
                        <button 
                          className="absolute bottom-2 right-2 p-2 rounded-lg bg-black/75 hover:bg-black text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Phóng to ảnh"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Image thumbnails switcher if multiple images */}
                      {activeTechnique.images.length > 1 && (
                        <div className="relative z-20 flex items-center justify-center gap-2 mt-3 pt-3 border-t border-[#1C1E2B] w-full overflow-x-auto">
                          {activeTechnique.images.map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedImgIndex(i)}
                              className={`relative h-14 w-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 bg-[#0A0A0C] ${
                                selectedImgIndex === i 
                                  ? 'border-purple-500 ring-2 ring-purple-500/40 scale-105' 
                                  : 'border-[#232738] opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img 
                                src={`/images/${img}`} 
                                alt="" 
                                className="w-full h-full object-contain p-0.5" 
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Lore Quote */}
                  {activeTechnique.description && (
                    <div className="p-4 bg-[#12131A] border-l-4 border-purple-500 rounded-r-2xl space-y-2 shadow-md">
                      <p className="text-slate-200 text-xs sm:text-sm italic leading-relaxed font-sans">
                        "{activeTechnique.description}"
                      </p>
                      {activeTechnique.descriptionEn && (
                        <details className="pt-2 border-t border-white/5 group/orig">
                          <summary className="text-[11px] font-mono text-slate-500 hover:text-slate-300 cursor-pointer list-none flex items-center gap-1.5 transition-colors">
                            <span className="text-[9px] text-purple-400 group-open/orig:rotate-90 transition-transform">▶</span>
                            <span>📄 Nguyên văn tiếng Anh (Original Rulebook Lore)</span>
                          </summary>
                          <p className="mt-1.5 text-[11px] text-slate-400 font-sans italic">
                            "{activeTechnique.descriptionEn}"
                          </p>
                        </details>
                      )}
                    </div>
                  )}

                  {/* Quick Summary Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div 
                      onClick={() => setActiveModalTab('features')}
                      className="p-4 rounded-xl bg-[#10121A] border border-[#202332] hover:border-purple-500/40 cursor-pointer transition-all"
                    >
                      <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">Tiến Trình Kỹ Năng</div>
                      <div className="text-lg font-bold text-white font-display flex items-center justify-between">
                        <span>{activeTechnique.features.length} Features</span>
                        <ChevronRight className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-[11px] text-slate-500 font-sans mt-0.5">Bấm để xem các cấp độ</div>
                    </div>

                    <div 
                      onClick={() => activeTechnique.domain && setActiveModalTab('domain')}
                      className={`p-4 rounded-xl border transition-all ${
                        activeTechnique.domain 
                          ? 'bg-[#151310] border-amber-900/40 hover:border-amber-500/50 cursor-pointer' 
                          : 'bg-[#10121A] border-[#202332] opacity-75'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-amber-400 uppercase mb-1">Lãnh Địa Bành Trướng</div>
                      <div className="text-sm font-bold text-white font-display flex items-center justify-between truncate">
                        <span className="truncate">
                          {activeTechnique.domain 
                            ? (activeTechnique.domain.vietnameseName ? activeTechnique.domain.vietnameseName.replace('Bành Trướng Lãnh Địa: ', '') : activeTechnique.domain.name.replace('Domain Expansion: ', '')) 
                            : 'Chưa mở khóa'}
                        </span>
                        {activeTechnique.domain && <Flame className="w-4 h-4 text-amber-400 shrink-0" />}
                      </div>
                      <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                        {activeTechnique.domain ? activeTechnique.domain.cost : 'Không có Lãnh Địa'}
                      </div>
                    </div>

                    <div 
                      onClick={() => activeTechnique.feats?.length > 0 && setActiveModalTab('feats')}
                      className={`p-4 rounded-xl border transition-all ${
                        activeTechnique.feats?.length > 0 
                          ? 'bg-[#10121A] border-[#202332] hover:border-cyan-500/40 cursor-pointer' 
                          : 'bg-[#10121A] border-[#202332] opacity-75'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-cyan-400 uppercase mb-1">Kỳ Tài Chuyên Sâu</div>
                      <div className="text-lg font-bold text-white font-display flex items-center justify-between">
                        <span>{activeTechnique.feats?.length || 0} Feats</span>
                        {activeTechnique.feats?.length > 0 && <Scroll className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <div className="text-[11px] text-slate-500 font-sans mt-0.5">Kỳ tài bẩm sinh</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 2: FEATURES PROGRESSION */}
              {/* ========================================================= */}
              {activeModalTab === 'features' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#1E2130]">
                    <div className="flex items-center space-x-2">
                      <Zap className={`w-4 h-4 ${currentTheme.accentClass}`} />
                      <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-display">
                        Tiến Trình Kỹ Năng Theo Cấp ({activeTechnique.features.length})
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-slate-500">Cấp 1 - 20</span>
                  </div>

                  <div className="space-y-4">
                    {activeTechnique.features.map((feat, idx) => (
                      <div 
                        key={idx}
                        className="p-5 rounded-2xl bg-[#12131A] border border-[#202332] hover:border-[#2C3146] transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center space-x-2.5">
                            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block shrink-0" />
                            <span className="text-sm sm:text-base font-bold text-white font-display">{feat.name}</span>
                            
                            {feat.level !== undefined && feat.level !== null && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#1B1D2A] text-purple-300 border border-purple-500/30">
                                CẤP {feat.level}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            {feat.action && (
                              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center space-x-1 border ${
                                feat.action === 'Bonus Action' ? 'bg-amber-950/50 text-amber-300 border-amber-800/40' :
                                feat.action === 'Reaction' ? 'bg-purple-950/50 text-purple-300 border-purple-800/40' :
                                'bg-blue-950/50 text-blue-300 border-blue-800/40'
                              }`}>
                                <Clock className="w-2.5 h-2.5" />
                                <span>{feat.action}</span>
                              </span>
                            )}

                            {feat.cost && (
                              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/60 text-rose-300 border border-rose-800/50">
                                {feat.cost}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 3: DOMAIN EXPANSION */}
              {/* ========================================================= */}
              {activeModalTab === 'domain' && (
                <div className="space-y-4">
                  {activeTechnique.domain ? (
                    <div className="p-5 sm:p-6 rounded-xl bg-[#08090C] border border-amber-500/30 relative overflow-hidden">
                      {/* Giant Kanji Watermark */}
                      <div className="absolute right-4 bottom-2 font-kanji font-black text-8xl text-white/[0.02] pointer-events-none select-none">
                        領域展開
                      </div>

                      <div className="relative z-10">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-amber-500/20">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                              <Flame className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 font-bold block">
                                Đỉnh Cao Chú Thuật • 領域展開
                              </span>
                              <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                                {activeTechnique.domain.vietnameseName || activeTechnique.domain.name}
                              </h3>
                              {activeTechnique.domain.vietnameseName && (
                                <span className="text-[11px] font-mono text-zinc-400 block mt-0.5">
                                  {activeTechnique.domain.name}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="px-2.5 py-1 text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-lg">
                            {activeTechnique.domain.cost}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-line font-sans">
                          {activeTechnique.domain.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-[#12131A] border border-[#202332] text-center text-slate-400">
                      <Flame className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-medium">Thuật thức này chưa có dữ liệu Lãnh Địa Bành Trướng.</p>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 4: FEATS */}
              {/* ========================================================= */}
              {activeModalTab === 'feats' && activeTechnique.feats?.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-[#1E2130]">
                    <Scroll className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-display">
                      Kỳ Tài Độc Quyền ({activeTechnique.feats.length} Feats)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeTechnique.feats.map((feat, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-[#12131A] border border-[#202332] hover:border-cyan-800/40 transition-colors">
                        <h4 className="text-sm font-bold text-cyan-300 font-display mb-1">{feat.name}</h4>
                        {feat.prerequisite && (
                          <span className="text-[10px] font-mono text-slate-400 block mb-2 italic bg-[#0A0A0C] px-2 py-0.5 rounded border border-white/5">
                            {feat.prerequisite}
                          </span>
                        )}
                        <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 5: SUPPLEMENTAL TABLES */}
              {/* ========================================================= */}
              {activeModalTab === 'tables' && activeTechnique.tables?.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-2 border-b border-[#1E2130]">
                    <TableIcon className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-display">
                      Bảng Tham Chiếu Bổ Trợ
                    </h3>
                  </div>

                  {activeTechnique.tables.map((table, tIdx) => (
                    <div key={tIdx} className="overflow-x-auto rounded-xl border border-[#202332]">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-[#171822] text-white text-[10px] uppercase font-mono border-b border-[#202332]">
                          <tr>
                            {table[0]?.map((cell, cIdx) => (
                              <th key={cIdx} className="px-3 py-2.5 font-semibold">{cell}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1B1D2A]">
                          {table.slice(1).map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-800/30">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3 py-2 font-mono text-[11px]">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#08080B] border-t border-[#1C1E2B] flex items-center justify-between">
              <div className="text-[11px] font-mono text-slate-500">
                {activeTechnique.name} • {activeTechnique.vietnameseName}
              </div>
              <button
                onClick={() => setActiveTechnique(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#171822] hover:bg-[#202330] border border-[#282D3F] rounded-xl transition-colors shadow-md font-sans"
              >
                Đóng Cửa Sổ
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FULLSCREEN IMAGE LIGHTBOX */}
      {isLightboxOpen && activeTechnique?.images?.length > 0 && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white bg-[#171822] rounded-full border border-white/10 transition-colors"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full max-h-[78vh] flex items-center justify-center overflow-hidden rounded-2xl bg-[#070709] border border-[#282D3F] p-4 shadow-2xl">
              <img 
                src={`/images/${activeTechnique.images[lightboxImgIndex]}`} 
                alt=""
                className="max-h-[74vh] max-w-full object-contain rounded-lg drop-shadow-2xl"
              />

              {activeTechnique.images.length > 1 && (
                <>
                  <button
                    onClick={() => setLightboxImgIndex((prev) => (prev - 1 + activeTechnique.images.length) % activeTechnique.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-black text-white border border-white/10 transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setLightboxImgIndex((prev) => (prev + 1) % activeTechnique.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-black text-white border border-white/10 transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
