import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { Html } from '@react-three/drei'
import '../../styles/robot.css';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './App.module.css';
import { Stars } from '@react-three/drei';




const GOLDENRATIO = 1.61803398875

// Modify the onShowModal prop type in AppProps to accept a string argument
interface AppProps {
  images: { url: string }[];
  onShowModal: (type: 'imageUpload' | 'dalle') => void; // Updated to accept a string argument
  onHideModal: () => void;
  isModalVisible: boolean;
}

// Ensure the onShowModal function in the parent component of <App /> is implemented to accept a string argument


interface Image {
  url: string;
  // Add any other properties that each image object might have
}
interface FrameProps {
  url: string;
  c?: THREE.Color;
  [key: string]: any; // for the rest of the properties
  images: Image[];
  onShowModal: (type: 'imageUpload' | 'dalle') => void;
  onHideModal: () => void;
  isModalVisible: boolean;
}
interface CustomMaterial extends THREE.Material {
  zoom: number;
}

export const App = ({ images, onShowModal, onHideModal, isModalVisible, }: AppProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [modalType, setModalType] = useState('');
  

  const backgroundStyle = {
    backgroundColor: 'hsla(205,100%,13%,1)',
    backgroundImage: `
    radial-gradient(at 49% 49%, hsla(191,77%,50%,1) 0px, transparent 50%),
    radial-gradient(at 99% 44%, hsla(208,62%,38%,1) 0px, transparent 50%),
    radial-gradient(at 100% 0%, hsla(208,39%,40%,1) 0px, transparent 50%),
    radial-gradient(at 62% 100%, hsla(192,71%,38%,1) 0px, transparent 50%),
    radial-gradient(at 1% 100%, hsla(196,77%,18%,1) 0px, transparent 50%),
    radial-gradient(at 7% 69%, hsla(200,45%,39%,1) 0px, transparent 50%),
    radial-gradient(at 0% 0%, hsla(191,52%,49%,1) 0px, transparent 50%)`,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  };
  return (
    <div style={backgroundStyle}>
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }} style={{ width: isMobile ? '100vw' : '100%', height: isMobile ? '100%' : '100vh', marginTop: 0, paddingTop: 0 }}>
    
      <Stars
     radius={300}
     depth={120}
     count={200000}
     factor={7}
     fade={true}
     speed={0.8}
     saturation={12}
     // @ts-ignore
     randomness={2}
   />
   <Environment preset="dawn" />
      <fog attach="fog" args={['#ffffff', 0, 15]} />
      
      <group position={[0, -0.5, 0]}>
      <Frames 
    images={images} 
    onShowModal={(type) => onShowModal(type as 'imageUpload' | 'dalle')} // Directly pass the type
    onHideModal={onHideModal} 
    isModalVisible={isModalVisible}
  />
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
  blur={[0, 0]} // ぼかしを減らす
  color="#050505" // 色を非常に薄い白に設定
  depthScale={1.2}
  metalness={0.1} // 金属質を低く保つ
  minDepthThreshold={0.4}
  maxDepthThreshold={1.4}
  mirror={0.5}
  mixBlur={0} // ぼかしを減らす
  mixStrength={400} // 反射の強度を調整
  opacity={0.55} // 透明度を調整
  resolution={1024} // 解像度を高く設定
  roughness={0.55} // 表面をより滑らかに
  transparent={true} // 透明性を有効にする
/>
        </mesh>
      </group>
      
      
    </Canvas>
    </div>
  );
}

function Frames({ images, onShowModal, onHideModal, isModalVisible, q = new THREE.Quaternion(), p = new THREE.Vector3() }: { images: Image[]; onShowModal: (type: string) => void; onHideModal: () => void; isModalVisible: boolean; q?: THREE.Quaternion; p?: THREE.Vector3 }) {
  const ref = useRef<THREE.Group>(null);
  const clicked = useRef<THREE.Object3D<THREE.Object3DEventMap> | undefined>();
  const [, params] = useRoute('/item/:id')
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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
  
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 768);
      setIsTablet(screenWidth > 768 && screenWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // コンポーネントマウント時にも実行

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // ボタンのスタイルを動的に設定
  const buttonStyle: React.CSSProperties = isMobile ? {
    position: 'absolute',
    top: '100%',
    right: '0%',
    transform: 'translate(-50%, -50%) scale(0.8)', // 中心からのオフセットを補正し、スケールを調整
  } : isTablet ? {
    position: 'absolute',
    top: '100%',
    right: '10%',
    transform: 'translate(-50%, -50%) scale(0.9)', // タブレット用のスケール調整
  } : {};

  
  const [selectedModalType, setSelectedModalType] = useState('');

  const toggleModalType = () => {
    const newModalType = selectedModalType === 'dalle' ? 'imageUpload' : 'dalle';
    setSelectedModalType(newModalType);
    onShowModal(newModalType);
  };
  
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props) =>  <Frame 
    key={props.url} 
    {...props} 
    images={images}  
    onShowModal={onShowModal} 
    onHideModal={onHideModal} 
    isModalVisible={isModalVisible}
  /> /* prettier-ignore */)}
        <Html position={[0, 0, 0]} zIndexRange={[2, 0]}>
        {/* <button onClick={() => onShowModal('imageUpload')} className={styles.speechBubble}>投稿ニャ</button>
        <button onClick={() => onShowModal('dalle')} >Dall-E モーダル</button> */}
          <div className="container" style={buttonStyle}>
            <div className="box"style={buttonStyle}>
              <div className="area area_1"></div>
              <div className="area area_2"></div>
              <div className="area area_3"></div>
              <div className="area area_4"></div>
              <div className="area area_5"></div>
              <div className="area area_6"></div>
              <div className="area area_7"></div>
              <div className="area area_8"></div>
              <div className="area area_9"></div>
              
              <button onClick={toggleModalType} className="robot">
                {selectedModalType === 'dalle' ? '' : ''}
                <div className="front parts_A"></div>
                <div className="front parts_B"></div>
                 {/* 画像アップロードボタン */}
      
                <div className="face">
                <div className={styles.speechBubble}>{selectedModalType === 'dalle' ? 'Post!ニャ!' : 'Create!ニャ!'}</div>
          
                  <div className="face__wrapper">
                  <div className="triangleMouth"></div> 
                    <div className="eye"></div>
                    
                    
                    <span className="text">{selectedModalType === 'dalle' ? 'POST!' : 'CREATE'}
                    </span>
                  </div>
                </div>
              </button>
             
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
  // console.log('url', url);

  const name = getUuid(url)
  const isActive = params?.id === name
  useCursor(hovered)
  useFrame((state, dt) => {
    if (image.current && frame.current) {
      // image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
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

       

        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url}  />
      </mesh>
      {/* <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
        {url.split('-').join(' ')}
      </Text> */}
    </group>
    
  )
}