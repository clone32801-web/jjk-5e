import React, { useState, useEffect } from 'react';
import { 
  Swords, Shield, Heart, Zap, Sparkles, BookOpen, Layers, 
  Maximize2, X, ChevronLeft, ChevronRight, Eye, Dumbbell, 
  Flame, Crown, Target, Crosshair, Package, ChevronDown, 
  ChevronUp, Clock, Wand2, ShieldAlert, Sparkle, ShieldCheck
} from 'lucide-react';
import classesData from '../data/classes.json';
import { useTheme } from '../context/ThemeContext';

export default function ClassesView({ selectedClassId, onSelectClass }) {
  const [activeClassId, setActiveClassId] = useState(selectedClassId || 'juggernaut');
  const [selectedPreviewImage, setSelectedPreviewImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Filter & Toggle states
  const [selectedTier, setSelectedTier] = useState('all'); // 'all', '1-4', '5-10', '11-16', '17-20'
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);

  // Specific state for Heavenly Restriction sub-sections
  const [activeIdealTab, setActiveIdealTab] = useState('all'); // 'all', 'prideful', 'vengeful'
  const [activeBodyCat, setActiveBodyCat] = useState('all'); // 'all', 'strength', 'speed', 'durability', 'mind'

  const { currentTheme } = useTheme();

  // Keep active class synced if prop changes
  useEffect(() => {
    if (selectedClassId) {
      setActiveClassId(selectedClassId);
    }
  }, [selectedClassId]);

  const handleSelectClass = (id) => {
    setActiveClassId(id);
    if (onSelectClass) onSelectClass(id);
  };

  const currentClass = classesData.find(c => c.id === activeClassId) || classesData[0];

  // Reset preview image & tabs when switching class
  useEffect(() => {
    setSelectedPreviewImage(currentClass.image || (currentClass.images && currentClass.images[0]) || null);
    setModalImageIndex(0);
    setSelectedTier('all');
    setIsEquipmentOpen(false);
    setActiveIdealTab('all');
    setActiveBodyCat('all');
  }, [activeClassId, currentClass]);

  const classBadges = {
    'juggernaut': { role: 'Đấu Sĩ Tiền Tuyến', kanji: '拳', color: 'from-red-600 to-rose-800' },
    'scout': { role: 'Trinh Sát Cơ Động', kanji: '速', color: 'from-amber-500 to-orange-700' },
    'strategist': { role: 'Quân Sư Chú Thuật', kanji: '謀', color: 'from-blue-600 to-cyan-800' },
    'shikigami-user': { role: 'Thức Thần Sư', kanji: '影', color: 'from-purple-600 to-indigo-800' },
    'support-specialist': { role: 'Chuyên Gia Kết Giới', kanji: '結', color: 'from-emerald-600 to-teal-800' },
    'warrior': { role: 'Võ Sĩ Chú Cụ', kanji: '刀', color: 'from-rose-600 to-pink-800' },
    'heavenly-restriction': { role: 'Thiên Dữ Chú Phược', kanji: '縛', color: 'from-zinc-500 to-slate-800' },
  };

  // All images for active class (excluding background image)
  const classImages = (currentClass.images || []).filter(img => img !== currentClass.backgroundImage);
  const currentDisplayedImage = selectedPreviewImage || currentClass.image || (classImages.length > 0 ? classImages[0] : null);

  const openModalWithImage = (img) => {
    const idx = classImages.indexOf(img);
    setModalImageIndex(idx !== -1 ? idx : 0);
    setIsImageModalOpen(true);
  };

  const nextModalImage = (e) => {
    e.stopPropagation();
    setModalImageIndex((prev) => (prev + 1) % classImages.length);
  };

  const prevModalImage = (e) => {
    e.stopPropagation();
    setModalImageIndex((prev) => (prev - 1 + classImages.length) % classImages.length);
  };

  const isHeavenlyRestriction = currentClass.id === 'heavenly-restriction';
  const isStrategist = currentClass.id === 'strategist';
  const isShikigamiUser = currentClass.id === 'shikigami-user';
  const isSupportSpecialist = currentClass.id === 'support-specialist';

  // Filter features by tier
  const filteredFeatures = (currentClass.features || []).filter(feat => {
    if (selectedTier === 'all') return true;
    const lvl = feat.level || 1;
    if (selectedTier === '1-4') return lvl >= 1 && lvl <= 4;
    if (selectedTier === '5-10') return lvl >= 5 && lvl <= 10;
    if (selectedTier === '11-16') return lvl >= 11 && lvl <= 16;
    if (selectedTier === '17-20') return lvl >= 17 && lvl <= 20;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Decorative Background Watermark */}
      <div className="absolute right-6 top-8 font-kanji font-black text-7xl text-white/[0.02] pointer-events-none select-none hidden lg:block">
        呪術等級
      </div>

      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest ${currentTheme.badgeClass}`}>
            [7 術師クラス]
          </span>
          <span className="text-xs text-slate-500 font-mono">D&D 5E JJK EDITION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Classes of Jujutsu Kaisen
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans max-w-2xl">
          7 Lớp nhân vật định hình vai trò chiến đấu, thể lực căn bản và tiến trình 20 cấp độ chú thuật sư.
        </p>
      </div>

      {/* Class Selector Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {classesData.map((cls) => {
          const isActive = cls.id === activeClassId;
          const badge = classBadges[cls.id] || { role: 'Sorcerer', kanji: '呪', color: 'from-purple-600 to-indigo-600' };
          return (
            <button
              key={cls.id}
              onClick={() => handleSelectClass(cls.id)}
              className={`flex-shrink-0 flex items-center space-x-3 px-3.5 py-2.5 rounded-2xl border transition-all text-left group ${
                isActive
                  ? `bg-[#181924] ${currentTheme.borderAccent} text-white shadow-lg ring-1 ring-white/10`
                  : 'bg-[#12131A] border-[#232636] text-slate-400 hover:text-slate-200 hover:bg-[#151722]'
              }`}
            >
              {/* Character thumbnail avatar with Kanji overlay */}
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-[#0A0A0C] shadow-inner">
                {cls.image ? (
                  <img 
                    src={`/images/${cls.image}`} 
                    alt={cls.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${badge.color} flex items-center justify-center font-kanji font-black text-white text-sm`}>
                    {badge.kanji}
                  </div>
                )}
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-tl-md bg-gradient-to-br ${badge.color} flex items-center justify-center text-[8px] font-kanji font-black text-white shadow`}>
                  {badge.kanji}
                </div>
              </div>

              <div>
                <div className={`text-xs sm:text-sm font-bold font-display ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  {cls.vietnameseName || cls.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate max-w-[130px]">{cls.name}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Class Content */}
      <div className="space-y-8">
        
        {/* Banner with Overview, Background & Artwork */}
        <div className="relative rounded-3xl bg-[#0E0F14] border border-[#232636] p-6 sm:p-8 overflow-hidden shadow-2xl">
          
          {/* CINEMATIC BACKGROUND WALLPAPER (NỀN) */}
          {currentClass.backgroundImage ? (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <img 
                src={`/images/${currentClass.backgroundImage}`} 
                alt="" 
                aria-hidden="true"
                className="w-full h-full object-cover object-center opacity-30 scale-105 filter brightness-95 contrast-125 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/75 to-[#0A0A0C]/35" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/85 md:via-[#0A0A0C]/70 to-[#0A0A0C]/40" />
            </div>
          ) : (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              {currentClass.image && (
                <img 
                  src={`/images/${currentClass.image}`} 
                  alt="" 
                  aria-hidden="true"
                  className="w-full h-full object-cover object-center opacity-15 blur-2xl scale-125 transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent" />
            </div>
          )}

          {/* Banner Main Row */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start justify-between">
            
            {/* Left Column: Description & Lore */}
            <div className="max-w-3xl flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#171822]/90 backdrop-blur-md text-slate-300 border border-[#2E3347]">
                  <span className={`w-2 h-2 rounded-full ${currentTheme.bgAccent}`} />
                  <span>{classBadges[currentClass.id]?.role}</span>
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-kanji font-bold bg-[#171822]/90 backdrop-blur-md text-slate-400 border border-[#2E3347]">
                  {classBadges[currentClass.id]?.kanji}
                </span>

                {/* CE Formula Pill */}
                {currentClass.ceFormula && (
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-cyan-950/40 text-cyan-300 border border-cyan-800/40">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span>Chú Lực: {currentClass.ceFormula}</span>
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
                {currentClass.vietnameseName || currentClass.name}
              </h2>
              {currentClass.vietnameseName && (
                <div className="text-sm sm:text-base font-bold text-purple-300 font-mono mt-1">
                  {currentClass.name}
                </div>
              )}

              <p className="mt-4 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans drop-shadow-md">
                {currentClass.description || 'Lớp nhân vật chiến đấu cơ bản của thế giới Chú thuật.'}
              </p>

              {/* Stat summary grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                
                {/* Hit Points Card */}
                <div className="p-4 rounded-2xl bg-[#0A0A0C]/85 backdrop-blur-md border border-[#232636] shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-red-400 uppercase font-mono mb-2.5">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-400 shrink-0" />
                        <span>Hit Points</span>
                      </div>
                      {currentClass.hitDiceLabel && (
                        <span className="text-[10px] text-slate-400 font-mono lowercase">{currentClass.hitDiceLabel}</span>
                      )}
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 font-mono text-[11px]">1st Level:</span>
                        <span className="font-semibold text-slate-100 text-right">{currentClass.hpAt1st}</span>
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 font-mono text-[11px]">Higher Levels:</span>
                        <span className="font-semibold text-slate-100 text-right">{currentClass.hpHigher}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proficiencies Card */}
                <div className="p-4 rounded-2xl bg-[#0A0A0C]/85 backdrop-blur-md border border-[#232636] shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase font-mono mb-2.5">
                      <Shield className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Proficiencies &amp; Saves</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                      {currentClass.profData?.armor && (
                        <div className="leading-snug">
                          <span className="text-slate-400 font-mono text-[11px]">Armor: </span>
                          <span>{currentClass.profData.armor}</span>
                        </div>
                      )}
                      {currentClass.profData?.weapons && (
                        <div className="leading-snug">
                          <span className="text-slate-400 font-mono text-[11px]">Weapons: </span>
                          <span>{currentClass.profData.weapons}</span>
                        </div>
                      )}
                      {currentClass.profData?.savingThrows && (
                        <div className="leading-snug">
                          <span className="text-slate-400 font-mono text-[11px]">Saving Throws: </span>
                          <span className="text-cyan-300 font-medium">{currentClass.profData.savingThrows}</span>
                        </div>
                      )}
                      {currentClass.profData?.skills && (
                        <div className="leading-snug text-[11px] text-slate-400 pt-0.5">
                          <span className="text-slate-500 font-mono">Skills: </span>
                          <span>{currentClass.profData.skills}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Heavenly Restriction: 0 CE Supernatural Traits Grid */}
              {isHeavenlyRestriction && currentClass.pactTraits && (
                <div className="mt-5 p-4 rounded-2xl bg-[#080910]/95 backdrop-blur-md border border-cyan-900/40 shadow-xl">
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/5">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold font-display uppercase tracking-wider text-cyan-200">
                        Đặc Quyền Thể Chất 0 Chú Lực (0 CE Supernatural Traits)
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                      Giao Ước Bẩm Sinh
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentClass.pactTraits.map((trait, tIdx) => (
                      <div key={tIdx} className="p-2.5 rounded-xl bg-[#0C0E16] border border-white/5 hover:border-cyan-800/40 transition-colors">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-white font-display truncate">{trait.title}</span>
                          <span className="text-[9px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40 shrink-0">
                            {trait.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                          {trait.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Starting Equipment Collapsible Drawer */}
              {currentClass.startingEquipment && (
                <div className="mt-4 pt-3 border-t border-[#1E2130]">
                  <button
                    onClick={() => setIsEquipmentOpen(!isEquipmentOpen)}
                    className="flex items-center justify-between w-full py-2 px-3.5 rounded-xl bg-[#0A0A0C]/60 hover:bg-[#0A0A0C] border border-[#232636] text-xs font-mono text-slate-300 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-amber-400" />
                      <span className="font-semibold text-slate-200">Trang Bị Khởi Đầu (Starting Equipment)</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <span>{isEquipmentOpen ? 'Thu gọn' : 'Xem chi tiết'}</span>
                      {isEquipmentOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isEquipmentOpen && (
                    <div className="mt-2.5 p-4 rounded-xl bg-[#07070A] border border-[#202332] text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans shadow-inner">
                      {isHeavenlyRestriction ? (
                        <div className="space-y-2.5">
                          <p className="text-slate-400 italic">Trang bị khởi đầu ngoài trang bị được cấp từ Background:</p>
                          <div className="p-3 rounded-xl bg-[#0F1018] border border-white/5 space-y-2">
                            <div className="text-slate-300">
                              • <span className="font-bold text-white font-mono">(a)</span> 2 Simple Weapons <span className="text-slate-500 font-mono">HOẶC</span> <span className="font-bold text-white font-mono">(b)</span> 1 Martial Melee Weapon
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 text-slate-300">
                              <span>• <span className="font-bold text-white font-mono">(a)</span> 1 Dagger <span className="text-slate-500 font-mono">HOẶC</span> <span className="font-bold text-white font-mono">(b)</span></span>
                              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-amber-950/70 text-amber-300 border border-amber-600/60 shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                                <span>🔫 Súng Ngắn (Handgun / Firearm)</span>
                              </span>
                              <span className="text-[10px] text-slate-400 italic">(Vũ khí chiến thuật ám sát của Toji)</span>
                            </div>
                            <div className="text-slate-300">
                              • 1 Bộ thám hiểm (Explorer's Pack) và 4 ngọn lao (Javelins).
                            </div>
                          </div>
                        </div>
                      ) : (
                        currentClass.startingEquipment
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Right Column: Character Artwork Box & Image Selector */}
            <div className="w-full lg:w-80 shrink-0 flex flex-col items-center">
              
              {/* Artwork Box */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#2E3347] bg-[#070709]/95 shadow-2xl flex items-center justify-center group">
                
                {/* Ambient glow matching the current image */}
                {currentDisplayedImage && (
                  <img 
                    src={`/images/${currentDisplayedImage}`} 
                    alt="" 
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-125 pointer-events-none transition-all duration-500"
                  />
                )}

                {/* Main uncropped image */}
                {currentDisplayedImage ? (
                  <img 
                    src={`/images/${currentDisplayedImage}`} 
                    alt={currentClass.name} 
                    className="relative z-10 max-h-full max-w-full object-contain p-2.5 drop-shadow-[0_10px_25px_rgba(0,0,0,0.85)] transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    onClick={() => openModalWithImage(currentDisplayedImage)}
                  />
                ) : (
                  <Sparkles className="w-12 h-12 text-slate-700" />
                )}

                {/* Enlarge Button */}
                <button
                  onClick={() => openModalWithImage(currentDisplayedImage)}
                  className="absolute bottom-2.5 right-2.5 z-20 flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-black/70 hover:bg-black/90 backdrop-blur-md text-slate-300 hover:text-white border border-white/10 transition-colors"
                  title="Xem phóng to ảnh"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Phóng to</span>
                </button>
              </div>

              {/* Multiple Images Selector Strip */}
              {classImages.length > 1 && (
                <div className="w-full mt-3">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
                    {classImages.map((img, idx) => {
                      const isSelected = img === currentDisplayedImage;

                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedPreviewImage(img)}
                          className={`relative w-14 h-14 rounded-xl overflow-hidden border shrink-0 transition-all ${
                            isSelected
                              ? `${currentTheme.borderAccent} ring-2 ring-white/20 scale-105 shadow-lg`
                              : 'border-[#262A3B] opacity-60 hover:opacity-100 hover:border-slate-500'
                          } bg-[#0A0A0C]`}
                          title={`Ảnh #${idx + 1}`}
                        >
                          <img 
                            src={`/images/${img}`} 
                            alt="" 
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* 20-Level Progression Table */}
        {currentClass.table?.length > 0 && (
          <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 shadow-xl overflow-hidden">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className={`w-5 h-5 ${currentTheme.accentClass}`} />
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Bảng Tiến Trình Cấp Độ (Progression Table: Levels 1 - 20)
              </h3>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#202332]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#171822] text-white font-mono text-[10px] uppercase border-b border-[#232636]">
                  <tr>
                    {currentClass.table[0]?.map((col, i) => (
                      <th key={i} className="px-4 py-3 font-semibold tracking-wider">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C1E2B]">
                  {currentClass.table.slice(1).map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-800/25 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td 
                          key={cIdx} 
                          className={`px-4 py-2.5 font-mono text-xs ${
                            cIdx === 0 ? 'font-bold text-purple-400' : 
                            cIdx === 2 ? 'font-sans text-slate-200' : 'text-slate-400'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SPECIALIZED SECTION: SHIKIGAMI USER QUICK RULES */}
        {/* ========================================================================= */}
        {isShikigamiUser && (
          <div className="rounded-3xl bg-gradient-to-r from-[#141522] via-[#0F1018] to-[#12131A] border border-indigo-900/40 p-6 shadow-xl">
            <div className="flex items-center space-x-2.5 mb-4">
              <Sparkle className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Cẩm Nang Triệu Hồi &amp; Điều Khiển Thức Thần (Shikigami Rules)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#090A0E] border border-indigo-900/30">
                <div className="font-mono font-bold text-indigo-300 uppercase mb-1">📍 Tầm Triệu Hồi</div>
                <p className="text-slate-300 font-sans">Trong phạm vi 30 feet, tại một không gian trống chưa bị chiếm chỗ.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090A0E] border border-indigo-900/30">
                <div className="font-mono font-bold text-indigo-300 uppercase mb-1">💎 Chi Phí Triệu Hồi</div>
                <p className="text-slate-300 font-sans">Miễn phí 1 lần mỗi lần Long Rest, các lần sau tốn 3 Chú Lực (CE).</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090A0E] border border-indigo-900/30">
                <div className="font-mono font-bold text-indigo-300 uppercase mb-1">⚡ Lượt &amp; Ra Lệnh</div>
                <p className="text-slate-300 font-sans">Dùng chung Initiative, đi ngay sau lượt bạn. Dùng Bonus Action để ra lệnh tấn công/dùng chiêu.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#090A0E] border border-indigo-900/30">
                <div className="font-mono font-bold text-indigo-300 uppercase mb-1">⏳ Thời Lượng</div>
                <p className="text-slate-300 font-sans">Tồn tại vĩnh viễn đến khi bị giảm về 0 HP, bạn triệu hồi lại hoặc tử trận.</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SPECIALIZED SECTION: STRATEGIST TECHNIQUE CREATIVITY (10 METAMAGICS) */}
        {/* ========================================================================= */}
        {isStrategist && currentClass.techniqueCreativities && (
          <div className="rounded-3xl bg-[#12131A] border border-blue-900/40 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#1E2130]">
              <div className="flex items-center space-x-2.5">
                <Wand2 className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    10 Biến Hóa Thuật Thức (Technique Creativity — Mở khóa Cấp 2)
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    Chọn 2 tùy chọn tại Cấp 2, thêm 1 tùy chọn tại Cấp 10 và Cấp 17 để tùy biến uy lực chiêu thức.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-950/50 text-blue-300 border border-blue-800/50">
                10 Tùy Chọn
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentClass.techniqueCreativities.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0A0A0C] border border-[#202332] hover:border-blue-700/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                          {item.name}
                        </h4>
                        {item.nameEn && (
                          <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                            {item.nameEn}
                          </span>
                        )}
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950/60 text-cyan-300 border border-blue-800/40 shrink-0">
                        {item.cost}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CLASS FEATURES BREAKDOWN (WITH TIER FILTER & ACTION BADGES) */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1E2130]">
            <div className="flex items-center space-x-2">
              <Zap className={`w-5 h-5 ${currentTheme.accentClass}`} />
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                {isHeavenlyRestriction ? '1. Tính Năng Tiến Trình Cốt Lõi (Core Features)' : `Tính Năng Chi Tiết (${filteredFeatures.length} / ${currentClass.features.length})`}
              </h3>
            </div>

            {/* Level Tier Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
              <button
                onClick={() => setSelectedTier('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedTier === 'all'
                    ? currentTheme.btnActive
                    : 'bg-[#0A0A0C] border border-[#232636] text-slate-400 hover:text-white'
                }`}
              >
                Tất cả ({currentClass.features.length})
              </button>
              <button
                onClick={() => setSelectedTier('1-4')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedTier === '1-4'
                    ? currentTheme.btnActive
                    : 'bg-[#0A0A0C] border border-[#232636] text-slate-400 hover:text-white'
                }`}
              >
                Cấp 1 - 4
              </button>
              <button
                onClick={() => setSelectedTier('5-10')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedTier === '5-10'
                    ? currentTheme.btnActive
                    : 'bg-[#0A0A0C] border border-[#232636] text-slate-400 hover:text-white'
                }`}
              >
                Cấp 5 - 10
              </button>
              <button
                onClick={() => setSelectedTier('11-16')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedTier === '11-16'
                    ? currentTheme.btnActive
                    : 'bg-[#0A0A0C] border border-[#232636] text-slate-400 hover:text-white'
                }`}
              >
                Cấp 11 - 16
              </button>
              <button
                onClick={() => setSelectedTier('17-20')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  selectedTier === '17-20'
                    ? currentTheme.btnActive
                    : 'bg-[#0A0A0C] border border-[#232636] text-slate-400 hover:text-white'
                }`}
              >
                Cấp 17 - 20
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredFeatures.map((feat, fIdx) => (
              <div 
                key={fIdx}
                className="p-5 rounded-2xl bg-[#0A0A0C] border border-[#202332] hover:border-[#2C3146] transition-all hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${currentTheme.bgAccent} border ${currentTheme.borderAccent} inline-block shrink-0`} />
                    <h4 className="text-sm sm:text-base font-bold text-white font-display">
                      {feat.name}
                      {feat.vietnameseName && feat.vietnameseName !== feat.name && (
                        <span className="text-xs font-normal text-slate-400 font-sans ml-2">
                          • {feat.vietnameseName}
                        </span>
                      )}
                    </h4>

                    {/* Action Tag (Bonus Action, Reaction, Action) */}
                    {feat.action && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold flex items-center space-x-1 border ${
                        feat.action === 'Bonus Action' ? 'bg-amber-950/40 text-amber-300 border-amber-800/40' :
                        feat.action === 'Reaction' ? 'bg-purple-950/40 text-purple-300 border-purple-800/40' :
                        'bg-blue-950/40 text-blue-300 border-blue-800/40'
                      }`}>
                        <Clock className="w-2.5 h-2.5" />
                        <span>{feat.action}</span>
                      </span>
                    )}

                    {/* Mechanic Tag */}
                    {feat.tag && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-[#161722] border border-white/5">
                        {feat.tag}
                      </span>
                    )}
                  </div>

                  {/* Level Activation Badge */}
                  {feat.level !== undefined && feat.level !== null && (
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all ${
                      feat.level === 20 
                        ? 'bg-amber-950/50 text-amber-300 border-amber-600/60 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                        : feat.level >= 10
                        ? 'bg-purple-950/45 text-purple-300 border-purple-700/50 shadow-[0_0_8px_rgba(168,85,247,0.15)]'
                        : 'bg-[#161824] text-cyan-300 border-cyan-800/40 shadow-[0_0_8px_rgba(6,182,212,0.1)]'
                    }`}>
                      <span className="opacity-70 text-[10px]">CẤP</span>
                      <span>{feat.level}</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                  {feat.description}
                </p>

                {feat.descriptionEn && (
                  <details className="mt-3 group/en">
                    <summary className="text-[11px] font-mono text-purple-400/80 hover:text-purple-300 cursor-pointer select-none transition-colors inline-flex items-center space-x-1">
                      <span>📄 Văn bản gốc tiếng Anh (Original Rule)</span>
                    </summary>
                    <div className="mt-2 p-3 rounded-xl bg-[#07080C] border border-[#1A1D2B] text-xs font-mono text-slate-400 leading-relaxed whitespace-pre-line">
                      {feat.descriptionEn}
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* HEAVENLY RESTRICTION SPECIALIZED SECTION 2: IDEAL (SUBCLASSES) */}
        {/* ========================================================================= */}
        {isHeavenlyRestriction && currentClass.ideals && (
          <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-[#1E2130]">
              <div className="flex items-center space-x-2.5">
                <Crown className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    2. Lựa Chọn Lý Tưởng (Ideal - Mở khóa tại Cấp 3)
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {currentClass.ideals.description}
                  </p>
                </div>
              </div>

              {/* Toggle view tabs */}
              <div className="flex items-center p-1 bg-[#0A0A0C] border border-[#232636] rounded-xl text-xs font-mono">
                <button
                  onClick={() => setActiveIdealTab('all')}
                  className={`px-3 py-1 rounded-lg transition-all ${activeIdealTab === 'all' ? 'bg-[#1E2130] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Đối Chiếu Song Song
                </button>
                <button
                  onClick={() => setActiveIdealTab('prideful')}
                  className={`px-3 py-1 rounded-lg transition-all ${activeIdealTab === 'prideful' ? 'bg-amber-950/60 text-amber-300 font-bold border border-amber-800/50' : 'text-slate-400 hover:text-white'}`}
                >
                  🦁 Prideful (Toji)
                </button>
                <button
                  onClick={() => setActiveIdealTab('vengeful')}
                  className={`px-3 py-1 rounded-lg transition-all ${activeIdealTab === 'vengeful' ? 'bg-red-950/60 text-rose-300 font-bold border border-red-800/50' : 'text-slate-400 hover:text-white'}`}
                >
                  🗡️ Vengeful (Maki)
                </button>
              </div>
            </div>

            {/* Subclasses Display Grid */}
            <div className={`grid gap-6 ${activeIdealTab === 'all' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
              {currentClass.ideals.subclasses
                .filter(sub => activeIdealTab === 'all' || activeIdealTab === sub.id)
                .map((sub) => (
                  <div 
                    key={sub.id} 
                    className="p-6 rounded-2xl bg-[#0A0A0C] border border-[#242838] relative overflow-hidden flex flex-col justify-between shadow-2xl"
                  >
                    {/* Background Kanji Watermark */}
                    <div className="absolute right-4 top-2 font-kanji font-black text-8xl text-white/[0.03] pointer-events-none select-none">
                      {sub.kanji}
                    </div>

                    <div>
                      {/* Subclass Header */}
                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <div className="flex items-center space-x-3">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-white font-kanji font-black text-base shadow-md`}>
                            {sub.kanji}
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white font-display">
                              {sub.name}
                            </h4>
                            <div className="text-[11px] font-mono text-slate-400">
                              Đại diện: <span className="text-slate-200 font-semibold">{sub.character}</span>
                            </div>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#141620] border border-white/10 text-slate-300">
                          4 Features
                        </span>
                      </div>

                      {/* Quote */}
                      <blockquote className="mb-4 text-xs italic text-slate-400 border-l-2 border-[#33384D] pl-3 py-0.5">
                        "{sub.quote}"
                      </blockquote>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans mb-5">
                        {sub.description}
                      </p>

                      {/* Subclass Features List */}
                      <div className="space-y-3.5">
                        {sub.features.map((feat, fIdx) => (
                          <div 
                            key={fIdx}
                            className="p-4 rounded-xl bg-[#10121A] border border-[#1E2232] hover:border-[#2C3146] transition-colors"
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <h5 className="text-xs sm:text-sm font-bold text-white font-display flex items-center space-x-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${sub.id === 'prideful' ? 'bg-amber-400' : 'bg-red-400'}`} />
                                <span>{feat.name}</span>
                              </h5>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                feat.level >= 15 ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40' : 'bg-[#181B28] text-cyan-300 border border-cyan-800/40'
                              }`}>
                                CẤP {feat.level}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                              {feat.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* HEAVENLY RESTRICTION SPECIALIZED SECTION 3: BODY IMPROVEMENTS CATALOG */}
        {/* ========================================================================= */}
        {isHeavenlyRestriction && currentClass.bodyImprovements && (
          <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1E2130]">
              <div className="flex items-center space-x-2.5">
                <Dumbbell className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    3. Kho Cải Tiến Cơ Thể (Body Improvements List - Mở khóa tại Cấp 2)
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {currentClass.bodyImprovements.description}
                  </p>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
                <button
                  onClick={() => setActiveBodyCat('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeBodyCat === 'all'
                      ? currentTheme.btnActive
                      : 'bg-[#0A0A0C] border border-[#232636] text-slate-400 hover:text-white'
                  }`}
                >
                  Tất cả (20)
                </button>
                {currentClass.bodyImprovements.categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveBodyCat(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                      activeBodyCat === cat.id
                        ? currentTheme.btnActive
                        : 'bg-[#0A0A0C] border border-[#232636] text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.tag} ({cat.items.length})
                  </button>
                ))}
              </div>
            </div>

            {/* Body Improvements Display Grid */}
            <div className="space-y-8">
              {currentClass.bodyImprovements.categories
                .filter(cat => activeBodyCat === 'all' || activeBodyCat === cat.id)
                .map(cat => (
                  <div key={cat.id} className="space-y-3">
                    {/* Category Title & Cap Rule */}
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          cat.tag === 'STR' ? 'bg-red-950/60 text-red-300 border border-red-800/40' :
                          cat.tag === 'DEX' ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40' :
                          cat.tag === 'CON' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40' :
                          'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                        }`}>
                          {cat.tag}
                        </span>
                        <h4 className="text-sm font-bold text-white font-display">
                          {cat.name}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {cat.limit}
                      </span>
                    </div>

                    {/* Upgrades Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cat.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="p-4 rounded-2xl bg-[#0A0A0C] border border-[#202332] hover:border-[#2C3146] transition-all flex flex-col justify-between shadow-lg"
                        >
                          <div>
                            {/* Card Header: Name & Badges */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h5 className="text-sm font-bold text-white font-display">
                                {item.name}
                              </h5>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#171A27] text-cyan-300 border border-cyan-800/40 shrink-0">
                                {item.cost}
                              </span>
                            </div>

                            {/* Requirements Bar */}
                            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                              {item.level && item.level > 2 && (
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                  item.level === 20 ? 'bg-amber-950/50 text-amber-300 border border-amber-700/50' :
                                  item.level >= 10 ? 'bg-purple-950/50 text-purple-300 border border-purple-700/50' :
                                  'bg-[#12141D] text-slate-300 border border-white/10'
                                }`}>
                                  Yêu cầu Cấp {item.level}
                                </span>
                              )}
                              {item.statReq && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#12141D] text-amber-400/90 border border-amber-800/30">
                                  {item.statReq}
                                </span>
                              )}
                            </div>

                            {/* Description */}
                            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

      </div>

      {/* FULLSCREEN IMAGE MODAL LIGHTBOX */}
      {isImageModalOpen && classImages.length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white bg-[#171822] rounded-full border border-white/10 transition-colors"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Lightbox Image */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-2xl bg-[#070709] border border-[#282D3F] p-4 shadow-2xl">
              <img 
                src={`/images/${classImages[modalImageIndex]}`} 
                alt={`${currentClass.name} image #${modalImageIndex + 1}`}
                className="max-h-[70vh] max-w-full object-contain rounded-lg drop-shadow-2xl"
              />

              {/* Prev / Next navigation arrows if multiple images */}
              {classImages.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/10 transition-all hover:scale-110"
                    title="Ảnh trước"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/10 transition-all hover:scale-110"
                    title="Ảnh kế tiếp"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Bottom Caption & Selector */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full px-2 gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="text-white font-bold">{currentClass.name}</span>
                <span>•</span>
                <span>Ảnh {modalImageIndex + 1} / {classImages.length}</span>
              </div>

              {/* Thumbnail strip in modal */}
              {classImages.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {classImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setModalImageIndex(i)}
                      className={`w-9 h-9 rounded-lg overflow-hidden border shrink-0 transition-all ${
                        i === modalImageIndex ? `${currentTheme.borderAccent} ring-1 ring-white/30 scale-105` : 'border-white/10 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={`/images/${img}`} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
