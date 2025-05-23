"use client";

import { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create gradient particles
    const particles = Array(100).fill(null).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      hue: Math.random() * 60 + 180, // Cyan to green range
    }));

    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const drawParticle = (particle: { 
      x: number;
      y: number;
      radius: number;
      hue: number;
    }) => {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius
      );
      gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, 0.3)`);
      gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 70%, 0)`);
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const connectParticles = () => {
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${(p1.hue + p2.hue) / 2}, 100%, 70%, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 20, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Add wave motion
        particle.x += particle.vx + Math.sin(time * 0.001 + particle.y * 0.01) * 0.2;
        particle.y += particle.vy + Math.cos(time * 0.001 + particle.x * 0.01) * 0.2;

        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          particle.x += dx * 0.002;
          particle.y += dy * 0.002;
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        drawParticle(particle);
      });

      connectParticles();
      time++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: 'linear-gradient(135deg, #0a1a2c 0%, #102c42 100%)' }}
    />
  );
};

export default Background;