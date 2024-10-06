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

interface formTab {label: string, subtitle: string, fieldName: keyof FormData}

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

  console.log(formData)

  const tabs : formTab[] = [
    { label: 'Sistema solar', subtitle: 'El sistema solar donde se encuentra el exoplaneta.', fieldName:'solarSystem' },
    { label: 'Nombre', subtitle: 'El nombre del exoplaneta.', fieldName:'name' },
    { label: 'Radio del planeta', subtitle: 'El radio del exoplaneta en kilómetros.', fieldName:'radius' },
    { label: 'Masa del planeta', subtitle: 'La masa del exoplaneta en relación a la masa de la Tierra.', fieldName:'mass' },
    { label: 'Tipo', subtitle: 'El tipo de exoplaneta (rocoso, gaseoso, etc.).', fieldName:'type' },
    { label: 'Periodo orbital', subtitle: 'El tiempo que tarda el exoplaneta en completar una órbita alrededor de su estrella.', fieldName:'orbitalPeriod' },
    { label: 'Luminosidad de la estrella', subtitle: 'La luminosidad de la estrella alrededor de la cual orbita el exoplaneta.', fieldName:'luminosityOfStar' },
    { label: 'Distancia desde la estrella', subtitle: 'La distancia entre el exoplaneta y su estrella en unidades astronómicas.', fieldName:'distanceToStar' }
  ];

  const currentTabInfo = tabs[currentTab]
  const progressValue = ((currentTab) / tabs.length) * 110;

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
      <DialogTitle variant='h4' display='flex' sx={{ textAlign: 'center', color: '#fff', fontFamily: 'AstroFuture, sans-serif',fontSize:'25px',width:'100%' }}>🚀 Editar Exoplaneta </DialogTitle>
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
            {tabs.map((tab, index) => (
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

        <Box mt={4}>
          <Box>
            <Typography variant='h5' sx={{ color: 'white', fontFamily: 'Retropix', }}>{currentTabInfo.label}</Typography>
            <Typography variant="subtitle1" sx={{ color: 'white',fontFamily: 'Retropix' }}>{currentTabInfo.subtitle}</Typography>
            <TextField
              label={currentTabInfo.label}  // Etiqueta amigable para los usuarios
              name={currentTabInfo.fieldName}
              fullWidth
              value={formData[currentTabInfo.fieldName]}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined" // Asegura un borde claro alrededor del campo
              InputProps={{
                sx: {
                  fontFamily: 'Retropix',
                  backgroundColor: '#fff', // Fondo blanco del campo de texto
                  borderRadius: 2,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black', // Borde negro al hacer hover,
                    fontFamily: 'Retropix'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black', // Borde negro cuando está enfocado,
                    fontFamily: 'Retropix'
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  padding: '0 4px',           // Espacio para evitar superposición con el campo de texto
                  color: 'black',             // Color negro del texto del label
                  fontFamily: 'Retropix',
                  '&.MuiInputLabel-shrink': { // Aplica cuando el label está flotando
                    transform: 'translate(14px, -9px) scale(0.75)', // Ajuste de posición para el label flotante
                    backgroundColor: appColorPalette['PURPLE'].bright,
                    color: 'white',
                    fontFamily: 'Retropix'
                  },
                  borderRadius:'5px'
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