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
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { substrates, insulationTypes } from './data';

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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Dalej
        </Button>
      </Box>
    </Box>
  );
};

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Wstecz
        </Button>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Dalej
        </Button>
      </Box>
    </Box>
  );
};

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Wstecz
        </Button>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Dalej
        </Button>
      </Box>
    </Box>
  );
};

export const StepAdhesive = ({ adhesiveThickness, setAdhesiveThickness, errors, nextStep, prevStep }) => {
  const handleAdhesiveThicknessChange = (event, newValue) => {
    setAdhesiveThickness(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body1" align="center" sx={{ mb: -1 }}>Grubość warstwy kleju: {adhesiveThickness * 10} mm</Typography>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Wstecz
        </Button>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Dalej
        </Button>
      </Box>
    </Box>
  );
};

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Wstecz
        </Button>
        <Button variant="contained" onClick={calculateLa} endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Pokaż rekomendacje
        </Button>
      </Box>
    </Box>
  );
};

export const Step4 = ({ recommendations, prevStep, setStep, substrate, insulationType, hD, adhesiveThickness, recessed }) => {
  const substrateLabel = substrates.find(s => s.value === substrate)?.label;
  const insulationTypeLabel = insulationTypes.find(i => i.value === insulationType)?.label;

  const handleStartOver = () => {
    setStep(0);
  };

  const summaryData = [
    { name: 'Podłoże', value: substrateLabel },
    { name: 'Typ izolacji', value: insulationTypeLabel },
    { name: 'Grubość izolacji', value: `${hD} cm` },
    { name: 'Grubość warstwy kleju', value: `${adhesiveThickness * 10} mm` },
    { name: 'Montaż zagłębiony', value: recessed ? 'Tak' : 'Nie' },
  ];

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mb: 3, overflowX: 'auto' }}>
        <Table size="small" aria-label="summary of selections">
          <TableBody>
            {summaryData.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                  {row.name}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {recommendations.length > 0 ? (
        <TableContainer component={Paper} sx={{ mt: 2, overflowX: 'auto' }}>
          <Table stickyHeader aria-label="recommended fasteners" size={{ xs: 'small', sm: 'medium' }}>
            <TableHead>
              <TableRow key="header">
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: { xs: '0.75rem', sm: '1rem' } }}>Nazwa</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: { xs: '0.75rem', sm: '1rem' } }}>hef (mm)</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: { xs: '0.75rem', sm: '1rem' }, display: { xs: 'none', md: 'table-cell' } }}>Materiał</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: { xs: '0.75rem', sm: '1rem' } }}>Maks. grubość (cm)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recommendations.map((rec) => (
                <TableRow key={rec.name}>
                  <TableCell sx={{ textAlign: 'center', fontSize: { xs: '0.75rem', sm: '1rem' } }}>{rec.name} {rec.laRecommended} mm</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: { xs: '0.75rem', sm: '1rem' } }}>{rec.hef}</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: { xs: '0.75rem', sm: '1rem' }, display: { xs: 'none', md: 'table-cell' } }}>{rec.material}</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontSize: { xs: '0.75rem', sm: '1rem' } }}>{rec.maxHD.toFixed(1)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" align="center" sx={{ my: 4, color: 'text.primary', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Nie znaleziono odpowiedniego produktu. Prosimy o kontakt telefoniczny z naszym działem technicznym w celu uzyskania pomocy.
        </Typography>
      )}
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep} sx={{ width: { xs: '100%', sm: 'auto' } }}>Wstecz</Button>
        <Button variant="outlined" onClick={handleStartOver} sx={{ width: { xs: '100%', sm: 'auto' } }}>Zacznij od nowa</Button>
      </Box>
    </Box>
  );
};