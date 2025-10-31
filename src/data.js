// src/data.js – ZAKTUALIZOWANY: linki do PDF + + LXK 10 H + poprawne hasMetalPin
export const models = [
  {
    name: 'LDK TZ',
    hef: { 'A': 25, 'B': 60, 'C': 80, 'D': 80, 'E': 80 },
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 340, 380, 420],
    material: 'polipropylen',
    hasMetalPin: false,
    maxFixtureThickness: [40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 280, 320, 360],
    pdfLink: 'https://starfix.eu/wp-content/uploads/2025/08/1-ETA-2024.pdf'
  },
  {
    name: 'LDK TN',
    hef: { 'A': 25, 'B': 60, 'C': 80, 'D': 80, 'E': 80 },
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [100, 140, 160, 180, 200, 220, 240, 260, 280, 300],
    material: 'polipropylen',
    hasMetalPin: true,
    maxFixtureThickness: [40, 80, 100, 120, 140, 160, 180, 200, 220, 240],
    pdfLink: 'https://starfix.eu/wp-content/uploads/2025/08/3-ETA-2024.pdf'
  },
  {
    name: 'LDH TZ',
    hef: { 'A': 25, 'B': 80, 'C': 80, 'D': 80, 'E': 80 },
    categories: ['C'],
    availableLengths: [80, 100, 120, 140, 160],
    material: 'polipropylen',
    hasMetalPin: false,
    maxFixtureThickness: [40, 60, 80, 100, 120],
    pdfLink: null // brak dokumentacji
  },
  {
    name: 'LDH TN',
    hef: { 'A': 25, 'B': 80, 'C': 80, 'D': 80, 'E': 80 },
    categories: ['C'],
    availableLengths: [80, 100, 120, 140, 160],
    material: 'polipropylen',
    hasMetalPin: true,
    maxFixtureThickness: [40, 60, 80, 100, 120],
    pdfLink: null // brak dokumentacji
  },
  {
    name: 'LFH TZ',
    hef: 40,
    categories: ['A', 'B', 'C'],
    availableLengths: [120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true,
    maxFixtureThickness: [60, 80, 100, 120, 140, 160, 180, 200],
    pdfLink: 'https://starfix.eu/wp-content/uploads/2021/05/LFH_TZ-2-ETA-2021-06.05.2021.pdf'
  },
  {
    name: 'LEH TN',
    hef: 40,
    categories: ['A', 'B', 'C'],
    availableLengths: [120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true,
    maxFixtureThickness: [80, 100, 120, 140, 160, 180, 200, 220],
    pdfLink: 'https://starfix.eu/wp-content/uploads/2021/04/LEH_TN-3-ETA-2021.pdf'
  },
  {
    name: 'LFH GZN',
    hef: 40,
    categories: ['A', 'B', 'C'],
    availableLengths: [90, 100, 120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: false,
    maxFixtureThickness: [50, 60, 80, 100, 120, 140, 160, 180, 200, 220],
    pdfLink: 'https://starfix.eu/wp-content/uploads/2021/05/LFH_GZN-1-ETA-2021-06.05.2021.pdf'
  },
  {
    name: 'LDK GZN',
    hef: 80,
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
    material: 'polipropylen',
    hasMetalPin: false,
    maxFixtureThickness: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240],
    pdfLink: 'https://starfix.eu/wp-content/uploads/2025/08/2-ETA-2024.pdf'
  },
  {
    name: 'LXK 10 H',
    hef: 60,
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [160, 180, 200, 220, 240, 260],
    material: 'polipropylen',
    hasMetalPin: true,
    maxFixtureThickness: [100, 120, 140, 160, 180, 200],
    pdfLink: 'https://starfix.eu/wp-content/uploads/2021/04/LXK-4-ETA-2021.pdf'
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