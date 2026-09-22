'use strict';

/* =========================================================================
   Data: quick-pick food database (values per 100 g) and activity MET table
   ========================================================================= */

const FOOD_DB = [
  { name: 'Hähnchenbrust (roh)', kcal: 110, protein: 23, carbs: 0, fat: 2, fiber: 0 },
  { name: 'Rinderhack (gemischt)', kcal: 254, protein: 17, carbs: 0, fat: 20, fiber: 0 },
  { name: 'Lachs (roh)', kcal: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
  { name: 'Ei (ganz)', kcal: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 },
  { name: 'Magerquark', kcal: 67, protein: 12, carbs: 4, fat: 0.2, fiber: 0 },
  { name: 'Naturjoghurt 3,5%', kcal: 66, protein: 3.5, carbs: 4.7, fat: 3.5, fiber: 0 },
  { name: 'Griechischer Joghurt 10%', kcal: 133, protein: 5.7, carbs: 4, fat: 10, fiber: 0 },
  { name: 'Milch 3,5%', kcal: 64, protein: 3.4, carbs: 4.8, fat: 3.6, fiber: 0 },
  { name: 'Vollkornreis (gekocht)', kcal: 123, protein: 2.6, carbs: 25, fat: 1, fiber: 1.8 },
  { name: 'Weißer Reis (gekocht)', kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
  { name: 'Vollkornnudeln (gekocht)', kcal: 124, protein: 5, carbs: 25, fat: 1, fiber: 4 },
  { name: 'Kartoffeln (gekocht)', kcal: 87, protein: 2, carbs: 20, fat: 0.1, fiber: 1.8 },
  { name: 'Süßkartoffel (gekocht)', kcal: 90, protein: 2, carbs: 21, fat: 0.1, fiber: 3 },
  { name: 'Haferflocken (roh)', kcal: 372, protein: 13, carbs: 60, fat: 7, fiber: 10 },
  { name: 'Vollkornbrot', kcal: 216, protein: 8, carbs: 40, fat: 3, fiber: 7 },
  { name: 'Weißbrot', kcal: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7 },
  { name: 'Banane', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
  { name: 'Apfel', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
  { name: 'Beeren (gemischt)', kcal: 50, protein: 0.8, carbs: 11, fat: 0.4, fiber: 3 },
  { name: 'Brokkoli (gekocht)', kcal: 35, protein: 2.4, carbs: 7, fat: 0.4, fiber: 3.3 },
  { name: 'Gemüse gemischt / Salat', kcal: 25, protein: 2, carbs: 4, fat: 0.3, fiber: 2 },
  { name: 'Tomate', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 },
  { name: 'Avocado', kcal: 160, protein: 2, carbs: 9, fat: 15, fiber: 7 },
  { name: 'Olivenöl', kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
  { name: 'Butter', kcal: 717, protein: 0.9, carbs: 0.1, fat: 81, fiber: 0 },
  { name: 'Mandeln', kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 12.5 },
  { name: 'Erdnussbutter', kcal: 588, protein: 25, carbs: 20, fat: 50, fiber: 6 },
  { name: 'Linsen (gekocht)', kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9 },
  { name: 'Kichererbsen (gekocht)', kcal: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6 },
  { name: 'Tofu', kcal: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3 },
  { name: 'Käse (Gouda)', kcal: 356, protein: 25, carbs: 0, fat: 27, fiber: 0 },
  { name: 'Schokolade (Vollmilch)', kcal: 534, protein: 7.6, carbs: 57, fat: 30, fiber: 3 },
  { name: 'Pizza Margherita', kcal: 266, protein: 11, carbs: 33, fat: 10, fiber: 2 },
  { name: 'Cola', kcal: 42, protein: 0, carbs: 10.6, fat: 0, fiber: 0 },
];

const ACTIVITY_MET = {
  'Gehen (locker)': 3.0,
  'Gehen (zügig)': 4.3,
  'Hund ausführen': 3.5,
  'Wandern': 6.0,
  'Joggen / Laufen': 8.0,
  'Radfahren': 6.8,
  'Krafttraining': 5.0,
  'Schwimmen': 7.0,
  'Yoga / Dehnen': 2.5,
  'Hausarbeit / Putzen': 3.3,
  'Treppensteigen': 8.0,
  'Gartenarbeit': 4.0,
  'Sonstige Bewegung': 4.0,
  'Manuell (kcal eingeben)': null,
};

const KCAL_PER_KG_FAT = 7700;

/* =========================================================================
   Storage
   ========================================================================= */

const STORAGE_KEYS = { profile: 'nutrifit_profile_v1', days: 'nutrifit_days_v1', theme: 'nutrifit_theme_v1', focus: 'nutrifit_focus_v1' };

function defaultProfile() {
  return {
    sex: 'w', age: 30, heightCm: 170, weightKg: 70,
    activityFactor: 1.2, proteinPerKg: 1.8, fatPerKg: 0.8,
    fiberTarget: 30, deficitTarget: 500,
  };
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.profile);
    if (!raw) return null;
    return Object.assign(defaultProfile(), JSON.parse(raw));
  } catch (e) { return null; }
}
function saveProfile(p) { localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(p)); }

function loadDays() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.days);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function saveDays(days) { localStorage.setItem(STORAGE_KEYS.days, JSON.stringify(days)); }

function loadFocusTips() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.focus)) || []; } catch (e) { return []; }
}
function saveFocusTips(list) { localStorage.setItem(STORAGE_KEYS.focus, JSON.stringify(list)); }

/* =========================================================================
   State
   ========================================================================= */

let profile = loadProfile();
let firstRun = !profile;
if (!profile) profile = defaultProfile();

let days = loadDays();
let selectedDate = todayKey();
let selectedRange = 7;

/* =========================================================================
   Date helpers
   ========================================================================= */

