import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Sparkles, 
  Skull, 
  Maximize2, 
  X, 
  ChevronLeft,
  ChevronRight,
  User,
  ShieldCheck
} from 'lucide-react';
import racesData from '../data/races.json';
import { useTheme } from '../context/ThemeContext';

export default function RacesView({ selectedRaceId, onSelectRace }) {
  const [internalRaceId, setInternalRaceId] = useState(racesData[0]?.id || 'human-races');
  const activeRaceId = selectedRaceId || internalRaceId;
  const setActiveRaceId = onSelectRace || setInternalRaceId;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImgIndex, setLightboxImgIndex] = useState(0);

  const { currentTheme } = useTheme();

  const currentRace = racesData.find(r => r.id === activeRaceId) || racesData[0];

  const raceBadges = {
    'human-races': { tag: 'Nhân Loại & Chú Thuật Gia', kanji: '人間', icon: Users, color: 'text-blue-400', badgeClass: 'bg-blue-950/60 text-blue-300 border-blue-800/50' },
    'cursed-vessel': { tag: 'Vật Chứa Chú Vật Tái Sinh', kanji: '器', icon: Skull, color: 'text-rose-400', badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-800/50' },
    'cursed-corpses': { tag: 'Chú Hài Độc Lập', kanji: '呪骸', icon: Shield, color: 'text-emerald-400', badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50' },
    'cursed-spirits': { tag: 'Nguyền Hồn & Chú Linh', kanji: '呪霊', icon: Sparkles, color: 'text-purple-400', badgeClass: 'bg-purple-950/60 text-purple-300 border-purple-800/50' },
  };

  const handleSelectRace = (raceId) => {
    setActiveRaceId(raceId);
    setSelectedImageIndex(0);
  };

  const safeImageIndex = currentRace.images && currentRace.images.length > 0
    ? Math.min(selectedImageIndex, currentRace.images.length - 1)
    : 0;
  const currentArtwork = currentRace.images?.[safeImageIndex];

  const openLightboxWithIndex = (idx) => {
    setLightboxImgIndex(idx);
    setIsLightboxOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Decorative Watermark */}
      <div className="absolute right-6 top-8 font-kanji font-black text-7xl text-white/[0.02] pointer-events-none select-none hidden lg:block">
        呪術種族
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest ${currentTheme.badgeClass}`}>
            [4 呪術種族]
          </span>
          <span className="text-xs text-slate-500 font-mono">D&amp;D 5E JJK EDITION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Races &amp; Lineages
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
          Chủng tộc và nguồn gốc thể xác trong thế giới Chú Thuật: từ Con người, Vật Chứa nguyền rủa đến Chú Hài và Nguyền Hồn.
        </p>
      </div>

      {/* Race Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {racesData.map((race) => {
          const isActive = race.id === activeRaceId;
          const badge = raceBadges[race.id] || { tag: 'Race', kanji: '種', icon: Users, color: 'text-purple-400' };
          const Icon = badge.icon;
          return (
            <button
              key={race.id}
              onClick={() => handleSelectRace(race.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-[#181924] border-[#383D56] text-white shadow-lg ring-1 ring-white/10'
                  : 'bg-[#12131A] border-[#232636] text-slate-400 hover:text-slate-200 hover:bg-[#151722]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 ${badge.color}`} />
                  <span className="text-[10px] font-mono text-slate-400 truncate">{badge.tag}</span>
                </div>
                <span className="font-kanji text-xs text-slate-500 font-bold">{badge.kanji}</span>
              </div>
              <div className="text-sm font-bold font-display">{race.name}</div>
              {race.vietnameseName && (
                <div className="text-[11px] text-slate-400 font-sans mt-0.5 truncate">{race.vietnameseName}</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Race Content */}
      <div className="space-y-6">
        
        {/* Banner with Character Artwork */}
        <div className="rounded-3xl bg-gradient-to-br from-[#12131A] via-[#0E0F14] to-[#0A0A0C] border border-[#232636] p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          {/* Subtle Ambient Background Watermark/Glow */}
          {currentArtwork && (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <img
                src={`/images/${currentArtwork}`}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-center opacity-10 blur-3xl scale-125 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent" />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between relative z-10">
            
            {/* Left Column: Lore & Overview */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${raceBadges[currentRace.id]?.badgeClass}`}>
                  {raceBadges[currentRace.id]?.tag} • {raceBadges[currentRace.id]?.kanji}
                </span>
                {currentRace.character && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#161824] text-purple-300 border border-[#2A2E44]">
                    <User className="w-3 h-3 text-purple-400" />
                    <span>Đại diện: {currentRace.character}</span>
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
                {currentRace.name}
              </h2>
              {currentRace.vietnameseName && (
                <div className="text-base sm:text-lg text-amber-300 font-semibold font-sans mt-1">
                  {currentRace.vietnameseName}
                </div>
              )}

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
                {currentRace.description || 'Thông tin chi tiết về chủng tộc và nguồn gốc thể xác trong hệ thống.'}
              </p>

              {/* Quick Info Badges */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <div className="px-3 py-1.5 rounded-xl bg-[#0A0A0C]/80 border border-[#232636] text-xs font-mono text-slate-300 flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{currentRace.subraces?.length || currentRace.traits?.length || 0} Phân tộc biến thể</span>
                </div>
                {currentRace.images?.length > 1 && (
                  <div className="px-3 py-1.5 rounded-xl bg-[#0A0A0C]/80 border border-[#232636] text-xs font-mono text-slate-300 flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>{currentRace.images.length} Minh họa nhân vật</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Featured Showcase Artwork + Thumbnails */}
            {currentRace.images?.length > 0 && (
              <div className="w-full lg:w-80 shrink-0 flex flex-col items-center">
                
                {/* Main Showcase Box */}
                <div 
                  onClick={() => openLightboxWithIndex(safeImageIndex)}
                  className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#282D3F] bg-[#070709] shadow-2xl flex items-center justify-center cursor-pointer group"
                >
                  {/* Ambient Glow */}
                  <img 
                    src={`/images/${currentArtwork}`} 
                    alt="" 
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 pointer-events-none transition-all duration-500"
                  />

                  {/* Main Uncropped Image */}
                  <img
                    src={`/images/${currentArtwork}`}
                    alt={`${currentRace.name} illustration`}
                    className="relative z-10 max-h-full max-w-full object-contain p-3 drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />

                  {/* Enlarge Hint Button */}
                  <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-black/75 hover:bg-black backdrop-blur-md text-slate-300 hover:text-white border border-white/10 transition-colors">
                    <Maximize2 className="w-3 h-3" />
                    <span>Phóng to</span>
                  </div>

                  {/* Image Counter Badge if multiple */}
                  {currentRace.images.length > 1 && (
                    <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/70 backdrop-blur-md text-slate-300 border border-white/10">
                      {safeImageIndex + 1} / {currentRace.images.length}
                    </div>
                  )}
                </div>

                {/* Multiple Images Thumbnails Strip */}
                {currentRace.images.length > 1 && (
                  <div className="w-full mt-3">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar justify-center sm:justify-start">
                      {currentRace.images.map((img, idx) => {
                        const isSelected = idx === safeImageIndex;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`relative w-12 h-12 rounded-xl overflow-hidden border transition-all shrink-0 bg-[#070709] ${
                              isSelected
                                ? 'border-purple-400 ring-2 ring-purple-500/50 scale-105'
                                : 'border-[#282D3F] opacity-60 hover:opacity-100 hover:border-slate-500'
                            }`}
                            title={`Xem minh họa ${idx + 1}`}
                          >
                            <img
                              src={`/images/${img}`}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 text-center mt-1.5">
                      Nhấn vào ô nhỏ để đổi minh họa hoặc phóng to
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>

        {/* Base Traits Section (if available) */}
        {currentRace.baseTraits?.length > 0 && (
          <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 sm:p-8 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white font-display mb-4 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>Đặc Tính Thể Chất Nền Tảng (Base Traits)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {currentRace.baseTraits.map((trait, idx) => {
                const colonIdx = trait.indexOf(':');
                if (colonIdx > 0 && colonIdx < 50) {
                  const title = trait.substring(0, colonIdx);
                  const body = trait.substring(colonIdx + 1);
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0A0A0C] border border-[#202332] text-xs leading-relaxed font-sans">
                      <span className="font-bold text-cyan-300 font-display block sm:inline">{title}:</span>
                      <span className="text-slate-300">{body}</span>
                    </div>
                  );
                }
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0A0C] border border-[#202332] text-xs text-slate-300 leading-relaxed font-sans">
                    • {trait}
                  </div>
                );
              })}
            </div>

            {/* Original English Base Traits Collapsible */}
            {currentRace.baseTraitsEn?.length > 0 && (
              <details className="mt-4 group/orig border border-slate-800/80 rounded-xl bg-[#070709] p-3 text-xs">
                <summary className="cursor-pointer text-slate-400 hover:text-slate-200 font-mono text-[11px] select-none flex items-center justify-between">
                  <span>📄 Đặc tính gốc tiếng Anh (Original Base Traits)</span>
                  <span className="text-[10px] text-slate-500">▼</span>
                </summary>
                <div className="mt-2.5 space-y-1.5 text-slate-300 font-mono text-[11px] leading-relaxed border-t border-slate-800/60 pt-2.5">
                  {currentRace.baseTraitsEn.map((t, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5">
                      <span className="text-cyan-400 shrink-0">•</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}

        {/* Subraces / Lineage Variants Section */}
        {currentRace.subraces?.length > 0 && (
          <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1E2130]">
              <div className="flex items-center space-x-2">
                <Sparkles className={`w-5 h-5 ${currentTheme.accentClass}`} />
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  Các Phân Tộc Tiêu Biểu ({currentRace.subraces.length} Subraces)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500">Lựa chọn nguồn gốc</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentRace.subraces.map((sub, sIdx) => (
                <div 
                  key={sIdx}
                  className="p-5 rounded-2xl bg-[#0A0A0C] border border-[#222638] hover:border-[#333852] transition-all flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-base font-bold text-white font-display">
                          {sub.name}
                        </h4>
                        {sub.vietnameseName && (
                          <div className="text-xs text-amber-300 font-sans font-medium mt-0.5">
                            {sub.vietnameseName}
                          </div>
                        )}
                      </div>
                      {sub.speed && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#161824] text-cyan-300 border border-cyan-800/40 shrink-0">
                          {sub.speed}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
                      {sub.desc}
                    </p>

                    {sub.asi && (
                      <div className="mb-3 p-2.5 rounded-xl bg-[#12141F] border border-white/5 text-xs text-amber-300 font-mono">
                        <span className="text-slate-400 font-sans block text-[11px] mb-0.5 font-bold uppercase">Tăng Chỉ Số (ASI):</span>
                        {sub.asi}
                      </div>
                    )}

                    {sub.features?.length > 0 && (
                      <div className="space-y-2 text-xs text-slate-300 font-sans mt-3">
                        <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">Đặc Quyền Phân Tộc:</span>
                        {sub.features.map((feat, fIdx) => (
                          <div key={fIdx} className="p-2.5 rounded-xl bg-[#12131A] border border-[#202332]">
                            {typeof feat === 'object' ? (
                              <div>
                                <div className="font-bold text-cyan-300 font-display mb-1 flex items-center space-x-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block shrink-0" />
                                  <span>{feat.name}</span>
                                  {feat.vietnameseName && (
                                    <span className="text-[11px] text-slate-400 font-sans font-normal">({feat.vietnameseName})</span>
                                  )}
                                </div>
                                <div className="text-slate-300 leading-relaxed whitespace-pre-line text-[11px]">
                                  {feat.desc}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start space-x-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block shrink-0 mt-1.5" />
                                <span className="leading-relaxed">{feat}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Original English Subrace Rules Collapsible */}
                    {sub.descriptionEn && (
                      <details className="mt-4 group/orig border border-slate-800/80 rounded-xl bg-[#070709] p-2.5 text-xs">
                        <summary className="cursor-pointer text-slate-400 hover:text-slate-200 font-mono text-[11px] select-none flex items-center justify-between">
                          <span>📄 Văn bản gốc tiếng Anh (Original Rule)</span>
                          <span className="text-[10px] text-slate-500">▼</span>
                        </summary>
                        <div className="mt-2 text-slate-300 font-mono text-[11px] leading-relaxed whitespace-pre-line border-t border-slate-800/60 pt-2">
                          {sub.descriptionEn}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fallback to original traits if subraces not defined */}
        {(!currentRace.subraces || currentRace.subraces.length === 0) && currentRace.traits?.length > 0 && (
          <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 sm:p-8 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold text-white font-display mb-6 flex items-center space-x-2">
              <Sparkles className={`w-5 h-5 ${currentTheme.accentClass}`} />
              <span>Đặc Tính Chủng Tộc ({currentRace.traits.length} Traits)</span>
            </h3>

            <div className="space-y-4">
              {currentRace.traits.map((trait, tIdx) => (
                <div 
                  key={tIdx}
                  className="p-5 rounded-2xl bg-[#0A0A0C] border border-[#202332] hover:border-[#2C3146] transition-colors"
                >
                  <h4 className="text-sm font-bold text-purple-300 font-display mb-2 flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${currentTheme.bgAccent} border ${currentTheme.borderAccent} inline-block`} />
                    <span>{trait.name}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX */}
      {isLightboxOpen && currentRace?.images?.length > 0 && (
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
                src={`/images/${currentRace.images[lightboxImgIndex]}`} 
                alt=""
                className="max-h-[74vh] max-w-full object-contain rounded-lg drop-shadow-2xl"
              />

              {currentRace.images.length > 1 && (
                <>
                  <button
                    onClick={() => setLightboxImgIndex((prev) => (prev - 1 + currentRace.images.length) % currentRace.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-black text-white border border-white/10 transition-all hover:scale-110"
                    title="Ảnh trước"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setLightboxImgIndex((prev) => (prev + 1) % currentRace.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/75 hover:bg-black text-white border border-white/10 transition-all hover:scale-110"
                    title="Ảnh tiếp theo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Caption / Indicator */}
            {currentRace.images.length > 1 && (
              <div className="mt-3 text-xs font-mono text-slate-400">
                Minh họa {lightboxImgIndex + 1} / {currentRace.images.length} • {currentRace.vietnameseName || currentRace.name}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
