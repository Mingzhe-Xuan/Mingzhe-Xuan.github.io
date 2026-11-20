(() => {
  'use strict';
  const data = window.SITE_CONTENT;
  if (!data) return;
  const $ = selector => document.querySelector(selector);
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const local = location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  const storageKey = 'xuan-mingzhe-academic-v2-announcement';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function safeHref(value) {
    if (typeof value !== 'string') return '';
    const href = value.trim();
    if (!href || /[\u0000-\u0020\\]/.test(href) || href.startsWith('//')) return '';
    if (/^[a-z][a-z\d+.-]*:/i.test(href)) return /^(https?:\/\/|mailto:)/i.test(href) ? href : '';
    return href;
  }
  function link(text, href, className = '') {
    const anchor = make('a', className, text);
    const safe = safeHref(href);
    if (safe) anchor.href = safe;
    if (/^https?:\/\//i.test(safe)) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
    return anchor;
  }
  const people = new Map(data.acknowledgements.map(person => [person.name, person]));
  const emphasized = ['School of Gifted Young', 'University of Science and Technology of China', 'Nanyang Technological University', 'University of Hong Kong', 'DeePTB Lab', 'BREATHE AI', 'Statistics'];
  const terms = [...people.keys(), ...emphasized].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  function prose(parent, text) {
    String(text).split(pattern).forEach(part => {
      if (people.has(part)) parent.append(link(part, `#thanks-${people.get(part).id}`, 'person-link'));
      else if (emphasized.includes(part)) parent.append(make('strong', '', part));
      else parent.append(document.createTextNode(part));
    });
  }

  $('#portrait').src = safeHref(data.profile.image);
  $('#portrait').alt = data.profile.imageAlt;
  $('#sidebar-email').href = `mailto:${data.profile.email}`;
  $('#sidebar-cv').href = safeHref(data.profile.cv);
  $('#sidebar-github').href = safeHref(data.profile.github);
  $('#copyright-year').textContent = new Date().getFullYear();
  const first = make('p');
  prose(first, `${data.profile.lead} ${data.profile.paragraphs[0]}`);
  const second = make('p');
  prose(second, `${data.profile.paragraphs[1]} ${data.profile.paragraphs[2]}`);
  $('#about-copy').append(first, second);

  const emoji = { Research: '👏', Visiting: '🌏', Experience: '💻', Education: '🎓' };
  const months = { Jan:'01', Feb:'02', Mar:'03', Apr:'04', May:'05', Jun:'06', Jul:'07', Aug:'08', Sep:'09', Oct:'10', Nov:'11', Dec:'12' };
  data.news.forEach(item => {
    const li = make('li', 'news-item');
    const time = make('time', '', item.date.replace(/(\w+) (\d+)/, (_, month, year) => `${year}.${months[month]}`) + ':');
    const [month, year] = item.date.split(' ');
    if (months[month] && year) time.dateTime = `${year}-${months[month]}`;
    const icon = make('span', 'news-emoji', emoji[item.category] || '•');
    icon.setAttribute('aria-hidden', 'true');
    li.append(time, icon, link(item.title, item.href), document.createTextNode(' '));
    prose(li, item.body);
    $('#news-list').append(li);
  });

  const cards = new Map();
  data.research.forEach(item => {
    const article = make('article', 'research-card');
    article.id = `research-${item.id}`;
    article.dataset.category = item.category;
    const figure = make('figure', 'research-figure');
    const badge = make('span', 'research-status', item.status);
    const imageButton = make('button', 'research-image-button');
    imageButton.type = 'button';
    imageButton.setAttribute('aria-haspopup', 'dialog');
    imageButton.setAttribute('aria-label', `View ${item.shortName} figure at full size`);
    const image = make('img');
    image.src = safeHref(item.image);
    image.alt = item.imageAlt;
    image.loading = 'lazy';
    image.decoding = 'async';
    imageButton.append(image);
    imageButton.addEventListener('click', () => {
      $('#figure-title').textContent = `${item.shortName} · method overview`;
      $('#figure-full-image').src = image.src;
      $('#figure-full-image').alt = item.imageAlt;
      $('#figure-original').href = safeHref(item.imageOriginal || item.image);
      $('#figure-original').textContent = item.imageOriginal ? 'Open original PDF' : 'Open original image';
      $('#figure-dialog').showModal();
    });
    figure.append(badge, imageButton, make('figcaption', '', 'Click the figure to view full size.'));
    const copy = make('div', 'research-copy');
    copy.append(make('h3', '', item.title));
    const role = make('p', 'research-role');
    role.append(make('strong', '', data.profile.name), document.createTextNode(` · ${item.role}`));
    copy.append(role, make('p', 'research-affiliation', item.affiliation), make('p', 'research-date', item.date), make('p', 'research-summary', item.summary));
    const details = make('details', 'research-details');
    const list = make('ul');
    item.details.forEach(text => list.append(make('li', '', text)));
    details.append(make('summary', '', 'Research details'), list, make('p', 'research-note', item.metricNote));
    copy.append(details);
    item.links.forEach(itemLink => copy.append(link(itemLink.label, itemLink.href, 'research-link')));
    article.append(figure, copy);
    $('#research-list').append(article);
    cards.set(item.id, article);
  });
  const categories = ['All', ...new Set(data.research.map(item => item.category))];
  function filterResearch(category) {
    let count = 0;
    cards.forEach(article => {
      article.hidden = category !== 'All' && article.dataset.category !== category;
      if (!article.hidden) count++;
    });
    $('#research-filters').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    $('#research-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
  }
  categories.forEach(category => {
    const button = make('button', 'filter', category);
    button.type = 'button';
    button.dataset.filter = category;
    button.setAttribute('aria-controls', 'research-list');
    button.addEventListener('click', () => filterResearch(category));
    $('#research-filters').append(button);
  });
  filterResearch('All');
  function revealResearch() {
    const card = cards.get(location.hash.replace('#research-', ''));
    if (!card) return;
    filterResearch('All');
    card.querySelector('details').open = true;
    requestAnimationFrame(() => card.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' }));
  }
  window.addEventListener('hashchange', revealResearch);
  $('#news-list').addEventListener('click', event => {
    const anchor = event.target.closest('a');
    if (anchor?.hash.startsWith('#research-') && anchor.hash === location.hash) revealResearch();
  });

  data.experience.forEach(item => {
    const li = make('li');
    li.id = `experience-${item.id}`;
    li.append(make('time', '', item.date + ':'), document.createTextNode(' '));
    const education = ['Education', 'Visiting'].includes(item.type);
    if (education) {
      li.append(document.createTextNode(`${item.role} at `), make('strong', '', item.organization), document.createTextNode('.'));
      if (item.type === 'Education') li.append(make('span', 'experience-detail', item.description));
      $('#education-list').append(li);
    } else {
      li.append(make('strong', '', 'Research Assistant'), document.createTextNode(` at ${item.organization}.`), make('span', 'experience-detail', item.role), make('span', 'experience-detail', item.description));
      $('#experience-list').append(li);
    }
  });
  data.acknowledgements.forEach(person => {
    const article = make('article', 'thanks-person');
    article.id = `thanks-${person.id}`;
    article.append(make('h3', '', person.name), make('p', 'thanks-affiliation', person.affiliation), make('p', '', person.thanks));
    $('#thanks-list').append(article);
  });
  revealResearch();

  const menu = $('.menu-toggle');
  const moreNav = $('#more-nav');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); moreNav.classList.remove('open'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    moreNav.classList.toggle('open', open);
  });
  $('.masthead').addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.masthead')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  matchMedia('(min-width: 851px)').addEventListener('change', closeMenu);
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    $('.masthead').querySelectorAll('a').forEach(anchor => {
      if (anchor.hash === `#${visible.target.id}`) anchor.setAttribute('aria-current', 'location');
      else anchor.removeAttribute('aria-current');
    });
  }, { rootMargin: '-8% 0px -50% 0px', threshold: [0, .1, .4] });
  document.querySelectorAll('main>section').forEach(section => observer.observe(section));

  let announcement = { ...data.announcement };
  try {
    const stored = local && JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) announcement = { ...announcement, ...stored };
  } catch { /* Browser drafts are optional. */ }
  function renderAnnouncement() {
    const box = $('#announcement');
    box.hidden = announcement.visible === false;
    const color = /^#[0-9a-f]{6}$/i.test(announcement.color) ? announcement.color : data.announcement.color;
    const values = color.slice(1).match(/../g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
    const light = values[0] * .2126 + values[1] * .7152 + values[2] * .0722 > .179;
    box.style.backgroundColor = color;
    box.style.color = color === data.announcement.color ? '#494e52' : (light ? '#000000' : '#ffffff');
    $('#status-link').style.color = light ? '#2457a6' : '#ffffff';
    // For unusual editor colors, use the same high-contrast text color for links.
    if (color !== data.announcement.color) $('#status-link').style.color = light ? '#000000' : '#ffffff';
    $('#status-title').textContent = String(announcement.title ?? '');
    $('#status-body').textContent = String(announcement.body ?? '');
    $('#status-link').textContent = String(announcement.linkText ?? '');
    const href = safeHref(announcement.href);
    $('#status-link').hidden = !href;
    if (href) $('#status-link').href = href;
  }
  renderAnnouncement();
  $('#edit-status').hidden = !local;
  const form = $('#status-form');
  const dialog = $('#status-dialog');
  const feedback = $('#editor-feedback');
  function fillForm() {
    ['title', 'body', 'linkText', 'href', 'color'].forEach(key => form.elements[key].value = announcement[key]);
    form.elements.visible.checked = announcement.visible !== false;
    feedback.textContent = '';
    feedback.classList.remove('error');
  }
  function readForm() {
    if (!form.reportValidity()) return null;
    const draft = { ...announcement };
    ['title', 'body', 'linkText', 'href', 'color'].forEach(key => draft[key] = form.elements[key].value.trim());
    draft.visible = form.elements.visible.checked;
    if (!safeHref(draft.href)) {
      feedback.textContent = 'Use a mailto: email link, https URL, or a section link such as #research.';
      feedback.classList.add('error');
      return null;
    }
    return draft;
  }
  $('#edit-status').addEventListener('click', () => { fillForm(); dialog.showModal(); });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const draft = readForm();
    if (!draft) return;
    announcement = draft;
    renderAnnouncement();
    feedback.classList.remove('error');
    try { localStorage.setItem(storageKey, JSON.stringify(draft)); feedback.textContent = 'Saved in this browser. Download content.js to update the project files.'; }
    catch { feedback.textContent = 'Preview updated. Download content.js to keep this change.'; }
  });
  $('#reset-status').addEventListener('click', () => {
    announcement = { ...data.announcement };
    try { localStorage.removeItem(storageKey); } catch { /* Still reset the preview. */ }
    renderAnnouncement(); fillForm();
    feedback.textContent = 'Restored the project announcement.';
  });
  $('#download-content').addEventListener('click', () => {
    const draft = readForm();
    if (!draft) return;
    const file = new Blob([`/* Facts: supplied CV. Acknowledgements: user confirmed. */\nwindow.SITE_CONTENT = ${JSON.stringify({ ...data, announcement: draft }, null, 2)};\n`], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const anchor = make('a'); anchor.href = url; anchor.download = 'content.js';
    document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    feedback.classList.remove('error');
    feedback.textContent = 'Downloaded content.js. Replace the project’s content.js with this file.';
  });
  for (const [dialogId, closeId] of [['#status-dialog', '#close-status'], ['#figure-dialog', '#close-figure']]) {
    const target = $(dialogId);
    $(closeId).addEventListener('click', () => target.close());
    target.addEventListener('click', event => {
      const rect = target.getBoundingClientRect();
      if (event.target === target && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) target.close();
    });
  }
})();
