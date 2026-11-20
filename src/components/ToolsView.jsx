import React, { useState } from 'react';
import { Calculator, Flame, Dices, Skull, Zap, Shield, Heart, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import classesData from '../data/classes.json';
import { useTheme } from '../context/ThemeContext';

export default function ToolsView({ activeToolId: propToolId, setActiveToolId: propSetToolId }) {
  const [internalToolId, setInternalToolId] = useState('all');
  const activeToolId = propToolId || internalToolId;
  const setActiveToolId = propSetToolId || setInternalToolId;
  const { currentTheme } = useTheme();

  // Calculator state
  const [selectedClassId, setSelectedClassId] = useState('juggernaut');
  const [level, setLevel] = useState(5);
  const [ceMod, setCeMod] = useState(3);
  const [hasRCT, setHasRCT] = useState(false);

  // Domain clash state
  const [refineA, setRefineA] = useState(450);
  const [refineB, setRefineB] = useState(300);

  // Limb dice state
  const [limbRoll, setLimbRoll] = useState(null);

  // Calculate proficiency bonus from level
  const profBonus = Math.floor((level - 1) / 4) + 2;

  // Selected class object
  const currentClassObj = classesData.find(c => c.id === selectedClassId) || classesData[0];

  // Calculate CE pool based on class
  const calculateCE = () => {
    if (selectedClassId === 'heavenly-restriction') return 0;
    if (selectedClassId === 'strategist') return level * 2 + ceMod;
    if (selectedClassId === 'support-specialist') return level + ceMod + profBonus;
    return level + ceMod;
  };

  const cePool = calculateCE();
  const ceSaveDC = 8 + profBonus + ceMod;
  const ceAttackBonus = profBonus + ceMod;
  const rctPool = 5 * level * ceMod;
  const maxRctHealPerTurn = ceMod * 10;

  // Domain clash logic
  const totalRefine = (refineA + refineB) || 1;
  const percentA = Math.round((refineA / totalRefine) * 100);
  const percentB = 100 - percentA;
  const diffRefine = Math.abs(refineA - refineB);
  const winner = refineA > refineB ? 'Chú thuật sư A' : refineB > refineA ? 'Chú thuật sư B' : 'Cân bằng hoàn hảo';
  
  const getClashVerdict = () => {
    if (diffRefine === 0) {
      return {
        rounds: 'Giằng co vô thời hạn',
        desc: 'Sure-Hit của cả hai bên hoàn toàn bị triệt tiêu lặp nhau. Trận chiến quyết định bằng Thể thuật và Thuật thức thông thường bên trong kết giới.',
        statusColor: 'text-amber-400',
        badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-300'
      };
    }
    if (diffRefine >= 400) {
      return {
        rounds: 'Áp chế tức thì (1 lượt)',
        desc: 'Chênh lệch độ tinh xảo quá lớn (+400 trở lên). Lãnh địa của bên yếu hơn sụp đổ ngay lập tức, Sure-Hit của bên thắng trúng đích tuyệt đối.',
        statusColor: 'text-rose-400',
        badgeBg: 'bg-rose-500/10 border-rose-500/20 text-rose-300'
      };
    }
    if (diffRefine >= 200) {
      return {
        rounds: '2 lượt chiến đấu',
        desc: 'Bên chiếm ưu thế áp đảo rõ rệt. Kết giới đối phương bắt đầu nứt vỡ từ lượt 1 và sụp đổ hoàn toàn sau 2 lượt.',
        statusColor: 'text-orange-400',
        badgeBg: 'bg-orange-500/10 border-orange-500/20 text-orange-300'
      };
    }
    if (diffRefine >= 100) {
      return {
        rounds: '3 lượt giằng co',
        desc: 'Chênh lệch đáng kể. Bên yếu hơn có thể cầm cự trong 3 lượt trước khi Lãnh địa bị đè bẹp.',
        statusColor: 'text-cyan-400',
        badgeBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'
      };
    }
    return {
      rounds: '5 lượt tiêu hao',
      desc: 'Khoảng cách chênh lệch nhỏ dưới 100 điểm. Hai lãnh địa đan xen gay gắt, bên yếu hơn suy yếu dần theo từng lượt tiêu tốn Chú lực.',
      statusColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
    };
  };

  const clashVerdict = getClashVerdict();

  // Limb tables
  const limbTable = [
    { roll: 1, part: 'Đầu (Head)', req: '1/2 Max HP', broken: 'Choáng váng, Disadvantage các đòn đánh và Saving Throw.', lost: 'Tử vong ngay lập tức hoặc chấn thương sọ não vĩnh viễn.' },
    { roll: 2, part: 'Thân mình (Torso)', req: '1/2 Max HP', broken: 'Gãy xương sườn, giảm 1/2 tốc độ di chuyển, mất Reaction.', lost: 'Nội tạng tổn thương nghiêm trọng, mất 1d10 HP mỗi lượt.' },
    { roll: 3, part: 'Cánh tay phải (Right Arm)', req: '1/3 Max HP', broken: 'Không thể cầm vũ khí 2 tay, Disadvantage tấn công bằng tay này.', lost: 'Mất vĩnh viễn cánh tay (cần 20 HP RCT để mọc lại).' },
    { roll: 4, part: 'Cánh tay trái (Left Arm)', req: '1/3 Max HP', broken: 'Không thể cầm vũ khí 2 tay, Disadvantage tấn công bằng tay này.', lost: 'Mất vĩnh viễn cánh tay (cần 20 HP RCT để mọc lại).' },
    { roll: 5, part: 'Chân (Legs)', req: '1/3 Max HP', broken: 'Tốc độ giảm một nửa, ngã Prone khi Dash.', lost: 'Tốc độ còn 5 ft, Disadvantage mọi kiểm tra DEX.' },
    { roll: 6, part: 'Mắt / Giác quan (Eyes)', req: '1/4 Max HP', broken: 'Tầm nhìn mờ, Disadvantage kiểm tra Perception liên quan thị giác.', lost: 'Mù hoàn toàn một bên mắt.' },
  ];

  const rollLimb = () => {
    const rolled = Math.floor(Math.random() * 6) + 1;
    setLimbRoll(limbTable.find(l => l.roll === rolled));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      
      {/* Subtle Background Watermark */}
      <div className="absolute right-6 top-8 font-kanji font-black text-7xl text-white/[0.02] pointer-events-none select-none hidden lg:block">
        呪具端末
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-white/[0.06] text-zinc-300 border border-white/10">
            [ BÀN ĐIỀU PHỐI TÁC CHIẾN • 呪具端末 ]
          </span>
          <span className="text-xs text-zinc-500 font-mono">D&amp;D 5E JJK REGISTRY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
          Pháp Cụ Đo Lường &amp; Giám Định
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed font-sans">
          Hệ thống tính toán tham số Chú Lực, mô phỏng đối kháng Lãnh Địa và thẩm định thương tật lâm sàng dành cho Chú thuật sư &amp; Dungeon Master.
        </p>
      </div>

      {/* Segmented Tool Switcher */}
      <div className="flex items-center p-1 rounded-xl bg-[#0F1015] border border-white/[0.08] overflow-x-auto no-scrollbar gap-1 max-w-fit">
        {[
          { id: 'all', label: 'Tất Cả Pháp Cụ (3)', icon: Activity },
          { id: 'ce-calc', label: '1. Đo Lường Chú Lực', icon: Calculator },
          { id: 'domain-clash', label: '2. Đối Kháng Lãnh Địa', icon: Flame },
          { id: 'limb-dice', label: '3. Giám Định Đứt Chi', icon: Skull },
        ].map(tool => {
          const Icon = tool.icon;
          const isActive = activeToolId === tool.id || (activeToolId === 'all' && tool.id === 'all');
          return (
            <button
              key={tool.id}
              onClick={() => setActiveToolId(tool.id)}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                isActive
                  ? 'bg-white/10 text-white font-semibold border border-white/15 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tools Layout */}
      <div className="space-y-8">
        
        {/* ========================================================= */}
        {/* TOOL 1: CURSED ENERGY TELEMETRY & ALLOCATION */}
        {/* ========================================================= */}
        {(activeToolId === 'all' || activeToolId === 'ce-calc') && (
          <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-6 sm:p-7 space-y-6">
            
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-2">
              <div className="flex items-center space-x-2.5">
                <Calculator className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display">
                    Đo Lường &amp; Phân Bổ Chú Lực
                  </h3>
                  <span className="text-[11px] text-zinc-400 font-mono">Cursed Energy Telemetry &amp; Combat Allocation</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 self-start sm:self-auto">
                CE REGISTRY
              </span>
            </div>

            {/* Content: 2-Column Balanced Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Inputs Panel (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Class Select */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 uppercase tracking-wider">
                    Hệ Phái Chú Thuật (Class)
                  </label>
                  <select
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#08090C] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500/60 font-sans transition-colors"
                  >
                    {classesData.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.vietnameseName ? `${c.vietnameseName} (${c.name})` : c.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                    Hit Die: {currentClassObj.hitDie || 'd8'} • Thuộc tính ưu tiên: {currentClassObj.primaryStat || 'STR/DEX'}
                  </span>
                </div>

                {/* Level Stepper / Slider */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      Cấp Độ Nhân Vật (Level)
                    </label>
                    <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-white/[0.06] border border-white/10">
                      Cấp {level}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={level}
                    onChange={(e) => setLevel(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                    <span>Cấp 1</span>
                    <span>Cấp 10</span>
                    <span>Cấp 20</span>
                  </div>
                </div>

                {/* CE Modifier Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      Hệ Số Chú Lực (CE Mod • WIS / CHA)
                    </label>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      +{ceMod}
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setCeMod(m)}
                        className={`py-1.5 rounded text-xs font-mono font-bold border transition-all ${
                          ceMod === m
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                            : 'bg-[#08090C] text-zinc-400 border-white/[0.08] hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        +{m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RCT Toggle */}
                <div className="pt-2 border-t border-white/[0.06]">
                  <label className="flex items-start space-x-3 cursor-pointer p-2.5 rounded-lg bg-[#08090C] border border-white/[0.06] hover:border-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={hasRCT}
                      onChange={(e) => setHasRCT(e.target.checked)}
                      className="mt-0.5 rounded bg-zinc-900 border-zinc-700 text-cyan-500 focus:ring-0"
                    />
                    <div>
                      <span className="text-xs font-medium text-white block">
                        Đã Khai Mở Thuật Thức Phản Chuyển (RCT)
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        反転術式 • Cho phép chuyển hóa Chú lực âm thành dương khí để hồi phục vết thương.
                      </span>
                    </div>
                  </label>
                </div>

              </div>

              {/* Live Telemetry Output Panel (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                
                {/* Primary CE Pool Display */}
                <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.08] relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      Tổng Dung Lượng Chú Lực (Cursed Energy Pool)
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400">
                      {selectedClassId === 'heavenly-restriction' ? '0 CE (Thiên Dữ Chú Phược)' : `Tối đa ${cePool} Điểm`}
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-2 my-1">
                    <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                      {cePool}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 uppercase">Điểm CE</span>
                  </div>

                  {/* Visual Segmented CE Capacity Bar */}
                  <div className="w-full h-2 rounded bg-zinc-800/80 mt-2 overflow-hidden flex">
                    <div 
                      className="h-full bg-cyan-400 transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(5, (cePool / 50) * 100))}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 mt-2 flex justify-between">
                    <span>Hồi phục khi Short Rest: Tối thiểu 1 CE</span>
                    <span>Long Rest: Hồi phục toàn bộ</span>
                  </div>
                </div>

                {/* Tactical Parameters Matrix */}
                <div className="grid grid-cols-3 gap-3">
                  
                  <div className="p-3 rounded-xl bg-[#08090C] border border-white/[0.08]">
                    <span className="text-[10px] font-mono text-zinc-400 block mb-1 uppercase">
                      Độ Khó Cứu Nguy (Save DC)
                    </span>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                      {ceSaveDC}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 mt-1 block">8 + PB {profBonus} + Mod {ceMod}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#08090C] border border-white/[0.08]">
                    <span className="text-[10px] font-mono text-zinc-400 block mb-1 uppercase">
                      Thưởng Đòn Đánh (Attack Bonus)
                    </span>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300">
                      +{ceAttackBonus}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 mt-1 block">PB {profBonus} + Mod {ceMod}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#08090C] border border-white/[0.08]">
                    <span className="text-[10px] font-mono text-zinc-400 block mb-1 uppercase">
                      Thuần Thục (PB)
                    </span>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-zinc-300">
                      +{profBonus}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 mt-1 block">Cấp {level}</span>
                  </div>

                </div>

                {/* RCT Healing Reserve Box */}
                <div className={`p-3.5 rounded-xl border transition-all ${
                  hasRCT 
                    ? 'bg-[#08090C] border-emerald-500/30' 
                    : 'bg-[#08090C]/60 border-white/[0.05]'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 flex items-center space-x-1.5">
                      <Heart className={`w-3.5 h-3.5 ${hasRCT ? 'text-emerald-400' : 'text-zinc-500'}`} />
                      <span>Bể Trị Liệu Phản Chuyển (RCT Reserve)</span>
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      hasRCT ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'text-zinc-500 bg-white/[0.03]'
                    }`}>
                      {hasRCT ? 'KHẢ DỤNG' : 'CHƯA MỞ KHÓA'}
                    </span>
                  </div>

                  {hasRCT ? (
                    <div className="space-y-1">
                      <div className="text-lg font-bold font-mono text-emerald-400">
                        {rctPool} HP Khả Dụng
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                        Dùng một Action tiêu hao từ bể trị liệu: hồi tối đa <strong className="text-white font-mono">{maxRctHealPerTurn} HP</strong> trong 1 lượt ({ceMod} $\times$ 10). Mọc lại chi đứt lìa cần tiêu tốn 20 HP từ bể này.
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-zinc-500 font-sans">
                      Chú thuật sư chưa giác ngộ công thức nhân năng lượng tiêu cực với chính nó. Cần mở khóa Feat Thuật Thức Phản Chuyển hoặc trải qua biến cố cận tử.
                    </p>
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TOOL 2: DOMAIN CLASH ANALYSIS (TUG-OF-WAR SCALE) */}
        {/* ========================================================= */}
        {(activeToolId === 'all' || activeToolId === 'domain-clash') && (
          <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-6 sm:p-7 space-y-6">
            
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-2">
              <div className="flex items-center space-x-2.5">
                <Flame className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display">
                    Mô Phỏng Đối Kháng Lãnh Địa
                  </h3>
                  <span className="text-[11px] text-zinc-400 font-mono">Domain Barrier Refinement &amp; Sure-Hit Tug-of-War Vector</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-purple-300 bg-purple-950/40 border border-purple-800/40 self-start sm:self-auto">
                領域展開・比較
              </span>
            </div>

            {/* Input Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Caster A */}
              <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    Chú Thuật Sư A
                  </span>
                  <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
                    {refineA} Refinement
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={refineA}
                  onChange={(e) => setRefineA(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: 'Cấp 1 (250)', val: 250 },
                    { label: 'Đặc Cấp (500)', val: 500 },
                    { label: 'Đỉnh Cao (900)', val: 900 },
                  ].map(p => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setRefineA(p.val)}
                      className="px-2 py-1 rounded text-[10px] font-mono text-zinc-400 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06]"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caster B */}
              <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-rose-300 uppercase">
                    Chú Thuật Sư B
                  </span>
                  <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-rose-950/40 border border-rose-800/40">
                    {refineB} Refinement
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={refineB}
                  onChange={(e) => setRefineB(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: 'Cấp 1 (250)', val: 250 },
                    { label: 'Đặc Cấp (500)', val: 500 },
                    { label: 'Đỉnh Cao (900)', val: 900 },
                  ].map(p => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setRefineB(p.val)}
                      className="px-2 py-1 rounded text-[10px] font-mono text-zinc-400 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06]"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Visual Dynamic Tug-of-War Vector Bar */}
            <div className="space-y-2 p-4 rounded-xl bg-[#08090C] border border-white/[0.08]">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-300 font-bold">Thị Phần Bên A: {percentA}%</span>
                <span className="text-zinc-500 font-mono text-[10px]">ĐỐI KHÁNG KẾT GIỚI</span>
                <span className="text-rose-300 font-bold">Thị Phần Bên B: {percentB}%</span>
              </div>

              <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden flex relative">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-200"
                  style={{ width: `${percentA}%` }}
                />
                <div 
                  className="h-full bg-rose-500 transition-all duration-200"
                  style={{ width: `${percentB}%` }}
                />
                {/* Center marker */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/40" />
              </div>
            </div>

            {/* Verdict Box */}
            <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.08] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-white/[0.06] gap-2">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Bên Chiếm Ưu Thế Áp Đảo
                  </span>
                  <span className="text-sm font-bold font-display text-white">
                    {winner} {diffRefine > 0 ? `(+${diffRefine} Refinement)` : ''}
                  </span>
                </div>
                <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border self-start sm:self-auto ${clashVerdict.badgeBg}`}>
                  {clashVerdict.rounds}
                </span>
              </div>

              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {clashVerdict.desc}
              </p>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TOOL 3: CLINICAL TRAUMA & LIMB LOSS ASSESSMENT */}
        {/* ========================================================= */}
        {(activeToolId === 'all' || activeToolId === 'limb-dice') && (
          <div className="rounded-2xl bg-[#0D0E13] border border-white/[0.08] p-6 sm:p-7 space-y-6">
            
            {/* Tool Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.06] gap-3">
              <div className="flex items-center space-x-2.5">
                <Skull className="w-4 h-4 text-rose-400 shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display">
                    Giám Định Thương Tật Đứt Chi
                  </h3>
                  <span className="text-[11px] text-zinc-400 font-mono">Chapter 7 Clinical Trauma &amp; Surgical Amputation Matrix</span>
                </div>
              </div>

              <button
                onClick={rollLimb}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-lg text-xs font-bold font-mono transition-all self-start sm:self-auto"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Tung Xúc Xắc (d6)</span>
              </button>
            </div>

            {/* Active Roll Result Display */}
            {limbRoll ? (
              <div className="p-4 rounded-xl bg-[#08090C] border border-rose-500/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-white/[0.06] gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold flex items-center justify-center">
                      {limbRoll.roll}
                    </span>
                    <span className="text-sm font-bold text-white font-display">
                      Vị trí: {limbRoll.part}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300 border border-white/10 self-start sm:self-auto">
                    Ngưỡng kích hoạt: {limbRoll.req}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
                      1. Tổn thương gãy chi (Broken)
                    </span>
                    <p className="text-zinc-300 leading-relaxed font-sans">{limbRoll.broken}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06]">
                    <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block mb-1">
                      2. Đứt lìa vĩnh viễn (Lost / Amputated)
                    </span>
                    <p className="text-zinc-300 leading-relaxed font-sans">{limbRoll.lost}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.06] text-xs text-zinc-500 font-mono text-center">
                Bấm "Tung Xúc Xắc (d6)" ở trên hoặc đối chiếu trực tiếp vào bảng giải phẫu bên dưới khi nhân vật chịu đòn đánh chí mạng (Critical Hit).
              </div>
            )}

            {/* Master Anatomical Reference Table */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                Bảng Quy Chiếu Giải Phẫu Thương Tật 6 Vùng Cơ Thể (Chapter 7 Rules)
              </span>

              <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#08090C] text-zinc-400 font-mono text-[10px] uppercase border-b border-white/[0.08]">
                    <tr>
                      <th className="px-3.5 py-2.5 w-16">d6</th>
                      <th className="px-3.5 py-2.5 w-44">Vùng Cơ Thể</th>
                      <th className="px-3.5 py-2.5 w-32">Ngưỡng Sát Thương</th>
                      <th className="px-3.5 py-2.5">Tổn Thương Gãy Chi (Broken)</th>
                      <th className="px-3.5 py-2.5">Đứt Lìa / Hủy Hoại (Lost)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04] bg-[#0A0B0E]">
                    {limbTable.map(item => (
                      <tr key={item.roll} className="hover:bg-white/[0.02]">
                        <td className="px-3.5 py-2.5 font-mono font-bold text-cyan-300">{item.roll}</td>
                        <td className="px-3.5 py-2.5 font-display text-white font-bold">{item.part}</td>
                        <td className="px-3.5 py-2.5 font-mono text-zinc-400 text-[11px]">{item.req}</td>
                        <td className="px-3.5 py-2.5 text-zinc-300 text-[11px] font-sans leading-relaxed">{item.broken}</td>
                        <td className="px-3.5 py-2.5 text-rose-300 text-[11px] font-sans leading-relaxed">{item.lost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
