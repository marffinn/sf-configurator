// src/data.js – ZAKTUALIZOWANY (poprawiono trzpienie + LXK)
export const models = [
  {
    name: 'LDK TZ',
    hef: { 'A': 25, 'B': 60, 'C': 80, 'D': 80, 'E': 80 },
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [90, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 340, 380, 420],
    material: 'polipropylen',
    hasMetalPin: true,  // TZ = metalowy trzpień z główką zalaną plastikiem
    maxFixtureThickness: [30, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 280, 320, 360]
  },
  {
    name: 'LDK TN',
    hef: { 'A': 25, 'B': 60, 'C': 80, 'D': 80, 'E': 80 },
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [100, 140, 160, 180, 200, 220, 240, 260, 280, 300],
    material: 'polipropylen',
    hasMetalPin: true,  // TN = metalowy trzpień (bez główki zalanej)
    maxFixtureThickness: [40, 80, 100, 120, 140, 160, 180, 200, 220, 240]
  },
  {
    name: 'LDH TZ',
    hef: { 'A': 25, 'B': 80, 'C': 80, 'D': 80, 'E': 80 },
    categories: ['C'],
    availableLengths: [80, 100, 120, 140, 160],
    material: 'polipropylen',
    hasMetalPin: true,  // TZ = metalowy z główką zalaną
    maxFixtureThickness: [40, 60, 80, 100, 120]
  },
  {
    name: 'LDH TN',
    hef: { 'A': 25, 'B': 80, 'C': 80, 'D': 80, 'E': 80 },
    categories: ['C'],
    availableLengths: [80, 100, 120, 140, 160],
    material: 'polipropylen',
    hasMetalPin: true,  // TN = metalowy bez główki
    maxFixtureThickness: [40, 60, 80, 100, 120]
  },
  {
    name: 'LFH TZ',
    hef: 40,
    categories: ['A', 'B', 'C'],
    availableLengths: [120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true,  // TZ = metalowy z główką zalaną
    maxFixtureThickness: [60, 80, 100, 120, 140, 160, 180, 200]
  },
  {
    name: 'LEH TN',
    hef: 40,
    categories: ['A', 'B', 'C'],
    availableLengths: [160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true,  // TN = metalowy bez główki
    maxFixtureThickness: [100, 120, 140, 160, 180, 200]
  },
  {
    name: 'LFH GZN',
    hef: 40,
    categories: ['A', 'B', 'C'],
    availableLengths: [100, 120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: false,  // GZN = trzpień tworzywowy
    maxFixtureThickness: [40, 60, 80, 100, 120, 140, 160, 180, 200]
  },
  {
    name: 'LDK GZN',
    hef: 80,
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
    material: 'polipropylen',
    hasMetalPin: false,  // GZN = trzpień tworzywowy
    maxFixtureThickness: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240]
  },
  {
    name: 'LXK 10 H',
    hef: 60,
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [160, 180, 200, 220, 240, 260],
    material: 'polipropylen',
    hasMetalPin: true,  // wkręt 6.0 mm = metalowy
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