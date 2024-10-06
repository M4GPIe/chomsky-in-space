import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import PlanetScene from './components/PlanetScene';
import PlanetInfoModal from './components/PlanetInfoModal';

const CreatePlanetView: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <Box display="flex" height="100vh" width="100vw">
                <Box flex={1}>
                    <PlanetScene />
                </Box>
                <PlanetInfoModal open={true} handleClose={()=>{}}/>
            </Box>
        </>
    );
};

export default CreatePlanetView;
