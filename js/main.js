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
  },

  // ── KORG ARRANGER ──────────────────────────────────────
  'korg-arranger': {
    name: 'Korg Pa Series',
    color: '#f59e0b',
    logo: '🎹',
    models: {
      'pa5x': {
        name: 'Pa5X', folder: 'korg-pa5x', badge: 'badge-korg',
        pages: [
          { num:'01', icon:'📖', title:'แนะนำ Korg Pa5X', sub:'Flagship Arranger, 61/76/88 Keys, OLED' },
          { num:'02', icon:'🔢', title:'Spec & Features', sub:'Polyphony, Sound, Connectivity' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, Setup, Navigation' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'RX Sound Engine, Stereo Samples' },
          { num:'05', icon:'🎹', title:'Style / Arranger Mode', sub:'Style, Variation, Fill, Ending' },
          { num:'06', icon:'🎤', title:'Performance Mode', sub:'Performance, Song, SongBook' },
          { num:'07', icon:'🎚️', title:'Mixer & Parts', sub:'Parts, Volume, EQ, Effects' },
          { num:'08', icon:'✨', title:'Effects & EQ', sub:'Insert, Master Effects, EQ' },
          { num:'09', icon:'🔄', title:'Micro Arranger', sub:'Chord Sequencer, Style Creator' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI, USB, Bluetooth' },
          { num:'11', icon:'💻', title:'USB Audio & Recording', sub:'USB Audio, MP3 Record' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'สไตล์ไทย, ป๊อป, ลูกทุ่ง' },
          { num:'13', icon:'🎵', title:'รายการ Style แนะนำ', sub:'Style ที่เหมาะกับเพลงไทย' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Pa5X' },
        ]
      },
      'pa4x': { name: 'Pa4X', folder: 'korg-pa4x', badge: 'badge-korg', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Korg Pa4X', sub:'Professional Arranger, Pa Series' },
          { num:'02', icon:'🔢', title:'Spec & Features', sub:'Sound, Style, Connectivity' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'RX, EX Sound Generator' },
          { num:'05', icon:'🎹', title:'Style / Arranger', sub:'Style, Fill, Variation' },
          { num:'06', icon:'🎤', title:'Performance & SongBook', sub:'Performance, Pad, SongBook' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan, EQ ต่อ Part' },
          { num:'08', icon:'✨', title:'Effects', sub:'Insert, Master, Reverb' },
          { num:'09', icon:'🔄', title:'Style Creator', sub:'สร้าง Style เอง' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI Channel, Clock' },
          { num:'11', icon:'💻', title:'Recording', sub:'MP3, MIDI Record' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ไทย, ป๊อป, ลูกทุ่ง, สากล' },
          { num:'13', icon:'🎵', title:'รายการ Style แนะนำ', sub:'Style ที่ดีที่สุดใน Pa4X' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Pa4X' },
      ]},
      'pa1000': { name: 'Pa1000', folder: 'korg-pa1000', badge: 'badge-korg', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Korg Pa1000', sub:'Mid-range Arranger 61 Keys' },
          { num:'02', icon:'🔢', title:'Spec & Features', sub:'Sound, Style, USB Audio' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'RX Sound Engine' },
          { num:'05', icon:'🎹', title:'Style / Arranger', sub:'Style, Fill, Ending' },
          { num:'06', icon:'🎤', title:'Performance & Pads', sub:'Performance, Pad Sounds' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan, EQ' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb, Chorus, Insert' },
          { num:'09', icon:'🔄', title:'Style Creator', sub:'Custom Style' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI Channel, USB' },
          { num:'11', icon:'💻', title:'Recording', sub:'Audio Record, MP3' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ป๊อป, ลูกทุ่ง, สากล' },
          { num:'13', icon:'🎵', title:'รายการ Style แนะนำ', sub:'Style แนะนำ Pa1000' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Pa1000' },
      ]},
      'pa700': { name: 'Pa700', folder: 'korg-pa700', badge: 'badge-korg', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Korg Pa700', sub:'61 Keys, Touchscreen, AF Mode' },
          { num:'02', icon:'🔢', title:'Spec & Features', sub:'Sound, Style Count, Effects' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'RX Sound Generator' },
          { num:'05', icon:'🎹', title:'Style / Arranger', sub:'Style Selection, Fill, Variation' },
          { num:'06', icon:'🎤', title:'Performance', sub:'Performance, Pad, SongBook' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan' },
          { num:'08', icon:'✨', title:'Effects', sub:'Insert, Master' },
          { num:'09', icon:'🔄', title:'Style Creator', sub:'Custom Style' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI Channel' },
          { num:'11', icon:'💻', title:'Recording', sub:'MP3, MIDI' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ป๊อป, ลูกทุ่ง' },
          { num:'13', icon:'🎵', title:'รายการ Style แนะนำ', sub:'Pa700 Style แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Pa700' },
      ]},
      'pa600': { name: 'Pa600', folder: 'korg-pa600', badge: 'badge-korg', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Korg Pa600', sub:'61 Keys Entry Professional' },
          { num:'02', icon:'🔢', title:'Spec', sub:'Sound, Style, Connectivity' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'Setup, Navigation' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'RX Sound' },
          { num:'05', icon:'🎹', title:'Arranger Mode', sub:'Style, Fill, Ending' },
          { num:'06', icon:'🎤', title:'Performance', sub:'Performance, Pad' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, EQ' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb, Chorus' },
          { num:'09', icon:'🔄', title:'Style Creator', sub:'Custom Style' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI Channel' },
          { num:'11', icon:'💻', title:'Recording', sub:'MP3, MIDI' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ป๊อป, ลูกทุ่ง' },
          { num:'13', icon:'🎵', title:'Style แนะนำ', sub:'Pa600 Style แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Pa600' },
      ]},
      'pa300': { name: 'Pa300', folder: 'korg-pa300', badge: 'badge-korg', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Korg Pa300', sub:'Entry Arranger 61 Keys' },
          { num:'02', icon:'🔢', title:'Spec', sub:'Sound, Style, Features' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'RX Sound' },
          { num:'05', icon:'🎹', title:'Arranger', sub:'Style, Fill' },
          { num:'06', icon:'🎤', title:'Performance', sub:'Performance, Pad' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb, Chorus' },
          { num:'09', icon:'🔄', title:'Style Creator', sub:'Custom Style' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI Channel' },
          { num:'11', icon:'💻', title:'Recording', sub:'MP3 Record' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ป๊อป, ลูกทุ่ง' },
          { num:'13', icon:'🎵', title:'Style แนะนำ', sub:'Pa300 Style แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Pa300' },
      ]},
    }
  },

  // ── ROLAND ARRANGER ────────────────────────────────────
  'roland-arranger': {
    name: 'Roland Arranger',
    color: '#ff4444',
    logo: '🎼',
    models: {
      'ea7': { name: 'E-A7', folder: 'roland-ea7', badge: 'badge-roland', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Roland E-A7', sub:'Arranger 61 Keys, 3,000+ Styles' },
          { num:'02', icon:'🔢', title:'Spec & Features', sub:'Polyphony, Sound, Style Count' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, Setup' },
          { num:'04', icon:'🎛️', title:'SuperNATURAL Engine', sub:'PCM Sound, Natural Feel' },
          { num:'05', icon:'🎹', title:'Style / Arranger', sub:'Style, Fill, Variation' },
          { num:'06', icon:'🎤', title:'Music Assistant', sub:'Song, Set List, Playlist' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Parts, Volume, EQ' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb, Chorus, MFX' },
          { num:'09', icon:'🔄', title:'Style Composer', sub:'สร้าง Style เอง' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI Channel, USB' },
          { num:'11', icon:'💻', title:'Recording', sub:'Audio, MIDI Record' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ไทย, สากล, ลูกทุ่ง' },
          { num:'13', icon:'🎵', title:'Style แนะนำ', sub:'E-A7 Style แนะนำ' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน E-A7' },
      ]},
    }
  },

  // ── YAMAHA ARRANGER ────────────────────────────────────
  'yamaha-arranger': {
    name: 'Yamaha Arranger',
    color: '#00d4ff',
    logo: '🎵',
    models: {
      'genos2': { name: 'Genos2', folder: 'yamaha-genos2', badge: 'badge-yamaha', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Yamaha Genos2', sub:'Flagship Arranger, 76 Keys' },
          { num:'02', icon:'🔢', title:'Spec & Features', sub:'Polyphony, Sound, Effects' },
          { num:'03', icon:'⚡', title:'เริ่มต้นใช้งาน', sub:'ต่อสาย, Setup' },
          { num:'04', icon:'🎛️', title:'CFX+Bösendorfer Piano', sub:'Premium Piano Engine' },
          { num:'05', icon:'🎹', title:'Style / Arranger', sub:'Style, Section, Fill' },
          { num:'06', icon:'🎤', title:'Registration & SongBook', sub:'Registration, Music Finder' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Parts, Volume, EQ, Send' },
          { num:'08', icon:'✨', title:'Effects', sub:'Insertion, Variation, Master EQ' },
          { num:'09', icon:'🔄', title:'Style Creator', sub:'Custom Style, MIDI Style' },
          { num:'10', icon:'🔌', title:'MIDI Setup', sub:'MIDI, USB, Clock' },
          { num:'11', icon:'💻', title:'USB Audio & DAW', sub:'USB Audio Interface' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ไทย, ป๊อป, ลูกทุ่ง, สากล' },
          { num:'13', icon:'🎵', title:'Voice & Style แนะนำ', sub:'เสียงและ Style ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Genos2' },
      ]},
      'genos': { name: 'Genos', folder: 'yamaha-genos', badge: 'badge-yamaha', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Yamaha Genos', sub:'Flagship Arranger รุ่นแรก 76 Keys' },
          { num:'02', icon:'🔢', title:'Spec', sub:'Sound, Style, Effects' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'ต่อสาย, Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'CFX Piano, Brass Section, Full' },
          { num:'05', icon:'🎹', title:'Style / Arranger', sub:'Style, Section, Fill' },
          { num:'06', icon:'🎤', title:'Registration', sub:'Registration Memory, Music Finder' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan, EQ' },
          { num:'08', icon:'✨', title:'Effects', sub:'Insertion, Reverb, VCM' },
          { num:'09', icon:'🔄', title:'Style Creator', sub:'Custom Style' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI Channel, Clock' },
          { num:'11', icon:'💻', title:'USB Audio', sub:'USB Audio Interface' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ป๊อป, ลูกทุ่ง, สากล' },
          { num:'13', icon:'🎵', title:'Voice & Style แนะนำ', sub:'Genos Voice/Style ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Genos' },
      ]},
      'psr-sx900': { name: 'PSR-SX920 / SX900', folder: 'yamaha-psr-sx900', badge: 'badge-yamaha', pages: [
          { num:'01', icon:'📖', title:'แนะนำ PSR-SX920 / SX900', sub:'Pro Arranger 61 Keys' },
          { num:'02', icon:'🔢', title:'SX920 vs SX900', sub:'ตารางเปรียบเทียบความต่าง' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'ต่อสาย, Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'CFX, Brass, Full Sound' },
          { num:'05', icon:'🎹', title:'Style / Arranger', sub:'Style, Section, Fill' },
          { num:'06', icon:'🎤', title:'Registration', sub:'Registration Memory' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan, EQ' },
          { num:'08', icon:'✨', title:'Effects', sub:'Insertion, Reverb' },
          { num:'09', icon:'🔄', title:'Style Creator', sub:'Custom Style' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI Channel, USB' },
          { num:'11', icon:'💻', title:'Recording', sub:'MP3, MIDI, USB Audio' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ป๊อป, ลูกทุ่ง, สากล' },
          { num:'13', icon:'🎵', title:'Voice & Style แนะนำ', sub:'SX900 Voice/Style ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน PSR-SX900' },
      ]},
      'psr-sx700': { name: 'PSR-SX720 / SX700', folder: 'yamaha-psr-sx700', badge: 'badge-yamaha', pages: [
          { num:'01', icon:'📖', title:'แนะนำ PSR-SX720 / SX700', sub:'Mid Arranger 61 Keys' },
          { num:'02', icon:'🔢', title:'SX720 vs SX700', sub:'ตารางเปรียบเทียบ' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'ต่อสาย, Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'Premium Sound, Full' },
          { num:'05', icon:'🎹', title:'Style / Arranger', sub:'Style, Fill, Variation' },
          { num:'06', icon:'🎤', title:'Registration', sub:'Registration Memory' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb, Chorus' },
          { num:'09', icon:'🔄', title:'Style Creator', sub:'Custom Style (SX700)' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI Channel' },
          { num:'11', icon:'💻', title:'Recording', sub:'MP3, MIDI' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ป๊อป, ลูกทุ่ง' },
          { num:'13', icon:'🎵', title:'Voice & Style แนะนำ', sub:'SX700 Voice/Style ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน PSR-SX700' },
      ]},
      'psr-sx600': { name: 'PSR-SX600', folder: 'yamaha-psr-sx600', badge: 'badge-yamaha', pages: [
          { num:'01', icon:'📖', title:'แนะนำ PSR-SX600', sub:'Entry Pro Arranger 61 Keys' },
          { num:'02', icon:'🔢', title:'Spec', sub:'Sound, Style, Features' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'Premium Sound' },
          { num:'05', icon:'🎹', title:'Style / Arranger', sub:'Style, Fill' },
          { num:'06', icon:'🎤', title:'Registration', sub:'Registration Memory' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb, Chorus' },
          { num:'09', icon:'🔄', title:'Style Creator', sub:'Custom Style' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI' },
          { num:'11', icon:'💻', title:'Recording', sub:'MP3' },
          { num:'12', icon:'🎸', title:'เซ็ทสำหรับวงดนตรี', sub:'ป๊อป, ลูกทุ่ง' },
          { num:'13', icon:'🎵', title:'Style แนะนำ', sub:'SX600 Style ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน PSR-SX600' },
      ]},
    }
  },

  // ── BOSS DRUM MACHINES ─────────────────────────────────
  'boss': {
    name: 'Boss',
    color: '#ef4444',
    logo: '🥁',
    models: {
      'dr3': { name: 'DR-3', folder: 'boss-dr3', badge: 'badge-roland', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Boss DR-3', sub:'Dr. Rhythm Entry Drum Machine' },
          { num:'02', icon:'🔢', title:'Spec', sub:'Patterns, Sounds, Connectivity' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'Setup, Power' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'PCM Drum Sounds' },
          { num:'05', icon:'🎹', title:'Pattern Mode', sub:'Program Pattern, Variation' },
          { num:'06', icon:'🎤', title:'Song Mode', sub:'Chain Patterns เป็น Song' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Drum Volume, Pan' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb, Compression' },
          { num:'09', icon:'🔄', title:'Pattern Creator', sub:'สร้าง Rhythm Pattern เอง' },
          { num:'10', icon:'🔌', title:'MIDI & Sync', sub:'MIDI Clock, Sync' },
          { num:'11', icon:'💻', title:'Studio Use', sub:'Recording, Output Routing' },
          { num:'12', icon:'🎸', title:'ใช้กับวงดนตรี', sub:'ป๊อป, ลูกทุ่ง, สากล' },
          { num:'13', icon:'🎵', title:'Pattern แนะนำ', sub:'Rhythm Pattern สำเร็จที่ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน DR-3' },
      ]},
      'dr5': { name: 'DR-5 (R-5)', folder: 'boss-dr5', badge: 'badge-roland', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Boss DR-5', sub:'Dr. Rhythm + Bass Pattern' },
          { num:'02', icon:'🔢', title:'Spec', sub:'Patterns, Bass, Sounds' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'PCM Drum + Bass' },
          { num:'05', icon:'🎹', title:'Pattern Mode', sub:'Drum + Bass Pattern' },
          { num:'06', icon:'🎤', title:'Song Mode', sub:'Chain Pattern' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume per Pad' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb' },
          { num:'09', icon:'🔄', title:'Pattern Creator', sub:'สร้าง Pattern' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI Clock' },
          { num:'11', icon:'💻', title:'Studio', sub:'Recording Use' },
          { num:'12', icon:'🎸', title:'ใช้กับวงดนตรี', sub:'Rhythm Section' },
          { num:'13', icon:'🎵', title:'Pattern แนะนำ', sub:'Built-in Pattern ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน DR-5' },
      ]},
      'dr8': { name: 'DR-8 (R-8)', folder: 'boss-dr8', badge: 'badge-roland', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Boss DR-8', sub:'Professional Drum Machine' },
          { num:'02', icon:'🔢', title:'Spec', sub:'Patterns, Sounds, MIDI' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'PCM, Dynamic Sounds' },
          { num:'05', icon:'🎹', title:'Pattern Mode', sub:'Pattern Programming' },
          { num:'06', icon:'🎤', title:'Song Mode', sub:'Song Chain' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan ต่อ Part' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb, EQ' },
          { num:'09', icon:'🔄', title:'Pattern Creator', sub:'สร้าง Custom Pattern' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI Clock, Channel' },
          { num:'11', icon:'💻', title:'Studio', sub:'Output Routing, Recording' },
          { num:'12', icon:'🎸', title:'ใช้กับวงดนตรี', sub:'Rhythm สำหรับวง' },
          { num:'13', icon:'🎵', title:'Pattern แนะนำ', sub:'DR-8 Pattern ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน DR-8' },
      ]},
      'dr660': { name: 'DR-660', folder: 'boss-dr660', badge: 'badge-roland', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Boss DR-660', sub:'Dr. Rhythm Classic, 233 Sounds' },
          { num:'02', icon:'🔢', title:'Spec', sub:'233 Sounds, 100 Patterns' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'Setup, MIDI' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'PCM, Dynamic Accent' },
          { num:'05', icon:'🎹', title:'Pattern Mode', sub:'Pattern, Step Programming' },
          { num:'06', icon:'🎤', title:'Song Mode', sub:'Song Chain' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb, EQ' },
          { num:'09', icon:'🔄', title:'Pattern Creator', sub:'Step Edit, Tap Tempo' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'Full MIDI Implementation' },
          { num:'11', icon:'💻', title:'Studio', sub:'Recording' },
          { num:'12', icon:'🎸', title:'ใช้กับวงดนตรี', sub:'Rhythm Section สำหรับวง' },
          { num:'13', icon:'🎵', title:'Pattern แนะนำ', sub:'DR-660 Built-in ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน DR-660' },
      ]},
      'dr880': { name: 'DR-880', folder: 'boss-dr880', badge: 'badge-roland', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Boss DR-880', sub:'Dr. Rhythm Pro, V-Drums Sounds' },
          { num:'02', icon:'🔢', title:'Spec', sub:'440+ Sounds, V-Drums, Bass' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'Setup' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'V-Drums, Acoustic Modeling' },
          { num:'05', icon:'🎹', title:'Pattern Mode', sub:'Real-time, Step Record' },
          { num:'06', icon:'🎤', title:'Song Mode', sub:'Song Chain, Mute' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan, EQ per Kit' },
          { num:'08', icon:'✨', title:'Effects', sub:'Multi-Effects, Reverb, Comp' },
          { num:'09', icon:'🔄', title:'Pattern Creator', sub:'สร้าง Pattern, Human Feel' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'Full MIDI' },
          { num:'11', icon:'💻', title:'Studio', sub:'Individual Outputs, Recording' },
          { num:'12', icon:'🎸', title:'ใช้กับวงดนตรี', sub:'Rhythm สำหรับทุกแนว' },
          { num:'13', icon:'🎵', title:'Kit แนะนำ', sub:'DR-880 Drum Kit ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน DR-880' },
      ]},
    }
  },

  // ── ALESIS DRUM MACHINES / MODULES ─────────────────────
  'alesis': {
    name: 'Alesis',
    color: '#8b5cf6',
    logo: '🥁',
    models: {
      'sr16': { name: 'SR-16 / SR-18', folder: 'alesis-sr', badge: 'badge-alesis', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Alesis SR-16 / SR-18', sub:'Classic Drum Machine สุดทน' },
          { num:'02', icon:'🔢', title:'SR-16 vs SR-18', sub:'ตารางเปรียบเทียบ' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'Setup, Power' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'PCM Acoustic/Electronic Kits' },
          { num:'05', icon:'🎹', title:'Pattern Mode', sub:'Pattern A/B, Fill' },
          { num:'06', icon:'🎤', title:'Song Mode', sub:'Chain Patterns' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan per Pad' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb Internal' },
          { num:'09', icon:'🔄', title:'Pattern Creator', sub:'Real-time, Step Record' },
          { num:'10', icon:'🔌', title:'MIDI & Sync', sub:'MIDI Clock, Tap Tempo' },
          { num:'11', icon:'💻', title:'Studio Use', sub:'Output L/R, Individual (SR-18)' },
          { num:'12', icon:'🎸', title:'ใช้กับวงดนตรี', sub:'Pop, Country, Thai, ลูกทุ่ง' },
          { num:'13', icon:'🎵', title:'Pattern แนะนำ', sub:'Built-in Pattern ที่ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน SR-16/18' },
      ]},
      'dm5': { name: 'DM5 / D4 / D5', folder: 'alesis-dm5', badge: 'badge-alesis', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Alesis D4 / D5 / DM5', sub:'Drum Sound Module ระดับ Pro' },
          { num:'02', icon:'🔢', title:'D4 vs D5 vs DM5', sub:'ตารางเปรียบเทียบ' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'ต่อสาย Pad, Trigger' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'PCM, 18-bit Samples' },
          { num:'05', icon:'🎹', title:'Kit Select', sub:'เลือก Kit, Customize' },
          { num:'06', icon:'🎤', title:'Trigger Setup', sub:'ตั้งค่า Trigger Input' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume per Pad' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb' },
          { num:'09', icon:'🔄', title:'Kit Creator', sub:'สร้าง Custom Kit' },
          { num:'10', icon:'🔌', title:'MIDI', sub:'MIDI Note Map, Channel' },
          { num:'11', icon:'💻', title:'Studio Use', sub:'Output Routing, Recording' },
          { num:'12', icon:'🎸', title:'ใช้กับ E-Drum', sub:'ต่อกับ Mesh Pad ต่างๆ' },
          { num:'13', icon:'🎵', title:'Kit แนะนำ', sub:'Kit เสียงดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน Alesis Module' },
      ]},
    }
  },

  // ── ROLAND E-DRUM MODULES ──────────────────────────────
  'roland-edrum': {
    name: 'Roland E-Drum',
    color: '#ff4444',
    logo: '🥁',
    models: {
      'td17': { name: 'TD-17', folder: 'roland-td17', badge: 'badge-roland', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Roland TD-17', sub:'V-Drums Module, Bluetooth, Coaching' },
          { num:'02', icon:'🔢', title:'Spec & Kits', sub:'310 Sounds, 50 Kits, Bluetooth' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'ต่อ Pad, Setup, Mesh Head' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'SuperNATURAL Acoustic Drum' },
          { num:'05', icon:'🎹', title:'Kit Mode', sub:'เลือก Kit, Customize Sound' },
          { num:'06', icon:'🎤', title:'Coach Mode', sub:'Coaching, Rhythm Training' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume per Pad, EQ' },
          { num:'08', icon:'✨', title:'Effects', sub:'Ambience, Compression, EQ' },
          { num:'09', icon:'🔄', title:'Kit Creator', sub:'สร้าง Custom Kit' },
          { num:'10', icon:'🔌', title:'MIDI & Bluetooth', sub:'MIDI, Bluetooth Audio' },
          { num:'11', icon:'💻', title:'DAW Integration', sub:'USB Audio, Recording' },
          { num:'12', icon:'🎸', title:'เล่นกับวงดนตรี', sub:'Setup สำหรับเล่นสด' },
          { num:'13', icon:'🎵', title:'Kit แนะนำ', sub:'TD-17 Preset Kit ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน TD-17' },
      ]},
      'td27': { name: 'TD-27', folder: 'roland-td27', badge: 'badge-roland', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Roland TD-27', sub:'V-Drums Pro, Multi-Sensor' },
          { num:'02', icon:'🔢', title:'Spec', sub:'Sound, Kit, Multi-Sensor Pad' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'ต่อ Pad, Sensor Setup' },
          { num:'04', icon:'🎛️', title:'SuperNATURAL Engine', sub:'Multi-Sensor Acoustic Modeling' },
          { num:'05', icon:'🎹', title:'Kit Mode', sub:'เลือก Kit, Multi-zone Cymbal' },
          { num:'06', icon:'🎤', title:'Coach & Performance', sub:'Coaching, Live Performance' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, EQ ต่อ Pad' },
          { num:'08', icon:'✨', title:'Effects', sub:'Ambience, Multi-effects' },
          { num:'09', icon:'🔄', title:'Kit Creator', sub:'Custom Kit, Save' },
          { num:'10', icon:'🔌', title:'MIDI & USB', sub:'MIDI, USB Audio' },
          { num:'11', icon:'💻', title:'DAW Integration', sub:'USB Audio 2-channel' },
          { num:'12', icon:'🎸', title:'เล่นกับวงดนตรี', sub:'Pro Setup สำหรับ Live' },
          { num:'13', icon:'🎵', title:'Kit แนะนำ', sub:'TD-27 Kit ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน TD-27' },
      ]},
      'tm6pro': { name: 'TM-6 Pro', folder: 'roland-tm6pro', badge: 'badge-roland', pages: [
          { num:'01', icon:'📖', title:'แนะนำ Roland TM-6 Pro', sub:'Trigger Module สำหรับ Acoustic Drum' },
          { num:'02', icon:'🔢', title:'Spec', sub:'6 Trigger In, USB Audio, MIDI' },
          { num:'03', icon:'⚡', title:'เริ่มต้น', sub:'ต่อ Trigger กับ Acoustic Drum' },
          { num:'04', icon:'🎛️', title:'Sound Engine', sub:'SuperNATURAL Drum Sounds' },
          { num:'05', icon:'🎹', title:'Kit Mode', sub:'เลือก Kit, Layer Sound' },
          { num:'06', icon:'🎤', title:'Trigger Setup', sub:'Sensitivity, Threshold, Crosstalk' },
          { num:'07', icon:'🎚️', title:'Mixer', sub:'Volume, Pan per Trigger' },
          { num:'08', icon:'✨', title:'Effects', sub:'Reverb, Ambience' },
          { num:'09', icon:'🔄', title:'Kit Creator', sub:'Custom Layer Kit' },
          { num:'10', icon:'🔌', title:'MIDI & USB', sub:'MIDI, USB Audio Output' },
          { num:'11', icon:'💻', title:'DAW Integration', sub:'USB Audio สำหรับ Record' },
          { num:'12', icon:'🎸', title:'ใช้กับ Acoustic Drum', sub:'Setup สำหรับวง Live' },
          { num:'13', icon:'🎵', title:'Kit แนะนำ', sub:'TM-6 Pro Kit ดีที่สุด' },
          { num:'14', icon:'▶️', title:'Tutorial Videos', sub:'วิดีโอสอน TM-6 Pro' },
      ]},
    }
  },
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
