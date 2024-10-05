import React from 'react';
import { Box, Typography, Modal } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '10%',
    right: '5%',
    width: 300,
    bgcolor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const PlanetInfoModal: React.FC = () => {
    return (
        <Modal open={true} onClose={() => {}}>
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Planet: Exo-212b
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    <strong>Type:</strong> Rocky
                </Typography>
                <Typography variant="body1">
                    <strong>Radius:</strong> 6,371 km
                </Typography>
                <Typography variant="body1">
                    <strong>Mass:</strong> 5.972 × 10^24 kg
                </Typography>
                <Typography variant="body1">
                    <strong>Orbital Period:</strong> 365 days
                </Typography>
                <Typography variant="body1">
                    <strong>Atmosphere:</strong> 78% Nitrogen, 21% Oxygen
                </Typography>
                <Typography variant="body1">
                    <strong>Surface Temperature:</strong> 288 K (15 °C)
                </Typography>
            </Box>
        </Modal>
    );
};

export default PlanetInfoModal;
