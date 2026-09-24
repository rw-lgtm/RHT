'use strict';

/* =========================================================================
   Data: quick-pick food database (values per 100 g) and activity MET table
   ========================================================================= */

const FOOD_DB = [
  { name: 'Hähnchenbrust (roh)', kcal: 110, protein: 23, carbs: 0, fat: 2, fiber: 0 },
  { name: 'Rinderhack (gemischt)', kcal: 254, protein: 17, carbs: 0, fat: 20, fiber: 0 },
  { name: 'Lachs (roh)', kcal: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
  { name: 'Ei (ganz)', kcal: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, gramsPerPiece: 53 },
  { name: 'Magerquark', kcal: 67, protein: 12, carbs: 4, fat: 0.2, fiber: 0 },
  { name: 'Naturjoghurt 3,5%', kcal: 66, protein: 3.5, carbs: 4.7, fat: 3.5, fiber: 0 },
  { name: 'Griechischer Joghurt 10%', kcal: 133, protein: 5.7, carbs: 4, fat: 10, fiber: 0 },
  { name: 'Milch 3,5%', kcal: 64, protein: 3.4, carbs: 4.8, fat: 3.6, fiber: 0 },
  { name: 'Vollkornreis (gekocht)', kcal: 123, protein: 2.6, carbs: 25, fat: 1, fiber: 1.8 },
  { name: 'Weißer Reis (gekocht)', kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
  { name: 'Vollkornnudeln (gekocht)', kcal: 124, protein: 5, carbs: 25, fat: 1, fiber: 4 },
  { name: 'Kartoffeln (gekocht)', kcal: 87, protein: 2, carbs: 20, fat: 0.1, fiber: 1.8, gramsPerPiece: 150 },
  { name: 'Süßkartoffel (gekocht)', kcal: 90, protein: 2, carbs: 21, fat: 0.1, fiber: 3, gramsPerPiece: 200 },
  { name: 'Haferflocken (roh)', kcal: 372, protein: 13, carbs: 60, fat: 7, fiber: 10 },
  { name: 'Vollkornbrot', kcal: 216, protein: 8, carbs: 40, fat: 3, fiber: 7 },
  { name: 'Weißbrot', kcal: 265, protein: 9, carbs: 49, fat: 3.2, fiber: 2.7 },
  { name: 'Banane', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, gramsPerPiece: 120 },
  { name: 'Apfel', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, gramsPerPiece: 150 },
  { name: 'Beeren (gemischt)', kcal: 50, protein: 0.8, carbs: 11, fat: 0.4, fiber: 3 },
  { name: 'Brokkoli (gekocht)', kcal: 35, protein: 2.4, carbs: 7, fat: 0.4, fiber: 3.3 },
  { name: 'Gemüse gemischt / Salat', kcal: 25, protein: 2, carbs: 4, fat: 0.3, fiber: 2 },
  { name: 'Tomate', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, gramsPerPiece: 120 },
  { name: 'Avocado', kcal: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, gramsPerPiece: 200 },
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

  // Vom Nutzer ergänzt: aus Etikett-Fotos (exakt) oder Standard-Nährwerttabellen (Richtwerte)
  { name: 'Hafermilch (Oatly Barista)', kcal: 61, protein: 1.1, carbs: 7.1, fat: 3.0, fiber: 0.8 },
  { name: 'Cottage Cheese', kcal: 92, protein: 12, carbs: 1.6, fat: 4.2, fiber: 0 },
  { name: 'Kefir 1,5%', kcal: 45, protein: 3.8, carbs: 4.1, fat: 1.5, fiber: 0 },
  { name: 'Karotten (roh)', kcal: 35, protein: 0.9, carbs: 6.5, fat: 0.2, fiber: 2.9, gramsPerPiece: 60 },
  { name: 'Spitzkraut (roh)', kcal: 24, protein: 1.4, carbs: 3.5, fat: 0.2, fiber: 2.8 },
  { name: 'Halloumi', kcal: 320, protein: 22, carbs: 2, fat: 25, fiber: 0 },
  { name: 'Feta', kcal: 264, protein: 14, carbs: 1.5, fat: 22, fiber: 0 },
  { name: 'Gemüsebrühe (zubereitet)', kcal: 3, protein: 0.3, carbs: 0.4, fat: 0.1, fiber: 0 },
  { name: 'Hühnerbrühe (zubereitet)', kcal: 7, protein: 0.6, carbs: 0.3, fat: 0.4, fiber: 0 },
  { name: 'Rinderbrühe (zubereitet)', kcal: 9, protein: 0.8, carbs: 0.3, fat: 0.5, fiber: 0 },
  { name: 'Pasta (gekocht)', kcal: 131, protein: 5, carbs: 25, fat: 1.1, fiber: 1.8 },
  { name: 'Zucchini (roh)', kcal: 17, protein: 1.2, carbs: 2.1, fat: 0.3, fiber: 1.1, gramsPerPiece: 200 },
  { name: 'Hühnchen (gegart)', kcal: 190, protein: 24, carbs: 0, fat: 10, fiber: 0 },
  { name: 'Ayran', kcal: 37, protein: 1.6, carbs: 2.5, fat: 1.8, fiber: 0 },
  { name: 'Cashewkerne', kcal: 553, protein: 18, carbs: 30, fat: 44, fiber: 3.3 },
  { name: 'Schafjoghurt', kcal: 108, protein: 4.5, carbs: 4.5, fat: 7.0, fiber: 0 },
  { name: 'Kaffee (schwarz)', kcal: 1, protein: 0.1, carbs: 0, fat: 0, fiber: 0 },
  { name: 'Kürbis (Hokkaido, roh)', kcal: 31, protein: 1.0, carbs: 5.5, fat: 0.2, fiber: 1.5 },
  { name: 'Couscous (gekocht)', kcal: 112, protein: 3.8, carbs: 23, fat: 0.2, fiber: 1.4 },
  { name: 'Bulgur (gekocht)', kcal: 83, protein: 3.1, carbs: 18.6, fat: 0.2, fiber: 4.5 },
  { name: 'Leinöl', kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
  { name: 'Zwetschgen', kcal: 46, protein: 0.7, carbs: 9.6, fat: 0.3, fiber: 1.9, gramsPerPiece: 15 },
  { name: 'Topfen 20%', kcal: 98, protein: 12, carbs: 4, fat: 4.1, fiber: 0 },
  { name: 'Weißwein (trocken)', kcal: 82, protein: 0.1, carbs: 2.5, fat: 0, fiber: 0 },
  { name: 'Rotwein (trocken)', kcal: 85, protein: 0.1, carbs: 2.6, fat: 0, fiber: 0 },
  { name: 'Bier (Pils)', kcal: 43, protein: 0.5, carbs: 3.2, fat: 0, fiber: 0 },
  { name: 'Sauerteigbrot (Roggen)', kcal: 220, protein: 7, carbs: 42, fat: 1.5, fiber: 6 },
  { name: 'Iglo Cremespinat', kcal: 65, protein: 2.3, carbs: 3.0, fat: 4.5, fiber: 2.0 },
  { name: 'Bio Frankfurter Würstchen', kcal: 260, protein: 11, carbs: 1.5, fat: 24, fiber: 0, gramsPerPiece: 50 },
  { name: 'Dinkelbrot (hell)', kcal: 245, protein: 8, carbs: 47, fat: 1.8, fiber: 3.5 },
  { name: 'Cannellini Bohnen (abgetropft)', kcal: 93, protein: 6.4, carbs: 13, fat: 0.4, fiber: 5.9 },
  { name: 'Schwarzkohl (roh)', kcal: 49, protein: 4.3, carbs: 5.4, fat: 0.9, fiber: 4.0 },
  { name: 'Pecorino', kcal: 390, protein: 28, carbs: 1, fat: 30, fiber: 0 },
  { name: 'Stangensellerie (roh)', kcal: 16, protein: 0.7, carbs: 3.0, fat: 0.2, fiber: 1.6, gramsPerPiece: 40 },
  { name: 'Grieß (Hartweizen)', kcal: 352, protein: 12.7, carbs: 72, fat: 1.1, fiber: 3.9 },
  { name: 'Petersilie (frisch)', kcal: 36, protein: 3.0, carbs: 6.3, fat: 0.8, fiber: 3.3 },
  { name: 'Basilikum (frisch)', kcal: 23, protein: 3.2, carbs: 2.7, fat: 0.6, fiber: 1.6 },
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
const UNIT_LABELS = { g: 'g', ml: 'ml', stk: 'Stück' };

/* =========================================================================
   Health/cycle tracking: symptoms (angelehnt an die Menopause Rating Scale)
   ========================================================================= */

const SYMPTOMS = [
  { id: 'hitzewallungen', short: 'Wallungen', full: 'Hitzewallungen' },
  { id: 'nachtschweiss', short: 'Nachtschw.', full: 'Nachtschweiß' },
  { id: 'schwitzenAllg', short: 'Schwitzen', full: 'Schwitzen allgemein' },
  { id: 'schlafprobleme', short: 'Schlafprobl.', full: 'Schlafprobleme' },
  { id: 'erschoepfung', short: 'Erschöpfung', full: 'Erschöpfung' },
  { id: 'herzklopfen', short: 'Herzklopfen', full: 'Herzklopfen' },
  { id: 'reizbarkeit', short: 'Reizbarkeit', full: 'Reizbarkeit' },
  { id: 'niedergeschlagenheit', short: 'Niederg.', full: 'Niedergeschlagenheit' },
  { id: 'aengstlichkeit', short: 'Ängstlichk.', full: 'Ängstlichkeit' },
  { id: 'konzentration', short: 'Konzentr.', full: 'Konzentrationsprobleme' },
  { id: 'kopfschmerzen', short: 'Kopfschm.', full: 'Kopfschmerzen' },
  { id: 'brustspannen', short: 'Brustspannen', full: 'Brustspannen' },
  { id: 'gelenkschmerzen', short: 'Gelenk/Muskel', full: 'Gelenk-/Muskelschmerzen' },
  { id: 'blaehbauch', short: 'Blähbauch', full: 'Blähbauch' },
  { id: 'libido', short: 'Libido', full: 'Verminderte Libido' },
  { id: 'scheidentrockenheit', short: 'Trockenheit', full: 'Scheidentrockenheit' },
  { id: 'blasenbeschwerden', short: 'Blase', full: 'Blasenbeschwerden' },
];

const UMSTAENDE = [
  { id: 'stress', short: 'Stress', full: 'Stress' },
  { id: 'alkohol', short: 'Alkohol', full: 'Alkohol' },
  { id: 'koffeinNachmittag', short: 'Koffein nachm.', full: 'Koffein nachmittags' },
  { id: 'sport', short: 'Sport', full: 'Sport' },
  { id: 'krank', short: 'Krank', full: 'Krank' },
  { id: 'reise', short: 'Reise', full: 'Reise' },
  { id: 'schlechtGeschlafenAnders', short: 'Schlecht geschlafen', full: 'Schlecht geschlafen (anderer Grund)' },
];

const BLUTUNG_LABELS = { 0: 'Keine', 1: 'Schmier', 2: 'Leicht', 3: 'Mittel', 4: 'Stark' };
const SCHLAF_LABELS = { 0: 'schlecht', 1: 'mäßig', 2: 'gut', 3: 'sehr gut' };

/* =========================================================================
   Storage
   ========================================================================= */

const STORAGE_KEYS = { profile: 'nutrifit_profile_v1', days: 'nutrifit_days_v1', theme: 'nutrifit_theme_v1', focus: 'nutrifit_focus_v1', customFoods: 'nutrifit_customfoods_v1', recipes: 'nutrifit_recipes_v1' };

function defaultProfile() {
  return {
    sex: 'w', age: 30, heightCm: 170, weightKg: 70,
    activityFactor: 1.2, proteinPerKg: 1.8, fatPerKg: 0.8,
    fiberTarget: 30, deficitTarget: 500,
    trackCycle: false, cycleLengthDays: 28, periodLengthDays: 5,
    mlPerKgWater: 30, mlPerActiveMinuteWater: 10,
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

function loadCustomFoods() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.customFoods)) || []; } catch (e) { return []; }
}
function saveCustomFoods(list) { localStorage.setItem(STORAGE_KEYS.customFoods, JSON.stringify(list)); }
function upsertCustomFood(food) {
  const list = loadCustomFoods().filter((f) => f.name.toLowerCase() !== food.name.toLowerCase());
  list.push(food);
  saveCustomFoods(list);
}
function loadRecipes() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.recipes)) || []; } catch (e) { return []; }
}
function saveRecipes(list) { localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(list)); }
function upsertRecipe(recipe) {
  const list = loadRecipes().filter((r) => r.id !== recipe.id);
  list.push(recipe);
  saveRecipes(list);
}
function deleteRecipeById(id) { saveRecipes(loadRecipes().filter((r) => r.id !== id)); }

