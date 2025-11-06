// src/Steps.js – ZAKTUALIZOWANY: zakres suwaka 20–160 mm (krok 20 mm)
import React from 'react';
import {
  Box, Button, Typography, FormControl, InputLabel, Select, MenuItem,
  Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Link as MuiLink, Alert, Switch, FormControlLabel
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { substrates, insulationTypes } from './data';

export function Step0(props) {
  const { substrate, setSubstrate, errors, nextStep } = props;
  const handleChange = function (e) {
    return setSubstrate(e.target.value);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth error={!!errors.substrate}>
        <InputLabel id="substrate-select-label">Podłoże</InputLabel>
        <Select labelId="substrate-select-label" value={substrate} label="Podłoże" onChange={handleChange}>
          {substrates.map(function (s) {
            return <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>;
          })}
        </Select>
        {errors.substrate && <Typography color="error" variant="caption">{errors.substrate}</Typography>}
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>Dalej</Button>
      </Box>
    </Box>
  );
}

export function Step1(props) {
  const { insulationType, setInsulationType, errors, nextStep, prevStep } = props;
  const handleChange = function (e) {
    return setInsulationType(e.target.value);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth error={!!errors.insulationType}>
        <Typography variant="subtitle1">Typ izolacji</Typography>
        <Select value={insulationType} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>Wybierz typ izolacji</MenuItem>
          {insulationTypes.map(function (t) {
            return <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>;
          })}
        </Select>
        {errors.insulationType && <Typography color="error" variant="caption">{errors.insulationType}</Typography>}
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep} sx={{ width: { xs: '100%', sm: 'auto' } }}>Wstecz</Button>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>Dalej</Button>
      </Box>
    </Box>
  );
}

export function Step2(props) {
  const { hD, setHD, errors, nextStep, prevStep } = props;
  const handleChange = function (event, value) {
    return setHD(value);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body1" align="center" sx={{ mb: -1 }}>Grubość izolacji: {hD} mm</Typography>
      <Slider value={hD} onChange={handleChange} valueLabelDisplay="auto" min={10} max={400} step={10} />
      {errors.hD && <Typography color="error" variant="caption">{errors.hD}</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep} sx={{ width: { xs: '100%', sm: 'auto' } }}>Wstecz</Button>
        <Button variant="contained" onClick={nextStep} endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>Dalej</Button>
      </Box>
    </Box>
  );
}

export function StepAdhesive(props) {
  const { adhesiveThickness, setAdhesiveThickness, errors, prevStep, buttonText = 'Dalej', onNext } = props;
  const handleChange = function (event, value) {
    return setAdhesiveThickness(value);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body1" align="center" sx={{ mb: -1 }}>Grubość warstwy kleju: {adhesiveThickness} mm</Typography>
      <Slider value={adhesiveThickness} onChange={handleChange} valueLabelDisplay="auto" min={10} max={50} step={5} />
      {errors.adhesiveThickness && <Typography color="error" variant="caption">{errors.adhesiveThickness}</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep} sx={{ width: { xs: '100%', sm: 'auto' } }}>Wstecz</Button>
        <Button variant="contained" onClick={onNext} endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>{buttonText}</Button>
      </Box>
    </Box>
  );
}

