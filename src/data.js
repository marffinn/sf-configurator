export const models = [
  {
    name: 'LXK H',
    hef: 60, // Matches effective anchor depth assumption
    categories: ['A', 'B'],
    availableLengths: [160, 180, 200, 220, 260],
    material: 'polipropylen',
    hasMetalPin: false
  },
  {
    name: 'LDK TZ',
    hef: 60, // Min (90 - 30) from LDK 10 90 TZ
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [90, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 340, 380, 420],
    material: 'polipropylen',
    hasMetalPin: false
  },
  {
    name: 'LDK TN',
    hef: 65, // Min (105 - 40) from LDK 10 100 TN
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [100, 140, 160, 180, 200, 220, 240, 260, 280, 300],
    material: 'polipropylen',
    hasMetalPin: true
  },
  {
    name: 'LDH TZ',
    hef: 25, // From Porotherm 25 table
    categories: ['C'],
    availableLengths: [80, 100, 120, 140, 160],
    material: 'polipropylen',
    hasMetalPin: false
  },
  {
    name: 'LDH TN',
    hef: 25, // From Porotherm 25 table
    categories: ['C'],
    availableLengths: [80, 100, 120, 140, 160],
    material: 'polipropylen',
    hasMetalPin: true
  },
  {
    name: 'LFH TZ',
    hef: 36, // Min (116 - 80) from LFH 10 140 TZ
    categories: ['A', 'B', 'C'],
    availableLengths: [140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true
  },
  {
    name: 'LEH TN',
    hef: 56, // Min (176 - 120) from LEH 10 160 TN
    categories: ['A', 'B', 'C'], // Assuming 'A' is correct based on filtering
    availableLengths: [160, 180, 200, 220, 240, 260, 420], // Added 420mm length
    material: 'polietylen HDPE',
    hasMetalPin: true
  },
  {
    name: 'LFH GZN',
    hef: 35, // Min (95 - 60) from LFH 10 100 GZN
    categories: ['A', 'B', 'C'],
    availableLengths: [100, 120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true
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