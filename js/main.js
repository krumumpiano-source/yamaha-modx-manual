/* ============================================================
   main.js — Yamaha MODX Thai Manual
   Handles: Sidebar injection, navigation, mobile menu, AdSense
   ============================================================ */

// ── AdSense Configuration ──
// 🔧 แก้ค่านี้เป็น Publisher ID จริงของคุณ
const ADSENSE_PUB_ID = 'ca-pub-6824376916256036';

// ── Navigation items ──
const NAV_ITEMS = [
  { section: 'เริ่มต้น' },
  { href: '../index.html',             icon: '🏠', label: 'หน้าหลัก',                 root: true  },
  { href: 'pages/01-intro.html',       icon: '📖', label: 'แนะนำ Yamaha MODX',        page: '01'  },
  { href: 'pages/02-models.html',      icon: '🔢', label: 'เปรียบเทียบทุกรุ่น',       page: '02'  },
  { href: 'pages/03-getting-started.html', icon: '⚡', label: 'เริ่มต้นใช้งาน',     page: '03'  },
  { section: 'Sound Engine' },
  { href: 'pages/04-sound-engine.html',icon: '🎛️', label: 'AWM2 + FM-X Engine',      page: '04'  },
  { section: 'Performance' },
  { href: 'pages/05-performance.html', icon: '🎹', label: 'Performance Mode',         page: '05'  },
  { href: 'pages/06-live-set.html',    icon: '🎤', label: 'Live Set & Gig',           page: '06'  },
  { href: 'pages/07-parts-mixing.html',icon: '🎚️', label: 'Parts & Mixing',          page: '07'  },
  { href: 'pages/08-effects.html',     icon: '✨', label: 'Effects & EQ',             page: '08'  },
  { section: 'Advanced' },
  { href: 'pages/09-arpeggio.html',    icon: '🔄', label: 'Arpeggio & Motion Seq.',   page: '09'  },
  { href: 'pages/10-midi.html',        icon: '🔌', label: 'MIDI Setup',               page: '10'  },
  { href: 'pages/11-daw.html',         icon: '💻', label: 'DAW Integration',          page: '11', badge: { text: 'MODX+', cls: 'badge-plus' } },
  { section: 'วงดนตรี' },
  { href: 'pages/12-band-setup.html',  icon: '🎸', label: 'เซ็ทสำหรับวงดนตรี',        page: '12'  },
  { href: 'pages/13-presets.html',     icon: '🎵', label: 'Preset Sounds List',       page: '13'  },
  { href: 'pages/14-videos.html',      icon: '▶️', label: 'Tutorial Videos',          page: '14'  },
];

// ── Determine base path (root vs /pages/) ──
function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) return '../';
  return './';
}
function isInPages() {
  return window.location.pathname.includes('/pages/');
}
function getCurrentPage() {
  const parts = window.location.pathname.split('/');
  const file = parts[parts.length - 1];
  if (!file || file === 'index.html' || file === '') return 'home';
  const m = file.match(/^(\d+)/);
  return m ? m[1] : file;
}

// ── Build sidebar HTML ──
function buildSidebar() {
  const base = getBasePath();
  const current = getCurrentPage();

  let html = `
    <div class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="sidebar-logo-title">🎹 Yamaha MODX<br>คู่มือภาษาไทย</div>
        <div class="sidebar-logo-sub">MODX · MODX+ · MODXM | 6 · 7 · 8 คีย์</div>
      </div>
      <div class="sidebar-search">
        <input type="text" id="sidebar-search-input" placeholder="🔍 ค้นหาเนื้อหา..." autocomplete="off">
      </div>
      <nav class="sidebar-nav">`;

  NAV_ITEMS.forEach(item => {
    if (item.section) {
      html += `<div class="nav-section-title">${item.section}</div>`;
      return;
    }
    // Resolve href relative to current location
    let href = item.href;
    if (isInPages()) {
      // we're in /pages/, links to pages/ should be relative
      if (href.startsWith('pages/')) href = href.replace('pages/', '');
      else if (href.startsWith('../')) href = href;
    } else {
      // root level
    }

    const isActive = (item.root && current === 'home') || (item.page && current === item.page);
    const badgeHtml = item.badge ? `<span class="nav-badge ${item.badge.cls}">${item.badge.text}</span>` : '';

    html += `<a class="nav-item${isActive ? ' active' : ''}" href="${href}">
      <span class="nav-icon">${item.icon}</span>
      <span>${item.label}</span>
      ${badgeHtml}
    </a>`;
  });

  html += `</nav>
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

  return html;
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
  let crumb = `<a href="${base}index.html">หน้าหลัก</a>`;
  if (section) crumb += `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg><span>${section}</span>`;
  if (title)   crumb += `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg><span>${title}</span>`;
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
      &copy; 2026 Yamaha MODX คู่มือภาษาไทย | 
      <a href="${getBasePath()}index.html">หน้าหลัก</a> | 
      ข้อมูลอ้างอิงจาก Yamaha Corporation Official Documentation
    </footer>`;
  body.appendChild(mainWrapper);

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
