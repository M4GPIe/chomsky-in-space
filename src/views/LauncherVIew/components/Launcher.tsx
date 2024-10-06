import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import StarryBackground from './StarryBackground';
import '../../../fonts.css';
import './Launcher.css';
import { useNavigationChange } from '../../../hooks/useNavigationChange';

const Launcher: React.FC = () => {
  const [showContent, setShowContent] = useState(false);
  const { handleOnRouteChange }  = useNavigationChange();

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
                sx={{ fontFamily: 'MoonHouse' }}
              >
                Choose your challenge
              </Typography>
              {/* TODO: change navigation route */}
              <Button className="content" onClick={() => handleOnRouteChange("/sandbox")}>
                Start
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </StarryBackground>
  );
};

export default Launcher;
