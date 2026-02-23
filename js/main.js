/* ============================================================
   main.js — Yamaha MODX Thai Manual
   Handles: Sidebar injection, navigation, mobile menu, AdSense
   ============================================================ */

// ── AdSense Configuration ──
// 🔧 แก้ค่านี้เป็น Publisher ID จริงของคุณ
const ADSENSE_PUB_ID = 'ca-pub-6824376916256036';

/* ============================================================
   MULTI-BRAND / MULTI-MODEL ARCHITECTURE
   ============================================================ */

const BRANDS = {
  yamaha: {
    name: 'Yamaha',
    color: '#00d4ff',
    accent: 'cyan',
    logo: '🎹',
    models: {
      'modx': {
        name: 'MODX / MODX+ / MODXM',
        folder: 'pages',
        badge: 'badge-modx',
        pages: [
          { num:'01', icon:'📖', title:'แนะนำ Yamaha MODX', sub:'ประวัติ, จุดเด่น, ความแตกต่างจาก MONTAGE' },
          { num:'02', icon:'🔢', title:'เปรียบเทียบทุกรุ่น', sub:'MODX vs MODX+ vs MODXM — Spec ครบ' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, ตั้งค่าครั้งแรก, เปิดเครื่อง' },
          { num:'04', icon:'🎛️', title:'AWM2 + FM-X Engine', sub:'ZG Sound Generator, Operator, Algorithm' },
          { num:'05', icon:'🎹', title:'Performance Mode', sub:'Layer, Split, Scene, Super Knob' },
          { num:'06', icon:'🎤', title:'Live Set & Gig', sub:'Set List สำหรับแสดงสด, Foot Switch' },
          { num:'07', icon:'🎚️', title:'Parts & Mixing', sub:'Volume, EQ, Note Limit, MIDI Channel' },
          { num:'08', icon:'✨', title:'Effects & EQ', sub:'Insertion, Reverb, Master Effect' },
          { num:'09', icon:'🔄', title:'Arpeggio & Motion Seq.', sub:'Pattern, Motion Lane, Super Knob Assign' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'Channel, Local Off, Clock Sync' },
          { num:'11', icon:'💻', title:'DAW Integration', sub:'USB Audio, Cubase, Logic, Ableton' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'Piano, Organ, Brass, Synth — ทุกแนว' },
          { num:'13', icon:'🎵', title:'Preset Sounds List', sub:'รายชื่อ Preset แนะนำ ค้นหาได้' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอนจาก Yamaha Official' },
        ]
      },
      'montage-m': {
        name: 'MONTAGE M',
        folder: 'montage-m',
        badge: 'badge-yamaha',
        pages: [
          { num:'01', icon:'📖', title:'แนะนำ MONTAGE M', sub:'Flagship Synthesizer, AWM2+FM-X+AN-X ครบ' },
          { num:'02', icon:'🔢', title:'เปรียบเทียบรุ่น', sub:'MONTAGE M6 vs M7 vs M8x — Spec' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, ตั้งค่า, Navigation' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'AWM2 + FM-X + AN-X, ZG SG, 8 Parts' },
          { num:'05', icon:'🎹', title:'Performance Mode', sub:'16 Parts, Layer, Split, Scene' },
          { num:'06', icon:'🎤', title:'Live Set & Gig', sub:'Set List, Foot Switch, Scene Switch' },
          { num:'07', icon:'🎚️', title:'Parts & Mixing', sub:'16 Parts, EQ, Note Limit' },
          { num:'08', icon:'✨', title:'Effects & EQ', sub:'Insertion, Reverb, VCM Effects' },
          { num:'09', icon:'🔄', title:'Motion Sequencer', sub:'8 Lanes, Super Knob, Assign' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI Channel, Clock, Zone' },
          { num:'11', icon:'💻', title:'DAW Integration', sub:'USB Audio 32in/4out, Cubase' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'Piano, Organ, Strings, Brass' },
          { num:'13', icon:'🎵', title:'Preset Sounds List', sub:'Preset 2000+ แนะนำสำหรับวง' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน MONTAGE M' },
        ]
      }
    }
  },
  roland: {
    name: 'Roland',
    color: '#ff4444',
    accent: 'red',
    logo: '🎼',
    models: {
      'fantom': {
        name: 'FANTOM EX / FANTOM-0',
        folder: 'roland-fantom',
        badge: 'badge-roland',
        pages: [
          { num:'01', icon:'📖', title:'แนะนำ Roland FANTOM', sub:'Workstation Flagship, ZEN-Core Engine' },
          { num:'02', icon:'🔢', title:'เปรียบเทียบรุ่น', sub:'FANTOM-06/07/08 vs FANTOM EX' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, Setup, Navigation' },
          { num:'04', icon:'🎛️', title:'ZEN-Core Sound Engine', sub:'Structure, PCM, Behavior Modeling' },
          { num:'05', icon:'🎹', title:'Scene / Program Mode', sub:'Scene, Part 16, Layer, Split' },
          { num:'06', icon:'🎤', title:'Live Set & Performance', sub:'Set List, Quick Select, Foot Switch' },
          { num:'07', icon:'🎚️', title:'Mixer & Routing', sub:'16 Parts, EQ, Send/Return' },
          { num:'08', icon:'✨', title:'Effects & EQ', sub:'MFX, IFX, System Effects' },
          { num:'09', icon:'🔄', title:'Arpeggio & Step Seq', sub:'Pattern, Step Seq 32 Steps' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'Channel, Clock, External Control' },
          { num:'11', icon:'💻', title:'DAW Integration', sub:'USB Audio, Audio Export, Plug-out' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'Piano, Organ, Brass, Synth' },
          { num:'13', icon:'🎵', title:'Preset Sounds List', sub:'Roland FANTOM Preset แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน FANTOM' },
        ]
      },
      'juno-x': {
        name: 'JUNO-X',
        folder: 'roland-juno-x',
        badge: 'badge-roland',
        pages: [
          { num:'01', icon:'📖', title:'แนะนำ Roland JUNO-X', sub:'ZEN-Core + JUNO-106 Model, 61 Keys' },
          { num:'02', icon:'🔢', title:'Spec & Features', sub:'Polyphony, Effects, Connectivity' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, Setup' },
          { num:'04', icon:'🎛️', title:'ZEN-Core + Model Exp', sub:'JUNO-106, SH-101, JX-8P Models' },
          { num:'05', icon:'🎹', title:'Program & Scene', sub:'Program, Layer, Split, Scene' },
          { num:'06', icon:'🎤', title:'Live Performance', sub:'Set List, Quick Access' },
          { num:'07', icon:'🎚️', title:'Mixing & Routing', sub:'Parts, EQ, Volume' },
          { num:'08', icon:'✨', title:'Effects & EQ', sub:'Chorus, Reverb, MFX' },
          { num:'09', icon:'🔄', title:'Arpeggio & Rhythm', sub:'Arpeggio Pattern, Rhythm Pattern' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI Channel, Clock, Zone' },
          { num:'11', icon:'💻', title:'DAW Integration', sub:'USB Audio, Interface' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'Piano, EPiano, Strings, Brass' },
          { num:'13', icon:'🎵', title:'Preset Sounds List', sub:'JUNO-X Preset แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน JUNO-X' },
        ]
      },
      'juno-d': {
        name: 'JUNO-DS2',
        folder: 'roland-juno-d',
        badge: 'badge-roland',
        pages: [
          { num:'01', icon:'📖', title:'แนะนำ JUNO-DS2', sub:'Performance Synth น้ำหนักเบา พกพาง่าย' },
          { num:'02', icon:'🔢', title:'Spec & Features', sub:'88/61/76 Keys, Battery, USB' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, ตั้งค่า' },
          { num:'04', icon:'🎛️', title:'SuperNATURAL Engine', sub:'PCM Sound, Acoustic Modeling' },
          { num:'05', icon:'🎹', title:'Program Mode', sub:'Patch, Layer, Split' },
          { num:'06', icon:'🎤', title:'Live Performance', sub:'Favorites, Live Set' },
          { num:'07', icon:'🎚️', title:'Mixing', sub:'Parts, Volume, EQ' },
          { num:'08', icon:'✨', title:'Effects & EQ', sub:'MFX, Reverb, Chorus' },
          { num:'09', icon:'🔄', title:'Arpeggio', sub:'Arpeggio Pattern, Chord' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI Channel, Clock' },
          { num:'11', icon:'💻', title:'DAW Integration', sub:'USB MIDI/Audio' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'Piano, EPiano, Organ, Brass' },
          { num:'13', icon:'🎵', title:'Preset Sounds List', sub:'JUNO-DS2 Preset แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน JUNO-DS2' },
        ]
      },
      'xps': {
        name: 'XPS-10 / XPS-30 / XPS-60',
        folder: 'roland-xps',
        badge: 'badge-roland',
        pages: [
          { num:'01', icon:'📖', title:'แนะนำ Roland XPS Series', sub:'Expandable Synth, PCM, SD Card' },
          { num:'02', icon:'🔢', title:'เปรียบเทียบรุ่น', sub:'XPS-10 vs XPS-30 vs XPS-60' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, Setup, SD Card' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'PCM, Expansion Board, SD Sound' },
          { num:'05', icon:'🎹', title:'Program & Patch', sub:'Patch, Layer, Split' },
          { num:'06', icon:'🎤', title:'Live Performance', sub:'Favorites, Live Set (XPS-30/60)' },
          { num:'07', icon:'🎚️', title:'Mixing', sub:'Volume, Pan, EQ' },
          { num:'08', icon:'✨', title:'Effects', sub:'MFX, Reverb, Chorus' },
          { num:'09', icon:'🔄', title:'Arpeggio', sub:'Arpeggio Pattern' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI Channel, Clock' },
          { num:'11', icon:'💻', title:'Computer Connection', sub:'USB MIDI' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'Piano, Organ, Strings' },
          { num:'13', icon:'🎵', title:'Preset Sounds List', sub:'XPS Preset แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน XPS' },
        ]
      }
    }
  },
  korg: {
    name: 'Korg',
    color: '#f59e0b',
    accent: 'amber',
    logo: '🎵',
    models: {
      'nautilus': {
        name: 'Nautilus / Nautilus AT',
        folder: 'korg-nautilus',
        badge: 'badge-korg',
        pages: [
          { num:'01', icon:'📖', title:'แนะนำ Korg Nautilus', sub:'9 Sound Engines, Kronos Successor' },
          { num:'02', icon:'🔢', title:'เปรียบเทียบรุ่น', sub:'Nautilus 61/73/88 vs Nautilus AT' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, TouchView, Setup' },
          { num:'04', icon:'🎛️', title:'9 Sound Engines', sub:'SGX-2, EP-1, CX-3, STR-1, MS-20, ...ครบ' },
          { num:'05', icon:'🎹', title:'Program & Combination', sub:'Program, Combination, Set List' },
          { num:'06', icon:'🎤', title:'Live Performance', sub:'Set List, Foot Switch, Scene' },
          { num:'07', icon:'🎚️', title:'Mixer & Routing', sub:'16 Timbres, EQ, AUX' },
          { num:'08', icon:'✨', title:'Effects & EQ', sub:'MFX, TFX, Master EQ' },
          { num:'09', icon:'🔄', title:'Arpeggio & Drum Track', sub:'Arpeggio, Drum Track, Step Seq' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI Channel, Clock, Zone' },
          { num:'11', icon:'💻', title:'DAW Integration', sub:'USB Audio, Studio Connection' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'Piano, Organ, Strings ทุกแนว' },
          { num:'13', icon:'🎵', title:'Preset Sounds List', sub:'Nautilus Preset แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Nautilus' },
        ]
      },
      'kronos': {
        name: 'Kronos 2',
        folder: 'korg-kronos',
        badge: 'badge-korg',
        pages: [
          { num:'01', icon:'📖', title:'แนะนำ Korg Kronos 2', sub:'เรือธง Workstation 9 Engines' },
          { num:'02', icon:'🔢', title:'เปรียบเทียบรุ่น', sub:'Kronos 61/73/88 — Spec' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, TouchView, SSD' },
          { num:'04', icon:'🎛️', title:'9 Sound Engines', sub:'SGX-2, EP-1, CX-3, HD-1, AL-1, ...' },
          { num:'05', icon:'🎹', title:'Program & Combi', sub:'Program, Combination, Sequence' },
          { num:'06', icon:'🎤', title:'Live Set', sub:'Set List, Scene, Foot Switch' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'16 Timbres, EQ, AUX Return' },
          { num:'08', icon:'✨', title:'Effects', sub:'MFX, TFX, Master Compressor' },
          { num:'09', icon:'🔄', title:'Arpeggio & RPPR', sub:'Arpeggio, RPPR, Drum Track' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI Channel, Clock, Zone' },
          { num:'11', icon:'💻', title:'DAW Integration', sub:'USB Audio 16in/16out' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'Piano, Organ, Strings, Brass' },
          { num:'13', icon:'🎵', title:'Preset Sounds List', sub:'Kronos Preset แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Kronos 2' },
        ]
      },
      'kross': {
        name: 'Kross 2',
        folder: 'korg-kross',
        badge: 'badge-korg',
        pages: [
          { num:'01', icon:'📖', title:'แนะนำ Korg Kross 2', sub:'น้ำหนักเบา Battery-powered 61/88 Keys' },
          { num:'02', icon:'🔢', title:'Spec & Features', sub:'Kross 2-61 vs Kross 2-88' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, Setup, Battery Mode' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'PCM, EDS-i, 134MB ROM' },
          { num:'05', icon:'🎹', title:'Program & Combination', sub:'Program, Combi, Layer, Split' },
          { num:'06', icon:'🎤', title:'Live Performance', sub:'Set List, Favorites' },
          { num:'07', icon:'🎚️', title:'Mixing', sub:'Volume, Pan, EQ' },
          { num:'08', icon:'✨', title:'Effects', sub:'Insert, Master Effects' },
          { num:'09', icon:'🔄', title:'Arpeggio & Drum', sub:'Arpeggio Pattern, Drum Track' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI Channel, Clock' },
          { num:'11', icon:'💻', title:'USB Connection', sub:'USB MIDI, USB Audio (88)' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'Piano, EPiano, Strings' },
          { num:'13', icon:'🎵', title:'Preset Sounds List', sub:'Kross 2 Preset แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Kross 2' },
        ]
      }
    }
  }
};

// ── Navigation items ──
/* ── Detect current model from URL path ── */
function detectModel() {
  const path = window.location.pathname;
  for (const [brandKey, brand] of Object.entries(BRANDS)) {
    for (const [modelKey, model] of Object.entries(brand.models)) {
      const folder = model.folder;
      if (path.includes('/' + folder + '/') || path.includes('\\' + folder + '\\')) {
        return { brandKey, brand, modelKey, model };
      }
    }
  }
  // Default: MODX (pages/)
  return {
    brandKey: 'yamaha', brand: BRANDS.yamaha,
    modelKey: 'modx',   model: BRANDS.yamaha.models.modx
  };
}

// ── Determine base path from current location ──
function getBasePath() {
  const path = window.location.pathname;
  // Check if we're in any model subfolder (not root)
  const allFolders = [];
  for (const brand of Object.values(BRANDS)) {
    for (const model of Object.values(brand.models)) {
      allFolders.push(model.folder);
    }
  }
  const inSubfolder = allFolders.some(f => path.includes('/' + f + '/'));
  return inSubfolder ? '../' : './';
}

function isInPages() {
  const path = window.location.pathname;
  const allFolders = [];
  for (const brand of Object.values(BRANDS)) {
    for (const model of Object.values(brand.models)) {
      allFolders.push(model.folder);
    }
  }
  return allFolders.some(f => path.includes('/' + f + '/'));
}

function getCurrentPage() {
  const parts = window.location.pathname.split('/');
  const file = parts[parts.length - 1];
  if (!file || file === 'index.html' || file === '') return 'home';
  const m = file.match(/^(\d+)/);
  return m ? m[1] : file;
}

// ── Build sidebar HTML (multi-model aware) ──
function buildSidebar() {
  const base = getBasePath();
  const current = getCurrentPage();
  const { brandKey, brand, modelKey, model } = detectModel();

  // Build model switcher dropdown items
  let modelSwitcherItems = '';
  for (const [bk, b] of Object.entries(BRANDS)) {
    modelSwitcherItems += `<div class="model-switcher-brand">${b.logo} ${b.name}</div>`;
    for (const [mk, m2] of Object.entries(b.models)) {
      const isCurrent = bk === brandKey && mk === modelKey;
      const href = base + m2.folder + '/01-overview.html';
      const hrefModx = mk === 'modx' ? base + 'pages/01-intro.html' : href;
      modelSwitcherItems += `<a class="model-switcher-item${isCurrent ? ' active' : ''}" href="${mk === 'modx' ? hrefModx : href}">${m2.name}</a>`;
    }
  }

  // Build nav items from model pages
  let navHtml = '';
  const sections = {
    '01': 'เริ่มต้น', '02': 'เริ่มต้น', '03': 'เริ่มต้น',
    '04': 'Sound Engine',
    '05': 'Performance', '06': 'Performance', '07': 'Performance', '08': 'Performance',
    '09': 'Advanced', '10': 'Advanced', '11': 'Advanced',
    '12': 'วงดนตรี', '13': 'วงดนตรี', '14': 'วงดนตรี'
  };
  let lastSection = '';
  model.pages.forEach(page => {
    const sec = sections[page.num] || '';
    if (sec !== lastSection) {
      navHtml += `<div class="nav-section-title">${sec}</div>`;
      lastSection = sec;
    }
    const isActive = current === page.num;
    // Resolve href for this page
    let href;
    if (modelKey === 'modx') {
      // existing MODX pages use named files
      const fileMap = {
        '01':'01-intro','02':'02-models','03':'03-getting-started',
        '04':'04-sound-engine','05':'05-performance','06':'06-live-set',
        '07':'07-parts-mixing','08':'08-effects','09':'09-arpeggio',
        '10':'10-midi','11':'11-daw','12':'12-band-setup',
        '13':'13-presets','14':'14-videos'
      };
      const fname = fileMap[page.num] || page.num;
      href = isInPages() ? `${fname}.html` : `pages/${fname}.html`;
    } else {
      href = isInPages() ? `${page.num}-overview.html` : `${model.folder}/${page.num}-overview.html`;
    }
    navHtml += `<a class="nav-item${isActive ? ' active' : ''}" href="${href}">
      <span class="nav-icon">${page.icon}</span>
      <span>${page.title}</span>
    </a>`;
  });

  return `
    <div class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <a href="${base}index.html" style="text-decoration:none;color:inherit;">
          <div class="sidebar-logo-title">🎹 Synth คู่มือภาษาไทย</div>
        </a>
        <div class="model-switcher-toggle" id="model-switcher-btn" title="เปลี่ยนรุ่น">
          <span class="model-current-name">${brand.logo} ${brand.name} ${model.name}</span>
          <span style="color:var(--text-muted);font-size:0.75rem;">▼ เปลี่ยนรุ่น</span>
        </div>
        <div class="model-switcher-dropdown" id="model-switcher-dropdown" style="display:none;">
          ${modelSwitcherItems}
        </div>
      </div>
      <div class="sidebar-search">
        <input type="text" id="sidebar-search-input" placeholder="🔍 ค้นหาเนื้อหา..." autocomplete="off">
      </div>
      <nav class="sidebar-nav">
        <a class="nav-item" href="${base}index.html">
          <span class="nav-icon">🏠</span><span>หน้าหลัก</span>
        </a>
        ${navHtml}
      </nav>
      <div class="ad-sidebar">
        <ins class="adsbygoogle"
          style="display:block;min-width:160px;min-height:250px;"
          data-ad-client="${ADSENSE_PUB_ID}"
          data-ad-slot="SIDEBAR_AD_SLOT"
          data-ad-format="rectangle"
          data-full-width-responsive="true"></ins>
      </div>
    </div>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>`;
}

// ── Build Header Ad ──
function buildHeaderAd() {
  return `<div class="ad-header">
    <ins class="adsbygoogle"
      style="display:inline-block;width:728px;height:90px;max-width:100%;"
      data-ad-client="${ADSENSE_PUB_ID}"
      data-ad-slot="HEADER_AD_SLOT"></ins>
  </div>`;
}

// ── Auto-insert in-content ads ──
function insertInContentAds() {
  const content = document.querySelector('.page-content');
  if (!content) return;
  const paragraphs = content.querySelectorAll('p, li, .info-box, .step-list');
  let count = 0;
  let adInserted = 0;
  const INSERT_EVERY = 15; // every ~15 block elements

  paragraphs.forEach((el, i) => {
    count++;
    if (count >= INSERT_EVERY && adInserted < 3) {
      count = 0;
      adInserted++;
      const adDiv = document.createElement('div');
      adDiv.className = 'ad-incontent';
      adDiv.innerHTML = `<ins class="adsbygoogle"
        style="display:block;text-align:center;"
        data-ad-client="${ADSENSE_PUB_ID}"
        data-ad-slot="INCONTENT_AD_SLOT"
        data-ad-format="fluid"
        data-ad-layout="in-article"
        data-full-width-responsive="true"></ins>`;
      el.parentNode.insertBefore(adDiv, el.nextSibling);
    }
  });
}

// ── Push all AdSense ads ──
function initAds() {
  if (typeof adsbygoogle !== 'undefined') return;
  document.querySelectorAll('.adsbygoogle').forEach(() => {
    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
  });
}

// ── Breadcrumb ──
function buildBreadcrumb(title, section) {
  const base = getBasePath();
  const { brand, model } = detectModel();
  const chevron = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
  let crumb = `<a href="${base}index.html">หน้าหลัก</a>`;
  crumb += `${chevron}<span>${brand.name} ${model.name}</span>`;
  if (section) crumb += `${chevron}<span>${section}</span>`;
  if (title)   crumb += `${chevron}<span>${title}</span>`;
  return `<div class="breadcrumb">${crumb}</div>`;
}

// ── Build Top Header ──
function buildTopHeader(opts = {}) {
  return `
    <header class="top-header">
      <button class="hamburger" id="hamburger" aria-label="เมนู">
        <span></span><span></span><span></span>
      </button>
      ${buildBreadcrumb(opts.title, opts.section)}
      <div class="header-actions">
        <button class="btn-print" onclick="window.print()">🖨️ พิมพ์/PDF</button>
      </div>
    </header>`;
}

// ── Full layout injection ──
// Call this from each page's <script>:
//   initPage({ title: 'ชื่อหน้า', section: 'หมวด', adsenseScript: true })
window.initPage = function(opts = {}) {
  // 1. AdSense script tag in <head>
  if (opts.adsense !== false) {
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`;
    document.head.appendChild(script);
  }

  // 2. Build layout container
  const body = document.body;
  const pageContentEl = document.getElementById('page-body');
  const pageContentHTML = pageContentEl ? pageContentEl.innerHTML : '';

  body.innerHTML = '';
  body.classList.add('layout');

  // Sidebar
  body.insertAdjacentHTML('beforeend', buildSidebar());

  // Main wrapper
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'main-wrapper';
  mainWrapper.innerHTML = `
    ${buildTopHeader(opts)}
    ${buildHeaderAd()}
    <main>
      <div class="page-content" id="page-content">
        ${pageContentHTML}
      </div>
    </main>
    <footer class="page-footer">
      &copy; 2026 คู่มือ Synthesizer ภาษาไทย | 
      <a href="${getBasePath()}index.html">หน้าหลัก</a> | 
      ข้อมูลอ้างอิงจาก Official Documentation ของแต่ละยี่ห้อ
    </footer>`;
  body.appendChild(mainWrapper);

  // Model switcher toggle
  const switcherBtn = document.getElementById('model-switcher-btn');
  const switcherDropdown = document.getElementById('model-switcher-dropdown');
  if (switcherBtn && switcherDropdown) {
    switcherBtn.addEventListener('click', () => {
      const isOpen = switcherDropdown.style.display !== 'none';
      switcherDropdown.style.display = isOpen ? 'none' : 'block';
    });
  }
  // Search overlay
  body.insertAdjacentHTML('beforeend', `
    <div id="search-results-overlay">
      <button class="search-close" id="search-close">✕ ปิด</button>
      <h2 style="color:#fff;border:none;margin:0 0 20px;padding:0;">ผลการค้นหา</h2>
      <div id="search-results-list"></div>
    </div>`);

  // 3. Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebar-overlay');
  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // 4. In-content ads
  insertInContentAds();

  // 5. Init AdSense
  setTimeout(initAds, 500);

  // 6. Search
  initSidebarSearch();
};

// ── Sidebar search trigger ──
function initSidebarSearch() {
  const input = document.getElementById('sidebar-search-input');
  if (!input) return;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      if (typeof window.runSearch === 'function') {
        window.runSearch(input.value.trim());
      }
    }
  });
  input.addEventListener('input', () => {
    if (input.value.length >= 2 && typeof window.runSearch === 'function') {
      window.runSearch(input.value.trim());
    }
  });

  const closeBtn = document.getElementById('search-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.getElementById('search-results-overlay').classList.remove('active');
    });
  }
}
