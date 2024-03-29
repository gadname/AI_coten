import * as THREE from 'three'
import { useRef, useState, useEffect } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Image, ScrollControls, useScroll, Billboard, Text } from '@react-three/drei'
import { easing, geometry } from 'maath'
import { initializeApp } from "firebase/app";
import { listAll, getStorage, ref as firebaseRef, uploadBytes,  getDownloadURL } from "firebase/storage";
import { ref, deleteObject } from "firebase/storage";
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const deleteImageFromStorage = async (imagePath: string) => {
  const imageRef = ref(storage, imagePath);

  try {
    await deleteObject(imageRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error removing file: ", error);
  }
};


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

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
  className?: string;
  setSelectedImage: (url: string) => void;
  imageUrls: string[];
}



const app = initializeApp(firebaseConfig);
const storage = getStorage();

const fetchImageUrlsFromStorage = async () => {
  const imagesRef = firebaseRef(storage, '/');
  try {
    const imageRefs = await listAll(imagesRef);
    const urlPromises = imageRefs.items.map((itemRef) => getDownloadURL(itemRef));
    let urls = await Promise.all(urlPromises);
    // ランダムに10枚選択するロジックを追加
    urls = urls.sort(() => 0.5 - Math.random()).slice(0, 10);
    console.log('effectUrl', urls);
    return urls;
  } catch (error) {
    console.error("Error fetching image URLs from Firebase Storage:", error);
    return [];
  }
};



extend(geometry)
const inter = import('@pmndrs/assets/fonts/inter_regular.woff')



export const Ticket = () => (
  <div className="flex justify-center items-center w-full h-screen">
    <div className="w-[100vw] h-[70vh] sm:w-[70vw] sm:h-[70vh] md:w-full md:h-screen bg-transparent relative">
    {/* <button onClick={handleDeleteClick}>Delete Image</button> */}
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
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

  const setSelectedImage = (url: string) => {
    setSelectedImageUrl(url);
  };

  useFrame((state, delta) => {
    if (ref.current && state.events && state.camera) {
      ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
      state.events?.update?.(); // Optional chaining for update method
      easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y * 2 + 4.5, 9], 0.3, delta);
      state.camera.lookAt(0, 0, 0);
    }
  });

  useEffect(() => {
    const fetchUrls = async () => {
      const urls = await fetchImageUrlsFromStorage(); // Firebaseから画像URLを取得する関数
      setImageUrls(urls);
      console.log('Set imageUrls:', urls);
    };
  
    fetchUrls();
  }, []);
  
  return (
    <group ref={ref} {...props}>
    <Cards category="generation" from={0} len={Math.PI / 4} onPointerOver={hover} onPointerOut={hover} imageUrls={imageUrls} setSelectedImage={setSelectedImage} />
    <Cards category="DALL-E 3" from={Math.PI / 4} len={Math.PI / 2} position={[0, 0.4, 0]} onPointerOver={hover} onPointerOut={hover} imageUrls={imageUrls} setSelectedImage={setSelectedImage} />
    <Cards category="AI_ART" from={Math.PI / 4 + Math.PI / 2} len={Math.PI / 2} onPointerOver={hover} onPointerOut={hover} imageUrls={imageUrls} setSelectedImage={setSelectedImage} />
    <Cards category="Gallery" from={Math.PI * 1.25} len={Math.PI * 2 - Math.PI * 1.25} position={[0, -0.4, 0]} onPointerOver={hover} onPointerOut={hover} imageUrls={imageUrls} setSelectedImage={setSelectedImage} />
    <ActiveCard hovered={hovered} url={selectedImageUrl} />
  </group>
    
    
  )
  
}


function Cards({ category, data, from = 0, len = Math.PI * 2, radius = 5.25, onPointerOver, onPointerOut, imageUrls, setSelectedImage, ...props }: CardProps) {
  const [hovered, hover] = useState<number | null>(null)
  const amount = Math.round(len * 22)
  const textPosition = from + (amount / 2 / amount) * len
  

  
  return (
    <group {...props}>
      <Billboard position={[Math.sin(textPosition) * radius * 1.4, 0.5, Math.cos(textPosition) * radius * 1.4]}>
      <Text font="/fonts/DESIGNER.otf" fontSize={0.55} anchorX="center" color="black" position={[0, 0, -0.02]}>
        {category}
        </Text>
        <Text font="/fonts/DESIGNER.otf" fontSize={0.55} anchorX="center" color="white">
          {category}
        </Text>
      </Billboard>
      {Array.from({ length: amount - 3 /* minus 3 images at the end, creates a gap */ }, (_, i) => {
        const angle = from + (i / amount) * len
        const imageUrl = imageUrls[i % imageUrls.length]; // 画像URLを循環的に使用
        return (
          <Card
            key={angle}
            onPointerOver={() => setSelectedImage(imageUrl)}
            onPointerOut={() => { hover(null); onPointerOut(null); }}
            position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
            rotation={[0, Math.PI / 2 + angle, 0]}
            active={hovered !== null}
            hovered={hovered === i}
            url={imageUrl}
            category={category} // Add this line with the appropriate category value
            setSelectedImage={setSelectedImage} 
            imageUrls={imageUrls}
          />
          
        )
        
      })}
    </group>
  )
}

function Card({ url, active, hovered, onPointerOver, onPointerOut,setSelectedImage, index, ...props }: CardProps) {
  

  // イベントハンドラ内で index プロパティを使用
  const handlePointerOver = () => {
    onPointerOver(index ?? null);
    setSelectedImage(url ?? ''); // この行を追加
  };
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
      <Image ref={ref} url={url || '/center.png'} scale={1.618 as any} side={THREE.DoubleSide as THREE.Side} />
    </group>
  );
}
interface CustomMaterial extends THREE.Material {
  zoom?: number;
}


function ActiveCard({ hovered, url, ...props }: { hovered: number | null, url?: string, [key: string]: any }) {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, url || '/default-image.jpg');

  // デバッグ用に選択されたURLをコンソールに出力
  useEffect(() => {
    console.log('ActiveCard URL:', url);
  }, [url]);

  useFrame(({ camera }) => {
    if (ref.current) {
      // メッシュを常にカメラに向ける
      ref.current.lookAt(camera.position);
    }
  });

  return (
    <mesh ref={ref} {...props} position={[0, 1.5, 0]}>
      <planeGeometry args={[6, 1.618 * 4]} />
      <meshBasicMaterial map={texture} transparent={true} />
    </mesh>
  );
}
