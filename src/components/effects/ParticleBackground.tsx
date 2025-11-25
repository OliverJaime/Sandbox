import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  particleSize?: number;
  animationSpeed?: number;
}

export default function ParticleBackground({
  particleCount = 2000,
  particleColor = '#0ea5e9',
  particleSize = 2,
  animationSpeed = 0.0005
}: ParticleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let THREE: any;
    let scene: any;
    let camera: any;
    let renderer: any;
    let particles: any;
    let animationFrameId: number;

    // Dynamically import Three.js
    import('three').then((module) => {
      THREE = module;

      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      // Particle geometry
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 80;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);

        velocities[i] = (Math.random() - 0.5) * 0.1;
        velocities[i + 1] = (Math.random() - 0.5) * 0.1;
        velocities[i + 2] = (Math.random() - 0.5) * 0.1;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Particle material
      const material = new THREE.PointsMaterial({
        color: particleColor,
        size: particleSize,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 200;

      // Mouse interaction
      let mouseX = 0;
      let mouseY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Animation loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        particles.rotation.x += animationSpeed;
        particles.rotation.y += animationSpeed * 1.5;

        particles.rotation.x += (mouseY - particles.rotation.x) * 0.0004;
        particles.rotation.y += (mouseX - particles.rotation.y) * 0.0004;

        const posArray = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < posArray.length; i += 3) {
          posArray[i] += velocities[i];
          posArray[i + 1] += velocities[i + 1];
          posArray[i + 2] += velocities[i + 2];

          const distance = Math.sqrt(
            posArray[i] ** 2 + posArray[i + 1] ** 2 + posArray[i + 2] ** 2
          );
          
          if (distance > 150) {
            velocities[i] *= -1;
            velocities[i + 1] *= -1;
            velocities[i + 2] *= -1;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        if (containerRef.current && renderer && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
        if (geometry) geometry.dispose();
        if (material) material.dispose();
        if (renderer) renderer.dispose();
      };
    }).catch(error => {
      console.error('Failed to load Three.js:', error);
    });

    // Cleanup on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [particleCount, particleColor, particleSize, animationSpeed]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
}
