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
                            <Button
                                className="retro-button"
                                onClick={() => handleOnRouteChange('/sandbox')}
                                sx={{
                                    paddingInline: 3,
                                    backgroundImage: `url('../../../assets/pixel-button.png')`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    width: '200px',
                                    height: '80px',
                                    border: 'none',
                                }}
                            >
                                <Typography
                                    variant='h4'
                                    sx={{
                                        fontFamily: 'Pixelated',
                                        marginBottom: 2., 
                                        fontStyle: {
                                            color: 'white',
                                        }
                                    }}
                                >
                                    start
                                </Typography>
                            </Button>
                            </Stack>
                        </>
                    )}

                </Stack>
            </Box>
        </StarryBackground>
    );
};

export default Launcher;
