import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container, Typography, Stepper as MuiStepper, Step, StepLabel } from '@mui/material';
import { models } from './data';
import { Step0, Step1, Step2, StepAdhesive, StepRecessed, Step4 } from './Steps';

const starfixTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#dd0000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f0f0',
        },
      },
    },
  },
});

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    substrate: 'A',
    insulationType: 'EPS',
    hD: 12,
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

    const filteredModels = models.filter(model =>
      model.categories.includes(substrate) &&
      (insulationType === 'EPS' || (insulationType === 'MW' && model.hasMetalPin))
    );

    if (!filteredModels.length) {
      setRecommendations([]);
      setStep(5);
      return;
    }

    const recs = filteredModels
      .map(model => {
        const hefForSubstrate = typeof model.hef === 'object'
          ? model.hef[substrate]
          : model.hef;

        if (hefForSubstrate === undefined) {
          return null;
        }

        const laMin = hefForSubstrate + hDEffMm + tfixMm + ttol;
        const laAvailable = model.availableLengths.find(la => la >= laMin);

        if (!laAvailable) {
          return null;
        }

        const maxHD = (laAvailable - hefForSubstrate - tfixMm - ttol) / 10;

        return { ...model, laRecommended: laAvailable, maxHD, hef: hefForSubstrate };
      })
      .filter(Boolean)
      .sort((a, b) => a.laRecommended - b.laRecommended);

    setRecommendations(recs);
    setStep(5);
  };

  const nextStep = () => {
    if (validateStep(step)) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const goToStep = (index) => {
    if (index > step) {
      let isValid = true;
      for (let i = step; i < index; i++) {
        if (!validateStep(i)) {
          isValid = false;
          break;
        }
      }
      if (isValid) setStep(index);
    } else {
      setStep(index);
    }
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
    'Rekomendacja dla',
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
    <ThemeProvider theme={starfixTheme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img
            src={`${process.env.PUBLIC_URL}/logotyp_outline.svg`}
            alt="Starfix Logo"
            style={{
              width: '100%',
              maxWidth: '250px',
              height: 'auto'
            }}
          />
        </Box>

        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 300,
            letterSpacing: '1.5px',
            my: 3,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
          }}
        >
          Konfigurator Łączników ETICS
        </Typography>

        <MuiStepper activeStep={step} alternativeLabel sx={{ mb: 4, overflow: 'auto' }}>
          {stepLabels.map((label, index) => (
            <Step key={label} completed={step > index} sx={{ minWidth: { xs: 'auto', sm: 'auto' } }}>
              <StepLabel
                onClick={() => goToStep(index)}
                sx={{
                  cursor: 'pointer',
                  fontSize: { xs: '0.65rem', sm: '0.875rem' },
                  '& .MuiStepLabel-label': {
                    fontSize: { xs: '0.65rem', sm: '0.875rem' },
                  }
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </MuiStepper>

        <Box sx={{
          mt: 4,
          p: { xs: 2, sm: 3 },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.05)'
        }}>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            {stepLabels[step]}
          </Typography>
          <Box sx={{ p: 2, borderRadius: 1 }}>{stepComponents[step]}</Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;