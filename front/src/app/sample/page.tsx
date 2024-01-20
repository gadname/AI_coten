'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GUI } from 'dat.gui';

extend({ OrbitControls });

const Model = () => {
  const ref = useRef();
  const { scene, camera } = useThree(); // Get scene and camera from useThree hook
  const fbxLoader = new FBXLoader();

  const params = {
    scale: 0.01,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 50,
  };

  useEffect(() => {
    const gui = new GUI();
    const scaleController = gui.add(params, 'scale', 0.2, 1).onChange((value) => {
      ref.current.scale.set(value, value, value);
    });
    const cameraXController = gui.add(params, 'cameraX', -100, 100).onChange((value) => {
      camera.position.x = value;
    });
    const cameraYController = gui.add(params, 'cameraY', -100, 100).onChange((value) => {
      camera.position.y = value;
    });
    const cameraZController = gui.add(params, 'cameraZ', 1, 100).onChange((value) => {
      camera.position.z = value;
    });

    fbxLoader.load('Cyberpunk_Street.fbx', (object) => {
      object.scale.set(params.scale, params.scale, params.scale);
      ref.current = object;
      
      scene.add(object); // Add model to scene
      camera.position.set(params.cameraX, params.cameraY, params.cameraZ); // Set camera position
    }, undefined, (error) => {
      console.error('An error occurred while loading the model:', error);
    });

    useFrame(() => {
      params.cameraX = camera.position.x;
      params.cameraY = camera.position.y;
      params.cameraZ = camera.position.z;
      cameraXController.updateDisplay();
      cameraYController.updateDisplay();
      cameraZController.updateDisplay();
      camera.updateProjectionMatrix();
    });
  }, [fbxLoader, scene, camera, params]);

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
    <div style={{ width: '100vx', height: '100vh' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <ambientLight />
        <pointLight position={[0.8, 1.4, 1.0]} intensity={50} />
        <Model />
        <Controls />
      </Canvas>
    </div>
  );
};

export default ThreeScene;

// 'use client';

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import Stats from 'three/examples/jsm/libs/stats.module';

// const ThreeScene = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     scene.add(new THREE.AxesHelper(5));

//     const light = new THREE.PointLight(0xffffff, 50);
//     light.position.set(0.8, 1.4, 1.0);
//     scene.add(light);

//     const ambientLight = new THREE.AmbientLight();
//     scene.add(ambientLight);

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.set(0.8, 1.4, 1.0);

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.target.set(0, 1, 0);

//     const fbxLoader = new FBXLoader();
//     fbxLoader.load(
//       'cyberpunk_hotel_final.fbx',
//       (object) => {
//         object.scale.set(0.01, 0.01, 0.01);
//         scene.add(object);
//       },
//       (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
//       },
//       (error) => {
//         console.log(error);
//       }
//     );

//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       render();
//     };

//     window.addEventListener('resize', onWindowResize, false);

//     const stats = new Stats();
//     document.body.appendChild(stats.dom);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       controls.update();
//       render();
//       stats.update();
//     };

//     const render = () => {
//       renderer.render(scene, camera);
//     };

//     animate();

//     mountRef.current.appendChild(renderer.domElement);

//     return () => {
//       window.removeEventListener('resize', onWindowResize);
//       mountRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} />;
// };

// export default ThreeScene;