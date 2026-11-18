import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, Sparkles, Swords, Shield, Scroll, BookOpen, Users, ChevronRight, Compass } from 'lucide-react';

import techniquesData from '../data/techniques.json';
import classesData from '../data/classes.json';
import racesData from '../data/races.json';
import backgroundsData from '../data/backgrounds.json';
import equipmentData from '../data/equipment.json';
import featsData from '../data/feats.json';
import rulesData from '../data/rules.json';
import { useTheme } from '../context/ThemeContext';

export default function GlobalSearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const { currentTheme } = useTheme();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Build searchable index
  const allItems = useMemo(() => {
    const list = [];

    // Techniques
    techniquesData.forEach(t => {
      list.push({
        id: t.id,
        title: t.name,
        type: 'Thuật Thức',
        kanji: '術式',
        tab: 'techniques',
        icon: Sparkles,
        badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
        subtitle: t.vietnameseName ? `${t.vietnameseName} (${t.character || 'Thuật Sư'})` : (t.description ? t.description.slice(0, 80) + '...' : 'Thuật thức bẩm sinh'),
        data: t,
        keywords: `${t.name} ${t.vietnameseName || ''} ${t.character || ''} ${t.features?.map(f => f.name).join(' ')} ${t.feats?.map(f => f.name).join(' ')} ${t.domain?.name || ''}`,
      });
    });

    // Classes
    classesData.forEach(c => {
      list.push({
        id: c.id,
        title: c.name,
        type: 'Lớp Nhân Vật',
        kanji: '等級',
        tab: 'classes',
        icon: Swords,
        badgeColor: 'bg-red-500/15 text-red-300 border-red-500/30',
        subtitle: `Hit Dice: ${c.hitDice || '1d8'} • ${c.features?.length || 0} tính năng`,
        data: c,
        keywords: `${c.name} ${c.features?.map(f => f.name).join(' ')} ${c.hitDice}`,
      });
    });

    // Races
    racesData.forEach(r => {
      list.push({
        id: r.id,
        title: r.name,
        type: 'Chủng Tộc',
        kanji: '種族',
        tab: 'races',
        icon: Users,
        badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        subtitle: r.description ? r.description.slice(0, 90) : 'Chủng tộc chú thuật',
        data: r,
        keywords: `${r.name} ${r.traits?.map(t => t.name).join(' ')}`,
      });
    });

    // Backgrounds
    backgroundsData.backgrounds.forEach(bg => {
      list.push({
        id: bg.id,
        title: bg.name,
        type: 'Xuất Thân',
        kanji: '背景',
        tab: 'backgrounds',
        icon: Compass,
        badgeColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
        subtitle: `${bg.vietnameseName} • Feat: ${bg.feat}`,
        data: bg,
        keywords: `${bg.name} ${bg.vietnameseName} ${bg.character} ${bg.feat} ${bg.skills} ${bg.description}`,
      });
    });

    // Mindsets
    backgroundsData.mindsets.forEach(ms => {
      list.push({
        id: ms.id,
        title: ms.name,
        type: 'Tâm Thế',
        kanji: ms.kanji || '心態',
        tab: 'backgrounds',
        icon: Compass,
        badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        subtitle: `${ms.vietnameseName} (${ms.character}) • ${ms.mechanic.slice(0, 60)}...`,
        data: ms,
        keywords: `${ms.name} ${ms.vietnameseName} ${ms.character} ${ms.kanji} ${ms.mechanic} ${ms.quote}`,
      });
    });

    // Cursed Tools
    equipmentData.cursedTools.forEach(ct => {
      list.push({
        id: ct.name.toLowerCase().replace(/\s+/g, '-'),
        title: ct.name,
        type: 'Chú Cụ',
        kanji: '呪具',
        tab: 'equipment',
        icon: Shield,
        badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        subtitle: `${ct.grade} • ${ct.description ? ct.description.slice(0, 80) + '...' : ''}`,
        data: ct,
        keywords: `${ct.name} ${ct.grade} ${ct.description}`,
      });
    });

    // Equipment Packs
    if (equipmentData.equipmentPacks) {
      equipmentData.equipmentPacks.forEach(pack => {
        list.push({
          id: pack.name.toLowerCase().replace(/\s+/g, '-'),
          title: pack.name,
          type: 'Gói Trang Bị',
          kanji: '装備',
          tab: 'equipment',
          icon: Shield,
          badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          subtitle: `${pack.vietnameseName} (${pack.cost}) • Kèm Chú cụ: ${pack.cursedToolIncluded?.name || 'None'}`,
          data: pack,
          keywords: `${pack.name} ${pack.vietnameseName} ${pack.cost} ${pack.description} ${pack.contents.join(' ')}`,
        });
      });
    }

    // Feats
    Object.entries(featsData).forEach(([cat, featsList]) => {
      if (Array.isArray(featsList)) {
        featsList.forEach(f => {
          list.push({
            id: f.name.toLowerCase().replace(/\s+/g, '-'),
            title: f.name,
            type: 'Kỳ Tài (Feat)',
            kanji: '秘術',
            tab: 'feats',
            icon: Scroll,
            badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
            subtitle: `${f.vietnameseName ? f.vietnameseName + ' • ' : ''}${cat} • ${f.prerequisite || 'Không yêu cầu'}`,
            data: f,
            keywords: `${f.name} ${f.vietnameseName || ''} ${f.character || ''} ${cat} ${f.prerequisite} ${f.description}`,
          });
        });
      }
    });

    // Multiclassing
    if (rulesData.multiclassing || featsData.multiclassing) {
      list.push({
        id: 'multiclassing-guide',
        title: 'Multiclassing (Đa Lớp Nhân Vật)',
        type: 'Quy Tắc Đa Lớp (Rules)',
        kanji: '複業',
        tab: 'rules',
        ruleSection: 'multiclassing',
        icon: BookOpen,
        badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        subtitle: 'Bảng điều kiện chỉ số 13+ và quy tắc kết hợp cấp độ các lớp nhân vật',
        data: rulesData.multiclassing || featsData.multiclassing,
        keywords: 'multiclass multiclassing da lop lop nhan vat dieu kien warrior scout juggernaut strategist support shikigami heavenly restriction',
      });
    }

    // Rules
    const ruleTopics = [
      { title: 'Barriers & Domain (Kết Giới & Bành Trướng Lãnh Địa)', sub: 'Màn, Giản Dị Lãnh Địa, Refinement, Domain Clash', kw: 'barriers man simple domain ket gioi banh truong lanh dia refinement clash sure hit', section: 'domain-expansion' },
      { title: 'Binding Vows (Ràng Buộc & Khế Ước)', sub: 'Các loại ràng buộc, quy tắc và Bảng Bất Hạnh', kw: 'binding vows rang buoc misfortune pact overtime revealing hand', section: 'binding-vows' },
      { title: 'Breakthroughs (Đột Phá: Hắc Thiểm & RCT)', sub: 'Tỷ lệ Hắc Thiểm Black Flash, Phục hồi Phản chuyển RCT', kw: 'black flash hac thiem rct reverse cursed technique recovery burnout', section: 'breakthroughs' },
      { title: 'Limb Damage Table (Bảng Đứt Chi)', sub: 'Quy tắc chấn thương, gãy chân tay, mất chi', kw: 'limb damage cut dut chi broken lost injury table', section: 'limb-damage' },
      { title: 'Rules of Thumb (Quy Tắc Chỉ Dẫn Cốt Lõi)', sub: 'Thang phân cấp CR, Thăng cấp, Thù lao, Chú linh, Thức thần & Linh hồn', kw: 'rules of thumb phan cap thăng cấp grading promotion payout chu linh shikigami soul damage', section: 'rules-of-thumb' },
      { title: 'Combat & Action Economy (Hành Động & Cơ Chế Chiến Đấu)', sub: 'Full-Turn Action, Clash đỡ đòn, Calling Shots, Sát thương rơi ngã Falling', kw: 'combat action economy full-turn clash calling shots falling damage drop rơi ngã', section: 'optional-rules' },
      { title: 'Cursed Energy Manipulation (Chú Lực Căn Bản)', sub: 'Thao túng Chú lực cơ bản, CE flow, hồi phục cảm xúc tiêu cực', kw: 'cursed energy chu luc negative emotion recovery flow', section: 'cursed-energy' },
    ];
    ruleTopics.forEach(rt => {
      list.push({
        id: rt.title.toLowerCase().replace(/\s+/g, '-'),
        title: rt.title,
        type: 'Quy Tắc Chú Thuật',
        kanji: '規則',
        tab: 'rules',
        ruleSection: rt.section,
        icon: BookOpen,
        badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        subtitle: rt.sub,
        data: rt,
        keywords: `${rt.title} ${rt.sub} ${rt.kw}`,
      });
    });

    return list;
  }, []);

  // Filter items
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 10);
    }
    const q = query.toLowerCase().trim();
    return allItems.filter(item => {
      return item.title.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q);
    }).slice(0, 20);
  }, [query, allItems]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1 < filteredResults.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 >= 0 ? prev - 1 : filteredResults.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredResults, onClose]);

  const handleSelect = (item) => {
    onSelectResult(item);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div 
        className="relative w-full max-w-2xl bg-[#0C0D12] border border-[#282D3F] rounded-2xl shadow-domain overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-[#202332]">
          <Search className={`w-5 h-5 ${currentTheme.accentClass} mr-3 shrink-0`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder="Tìm kiếm thuật thức, class, chú cụ, quy tắc (Limitless, Sukuna, Overtime...)..."
            className="w-full py-4 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-400" />
              <p className="text-sm">Không tìm thấy kết quả nào khớp với "{query}"</p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={`${item.type}-${item.id}-${idx}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-[#181924] border border-[#383D56] shadow-sm' 
                      : 'hover:bg-[#12131A] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#14151E] border border-[#232738] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white truncate font-display">
                          {item.title}
                        </span>
                        <span className={`text-[9px] px-2 py-0.2 rounded-full border ${item.badgeColor} font-mono`}>
                          {item.type}
                        </span>
                        <span className="text-[10px] font-kanji text-slate-600 hidden sm:inline">{item.kanji}</span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5 font-sans">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-white translate-x-0.5' : 'text-slate-600'}`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2.5 bg-[#08080B] border-t border-[#1C1E2B] flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center space-x-3">
            <span><kbd className="px-1 py-0.5 bg-[#171822] rounded text-slate-400">↑↓</kbd> di chuyển</span>
            <span><kbd className="px-1 py-0.5 bg-[#171822] rounded text-slate-400">Enter</kbd> chọn</span>
            <span><kbd className="px-1 py-0.5 bg-[#171822] rounded text-slate-400">Esc</kbd> đóng</span>
          </div>
          <span className="text-slate-400">{filteredResults.length} kết quả</span>
        </div>
      </div>
    </div>
  );
}
