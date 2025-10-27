export const models = [

  {
    name: 'LDK TZ',
    // hef is now an object based on the provided technical data table
    hef: {
      'A': 25, // Beton zwykły
      'B': 60, // Cegły ceramiczne MZ (assuming this is the primary 'B' category)
      'C': 80, // For all perforated brick types
      'D': 80, // Beton na kruszywie lekkim
      'E': 80  // Beton komórkowy
    },
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [90, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 340, 380, 420],
    material: 'polipropylen',
    hasMetalPin: false,
    maxFixtureThickness: [30, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 280, 320, 360]
  },
  {
    name: 'LDK TN',
    // hef is now an object
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
    hasMetalPin: true,
    maxFixtureThickness: [40, 80, 100, 120, 140, 160, 180, 200, 220, 240]
  },
  {
    name: 'LDH TZ',
    // hef is now an object
    hef: {
      'A': 25,
      'B': 80, // Assuming Cegły silikatowe for 'B'
      'C': 80,
      'D': 80,
      'E': 80
    },
    categories: ['C'], // Note: This model is limited to 'C' in your original data
    availableLengths: [80, 100, 120, 140, 160],
    material: 'polipropylen',
    hasMetalPin: false,
    maxFixtureThickness: [40, 60, 80, 100, 120]
  },
  {
    name: 'LDH TN',
    // hef is now an object
    hef: {
      'A': 25,
      'B': 80,
      'C': 80,
      'D': 80,
      'E': 80
    },
    categories: ['C'], // Note: This model is limited to 'C' in your original data
    availableLengths: [80, 100, 120, 140, 160],
    material: 'polipropylen',
    hasMetalPin: true,
    maxFixtureThickness: [40, 60, 80, 100, 120]
  },
  {
    name: 'LFH TZ',
    hef: 36, // This model was not in the table, so it retains a single hef value
    categories: ['A', 'B', 'C'],
    availableLengths: [120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true,
    maxFixtureThickness: [60, 80, 100, 120, 140, 160, 180, 200]
  },
  {
    name: 'LEH TN',
    hef: 56, // This model was not in the table, so it retains a single hef value
    categories: ['A', 'B', 'C'],
    availableLengths: [160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true,
    maxFixtureThickness: [100, 120, 140, 160, 180, 200]
  },
  {
    name: 'LFH GZN',
    hef: 35, // This model was not in the table, so it retains a single hef value
    categories: ['A', 'B', 'C'],
    availableLengths: [100, 120, 140, 160, 180, 200, 220, 240, 260],
    material: 'polietylen HDPE',
    hasMetalPin: true,
    maxFixtureThickness: [40, 60, 80, 100, 120, 140, 160, 180, 200]
  },
  {
    name: 'LDK GZN',
    hef: 60, // This model was not in the table, so it retains a single hef value
    categories: ['A', 'B', 'C', 'D', 'E'],
    availableLengths: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
    material: 'polipropylen',
    hasMetalPin: false,
    maxFixtureThickness: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240]
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