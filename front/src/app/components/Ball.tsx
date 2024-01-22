import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { TextureLoader } from 'three';
import {
    AccumulativeShadows,
    RandomizedLight,
    Center,
    OrbitControls,
} from '@react-three/drei'
interface SphereProps {
    position: [number, number, number];
    texture: string;
    scale: number | [number, number, number];
  }
export default function Ball() {
    // 球体の属性を定義する配列
    const spheres = [
        { position: [-2.5, 0.9, 0.4], texture: '/ai5.jpg', scale: [0.2, 0.2, 0.2] },
        // { position: [0, 0.6, 0.8], texture: '/ai6.jpg', scale: [0.1, 0.1, 0.1] },
        { position: [-2.1, -0.2, -0.1], texture: '/ai7.jpg', scale: [0.8, 0.8, 0.8] },
    ];

    return (
        <Canvas
    camera={{ position: [0, 0, 4.5], fov: 40 }}
    gl={{ antialias: true }}
    style={{ background: "transparent", marginTop: "900px", width: "100vw", height: "100vh" }}
>
            <ambientLight intensity={0.5} />
            <directionalLight position={[-3, 2, 4]} intensity={2} />
            <Environment preset="sunset" background={false} />
            {/* ここでspheres配列をマッピングして、各Sphereコンポーネントに属性を適用 */}
            {spheres.map((sphere, index) => (
                <Sphere key={index} position={sphere.position} texture={sphere.texture} scale={sphere.scale} />
            ))}
            
        </Canvas>
    )
}

function Sphere({ position, texture, scale }: SphereProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const loadedTexture = useLoader(TextureLoader, texture);

    // フレームごとに実行されるコールバックで回転を更新
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <mesh ref={meshRef} castShadow position={position} scale={scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={loadedTexture} metalness={0.9} roughness={0.5} />
        </mesh>
    )
}