// ZAKTUALIZOWANY: zakres 20–160 mm, krok 20 mm, domyślna 20 mm
export function StepRecessedDepth(props) {
  const { recessedDepth, setRecessedDepth, errors, prevStep, buttonText = 'Dalej', onNext } = props;

  const useRecessed = recessedDepth > 0;

  const handleToggle = (event) => {
    const checked = event.target.checked;
    if (checked) {
      setRecessedDepth(20);
    } else {
      setRecessedDepth(0);
    }
  };

  const handleSliderChange = (event, value) => {
    setRecessedDepth(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Switch
              checked={useRecessed}
              onChange={handleToggle}
              color="primary"
            />
          }
          label={useRecessed ? 'Tak' : 'Nie'}
          labelPlacement="end"
          sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500 } }}
        />
      </Box>

      {useRecessed && (
        <Box sx={{ px: 2 }}>
          <Typography variant="body1" align="center" sx={{ mb: -1 }}>
            Głębokość zagłębienia: {recessedDepth} mm
          </Typography>
          <Slider
            value={recessedDepth}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={20}
            max={160}
            step={20}
            marks={[
              { value: 20, label: '20 mm' },
              { value: 40, label: '40 mm' },
              { value: 60, label: '60 mm' },
              { value: 80, label: '80 mm' },
              { value: 100, label: '100 mm' },
              { value: 120, label: '120 mm' },
              { value: 140, label: '140 mm' },
              { value: 160, label: '160 mm' }
            ]}
          />
          {errors.recessedDepth && (
            <Typography color="error" variant="caption" align="center" display="block">
              {errors.recessedDepth}
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mt: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={prevStep} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          Wstecz
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}

export function Step4(props) {
  const { recommendations, prevStep, setStep, substrate, insulationType, hD, adhesiveThickness, recessedDepth, errors, email } = props;

  const substrateLabel = substrates.find(function (s) { return s.value === substrate; })?.label;
  const insulationTypeLabel = insulationTypes.find(function (i) { return i.value === insulationType; })?.label;
  const handleStartOver = function () { return setStep(0); };

  const summaryData = [
    { name: 'Podłoże', value: substrateLabel },
    { name: 'Typ izolacji', value: insulationTypeLabel },
    { name: 'Grubość izolacji', value: `${hD} mm` },
    { name: 'Grubość warstwy kleju', value: `${adhesiveThickness} mm` },
    { name: 'Głębokość zagłębienia', value: recessedDepth === 0 ? 'Brak (montaż na płasko)' : `${recessedDepth} mm` },
  ];

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mb: 2, overflowX: 'auto', backgroundColor: 'grey.100', boxShadow: 'none' }}>
        <Table size="small">
          <TableBody>
            {summaryData.map(function (row) {
              return (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'normal', color: 'grey.700', fontSize: { xs: '0.65rem', sm: '0.875rem' }, py: 0.5 }}>{row.name}</TableCell>
                  <TableCell align="right" sx={{ color: 'grey.700', fontSize: { xs: '0.65rem', sm: '0.875rem' }, py: 0.5 }}>{row.value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {errors.global ? (
        <Typography color="error" align="center" sx={{ my: 4, fontWeight: 500, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          {errors.global}
        </Typography>
      ) : recommendations.length > 0 ? (
        <Box>
          <TableContainer component={Paper} sx={{ mt: 2, overflowX: 'auto', mb: 3 }}>
            <Table stickyHeader size=".small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                    Nazwa
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: { xs: '0.75rem', sm: '1rem' }, display: { xs: 'none', md: 'table-cell' } }}>
                    Materiał
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                    Dokumentacja
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recommendations.map(function (rec) {
                  return (
                    <TableRow key={rec.name}>
                      <TableCell sx={{ textAlign: 'left', fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                        {rec.name} {rec.laRecommended} mm
                      </TableCell>
                      <TableCell sx={{ textAlign: 'left', fontSize: { xs: '0.75rem', sm: '1rem' }, display: { xs: 'none', md: 'table-cell' } }}>
                        {rec.material}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        {rec.pdfLink ? (
                          <MuiLink
                            href={rec.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: 'primary.main',
                              display: 'inline-flex',
                              alignItems: 'center',
                              textDecoration: 'none',
                              '&:hover': { textDecoration: 'underline' }
                            }}
                          >
                            <PictureAsPdfIcon sx={{ fontSize: 18, mr: 0.5 }} />
                            <span sx={{ fontSize: { xs: '0.65rem', sm: '0.875rem' } }}>PDF</span>
                          </MuiLink>
                        ) : (
                          <Typography variant="caption" color="text.secondary">—</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Alert severity="success" sx={{ mb: 3 }}>
            Rekomendacje zostały wysłane na adres {email}. Sprawdź swoją skrzynkę odbiorczą!
          </Alert>

        </Box>
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
}