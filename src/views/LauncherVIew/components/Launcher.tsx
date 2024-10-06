import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import StarryBackground from './StarryBackground';
import '../../../fonts.css';
import './Launcher.css';

import { useNavigationChange } from '../../../hooks/useNavigationChange';
import { appColorPalette } from '../../utils';

const Launcher: React.FC = () => {
    const [showContent, setShowContent] = useState(false);
    const { handleOnRouteChange } = useNavigationChange();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <StarryBackground>
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '100vh',
                    width: '100vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Stack spacing={3}>
                    <Typography
                        className="app-title"
                        variant="h2"
                        sx={{
                            fontFamily: 'AstroFuture, sans-serif',
                            marginBottom: '100px',
                            color: appColorPalette['GREEN'].main
                        }}
                    >
                        Beyond the marble
                    </Typography>

                    {showContent && (
                        <>
                            <Typography
                                className="content"
                                variant="h5"
                                gutterBottom
                                sx={{ 
                                  fontFamily: 'Retropix' ,  }}
                            >
                                Begin your challenge
                            </Typography>
                            {/* TODO: change navigation route */}
                            <Stack width="100%" display="flex" justifyContent="center" alignItems="center">
                      
                            <div className="button-container success"    onClick={() => handleOnRouteChange('/sandbox')}

                                >
      <div className="corner corner-top-left"></div>
      <div className="corner corner-top-right"></div>
      <div className="corner corner-bottom-left"></div>
      <div className="corner corner-bottom-right"></div>
      <div className="border border-top"></div>
      <div className="border border-bottom"></div>
      <div className="border border-left"></div>
      <div className="border border-right"></div>
      <p>
        START
      </p>
    </div>
                            </Stack>
                        </>
                    )}

                </Stack>
            </Box>
        </StarryBackground>
    );
};

export default Launcher;
