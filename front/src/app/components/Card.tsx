import * as THREE from 'three'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Image, ScrollControls, useScroll, Billboard, Text } from '@react-three/drei'
import { suspend } from 'suspend-react'
import { generate } from 'random-words'
import { easing, geometry } from 'maath'



interface CardProps {
  url?: string;
  active?: boolean;
  hovered?: boolean;
  onPointerOver: (index: number | null) => void;
  onPointerOut: (index: number | null) => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
  category: string;
  from?: number;
  len?: number;
  data?: any;
  radius?: number;
  index?: number; // Add this line
}

extend(geometry)
const inter = import('@pmndrs/assets/fonts/inter_regular.woff')

export const Ticket = () => (
  <div className="flex justify-center items-center w-full h-screen">
    <div className="w-[100vw] h-[70vh] sm:w-[70vw] sm:h-[70vh] md:w-full md:h-screen bg-transparent relative">
      <Canvas dpr={[1, 4]}>
        <ScrollControls pages={4} infinite>
          <Scene position={[0, 1.5, 0]} />
        </ScrollControls>
      </Canvas>
    </div>
  </div>
);

function Scene({ children, ...props }: { children?: React.ReactNode, [x: string]: any }) {
  const ref = useRef<THREE.Group>(null); // Change this line
  const scroll = useScroll()
  const [hovered, hover] = useState<number | null>(null);
  useFrame((state, delta) => {
    if (ref.current && state.events && state.camera) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
      state.events?.update?.(); // Optional chaining for update method
      easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y * 2 + 4.5, 9], 0.3, delta);
      state.camera.lookAt(0, 0, 0);
    }
  });
  return (
    <group ref={ref} {...props}>
      <Cards category="Robot" from={0} len={Math.PI / 4} onPointerOver={hover} onPointerOut={hover} />
      <Cards category="DALL-E-3" from={Math.PI / 4} len={Math.PI / 2} position={[0, 0.4, 0]} onPointerOver={hover} onPointerOut={hover} />
      <Cards category="Gallery.ai" from={Math.PI / 4 + Math.PI / 2} len={Math.PI / 2} onPointerOver={hover} onPointerOut={hover} />
      <Cards category="DALL-E-3" from={Math.PI * 1.25} len={Math.PI * 2 - Math.PI * 1.25} position={[0, -0.4, 0]} onPointerOver={hover} onPointerOut={hover} />
      
      <ActiveCard hovered={hovered} />
      
    </group>
    
    
  )
  
}

function Cards({ category, data, from = 0, len = Math.PI * 2, radius = 5.25, onPointerOver, onPointerOut, ...props }: CardProps) {
  const [hovered, hover] = useState<number | null>(null)
  const amount = Math.round(len * 22)
  const textPosition = from + (amount / 2 / amount) * len

  type FontModule = {
    default: string;
  };
  return (
    <group {...props}>
      <Billboard position={[Math.sin(textPosition) * radius * 1.4, 0.5, Math.cos(textPosition) * radius * 1.4]}>
      <Text font={(suspend(inter) as FontModule).default} fontSize={0.25} anchorX="center" color="white">
        {category}
        </Text>
      </Billboard>
      {Array.from({ length: amount - 3 /* minus 3 images at the end, creates a gap */ }, (_, i) => {
        const angle = from + (i / amount) * len
        return (
          <Card
            key={angle}
            onPointerOver={() => { hover(i); onPointerOver(i); }}
            onPointerOut={() => { hover(null); onPointerOut(null); }}
            position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
            rotation={[0, Math.PI / 2 + angle, 0]}
            active={hovered !== null}
            hovered={hovered === i}
            url={`/img${Math.floor(i % 10) + 1}.jpg`}
            category={category} // Add this line with the appropriate category value
          />
          
        )
        
      })}
    </group>
  )
}

function Card({ url, active, hovered, onPointerOver, onPointerOut, index, ...props }: CardProps) {
  

  // イベントハンドラ内で index プロパティを使用
  const handlePointerOver = () => onPointerOver(index ?? null);
  const handlePointerOut = () => onPointerOut(index ?? null);

  
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    // ref.currentをTHREE.Meshとして扱う型アサーションを使用
    const mesh = ref.current as unknown as THREE.Mesh;
    if (mesh?.material) {
      easing.damp(mesh.material, 'zoom', 1, 0.5, delta);
      easing.damp(mesh.material, 'opacity', hovered !== null ? 1 : 0, 0.3, delta);
    }
  });
  return (
    <group {...props} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <Image ref={ref} url={url || '/default-image.jpg'} scale={1.618 as any} side={THREE.DoubleSide as THREE.Side} />
    </group>
  );
}
interface CustomMaterial extends THREE.Material {
  zoom?: number;
}


function ActiveCard({ hovered, ...props }: { hovered: number | null, [key: string]: any }) {
  const ref = useRef<THREE.Mesh>(null);
  const name = useMemo(() => (generate({ exactly: 2 }) as string[]).join(' '), [hovered]);
  useLayoutEffect(() => {
    const material = ref.current?.material as CustomMaterial;
    if (material) {
      material.zoom = 1;
    }
  }, [hovered]);
  useFrame((state, delta) => {
    if (ref.current?.material) {
      easing.damp(ref.current.material, 'zoom', 1, 0.5, delta);
      easing.damp(ref.current.material, 'opacity', hovered !== null ? 1 : 0, 0.3, delta);
    }
  });
  return (
    <Billboard {...props}>
      
      <Image ref={ref} transparent position={[0, 1.5, 0]} url={`/img${Math.floor((hovered ?? 0) % 10) + 1}.jpg`}>
  <planeGeometry args={[6, 1.618 * 4]} />
  </Image>
  </Billboard>
    
  )
}