function getFoodDB() { return loadCustomFoods().concat(loadRecipes()).concat(FOOD_DB); }

/* =========================================================================
   State
   ========================================================================= */

let profile = loadProfile();
let firstRun = !profile;
if (!profile) profile = defaultProfile();

let days = loadDays();
let selectedDate = todayKey();
let selectedRange = 7;
let pendingOcrFood = null; // { kcal, protein, carbs, fat, fiber } per 100 g, staged from a scanned photo

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

function ensureHealthShape(day) {
  if (!day.health) day.health = {};
  const h = day.health;
  if (h.blutung === undefined) h.blutung = null;
  if (!h.symptome) h.symptome = {};
  SYMPTOMS.forEach((s) => { if (h.symptome[s.id] === undefined) h.symptome[s.id] = null; });
  if (h.hitzewallungenAnzahl === undefined) h.hitzewallungenAnzahl = null;
  if (!h.zyklusZeichen) h.zyklusZeichen = {};
  if (h.zyklusZeichen.zervixschleim === undefined) h.zyklusZeichen.zervixschleim = null;
  if (h.zyklusZeichen.mittelschmerz === undefined) h.zyklusZeichen.mittelschmerz = false;
  if (h.zyklusZeichen.kraempfe === undefined) h.zyklusZeichen.kraempfe = false;
  if (!h.umstaende) h.umstaende = {};
  UMSTAENDE.forEach((u) => { if (h.umstaende[u.id] === undefined) h.umstaende[u.id] = false; });
  if (h.duloxetin === undefined) h.duloxetin = null;
  if (h.schlaf === undefined) h.schlaf = null;
  if (h.notiz === undefined) h.notiz = '';
  return h;
}

