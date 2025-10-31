// src/data.js – ŚWIEŻY, NA PODSTAWIE TWOJEJ NAJNOWEJ WERSJI
// Wszystkie dane dokładnie z Twojego pliku + poprawki logiczne (GZN = tworzywo)
// Dodano LXK 10 H (promowany) + LDH TZ/TN odkomentowane + poprawne hasMetalPin

export const models = [
  {
    name: 'LDK TZ',
    hef: {
      'A': 25,
      'B': 60,
      'C': 80,
      'D': 80,
      'E': 80
    },
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 340, 380, 420],
    material: 'polipropylen',
    hasMetalPin: false, // TZ = tworzywo (wg Twojej wersji)
    maxFixtureThickness: [40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 280, 320, 360]
  },
  {
    name: 'LDK TN',
    hef: {
      'A': 25,
      'B': 60,
      'C': 80,
      'D': 80,
      'E': 80
    },
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [100, 140, 160, 180, 200, 220, 240, 260, 280, 300],
    material: 'polipropylen',
    hasMetalPin: true, // TN = metalowy
    maxFixtureThickness: [40, 80, 100, 120, 140, 160, 180, 200, 220, 240]
  },
  {
    name: 'LDH TZ',
    hef: {
      'A': 25,
      'B': 80,
      'C': 80,
      'D': 80,
      'E': 80
    },
    categories: ['C'],
    availableLengths: [80, 100, 120, 140, 160],
    material: 'polipropylen',
    hasMetalPin: false, // TZ = tworzywo
    maxFixtureThickness: [40, 60, 80, 100, 120]
  },
  {
    name: 'LDH TN',
    hef: {
      'A': 25,
      'B': 80,
      'C': 80,
      'D': 80,
      'E': 80
    },
    categories: ['C'],
    availableLengths: [80, 100, 120, 140, 160],
    material: 'polipropylen',
    hasMetalPin: true, // TN = metalowy
    maxFixtureThickness: [40, 60, 80, 100, 120]
  },
  {
    name: 'LFH TZ',
    hef: 40,
    categories: ['A', 'B', 'C'],
    availableLengths: [120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true, // TZ = metalowy
    maxFixtureThickness: [60, 80, 100, 120, 140, 160, 180, 200]
  },
  {
    name: 'LEH TN',
    hef: 40,
    categories: ['A', 'B', 'C'],
    availableLengths: [120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true, // TN = metalowy
    maxFixtureThickness: [80, 100, 120, 140, 160, 180, 200, 220]
  },
  {
    name: 'LFH GZN',
    hef: 40,
    categories: ['A', 'B', 'C'],
    availableLengths: [90, 100, 120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: false, // GZN = tworzywo (POPRAWIONE!)
    maxFixtureThickness: [50, 60, 80, 100, 120, 140, 160, 180, 200, 220]
  },
  {
    name: 'LDK GZN',
    hef: 80,
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
    material: 'polipropylen',
    hasMetalPin: false, // GZN = tworzywo
    maxFixtureThickness: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240]
  },
  // NOWY MODEL – DODANY (promowany)
  {
    name: 'LXK 10 H',
    hef: 60,
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [160, 180, 200, 220, 240, 260],
    material: 'polipropylen',
    hasMetalPin: true, // wkręt 6.0 mm = metalowy
    maxFixtureThickness: [100, 120, 140, 160, 180, 200]
  }
];

export const substrates = [
  { value: 'A', label: 'Beton zwykły (C12/15 do C50/60)' },
  { value: 'B', label: 'Cegła pełna (ceramiczna/silikatowa)' },
  { value: 'C', label: 'Cegła perforowana/kanałowa (Porotherm 25, 17 mm)' },
  { value: 'D', label: 'Beton na kruszywie lekkim (LAC)' },
  { value: 'E', label: 'Beton komórkowy (AAC)' }
];

export const insulationTypes = [
  { value: 'EPS', label: 'Styropian (EPS/XPS)' },
  { value: 'MW', label: 'Wełna mineralna' }
];