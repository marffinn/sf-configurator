// test-extreme-configurator.js – TESTY SKRAJNYCH WARTOŚCI
// Pokrywa KAŻDĄ kombinację: podłoże + izolacja + hD + klej + zagłębienie
// Wygenerowane: 5 podłoży × 2 izolacje × 5 grubości × 5 klejów × 5 zagłębień = 1250 testów

const models = [
    { name: 'LDK TZ', hef: { A: 25, B: 60, C: 80, D: 80, E: 80 }, categories: ['A', 'B', 'C', 'D', 'E'], availableLengths: [90, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 340, 380, 420], hasMetalPin: true },
    { name: 'LDK TN', hef: { A: 25, B: 60, C: 80, D: 80, E: 80 }, categories: ['A', 'B', 'C', 'D', 'E'], availableLengths: [100, 140, 160, 180, 200, 220, 240, 260, 280, 300], hasMetalPin: true },
    { name: 'LDH TZ', hef: { A: 25, B: 80, C: 80, D: 80, E: 80 }, categories: ['C'], availableLengths: [80, 100, 120, 140, 160], hasMetalPin: true },
    { name: 'LDH TN', hef: { A: 25, B: 80, C: 80, D: 80, E: 80 }, categories: ['C'], availableLengths: [80, 100, 120, 140, 160], hasMetalPin: true },
    { name: 'LFH TZ', hef: 40, categories: ['A', 'B', 'C'], availableLengths: [120, 140, 160, 180, 200, 220, 240, 260], hasMetalPin: true },
    { name: 'LEH TN', hef: 40, categories: ['A', 'B', 'C'], availableLengths: [160, 180, 200, 220, 240, 260], hasMetalPin: true },
    { name: 'LFH GZN', hef: 40, categories: ['A', 'B', 'C'], availableLengths: [100, 120, 140, 160, 180, 200, 220, 240, 260], hasMetalPin: false },
    { name: 'LDK GZN', hef: 80, categories: ['A', 'B', 'C', 'D', 'E'], availableLengths: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300], hasMetalPin: false },
    { name: 'LXK 10 H', hef: 60, categories: ['A', 'B', 'C', 'D', 'E'], availableLengths: [160, 180, 200, 220, 240, 260], hasMetalPin: true }
];

// === FUNKCJA KALKULACJI ===
function oblicz(podloze, typIzolacji, hD, klej, zaglebienie) {
    const hDEff = hD - zaglebienie;
    if (hDEff < 0) return { error: 'Zbyt duże zagłębienie' };

    const modele = models.filter(m =>
        m.categories.includes(podloze) &&
        (typIzolacji === 'EPS' || (typIzolacji === 'MW' && m.hasMetalPin))
    );

    const wyniki = modele
        .map(m => {
            const hef = typeof m.hef === 'object' ? m.hef[podloze] : m.hef;
            if (!hef) return null;
            const laMin = hef + hDEff + klej;
            const la = m.availableLengths.find(l => l >= laMin);
            if (!la) return null;
            const maxHD = (la - hef - klej) + zaglebienie;
            if (maxHD < hD) return null;
            return { name: m.name, la, hef };
        })
        .filter(Boolean);

    const lxk = wyniki.find(r => r.name === 'LXK 10 H');
    const reszta = wyniki.filter(r => r.name !== 'LXK 10 H').sort((a, b) => a.la - b.la);
    return { wyniki: lxk ? [lxk, ...reszta] : reszta };
}

// === WARTOŚCI SKRAJNE ===
const podloza = ['A', 'B', 'C', 'D', 'E'];
const izolacje = ['EPS', 'MW'];
const grubosci = [10, 100, 200, 300, 400]; // min, średnie, max
const kleje = [10, 20, 30, 40, 50];       // min, max
const zaglebienia = [0, 10, 20, 40, 50];  // min, max, hD-zaglebienie >=0

// === STATYSTYKI ===
let total = 0;
let zRekomendacja = 0;
let bezRekomendacji = 0;
let zBledem = 0;
let lxkPierwszy = 0;

// === TESTY ===
console.log('TESTY SKRAJNYCH WARTOŚCI – 1250 KOMBINACJI\n'.padEnd(80, '='));

podloza.forEach(p => {
    izolacje.forEach(i => {
        grubosci.forEach(h => {
            kleje.forEach(k => {
                zaglebienia.forEach(z => {
                    if (h - z < 0) return; // pomiń błędne
                    total++;
                    const wynik = oblicz(p, i, h, k, z);

                    if (wynik.error) {
                        zBledem++;
                    } else if (wynik.wyniki.length > 0) {
                        zRekomendacja++;
                        if (wynik.wyniki[0]?.name === 'LXK 10 H') lxkPierwszy++;
                    } else {
                        bezRekomendacji++;
                    }
                });
            });
        });
    });
});

// === RAPORT ===
console.log(`\nRAPORT KOŃCOWY`);
console.log(`Łącznie testów: ${total}`);
console.log(`Z rekomendacją: ${zRekomendacja} (${((zRekomendacja / total) * 100).toFixed(1)}%)`);
console.log(`Bez rekomendacji: ${bezRekomendacji} (${((bezRekomendacji / total) * 100).toFixed(1)}%)`);
console.log(`Z błędem (zbyt duże zagłębienie): ${zBledem}`);
console.log(`LXK 10 H na 1. miejscu: ${lxkPierwszy} razy (gdy pasował)`);
console.log('\n'.padEnd(80, '='));

// === PRZYKŁADY SKRAJNYCH (losowe 3) ===
console.log('\nPRZYKŁADY SKRAJNYCH KONFIGURACJI:');
let przykłady = 0;
podloza.forEach(p => {
    izolacje.forEach(i => {
        [10, 400].forEach(h => {
            [10, 50].forEach(k => {
                [0, 50].forEach(z => {
                    if (h - z < 0 || przykłady >= 3) return;
                    const w = oblicz(p, i, h, k, z);
                    console.log(`\n→ ${p}, ${i}, hD=${h}, klej=${k}, zagł=${z}`);
                    if (w.error) console.log(`  ${w.error}`);
                    else if (w.wyniki.length === 0) console.log('  Brak kołków');
                    else console.log(`  ${w.wyniki.map(r => `${r.name} ${r.la}mm`).join(', ')}`);
                    przykłady++;
                });
            });
        });
    });
});