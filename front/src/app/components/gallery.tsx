import React, { useState, useRef, KeyboardEvent } from 'react';
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

  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
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
      }
    };

    reader.readAsDataURL(file);
  };

  const images = [
    {
      id: '1',
      image: image1,
      position: [0, 0.8, 0.05],
      size: [1.2, 1.2, 1.2] as [number, number, number],
      frameSize: [1.2, 1.0, 1.2] as [number, number, number],
    },
    {
      id: '2',
      image: image2,
      position: [-1.4, 0.5, 0.1],
      size: [1, 0.9, 1] as [number, number, number],
      frameSize: [1.2, 1.0, 1.2] as [number, number, number],
    },
    {
      id: '3',
      image: image3,
      position: [-3, 0.8, 0.1],
      size: [1, 0.5, 1] as [number, number, number],
      frameSize: [1.1, 0.6, 0.7] as [number, number, number],
    },
    {
      id: '4',
      image: image4,
      position: [1.4, 0.5, 0.1],
      size: [1, 0.8, 1] as [number, number, number],
      frameSize: [1.2, 1.0, 1.2] as [number, number, number],
    },
    {
      id: '5',
      image: image5,
      position: [2.8, 0.5, 0.1],
      size: [1, 1, 1] as [number, number, number],
      frameSize: [1.2, 1.2, 1.2] as [number, number, number],
    },
  ];
  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    // エンターキーが押されたら
    if (e.key === 'Enter') {
      e.preventDefault();
      setLoading(true); // ローディング状態をtrueに
  
      const inputValue = inputRef.current?.value;
  
      // 入力チェック
      if (!inputValue) {
        setLoading(false); // ローディング状態をfalseに
        return;
      }
  
      try {
        // DALLE APIコール
        const response = await fetch('/api/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: inputValue,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        
      } catch (error) {
        alert(`Fetch error: ${error}`);
      } finally {
        // 入力フォームクリア
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        setLoading(false); // ローディング状態をfalseに
      }
    }
  };
  return (
    <>
      {/* <Html>
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
            </Html> */}
            {/* 背景 */}
            <color attach="background" args={['#ADD8E6']} />
            <fog attach="fog" args={['#ADD8E6', 10, 50]} />
            {/* 環境光 */}
            <ambientLight intensity={0.5} />
            <group position={[0, -1, 0]}>
              <Wall />
              <Ground />
              {/* <Pole /> */}
              <FrameList images={images} />
              <InputText handleKeyPress={handleKeyPress} inputRef={inputRef} loading={loading} />
              </group>
              </>
              );
            };
          
export default Gallery;
