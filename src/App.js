import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container, Typography, Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import { red } from '@mui/material/colors';
import { models } from './data';
import { Step0, Step1, Step2, StepAdhesive, StepRecessed, Step4 } from './Steps';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: red,
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'radial-gradient(circle, #ffffff 0%, #fafafa 100%)',
          backgroundAttachment: 'fixed',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
  },
});

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    substrate: 'A',
    insulationType: 'EPS',
    hD: 1,
    adhesiveThickness: 1,
    recessed: false,
  });
  const [recommendations, setRecommendations] = useState([]);
  const [errors, setErrors] = useState({});

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 0 && !formData.substrate) newErrors.substrate = 'Wybierz rodzaj podłoża';
    if (currentStep === 1 && !formData.insulationType) newErrors.insulationType = 'Wybierz typ izolacji';
    if (currentStep === 2 && (formData.hD < 1 || formData.hD > 40)) newErrors.hD = 'Grubość izolacji musi być między 1 a 40 cm';
    if (currentStep === 3 && (formData.adhesiveThickness < 1 || formData.adhesiveThickness > 5)) newErrors.adhesiveThickness = 'Grubość warstwy kleju musi być między 1 a 5 cm';
    if (currentStep === 4 && typeof formData.recessed !== 'boolean') newErrors.recessed = 'Wybierz opcję montażu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateLa = () => {
    if (!validateStep(4)) return;

    const { substrate, insulationType, hD, adhesiveThickness, recessed } = formData;
    const hDEff = recessed ? hD - 2 : hD;
    const tfixMm = adhesiveThickness * 10;
    const hDEffMm = hDEff * 10;
    const ttol = 10;

    const filtered = models.filter(model =>
      model.categories.includes(substrate) &&
      (insulationType === 'EPS' || (insulationType === 'MW' && model.hasMetalPin))
    );

    if (!filtered.length) {
      console.warn(`Brak pasujących modeli dla: podłoże=${substrate}, izolacja=${insulationType}`);
      setRecommendations([]);
      setStep(5);
      return;
    }

    const recs = filtered
      .map(model => {
        const laMin = model.hef + hDEffMm + tfixMm + ttol;
        const laAvailable = model.availableLengths.find(la => la >= laMin) || Math.max(...model.availableLengths);
        const maxFixture = laAvailable - model.hef;
        const maxHD = (Math.max(...model.availableLengths) - model.hef - tfixMm - ttol) / 10; // Maks. grubość izolacji w cm
        const warning = laAvailable < laMin
          ? `Długość łącznika (${laAvailable} mm) jest mniejsza od wymaganej (${laMin} mm) dla modelu ${model.name}`
          : hDEffMm > maxFixture
            ? `Grubość izolacji (${hDEffMm} mm) przekracza maksymalną dopuszczalną (${maxFixture} mm) dla modelu ${model.name}`
            : '';
        return { ...model, laRecommended: laAvailable, warning, maxHD };
      })
      .sort((a, b) => a.laRecommended - b.laRecommended);

    setRecommendations(recs);
    setStep(5);
  };

  const nextStep = () => {
    if (validateStep(step)) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const goToStep = (index) => {
    let isValid = true;
    for (let i = step; i < index; i++) {
      if (!validateStep(i)) {
        isValid = false;
        break;
      }
    }
    if (isValid) setStep(index);
  };

  const handleStartOver = () => {
    setFormData({
      substrate: 'A',
      insulationType: 'EPS',
      hD: 1,
      adhesiveThickness: 1,
      recessed: false,
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
    'Montaż zagłębiony ?',
    'Rekomendacja',
  ];

  const stepColors = [
    '#4A90E2',
    '#50E3C2',
    '#F5A623',
    '#BD10E0',
    '#9013FE',
    '#7ED321',
  ];

  const stepComponents = [
    <Step0 substrate={formData.substrate} setSubstrate={(value) => updateFormData('substrate', value)} errors={errors} nextStep={nextStep} />,
    <Step1 insulationType={formData.insulationType} setInsulationType={(value) => updateFormData('insulationType', value)} errors={errors} nextStep={nextStep} prevStep={prevStep} />,
    <Step2 hD={formData.hD} setHD={(value) => updateFormData('hD', value)} errors={errors} nextStep={nextStep} prevStep={prevStep} />,
    <StepAdhesive adhesiveThickness={formData.adhesiveThickness} setAdhesiveThickness={(value) => updateFormData('adhesiveThickness', value)} errors={errors} nextStep={nextStep} prevStep={prevStep} />,
    <StepRecessed recessed={formData.recessed} setRecessed={(value) => updateFormData('recessed', value)} errors={errors} calculateLa={calculateLa} prevStep={prevStep} />,
    <Step4 recommendations={recommendations} prevStep={prevStep} setStep={setStep} handleStartOver={handleStartOver} {...formData} />,
  ];

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>Konfigurator Łączników ETICS</Typography>
        <MuiStepper activeStep={step} alternativeLabel sx={{ mt: 2, mb: 4 }}>
          {stepLabels.map((label, index) => (
            <Step key={label}>
              <StepLabel
                onClick={() => goToStep(index)}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' },
                  ...(step === index && { transform: 'scale(1.1)' }),
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </MuiStepper>
        <Box sx={{
          mt: 4,
          p: 3,
          bgcolor: stepColors[step],
          color: 'white',
          borderRadius: 2,
          boxShadow: 3
        }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">{stepLabels[step]}</Typography>
          <Box sx={{ p: 2, bgcolor: 'background.paper', color: 'text.primary', borderRadius: 1 }}>{stepComponents[step]}</Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;