/* ============================================================
   search.js — Full-text search for MODX Thai Manual
   ============================================================ */

let searchIndex = null;

async function loadSearchIndex() {
  if (searchIndex) return searchIndex;
  const base = window.location.pathname.includes('/pages/') ? '../' : './';
  try {
    const res = await fetch(`${base}data/search-index.json`);
    searchIndex = await res.json();
  } catch(e) {
    searchIndex = [];
  }
  return searchIndex;
}

function highlight(text, query) {
  if (!query) return text;
  const words = query.trim().split(/\s+/).filter(Boolean);
  let result = text;
  words.forEach(word => {
    const re = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(re, '<mark>$1</mark>');
  });
  return result;
}

function getSnippet(content, query, len = 160) {
  const words = query.trim().split(/\s+/).filter(Boolean);
  const lower = content.toLowerCase();
  let start = 0;
  for (const w of words) {
    const idx = lower.indexOf(w.toLowerCase());
    if (idx !== -1) { start = Math.max(0, idx - 40); break; }
  }
  let snippet = content.slice(start, start + len);
  if (start > 0) snippet = '...' + snippet;
  if (start + len < content.length) snippet += '...';
  return snippet;
}

window.runSearch = async function(query) {
  if (!query || query.length < 2) return;
  const index = await loadSearchIndex();
  const overlay = document.getElementById('search-results-overlay');
  const list    = document.getElementById('search-results-list');
  if (!overlay || !list) return;

  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  const results = index
    .map(item => {
      const score = words.reduce((acc, w) => {
        const inTitle   = (item.title.toLowerCase().split(w).length   - 1) * 10;
        const inContent = (item.content.toLowerCase().split(w).length - 1);
        const inTags    = item.tags ? (item.tags.toLowerCase().split(w).length - 1) * 5 : 0;
        return acc + inTitle + inContent + inTags;
      }, 0);
      return { ...item, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  if (results.length === 0) {
    list.innerHTML = `<div style="color:var(--text-secondary);padding:20px 0;">ไม่พบผลลัพธ์สำหรับ "<strong style="color:#fff">${query}</strong>"</div>`;
  } else {
    list.innerHTML = results.map(r => {
      const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
      const snippet = highlight(getSnippet(r.content, query), query);
      const titleH  = highlight(r.title, query);
      return `<div class="search-result-item" onclick="location.href='${base}${r.file}'">
        <div class="search-result-title">${titleH}</div>
        <div class="search-result-section">${r.section}</div>
        <div class="search-result-snippet">${snippet}</div>
      </div>`;
    }).join('');
  }

  overlay.classList.add('active');
};