function getDay(key) {
  const day = days[key] || { weightKg: null, food: [], activities: [] };
  if (!day.water) day.water = [];
  ensureHealthShape(day);
  return day;
}
function ensureDay(key) {
  if (!days[key]) days[key] = { weightKg: null, food: [], activities: [] };
  if (!days[key].water) days[key].water = [];
  ensureHealthShape(days[key]);
  return days[key];
}

function updateHealth(key, patchFn) {
  const day = ensureDay(key);
  patchFn(day.health);
  saveDays(days);
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

function addWaterEntry(key, ml) {
  const day = ensureDay(key);
  day.water.push({ id: uid(), ml });
  saveDays(days);
}
function removeWaterEntry(key, id) {
  const day = ensureDay(key);
  day.water = day.water.filter((w) => w.id !== id);
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
   Cycle tracking (optional, informational only)
   ========================================================================= */

function togglePeriod(key) {
  const day = ensureDay(key);
  day.period = !day.period;
  saveDays(days);
}

function isBleedingDay(key) {
  const day = days[key];
  if (!day) return false;
  return !!day.period || (day.health && day.health.blutung != null && day.health.blutung >= 1);
}

function findPeriodStarts() {
  const marked = Object.keys(days).filter((k) => isBleedingDay(k)).sort();
  const starts = [];
  let prev = null;
  marked.forEach((k) => {
    if (prev === null || addDays(prev, 1) !== k) starts.push(k);
    prev = k;
  });
  return starts;
}

function getCyclePhase(key) {
  if (!profile.trackCycle) return null;
  const isPeriod = isBleedingDay(key);
  const starts = findPeriodStarts().filter((s) => s <= key);
  if (!starts.length) return { isPeriod, phase: isPeriod ? 'Periode' : null, dayOfCycle: null };
  const lastStart = starts[starts.length - 1];
  const dayOfCycle = Math.round((keyToDate(key) - keyToDate(lastStart)) / 86400000) + 1;
  const cycleLen = profile.cycleLengthDays || 28;
  const periodLen = profile.periodLengthDays || 5;
  let phase;
  if (dayOfCycle <= periodLen) phase = 'Periode';
  else if (dayOfCycle <= Math.round(cycleLen / 2) - 2) phase = 'Follikelphase';
  else if (dayOfCycle <= Math.round(cycleLen / 2) + 1) phase = 'Ovulation (geschätzt)';
  else phase = 'Lutealphase';
  return { isPeriod, phase, dayOfCycle };
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

function calcWaterTarget(p, weightKg, activityMinutesToday) {
  return weightKg * p.mlPerKgWater + activityMinutesToday * p.mlPerActiveMinuteWater;
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

function renderWaterCard() {
  const dayObj = getDay(selectedDate);
  const weightKg = getLatestWeightUpTo(selectedDate);
  const activityMinutes = dayObj.activities.reduce((s, a) => s + (a.minutes || 0), 0);
  const target = calcWaterTarget(profile, weightKg, activityMinutes);
  const consumed = dayObj.water.reduce((s, w) => s + w.ml, 0);
  const pct = target > 0 ? Math.min(100, (consumed / target) * 100) : 0;

  $('#waterBar').innerHTML = `
    <div class="macro-row">
      <span class="macro-label">Wasser</span>
      <span class="macro-track"><span class="macro-fill" style="width:${pct}%;background:var(--series-1)"></span></span>
      <span class="macro-value">${fmt(consumed)} / ${fmt(target)} ml</span>
    </div>`;

  const list = $('#waterLogList');
  if (!dayObj.water.length) { list.innerHTML = `<li class="log-empty">Noch kein Wasser erfasst heute.</li>`; return; }
  list.innerHTML = dayObj.water.map((w) => `
    <li>
      <div class="log-item-main"><div class="log-item-name">${fmt(w.ml)} ml</div></div>
      <button class="log-item-remove" data-remove-water="${w.id}" aria-label="Eintrag löschen" title="Löschen">✕</button>
    </li>`).join('');
}

function setupHealthGrid() {
  $('#symptomGrid').innerHTML = SYMPTOMS.map((s) => `
    <div class="symptom-row" data-symptom="${s.id}">
      <span class="symptom-label" title="${escapeHtml(s.full)}">${escapeHtml(s.short)}</span>
      <div class="chip-group chip-group-sm">
        <button type="button" data-val="0">0</button>
        <button type="button" data-val="1">1</button>
        <button type="button" data-val="2">2</button>
        <button type="button" data-val="3">3</button>
      </div>
    </div>`).join('');
  $('#umstaendeGroup').innerHTML = UMSTAENDE.map((u) => `<button type="button" data-umstand="${u.id}" title="${escapeHtml(u.full)}">${escapeHtml(u.short)}</button>`).join('');
}

function renderHealthCard() {
  const day = getDay(selectedDate);
  const h = day.health;

  $$('#blutungGroup button').forEach((b) => b.classList.toggle('active', Number(b.dataset.val) === h.blutung));

  $$('#symptomGrid .symptom-row').forEach((row) => {
    const id = row.dataset.symptom;
    row.querySelectorAll('button').forEach((b) => b.classList.toggle('active', Number(b.dataset.val) === h.symptome[id]));
  });

  $('#hitzewallungenAnzahl').value = h.hitzewallungenAnzahl != null ? h.hitzewallungenAnzahl : '';

  $('#zervixschleim').value = h.zyklusZeichen.zervixschleim || '';
  $$('#zyklusZeichenToggles button').forEach((b) => b.classList.toggle('active', !!h.zyklusZeichen[b.dataset.field]));

  $$('#umstaendeGroup button').forEach((b) => b.classList.toggle('active', !!h.umstaende[b.dataset.umstand]));

  $$('#schlafGroup button').forEach((b) => b.classList.toggle('active', Number(b.dataset.val) === h.schlaf));

  $$('#duloxetinGroup button').forEach((b) => b.classList.toggle('active', h.duloxetin === (b.dataset.val === 'true')));

  $('#healthNotiz').value = h.notiz || '';

  const info = getCyclePhase(selectedDate);
  $('#healthCyclePhaseText').textContent = info && info.phase
    ? `Geschätzte Phase: ${info.phase}${info.dayOfCycle ? ` (Zyklustag ${info.dayOfCycle})` : ''}`
    : '';
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
        <div class="log-item-name">${escapeHtml(f.name)} ${f.amount != null ? `(${fmt(f.amount, f.unit === 'stk' ? 1 : 0)} ${UNIT_LABELS[f.unit] || 'g'})` : ''}</div>
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

function renderCycleRow() {
  const row = $('#cycleRow');
  if (!profile.trackCycle) { row.hidden = true; return; }
  row.hidden = false;
  const dayObj = getDay(selectedDate);
  const isPeriod = !!dayObj.period;
  const btn = $('#periodToggleBtn');
  btn.textContent = `Periode heute: ${isPeriod ? 'An' : 'Aus'}`;
  btn.classList.toggle('period-on', isPeriod);
  const info = getCyclePhase(selectedDate);
  $('#cyclePhaseText').textContent = info && info.phase
    ? `Geschätzte Phase: ${info.phase}${info.dayOfCycle ? ` (Zyklustag ${info.dayOfCycle})` : ''}`
    : 'Noch keine Periode erfasst, um eine Phase zu schätzen.';
}

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
function weightLineChart(container, labels, values, cycleFlags) {
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

  const legendItems = [{ label: 'Gewicht (Eintrag)', color: 'var(--text-muted)' }, { label: '7-Tage-Trend', color: 'var(--series-1)' }];
  let hasCycleMarks = false;
  if (cycleFlags) {
    const markY = margin.top + plotH + 3;
    labels.forEach((key, i) => {
      const flag = cycleFlags[i];
      if (!flag) return;
      hasCycleMarks = true;
      const color = flag === 'period' ? 'var(--diverging-warm)' : 'var(--series-4)';
      const mark = svgEl('rect', { x: xScale(i) - 3, y: markY, width: 6, height: 6, rx: 1.5, style: `fill:${color}` });
      mark.addEventListener('mousemove', (e) => showTooltip(e, `<strong>${longLabel(key)}</strong><br>${flag === 'period' ? 'Periode' : 'Lutealphase (geschätzt)'}`));
      mark.addEventListener('mouseleave', hideTooltip);
      svg.appendChild(mark);
    });
  }
  if (hasCycleMarks) legendItems.push({ label: 'Periode', color: 'var(--diverging-warm)' }, { label: 'Lutealphase (geschätzt)', color: 'var(--series-4)' });

  container.appendChild(svg);
  container.insertAdjacentHTML('beforeend', legendHtml(legendItems));
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

  const cycleFlags = profile.trackCycle ? labels.map((key) => {
    const info = getCyclePhase(key);
    if (!info) return null;
    if (info.isPeriod) return 'period';
    if (info.phase === 'Lutealphase') return 'luteal';
    return null;
  }) : null;
  weightLineChart($('#chartWeight'), labels, weight, cycleFlags);
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
    weightDelta, firstWeight, lastWeight, weightEntries: weightKeys.length, weightKeysList: weightKeys,
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
    if (diff > 0.6) {
      let cycleNote = '';
      if (profile.trackCycle) {
        const lastKey = stats.weightKeysList[stats.weightKeysList.length - 1];
        const info = getCyclePhase(lastKey);
        if (info && (info.isPeriod || info.phase === 'Lutealphase')) {
          cycleNote = ` Dein letzter Wiegetag fiel zudem in ${info.isPeriod ? 'deine Periode' : 'die Lutealphase'} &mdash; in dieser Zyklusphase ist Wassereinlagerung häufig und kann 1&ndash;3 kg zusätzliche, vorübergehende Gewichtsschwankung erklären, unabhängig vom Fettabbau.`;
        }
      }
      mismatchFlag = `<p><span class="insight-flag warn">Auffällig</span>Die berechnete Bilanz und dein gemessenes Gewicht weichen spürbar voneinander ab (${fmt(diff, 1)} kg Unterschied). Mögliche Gründe: ungenau geschätzte Portionsgrößen, vergessene kleine Snacks/Getränke, Wasser- und Salzhaushalt (besonders bei Zyklus, Stress oder viel Salz/Kohlenhydraten), oder eine falsch eingeschätzte Alltagsaktivität. Das ist normal &mdash; je konsequenter du trackst, desto klarer wird das Bild.${cycleNote}</p>`;
    } else {
      mismatchFlag = `<p><span class="insight-flag good">Stimmig</span>Deine berechnete Bilanz und dein gemessenes Gewicht passen gut zusammen &mdash; das Tracking scheint deine Realität aktuell gut abzubilden.</p>`;
    }
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
  renderWaterCard();
  renderHealthCard();
  renderFoodList();
  renderActivityList();
  const dayObj = getDay(selectedDate);
  $('#weightInput').value = dayObj.weightKg != null ? dayObj.weightKg : '';
  renderCycleRow();
  renderCharts();
  computeInsights();
  renderFindings();
}

/* =========================================================================
   OCR: scan a nutrition label photo and prefill food values
   ========================================================================= */

let tesseractLoadPromise = null;
function loadTesseract() {
  if (window.Tesseract) return Promise.resolve();
  if (!tesseractLoadPromise) {
    tesseractLoadPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Texterkennung konnte nicht geladen werden (Internetverbindung prüfen).'));
      document.head.appendChild(s);
    });
  }
  return tesseractLoadPromise;
}

function parseNutritionText(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const num = '(\\d{1,4}(?:[.,]\\d{1,2})?)';
  const patterns = [
    { key: 'kcal', re: new RegExp(num + '\\s*kcal', 'i') },
    { key: 'protein', re: new RegExp('(?:eiwei[ßs]\\w*|protein\\w*).*?' + num + '\\s*g', 'i') },
    { key: 'carbs', re: new RegExp('(?:kohlenhydrate\\w*|carbohydrate\\w*|carbs).*?' + num + '\\s*g', 'i'), skipIfStartsWith: 'davon' },
    { key: 'fat', re: new RegExp('(?:\\bfett\\b|\\bfat\\b).*?' + num + '\\s*g', 'i'), skipIfStartsWith: 'davon' },
    { key: 'fiber', re: new RegExp('(?:ballaststoffe\\w*|fib(?:er|re)\\w*).*?' + num + '\\s*g', 'i') },
  ];
  const result = {};
  lines.forEach((line) => {
    const lower = line.toLowerCase();
    patterns.forEach((p) => {
      if (result[p.key] != null) return;
      if (p.skipIfStartsWith && lower.startsWith(p.skipIfStartsWith)) return;
      const m = line.match(p.re);
      if (m) result[p.key] = parseFloat(m[1].replace(',', '.'));
    });
  });
  return result;
}

function renderOcrStatus(message) {
  const el = $('#ocrStatus');
  if (!pendingOcrFood && !message) { el.hidden = true; el.innerHTML = ''; el.classList.remove('ocr-pending'); return; }
  el.hidden = false;
  if (pendingOcrFood) {
    el.classList.add('ocr-pending');
    el.innerHTML = `${message || 'Werte aus Foto übernommen – bitte prüfen.'} Trage Namen und gegessene Menge in g oder ml oben ein und klicke „+ Hinzufügen“.<button type="button" id="ocrDiscardBtn">Scan verwerfen</button>`;
  } else {
    el.classList.remove('ocr-pending');
    el.textContent = message;
  }
}

async function handleNutritionPhoto(file) {
  renderOcrStatus('Lade Texterkennung… (einmalig, danach läuft alles lokal im Browser)');
  try {
    await loadTesseract();
    const { data } = await window.Tesseract.recognize(file, 'deu+eng', {
      logger: (m) => {
        if (m.status === 'recognizing text' && typeof m.progress === 'number') {
          renderOcrStatus(`Scanne Foto… ${Math.round(m.progress * 100)}%`);
        }
      },
    });
    const values = parseNutritionText(data.text);
    const found = Object.keys(values).length;
    if (!found) {
      pendingOcrFood = null;
      renderOcrStatus('Keine Nährwerte erkannt – bitte ein schärferes/gerades Foto versuchen oder manuell eingeben.');
      return;
    }
    pendingOcrFood = {
      kcal: values.kcal || 0, protein: values.protein || 0, carbs: values.carbs || 0,
      fat: values.fat || 0, fiber: values.fiber || 0,
    };
    $('#foodName').focus();
    renderOcrStatus(`${found} von 5 Werten erkannt (angenommen: pro 100 g).`);
  } catch (err) {
    pendingOcrFood = null;
    renderOcrStatus('Fehler bei der Texterkennung: ' + err.message);
  }
}

/* =========================================================================
   Recipes: build a home-made dish from ingredients, computed per 100 g/ml
   ========================================================================= */

let recipeEditId = null;

function resolveIngredientGrams(name, amount, unit) {
  const food = getFoodDB().find((f) => f.name.toLowerCase() === name.toLowerCase());
  if (!food) return { error: `Unbekannte Zutat: "${name}". Bitte einen Namen aus der Liste wählen oder zuerst als Lebensmittel anlegen.` };
  if (unit === 'stk') {
    if (!food.gramsPerPiece) return { error: `Für "${food.name}" ist kein Stückgewicht hinterlegt – bitte g oder ml wählen.` };
    return { food, grams: amount * food.gramsPerPiece };
  }
  return { food, grams: amount };
}

function readIngredientRows() {
  return $$('#recipeIngredients .ingredient-row').map((row) => ({
    name: row.querySelector('.ingredient-name').value.trim(),
    amount: Number(row.querySelector('.ingredient-amount').value) || 0,
    unit: row.querySelector('.ingredient-unit').value,
  })).filter((r) => r.name);
}

function computeRecipeTotals() {
  const rows = readIngredientRows();
  const yieldAmount = Number($('#recipeYieldAmount').value) || 0;
  if (!rows.length) return { error: 'Bitte mindestens eine Zutat angeben.' };
  if (!yieldAmount) return { error: 'Bitte angeben, wie viel das Rezept insgesamt ergibt.' };
  const sum = { kcal: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
  for (const row of rows) {
    const resolved = resolveIngredientGrams(row.name, row.amount, row.unit);
    if (resolved.error) return { error: resolved.error };
    const factor = resolved.grams / 100;
    sum.kcal += resolved.food.kcal * factor;
    sum.protein += resolved.food.protein * factor;
    sum.carbs += resolved.food.carbs * factor;
    sum.fat += resolved.food.fat * factor;
    sum.fiber += resolved.food.fiber * factor;
  }
  const scale = 100 / yieldAmount;
  return {
    per100: { kcal: sum.kcal * scale, protein: sum.protein * scale, carbs: sum.carbs * scale, fat: sum.fat * scale, fiber: sum.fiber * scale },
    yieldAmount, yieldUnit: $('#recipeYieldUnit').value, ingredients: rows,
  };
}

function updateRecipePreview() {
  const result = computeRecipeTotals();
  const el = $('#recipePreview');
  if (result.error) { el.textContent = result.error; return; }
  const p = result.per100;
  el.textContent = `Pro 100 ${result.yieldUnit}: ${fmt(p.kcal)} kcal · E ${fmt(p.protein, 1)} g · K ${fmt(p.carbs, 1)} g · F ${fmt(p.fat, 1)} g · Ba ${fmt(p.fiber, 1)} g`;
}

function addIngredientRow(prefill) {
  const row = document.createElement('div');
  row.className = 'ingredient-row';
  row.innerHTML = `
    <input list="foodList" class="ingredient-name" placeholder="Zutat" required autocomplete="off">
    <input type="number" class="ingredient-amount" placeholder="Menge" min="0.1" step="0.1" required>
    <select class="ingredient-unit">
      <option value="g">g</option>
      <option value="ml">ml</option>
      <option value="stk">Stück</option>
    </select>
    <button type="button" class="ingredient-remove log-item-remove" aria-label="Zutat entfernen" title="Entfernen">✕</button>
  `;
  if (prefill) {
    row.querySelector('.ingredient-name').value = prefill.name;
    row.querySelector('.ingredient-amount').value = prefill.amount;
    row.querySelector('.ingredient-unit').value = prefill.unit;
  }
  row.querySelectorAll('input, select').forEach((el) => el.addEventListener('input', updateRecipePreview));
  row.querySelector('.ingredient-remove').addEventListener('click', () => { row.remove(); updateRecipePreview(); });
  $('#recipeIngredients').appendChild(row);
}

function resetRecipeForm() {
  recipeEditId = null;
  $('#recipeForm').reset();
  $('#recipeIngredients').innerHTML = '';
  addIngredientRow();
  $('#recipeFormTitle').textContent = 'Neues Rezept';
  $('#recipeCancelEdit').hidden = true;
  updateRecipePreview();
}

function renderRecipeList() {
  const recipes = loadRecipes();
  const list = $('#recipeList');
  if (!recipes.length) { list.innerHTML = `<li class="log-empty">Noch keine Rezepte angelegt.</li>`; return; }
  list.innerHTML = recipes.map((r) => `
    <li>
      <div class="log-item-main">
        <div class="log-item-name">${escapeHtml(r.name)}</div>
        <div class="recipe-item-detail">pro 100 ${r.yieldUnit}: ${fmt(r.kcal)} kcal · E ${fmt(r.protein, 1)} g · K ${fmt(r.carbs, 1)} g · F ${fmt(r.fat, 1)} g · Ba ${fmt(r.fiber, 1)} g · ergibt ${fmt(r.yieldAmount)} ${r.yieldUnit}</div>
      </div>
      <div class="recipe-item-actions">
        <button type="button" data-edit-recipe="${r.id}">Bearbeiten</button>
        <button type="button" data-delete-recipe="${r.id}">Löschen</button>
      </div>
    </li>`).join('');
}

function openRecipeModal() {
  renderRecipeList();
  resetRecipeForm();
  $('#recipeModal').hidden = false;
}
function closeRecipeModal() { $('#recipeModal').hidden = true; }

function editRecipe(id) {
  const recipe = loadRecipes().find((r) => r.id === id);
  if (!recipe) return;
  recipeEditId = id;
  $('#recipeName').value = recipe.name;
  $('#recipeYieldAmount').value = recipe.yieldAmount;
  $('#recipeYieldUnit').value = recipe.yieldUnit;
  $('#recipeIngredients').innerHTML = '';
  recipe.ingredients.forEach((ing) => addIngredientRow(ing));
  $('#recipeFormTitle').textContent = `„${recipe.name}“ bearbeiten`;
  $('#recipeCancelEdit').hidden = false;
  updateRecipePreview();
}

/* =========================================================================
   Setup: food datalist, activity select
   ========================================================================= */

function setupStaticLists() {
  $('#foodList').innerHTML = getFoodDB().map((f) => `<option value="${escapeHtml(f.name)}">`).join('');
  $('#activityType').innerHTML = Object.keys(ACTIVITY_MET).map((k) => `<option value="${escapeHtml(k)}">${escapeHtml(k)}</option>`).join('');
  setupHealthGrid();
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
    const amount = Number($('#foodAmount').value) || 0;
    const unit = $('#foodUnit').value;
    const manualKcal = $('#foodKcalManual').value;
    const known = getFoodDB().find((f) => f.name.toLowerCase() === name.toLowerCase());
    let entry;
    if (manualKcal !== '') {
      entry = {
        name, amount, unit,
        kcal: Number(manualKcal) || 0,
        protein: Number($('#foodProteinManual').value) || 0,
        carbs: Number($('#foodCarbsManual').value) || 0,
        fat: Number($('#foodFatManual').value) || 0,
        fiber: Number($('#foodFiberManual').value) || 0,
      };
    } else if (known) {
      let grams;
      if (unit === 'stk') {
        if (!known.gramsPerPiece) { alert(`Für "${known.name}" ist kein Stückgewicht hinterlegt – bitte g oder ml wählen.`); return; }
        grams = amount * known.gramsPerPiece;
      } else {
        grams = amount;
      }
      const factor = grams / 100;
      entry = { name, amount, unit, kcal: known.kcal * factor, protein: known.protein * factor, carbs: known.carbs * factor, fat: known.fat * factor, fiber: known.fiber * factor };
    } else if (pendingOcrFood) {
      if (unit === 'stk') { alert('Gescannte Nährwerte gelten pro 100 g/ml – bitte g oder ml wählen.'); return; }
      const factor = amount / 100;
      const p = pendingOcrFood;
      entry = { name, amount, unit, kcal: p.kcal * factor, protein: p.protein * factor, carbs: p.carbs * factor, fat: p.fat * factor, fiber: p.fiber * factor };
      upsertCustomFood({ name, kcal: p.kcal, protein: p.protein, carbs: p.carbs, fat: p.fat, fiber: p.fiber });
      setupStaticLists();
    } else {
      alert('Unbekanntes Lebensmittel: Bitte über "Manuell eingeben" die Nährwerte ergänzen (kcal ist Pflichtfeld dafür) oder ein Foto der Nährwerttabelle scannen.');
      return;
    }
    addFoodEntry(selectedDate, entry);
    pendingOcrFood = null;
    renderOcrStatus();
    e.target.reset(); $('#foodAmount').value = 100; $('#foodUnit').value = 'g';
    ['#foodKcalManual', '#foodProteinManual', '#foodCarbsManual', '#foodFatManual', '#foodFiberManual'].forEach((s) => $(s).value = '');
    renderAll();
  });

  $('#scanPhotoBtn').addEventListener('click', () => $('#nutritionPhotoInput').click());
  $('#nutritionPhotoInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleNutritionPhoto(file);
    e.target.value = '';
  });
  $('#ocrStatus').addEventListener('click', (e) => {
    if (!e.target.closest('#ocrDiscardBtn')) return;
    pendingOcrFood = null;
    renderOcrStatus();
  });

  $('#recipeBtn').addEventListener('click', openRecipeModal);
  $('#recipeModalClose').addEventListener('click', closeRecipeModal);
  $('#recipeModal').addEventListener('click', (e) => { if (e.target === $('#recipeModal')) closeRecipeModal(); });
  $('#addIngredientBtn').addEventListener('click', () => addIngredientRow());
  $('#recipeYieldAmount').addEventListener('input', updateRecipePreview);
  $('#recipeYieldUnit').addEventListener('change', updateRecipePreview);
  $('#recipeCancelEdit').addEventListener('click', resetRecipeForm);

  $('#recipeList').addEventListener('click', (e) => {
    const editBtn = e.target.closest('[data-edit-recipe]');
    if (editBtn) { editRecipe(editBtn.dataset.editRecipe); return; }
    const delBtn = e.target.closest('[data-delete-recipe]');
    if (delBtn) { deleteRecipeById(delBtn.dataset.deleteRecipe); renderRecipeList(); setupStaticLists(); }
  });

  $('#recipeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#recipeName').value.trim();
    const result = computeRecipeTotals();
    if (result.error) { alert(result.error); return; }
    const recipe = {
      id: recipeEditId || uid(), name,
      yieldAmount: result.yieldAmount, yieldUnit: result.yieldUnit,
      ingredients: result.ingredients,
      kcal: result.per100.kcal, protein: result.per100.protein, carbs: result.per100.carbs, fat: result.per100.fat, fiber: result.per100.fiber,
    };
    upsertRecipe(recipe);
    setupStaticLists();
    renderRecipeList();
    resetRecipeForm();
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

  $('#waterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const ml = Number($('#waterAmount').value) || 0;
    if (ml > 0) addWaterEntry(selectedDate, ml);
    e.target.reset(); $('#waterAmount').value = 250;
    renderWaterCard();
  });
  $('.quick-water-row').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-quick-water]');
    if (!btn) return;
    addWaterEntry(selectedDate, Number(btn.dataset.quickWater));
    renderWaterCard();
  });
  $('#waterLogList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove-water]');
    if (!btn) return;
    removeWaterEntry(selectedDate, btn.dataset.removeWater);
    renderWaterCard();
  });

  $('#periodToggleBtn').addEventListener('click', () => {
    togglePeriod(selectedDate);
    renderCycleRow();
    renderCharts();
    computeInsights();
  });

  $('#healthCard').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const symptomRow = btn.closest('[data-symptom]');
    if (symptomRow) {
      const id = symptomRow.dataset.symptom;
      const val = Number(btn.dataset.val);
      updateHealth(selectedDate, (h) => { h.symptome[id] = h.symptome[id] === val ? null : val; });
      renderHealthCard();
      return;
    }
    if (btn.closest('#umstaendeGroup')) {
      const id = btn.dataset.umstand;
      updateHealth(selectedDate, (h) => { h.umstaende[id] = !h.umstaende[id]; });
      renderHealthCard();
      return;
    }
    if (btn.closest('#zyklusZeichenToggles')) {
      const field = btn.dataset.field;
      updateHealth(selectedDate, (h) => { h.zyklusZeichen[field] = !h.zyklusZeichen[field]; });
      renderHealthCard();
      return;
    }
    const group = btn.closest('[data-field]');
    if (group) {
      const field = group.dataset.field;
      const raw = btn.dataset.val;
      const val = raw === 'true' ? true : (raw === 'false' ? false : Number(raw));
      updateHealth(selectedDate, (h) => { h[field] = h[field] === val ? null : val; });
      renderHealthCard();
      renderCycleRow();
      renderCharts();
      computeInsights();
    }
  });

  $('#zervixschleim').addEventListener('change', (e) => {
    updateHealth(selectedDate, (h) => { h.zyklusZeichen.zervixschleim = e.target.value || null; });
  });
  $('#hitzewallungenAnzahl').addEventListener('input', (e) => {
    const val = e.target.value === '' ? null : Number(e.target.value);
    updateHealth(selectedDate, (h) => { h.hitzewallungenAnzahl = val; });
  });
  $('#healthNotiz').addEventListener('input', (e) => {
    updateHealth(selectedDate, (h) => { h.notiz = e.target.value; });
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
      trackCycle: $('#pTrackCycle').checked,
      cycleLengthDays: Number($('#pCycleLength').value) || 28,
      periodLengthDays: Number($('#pPeriodLength').value) || 5,
      mlPerKgWater: Number($('#pWaterPerKg').value) || 30,
      mlPerActiveMinuteWater: Number($('#pWaterPerActiveMin').value) || 10,
    };
    saveProfile(profile);
    closeSettings();
    renderAll();
  });

  $('#exportBtn').addEventListener('click', () => {
    const data = { profile, days, customFoods: loadCustomFoods(), focusTips: loadFocusTips(), recipes: loadRecipes() };
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
        if (data.customFoods) saveCustomFoods(data.customFoods);
        if (data.focusTips) saveFocusTips(data.focusTips);
        if (data.recipes) saveRecipes(data.recipes);
        setupStaticLists();
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
  $('#pTrackCycle').checked = !!profile.trackCycle;
  $('#pCycleLength').value = profile.cycleLengthDays;
  $('#pPeriodLength').value = profile.periodLengthDays;
  $('#pWaterPerKg').value = profile.mlPerKgWater;
  $('#pWaterPerActiveMin').value = profile.mlPerActiveMinuteWater;
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
