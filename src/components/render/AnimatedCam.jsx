import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useScroll } from '@react-three/drei';

const CameraAnimation = () => {
  const cameraRef = useRef();
  const scroll = useScroll(); // Hook to get scroll offset

  const initialPosition = [-0.177, 5.299, 15];
  const initialRotation = [-0.191, 0.018, 0.003];
  let finalPosition = [-0.4, 12, 0.75];
  let finalRotation = [-1.5, 0, 0];

  useEffect(() => {
    if (window.innerWidth < 450) {
    finalPosition = [0, 12.8, 0.75];
    finalRotation = [-1.5, 0, 1.58];  
    }
  }, [])

  useFrame(() => {
    const scrollProgress = scroll.offset; 
    // Interpolate position and rotation based on scroll progress
    const position = initialPosition.map((start, index) =>
      start + (finalPosition[index] - start) * scrollProgress
    );
    const rotation = initialRotation.map((start, index) =>
      start + (finalRotation[index] - start) * scrollProgress
    );

    // Apply the interpolated values to the camera
    cameraRef.current.position.set(...position);
    cameraRef.current.rotation.set(...rotation);
  });

return <PerspectiveCamera ref={cameraRef} makeDefault={true} far={1000} near={0.1} fov={22.895} position={initialPosition} rotation={initialRotation} />

};

export default CameraAnimation;