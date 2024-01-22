'use client';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GUI } from 'dat.gui';
import * as THREE from 'three';

extend({ OrbitControls });

const Model = () => {
  const ref = useRef();
  const { scene, camera } = useThree(); // Get scene and camera from useThree hook
  const fbxLoader = useMemo(() => new FBXLoader(), []);
  
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const pressTimer = useRef(null);

  const handleMouseDown = useCallback((event) => {
    setIsMouseDown(true);
    pressTimer.current = setTimeout(() => {
      setIsLongPress(true);
    }, 500); // 500ms以上押された場合は長押しと判定
    if (event.button === 0 && !isLongPress) { // If left click and not a long press, move forward
      camera.position.z -= 1;
    }
  }, [camera, isLongPress]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    clearTimeout(pressTimer.current); // Clear the timer when the mouse button is released
    setIsLongPress(false); // Reset the long press state
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (!isMouseDown) return; // Only rotate the camera if the mouse is down

    const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    camera.rotation.y -= movementX * 0.01;
    camera.rotation.x -= movementY * 0.01;
  }, [camera, isMouseDown]);

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseDown, handleMouseUp, handleMouseMove]);
  const params = useMemo(() => ({
    scale: 0.01,
    cameraX: -2.2,
    cameraY: 2,
    cameraZ: 13,
  }), []);

  let cameraXController, cameraYController, cameraZController;

  useEffect(() => {
    const gui = new GUI();
    gui.add(params, 'scale', 0.2, 1).onChange((value) => {
      ref.current.scale.set(value, value, value);
    });
    cameraXController = gui.add(params, 'cameraX', -100, 100).onChange((value) => {
      camera.position.x = value;
    });
    cameraYController = gui.add(params, 'cameraY', -100, 100).onChange((value) => {
      camera.position.y = value;
    });
    cameraZController = gui.add(params, 'cameraZ', 1, 100).onChange((value) => {
      camera.position.z = value;
    });

    fbxLoader.load('Cyberpunk_Street.fbx', (object) => {
      object.scale.set(params.scale, params.scale, params.scale);
      ref.current = object;
      
      // Set object position
      object.position.set(0, -2, 0);
      
      scene.add(object); // Add model to scene
    }, undefined, (error) => {
      console.error('An error occurred while loading the model:', error);
    });
  }, []);

  const handleFrame = () => {
    params.cameraX = camera.position.x;
    params.cameraY = camera.position.y;
    params.cameraZ = camera.position.z;
    cameraXController && cameraXController.updateDisplay();
    cameraYController && cameraYController.updateDisplay();
    cameraZController && cameraZController.updateDisplay();
    camera.updateProjectionMatrix();
  };

  useFrame(handleFrame);

  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowUp':
        camera.translateZ(-1);
        break;
      case 'ArrowDown':
        camera.translateZ(1);
        break;
      case 'ArrowLeft':
        camera.rotateY(0.1);
        break;
      case 'ArrowRight':
        camera.rotateY(-0.1);
        break;
      default:
        break;
    }
  }, [camera]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return null;
};

const Controls = () => {
  const controls = useRef();
  const { camera, gl } = useThree(); // Get camera and gl from useThree hook
  useFrame(() => controls.current.update());
 return <orbitControls ref={controls} args={[camera, gl.domElement]} />;
};

const ThreeScene = () => {
    
  return (
    <div style={{ 
        backgroundImage: `url(/cyberpunk.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', width: '100vw', height: '100vh' }}>
      <Canvas 
  style={{ 
    width: '100vw', 
    height: '100vh', 
    margin: 0, 
    padding: 0,
    position: 'absolute',
    backgroundColor: '#000000' // Set background color using CSS
  }}
  gl={{
    antialias: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    outputEncoding: THREE.sRGBEncoding
  }}
  camera={{
    fov: 60,
    near: 0.5,
    far: 80,
    position: [-4.1, 6.1, 16],
  }}
>
        <ambientLight />
        <pointLight position={[0.8, 1.4, 1.0]} intensity={50} />
        <Model />
        {/* <Controls /> */}
      </Canvas>
    </div>
  );
};

export default ThreeScene;
