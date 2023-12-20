'use client'
import { useTexture } from '@react-three/drei';

import * as THREE from 'three'

const poles = [
  {
    position: [0, 0.2, 0.5],
    scale: [0.005, 16, 0.005],
    rotation: [0, 0, Math.PI / 2],
  },
  {
    position: [-0.75, 0.1, 0.5],
    scale: [0.02, 0.25, 0.02],
    rotation: [0, 0, 0],
  },
  {
    position: [0.75, 0.1, 0.5],
    scale: [0.02, 0.25, 0.02],
    rotation: [0, 0, 0],
  },
  {
    position: [2.1, 0.1, 0.5],
    scale: [0.02, 0.25, 0.02],
    rotation: [0, 0, 0],
  },
  {
    position: [-2.1, 0.1, 0.5],
    scale: [0.02, 0.25, 0.02],
    rotation: [0, 0, 0],
  },
]

// 円柱
const cylinderGeometry = new THREE.CylinderGeometry()
const boxGeometry = new THREE.BoxGeometry(0.02, 0.25, 0.02);
// ポール
const Pole = () => {
  return (
    <>
      {poles.map((pole, index) => {
        return (
          <mesh
            key={index}
            castShadow
            position={new THREE.Vector3(...pole.position)}
            scale={new THREE.Vector3(...pole.scale)}
            rotation={new THREE.Euler(...pole.rotation)}
            geometry={cylinderGeometry}
          >
            {/* Material */}
            <meshStandardMaterial color="red" metalness={1} roughness={10} />
          </mesh>
        )
      })}
    </>
  )
}

export default Pole