(() => {
  'use strict';

  const data = window.BTC_ATLAS_DATA;
  if (!data) {
    document.body.textContent = '知識庫資料讀取失敗，請確認 data/articles.js 已正確上傳。';
    return;
  }

  const byId = id => document.getElementById(id);
  const articles = data.articles;
  const categories = data.categories;
  const articleById = new Map(articles.map(article => [article.id, article]));
  const categoryById = new Map(categories.map(category => [category.id, category]));
  const STORAGE_KEY = 'btc-atlas-learning-v1';
  const stored = readStoredState();
  const state = {
    screen: 'library', category: 'all', filter: 'all', query: '',
    read: new Set(stored.read), favorites: new Set(stored.favorites),
    modalArticle: null
  };
  let toastTimer;

  function readStoredState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        read: Array.isArray(parsed.read) ? parsed.read.filter(id => articleById.has(id)) : [],
        favorites: Array.isArray(parsed.favorites) ? parsed.favorites.filter(id => articleById.has(id)) : []
      };
    } catch {
      return { read: [], favorites: [] };
    }
  }

  function saveStoredState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        read: [...state.read], favorites: [...state.favorites]
      }));
    } catch {
      notify('目前瀏覽器無法儲存進度，重新整理後可能遺失。');
    }
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function notify(message) {
    const toast = byId('toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  function renderCategories() {
    const items = [{ id: 'all', label: '所有知識', icon: '▦' }, ...categories];
    byId('category-nav').innerHTML = items.map(item => {
      const count = item.id === 'all' ? articles.length : articles.filter(article => article.category === item.id).length;
      return `<button type="button" class="category-link ${state.category === item.id ? 'is-active' : ''}" data-category="${item.id}" aria-pressed="${state.category === item.id}"><span class="category-icon">${item.icon}</span><span>${escapeHTML(item.label)}</span><span class="category-count">${String(count).padStart(2, '0')}</span></button>`;
    }).join('');
  }

  function renderCards() {
    const query = state.query.trim().toLocaleLowerCase();
    const filtered = articles.filter(article => {
      const category = categoryById.get(article.category);
      const text = `${article.title} ${article.summary} ${article.concept} ${category.label} ${article.id}`.toLocaleLowerCase();
      return (state.category === 'all' || article.category === state.category)
        && (state.filter !== 'favorites' || state.favorites.has(article.id))
        && (state.filter !== 'unread' || !state.read.has(article.id))
        && (!query || text.includes(query));
    });

    byId('article-grid').innerHTML = filtered.map(article => {
      const category = categoryById.get(article.category);
      const isFavorite = state.favorites.has(article.id);
      const isRead = state.read.has(article.id);
      return `<article class="article-card">
        <div class="article-card-header"><span class="article-badge" data-tone="${category.tone}">${escapeHTML(category.label)}</span><button type="button" class="favorite-button ${isFavorite ? 'is-favorite' : ''}" data-action="favorite" data-id="${article.id}" aria-label="${isFavorite ? '取消收藏' : '收藏'}${escapeHTML(article.title)}" aria-pressed="${isFavorite}">${isFavorite ? '♥' : '♡'}</button></div>
        <h3>${escapeHTML(article.title)}</h3><p>${escapeHTML(article.summary)}</p>
        <div class="article-card-footer"><span>${escapeHTML(article.level)} · ${article.minutes} 分鐘 ${isRead ? '<span class="read-label">· ✓ 已閱讀</span>' : ''}</span><button type="button" data-action="open" data-id="${article.id}">閱讀文章 ↗</button></div>
      </article>`;
    }).join('');
    byId('library-empty').hidden = filtered.length !== 0;
    const selected = categoryById.get(state.category);
    byId('active-filter').innerHTML = selected ? `目前主題：<strong>${escapeHTML(selected.label)}</strong> · ${filtered.length} 篇文章` : query ? `找到 <strong>${filtered.length}</strong> 篇相關文章` : '';
    document.querySelectorAll('.mini-filter').forEach(button => button.classList.toggle('is-active', button.dataset.filter === state.filter));
  }

  function renderProgress() {
    const percent = Math.round(state.read.size / articles.length * 100);
    byId('stat-articles').textContent = articles.length;
    byId('stat-categories').textContent = categories.length;
    byId('stat-completed').textContent = state.read.size;
    byId('stat-favorites').textContent = state.favorites.size;
    byId('sidebar-progress-number').textContent = `${percent}%`;
    byId('sidebar-progress-bar').style.width = `${percent}%`;
    byId('sidebar-progress-caption').textContent = `${state.read.size} / ${articles.length} 篇已閱讀 · 進度自動儲存`;
  }

  function renderRoadmap() {
    let completed = 0;
    byId('roadmap-list').innerHTML = data.roadmap.map((stage, index) => {
      const count = stage.articleIds.filter(id => state.read.has(id)).length;
      const done = count === stage.articleIds.length;
      if (done) completed++;
      const next = stage.articleIds.find(id => !state.read.has(id)) || stage.articleIds[0];
      return `<article class="roadmap-item ${done ? 'is-complete' : ''}">
        <div class="roadmap-step">${done ? '✓' : String(index + 1).padStart(2, '0')}</div>
        <div><h3>${escapeHTML(stage.title)}</h3><p>${escapeHTML(stage.description)}</p><div class="roadmap-meta">${count} / ${stage.articleIds.length} 篇已閱讀 ${done ? ' · 階段完成' : ''}</div></div>
        <button type="button" class="button button-secondary" data-action="open" data-id="${next}">${done ? '再次複習' : '繼續學習'} ↗</button>
      </article>`;
    }).join('');
    byId('roadmap-progress').innerHTML = `${completed} / ${data.roadmap.length} <small>階段已完成</small>`;
    byId('roadmap-progress-bar').style.width = `${Math.round(completed / data.roadmap.length * 100)}%`;
  }

  function renderGlossary() {
    const query = state.query.trim().toLocaleLowerCase();
    const items = data.glossary.filter(item => `${item.term} ${item.name} ${item.meaning}`.toLocaleLowerCase().includes(query));
    byId('glossary-count').textContent = items.length;
    byId('glossary-grid').innerHTML = items.map(item => `<article class="glossary-card">
      <div class="glossary-card-header"><h3>${escapeHTML(item.term)}</h3><span class="cn-name">${escapeHTML(item.name)}</span></div>
      <p>${escapeHTML(item.meaning)}</p><button type="button" data-action="open" data-id="${item.article}">延伸閱讀 ↗</button>
    </article>`).join('');
    byId('glossary-empty').hidden = items.length !== 0;
  }

  function renderArticleDetail(article) {
    const category = categoryById.get(article.category);
    const isRead = state.read.has(article.id);
    const isFavorite = state.favorites.has(article.id);
    const sources = article.sources.length ? `<section class="detail-block"><h3>延伸閱讀／資料來源</h3><ul class="detail-sources">${article.sources.map(source => `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.label)} ↗</a></li>`).join('')}</ul></section>` : '';
    byId('article-detail').innerHTML = `<div class="detail-head">
      <button type="button" class="dialog-close" data-action="close" aria-label="關閉文章">×</button>
      <span class="article-badge" data-tone="${category.tone}">${escapeHTML(category.label)}</span>
      <h2 id="dialog-title">${escapeHTML(article.title)}</h2><p>${escapeHTML(article.summary)}</p>
      <div class="detail-meta"><span>◷ 約 ${article.minutes} 分鐘</span><span>◈ ${escapeHTML(article.level)}</span><span>${isRead ? '✓ 已閱讀' : '○ 尚未完成'}</span></div>
    </div><div class="detail-content">
      <section class="detail-block"><h3>核心觀念</h3><p>${escapeHTML(article.concept)}</p></section>
      <section class="detail-block"><h3>如何觀察／練習</h3><p>${escapeHTML(article.practice)}</p></section>
      <section class="detail-block"><h3>新手最容易誤解</h3><div class="detail-note">⚠ ${escapeHTML(article.pitfall)}</div></section>
      <section class="detail-block"><h3>閱讀後自我檢查</h3><ul class="detail-checklist">${article.checklist.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul></section>
      ${sources}
    </div><div class="detail-actions"><small>學習用途 · 不是交易訊號或投資建議</small><div class="detail-action-buttons"><button type="button" class="button button-secondary" data-action="favorite" data-id="${article.id}">${isFavorite ? '♥ 已收藏' : '♡ 收藏文章'}</button><button type="button" class="button button-primary" data-action="read" data-id="${article.id}">${isRead ? '↺ 標記未讀' : '✓ 完成閱讀'}</button></div></div>`;
  }

  function openArticle(id, updateHash = true) {
    const article = articleById.get(id);
    if (!article) {
      notify('找不到這篇文章');
      return;
    }
    state.modalArticle = id;
    renderArticleDetail(article);
    const dialog = byId('article-dialog');
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    if (updateHash && location.hash !== `#article/${id}`) location.hash = `article/${id}`;
  }

  function closeArticle(updateHash = true) {
    const dialog = byId('article-dialog');
    if (dialog.open) dialog.close();
    state.modalArticle = null;
    if (updateHash && location.hash.startsWith('#article/')) location.hash = state.screen;
  }

  function setScreen(screen, updateHash = true) {
    if (!['library', 'roadmap', 'glossary'].includes(screen)) screen = 'library';
    state.screen = screen;
    document.querySelectorAll('.screen').forEach(element => element.hidden = element.id !== `screen-${screen}`);
    document.querySelectorAll('[data-screen].nav-link').forEach(button => button.classList.toggle('is-active', button.dataset.screen === screen));
    const names = { library: '知識總覽', roadmap: '學習路線', glossary: '術語字典' };
    byId('breadcrumb-current').textContent = names[screen];
    closeSidebar();
    if (updateHash && location.hash !== `#${screen}`) location.hash = screen;
    if (screen === 'roadmap') renderRoadmap();
    if (screen === 'glossary') renderGlossary();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function toggleState(kind, id) {
    if (!articleById.has(id)) return;
    const collection = kind === 'read' ? state.read : state.favorites;
    const wasPresent = collection.has(id);
    if (wasPresent) collection.delete(id);
    else collection.add(id);
    saveStoredState();
    renderProgress();
    renderCards();
    renderRoadmap();
    if (state.modalArticle === id) renderArticleDetail(articleById.get(id));
    notify(kind === 'read' ? (wasPresent ? '已標記為未閱讀' : '閱讀進度已更新') : (wasPresent ? '已取消收藏' : '文章已收藏'));
  }

  function clearFilters() {
    state.category = 'all';
    state.filter = 'all';
    state.query = '';
    byId('global-search').value = '';
    renderCategories();
    renderCards();
    renderGlossary();
  }

  function closeSidebar() {
    byId('sidebar').classList.remove('is-open');
    byId('mobile-overlay').hidden = true;
    byId('menu-toggle').setAttribute('aria-expanded', 'false');
  }

  function syncRoute() {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash.startsWith('article/')) {
      const id = hash.slice('article/'.length);
      if (articleById.has(id)) openArticle(id, false);
      else { closeArticle(false); setScreen('library', false); }
    } else {
      closeArticle(false);
      setScreen(hash, false);
    }
  }

  function renderChart() {
    const svg = byId('hero-chart');
    const closes = [44,45,43,46,48,47,49,51,50,48,46,47,49,52,55,53,56,58,57,55,59,60,58,61,63,64,62,65,67,65,68];
    const opens = closes.map((close, i) => i === 0 ? close - 2 : closes[i - 1] + (i % 4 === 0 ? 1 : -0.5));
    const yOf = value => 199 - (value - 39) * 5.6;
    const xOf = i => 20 + i * 15;
    let parts = `<defs><linearGradient id="areaFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaa854" stop-opacity=".18"/><stop offset="1" stop-color="#eaa854" stop-opacity="0"/></linearGradient></defs>`;
    for (let y = 36; y <= 212; y += 44) parts += `<line x1="14" y1="${y}" x2="497" y2="${y}" stroke="#394453" opacity=".35" stroke-dasharray="3 4"/>`;
    for (let x = 22; x <= 490; x += 83) parts += `<line x1="${x}" y1="20" x2="${x}" y2="218" stroke="#394453" opacity=".24"/>`;
    parts += `<rect x="305" y="63" width="119" height="43" rx="4" fill="#4dd2ba" opacity=".065" stroke="#4dd2ba" stroke-opacity=".3" stroke-dasharray="4 4"/>`;
    parts += `<text x="313" y="74" fill="#4bc8b4" opacity=".8" font-size="8">STRUCTURE ZONE</text>`;
    const ema = closes.map((value, i) => yOf(value - 2.4 + Math.sin(i / 4) * 1.8));
    parts += `<polyline fill="none" stroke="#e9a455" stroke-width="1.8" opacity=".82" points="${ema.map((y, i) => `${xOf(i)},${y}`).join(' ')}"/>`;
    closes.forEach((close, i) => {
      const open = opens[i];
      const high = Math.max(open, close) + 1.1 + (i % 3) * .25;
      const low = Math.min(open, close) - 1.2 - (i % 5) * .18;
      const rising = close >= open;
      const color = rising ? '#56cbb3' : '#ee7b84';
      const x = xOf(i);
      parts += `<line x1="${x}" y1="${yOf(high).toFixed(1)}" x2="${x}" y2="${yOf(low).toFixed(1)}" stroke="${color}" stroke-width="1.4"/>`;
      parts += `<rect x="${x - 3.6}" y="${Math.min(yOf(open), yOf(close)).toFixed(1)}" width="7.2" height="${Math.max(1.8,Math.abs(yOf(open)-yOf(close))).toFixed(1)}" rx=".8" fill="${color}"/>`;
      parts += `<rect x="${x - 3.5}" y="${224 - (i * 7 % 19)}" width="7" height="${7 + (i * 7 % 19)}" rx="1" fill="${color}" opacity=".18"/>`;
    });
    parts += `<text x="18" y="254" fill="#657487" font-size="9">08:00</text><text x="212" y="254" fill="#657487" font-size="9">16:00</text><text x="427" y="254" fill="#657487" font-size="9">00:00</text>`;
    parts += `<rect x="458" y="${yOf(closes.at(-1))-9}" width="49" height="19" rx="3" fill="#368f7f"/><text x="482" y="${yOf(closes.at(-1))+4}" font-size="10" fill="white" text-anchor="middle">BTC</text>`;
    svg.innerHTML = parts;
  }

  document.addEventListener('click', event => {
    const screenButton = event.target.closest('[data-screen]');
    if (screenButton) { setScreen(screenButton.dataset.screen); return; }
    const categoryButton = event.target.closest('[data-category]');
    if (categoryButton) {
      state.category = categoryButton.dataset.category;
      state.filter = 'all';
      setScreen('library'); renderCategories(); renderCards();
      byId('articles-anchor').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const filterButton = event.target.closest('[data-filter]');
    if (filterButton) { state.filter = filterButton.dataset.filter; renderCards(); return; }
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;
    const { action, id } = actionButton.dataset;
    if (action === 'open') openArticle(id);
    else if (action === 'favorite') toggleState('favorites', id);
    else if (action === 'read') toggleState('read', id);
    else if (action === 'close') closeArticle();
  });

  byId('global-search').addEventListener('input', event => {
    state.query = event.target.value;
    if (state.screen === 'roadmap') setScreen('library');
    renderCards(); renderGlossary();
  });
  document.addEventListener('keydown', event => {
    const typing = /^(INPUT|TEXTAREA)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !byId('article-dialog').open) {
      event.preventDefault(); byId('global-search').focus();
    }
  });
  byId('article-dialog').addEventListener('click', event => { if (event.target === byId('article-dialog')) closeArticle(); });
  byId('article-dialog').addEventListener('close', () => {
    if (state.modalArticle !== null) {
      state.modalArticle = null;
      if (location.hash.startsWith('#article/')) location.hash = state.screen;
    }
  });
  byId('menu-toggle').addEventListener('click', () => {
    const opened = byId('sidebar').classList.toggle('is-open');
    byId('mobile-overlay').hidden = !opened;
    byId('menu-toggle').setAttribute('aria-expanded', String(opened));
  });
  byId('mobile-overlay').addEventListener('click', closeSidebar);
  byId('explore-button').addEventListener('click', () => byId('articles-anchor').scrollIntoView({ behavior:'smooth' }));
  byId('clear-filters').addEventListener('click', clearFilters);
  window.addEventListener('hashchange', syncRoute);

  renderChart();
  renderCategories();
  renderCards();
  renderProgress();
  renderRoadmap();
  renderGlossary();
  syncRoute();
})();
