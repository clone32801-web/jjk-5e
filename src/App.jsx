import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import GlobalSearchModal from './components/GlobalSearchModal';
import TechniquesView from './components/TechniquesView';
import ClassesView from './components/ClassesView';
import RacesView from './components/RacesView';
import EquipmentView from './components/EquipmentView';
import FeatsView from './components/FeatsView';
import RulesView from './components/RulesView';
import ToolsView from './components/ToolsView';
import BackgroundsView from './components/BackgroundsView';

function AppContent() {
  const [activeTab, setActiveTab] = useState('techniques');
  
  // Sub-navigation states across all tabs
  const [activeCategory, setActiveCategory] = useState('all'); // for techniques
  const [activeClassId, setActiveClassId] = useState('juggernaut'); // for classes
  const [activeRaceId, setActiveRaceId] = useState('human-races'); // for races
  const [activeBackgroundTab, setActiveBackgroundTab] = useState('backgrounds'); // for backgrounds
  const [activeEquipmentTab, setActiveEquipmentTab] = useState('cursed-tools'); // for equipment
  const [activeFeatCategory, setActiveFeatCategory] = useState('Barrier Feats'); // for feats
  const [activeRuleSection, setActiveRuleSection] = useState('cursed-energy'); // for rules
  const [activeToolId, setActiveToolId] = useState('ce-calc'); // for tools

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  const { currentTheme } = useTheme();

  // Scroll to top of page whenever switching tab or sub-item
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [
    activeTab, 
    activeCategory, 
    activeClassId, 
    activeRaceId, 
    activeBackgroundTab, 
    activeEquipmentTab, 
    activeFeatCategory, 
    activeRuleSection, 
    activeToolId
  ]);

  // Global Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSearchResult = (item) => {
    if (item.tab) {
      setActiveTab(item.tab);
      if (item.tab === 'rules' && item.ruleSection) {
        setActiveRuleSection(item.ruleSection);
      }
      if (item.tab === 'classes') {
        setActiveClassId(item.id);
      }
      if (item.tab === 'races') {
        setActiveRaceId(item.id);
      }
      setTargetId(item.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E2E8F0] flex flex-col lg:flex-row bg-jjk-pattern relative selection:bg-purple-600/30 selection:text-white">
      {/* Vertical Sidebar Navigation (Desktop) & Top Bar (Mobile) */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => { setActiveTab(tab); setTargetId(null); }} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeClassId={activeClassId}
        setActiveClassId={setActiveClassId}
        activeRaceId={activeRaceId}
        setActiveRaceId={setActiveRaceId}
        activeBackgroundTab={activeBackgroundTab}
        setActiveBackgroundTab={setActiveBackgroundTab}
        activeEquipmentTab={activeEquipmentTab}
        setActiveEquipmentTab={setActiveEquipmentTab}
        activeFeatCategory={activeFeatCategory}
        setActiveFeatCategory={setActiveFeatCategory}
        activeRuleSection={activeRuleSection}
        setActiveRuleSection={setActiveRuleSection}
        activeToolId={activeToolId}
        setActiveToolId={setActiveToolId}
        onOpenSearch={() => setIsSearchOpen(true)} 
      />

      {/* Main View Area & Footer Column */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <main className="flex-1 pb-16">
          {activeTab === 'techniques' && (
            <TechniquesView 
              selectedTechniqueId={targetId} 
              selectedCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          )}
          {activeTab === 'classes' && (
            <ClassesView 
              selectedClassId={activeClassId} 
              onSelectClass={setActiveClassId}
            />
          )}
          {activeTab === 'races' && (
            <RacesView 
              selectedRaceId={activeRaceId}
              onSelectRace={setActiveRaceId}
            />
          )}
          {activeTab === 'backgrounds' && (
            <BackgroundsView 
              activeTab={activeBackgroundTab}
              setActiveTab={setActiveBackgroundTab}
            />
          )}
          {activeTab === 'equipment' && (
            <EquipmentView 
              activeTab={activeEquipmentTab}
              setActiveTab={setActiveEquipmentTab}
            />
          )}
          {activeTab === 'feats' && (
            <FeatsView 
              activeCategory={activeFeatCategory}
              setActiveCategory={setActiveFeatCategory}
            />
          )}
          {activeTab === 'rules' && (
            <RulesView 
              activeSection={activeRuleSection}
              setActiveSection={setActiveRuleSection}
            />
          )}
          {activeTab === 'tools' && (
            <ToolsView 
              activeToolId={activeToolId}
              setActiveToolId={setActiveToolId}
            />
          )}
        </main>

        {/* Global Search Modal */}
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectResult={handleSelectSearchResult}
        />

        {/* Footer */}
        <footer className="border-t border-[#1C1E2B] bg-[#070709] py-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <p className="font-bold text-slate-300 font-display flex items-center justify-center sm:justify-start gap-2">
                <span>呪術廻戦 5e System Compendium</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#171822] text-slate-400 border border-[#232636]">v6 2026</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Dự án chuyển thể D&amp;D 5e phi thương mại bởi tác giả <strong className="text-slate-400">I watch Anime</strong> • Giấy phép CC BY-NC-SA 4.0.
              </p>
            </div>
            <div className="text-[11px] font-mono text-slate-600">
              D&amp;D 5e &copy; Wizards of the Coast • Jujutsu Kaisen &copy; Gege Akutami / Shueisha
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
