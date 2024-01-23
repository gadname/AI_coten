import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { Html } from '@react-three/drei'
import '../../styles/robot.css';

const GOLDENRATIO = 1.61803398875
interface AppProps {
  images: { url: string }[]; // Replace this with the actual type structure of your images
}
interface Image {
  url: string;
  // Add any other properties that each image object might have
}
interface FrameProps {
  url: string;
  c?: THREE.Color;
  [key: string]: any; // for the rest of the properties
}
interface CustomMaterial extends THREE.Material {
  zoom: number;
}
export const App = ({ images }: AppProps) => (
  <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
    <color attach="background" args={['#ffffff']} />
    <fog attach="fog" args={['#ffffff', 0, 15]} />
    <group position={[0, -0.5, 0]}>
      <Frames images={images} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
        mirror={0.5}
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
    </group>
    <Environment preset="city" />
  </Canvas>
)

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }: { images: Image[]; q?: THREE.Quaternion; p?: THREE.Vector3 }) {
  const ref = useRef<THREE.Group>(null);
  const clicked = useRef<THREE.Object3D<THREE.Object3DEventMap> | undefined>();
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current?.getObjectByName(params?.id!);
    if (clicked.current) {
      clicked.current.parent?.updateWorldMatrix(true, true)
      clicked.current.parent?.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent?.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
      <Html position={[0, 0, 0]}>
        <div className="container">
          <div className="box">
            <div className="area area_1"></div>
            <div className="area area_2"></div>
            <div className="area area_3"></div>
            <div className="area area_4"></div>
            <div className="area area_5"></div>
            <div className="area area_6"></div>
            <div className="area area_7"></div>
            <div className="area area_8"></div>
            <div className="area area_9"></div>
            <a href="/" className="robot">
              <div className="front parts_A"></div>
              <div className="front parts_B"></div>
              <div className="face">
                <div className="face__wrapper">
                  <div className="eye"></div>
                  <span className="text">ART</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </Html>
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), ...props }: FrameProps) {
  const image = useRef<THREE.Mesh<THREE.BufferGeometry, CustomMaterial>>(null);
  const frame = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial | THREE.MeshBasicMaterial>>(null);
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const isActive = params?.id === name
  useCursor(hovered)
  useFrame((state, dt) => {
    if (image.current && frame.current) {
      image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
      easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt);
      easing.dampC(frame.current.material.color, hovered ? 'Aqua' : 'white', 0.1, dt);
    }
  });
  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>

        

        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
      </mesh>
      <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
        {name.split('-').join(' ')}
      </Text>
    </group>
    
  )
}