function pad2(n) { return String(n).padStart(2, '0'); }
function toKey(d) { return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; }
function todayKey() { return toKey(new Date()); }
function keyToDate(key) { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d); }
function addDays(key, n) { const d = keyToDate(key); d.setDate(d.getDate() + n); return toKey(d); }
function shortLabel(key) {
  const d = keyToDate(key);
  const wd = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][d.getDay()];
  return `${wd} ${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.`;
}
function longLabel(key) {
  const d = keyToDate(key);
  const wd = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][d.getDay()];
  return `${wd}, ${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/* =========================================================================
   Day data access
   ========================================================================= */

function getDay(key) {
  return days[key] || { weightKg: null, food: [], activities: [] };
}
function ensureDay(key) {
  if (!days[key]) days[key] = { weightKg: null, food: [], activities: [] };
  return days[key];
}
function uid() { return Math.random().toString(36).slice(2, 10); }

function addFoodEntry(key, entry) {
  const day = ensureDay(key);
  day.food.push(Object.assign({ id: uid() }, entry));
  saveDays(days);
}
function removeFoodEntry(key, id) {
  const day = ensureDay(key);
  day.food = day.food.filter((f) => f.id !== id);
  saveDays(days);
}
function addActivityEntry(key, entry) {
  const day = ensureDay(key);
  day.activities.push(Object.assign({ id: uid() }, entry));
  saveDays(days);
}
function removeActivityEntry(key, id) {
  const day = ensureDay(key);
  day.activities = day.activities.filter((a) => a.id !== id);
  saveDays(days);
}
function setWeight(key, kg) {
  const day = ensureDay(key);
  day.weightKg = kg;
  saveDays(days);
}

function getLatestWeightUpTo(key) {
  const keys = Object.keys(days).filter((k) => k <= key && days[k].weightKg != null).sort();
  if (keys.length) return days[keys[keys.length - 1]].weightKg;
  const anyKeys = Object.keys(days).filter((k) => days[k].weightKg != null).sort();
  if (anyKeys.length) return days[anyKeys[0]].weightKg;
  return profile.weightKg;
}

/* =========================================================================
   Calculations
   ========================================================================= */

function calcBMR(p, weightKg) {
  const base = 10 * weightKg + 6.25 * p.heightCm - 5 * p.age;
  if (p.sex === 'm') return base + 5;
  if (p.sex === 'w') return base - 161;
  return base - 78; // divers: mid-point of the male/female offsets
}

function calcDayTotals(dayObj) {
  const food = dayObj.food.reduce((acc, f) => {
    acc.kcal += f.kcal; acc.protein += f.protein; acc.carbs += f.carbs;
    acc.fat += f.fat; acc.fiber += f.fiber;
    return acc;
  }, { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  const activityKcal = dayObj.activities.reduce((sum, a) => sum + a.kcal, 0);
  return { food, activityKcal };
}

function calcTargets(p, weightKg, activityKcalToday) {
  const bmr = calcBMR(p, weightKg);
  const baseline = bmr * p.activityFactor;
  const totalBurnTarget = baseline + activityKcalToday;
  const kcalTarget = Math.max(1200, totalBurnTarget - p.deficitTarget);
  const proteinTarget = p.proteinPerKg * weightKg;
  const fatTarget = p.fatPerKg * weightKg;
  const proteinKcal = proteinTarget * 4;
  const fatKcal = fatTarget * 9;
  const carbsTarget = Math.max(0, (kcalTarget - proteinKcal - fatKcal) / 4);
  return { bmr, baseline, kcalTarget, proteinTarget, carbsTarget, fatTarget, fiberTarget: p.fiberTarget };
}

/* =========================================================================
   Rendering: stat tiles + macro bars
   ========================================================================= */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function fmt(n, digits = 0) {
  return n.toLocaleString('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function renderStatTiles() {
  const dayObj = getDay(selectedDate);
  const weightKg = getLatestWeightUpTo(selectedDate);
  const totals = calcDayTotals(dayObj);
  const targets = calcTargets(profile, weightKg, totals.activityKcal);
  const totalBurn = targets.baseline + totals.activityKcal;
  const balance = totals.food.kcal - totalBurn;

  const tiles = [
    { label: 'Kalorien gegessen', value: `${fmt(totals.food.kcal)} kcal`, sub: `Ziel ${fmt(targets.kcalTarget)} kcal` },
    { label: 'Kalorien verbrannt', value: `${fmt(totalBurn)} kcal`, sub: `Grundumsatz ${fmt(targets.baseline)} + Bewegung ${fmt(totals.activityKcal)}` },
    {
      label: 'Bilanz heute', value: `${balance <= 0 ? '−' : '+'}${fmt(Math.abs(balance))} kcal`,
      sub: balance <= 0 ? 'Defizit' : 'Überschuss',
      cls: balance <= -100 ? 'good' : (balance > 300 ? 'warn' : ''),
    },
    { label: 'Gewicht', value: dayObj.weightKg != null ? `${fmt(dayObj.weightKg, 1)} kg` : '–', sub: dayObj.weightKg != null ? 'heute erfasst' : `zuletzt: ${fmt(weightKg, 1)} kg` },
  ];

  $('#statTiles').innerHTML = tiles.map((t) => `
    <div class="tile">
      <div class="tile-label">${t.label}</div>
      <div class="tile-value ${t.cls || ''}">${t.value}</div>
      <div class="tile-sub">${t.sub}</div>
    </div>`).join('');
}

function renderMacroBars() {
  const dayObj = getDay(selectedDate);
  const weightKg = getLatestWeightUpTo(selectedDate);
  const totals = calcDayTotals(dayObj);
  const targets = calcTargets(profile, weightKg, totals.activityKcal);

  const rows = [
    { label: 'Eiweiß', value: totals.food.protein, target: targets.proteinTarget, color: 'var(--series-1)' },
    { label: 'Kohlenhydrate', value: totals.food.carbs, target: targets.carbsTarget, color: 'var(--series-2)' },
    { label: 'Fett', value: totals.food.fat, target: targets.fatTarget, color: 'var(--series-3)' },
    { label: 'Ballaststoffe', value: totals.food.fiber, target: targets.fiberTarget, color: 'var(--series-4)' },
  ];

  $('#macroBars').innerHTML = rows.map((r) => {
    const pct = r.target > 0 ? Math.min(100, (r.value / r.target) * 100) : 0;
    return `
      <div class="macro-row">
        <span class="macro-label">${r.label}</span>
        <span class="macro-track"><span class="macro-fill" style="width:${pct}%;background:${r.color}"></span></span>
        <span class="macro-value">${fmt(r.value, 1)} / ${fmt(r.target, 0)} g</span>
      </div>`;
  }).join('');
}

/* =========================================================================
   Rendering: food & activity logs
   ========================================================================= */

function renderFoodList() {
  const dayObj = getDay(selectedDate);
  const list = $('#foodLogList');
  if (!dayObj.food.length) { list.innerHTML = `<li class="log-empty">Noch keine Einträge heute.</li>`; return; }
  list.innerHTML = dayObj.food.map((f) => `
    <li>
      <div class="log-item-main">
        <div class="log-item-name">${escapeHtml(f.name)} ${f.grams ? `(${fmt(f.grams)} g)` : ''}</div>
        <div class="log-item-detail">${fmt(f.kcal)} kcal · E ${fmt(f.protein, 1)} g · K ${fmt(f.carbs, 1)} g · F ${fmt(f.fat, 1)} g · Ba ${fmt(f.fiber, 1)} g</div>
      </div>
      <button class="log-item-remove" data-remove-food="${f.id}" aria-label="Eintrag löschen" title="Löschen">✕</button>
    </li>`).join('');
}

function renderActivityList() {
  const dayObj = getDay(selectedDate);
  const list = $('#activityLogList');
  if (!dayObj.activities.length) { list.innerHTML = `<li class="log-empty">Noch keine Bewegung heute erfasst.</li>`; return; }
  list.innerHTML = dayObj.activities.map((a) => `
    <li>
      <div class="log-item-main">
        <div class="log-item-name">${escapeHtml(a.type)}</div>
        <div class="log-item-detail">${a.minutes ? `${a.minutes} min · ` : ''}${fmt(a.kcal)} kcal</div>
      </div>
      <button class="log-item-remove" data-remove-activity="${a.id}" aria-label="Eintrag löschen" title="Löschen">✕</button>
    </li>`).join('');
}

function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

/* =========================================================================
   SVG chart helpers
   ========================================================================= */

const SVG_NS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs) {
  const e = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}
function niceMax(max) {
  if (max <= 0) return 10;
  const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
  const residual = max / magnitude;
  let nice;
  if (residual <= 1) nice = 1; else if (residual <= 2) nice = 2; else if (residual <= 5) nice = 5; else nice = 10;
  return nice * magnitude;
}

function showTooltip(evt, html) {
  const tip = $('#chartTooltip');
  tip.innerHTML = html;
  tip.hidden = false;
  const x = evt.clientX + 14, y = evt.clientY + 14;
  tip.style.left = Math.min(x, window.innerWidth - 240) + 'px';
  tip.style.top = Math.min(y, window.innerHeight - 80) + 'px';
}
function hideTooltip() { $('#chartTooltip').hidden = true; }

function buildRangeLabels(rangeDays, endKey) {
  const arr = [];
  for (let i = rangeDays - 1; i >= 0; i--) arr.push(addDays(endKey, -i));
  return arr;
}

function legendHtml(items) {
  return `<div class="chart-legend">${items.map((it) => `<span><span class="legend-swatch" style="background:${it.color}"></span>${it.label}</span>`).join('')}</div>`;
}

/* Grouped bar chart: series = [{label, color, values}], values aligned to labels */
function groupedBarChart(container, labels, series, opts) {
  opts = opts || {};
  container.innerHTML = '';
  const allVals = series.flatMap((s) => s.values.filter((v) => v != null));
  if (!allVals.length) { container.innerHTML = `<div class="chart-empty">Noch keine Daten in diesem Zeitraum.</div>`; return; }
  const W = Math.max(480, labels.length * 64), H = 260;
  const margin = { top: 10, right: 10, bottom: 34, left: 50 };
  const plotW = W - margin.left - margin.right, plotH = H - margin.top - margin.bottom;
  const max = niceMax(Math.max(...allVals, 1) * 1.15);
  const svg = svgEl('svg', {}); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('width', '100%'); svg.setAttribute('height', H); svg.setAttribute('role', 'img');
  const yScale = (v) => margin.top + plotH - (v / max) * plotH;

  // gridlines
  for (let i = 0; i <= 4; i++) {
    const v = (max / 4) * i;
    const y = yScale(v);
    svg.appendChild(svgEl('line', { x1: margin.left, x2: W - margin.right, y1: y, y2: y, style: 'stroke:var(--gridline);stroke-width:1' }));
    const t = svgEl('text', { x: margin.left - 8, y: y + 3, 'text-anchor': 'end', style: 'font-size:10px;fill:var(--text-muted)' });
    t.textContent = fmt(v); svg.appendChild(t);
  }
  svg.appendChild(svgEl('line', { x1: margin.left, x2: W - margin.right, y1: margin.top + plotH, y2: margin.top + plotH, style: 'stroke:var(--baseline);stroke-width:1' }));

  const groupW = plotW / labels.length;
  const barPad = groupW * 0.18;
  const barW = (groupW - barPad * 2) / series.length;

  labels.forEach((key, i) => {
    const gx = margin.left + i * groupW;
    series.forEach((s, si) => {
      const v = s.values[i];
      if (v == null) return;
      const bx = gx + barPad + si * barW;
      const by = yScale(v);
      const bh = margin.top + plotH - by;
      svg.appendChild(svgEl('rect', { x: bx, y: by, width: Math.max(2, barW - 3), height: Math.max(0, bh), rx: 3, style: `fill:${s.color}` }));
    });
    // hover column
    const hit = svgEl('rect', { x: gx, y: margin.top, width: groupW, height: plotH, fill: 'transparent', style: 'cursor:pointer' });
    hit.addEventListener('mousemove', (e) => {
      const rows = series.map((s) => `${s.label}: ${s.values[i] != null ? fmt(s.values[i]) + (opts.unit || '') : '–'}`).join('<br>');
      showTooltip(e, `<strong>${longLabel(key)}</strong><br>${rows}`);
    });
    hit.addEventListener('mouseleave', hideTooltip);
    svg.appendChild(hit);
    // x label
    const showLabel = labels.length <= 14 || i % Math.ceil(labels.length / 14) === 0;
    if (showLabel) {
      const lt = svgEl('text', { x: gx + groupW / 2, y: H - 12, 'text-anchor': 'middle', style: 'font-size:10px;fill:var(--text-muted)' });
      lt.textContent = shortLabel(key).slice(3); svg.appendChild(lt);
    }
  });

  container.appendChild(svg);
  container.insertAdjacentHTML('beforeend', legendHtml(series.map((s) => ({ label: s.label, color: s.color }))));
}

/* Diverging bar chart around zero: values may be +/- */
function divergingBarChart(container, labels, values, opts) {
  opts = opts || {};
  container.innerHTML = '';
  const present = values.filter((v) => v != null);
  if (!present.length) { container.innerHTML = `<div class="chart-empty">Noch keine Daten in diesem Zeitraum.</div>`; return; }
  const W = Math.max(480, labels.length * 64), H = 260;
  const margin = { top: 10, right: 10, bottom: 34, left: 54 };
  const plotW = W - margin.left - margin.right, plotH = H - margin.top - margin.bottom;
  const maxAbs = niceMax(Math.max(...present.map((v) => Math.abs(v)), 1) * 1.15);
  const zeroY = margin.top + plotH / 2;
  const yScale = (v) => zeroY - (v / maxAbs) * (plotH / 2);

  const svg = svgEl('svg', {}); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('width', '100%'); svg.setAttribute('height', H); svg.setAttribute('role', 'img');

  [-1, -0.5, 0, 0.5, 1].forEach((f) => {
    const v = maxAbs * f, y = yScale(v);
    svg.appendChild(svgEl('line', { x1: margin.left, x2: W - margin.right, y1: y, y2: y, style: `stroke:${f === 0 ? 'var(--baseline)' : 'var(--gridline)'};stroke-width:1` }));
    const t = svgEl('text', { x: margin.left - 8, y: y + 3, 'text-anchor': 'end', style: 'font-size:10px;fill:var(--text-muted)' });
    t.textContent = fmt(v); svg.appendChild(t);
  });

  const groupW = plotW / labels.length;
  const barW = groupW * 0.55;

  labels.forEach((key, i) => {
    const gx = margin.left + i * groupW;
    const v = values[i];
    if (v != null) {
      const y1 = yScale(0), y2 = yScale(v);
      const top = Math.min(y1, y2), h = Math.abs(y2 - y1);
      const color = v <= 0 ? 'var(--diverging-cool)' : 'var(--diverging-warm)';
      svg.appendChild(svgEl('rect', { x: gx + (groupW - barW) / 2, y: top, width: barW, height: Math.max(1, h), rx: 3, style: `fill:${color}` }));
    }
    const hit = svgEl('rect', { x: gx, y: margin.top, width: groupW, height: plotH, fill: 'transparent', style: 'cursor:pointer' });
    hit.addEventListener('mousemove', (e) => {
      const label = v == null ? 'keine Daten' : (v <= 0 ? `Defizit: ${fmt(Math.abs(v))} kcal` : `Überschuss: ${fmt(v)} kcal`);
      showTooltip(e, `<strong>${longLabel(key)}</strong><br>${label}`);
    });
    hit.addEventListener('mouseleave', hideTooltip);
    svg.appendChild(hit);
    const showLabel = labels.length <= 14 || i % Math.ceil(labels.length / 14) === 0;
    if (showLabel) {
      const lt = svgEl('text', { x: gx + groupW / 2, y: H - 12, 'text-anchor': 'middle', style: 'font-size:10px;fill:var(--text-muted)' });
      lt.textContent = shortLabel(key).slice(3); svg.appendChild(lt);
    }
  });

  container.appendChild(svg);
  container.insertAdjacentHTML('beforeend', legendHtml([{ label: 'Defizit', color: 'var(--diverging-cool)' }, { label: 'Überschuss', color: 'var(--diverging-warm)' }]));
}

/* Line chart for weight: raw points (muted dots + thin line) + 7-day moving average (bold line) */
function weightLineChart(container, labels, values) {
  container.innerHTML = '';
  const points = labels.map((k, i) => ({ key: k, i, v: values[i] })).filter((p) => p.v != null);
  if (points.length === 0) { container.innerHTML = `<div class="chart-empty">Noch keine Gewichtsdaten. Trage dein Gewicht ein, um den Verlauf zu sehen.</div>`; return; }

  // moving average across actual entries within trailing 7 calendar days
  const avgAt = (idx) => {
    const centerDate = keyToDate(labels[idx]);
    const windowPts = points.filter((p) => {
      const d = keyToDate(p.key);
      const diff = (centerDate - d) / 86400000;
      return diff >= 0 && diff < 7;
    });
    if (!windowPts.length) return null;
    return windowPts.reduce((s, p) => s + p.v, 0) / windowPts.length;
  };
  const avgValues = labels.map((_, i) => avgAt(i));

  const W = Math.max(480, labels.length * 46), H = 260;
  const margin = { top: 14, right: 14, bottom: 34, left: 54 };
  const plotW = W - margin.left - margin.right, plotH = H - margin.top - margin.bottom;
  const allVals = points.map((p) => p.v).concat(avgValues.filter((v) => v != null));
  let min = Math.min(...allVals), max = Math.max(...allVals);
  if (min === max) { min -= 1; max += 1; }
  const pad = (max - min) * 0.15 || 1;
  min -= pad; max += pad;

  const xScale = (i) => margin.left + (labels.length === 1 ? plotW / 2 : (i / (labels.length - 1)) * plotW);
  const yScale = (v) => margin.top + plotH - ((v - min) / (max - min)) * plotH;

  const svg = svgEl('svg', {}); svg.setAttribute('viewBox', `0 0 ${W} ${H}`); svg.setAttribute('width', '100%'); svg.setAttribute('height', H); svg.setAttribute('role', 'img');

  for (let i = 0; i <= 4; i++) {
    const v = min + ((max - min) / 4) * i, y = yScale(v);
    svg.appendChild(svgEl('line', { x1: margin.left, x2: W - margin.right, y1: y, y2: y, style: 'stroke:var(--gridline);stroke-width:1' }));
    const t = svgEl('text', { x: margin.left - 8, y: y + 3, 'text-anchor': 'end', style: 'font-size:10px;fill:var(--text-muted)' });
    t.textContent = fmt(v, 1); svg.appendChild(t);
  }

  // moving average path
  let pathD = '';
  labels.forEach((_, i) => {
    if (avgValues[i] == null) return;
    const cmd = pathD === '' ? 'M' : 'L';
    pathD += `${cmd}${xScale(i).toFixed(1)},${yScale(avgValues[i]).toFixed(1)} `;
  });
  if (pathD) svg.appendChild(svgEl('path', { d: pathD.trim(), style: 'fill:none;stroke:var(--series-1);stroke-width:2.5' }));

  // raw points thin line + dots
  let rawD = '';
  points.forEach((p) => {
    const cmd = rawD === '' ? 'M' : 'L';
    rawD += `${cmd}${xScale(p.i).toFixed(1)},${yScale(p.v).toFixed(1)} `;
  });
  svg.appendChild(svgEl('path', { d: rawD.trim(), style: 'fill:none;stroke:var(--text-muted);stroke-width:1.2;stroke-dasharray:3,3' }));
  points.forEach((p) => {
    const dot = svgEl('circle', { cx: xScale(p.i), cy: yScale(p.v), r: 4, style: 'fill:var(--surface-1);stroke:var(--text-muted);stroke-width:1.5;cursor:pointer' });
    dot.addEventListener('mousemove', (e) => showTooltip(e, `<strong>${longLabel(p.key)}</strong><br>${fmt(p.v, 1)} kg`));
    dot.addEventListener('mouseleave', hideTooltip);
    svg.appendChild(dot);
  });

  labels.forEach((key, i) => {
    const showLabel = labels.length <= 14 || i % Math.ceil(labels.length / 14) === 0;
    if (showLabel) {
      const lt = svgEl('text', { x: xScale(i), y: H - 12, 'text-anchor': 'middle', style: 'font-size:10px;fill:var(--text-muted)' });
      lt.textContent = shortLabel(key).slice(3); svg.appendChild(lt);
    }
  });

  container.appendChild(svg);
  container.insertAdjacentHTML('beforeend', legendHtml([{ label: 'Gewicht (Eintrag)', color: 'var(--text-muted)' }, { label: '7-Tage-Trend', color: 'var(--series-1)' }]));
}

/* =========================================================================
   Chart orchestration
   ========================================================================= */

function renderCharts() {
  const labels = buildRangeLabels(selectedRange, selectedDate);

  const kcalIn = [], kcalOut = [], protein = [], carbs = [], fat = [], balance = [], weight = [];
  labels.forEach((key) => {
    const dayObj = days[key];
    if (!dayObj || (!dayObj.food.length && !dayObj.activities.length && dayObj.weightKg == null)) {
      kcalIn.push(null); kcalOut.push(null); protein.push(null); carbs.push(null); fat.push(null); balance.push(null);
      weight.push(dayObj ? dayObj.weightKg : null);
      return;
    }
    const w = getLatestWeightUpTo(key);
    const totals = calcDayTotals(dayObj);
    const targets = calcTargets(profile, w, totals.activityKcal);
    const totalBurn = targets.baseline + totals.activityKcal;
    kcalIn.push(dayObj.food.length ? totals.food.kcal : null);
    kcalOut.push(totalBurn);
    protein.push(dayObj.food.length ? totals.food.protein : null);
    carbs.push(dayObj.food.length ? totals.food.carbs : null);
    fat.push(dayObj.food.length ? totals.food.fat : null);
    balance.push(dayObj.food.length ? (totals.food.kcal - totalBurn) : null);
    weight.push(dayObj.weightKg);
  });

  groupedBarChart($('#chartCalories'), labels, [
    { label: 'Aufgenommen', color: 'var(--series-1)', values: kcalIn },
    { label: 'Verbrannt', color: 'var(--series-2)', values: kcalOut },
  ], { unit: ' kcal' });

  divergingBarChart($('#chartBalance'), labels, balance);

  groupedBarChart($('#chartMacros'), labels, [
    { label: 'Eiweiß (g)', color: 'var(--series-1)', values: protein },
    { label: 'Kohlenhydrate (g)', color: 'var(--series-2)', values: carbs },
    { label: 'Fett (g)', color: 'var(--series-3)', values: fat },
  ], { unit: ' g' });

  weightLineChart($('#chartWeight'), labels, weight);
}

/* =========================================================================
   Range statistics (shared by insights + analysis/tips)
   ========================================================================= */

function computeRangeStats(labels) {
  const loggedKeys = labels.filter((k) => days[k] && days[k].food.length);
  if (!loggedKeys.length) return { loggedDays: 0, totalDays: labels.length, coveragePct: 0 };

  let totalBalance = 0, totalActivityKcal = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0, totalFiber = 0;
  let proteinHits = 0, fiberHits = 0, belowBMR = 0;
  let weekdayBalanceSum = 0, weekdayCount = 0, weekendBalanceSum = 0, weekendCount = 0;
  const balances = [];

  loggedKeys.forEach((k) => {
    const dayObj = days[k];
    const w = getLatestWeightUpTo(k);
    const totals = calcDayTotals(dayObj);
    const targets = calcTargets(profile, w, totals.activityKcal);
    const totalBurn = targets.baseline + totals.activityKcal;
    const balance = totals.food.kcal - totalBurn;
    balances.push(balance);
    totalBalance += balance;
    totalActivityKcal += totals.activityKcal;
    totalProtein += totals.food.protein;
    totalCarbs += totals.food.carbs;
    totalFat += totals.food.fat;
    totalFiber += totals.food.fiber;
    if (totals.food.protein >= targets.proteinTarget * 0.9) proteinHits++;
    if (totals.food.fiber >= targets.fiberTarget * 0.9) fiberHits++;
    if (totals.food.kcal < targets.bmr) belowBMR++;
    const dow = keyToDate(k).getDay();
    if (dow === 0 || dow === 6) { weekendBalanceSum += balance; weekendCount++; }
    else { weekdayBalanceSum += balance; weekdayCount++; }
  });

  const n = loggedKeys.length;
  const avgBalance = totalBalance / n;
  const variance = balances.reduce((s, b) => s + Math.pow(b - avgBalance, 2), 0) / n;

  const weightKeys = labels.filter((k) => days[k] && days[k].weightKg != null);
  let weightDelta = null, firstWeight = null, lastWeight = null;
  if (weightKeys.length >= 2) {
    firstWeight = days[weightKeys[0]].weightKg;
    lastWeight = days[weightKeys[weightKeys.length - 1]].weightKg;
    weightDelta = lastWeight - firstWeight;
  }

  return {
    loggedDays: n, totalDays: labels.length, coveragePct: Math.round((n / labels.length) * 100),
    avgBalance, stdDev: Math.sqrt(variance), predictedKg: totalBalance / KCAL_PER_KG_FAT,
    avgProtein: totalProtein / n, avgCarbs: totalCarbs / n, avgFat: totalFat / n, avgFiber: totalFiber / n,
    avgActivityKcal: totalActivityKcal / n,
    proteinHitRate: proteinHits / n, fiberHitRate: fiberHits / n, belowBMRShare: belowBMR / n,
    weekdayAvgBalance: weekdayCount ? weekdayBalanceSum / weekdayCount : null,
    weekendAvgBalance: weekendCount ? weekendBalanceSum / weekendCount : null,
    weightDelta, firstWeight, lastWeight, weightEntries: weightKeys.length,
  };
}

/* =========================================================================
   Insights (narrative summary)
   ========================================================================= */

function computeInsights() {
  const labels = buildRangeLabels(selectedRange, selectedDate);
  const stats = computeRangeStats(labels);
  const body = $('#insightsBody');

  if (stats.loggedDays < 2) {
    body.innerHTML = `<p>Sobald du an mehreren Tagen Mahlzeiten erfasst hast, zeige ich dir hier, wie sich deine Kalorienbilanz über die Zeit entwickelt &mdash; und ob sie zu deinem tatsächlichen Gewichtsverlauf passt.</p>`;
    return;
  }

  let actualLine, mismatchFlag = '';
  if (stats.weightEntries >= 2) {
    const actualKg = stats.weightDelta;
    actualLine = `<p>Dein tatsächliches Gewicht hat sich im selben Zeitraum um <strong>${actualKg <= 0 ? '' : '+'}${fmt(actualKg, 1)} kg</strong> verändert (${fmt(stats.firstWeight, 1)} → ${fmt(stats.lastWeight, 1)} kg).</p>`;
    const diff = Math.abs(actualKg - stats.predictedKg);
    mismatchFlag = diff > 0.6
      ? `<p><span class="insight-flag warn">Auffällig</span>Die berechnete Bilanz und dein gemessenes Gewicht weichen spürbar voneinander ab (${fmt(diff, 1)} kg Unterschied). Mögliche Gründe: ungenau geschätzte Portionsgrößen, vergessene kleine Snacks/Getränke, Wasser- und Salzhaushalt (besonders bei Zyklus, Stress oder viel Salz/Kohlenhydraten), oder eine falsch eingeschätzte Alltagsaktivität. Das ist normal &mdash; je konsequenter du trackst, desto klarer wird das Bild.</p>`
      : `<p><span class="insight-flag good">Stimmig</span>Deine berechnete Bilanz und dein gemessenes Gewicht passen gut zusammen &mdash; das Tracking scheint deine Realität aktuell gut abzubilden.</p>`;
  } else {
    actualLine = `<p>Trage an mehreren Tagen dein Gewicht ein, um zu sehen, ob deine Kalorienbilanz mit deiner tatsächlichen Gewichtsentwicklung übereinstimmt.</p>`;
  }

  const balanceState = stats.avgBalance <= 0
    ? `im Schnitt ein Defizit von <strong>${fmt(Math.abs(stats.avgBalance))} kcal/Tag</strong>`
    : `im Schnitt einen Überschuss von <strong>${fmt(stats.avgBalance)} kcal/Tag</strong>`;

  body.innerHTML = `
    <p>An ${stats.loggedDays} von ${stats.totalDays} Tagen (${stats.coveragePct}%) hast du Mahlzeiten erfasst. In dieser Zeit hattest du ${balanceState}, rechnerisch entspricht das ${stats.predictedKg <= 0 ? 'einem Verlust' : 'einer Zunahme'} von etwa <strong>${fmt(Math.abs(stats.predictedKg), 1)} kg</strong> Körperfett.</p>
    <p>Durchschnittlich verbrauchst du zusätzlich zu deinem Grundumsatz etwa <strong>${fmt(stats.avgActivityKcal)} kcal/Tag</strong> durch erfasste Bewegung (Sport, Spaziergänge, Alltagsbewegung).</p>
    ${actualLine}
    ${mismatchFlag}
    ${stats.coveragePct < 60 ? `<p><span class="insight-flag warn">Hinweis</span>Weniger als 60% der Tage sind erfasst &mdash; je lückenhafter das Tracking, desto unsicherer diese Einschätzung.</p>` : ''}
  `;
}

/* =========================================================================
   Analysis & tips (rule-based findings + "focus tip" progress tracking)
   ========================================================================= */

const METRIC_GETTERS = {
  'deficit-consistency': { label: 'Schwankung Tagesbilanz', unit: ' kcal', decimals: 0, get: (s) => s.stdDev },
  'protein-low': { label: 'Ø Eiweiß', unit: ' g/Tag', decimals: 0, get: (s) => s.avgProtein },
  'fiber-low': { label: 'Ø Ballaststoffe', unit: ' g/Tag', decimals: 0, get: (s) => s.avgFiber },
  'aggressive-deficit': { label: 'Tage unter Grundumsatz', unit: '%', decimals: 0, get: (s) => s.belowBMRShare * 100 },
  'low-neat': { label: 'Ø zusätzliche Bewegung', unit: ' kcal/Tag', decimals: 0, get: (s) => s.avgActivityKcal },
  'weekend-pattern': { label: 'Wochenende − Woche', unit: ' kcal', decimals: 0, get: (s) => (s.weekendAvgBalance != null && s.weekdayAvgBalance != null) ? (s.weekendAvgBalance - s.weekdayAvgBalance) : null },
  'tracking-coverage': { label: 'Erfasste Tage', unit: '%', decimals: 0, get: (s) => s.coveragePct },
  'good-consistency': { label: 'Erfasste Tage', unit: '%', decimals: 0, get: (s) => s.coveragePct },
  'plateau': { label: 'Gewichtsänderung', unit: ' kg', decimals: 1, get: (s) => s.weightDelta },
};

function generateFindings(cur, rangeDays) {
  const findings = [];

  if (cur.stdDev > 500) {
    findings.push({ id: 'deficit-consistency', status: 'tip', title: 'Deine Kalorienbilanz schwankt stark', desc: 'Von Tag zu Tag unterscheidet sich deine Bilanz im Schnitt um mehr als 500 kcal.', action: 'Versuche, an möglichst vielen Tagen ähnlich viel zu essen. Große Schwankungen machen es schwerer, echte Fortschritte von normalen Gewichtsschwankungen (Wasser, Verdauung) zu unterscheiden.' });
  } else {
    findings.push({ id: 'deficit-consistency', status: 'good', title: 'Deine Kalorienbilanz ist recht konstant', desc: 'Deine tägliche Bilanz schwankt nur wenig.', action: 'Das erleichtert es, echte Trends zu erkennen – weiter so.' });
  }

  if (cur.proteinHitRate < 0.6) {
    findings.push({ id: 'protein-low', status: 'tip', title: 'Eiweiß-Ziel selten erreicht', desc: `Nur an ${Math.round(cur.proteinHitRate * 100)}% der erfassten Tage hast du dein Eiweiß-Ziel erreicht.`, action: 'Mehr Eiweiß (Quark, Joghurt, Hähnchen, Fisch, Linsen, Tofu) hält länger satt, schützt deine Muskelmasse im Defizit und hat beim Verdauen selbst einen höheren Energieverbrauch als Fett oder Kohlenhydrate.' });
  } else {
    findings.push({ id: 'protein-low', status: 'good', title: 'Eiweiß-Versorgung solide', desc: 'Du erreichst dein Eiweiß-Ziel an den meisten Tagen.', action: 'Das unterstützt Sättigung und den Erhalt von Muskelmasse im Defizit.' });
  }

  if (cur.fiberHitRate < 0.5) {
    findings.push({ id: 'fiber-low', status: 'tip', title: 'Ballaststoffe oft unter dem Ziel', desc: `An ${Math.round(cur.fiberHitRate * 100)}% der Tage erreichst du dein Ballaststoff-Ziel.`, action: 'Vollkornprodukte, Hülsenfrüchte, Gemüse und Obst erhöhen die Sättigung pro Kalorie und unterstützen die Verdauung – oft ein unterschätzter Hebel gegen Heißhunger.' });
  }

  if (cur.belowBMRShare > 0.3) {
    findings.push({ id: 'aggressive-deficit', status: 'warn', title: 'Häufig unter dem Grundumsatz gegessen', desc: `An ${Math.round(cur.belowBMRShare * 100)}% der Tage lag deine Kalorienzufuhr unter deinem geschätzten Grundumsatz.`, action: 'Dauerhaft unter dem Grundumsatz zu essen ist selten nötig, schwer durchzuhalten und kann Energie, Konzentration und Stimmung verschlechtern. Ein moderates, aber stabiles Defizit lässt sich meist besser durchhalten und ist nachhaltiger für den Stoffwechsel.' });
  }

  if (cur.avgActivityKcal < 150) {
    findings.push({ id: 'low-neat', status: 'tip', title: 'Wenig erfasste Alltagsbewegung', desc: `Im Schnitt ${fmt(cur.avgActivityKcal)} kcal/Tag zusätzliche Bewegung.`, action: 'Kleine, leicht wiederholbare Portionen Bewegung – Treppen statt Aufzug, ein täglicher Spaziergang, den Hund eine Runde mehr ausführen – erhöhen deinen Gesamtverbrauch oft nachhaltiger als ein einzelnes intensives Workout pro Woche.' });
  } else if (cur.avgActivityKcal >= 400) {
    findings.push({ id: 'low-neat', status: 'good', title: 'Viel Alltagsbewegung erfasst', desc: `Im Schnitt ${fmt(cur.avgActivityKcal)} kcal/Tag zusätzliche Bewegung.`, action: 'Das trägt spürbar zu deinem Gesamtverbrauch bei – eine der zuverlässigsten Stellschrauben für ein Defizit.' });
  }

  if (cur.weekdayAvgBalance != null && cur.weekendAvgBalance != null) {
    const diff = cur.weekendAvgBalance - cur.weekdayAvgBalance;
    if (diff > 400) {
      findings.push({ id: 'weekend-pattern', status: 'tip', title: 'Am Wochenende deutlich mehr als unter der Woche', desc: `Deine Bilanz ist am Wochenende im Schnitt ${fmt(diff)} kcal höher als unter der Woche.`, action: 'Ein sehr häufiges Muster. Schon kleine, bewusste Anpassungen an ein bis zwei Wochenend-Mahlzeiten können die Wochenbilanz spürbar verändern, ohne dass du dir das ganze Wochenende einschränken musst.' });
    }
  }

  if (cur.coveragePct < 60) {
    findings.push({ id: 'tracking-coverage', status: 'tip', title: 'Lückenhaftes Tracking', desc: `Nur an ${cur.coveragePct}% der Tage in diesem Zeitraum hast du Mahlzeiten erfasst.`, action: 'Je lückenloser du trackst – auch grob geschätzt –, desto verlässlicher werden alle Auswertungen hier. Lieber ein ungefährer Eintrag als gar keiner.' });
  } else if (cur.coveragePct >= 85) {
    findings.push({ id: 'good-consistency', status: 'good', title: 'Sehr konsistentes Tracking', desc: `${cur.coveragePct}% der Tage erfasst.`, action: 'Das ist die wichtigste Grundlage für verlässliche Erkenntnisse aus deinen Daten.' });
  }

  if (rangeDays >= 14 && cur.weightEntries >= 2) {
    const predictedAbs = Math.abs(cur.predictedKg);
    const actualAbs = Math.abs(cur.weightDelta || 0);
    if (cur.avgBalance < -150 && actualAbs < 0.3 && predictedAbs > 0.5) {
      findings.push({
        id: 'plateau', status: 'warn', title: 'Gewicht bewegt sich kaum trotz rechnerischem Defizit',
        desc: `Rechnerisch stünde ein Verlust von ca. ${fmt(predictedAbs, 1)} kg an, gemessen hat sich dein Gewicht aber kaum verändert.`,
        action: 'Mögliche Gründe: Portionsgrößen und „unsichtbare" Kalorien (Öl, Saucen, Snacks) werden leicht unterschätzt; Wasser-/Salzhaushalt (Zyklus, Stress, Salz, neues Training) kann mehrere Tage überlagern; dein Grundumsatz sinkt mit sinkendem Gewicht mit, daher lohnt es sich, dein Gewicht im Profil aktuell zu halten. Falls sich über mehrere Wochen nichts tut, kann eine bewusste 1–2-wöchige Pause auf Erhaltungskalorien helfen, bevor es weitergeht.',
      });
    }
  }

  return findings;
}

function renderFindings() {
  const labels = buildRangeLabels(selectedRange, selectedDate);
  const cur = computeRangeStats(labels);
  const grid = $('#findingsGrid');

  if (cur.loggedDays < 3) {
    grid.innerHTML = `<p class="hint">Sobald du an mindestens 3 Tagen in diesem Zeitraum Mahlzeiten erfasst hast, gebe ich dir hier konkrete Tipps zur Verbesserung.</p>`;
    $('#focusTipsBlock').innerHTML = '';
    return;
  }

  const findings = generateFindings(cur, selectedRange);
  const pins = loadFocusTips();

  grid.innerHTML = findings.map((f) => {
    const m = METRIC_GETTERS[f.id];
    const curVal = m ? m.get(cur) : null;
    const metricLine = (m && curVal != null)
      ? `<p class="finding-metric">${m.label}: ${fmt(curVal, m.decimals)}${m.unit}</p>` : '';
    const pinned = pins.some((p) => p.id === f.id);
    const statusLabel = f.status === 'good' ? 'Läuft gut' : (f.status === 'warn' ? 'Achtung' : 'Tipp');
    return `
      <div class="finding-card finding-${f.status}">
        <div class="finding-head">
          <span class="insight-flag ${f.status}">${statusLabel}</span>
          <button type="button" class="pin-btn" data-pin-id="${f.id}" data-pin-title="${escapeHtml(f.title)}">${pinned ? '📌 Fokus entfernen' : '📌 Als Fokus merken'}</button>
        </div>
        <h4>${f.title}</h4>
        <p>${f.desc}</p>
        <p class="finding-action">${f.action}</p>
        ${metricLine}
      </div>`;
  }).join('') || `<p class="hint">Aktuell keine besonderen Auffälligkeiten – weiter so.</p>`;

  renderFocusPanel(cur);
}

function renderFocusPanel(cur) {
  const pins = loadFocusTips();
  const block = $('#focusTipsBlock');
  if (!pins.length) { block.innerHTML = ''; return; }
  block.innerHTML = `<h3>Deine Fokus-Tipps</h3><div class="focus-list">${pins.map((p) => {
    const m = METRIC_GETTERS[p.id];
    const nowVal = m ? m.get(cur) : null;
    let deltaText = '';
    if (m && nowVal != null && p.baselineValue != null) {
      const delta = nowVal - p.baselineValue;
      deltaText = ` · ${m.label} damals: ${fmt(p.baselineValue, m.decimals)}${m.unit} → jetzt: ${fmt(nowVal, m.decimals)}${m.unit} (${delta >= 0 ? '+' : ''}${fmt(delta, m.decimals)}${m.unit})`;
    }
    return `<div class="focus-item">
      <div class="focus-item-main">
        <div class="focus-item-title">${escapeHtml(p.title)}</div>
        <div class="focus-item-detail">Gemerkt am ${longLabel(p.pinnedAt)}${deltaText}</div>
      </div>
      <button class="log-item-remove" data-unpin-id="${p.id}" aria-label="Fokus entfernen" title="Fokus entfernen">✕</button>
    </div>`;
  }).join('')}</div>`;
}

/* =========================================================================
   Render all
   ========================================================================= */

function renderAll() {
  $('#dayPicker').value = selectedDate;
  renderStatTiles();
  renderMacroBars();
  renderFoodList();
  renderActivityList();
  const dayObj = getDay(selectedDate);
  $('#weightInput').value = dayObj.weightKg != null ? dayObj.weightKg : '';
  renderCharts();
  computeInsights();
  renderFindings();
}

/* =========================================================================
   Setup: food datalist, activity select
   ========================================================================= */

function setupStaticLists() {
  $('#foodList').innerHTML = FOOD_DB.map((f) => `<option value="${escapeHtml(f.name)}">`).join('');
  $('#activityType').innerHTML = Object.keys(ACTIVITY_MET).map((k) => `<option value="${escapeHtml(k)}">${escapeHtml(k)}</option>`).join('');
}

/* =========================================================================
   Event wiring
   ========================================================================= */

function wireEvents() {
  $('#dayPicker').addEventListener('change', (e) => { selectedDate = e.target.value || todayKey(); renderAll(); });
  $('#prevDay').addEventListener('click', () => { selectedDate = addDays(selectedDate, -1); renderAll(); });
  $('#nextDay').addEventListener('click', () => { selectedDate = addDays(selectedDate, 1); renderAll(); });
  $('#todayBtn').addEventListener('click', () => { selectedDate = todayKey(); renderAll(); });

  $('#rangeToggle').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-range]');
    if (!btn) return;
    selectedRange = Number(btn.dataset.range);
    $$('#rangeToggle button').forEach((b) => b.classList.toggle('active', b === btn));
    renderCharts();
    computeInsights();
    renderFindings();
  });

  $('#foodForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#foodName').value.trim();
    const grams = Number($('#foodGrams').value) || 100;
    const manualKcal = $('#foodKcalManual').value;
    const known = FOOD_DB.find((f) => f.name.toLowerCase() === name.toLowerCase());
    let entry;
    if (manualKcal !== '') {
      entry = {
        name, grams: null,
        kcal: Number(manualKcal) || 0,
        protein: Number($('#foodProteinManual').value) || 0,
        carbs: Number($('#foodCarbsManual').value) || 0,
        fat: Number($('#foodFatManual').value) || 0,
        fiber: Number($('#foodFiberManual').value) || 0,
      };
    } else if (known) {
      const factor = grams / 100;
      entry = { name, grams, kcal: known.kcal * factor, protein: known.protein * factor, carbs: known.carbs * factor, fat: known.fat * factor, fiber: known.fiber * factor };
    } else {
      alert('Unbekanntes Lebensmittel: Bitte über "Manuell eingeben" die Nährwerte ergänzen (kcal ist Pflichtfeld dafür).');
      return;
    }
    addFoodEntry(selectedDate, entry);
    e.target.reset(); $('#foodGrams').value = 100;
    ['#foodKcalManual', '#foodProteinManual', '#foodCarbsManual', '#foodFatManual', '#foodFiberManual'].forEach((s) => $(s).value = '');
    renderAll();
  });

  $('#foodLogList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove-food]');
    if (!btn) return;
    removeFoodEntry(selectedDate, btn.dataset.removeFood);
    renderAll();
  });

  $('#activityForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const type = $('#activityType').value;
    const minutes = Number($('#activityMinutes').value) || 0;
    const manualKcal = $('#activityKcalManual').value;
    const weightKg = getLatestWeightUpTo(selectedDate);
    let kcal;
    if (manualKcal !== '') {
      kcal = Number(manualKcal) || 0;
    } else {
      const met = ACTIVITY_MET[type];
      if (met == null) { alert('Für "Manuell" bitte kcal unter "Kalorien manuell eingeben" angeben.'); return; }
      kcal = met * 3.5 * weightKg / 200 * minutes;
    }
    addActivityEntry(selectedDate, { type, minutes, kcal });
    e.target.reset(); $('#activityMinutes').value = 30; $('#activityKcalManual').value = '';
    renderAll();
  });

  $('#activityLogList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove-activity]');
    if (!btn) return;
    removeActivityEntry(selectedDate, btn.dataset.removeActivity);
    renderAll();
  });

  $('#weightForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = $('#weightInput').value;
    setWeight(selectedDate, val === '' ? null : Number(val));
    renderAll();
  });

  $('#themeToggle').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEYS.theme, next);
    renderCharts();
  });

  $('#findingsGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-pin-id]');
    if (!btn) return;
    const id = btn.dataset.pinId, title = btn.dataset.pinTitle;
    let pins = loadFocusTips();
    if (pins.some((p) => p.id === id)) {
      pins = pins.filter((p) => p.id !== id);
    } else {
      const labels = buildRangeLabels(selectedRange, selectedDate);
      const cur = computeRangeStats(labels);
      const m = METRIC_GETTERS[id];
      const baselineValue = m ? m.get(cur) : null;
      pins.push({ id, title, pinnedAt: selectedDate, baselineValue });
    }
    saveFocusTips(pins);
    renderFindings();
  });

  $('#focusTipsBlock').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-unpin-id]');
    if (!btn) return;
    saveFocusTips(loadFocusTips().filter((p) => p.id !== btn.dataset.unpinId));
    renderFindings();
  });

  $('#settingsBtn').addEventListener('click', openSettings);
  $('#settingsCancel').addEventListener('click', closeSettings);
  $('#settingsModal').addEventListener('click', (e) => { if (e.target === $('#settingsModal')) closeSettings(); });
  $('#settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    profile = {
      sex: $('#pSex').value,
      age: Number($('#pAge').value),
      heightCm: Number($('#pHeight').value),
      weightKg: Number($('#pWeight').value),
      activityFactor: Number($('#pActivity').value),
      proteinPerKg: Number($('#pProtein').value),
      fatPerKg: Number($('#pFat').value),
      fiberTarget: Number($('#pFiber').value),
      deficitTarget: Number($('#pDeficit').value),
    };
    saveProfile(profile);
    closeSettings();
    renderAll();
  });

  $('#exportBtn').addEventListener('click', () => {
    const data = { profile, days };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `dashboard-export-${todayKey()}.json`;
    a.click();
  });
  $('#importBtn').addEventListener('click', () => $('#importFile').click());
  $('#importFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.profile) { profile = Object.assign(defaultProfile(), data.profile); saveProfile(profile); }
        if (data.days) { days = data.days; saveDays(days); }
        renderAll();
        alert('Daten erfolgreich importiert.');
      } catch (err) { alert('Import fehlgeschlagen: Datei ist kein gültiges Export-JSON.'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  });
}

function openSettings() {
  $('#pSex').value = profile.sex;
  $('#pAge').value = profile.age;
  $('#pHeight').value = profile.heightCm;
  $('#pWeight').value = profile.weightKg;
  $('#pActivity').value = profile.activityFactor;
  $('#pProtein').value = profile.proteinPerKg;
  $('#pFat').value = profile.fatPerKg;
  $('#pFiber').value = profile.fiberTarget;
  $('#pDeficit').value = profile.deficitTarget;
  $('#settingsModal').hidden = false;
}
function closeSettings() { $('#settingsModal').hidden = true; }

/* =========================================================================
   Init
   ========================================================================= */

function init() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

  setupStaticLists();
  wireEvents();
  renderAll();

  if (firstRun) openSettings();
}

document.addEventListener('DOMContentLoaded', init);
