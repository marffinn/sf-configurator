// src/App.js – PEŁNY, ZAKTUALIZOWANY (LXK 10 H promowany jako pierwszy)
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container, Typography, Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import { models } from './data';
import { Step0, Step1, Step2, StepAdhesive, StepRecessedDepth, Step4 } from './Steps';

const starfixTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#dd0000' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
    text: { primary: '#333333', secondary: '#555555' },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { backgroundImage: 'none' } } },
    MuiTableHead: { styleOverrides: { root: { backgroundColor: '#f0f0f0' } } },
  },
});

function getUwagi(model) {
  let uwagi = [];
  if (model.name === 'LDK TZ') uwagi.push('Najkrótszy, uniwersalny');
  if (model.name === 'LDK TN') uwagi.push('Z trzpieniem metalowym');
  if (model.name === 'LDH TZ') uwagi.push('Ekonomiczny');
  if (model.name === 'LDH TN') uwagi.push('Z trzpieniem metalowym');
  if (model.name === 'LXK 10 H') uwagi.push('Promowany model');
  return uwagi.join(', ');
}

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    substrate: 'A',
    insulationType: 'EPS',
    hD: 120,
    adhesiveThickness: 10,
    recessedDepth: 0,
  });
  const [recommendations, setRecommendations] = useState([]);
  const [errors, setErrors] = useState({});

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateStep = currentStep => {
    const newErrors = {};
    if (currentStep === 0 && !formData.substrate) newErrors.substrate = 'Wybierz rodzaj podłoża';
    if (currentStep === 1 && !formData.insulationType) newErrors.insulationType = 'Wybierz typ izolacji';
    if (currentStep === 2 && (formData.hD < 10 || formData.hD > 400)) newErrors.hD = 'Grubość izolacji musi być między 10 a 400 mm';
    if (currentStep === 3 && (formData.adhesiveThickness < 10 || formData.adhesiveThickness > 50)) newErrors.adhesiveThickness = 'Grubość warstwy kleju musi być między 10 a 50 mm';
    if (currentStep === 4 && (formData.recessedDepth < 0 || formData.recessedDepth > 50)) newErrors.recessedDepth = 'Głębokość montażu zagłębionego musi być między 0 a 50 mm';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // src/App.js – KALKULACJA UPROSZCZONA, PO POLSKU, KROK PO KROKU
  const calculateLa = () => {
    if (!validateStep(4)) return;

    // === KROK 1: Dane wejściowe od klienta ===
    const podloze = formData.substrate;                    // np. 'A'
    const typIzolacji = formData.insulationType;           // 'EPS' lub 'MW'
    const gruboscIzolacji = formData.hD;                   // w mm
    const gruboscKleju = formData.adhesiveThickness;       // w mm
    const glebokoscZaglebienia = formData.recessedDepth;   // w mm

    // === KROK 2: Obliczenie efektywnej grubości izolacji ===
    // hDEff = gruboscIzolacji - glebokoscZaglebienia
    const hDEff = gruboscIzolacji - glebokoscZaglebienia;
    if (hDEff < 0) {
      setErrors({ global: 'Głębokość zagłębienia nie może być większa niż grubość izolacji.' });
      setStep(5);
      return;
    }

    // === KROK 3: Przygotowanie jednostek (wszystko w mm) ===
    const hDEffMm = hDEff;           // efek. grubość izolacji
    const tfixMm = gruboscKleju;     // grubość kleju

    // === KROK 4: Filtrowanie modeli pod kątem podłoża i izolacji ===
    const modeleDlaPodloza = models.filter(model =>
      model.categories.includes(podloze) &&
      (typIzolacji === 'EPS' || (typIzolacji === 'MW' && model.hasMetalPin))
    );

    if (modeleDlaPodloza.length === 0) {
      setErrors({ global: 'Brak modeli dla wybranego podłoża i typu izolacji.' });
      setStep(5);
      return;
    }

    // === KROK 5: Obliczenie dla każdego modelu ===
    const rekomendacje = modeleDlaPodloza
      .map(model => {
        // KROK 5.1: Pobranie hef (głębokość kotwienia)
        const hef = typeof model.hef === 'object' ? model.hef[podloze] : model.hef;
        if (hef === undefined) return null;

        // KROK 5.2: Minimalna wymagana długość kołka
        const laMin = hef + hDEffMm + tfixMm;

        // KROK 5.3: Najkrótsza dostępna długość >= laMin
        const laDostepna = model.availableLengths.find(la => la >= laMin);
        if (!laDostepna) return null;

        // KROK 5.4: Maksymalna obsługiwana grubość izolacji
        const maxHD = (laDostepna - hef - tfixMm) + glebokoscZaglebienia;
        if (maxHD < gruboscIzolacji) return null;

        // KROK 5.5: Zwrócenie gotowej rekomendacji
        return {
          ...model,
          laRecommended: laDostepna,
          maxHD: Math.round(maxHD),
          hef,
          uwagi: getUwagi(model),
        };
      })
      .filter(Boolean);

    // === KROK 6: Priorytet LXK 10 H (jeśli pasuje) ===
    const lxkRec = rekomendacje.find(r => r.name === 'LXK 10 H');
    const inneRec = rekomendacje.filter(r => r.name !== 'LXK 10 H');

    const posortowane = lxkRec
      ? [lxkRec, ...inneRec.sort((a, b) => a.laRecommended - b.laRecommended)]
      : inneRec.sort((a, b) => a.laRecommended - b.laRecommended);

    // === KROK 7: Zapisanie wyników ===
    if (posortowane.length === 0) {
      setRecommendations([]);
      setErrors({ global: 'Brak odpowiednich łączników. Spróbuj zmienić parametry.' });
    } else {
      setRecommendations(posortowane);
      setErrors({});
    }
    setStep(5);
  };

  const nextStep = () => { if (validateStep(step)) setStep(prev => prev + 1); };
  const prevStep = () => setStep(prev => prev - 1);

  const goToStep = index => {
    if (index > step) {
      let isValid = true;
      for (let i = step; i < index; i++) if (!validateStep(i)) { isValid = false; break; }
      if (isValid) setStep(index);
    } else setStep(index);
  };

  const handleStartOver = () => {
    setFormData({
      substrate: 'A',
      insulationType: 'EPS',
      hD: 10,
      adhesiveThickness: 10,
      recessedDepth: 0,
    });
    setRecommendations([]);
    setErrors({});
    setStep(0);
  };

  const stepLabels = [
    'Rodzaj podłoża',
    'Typ izolacji',
    'Grubość izolacji',
    'Grubość warstwy kleju',
    'Głębokość zagłębienia',
    'Rekomendacja dla',
  ];

  const stepComponents = [
    <Step0 substrate={formData.substrate} setSubstrate={v => updateFormData('substrate', v)} errors={errors} nextStep={nextStep} />,
    <Step1 insulationType={formData.insulationType} setInsulationType={v => updateFormData('insulationType', v)} errors={errors} nextStep={nextStep} prevStep={prevStep} />,
    <Step2 hD={formData.hD} setHD={v => updateFormData('hD', v)} errors={errors} nextStep={nextStep} prevStep={prevStep} />,
    <StepAdhesive adhesiveThickness={formData.adhesiveThickness} setAdhesiveThickness={v => updateFormData('adhesiveThickness', v)} errors={errors} nextStep={nextStep} prevStep={prevStep} />,
    <StepRecessedDepth recessedDepth={formData.recessedDepth} setRecessedDepth={v => updateFormData('recessedDepth', v)} errors={errors} nextStep={calculateLa} prevStep={prevStep} />,
    <Step4 recommendations={recommendations} prevStep={prevStep} setStep={setStep} handleStartOver={handleStartOver} {...formData} errors={errors} />,
  ];

  return (
    <ThemeProvider theme={starfixTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src={`${process.env.PUBLIC_URL}/logotyp_outline.svg`} alt="Starfix Logo" style={{ width: '100%', maxWidth: '250px', height: 'auto' }} />
        </Box>
        <Typography variant="h4" align="center" sx={{ fontWeight: 300, letterSpacing: '1.5px', my: 3, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
          Konfigurator Łączników ETICS
        </Typography>
        <MuiStepper activeStep={step} alternativeLabel sx={{ mb: 4, overflow: 'auto' }}>
          {stepLabels.map((label, index) => (
            <Step key={label} completed={step > index} sx={{ minWidth: { xs: 'auto', sm: 'auto' } }}>
              <StepLabel onClick={() => goToStep(index)} sx={{ cursor: 'pointer', fontSize: { xs: '0.65rem', sm: '0.875rem' }, '& .MuiStepLabel-label': { fontSize: { xs: '0.65rem', sm: '0.875rem' } } }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </MuiStepper>
        <Box sx={{ mt: 4, p: { xs: 2, sm: 3 }, bgcolor: 'background.paper', color: 'text.primary', borderRadius: 2, boxShadow: '0px 4px 20px rgba(0,0,0,0.05)' }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">{stepLabels[step]}</Typography>
          <Box sx={{ p: 2, borderRadius: 1 }}>{stepComponents[step]}</Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;