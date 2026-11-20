import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Crown, 
  Zap, 
  Heart, 
  Shield, 
  Flame, 
  User, 
  Scroll, 
  Package, 
  Compass, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  FlameKindling,
  Award,
  Layers
} from 'lucide-react';
import backgroundsData from '../data/backgrounds.json';
import { useTheme } from '../context/ThemeContext';
import GDocButton from './GDocButton';

export default function BackgroundsView({ activeTab: propTab, setActiveTab: propSetTab }) {
  const { currentTheme } = useTheme();

  // Active top-level tab: 'backgrounds' | 'mindsets'
  const [internalTab, setInternalTab] = useState('backgrounds');
  const activeTab = propTab || internalTab;
  const setActiveTab = propSetTab || setInternalTab;
  const [search, setSearch] = useState('');

  // Lightbox modal state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const { backgrounds, mindsets } = backgroundsData;

  // Filtered Backgrounds
  const filteredBackgrounds = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return backgrounds;
    return backgrounds.filter(b => 
      b.name.toLowerCase().includes(q) ||
      (b.vietnameseName && b.vietnameseName.toLowerCase().includes(q)) ||
      (b.character && b.character.toLowerCase().includes(q)) ||
      b.description.toLowerCase().includes(q) ||
      b.feat.toLowerCase().includes(q) ||
      (b.featVi && b.featVi.toLowerCase().includes(q)) ||
      b.skills.toLowerCase().includes(q)
    );
  }, [search, backgrounds]);

  // Filtered Mindsets
  const filteredMindsets = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mindsets;
    return mindsets.filter(m => 
      m.name.toLowerCase().includes(q) ||
      (m.vietnameseName && m.vietnameseName.toLowerCase().includes(q)) ||
      (m.character && m.character.toLowerCase().includes(q)) ||
      m.quote.toLowerCase().includes(q) ||
      m.mechanic.toLowerCase().includes(q)
    );
  }, [search, mindsets]);

  const openLightbox = (img) => {
    setLightboxImg(img);
    setIsLightboxOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Decorative Watermark */}
      <div className="absolute right-6 top-8 font-kanji font-black text-7xl text-white/[0.02] pointer-events-none select-none hidden lg:block">
        背景心態
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest ${currentTheme.badgeClass}`}>
            [5 背景 • 16 心態]
          </span>
          <span className="text-xs text-slate-500 font-mono">D&amp;D 5E JJK EDITION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Backgrounds &amp; Mindsets
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans max-w-3xl">
          Xuất thân xã hội và Tâm thế chú thuật định hình con đường của Chú thuật sư. Cơ chế thay thế hoàn toàn cho hệ thống Căn Chỉnh Đạo Đức (Alignments) và Cảm Hứng (Inspiration) truyền thống trong D&amp;D 5e.
        </p>
      </div>

      {/* Main Mode Tabs Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-4 mb-8 gap-3">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => { setActiveTab('backgrounds'); setSearch(''); }}
            className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors shrink-0 ${
              activeTab === 'backgrounds'
                ? `${currentTheme.bgAccent} ${currentTheme.accentClass} border ${currentTheme.borderAccent} ring-1 ring-white/10`
                : 'bg-[#0D0E13] border border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-[#12141C]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Xuất Thân (Backgrounds)</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-[#08090C] text-slate-400 rounded-md font-mono border border-white/[0.06]">
              {backgrounds.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('mindsets'); setSearch(''); }}
            className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors shrink-0 ${
              activeTab === 'mindsets'
                ? `${currentTheme.bgAccent} ${currentTheme.accentClass} border ${currentTheme.borderAccent} ring-1 ring-white/10`
                : 'bg-[#0D0E13] border border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-[#12141C]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Tâm Thế Chú Thuật (Mindsets / Alignments)</span>
            <span className="px-1.5 py-0.5 text-[10px] bg-[#08090C] text-slate-400 rounded-md font-mono border border-white/[0.06]">
              {mindsets.length}
            </span>
          </button>
        </div>

        <GDocButton 
          type="backgrounds" 
          targetKey={activeTab} 
          label={activeTab === 'backgrounds' ? "GDoc Xuất Thân" : "GDoc Tâm Thế"} 
          size="sm" 
        />
      </div>

      {/* Search Input Bar */}
      <div className="bg-[#0D0E13] border border-white/[0.08] rounded-xl p-3 sm:p-4 mb-8 flex items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeTab === 'backgrounds' ? "Tìm xuất thân (Clan Sorcerer, Genius, Yuji...)..." : "Tìm tâm thế (Honored One, Cog, Gojo, Nanami...)..."}
            className="w-full pl-10 pr-4 py-2 bg-[#08090C] border border-white/[0.08] rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-white/20 font-sans"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <span className="text-xs text-slate-500 font-mono hidden sm:inline">
          {activeTab === 'backgrounds' ? `${filteredBackgrounds.length} Xuất Thân` : `${filteredMindsets.length} Tâm Thế`}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 1. BACKGROUNDS CONTENT */}
      {/* ========================================================================= */}
      {activeTab === 'backgrounds' && (
        <div className="space-y-6">
          
          {/* Rule Callout Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0D0E13] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3">
              <Scroll className="w-5 h-5 text-purple-400 shrink-0" />
              <p className="text-slate-300 font-sans">
                <strong className="text-white">Quy tắc Feat Xuất Thân:</strong> Tất cả các Background trong JJK 5e đều cấp sẵn 1 Feat tương ứng. Các Background từ D&amp;D 5e thông thường cũng được phép dùng và nhận 1 Feat phù hợp do DM phê duyệt.
              </p>
            </div>
          </div>

          {/* Backgrounds Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {filteredBackgrounds.map((bg) => (
              <div 
                key={bg.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#0D0E13] border border-white/[0.08] hover:border-white/[0.14] transition-colors flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  
                  {/* Top Header Row with Artwork */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                    {/* Artwork Container */}
                    {bg.image && (
                      <div 
                        onClick={() => openLightbox(bg.image)}
                        className="relative w-full sm:w-36 h-44 rounded-xl overflow-hidden bg-[#08090C] border border-white/[0.08] shrink-0 flex items-center justify-center cursor-pointer group"
                      >
                        <img 
                          src={`/images/${bg.image}`} 
                          alt={bg.name}
                          className="relative z-10 max-h-full max-w-full object-contain p-2"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <button 
                          className="absolute bottom-2 right-2 p-1.5 rounded-md bg-black/80 hover:bg-black text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Phóng to"
                        >
                          <Maximize2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Titles & Meta */}
                    <div className="flex-1">
                      <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#12141D] border border-white/[0.08] text-[10px] font-mono text-purple-300 mb-2">
                        <User className="w-2.5 h-2.5 text-purple-400" />
                        <span>Đại diện: {bg.character}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                        {bg.name}
                      </h3>
                      <div className="text-xs text-amber-300/90 font-sans font-medium mb-2">
                        {bg.vietnameseName}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-4">
                        {bg.description}
                      </p>
                    </div>
                  </div>

                  {/* Feat Pill (Highlighted) */}
                  <div className="p-3 rounded-xl bg-[#12101B] border border-purple-500/20 text-xs text-purple-200 mb-3 flex items-start space-x-2">
                    <Award className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block text-[10px] font-mono uppercase tracking-wider">Kỳ Tài Được Cấp (Granted Feat):</span>
                      <span className="text-purple-300 font-mono text-xs font-semibold">{bg.feat}</span>
                      {bg.featVi && (
                        <div className="text-[11px] text-purple-200/80 font-sans mt-0.5">{bg.featVi}</div>
                      )}
                    </div>
                  </div>

                  {/* Skills & Tools Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                    <div className="p-2.5 rounded-lg bg-[#0A0B0E] border border-white/[0.05]">
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Kỹ năng thành thạo:</span>
                      <span className="font-semibold text-slate-200 font-mono">{bg.skills}</span>
                    </div>

                    {bg.tools ? (
                      <div className="p-2.5 rounded-lg bg-[#0A0B0E] border border-white/[0.05]">
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Công cụ thành thạo:</span>
                        <span className="font-semibold text-slate-200 font-mono">{bg.tools}</span>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-[#0A0B0E] border border-white/[0.05]">
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">Công cụ thành thạo:</span>
                        <span className="text-slate-500 font-mono italic">Không có</span>
                      </div>
                    )}
                  </div>

                  {/* Starting Equipment */}
                  <div className="p-3 rounded-lg bg-[#0A0B0E] border border-white/[0.05] text-xs text-slate-300 mb-3">
                    <div className="flex items-center space-x-1.5 text-slate-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-1">
                      <Package className="w-3.5 h-3.5 text-amber-400" />
                      <span>Trang bị khởi đầu:</span>
                    </div>
                    <p className="font-sans leading-relaxed text-[11px] text-slate-300">{bg.equipment}</p>
                  </div>

                  {/* Unique Background Feature */}
                  <div className="p-3 rounded-lg bg-[#0D1117] border border-cyan-500/20 text-xs">
                    <div className="font-bold text-cyan-300 font-display mb-1 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Đặc Quyền: {bg.feature.name} {bg.feature.vietnameseName && `(${bg.feature.vietnameseName})`}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans leading-relaxed whitespace-pre-line">{bg.feature.desc}</p>
                  </div>

                  {/* Original English Background Rules Collapsible */}
                  {bg.descriptionEn && (
                    <details className="mt-3.5 group/orig border border-white/[0.06] rounded-lg bg-[#08090C] p-2.5 text-xs">
                      <summary className="cursor-pointer text-slate-400 hover:text-slate-200 font-mono text-[11px] select-none flex items-center justify-between">
                        <span>[ EN ] Văn bản gốc tiếng Anh (Original Rule)</span>
                        <span className="text-[10px] text-slate-500">▼</span>
                      </summary>
                      <div className="mt-2 text-slate-300 font-mono text-[11px] leading-relaxed border-t border-white/[0.06] pt-2 space-y-2">
                        <p className="whitespace-pre-line text-slate-300">{bg.descriptionEn}</p>
                        <div className="pt-2 border-t border-white/[0.06] space-y-1 text-[10px]">
                          <div><span className="text-slate-400 font-bold">Feat:</span> {bg.feat}</div>
                          <div><span className="text-slate-400 font-bold">Skill Proficiencies:</span> {bg.skills}</div>
                          {bg.toolsEn && <div><span className="text-slate-400 font-bold">Tool Proficiency:</span> {bg.toolsEn}</div>}
                          <div><span className="text-slate-400 font-bold">Equipment:</span> {bg.equipmentEn || bg.equipment}</div>
                          <div className="pt-1">
                            <span className="text-slate-400 font-bold">Feature: {bg.feature.name}</span>
                            <p className="mt-0.5 text-slate-300 whitespace-pre-line">{bg.feature.descEn || bg.feature.desc}</p>
                          </div>
                        </div>
                      </div>
                    </details>
                  )}

                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MINDSETS (ALIGNMENTS & INSPIRATION) CONTENT */}
      {/* ========================================================================= */}
      {activeTab === 'mindsets' && (
        <div className="space-y-6">
          
          {/* Mindsets Explanation Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0D0E13] border border-amber-500/20 space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-amber-300 font-bold font-display text-sm">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Hệ Thống Tâm Thế Chú Thuật (Mindset Inspiration Mechanics)</span>
            </div>
            <p className="text-slate-300 font-sans leading-relaxed">
              Trong thế giới Jujutsu Kaisen, cảm xúc tiêu cực và triết lý sống trực tiếp nuôi dưỡng và định hình uy lực của Chú lực. Hệ thống <strong className="text-white">Mindset</strong> thay thế cho thang căn chỉnh Lawful/Chaotic Good/Evil truyền thống. Mỗi khi bạn sử dụng điểm <strong className="text-amber-300">Cảm Hứng (Inspiration)</strong>, nhân vật sẽ kích hoạt năng lực thăng hoa độc nhất của Tâm thế mình theo đuổi!
            </p>
          </div>

          {/* Mindsets Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredMindsets.map((ms) => (
              <div 
                key={ms.id}
                className="p-5 rounded-2xl bg-[#0D0E13] border border-white/[0.08] hover:border-white/[0.14] transition-colors flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Kanji Watermark */}
                <div className="absolute right-3 top-2 font-kanji font-black text-6xl text-white/[0.02] pointer-events-none select-none">
                  {ms.kanji}
                </div>

                <div>
                  
                  {/* Top Row with Artwork */}
                  <div className="flex items-start gap-3.5 mb-4">
                    {/* Artwork Container */}
                    {ms.image && (
                      <div 
                        onClick={() => openLightbox(ms.image)}
                        className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#08090C] border border-white/[0.08] shrink-0 flex items-center justify-center cursor-pointer group/art"
                        title="Nhấn để phóng to ảnh"
                      >
                        <img 
                          src={`/images/${ms.image}`} 
                          alt={ms.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover/art:scale-105"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/art:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 className="w-3.5 h-3.5 text-white drop-shadow" />
                        </div>
                      </div>
                    )}

                    {/* Titles */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-kanji font-bold text-xs text-amber-400/90 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-900/30">
                          {ms.kanji}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white font-display">
                        {ms.name}
                      </h3>
                      <div className="text-[11px] text-amber-300/90 font-sans font-medium">
                        {ms.vietnameseName}
                      </div>

                      {ms.character && (
                        <div className="text-[10px] font-mono text-purple-300 mt-1 flex items-center space-x-1">
                          <User className="w-2.5 h-2.5 text-purple-400" />
                          <span className="truncate">{ms.character}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lore Quote */}
                  <blockquote className="mb-4 text-xs italic text-slate-400 border-l-2 border-white/20 pl-3 py-1 font-sans leading-relaxed">
                    "{ms.quote}"
                  </blockquote>

                  {/* Inspiration Mechanic Card */}
                  <div className="p-3 rounded-xl bg-[#141009] border border-amber-500/20">
                    <div className="flex items-center space-x-1.5 text-amber-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>Kích Hoạt Inspiration:</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium whitespace-pre-line">
                      {ms.mechanic}
                    </p>
                  </div>

                  {/* Original English Mindset Collapsible */}
                  {(ms.quoteEn || ms.mechanicEn) && (
                    <details className="mt-3 group/orig border border-white/[0.06] rounded-lg bg-[#08090C] p-2.5 text-xs">
                      <summary className="cursor-pointer text-slate-400 hover:text-slate-200 font-mono text-[11px] select-none flex items-center justify-between">
                        <span>[ EN ] Văn bản gốc tiếng Anh (Original Rule)</span>
                        <span className="text-[10px] text-slate-500">▼</span>
                      </summary>
                      <div className="mt-2 text-slate-300 font-mono text-[11px] leading-relaxed border-t border-white/[0.06] pt-2 space-y-1.5">
                        {ms.quoteEn && (
                          <p className="italic text-slate-400">"{ms.quoteEn}"</p>
                        )}
                        {ms.mechanicEn && (
                          <p className="whitespace-pre-line"><strong className="text-amber-300">Inspiration:</strong> {ms.mechanicEn}</p>
                        )}
                      </div>
                    </details>
                  )}

                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && lightboxImg && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white bg-[#14151D] rounded-full border border-white/10 transition-colors"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full max-h-[78vh] flex items-center justify-center overflow-hidden rounded-xl bg-[#08090C] border border-white/[0.08] p-4">
              <img 
                src={`/images/${lightboxImg}`} 
                alt=""
                className="max-h-[74vh] max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
