import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import {
    AccumulativeShadows,
    RandomizedLight,
    Center,
    OrbitControls,
} from '@react-three/drei'

export default function Ball() {
    // 球体の属性を定義する配列
    const spheres = [
        { position: [0, -0.65, 0], texture: '/ai5.jpg', scale: [0.25, 0.25, 0.25] },
        { position: [-2, -0.65, 0], texture: '/ai6.jpg', scale: [0.5, 0.5, 0.5] },
        { position: [0, -0.65, 0], texture: '/ai7.jpg', scale: [0.5, 0.5, 0.5] },
    ];

    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 4.5], fov: 40 }}
            colormanagement="true"
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
            <OrbitControls
                autoRotate
                autoRotateSpeed={2}
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 2.1}
                maxPolarAngle={Math.PI / 2.1}
            />
        </Canvas>
    )
}

function Sphere({ position, texture, scale }) {
    const loadedTexture = useLoader(TextureLoader, texture);

    return (
        <mesh castShadow position={position} scale={scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial map={loadedTexture} metalness={0.9} roughness={0.5} />
        </mesh>
    )
}