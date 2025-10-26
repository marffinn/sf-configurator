import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container, Typography, Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import { red } from '@mui/material/colors';
import { models } from './data'; // Keep models as it's used in calculateLa
import { Step0, Step1, Step2, StepAdhesive, StepRecessed, Step4 } from './Steps';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: red,
    // The background will be handled by the CssBaseline override for a gradient effect.
    background: {
      default: '#fafafa', // Fallback color
      paper: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'radial-gradient(circle, #ffffff 0%, #fafafa 100%)',
          backgroundAttachment: 'fixed', // Keeps the gradient in place on scroll
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
    hD: 1, // cm
    adhesiveThickness: 1, // cm
    recessed: false,
  });
  const [recommendations, setRecommendations] = useState([]);
  const [errors, setErrors] = useState({});

  // Destructure for easier access
  const { substrate, insulationType, hD, adhesiveThickness, recessed } = formData;

  const steps = [
    { label: 'Rodzaj podłoża', color: '#4A90E2' },
    { label: 'Typ izolacji', color: '#50E3C2' },
    { label: 'Grubość izolacji', color: '#F5A623' },
    { label: 'Grubość warstwy kleju', color: '#BD10E0' },
    { label: 'Montaż zagłębiony', color: '#9013FE' },
    { label: 'Rekomendacja', color: '#7ED321' }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (currentStep) => {
    let newErrors = {};
    switch (currentStep) {
      case 0:
        if (!substrate) newErrors.substrate = 'Wybierz rodzaj podłoża';
        break;
      case 1:
        if (!insulationType) newErrors.insulationType = 'Wybierz typ izolacji';
        break;
      case 2:
        if (hD < 1 || hD > 40) newErrors.hD = 'Grubość izolacji musi być między 1 a 40 cm';
        break;
      case 3:
        if (adhesiveThickness < 1 || adhesiveThickness > 5) newErrors.adhesiveThickness = 'Grubość warstwy kleju musi być między 1 a 5 cm';
        break;
      case 4:
        if (typeof recessed !== 'boolean') newErrors.recessed = 'Wybierz opcję montażu';
        break;
      case 5:
        if (!recommendations.length) newErrors.recommendations = 'Oblicz rekomendacje przed kontynuacją';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateLa = () => {
    if (!validateStep(4)) return;
    const hDEff = formData.recessed ? formData.hD - 2 : formData.hD;
    const tfix = adhesiveThickness;
    const tfixMm = tfix * 10;
    const hDEffMm = hDEff * 10;
    const ttol = 10;

    const filtered = models.filter(model =>
      model.categories.includes(substrate) &&
      (formData.insulationType === 'EPS' || (formData.insulationType === 'MW' && model.hasMetalPin))
    );
    const recs = filtered.map(model => {
      const laMin = hDEffMm + tfixMm + ttol;
      const laAvailable = model.availableLengths.find(la => la >= laMin) || 'Brak dostępnej długości'; // Corrected line
      return { ...model, laRecommended: laAvailable };
    }).filter(rec => rec.laRecommended !== 'Brak dostępnej długości');

    setRecommendations(recs);
    setStep(5);
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step === 4) calculateLa();
      else setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const goToStep = (index) => {
    if (index < step) {
      setStep(index);
    } else {
      let isValid = true;
      for (let i = 0; i < index; i++) {
        if (!validateStep(i)) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        setStep(index);
      }
    }
  };

  // Common props that don't involve specific formData fields
  const commonStepProps = { errors, setErrors, nextStep, prevStep };

  const stepComponents = [
    <Step0 // Step 0: Rodzaj podłoża
      substrate={formData.substrate}
      setSubstrate={(value) => updateFormData('substrate', value)}
      {...commonStepProps}
    />,
    <Step1 // Step 1: Typ izolacji
      insulationType={formData.insulationType}
      setInsulationType={(value) => updateFormData('insulationType', value)}
      {...commonStepProps}
    />,
    <Step2 // Step 2: Grubość izolacji
      hD={formData.hD}
      setHD={(value) => updateFormData('hD', value)}
      {...commonStepProps}
    />,
    <StepAdhesive // Step 3: Grubość warstwy kleju
      adhesiveThickness={formData.adhesiveThickness}
      setAdhesiveThickness={(value) => updateFormData('adhesiveThickness', value)}
      {...commonStepProps}
    />,
    <StepRecessed // Step 4: Montaż zagłębiony
      recessed={formData.recessed}
      setRecessed={(value) => updateFormData('recessed', value)}
      calculateLa={calculateLa}
      {...commonStepProps}
    />,
    <Step4 recommendations={recommendations} prevStep={prevStep} setStep={setStep} {...formData} /> // Step 5: Rekomendacja
  ];

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>Konfigurator Łączników ETICS</Typography>
        <MuiStepper activeStep={step} alternativeLabel sx={{ mt: 2, mb: 4 }}>
          {steps.map((stepInfo, index) => (
            <Step key={stepInfo.label}>
              <StepLabel
                onClick={() => goToStep(index)}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  ...(step === index && {
                    transform: 'scale(1.1)',
                  }),
                }}
              >
                {stepInfo.label}
              </StepLabel>
            </Step>
          ))}
        </MuiStepper>
        <Box sx={{
          mt: 4,
          p: 3,
          bgcolor: steps[step].color,
          color: 'white',
          borderRadius: 2,
          boxShadow: 3
        }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">{steps[step].label}</Typography>
          <Box sx={{ p: 2, bgcolor: 'background.paper', color: 'text.primary', borderRadius: 1 }}>{stepComponents[step]}</Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;