import React, { useRef, useEffect, ReactNode } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

interface VioletSpot {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

interface StarryBackgroundProps {
  children: ReactNode;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to full window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: Star[] = [];
    const numStars = 100; // Adjust this for more or fewer stars
    const violetSpots: VioletSpot[] = [];
    const numVioletSpots = 4; // Adjust the number of violet spots

    // Generate stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    // Generate violet blur spots
    for (let i = 0; i < numVioletSpots; i++) {
      violetSpots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 200 + 50, // Random size of blur spots
        speedX: (Math.random() * 0.2 - 0.1) * 0.1, // Very slow horizontal speed
        speedY: (Math.random() * 0.2 - 0.1) * 0.1, // Very slow vertical speed
      });
    }

    // Function to draw violet blur spots
    const drawVioletSpots = () => {
      violetSpots.forEach(spot => {
        const gradient = ctx.createRadialGradient(spot.x, spot.y, spot.size / 4, spot.x, spot.y, spot.size);

        // Add violet hues to the gradient
        gradient.addColorStop(0, 'rgba(231, 105, 228, 0.3)'); // Center color
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Fade to transparent

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, spot.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Function to update violet spot positions slowly
    const updateVioletSpots = () => {
      violetSpots.forEach(spot => {
        spot.x += spot.speedX;
        spot.y += spot.speedY;

        // Loop spots back within bounds of the canvas
        if (spot.x > canvas.width) spot.x = 0;
        if (spot.x < 0) spot.x = canvas.width;
        if (spot.y > canvas.height) spot.y = 0;
        if (spot.y < 0) spot.y = canvas.height;
      });
    };

    // Function to draw stars
    const drawStars = () => {
      ctx.fillStyle = '#fff'; // Star color

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Function to update star positions
    const updateStars = () => {
      stars.forEach(star => {
        star.y += star.speed;
        // Loop stars back to top if they go out of view
        if (star.y > canvas.height) star.y = 0;
      });
    };

    let animationId: number;

    // Animation loop
    const animate = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw black background
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update violet blur spots
      drawVioletSpots();
      updateVioletSpots();

      // Draw and update stars
      drawStars();
      updateStars();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Canvas as background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // Behind other content
        }}
      />
      {/* Content goes here */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default StarryBackground;
