// Definicja modeli kołków, które są dostępne w konfiguratorze.
export const models = [
  // Każdy obiekt w tej tablicy reprezentuje jeden model kołka.
  {
    name: 'LDK TZ', // Nazwa modelu kołka.
    // 'hef' to efektywna głębokość zakotwienia, zróżnicowana w zależności od kategorii podłoża.
    hef: {
      'A': 25, // Beton zwykły
      'B': 60, // Cegły ceramiczne pełne
      'C': 80, // Cegły perforowane/kanałowe
      'D': 80, // Beton na kruszywie lekkim
      'E': 80  // Beton komórkowy
    },
    categories: ['A', 'B', 'C', 'D', 'E'], // Kategorie podłoży, w których ten kołek może być stosowany.
    availableLengths: [90, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 340, 380, 420], // Dostępne długości kołka w milimetrach.
    material: 'polipropylen', // Materiał, z którego wykonany jest kołek.
    hasMetalPin: false, // Określa, czy kołek posiada metalowy trzpień (ważne dla wełny mineralnej).
    maxFixtureThickness: [30, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 280, 320, 360] // Maksymalna grubość materiału mocowanego dla każdej dostępnej długości.
  },
  {
    name: 'LDK TN', // Nazwa modelu kołka.
    // 'hef' to efektywna głębokość zakotwienia, zróżnicowana w zależności od kategorii podłoża.
    hef: {
      'A': 25, // Beton zwykły
      'B': 60, // Cegły ceramiczne pełne
      'C': 80, // Cegły perforowane/kanałowe
      'D': 80, // Beton na kruszywie lekkim
      'E': 80  // Beton komórkowy
    },
    categories: ['A', 'B', 'C', 'D', 'E'], // Kategorie podłoży, w których ten kołek może być stosowany.
    availableLengths: [100, 140, 160, 180, 200, 220, 240, 260, 280, 300], // Dostępne długości kołka w milimetrach.
    material: 'polipropylen', // Materiał, z którego wykonany jest kołek.
    hasMetalPin: true, // Określa, czy kołek posiada metalowy trzpień (ważne dla wełny mineralnej).
    maxFixtureThickness: [40, 80, 100, 120, 140, 160, 180, 200, 220, 240] // Maksymalna grubość materiału mocowanego dla każdej dostępnej długości.
  },
  {
    name: 'LDH TZ', // Nazwa modelu kołka.
    // 'hef' to efektywna głębokość zakotwienia, zróżnicowana w zależności od kategorii podłoża.
    hef: {
      'A': 25, // Beton zwykły
      'B': 80, // Cegły silikatowe
      'C': 80, // Cegły perforowane/kanałowe
      'D': 80, // Beton na kruszywie lekkim
      'E': 80  // Beton komórkowy
    },
    categories: ['C'], // Kategorie podłoży, w których ten kołek może być stosowany.
    availableLengths: [80, 100, 120, 140, 160], // Dostępne długości kołka w milimetrach.
    material: 'polipropylen', // Materiał, z którego wykonany jest kołek.
    hasMetalPin: false, // Określa, czy kołek posiada metalowy trzpień (ważne dla wełny mineralnej).
    maxFixtureThickness: [40, 60, 80, 100, 120] // Maksymalna grubość materiału mocowanego dla każdej dostępnej długości.
  },
  {
    name: 'LDH TN', // Nazwa modelu kołka.
    // 'hef' to efektywna głębokość zakotwienia, zróżnicowana w zależności od kategorii podłoża.
    hef: {
      'A': 25, // Beton zwykły
      'B': 80, // Cegły silikatowe
      'C': 80, // Cegły perforowane/kanałowe
      'D': 80, // Beton na kruszywie lekkim
      'E': 80  // Beton komórkowy
    },
    categories: ['C'], // Kategorie podłoży, w których ten kołek może być stosowany.
    availableLengths: [80, 100, 120, 140, 160], // Dostępne długości kołka w milimetrach.
    material: 'polipropylen', // Materiał, z którego wykonany jest kołek.
    hasMetalPin: true, // Określa, czy kołek posiada metalowy trzpień (ważne dla wełny mineralnej).
    maxFixtureThickness: [40, 60, 80, 100, 120] // Maksymalna grubość materiału mocowanego dla każdej dostępnej długości.
  },
  {
    name: 'LFH TZ', // Nazwa modelu kołka.
    hef: 40, // W tym przypadku 'hef' jest wartością stałą, niezależną od podłoża.
    categories: ['A', 'B', 'C'], // Kategorie podłoży, w których ten kołek może być stosowany.
    availableLengths: [120, 140, 160, 180, 200, 220, 240, 260], // Dostępne długości kołka w milimetrach.
    material: 'polietylen HDPE', // Materiał, z którego wykonany jest kołek.
    hasMetalPin: true, // Określa, czy kołek posiada metalowy trzpień (ważne dla wełny mineralnej).
    maxFixtureThickness: [60, 80, 100, 120, 140, 160, 180, 200] // Maksymalna grubość materiału mocowanego dla każdej dostępnej długości.
  },
  {
    name: 'LEH TN', // Nazwa modelu kołka.
    hef: 40, // W tym przypadku 'hef' jest wartością stałą, niezależną od podłoża.
    categories: ['A', 'B', 'C'], // Kategorie podłoży, w których ten kołek może być stosowany.
    availableLengths: [160, 180, 200, 220, 240, 260], // Dostępne długości kołka w milimetrach.
    material: 'polietylen HDPE', // Materiał, z którego wykonany jest kołek.
    hasMetalPin: true, // Określa, czy kołek posiada metalowy trzpień (ważne dla wełny mineralnej).
    maxFixtureThickness: [100, 120, 140, 160, 180, 200] // Maksymalna grubość materiału mocowanego dla każdej dostępnej długości.
  },
  {
    name: 'LFH GZN', // Nazwa modelu kołka.
    hef: 40, // W tym przypadku 'hef' jest wartością stałą, niezależną od podłoża.
    categories: ['A', 'B', 'C'], // Kategorie podłoży, w których ten kołek może być stosowany.
    availableLengths: [100, 120, 140, 160, 180, 200, 220, 240, 260], // Dostępne długości kołka w milimetrach.
    material: 'polietylen HDPE', // Materiał, z którego wykonany jest kołek.
    hasMetalPin: true, // Określa, czy kołek posiada metalowy trzpień (ważne dla wełny mineralnej).
    maxFixtureThickness: [40, 60, 80, 100, 120, 140, 160, 180, 200] // Maksymalna grubość materiału mocowanego dla każdej dostępnej długości.
  },
  {
    name: 'LDK GZN', // Nazwa modelu kołka.
    hef: 80, // W tym przypadku 'hef' jest wartością stałą, niezależną od podłoża.
    categories: ['A', 'B', 'C', 'D', 'E'], // Kategorie podłoży, w których ten kołek może być stosowany.
    availableLengths: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300], // Dostępne długości kołka w milimetrach.
    material: 'polipropylen', // Materiał, z którego wykonany jest kołek.
    hasMetalPin: false, // Określa, czy kołek posiada metalowy trzpień (ważne dla wełny mineralnej).
    maxFixtureThickness: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240] // Maksymalna grubość materiału mocowanego dla każdej dostępnej długości.
  }
];

// Definicja dostępnych rodzajów podłoży.
export const substrates = [
  // Każdy obiekt to jeden typ podłoża z wartością (używaną w logice) i etykietą (wyświetlaną użytkownikowi).
  { value: 'A', label: 'Beton zwykły (C12/15 do C50/60)' },
  { value: 'B', label: 'Cegła pełna (ceramiczna/silikatowa)' },
  { value: 'C', label: 'Cegła perforowana/kanałowa (Porotherm 25, 17 mm)' },
  { value: 'D', label: 'Beton na kruszywie lekkim (LAC)' },
  { value: 'E', label: 'Beton komórkowy (AAC)' }
];

// Definicja dostępnych typów materiałów izolacyjnych.
export const insulationTypes = [
  { value: 'EPS', label: 'Styropian (EPS/XPS)' }, // EPS to polistyren ekspandowany (styropian).
  { value: 'MW', label: 'Wełna mineralna' } // MW to wełna mineralna.
];