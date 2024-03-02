import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface SphereProps {
  position: [number, number, number];
  texture: string;
  scale: number | [number, number, number];
  index: number; // 追加: 各球体のインデックス
  total: number;
}

export default function Ball() {
  // 球体の属性を定義する配列
  const spheres: { position: [number, number, number]; texture: string; scale: number | [number, number, number]; }[] = [
    { position: [-2.0, 1, 0.4], texture: '/ai5.jpg', scale: [0.2, 0.2, 0.2] },
    { position: [2, 0.3, 0.8], texture: '/ai6.jpg', scale: [0.1, 0.1, 0.1] },
    { position: [-2.8, -0.2, -0.1], texture: '/ai7.jpg', scale: [0.3, 0.3, 0.3] },
    { position: [-2.8, -0.2, -0.1], texture: '/ai8.jpg', scale: [0.4, 0.4, 0.4] },
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 40 }}
      gl={{ antialias: true }}
      style={{ background: "transparent", width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[-3, 2, 4]} intensity={2} />
      <Environment preset="sunset" background={false} />
      {/* ここでspheres配列をマッピングして、各Sphereコンポーネントに属性を適用 */}
      {spheres.map((sphere, index) => (
  <Sphere
    key={index}
    position={sphere.position}
    texture={sphere.texture}
    scale={sphere.scale}
    index={index}
    total={spheres.length} // 総数を渡す
  />
))}
    </Canvas>
  );
}

function Sphere({ position, texture, scale, index, total }: SphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const loadedTexture = useLoader(TextureLoader, texture);

  // フレームごとに実行されるコールバックで回転と位置を更新
  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * 0.3;
      const angle = time + index * (Math.PI * 2 / total); // totalを使用
      meshRef.current.position.x = Math.sin(angle) * 3.0;
      meshRef.current.position.z = Math.cos(angle) * 3.0;
      meshRef.current.position.y = Math.sin(time + index) * 1.5;

      meshRef.current.rotation.y += 0.02; // Y軸周りに回転
     
    }
  });

  return (
    <mesh ref={meshRef} castShadow position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={loadedTexture} metalness={0.9} roughness={0.5} />
    </mesh>
  );
}