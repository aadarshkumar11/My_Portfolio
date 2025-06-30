import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBg: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: 'transparent' },
        particles: {
          number: { value: 60, density: { enable: true, value_area: 800 } },
          color: { value: ['#6366f1', '#a78bfa', '#f472b6'] },
          shape: { type: 'circle' },
          opacity: { value: 0.3 },
          size: { value: 4, random: true },
          move: { enable: true, speed: 1, direction: 'none', outModes: 'out' },
          links: { enable: true, color: '#a78bfa', opacity: 0.2, width: 1 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: 'repulse' } },
          modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
};

export default ParticlesBg;
