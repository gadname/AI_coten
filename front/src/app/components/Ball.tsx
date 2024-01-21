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
    return (
        <Canvas
            shadows
            camera={{ position: [0, 0, 4.5], fov: 40 }}
            colormanagement="true"
            gl={{ antialias: true }}
            style={{ background: "transparent", marginTop: "950px" , width: "100vw", height: "100vh"}}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[-3, 2, 4]} intensity={2} />
            <Environment preset="sunset" background={false} />
            <group position={[0, -0.65, 0]}>
                <Sphere />
                {/* <AccumulativeShadows
                    temporal
                    frames={200}
                    color="purple"
                    colorBlend={0.5}
                    opacity={1}
                    scale={10}
                    alphaTest={0.85}
                >
                    <RandomizedLight
                        amount={8}
                        radius={5}
                        ambient={0.5}
                        position={[5, 3, 2]}
                        bias={0.001}
                    />
                </AccumulativeShadows> */}
            </group>
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

function Sphere() {
    const texture = useLoader(TextureLoader, '/ai5.jpg');

    return (
        <Center top>
            <mesh castShadow position={[0, 0, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial map={texture} metalness={1.5} />
            </mesh>
        </Center>
    )
}