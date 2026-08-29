/* ==========================================================================
   keepsanity — app
   ========================================================================== */
(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const TYPE_LABEL = { web: '웹 도구', ext: '확장', theme: '테마' };

  /* ---------------- 테마(라이트/다크) ---------------- */
  const root = document.documentElement;
  const themeBtn = $('#theme-toggle');
  const themeIcon = $('[data-theme-icon]');

  function applyTheme(mode) {
    root.setAttribute('data-theme', mode);
    if (themeIcon) themeIcon.textContent = mode === 'dark' ? '☀️' : '🌙';
    if (themeBtn) themeBtn.setAttribute('aria-label', mode === 'dark' ? '라이트 모드 전환' : '다크 모드 전환');
  }

  let saved = null;
  try { saved = localStorage.getItem('ks-theme'); } catch (e) { /* 프라이빗 모드 */ }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('ks-theme', next); } catch (e) { /* noop */ }
    });
  }

  /* ---------------- 모바일 메뉴 ---------------- */
  const navBtn = $('#nav-toggle');
  const mobileNav = $('#mobile-nav');
  if (navBtn && mobileNav) {
    navBtn.addEventListener('click', () => {
      const open = mobileNav.hidden;
      mobileNav.hidden = !open;
      navBtn.setAttribute('aria-expanded', String(open));
      navBtn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileNav.hidden = true;
        navBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- 토스트 ---------------- */
  const toast = $('#toast');
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
  }

  /* ---------------- 클립보드 ---------------- */
  function copyText(text) {
    const fallback = () => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showToast('복사했습니다 ✅'); }
      catch (e) { showToast('복사에 실패했어요. 직접 복사해주세요.'); }
      document.body.removeChild(ta);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        () => showToast('복사했습니다 ✅'),
        fallback
      );
    } else {
      fallback();
    }
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    e.preventDefault();
    copyText(btn.getAttribute('data-copy'));
  });

  /* ---------------- 프로젝트 카드 ---------------- */
  const grid = $('#grid');
  const emptyMsg = $('#empty');
  const countEl = $('#result-count');
  const searchInput = $('#search');

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function buildCard(p) {
    const card = el('article', 'card');
    card.id = p.id;
    card.dataset.type = p.type;
    card.dataset.search = [p.name, p.sub, p.desc, p.features.join(' '), TYPE_LABEL[p.type]]
      .join(' ')
      .toLowerCase();
    /* 카드 색은 타입(web/ext/theme)에 따라 CSS에서 자동으로 정해집니다 */

    /* 헤더 */
    const top = el('div', 'card-top');
    top.appendChild(el('span', 'card-emoji', p.emoji));

    const titles = el('div', 'card-titles');
    titles.appendChild(el('div', 'card-name', p.name));
    if (p.sub) titles.appendChild(el('div', 'card-sub', p.sub));
    top.appendChild(titles);
    top.appendChild(el('span', 'card-type', TYPE_LABEL[p.type]));
    card.appendChild(top);

    /* 본문 */
    const body = el('div', 'card-body');
    body.appendChild(el('p', 'card-desc', p.desc));

    if (p.features && p.features.length) {
      const tags = el('ul', 'tags');
      p.features.forEach((f) => tags.appendChild(el('li', null, f)));
      body.appendChild(tags);
    }

    if (p.related) {
      const rel = el('p', 'card-related');
      rel.appendChild(document.createTextNode('↔ '));
      const a = el('a', null, p.related.label);
      a.href = p.related.href;
      rel.appendChild(a);
      body.appendChild(rel);
    }

    /* 버튼 */
    const actions = el('div', 'card-actions');

    if (p.site) {
      const open = el('a', 'btn btn-primary', '사이트 열기 ↗');
      open.href = p.site;
      open.target = '_blank';
      open.rel = 'noopener';
      actions.appendChild(open);
    }

    /* 설명서는 같은 사이트 안의 페이지라 새 탭으로 열지 않습니다 */
    if (p.guide) {
      const guide = el('a', 'btn btn-primary', '설명서 보기');
      guide.href = p.guide;
      actions.appendChild(guide);
    }

    if (p.git) {
      /* 설명서가 있으면 그쪽이 첫 번째 행동이 되도록 한 단계 낮춥니다 */
      const copy = el('button', p.guide ? 'btn btn-outline' : 'btn btn-primary', 'Git URL 복사');
      copy.type = 'button';
      copy.setAttribute('data-copy', p.git);
      actions.appendChild(copy);
    }

    if (!p.hideRepo) {
      const repo = el('a', 'btn btn-ghost', 'GitHub ↗');
      repo.href = p.repo;
      repo.target = '_blank';
      repo.rel = 'noopener';
      actions.appendChild(repo);
    }

    body.appendChild(actions);
    card.appendChild(body);
    return card;
  }

  if (grid && typeof PROJECTS !== 'undefined') {
    const frag = document.createDocumentFragment();
    PROJECTS.forEach((p) => frag.appendChild(buildCard(p)));
    grid.appendChild(frag);
  }

  /* ---------------- 필터 + 검색 ---------------- */
  let activeFilter = 'all';

  function applyFilters() {
    const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visible = 0;

    $$('.card', grid).forEach((card) => {
      const matchType = activeFilter === 'all' || card.dataset.type === activeFilter;
      const matchText = !q || card.dataset.search.indexOf(q) !== -1;
      const show = matchType && matchText;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (emptyMsg) emptyMsg.hidden = visible !== 0;
    if (countEl) {
      const total = $$('.card', grid).length;
      countEl.textContent = visible === total
        ? total + '개 프로젝트'
        : visible + ' / ' + total + '개 표시 중';
    }
  }

  $$('.chip[data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      activeFilter = chip.dataset.filter;
      $$('.chip[data-filter]').forEach((c) => {
        const on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-selected', String(on));
      });
      applyFilters();
    });
  });

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  applyFilters();

  /* 히어로의 개수 표시를 실제 데이터로 맞춤 */
  if (typeof PROJECTS !== 'undefined') {
    $$('[data-count]').forEach((node) => {
      const type = node.dataset.count;
      if (type === 'theme' && typeof THEMES !== 'undefined') {
        node.textContent = THEMES.length;
      } else {
        node.textContent = PROJECTS.filter((p) => p.type === type).length;
      }
    });
  }

  /* ---------------- 테마 카드 ---------------- */
  const themeGrid = $('#theme-grid');

  function buildThemeCard(t) {
    const card = el('article', 'theme-card');

    const preview = el('div', 'theme-preview');
    preview.style.background = t.swatch[0];

    const them = el('div', 'bubble them', '오늘은 무슨 일이야?');
    them.style.background = t.dark ? t.swatch[1] : (t.swatch[2] || t.swatch[1]);
    them.style.color = t.dark ? t.swatch[2] : '#ffffff';

    const me = el('div', 'bubble me', '테마 구경 중!');
    me.style.background = t.swatch[1];
    me.style.color = t.dark ? t.swatch[2] : '#232228';

    /* 밝은 테마의 상대 말풍선은 배경색이 밝으면 글자를 어둡게 */
    if (!t.dark) {
      const c = (t.swatch[2] || '').replace('#', '');
      if (c.length === 6) {
        const lum = (parseInt(c.slice(0, 2), 16) * 299 +
                     parseInt(c.slice(2, 4), 16) * 587 +
                     parseInt(c.slice(4, 6), 16) * 114) / 1000;
        them.style.color = lum > 150 ? '#232228' : '#ffffff';
      }
    }

    preview.appendChild(them);
    preview.appendChild(me);
    card.appendChild(preview);

    const meta = el('div', 'theme-meta');
    meta.appendChild(el('span', 'theme-tag', t.tag));
    meta.appendChild(el('div', 'theme-name', t.name));

    const actions = el('div', 'theme-actions');

    const download = el('a', 'btn btn-sm btn-primary', '다운로드');
    download.href = THEME_RAW + t.file.split('/').map(encodeURIComponent).join('/');
    download.setAttribute('download', t.name + '.json');
    actions.appendChild(download);

    const view = el('a', 'btn btn-sm btn-ghost', '보기 ↗');
    view.href = THEME_REPO + '/blob/main/' + t.file.split('/').map(encodeURIComponent).join('/');
    view.target = '_blank';
    view.rel = 'noopener';
    actions.appendChild(view);

    meta.appendChild(actions);
    card.appendChild(meta);
    return card;
  }

  if (themeGrid && typeof THEMES !== 'undefined') {
    const frag = document.createDocumentFragment();
    THEMES.forEach((t) => frag.appendChild(buildThemeCard(t)));
    themeGrid.appendChild(frag);
  }

  /* ---------------- 해시로 들어온 카드 강조 ---------------- */
  function highlightFromHash() {
    const id = location.hash.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target || !target.classList.contains('card')) return;
    /* 필터에 가려져 있으면 전체 보기로 되돌림 */
    if (target.hidden) {
      const allChip = $('.chip[data-filter="all"]');
      if (allChip) allChip.click();
    }
    target.animate(
      [
        { boxShadow: '0 0 0 0 rgba(124, 104, 194, 0)' },
        { boxShadow: '0 0 0 6px rgba(124, 104, 194, 0.28)' },
        { boxShadow: '0 0 0 0 rgba(124, 104, 194, 0)' },
      ],
      { duration: 900, iterations: 1 }
    );
  }
  window.addEventListener('hashchange', highlightFromHash);
  highlightFromHash();
})();
