import React, { useState, useMemo } from 'react';
import { 
  UserPlus, 
  Sparkles, 
  Shield, 
  Swords, 
  Zap, 
  Flame, 
  Heart, 
  Brain, 
  Scroll, 
  ChevronRight, 
  Copy, 
  Check, 
  Compass, 
  Package, 
  Award, 
  Dices, 
  ExternalLink,
  BookOpen,
  ArrowRight,
  HelpCircle,
  FileText,
  User,
  Activity
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import characterCreationData from '../data/characterCreation.json';
import classesData from '../data/classes.json';
import techniquesData from '../data/techniques.json';
import racesData from '../data/races.json';
import backgroundsData from '../data/backgrounds.json';
import GDocButton from './GDocButton';

export default function CharacterCreationView({ 
  activeStep, 
  setActiveStep,
  onNavigateTab 
}) {
  const { currentTheme } = useTheme();

  // Mode: 'guide' (Sổ tay 9 bước) | 'builder' (Trình tạo thử tương tác)
  const [viewMode, setViewMode] = useState('guide');
  const [internalStepId, setInternalStepId] = useState('concept');
  const activeStepId = activeStep || internalStepId;
  const setActiveStepId = setActiveStep || setInternalStepId;
  const [copied, setCopied] = useState(false);

  // -------------------------------------------------------------
  // Interactive Builder State
  // -------------------------------------------------------------
  const [charName, setCharName] = useState('Yuji Itadori');
  const [charConcept, setCharConcept] = useState('Học sinh cao đẳng chú thuật Tokyo, thiện chiến cận chiến và ý chí bảo vệ người khác');
  const [selectedRaceId, setSelectedRaceId] = useState('human-races');
  const [selectedSubrace, setSelectedSubrace] = useState('Jujutsu Sorcerer');
  const [selectedClassId, setSelectedClassId] = useState('juggernaut');
  const [selectedTechniqueId, setSelectedTechniqueId] = useState('divergent-fist');
  const [selectedBackgroundId, setSelectedBackgroundId] = useState('sorcerer-student');
  const [cursedAbility, setCursedAbility] = useState('WIS'); // 'WIS' | 'CHA' | 'INT'
  
  // 6 Ability Scores
  const [scores, setScores] = useState({
    STR: 15,
    DEX: 14,
    CON: 13,
    INT: 10,
    WIS: 12,
    CHA: 8
  });

  // Calculate modifier
  const getMod = (score) => Math.floor((score - 10) / 2);
  const formatMod = (mod) => (mod >= 0 ? `+${mod}` : `${mod}`);

  // Current selected objects
  const currentClass = useMemo(() => {
    return classesData.find(c => c.id === selectedClassId) || classesData[0];
  }, [selectedClassId]);

  const currentTechnique = useMemo(() => {
    return techniquesData.find(t => t.id === selectedTechniqueId) || techniquesData[0];
  }, [selectedTechniqueId]);

  const currentRace = useMemo(() => {
    return racesData.find(r => r.id === selectedRaceId) || racesData[0];
  }, [selectedRaceId]);

  const currentBackground = useMemo(() => {
    return backgroundsData.backgrounds?.find(b => b.id === selectedBackgroundId) || backgroundsData.backgrounds?.[0];
  }, [selectedBackgroundId]);

  // Hit Die number
  const hitDieMax = useMemo(() => {
    if (selectedClassId === 'juggernaut') return 12;
    if (selectedClassId === 'warrior') return 10;
    if (selectedClassId === 'strategist') return 6;
    if (selectedClassId === 'heavenly-restriction') return 12;
    return 8; // scout, shikigami-user, support-specialist
  }, [selectedClassId]);

  // Calculated Stats
  const conMod = getMod(scores.CON);
  const dexMod = getMod(scores.DEX);
  const wisMod = getMod(scores.WIS);
  const chaMod = getMod(scores.CHA);
  const intMod = getMod(scores.INT);

  const ceMod = cursedAbility === 'WIS' ? wisMod : cursedAbility === 'CHA' ? chaMod : intMod;
  const pb = 2; // Level 1

  // HP = Hit Die Max + CON Mod (min 1)
  const maxHp = Math.max(1, hitDieMax + conMod);

  // AC: if Juggernaut (Unarmored Defense: 10 + DEX + CON) otherwise 10 + DEX
  const calculatedAc = selectedClassId === 'juggernaut' 
    ? 10 + dexMod + Math.max(0, conMod)
    : 10 + dexMod;

  const initiative = dexMod;

  // Level 1 CE Pool
  const baseCeAt1 = useMemo(() => {
    if (selectedClassId === 'heavenly-restriction') return 0;
    if (selectedClassId === 'strategist') return 4;
    return 3; // Juggernaut, Scout, Shikigami, Support, Warrior
  }, [selectedClassId]);

  const cePool = selectedClassId === 'heavenly-restriction' ? 0 : Math.max(0, baseCeAt1 + ceMod);
  const ceSaveDc = selectedClassId === 'heavenly-restriction' ? 'N/A' : (8 + pb + ceMod);
  const ceAttackBonus = selectedClassId === 'heavenly-restriction' ? 'N/A' : formatMod(pb + ceMod);

  // Apply Standard Array
  const applyStandardArray = () => {
    if (selectedClassId === 'juggernaut') {
      setScores({ STR: 15, CON: 14, DEX: 13, WIS: 12, INT: 10, CHA: 8 });
    } else if (selectedClassId === 'scout') {
      setScores({ DEX: 15, WIS: 14, CON: 13, STR: 12, INT: 10, CHA: 8 });
    } else if (selectedClassId === 'strategist') {
      setScores({ INT: 15, WIS: 14, CON: 13, DEX: 12, CHA: 10, STR: 8 });
    } else if (selectedClassId === 'shikigami-user') {
      setScores({ WIS: 15, CON: 14, DEX: 13, CHA: 12, INT: 10, STR: 8 });
    } else if (selectedClassId === 'warrior') {
      setScores({ STR: 15, DEX: 14, CON: 13, WIS: 12, CHA: 10, INT: 8 });
    } else if (selectedClassId === 'heavenly-restriction') {
      setScores({ STR: 15, DEX: 14, CON: 13, WIS: 12, INT: 10, CHA: 8 });
    } else {
      setScores({ WIS: 15, CON: 14, DEX: 13, INT: 12, CHA: 10, STR: 8 });
    }
  };

  // Copy Character Summary
  const handleCopySummary = () => {
    const text = `=== JUJUTSU KAISEN 5E CHARACTER SHEET (LEVEL 1) ===
Tên Nhân Vật: ${charName}
Khái Niệm: ${charConcept}
Chủng Tộc: ${currentRace.name} (${selectedSubrace})
Lớp Nhân Vật: ${currentClass.vietnameseName || currentClass.name} (Hit Die: d${hitDieMax})
Xuất Thân: ${currentBackground?.name || 'Chưa chọn'}
Thuật Thức Bẩm Sinh: ${currentTechnique.vietnameseName || currentTechnique.name} (${currentTechnique.name})
${currentTechnique.domain ? `Lãnh Địa Bành Trướng: ${currentTechnique.domain.vietnameseName || currentTechnique.domain.name}` : 'Lãnh Địa: Chưa thức tỉnh'}

--- CHỈ SỐ THUỘC TÍNH (ABILITY SCORES) ---
STR: ${scores.STR} (${formatMod(getMod(scores.STR))})
DEX: ${scores.DEX} (${formatMod(getMod(scores.DEX))})
CON: ${scores.CON} (${formatMod(getMod(scores.CON))})
INT: ${scores.INT} (${formatMod(getMod(scores.INT))})
WIS: ${scores.WIS} (${formatMod(getMod(scores.WIS))})
CHA: ${scores.CHA} (${formatMod(getMod(scores.CHA))})

--- CHỈ SỐ CHIẾN ĐẤU & CHÚ THUẬT (LEVEL 1) ---
Máu Tối Đa (Max HP): ${maxHp}
Giáp (AC): ${calculatedAc}
Sáng Kiến (Initiative): ${formatMod(initiative)}
Thưởng Thành Thạo (PB): +${pb}
Bể Chú Lực (CE Pool): ${cePool} CE
Thuộc Tính Chú Lực: ${cursedAbility} (${formatMod(ceMod)})
Độ Khó Cứu Nguy Chú Thuật (CE Save DC): ${ceSaveDc}
Thưởng Đòn Đánh Chú Thuật (CE Attack Bonus): ${ceAttackBonus}
==================================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
      {/* ========================================================================= */}
      {/* HERO SECTION */}
      {/* ========================================================================= */}
      <div className="relative mb-10 pb-8 border-b border-[#202332] overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-48 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-800/50 flex items-center space-x-1.5">
              <UserPlus className="w-3 h-3 text-purple-400" />
              <span>Chapter 1: Making a Character</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-400 bg-[#161824] border border-[#262A3C]">
              Chuẩn 1:1 theo sách gốc &amp; eidorii.com
            </span>
            <GDocButton 
              type="categories" 
              targetKey="creation" 
              label="GDoc Tạo Nhân Vật" 
              size="xs" 
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-display tracking-tight flex items-center gap-3">
                <span>{characterCreationData.vietnameseTitle}</span>
                <span className="text-sm font-kanji text-slate-600 font-normal hidden sm:inline">
                  [{characterCreationData.kanji}]
                </span>
              </h1>
              <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
                {characterCreationData.subtitle}. Lộ trình toàn diện hướng dẫn người chơi thiết lập bảng nhân vật hoàn chỉnh, tính toán điểm số và chuẩn bị bước vào các nhiệm vụ thanh tẩy nguyền hồn.
              </p>
            </div>

            {/* Mode Switcher Toggle */}
            <div className="flex items-center p-1 bg-[#0F1015] border border-white/10 rounded-xl shrink-0">
              <button
                onClick={() => setViewMode('guide')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-colors ${
                  viewMode === 'guide'
                    ? currentTheme.btnActive
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Sổ Tay 9 Bước</span>
              </button>
              <button
                onClick={() => setViewMode('builder')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-colors ${
                  viewMode === 'builder'
                    ? currentTheme.btnActive
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Trình Tạo Thử (Builder)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: STEP-BY-STEP GUIDE */}
      {/* ========================================================================= */}
      {viewMode === 'guide' && (
        <div className="space-y-8">
          
          {/* Step Selector Pills Bar */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center space-x-1.5 min-w-max p-1 rounded-xl bg-[#0F1015] border border-white/[0.08]">
              {characterCreationData.steps.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStepId(st.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors border ${
                    activeStepId === st.id
                      ? `${currentTheme.btnActive} border-white/20`
                      : 'bg-transparent border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
                    activeStepId === st.id ? 'bg-black/30 text-white' : 'bg-white/[0.06] text-zinc-400'
                  }`}>
                    {st.step}
                  </span>
                  <span>{st.title.split('(')[0].trim()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content Card */}
          {characterCreationData.steps.filter(st => st.id === activeStepId).map((stepItem) => (
            <div 
              key={stepItem.id} 
              className="p-5 sm:p-6 rounded-2xl bg-[#0D0E13] border border-white/[0.08] relative overflow-hidden space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#12101B] text-purple-300 border border-purple-500/20">
                      BƯỚC {stepItem.step} TRÊN 9
                    </span>
                    <span className="text-xs font-mono text-slate-500 uppercase">{stepItem.id}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                    {stepItem.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
                    {stepItem.subtitle}
                  </p>
                </div>

                {stepItem.linkTab && onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab(stepItem.linkTab)}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#14151D] text-slate-200 border border-white/[0.08] hover:bg-[#1A1C28] transition-colors self-start sm:self-auto shrink-0"
                  >
                    <span>Mở Tab {stepItem.title.split('(')[0].trim()}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Main Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {stepItem.description}
              </p>

              {/* Step 1: Key Aspects */}
              {stepItem.keyAspects && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {stepItem.keyAspects.map((aspect, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0A0B0E] border border-white/[0.05] space-y-1">
                      <span className="text-xs font-bold text-purple-300 font-display flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block" />
                        <span>{aspect.label}</span>
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{aspect.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Race Options */}
              {stepItem.raceOptions && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {stepItem.raceOptions.map((r, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#0D0E14] border border-[#1E2130] space-y-1.5 hover:border-purple-500/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white font-display">{r.name}</h4>
                        <span className="text-[10px] font-mono text-purple-400">{r.sub}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{r.benefit}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Class Options */}
              {stepItem.classOptions && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {stepItem.classOptions.map((c, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#0D0E14] border border-[#1E2130] flex flex-col justify-between space-y-2 hover:border-cyan-500/30 transition-colors">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-cyan-300 font-display">{c.name}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
                            Hit Die: {c.hitDie}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-sans">{c.role}</p>
                      </div>
                      <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-slate-500">
                        Chỉ số ưu tiên: <span className="text-slate-300 font-bold">{c.stat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4: Ability Scores Methods */}
              {stepItem.methods && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {stepItem.methods.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#0D0E14] border border-[#1E2130] space-y-1.5">
                        <h4 className="text-xs font-bold text-amber-300 font-display uppercase tracking-wider">{m.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">{m.desc}</p>
                      </div>
                    ))}
                  </div>

                  {stepItem.cursedModifierRule && (
                    <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-200/90 leading-relaxed font-sans">
                        <strong className="text-amber-300 font-display block mb-0.5">Quy Tắc Thuộc Tính Chú Lực (Cursed Energy Ability)</strong>
                        {stepItem.cursedModifierRule}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Innate Technique Highlights */}
              {stepItem.highlights && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {stepItem.highlights.map((h, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#0D0E14] border border-[#1E2130] space-y-1">
                      <span className="text-xs font-bold text-purple-300 font-display flex items-center space-x-1.5">
                        <Flame className="w-3.5 h-3.5 text-purple-400" />
                        <span>{h.title}</span>
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{h.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 6: Backgrounds */}
              {stepItem.backgrounds && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {stepItem.backgrounds.map((bg, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#0D0E14] border border-[#1E2130] space-y-1">
                      <h4 className="text-xs font-bold text-rose-300 font-display">{bg.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{bg.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 7: Equipment Rules */}
              {stepItem.gearRules && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {stepItem.gearRules.map((gr, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#0D0E14] border border-[#1E2130] space-y-1">
                      <h4 className="text-xs font-bold text-white font-display flex items-center space-x-1.5">
                        <Shield className="w-3.5 h-3.5 text-slate-400" />
                        <span>{gr.title}</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{gr.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 8: Formulas */}
              {stepItem.formulas && (
                <div className="space-y-3 pt-2">
                  {stepItem.formulas.map((f, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#0D0E14] border border-[#1E2130] flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white font-display flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                          <span>{f.name}</span>
                        </div>
                        <div className="text-xs font-mono text-cyan-300 font-semibold">{f.formula}</div>
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans italic bg-[#151722] px-3 py-1.5 rounded-xl border border-white/5 md:max-w-xs">
                        Ví dụ: {f.example}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 9: Milestones */}
              {stepItem.milestones && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {stepItem.milestones.map((ms, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#0D0E14] border border-[#1E2130] space-y-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950/60 text-purple-300 border border-purple-800/50 inline-block">
                        {ms.level}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">{ms.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Step Bottom Controls: Previous / Next */}
              <div className="pt-4 border-t border-[#1E2130] flex items-center justify-between">
                <button
                  disabled={stepItem.step === 1}
                  onClick={() => {
                    const prevStep = characterCreationData.steps.find(s => s.step === stepItem.step - 1);
                    if (prevStep) setActiveStepId(prevStep.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    stepItem.step === 1
                      ? 'text-slate-600 bg-transparent cursor-not-allowed'
                      : 'text-slate-300 bg-[#161824] hover:bg-[#202334] border border-[#262A3C]'
                  }`}
                >
                  &larr; Bước trước
                </button>

                <div className="text-[11px] font-mono text-slate-500">
                  {stepItem.step} / {characterCreationData.steps.length}
                </div>

                <button
                  disabled={stepItem.step === characterCreationData.steps.length}
                  onClick={() => {
                    const nextStep = characterCreationData.steps.find(s => s.step === stepItem.step + 1);
                    if (nextStep) setActiveStepId(nextStep.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    stepItem.step === characterCreationData.steps.length
                      ? 'text-slate-600 bg-transparent cursor-not-allowed'
                      : 'text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30'
                  }`}
                >
                  Bước tiếp theo &rarr;
                </button>
              </div>
            </div>
          ))}

          {/* ===================================================================== */}
          {/* ORIGINAL RULEBOOK TEXT (EXPANDABLE DETAILS) */}
          {/* ===================================================================== */}
          <div className="pt-4">
            <details className="rounded-2xl border border-[#202332] bg-[#0E0F15] overflow-hidden group">
              <summary className="px-5 py-3.5 text-xs font-mono text-slate-400 hover:text-white cursor-pointer select-none flex items-center justify-between transition-colors list-none">
                <span className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span className="font-bold">📄 Văn bản quy tắc gốc tiếng Anh (Original Rulebook Text - Chapter 1)</span>
                </span>
                <span className="text-[11px] text-slate-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-5 border-t border-[#1C1E2B] space-y-6 bg-[#090A0E] text-xs leading-relaxed text-slate-300 font-sans">
                {characterCreationData.originalRulebookText.map((sec, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-sm font-bold text-white font-display border-b border-white/5 pb-1">
                      {sec.heading}
                    </h4>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-400 italic font-mono text-[11px] leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: INTERACTIVE CHARACTER BUILDER */}
      {/* ========================================================================= */}
      {viewMode === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left / Top Controls Pane (Inputs) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0E13] border border-white/[0.08] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <h3 className="text-base font-bold text-white font-display flex items-center space-x-2">
                  <User className="w-4 h-4 text-purple-400" />
                  <span>1. Thông Tin & Danh Tính</span>
                </h3>
                <button
                  onClick={applyStandardArray}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#14151D] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
                >
                  Điền Standard Array
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Tên Nhân Vật</label>
                  <input
                    type="text"
                    value={charName}
                    onChange={(e) => setCharName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#08090C] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-white/20 font-sans"
                    placeholder="Nhập tên nhân vật..."
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Xuất Thân (Background)</label>
                  <select
                    value={selectedBackgroundId}
                    onChange={(e) => setSelectedBackgroundId(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#08090C] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-white/20 font-sans"
                  >
                    {backgroundsData.backgrounds?.map((bg) => (
                      <option key={bg.id} value={bg.id}>{bg.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Khái Niệm / Động Lực</label>
                <input
                  type="text"
                  value={charConcept}
                  onChange={(e) => setCharConcept(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#08090C] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-white/20 font-sans"
                  placeholder="Mô tả ngắn lý tưởng chiến đấu..."
                />
              </div>

              {/* Race & Subrace */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Chủng Tộc</label>
                  <select
                    value={selectedRaceId}
                    onChange={(e) => {
                      setSelectedRaceId(e.target.value);
                      const rc = racesData.find(r => r.id === e.target.value);
                      if (rc?.subraces?.[0]) setSelectedSubrace(rc.subraces[0].name);
                    }}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#08090C] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-white/20 font-sans"
                  >
                    {racesData.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Nhánh Phụ (Subrace)</label>
                  <select
                    value={selectedSubrace}
                    onChange={(e) => setSelectedSubrace(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#08090C] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-white/20 font-sans"
                  >
                    {currentRace.subraces?.map((sr, idx) => (
                      <option key={idx} value={sr.name}>{sr.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Class & Cursed Ability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Lớp Nhân Vật (Class)</label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#08090C] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-white/20 font-sans"
                  >
                    {classesData.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.vietnameseName ? `${c.vietnameseName} (${c.name})` : c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Thuộc Tính Chú Lực (CE Modifier)</label>
                  <select
                    value={cursedAbility}
                    onChange={(e) => setCursedAbility(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-[#08090C] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-white/20 font-sans"
                  >
                    <option value="WIS">Thông Thái (WIS) - Trực giác & Ý chí</option>
                    <option value="CHA">Sức Hút (CHA) - Cường độ cảm xúc</option>
                    <option value="INT">Trí Tuệ (INT) - Phân tích kết giới</option>
                  </select>
                </div>
              </div>

              {/* Technique Dropdown */}
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Thuật Thức Bẩm Sinh (Innate Technique)</label>
                <select
                  value={selectedTechniqueId}
                  onChange={(e) => setSelectedTechniqueId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#08090C] border border-white/[0.08] text-xs sm:text-sm text-white focus:outline-none focus:border-white/20 font-sans"
                >
                  {techniquesData.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.vietnameseName ? `${t.vietnameseName} - ${t.name}` : t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ability Scores Inputs */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0E13] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <h3 className="text-base font-bold text-white font-display flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span>2. Chỉ Số Thuộc Tính (6 Ability Scores)</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">Cấp độ 1</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.keys(scores).map((statKey) => {
                  const val = scores[statKey];
                  const mod = getMod(val);
                  return (
                    <div key={statKey} className="p-3 rounded-xl bg-[#08090C] border border-white/[0.06] text-center space-y-1.5">
                      <div className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-widest">{statKey}</div>
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => setScores(prev => ({ ...prev, [statKey]: Math.max(3, prev[statKey] - 1) }))}
                          className="w-7 h-7 rounded-lg bg-[#14151D] border border-white/[0.08] text-slate-300 hover:text-white font-mono font-bold flex items-center justify-center text-xs transition-colors"
                        >
                          -
                        </button>
                        <span className="text-base sm:text-lg font-bold text-white font-display w-8 text-center">{val}</span>
                        <button
                          onClick={() => setScores(prev => ({ ...prev, [statKey]: Math.min(20, prev[statKey] + 1) }))}
                          className="w-7 h-7 rounded-lg bg-[#14151D] border border-white/[0.08] text-slate-300 hover:text-white font-mono font-bold flex items-center justify-center text-xs transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-xs font-mono font-bold text-purple-400">
                        {formatMod(mod)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Pane: Live Character Sheet Card */}
          <div className="lg:col-span-5 sticky top-20 space-y-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0E13] border border-white/[0.12] relative overflow-hidden">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                    JUJUTSU KAISEN 5E • CHARACTER SHEET
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white font-display truncate">
                    {charName || 'Vô Danh'}
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-[#12101B] text-purple-300 border border-purple-500/30">
                  CẤP 1
                </span>
              </div>

              {/* Class & Race Subtitle */}
              <div className="text-xs text-slate-300 space-y-0.5 mb-5 font-sans">
                <p>
                  <strong className="text-white">{currentClass.vietnameseName || currentClass.name}</strong> • {currentRace.name} ({selectedSubrace})
                </p>
                <p className="text-slate-400 text-[11px]">
                  Xuất thân: <strong className="text-slate-200">{currentBackground?.name || 'Chưa chọn'}</strong>
                </p>
              </div>

              {/* Key Combat Stats Grid */}
              <div className="grid grid-cols-4 gap-2 mb-5">
                <div className="p-2.5 rounded-xl bg-[#08090C] border border-white/[0.06] text-center">
                  <div className="text-[9px] font-mono uppercase text-slate-500">Máu (HP)</div>
                  <div className="text-base sm:text-lg font-black text-rose-400 font-display">{maxHp}</div>
                  <div className="text-[9px] font-mono text-slate-500">d{hitDieMax} + {conMod}</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#08090C] border border-white/[0.06] text-center">
                  <div className="text-[9px] font-mono uppercase text-slate-500">Giáp (AC)</div>
                  <div className="text-base sm:text-lg font-black text-blue-400 font-display">{calculatedAc}</div>
                  <div className="text-[9px] font-mono text-slate-500">Cơ bản</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#08090C] border border-white/[0.06] text-center">
                  <div className="text-[9px] font-mono uppercase text-slate-500">Sáng Kiến</div>
                  <div className="text-base sm:text-lg font-black text-amber-400 font-display">{formatMod(initiative)}</div>
                  <div className="text-[9px] font-mono text-slate-500">DEX Mod</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#08090C] border border-white/[0.06] text-center">
                  <div className="text-[9px] font-mono uppercase text-slate-500">Thành Thạo</div>
                  <div className="text-base sm:text-lg font-black text-purple-400 font-display">+{pb}</div>
                  <div className="text-[9px] font-mono text-slate-500">Cấp 1</div>
                </div>
              </div>

              {/* Cursed Energy Stats Banner */}
              <div className="p-3.5 rounded-xl bg-[#08090C] border border-white/[0.08] mb-5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-300/90 font-display">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Năng Lực Chú Thuật</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Mod: {cursedAbility} ({formatMod(ceMod)})
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-lg bg-[#0E1017] border border-white/[0.05]">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Bể CE</div>
                    <div className="text-base font-bold text-white font-display">
                      {selectedClassId === 'heavenly-restriction' ? '0 CE' : `${cePool} CE`}
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-[#0E1017] border border-white/[0.05]">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Save DC</div>
                    <div className="text-base font-bold text-amber-300 font-display">{ceSaveDc}</div>
                  </div>

                  <div className="p-2 rounded-lg bg-[#0E1017] border border-white/[0.05]">
                    <div className="text-[9px] font-mono text-slate-400 uppercase">Đòn Đánh</div>
                    <div className="text-base font-bold text-cyan-300 font-display">{ceAttackBonus}</div>
                  </div>
                </div>
              </div>

              {/* Innate Technique & Domain */}
              <div className="p-3.5 rounded-xl bg-[#08090C] border border-white/[0.06] mb-5 space-y-2">
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Thuật Thức Bẩm Sinh</div>
                <div className="text-sm font-bold text-white font-display">
                  {currentTechnique.vietnameseName || currentTechnique.name}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                  "{currentTechnique.description}"
                </div>

                {currentTechnique.domain && (
                  <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-amber-300/90 flex items-center space-x-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>{currentTechnique.domain.vietnameseName || currentTechnique.domain.name}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{currentTechnique.domain.cost}</span>
                  </div>
                )}
              </div>

              {/* Copy Character Sheet Button */}
              <button
                onClick={handleCopySummary}
                className="w-full py-2.5 rounded-xl bg-[#181924] hover:bg-[#202230] border border-white/20 text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Đã sao chép tóm tắt nhân vật!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao Chép Tóm Tắt Nhân Vật (Export)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
