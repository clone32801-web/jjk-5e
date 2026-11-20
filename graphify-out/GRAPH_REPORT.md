# 🧭 Graphify Knowledge Graph Report: Jujutsu Kaisen 5E Compendium

*Generated at: 2026-11-20T05:35:58.718Z*
*Total Nodes: 28 | Total Edges: 94*

---

## 1. Executive Summary & Codebase Architecture
The **Jujutsu Kaisen 5E Compendium (v6)** is architected as an authoritative tactical reference and operations hub for D&D 5th Edition converted to the Jujutsu Kaisen universe. The system is split cleanly across 4 primary community clusters:

1. **Core & Architecture**: App shell, unified ThemeContext provider (Satoru Void Blue, Sukuna Malevolent Crimson, Megumi Chimera Shadow), and the reactive omni-search modal.
2. **Views & Navigation**: 8 primary compendium interfaces covering classes, races, backgrounds, techniques, cursed tools, feats, system rules, and the step-by-step creation guide.
3. **Data Repositories**: 8 static, high-density JSON knowledge bases housing over 1,000 distinct entities (79 techniques, 245 innate feats, 10 classes, 39 melee weapons, etc.).
4. **Tactical Engines & Telemetry**: Dedicated live mathematical computation engines (CE Allocation, Domain Barrier Tug-of-War, Clinical Trauma anatomical matrix, and Character Sheet exporter).

---

## 2. ⚡ "God Nodes" (Most Central Nodes by Degree)

| Rank | Node / Entity | Type | Community | Total Degree | In-Degree | Out-Degree | Architectural Role |
|:---:|:---|:---|:---|:---:|:---:|:---:|:---|
| 1 | **`App.jsx`** | `component` | Core & Architecture | **24** | 1 | 23 | Root component, router, layout frame, active tab state |
| 2 | **`ThemeContext.jsx`** | `context` | Core & Architecture | **13** | 13 | 0 | Global theme state (Gojo, Sukuna, Megumi tokens) |
| 3 | **`Navbar.jsx`** | `component` | Core & Architecture | **13** | 2 | 11 | Sidebar navigation, theme switcher, mobile header |
| 4 | **`GlobalSearchModal.jsx`** | `component` | Core & Architecture | **13** | 3 | 10 | Global command palette and instant fuzzy search |
| 5 | **`CharacterCreationView.jsx`** | `view` | Views & Navigation | **10** | 3 | 7 | 9-step creation guide and interactive character builder with live sheet |
| 6 | **`Engine:GlobalSearch`** | `engine` | Core & Architecture | **9** | 1 | 8 | In-memory multi-table full-text search across all 8 compendiums |
| 7 | **`ToolsView.jsx`** | `view` | Tactical Engines & Telemetry | **8** | 3 | 5 | Tactical tools: CE Allocation, Domain Barrier Clash, Trauma Matrix |

---

## 3. 🌐 Community Structure & Clusters

### Cluster A: Core & Shell (`Core & Architecture`)
* **`main.jsx`**: Mounts React 19 root, wraps `ThemeProvider` around `App`, and imports `index.css`.
* **`App.jsx`**: Master state orchestrator managing active tab, global search hotkeys (`Ctrl+K` / `Cmd+K`), and view switching.
* **`ThemeContext.jsx`**: High-centrality token context providing accent badges, border highlights, and active button styles across all 8 compendiums.
* **`Navbar.jsx`**: Dual-mode navigation bar supporting responsive desktop sidebar and compact mobile header with theme dropdown.
* **`GlobalSearchModal.jsx`**: High-speed command palette indexing all 8 JSON databases in memory.

### Cluster B: Compendium Views (`Views & Navigation`)
* **`TechniquesView.jsx`**: Deepest view in the app; manages 79 cursed techniques with expandable innate feats and Domain Expansion banners.
* **`ClassesView.jsx`**: Renders 10 Sorcerer classes, multi-subclass trees, and dedicated Shikigami management rules.
* **`RulesView.jsx`**: 10 system chapters (Binding Vows, Black Flash, RCT, Clashes, Multiclassing, Lingering Trauma).
* **`CharacterCreationView.jsx`**: Combines narrative guide with the live interactive character builder.
* **`EquipmentView.jsx`**: Covers standard weapons, cursed tools, and semi-cursed tool forging mechanics.
* **`FeatsView.jsx`**: 6 feat categories with instant technique-specific filtering.
* **`RacesView.jsx`**: Races, line-of-descent subraces, and trait documentation.
* **`BackgroundsView.jsx`**: 5 Backgrounds and 16 Mindsets (Alignments / Inspiration mechanics).

### Cluster C: Tactical Engines & Telemetry
* **`ToolsView.jsx`**: Host container for real-time DM/Player combat tools.
* **`Engine:CEAllocation`**: CE pool formula calculator (`PB + Mod + Dice`), DC calculation, and RCT reserve converter.
* **`Engine:DomainClash`**: Vector-balanced barrier clash simulator computing round-by-round collapse thresholds.
* **`Engine:TraumaMatrix`**: d6 surgical injury resolution engine with anatomical zone penalties and RCT recovery requirements.
* **`Engine:CharBuilder`**: Ability score point-buy / standard array allocator and instant text export.

### Cluster D: Static Data Repositories (`src/data/`)
* `techniques.json` (621 KB) — Heaviest data payload, 79 techniques.
* `rules.json` (185 KB) — Mechanical rule descriptions and tables.
* `classes.json` (161 KB) — 10 classes, progression tables, and features.
* `feats.json` (107 KB) — Universal and specialized feat definitions.
* `equipment.json` (51 KB) — Complete weapon, armor, and cursed item index.
* `backgrounds.json` (30 KB) — Societal backgrounds and Jujutsu mindsets.
* `races.json` (30 KB) — Anatomical and biological lineages.
* `characterCreation.json` (21 KB) — Creation guidelines.

---

## 4. 🔍 Surprising Connections & Architectural Highlights
1. **Zero-API Dependency (100% Offline Static Performance)**:
   All calculations, search indexing, and content generation occur client-side in sub-millisecond execution times without backend latency or external vector DB costs.
2. **Cross-Compendium Traversal**:
   - `CharacterCreationView` directly accesses 4 disparate datasets (`classes.json`, `races.json`, `backgrounds.json`, `techniques.json`) to compute real-time dynamic stats.
   - `FeatsView` dynamically parses `techniques.json` on the fly to extract and filter 245 Innate Technique feats.
   - `GlobalSearchModal` traverses all 8 JSON files concurrently with zero cache warmup time.
3. **Rigorous Unslop Design System**:
   Zero `rounded-3xl` instances, disciplined hairline `border-white/[0.08]` cards, and monospaced technical readouts (`[ DC ]`, `[ PB ]`, `[ CE ]`).

---

## 5. 💡 Suggested Navigation Questions & Next Steps
- *Q: How are cursed energy attack bonuses and save DCs synchronized across views?*  
  -> Inspect `Engine:CEAllocation` in `ToolsView.jsx` and `Engine:CharBuilder` in `CharacterCreationView.jsx`.
- *Q: Can new Innate Techniques be added without touching component code?*  
  -> Yes, appending entries to `src/data/techniques.json` automatically populates `TechniquesView`, `FeatsView`, `GlobalSearchModal`, and `CharacterCreationView`.
- *Q: How does Domain Barrier Clash calculate collapse timing?*  
  -> Check the refinement score delta formula in `ToolsView.jsx` and the clash reference table in `RulesView.jsx`.
