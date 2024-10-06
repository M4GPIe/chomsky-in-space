import React, { useRef, useEffect, ReactNode } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  speed: number;
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

    // Generate stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    // Function to draw stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      updateStars();
      drawStars();
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
