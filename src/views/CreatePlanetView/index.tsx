import React, { useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
import PlanetScene from './components/PlanetScene';
import PlanetInfoModal from './components/PlanetInfoModal';
import { Earth, Exoplanet } from '../../models/planet';

export interface FormData {
  solarSystem: string;
  name: string;
  radius: number;
  mass: number;
  type: string;
  orbitalPeriod: number;
  luminosityOfStar: number;
  distanceToStar: number;
}

const CreatePlanetView: React.FC = () => {

    
    const [formData, setFormData] = useState<FormData>({
        solarSystem: '',
        name: '',
        radius: Earth.radius,
        mass: Earth.mass,
        type: Earth.type,
        orbitalPeriod: 0,
        luminosityOfStar: 0,
        distanceToStar: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    return (
        <>
            <CssBaseline />
            <Box display="flex" height="100vh" width="100vw">
                <Box flex={1}>
                    <PlanetScene exoplanet={{...formData, aqua: 0, maxAltitude: formData.radius, minAltitude: formData.radius} as Exoplanet}/>
                </Box>
                <PlanetInfoModal open={true} handleClose={()=>{}} handleInputChange={handleInputChange} formData={formData}/>
            </Box>
        </>
    );
};

export default CreatePlanetView;
