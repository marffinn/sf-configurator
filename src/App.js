// src/App.js – PEŁNY, POPRAWIONY (usunięto nieużywaną zmienną ttol)
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

  const calculateLa = () => {
    if (!validateStep(4)) return;
    const { substrate, insulationType, hD, adhesiveThickness, recessedDepth } = formData;

    const hDEff = hD - recessedDepth;
    if (hDEff < 0) {
      setErrors({ global: 'Głębokość zagłębienia nie może być większa niż grubość izolacji.' });
      setStep(5);
      return;
    }

    const hDEffMm = hDEff;
    const tfixMm = adhesiveThickness;

    const filteredModels = models.filter(model =>
      model.categories.includes(substrate) &&
      (insulationType === 'EPS' || (insulationType === 'MW' && model.hasMetalPin))
    );

    if (!filteredModels.length) {
      setErrors({ global: 'Brak modeli dla wybranego podłoża i typu izolacji.' });
      setStep(5);
      return;
    }

    const recs = filteredModels
      .map(model => {
        const hef = typeof model.hef === 'object' ? model.hef[substrate] : model.hef;
        if (hef === undefined) return null;

        const laMin = hef + hDEffMm + tfixMm;
        const laAvailable = model.availableLengths.find(la => la >= laMin);
        if (!laAvailable) return null;

        const maxHD = (laAvailable - hef - tfixMm) + recessedDepth;
        if (maxHD < hD) return null;

        return {
          ...model,
          laRecommended: laAvailable,
          maxHD: Number(maxHD.toFixed(0)),
          hef,
        };
      })
      .filter(Boolean);

    // SORTOWANIE: LXK → LDK → inne → LFH GZN
    const lxkRec = recs.find(r => r.name === 'LXK 10 H');
    const ldkRecs = recs.filter(r => r.name.includes('LDK') && r.name !== 'LXK 10 H');
    const lfhGznRec = recs.find(r => r.name === 'LFH GZN');
    const inneRecs = recs.filter(r =>
      r.name !== 'LXK 10 H' &&
      !r.name.includes('LDK') &&
      r.name !== 'LFH GZN'
    );

    const sortedLDK = ldkRecs.sort((a, b) => a.laRecommended - b.laRecommended);
    const sortedInne = inneRecs.sort((a, b) => a.laRecommended - b.laRecommended);

    const sortedRecs = [
      ...(lxkRec ? [lxkRec] : []),
      ...sortedLDK,
      ...sortedInne,
      ...(lfhGznRec ? [lfhGznRec] : [])
    ];

    if (sortedRecs.length === 0) {
      setRecommendations([]);
      setErrors({ global: 'Brak odpowiednich łączników. Spróbuj zmniejszyć grubość izolacji lub zwiększyć zagłębienie.' });
    } else {
      setRecommendations(sortedRecs);
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