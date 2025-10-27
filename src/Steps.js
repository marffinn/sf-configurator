import React from 'react';
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { substrates, insulationTypes } from './data';

// Step0 Component
export const Step0 = ({ substrate, setSubstrate, errors, nextStep, prevStep }) => {
  const handleSubstrateChange = (event) => {
    setSubstrate(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth error={!!errors.substrate}>
        <InputLabel id="substrate-select-label">Podłoże</InputLabel>
        <Select
          labelId="substrate-select-label"
          id="substrate-select"
          value={substrate}
          label="Podłoże"
          onChange={handleSubstrateChange}
        >
          {substrates.map((s) => (
            <MenuItem key={s.value} value={s.value}>
              {s.label}
            </MenuItem>
          ))}
        </Select>
        {errors.substrate && <Typography color="error" variant="caption">{errors.substrate}</Typography>}
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />}>
          Dalej
        </Button>
      </Box>
    </Box>
  );
};

// Step1 Component
export const Step1 = ({ insulationType, setInsulationType, errors, nextStep, prevStep }) => {
  const handleInsulationTypeChange = (event) => {
    setInsulationType(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth error={!!errors.insulationType}>
        <InputLabel id="insulation-type-select-label">Typ izolacji</InputLabel>
        <Select
          labelId="insulation-type-select-label"
          id="insulation-type-select"
          value={insulationType}
          label="Typ izolacji"
          onChange={handleInsulationTypeChange}
        >
          {insulationTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
        {errors.insulationType && <Typography color="error" variant="caption">{errors.insulationType}</Typography>}
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep}>
          Wstecz
        </Button>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />}>
          Dalej
        </Button>
      </Box>
    </Box>
  );
};

// Step2 Component
export const Step2 = ({ hD, setHD, errors, nextStep, prevStep }) => {
  const handleHDChange = (event, newValue) => {
    setHD(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body1" align="center" sx={{ mb: -1 }}>Grubość izolacji: {hD} cm</Typography>
      <Slider
        value={hD}
        onChange={handleHDChange}
        aria-labelledby="insulation-thickness-slider"
        valueLabelDisplay="auto"
        min={1}
        max={40}
        step={1}
      />
      {errors.hD && <Typography color="error" variant="caption">{errors.hD}</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep}>
          Wstecz
        </Button>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />}>
          Dalej
        </Button>
      </Box>
    </Box>
  );
};

// StepAdhesive Component (for adhesive thickness)
export const StepAdhesive = ({ adhesiveThickness, setAdhesiveThickness, errors, nextStep, prevStep }) => {
  const handleAdhesiveThicknessChange = (event, newValue) => {
    setAdhesiveThickness(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body1" align="center" sx={{ mb: -1 }}>Grubość warstwy kleju: {adhesiveThickness} cm</Typography>
      <Slider
        value={adhesiveThickness}
        onChange={handleAdhesiveThicknessChange}
        aria-labelledby="adhesive-thickness-slider"
        valueLabelDisplay="auto"
        min={1}
        max={5}
        step={0.5}
      />
      {errors.adhesiveThickness && <Typography color="error" variant="caption">{errors.adhesiveThickness}</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep}>
          Wstecz
        </Button>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />}>
          Dalej
        </Button>
      </Box>
    </Box>
  );
};

// StepRecessed Component (for recessed mounting)
export const StepRecessed = ({ recessed, setRecessed, calculateLa, errors, nextStep, prevStep }) => {
  const handleRecessedChange = (event) => {
    setRecessed(event.target.checked);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormControlLabel
          control={<Switch checked={recessed} onChange={handleRecessedChange} />}
          label={recessed ? 'Tak' : 'Nie'}
        />
      </Box>
      {errors.recessed && <Typography color="error" variant="caption">{errors.recessed}</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep}>
          Wstecz
        </Button>
        <Button variant="contained" onClick={calculateLa} endIcon={<ArrowForwardIcon />}>
          Pokaż rekomendacje
        </Button>
      </Box>
    </Box>
  );
};

// Step4 Component (from provided context)
export const Step4 = ({ recommendations, prevStep, setStep, substrate, insulationType, hD, adhesiveThickness, recessed }) => {
  // Find the display labels for the selected values
  const substrateLabel = substrates.find(s => s.value === substrate)?.label;
  const insulationTypeLabel = insulationTypes.find(i => i.value === insulationType)?.label;

  const handleStartOver = () => {
    // Assuming setStep(0) is the way to reset the form
    setStep(0);
  };

  return (
    <Box>

      <Box sx={{ mb: 2, p: 1, border: '1px solid grey', borderRadius: 1 }}>
        <Typography variant="body1"><b>Podłoże:</b> {substrateLabel}</Typography>
        <Typography variant="body1"><b>Typ izolacji:</b> {insulationTypeLabel}</Typography>
        <Typography variant="body1"><b>Grubość izolacji:</b> {hD} cm</Typography>
        <Typography variant="body1"><b>Grubość warstwy kleju:</b> {adhesiveThickness} cm</Typography>
        <Typography variant="body1"><b>Montaż zagłębiony:</b> {recessed ? 'Tak' : 'Nie'}</Typography>
      </Box>

      {recommendations.length > 0 ? (
        <TableContainer sx={{ mt: 2, maxHeight: '65vh', overflowY: 'auto' }}>
          <Table stickyHeader aria-label="recommended fasteners">
            <TableHead>
              <TableRow key="header">
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Nazwa</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>hef (mm)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Materiał</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recommendations.map((rec) => (
                <TableRow key={rec.name}>
                  <TableCell sx={{ textAlign: 'center' }}>{rec.name} {rec.laRecommended} mm</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{rec.hef}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{rec.material}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography color="error">Brak pasujących modeli. Skontaktuj się z nami!</Typography>
      )}
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep}>Wstecz</Button>
        <Button variant="outlined" onClick={handleStartOver}>Zacznij od nowa</Button>
      </Box>
    </Box>
  );
};