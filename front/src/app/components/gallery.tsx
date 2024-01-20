import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import Wall from './wall';
import Ground from './ground';
import Pole from './pole';
import FrameList from './frame-list';
import InputText from './input-text';

const Gallery = () => {
  const [image1, setImage1] = useState("./white.png");
  const [image2, setImage2] = useState("./white.png");
  const [image3, setImage3] = useState("./white.png");
  const [image4, setImage4] = useState("./white.png");
  const [image5, setImage5] = useState("./white.png");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageUpload = (id, event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;
      switch (id) {
        case '1':
          setImage1(base64Image);
          break;
        case '2':
          setImage2(base64Image);
          break;
        case '3':
          setImage3(base64Image);
          break;
        case '4':
          setImage4(base64Image);
          break;
        case '5':
          setImage5(base64Image);
          break;
        default:
          break;
      }
    };

    reader.readAsDataURL(file);
  };

  const images = [
    {
      id: '1',
      image: image1,
      position: [0, 0.8, 0.05],
      size: [1.2, 1.2, 1.2],
      frameSize: [1.3, 1.3, 1.3],
    },
    {
      id: '2',
      image: image2,
      position: [-1.4, 0.5, 0.1],
      size: [1, 0.9, 1],
      frameSize: [1.2, 1.0, 1.2],
    },
    {
      id: '3',
      image: image3,
      position: [-3, 0.8, 0.1],
      size: [1, 0.5, 1],
      frameSize: [1.1, 0.6, 0.7],
    },
    {
      id: '4',
      image: image4,
      position: [1.4, 0.5, 0.1],
      size: [1, 0.8, 1],
      frameSize: [1.2, 1.0, 1.2],
    },
    {
      id: '5',
      image: image5,
      position: [2.8, 0.5, 0.1],
      size: [1, 1, 1],
      frameSize: [1.2, 1.2, 1.2],
    },
  ];

  return (
    <>
      <Html>
        <input 
          type="file" 
          onChange={(event) => handleImageUpload('1', event)} 
          style={{ position: 'absolute', top: '120px', left: '50px' }} 
        />
        <input 
          type="file" 
          onChange={(event) => handleImageUpload('2', event)} 
          style={{ position: 'absolute', top: '120px', left: '100px' }} 
        />
        <input 
          type="file" 
          onChange={(event) => handleImageUpload('3', event)} 
          style={{ position: 'absolute', top: '120px', left: '150px' }} 
        />
        <input 
          type="file" 
          onChange={(event) => handleImageUpload('4', event)} 
          style={{ position: 'absolute', top: '120px', left: '200px' }} 
        />
        <input 
          type="file" 
          onChange={(event) => handleImageUpload('5', event)} 
          style={{ position: 'absolute', top: '120px', left: '250px' }} 
        />
            </Html>
            {/* 背景 */}
            <color attach="background" args={['#ADD8E6']} />
            {/* 環境光 */}
            <ambientLight intensity={0.5} />
            <group position={[0, -1, 0]}>
              <Wall />
              <Ground />
              <Pole />
              <FrameList images={images} />
              <InputText loading={loading} />
              </group>
              </>
              );
            };

export default Gallery;

