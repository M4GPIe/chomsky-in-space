import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, TextField, Box, Tooltip, Typography
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { Star, RocketLaunch } from '@mui/icons-material'; // Iconos espaciales
import { appColorPalette } from '../../utils';
import PublicIcon from '@mui/icons-material/Public';

interface FormData {
  solarSystem: string;
  name: string;
  radius: number;
  mass: number;
  type: string;
  orbitalPeriod: number;
  luminosityOfStar: number;
  distanceToStar: number;
}

interface ExoplanetFormModalProps {
  open: boolean;
  handleClose: () => void;
}

const ExoplanetFormModal: React.FC<ExoplanetFormModalProps> = ({ open, handleClose }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    solarSystem: '',
    name: '',
    radius: 0,
    mass: 0,
    type: '',
    orbitalPeriod: 0,
    luminosityOfStar: 0,
    distanceToStar: 0,
  });

  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const tabLabels = [
    { label: 'Sistema solar', subtitle: 'El sistema solar donde se encuentra el exoplaneta.' },
    { label: 'Nombre', subtitle: 'El nombre del exoplaneta.' },
    { label: 'Radio del planeta', subtitle: 'El radio del exoplaneta en kilómetros.' },
    { label: 'Masa del planeta', subtitle: 'La masa del exoplaneta en relación a la masa de la Tierra.' },
    { label: 'Tipo', subtitle: 'El tipo de exoplaneta (rocoso, gaseoso, etc.).' },
    { label: 'Periodo orbital', subtitle: 'El tiempo que tarda el exoplaneta en completar una órbita alrededor de su estrella.' },
    { label: 'Luminosidad de la estrella', subtitle: 'La luminosidad de la estrella alrededor de la cual orbita el exoplaneta.' },
    { label: 'Distancia desde la estrella', subtitle: 'La distancia entre el exoplaneta y su estrella en unidades astronómicas.' }
  ];

  const currentTabInfo = tabLabels[currentTab]
  const progressValue = ((currentTab) / tabLabels.length) * 110;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          position: 'absolute',
          top: '10%',
          right: '5%',
          margin: 0,
          width: '400px',
          borderRadius: 5,
          backgroundColor: appColorPalette['PURPLE'].dark, 
          color: '#fff', // Texto blanco
        },
      }}
    >
      <DialogTitle variant='h4' sx={{ textAlign: 'center', color: '#B8FF85' }}>🚀 Editar Exoplaneta </DialogTitle>
      <DialogContent>
        <Box sx={{ position: 'relative', my: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              height: '8px',
              backgroundColor: '#ffffff', // Barra de progreso celeste
              '& .MuiLinearProgress-bar': {
                backgroundColor: appColorPalette['PURPLE'].bright, // Color del progreso en amarillo
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', width: '100%', top: '-6px' }}>
            {tabLabels.map((tab, index) => (
              <Tooltip key={index} title={tab.label}>
                <Box
                  onClick={() => handleTabChange(index)}
                  sx={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: index <= currentTab ? appColorPalette['PURPLE'].bright : '#e0e0e0',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1,
                    '&:hover': {
                      backgroundColor: appColorPalette['PURPLE'].main,
                    },
                  }}
                >
                  {index <= currentTab ? <RocketLaunch fontSize="small" sx={{color:'white'}}/> : <PublicIcon fontSize="small" />}
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Box>

        <Box mt={2}>
          <Box>
            <Typography variant='h5' sx={{ color: 'white' }}>{currentTabInfo.label}</Typography>
            <Typography variant="subtitle1" sx={{ color: 'white' }}>{currentTabInfo.subtitle}</Typography>
            <TextField
              label={currentTabInfo.label}
              name={currentTabInfo.label}
              fullWidth
              value={formData.solarSystem}
              onChange={handleInputChange}
              margin="normal"
              InputProps={{
                sx: {
                  backgroundColor: '#fff', // Campo de texto blanco
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ExoplanetFormModal;
