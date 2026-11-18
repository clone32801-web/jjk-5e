import React, { useState } from 'react';
import { Calculator, Flame, Dices, Skull, Zap, Shield, Heart } from 'lucide-react';
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
  const [refineA, setRefineA] = useState(300);
  const [refineB, setRefineB] = useState(150);

  // Limb dice state
  const [limbRoll, setLimbRoll] = useState(null);

  // Calculate proficiency bonus from level
  const profBonus = Math.floor((level - 1) / 4) + 2;

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

  // Domain clash logic
  const diffRefine = Math.abs(refineA - refineB);
  const winner = refineA >= refineB ? 'Chú thuật sư A' : 'Chú thuật sư B';
  const roundsToOverwhelm = diffRefine >= 400 ? 'Ngay lập tức (1 lượt)' : 
                            diffRefine >= 200 ? '2 lượt' : 
                            diffRefine >= 100 ? '3 lượt' : 
                            diffRefine > 0 ? '5 lượt' : 'Giằng co ngang cơ (Không áp chế)';

  // Limb tables
  const limbTable = [
    { roll: 1, part: 'Đầu (Head)', req: '1/2 Max HP', broken: 'Choáng váng, Disadvantage các đòn đánh và cứu nguy.', lost: 'Tử vong ngay lập tức hoặc chấn thương sọ não vĩnh viễn.' },
    { roll: 2, part: 'Thân mình (Torso)', req: '1/2 Max HP', broken: 'Gãy xương sườn, giảm 1/2 tốc độ di chuyển, mất reaction.', lost: 'Nội tạng tổn thương nghiêm trọng, mất 1d10 HP mỗi lượt.' },
    { roll: 3, part: 'Cánh tay phải (Right Arm)', req: '1/3 Max HP', broken: 'Không thể cầm vũ khí 2 tay, disadvantage tấn công bằng tay này.', lost: 'Mất vĩnh viễn cánh tay (cần 20 HP RCT để mọc lại).' },
    { roll: 4, part: 'Cánh tay trái (Left Arm)', req: '1/3 Max HP', broken: 'Không thể cầm vũ khí 2 tay, disadvantage tấn công bằng tay này.', lost: 'Mất vĩnh viễn cánh tay (cần 20 HP RCT để mọc lại).' },
    { roll: 5, part: 'Chân (Legs)', req: '1/3 Max HP', broken: 'Tốc độ giảm một nửa, ngã Prone khi Dash.', lost: 'Tốc độ còn 5ft, disadvantage mọi kiểm tra Dex.' },
    { roll: 6, part: 'Mắt / Giác quan (Eyes)', req: '1/4 Max HP', broken: 'Tầm nhìn mờ, Disadvantage kiểm tra Perception liên quan đến mắt.', lost: 'Mù hoàn toàn một bên mắt.' },
  ];

  const rollLimb = () => {
    const rolled = Math.floor(Math.random() * 6) + 1;
    setLimbRoll(limbTable.find(l => l.roll === rolled));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative">
      
      {/* Decorative Watermark */}
      <div className="absolute right-6 top-8 font-kanji font-black text-7xl text-white/[0.02] pointer-events-none select-none hidden lg:block">
        呪力計算
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Interactive Sorcery Tools
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Bộ công cụ tính toán nhanh Chú lực, mô phỏng va chạm Lãnh địa và xúc xắc chấn thương đứt chi dành cho người chơi và DM.
        </p>
      </div>

      {/* Tool Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#232636] pb-4 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'Tất Cả Công Cụ', icon: Calculator },
          { id: 'ce-calc', label: 'Máy Tính Chú Lực (CE Calc)', icon: Calculator },
          { id: 'domain-clash', label: 'Va Chạm Lãnh Địa (Clash Sim)', icon: Flame },
          { id: 'limb-dice', label: 'Xúc Xắc Đứt Chi (Limb Roller)', icon: Dices },
        ].map(tool => {
          const Icon = tool.icon;
          const isActive = activeToolId === tool.id || (activeToolId === 'all' && tool.id === 'all');
          return (
            <button
              key={tool.id}
              onClick={() => setActiveToolId(tool.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                isActive
                  ? `${currentTheme.bgAccent} ${currentTheme.accentClass} border ${currentTheme.borderAccent} font-bold shadow-sm`
                  : 'text-slate-400 hover:text-white hover:bg-[#12131A]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* TOOL 1: CURSED ENERGY CALCULATOR */}
        {(activeToolId === 'all' || activeToolId === 'ce-calc') && (
        <div className={`rounded-3xl bg-[#12131A] border border-[#232636] p-6 sm:p-8 shadow-xl flex flex-col justify-between ${
          activeToolId === 'ce-calc' ? 'lg:col-span-2 max-w-4xl mx-auto w-full' : ''
        }`}>
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`w-10 h-10 rounded-xl ${currentTheme.bgAccent} border ${currentTheme.borderAccent} flex items-center justify-center`}>
                <Calculator className={`w-5 h-5 ${currentTheme.accentClass}`} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">Máy Tính Chỉ Số Chú Lực (CE Calc)</h3>
                <p className="text-xs text-slate-400">Tự động tính Cursed Energy Pool, Save DC và Bể RCT</p>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Lớp Nhân Vật (Class)</label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0A0A0C] border border-[#232636] rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                >
                  {classesData.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Cấp Độ (Level 1-20)</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={level}
                    onChange={(e) => setLevel(Math.min(20, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                    className="w-full px-3 py-2 bg-[#0A0A0C] border border-[#232636] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">CE Mod (Wis/Cha)</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={ceMod}
                    onChange={(e) => setCeMod(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="w-full px-3 py-2 bg-[#0A0A0C] border border-[#232636] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="rctToggle"
                  checked={hasRCT}
                  onChange={(e) => setHasRCT(e.target.checked)}
                  className="rounded bg-[#0A0A0C] border-[#232636] text-purple-600 focus:ring-0"
                />
                <label htmlFor="rctToggle" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Đã mở khóa Phục Hồi Phản Chuyển (RCT) • 反転術式
                </label>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0A0A0C] border border-[#202332]">
            <div className="p-3 rounded-xl bg-[#12131A] border border-[#1C1E2B]">
              <span className="text-[10px] text-slate-500 font-mono block">Tổng Chú Lực (CE)</span>
              <span className={`text-2xl font-black font-mono ${currentTheme.accentClass}`}>{cePool}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#12131A] border border-[#1C1E2B]">
              <span className="text-[10px] text-slate-500 font-mono block">Độ Khó Cứu Nguy (DC)</span>
              <span className="text-2xl font-black text-white font-mono">{ceSaveDC}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#12131A] border border-[#1C1E2B]">
              <span className="text-[10px] text-slate-500 font-mono block">Attack Bonus</span>
              <span className="text-2xl font-black text-blue-400 font-mono">+{ceAttackBonus}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#12131A] border border-[#1C1E2B]">
              <span className="text-[10px] text-slate-500 font-mono block">Proficiency</span>
              <span className="text-xl font-bold text-slate-300 font-mono">+{profBonus}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#12131A] border border-[#1C1E2B] col-span-2">
              <span className="text-[10px] text-slate-500 font-mono block">Bể Máu RCT (Healing Pool)</span>
              <span className={`text-xl font-bold font-mono ${hasRCT ? 'text-emerald-400' : 'text-slate-600'}`}>
                {hasRCT ? `${rctPool} HP (Hồi ${ceMod * 10} HP/lượt)` : 'Chưa giác ngộ'}
              </span>
            </div>
          </div>
        </div>
        )}

        {/* TOOL 2: DOMAIN CLASH SIMULATOR */}
        {(activeToolId === 'all' || activeToolId === 'domain-clash') && (
        <div className={`rounded-3xl bg-[#12131A] border border-[#232636] p-6 sm:p-8 shadow-xl flex flex-col justify-between ${
          activeToolId === 'domain-clash' ? 'lg:col-span-2 max-w-4xl mx-auto w-full' : ''
        }`}>
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">Mô Phỏng Va Chạm Lãnh Địa (Domain Clash)</h3>
                <p className="text-xs text-slate-400">So sánh điểm tinh xảo (Refinement) để xác định bên áp chế</p>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-mono text-purple-300 mb-1">Refinement Bên A (0-1000)</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={refineA}
                  onChange={(e) => setRefineA(Math.min(1000, Math.max(0, parseInt(e.target.value, 10) || 0)))}
                  className="w-full px-3 py-2 bg-[#0A0A0C] border border-[#232636] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-amber-300 mb-1">Refinement Bên B (0-1000)</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={refineB}
                  onChange={(e) => setRefineB(Math.min(1000, Math.max(0, parseInt(e.target.value, 10) || 0)))}
                  className="w-full px-3 py-2 bg-[#0A0A0C] border border-[#232636] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Clash Result Box */}
          <div className="p-5 rounded-2xl bg-[#0A0A0C] border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Bên Chiếm Ưu Thế:</span>
              <span className="text-sm font-bold text-amber-300 font-display">{winner}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Chênh Lệch Tinh Xảo:</span>
              <span className="text-sm font-mono font-bold text-white">+{diffRefine} Refinement</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#1C1E2B]">
              <span className="text-xs text-slate-400">Thời Gian Áp Chế Sure-Hit:</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{roundsToOverwhelm}</span>
            </div>
          </div>
        </div>
        )}

      </div>

      {/* TOOL 3: LIMB DAMAGE ROLLER */}
      {(activeToolId === 'all' || activeToolId === 'limb-dice') && (
      <div className="rounded-3xl bg-[#12131A] border border-[#232636] p-6 sm:p-8 shadow-xl max-w-4xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center">
              <Skull className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">Xúc Xắc Chấn Thương &amp; Đứt Chi (Limb Roller)</h3>
              <p className="text-xs text-slate-400">Mô phỏng đòn đánh chí mạng nhắm vào các bộ phận cơ thể (d6)</p>
            </div>
          </div>

          <button
            onClick={rollLimb}
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-950/40"
          >
            <Dices className="w-4 h-4" />
            <span>Tung d6 Ngay</span>
          </button>
        </div>

        {limbRoll ? (
          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white font-display">
                Kết quả xúc xắc: d6 = <strong className="text-red-400 font-mono text-base">{limbRoll.roll}</strong> ({limbRoll.part})
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                Sát thương yêu cầu: {limbRoll.req}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-red-900/30">
              <div className="p-3 rounded-xl bg-[#0A0A0C]">
                <strong className="text-amber-400 block mb-1">Gãy / Tổn thương (Broken):</strong>
                <p className="text-slate-300">{limbRoll.broken}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0C]">
                <strong className="text-red-400 block mb-1">Đứt lìa / Mất chi (Lost):</strong>
                <p className="text-slate-300">{limbRoll.lost}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500 text-xs border border-dashed border-[#232636] rounded-2xl">
            Nhấn "Tung d6 Ngay" để xác định vị trí chi bị chấn thương theo bảng luật Chapter 7.
          </div>
        )}
      </div>
      )}

    </div>
  );
}
