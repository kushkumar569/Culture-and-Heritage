'use client';

import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function BubbleParticles() {
  const particlesInit = useCallback(async (eng: any) => {
    await loadFull(eng); // loads all the options/features
  }, []);

  return (
    <Particles
      id="bubble-background"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: { value: "#0f172a" }, // deep navy blue background
        },
        particles: {
          number: {
            value: 30,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: { value: "#00ffff" }, // cyan bubble color
          shape: { type: "circle" },
          opacity: {
            value: 0.3,
            random: true,
          },
          size: {
            value: { min: 10, max: 30 },
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "top",
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 150,
              size: 20,
              duration: 2,
              opacity: 0.8,
              speed: 2,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
