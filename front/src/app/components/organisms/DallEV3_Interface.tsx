"use client";
import React, { FC, useState, useEffect, useCallback, MouseEventHandler } from "react";
import styles from './DallEV3_Interface.module.css';
import { SubmitHandler } from "react-hook-form";
import LoadingSVG from '../../../assets/loading.svg';
import { Typography } from "@mui/joy";
import {
  TextPromptForm,
  TextPromptFormInputs,
} from "../../components/molecules/TextPromptForm";
import { ImageWrapper } from "../../components/molecules/ImageWrapper";

interface ImageItem {
  name: string;
  imageUrl: string;
}
interface DallE3InterfaceProps {
  gptOutput: string;
  isUpload: boolean;
  // include other properties as necessary
}


export const DallE3Interface: FC<any> = ({ onUpload, gptOutput }) => {
  const [checkboxStates, setCheckboxStates] = useState({
    precision: false,
    watercolor: false,
    acrylic: false,
    pastelArt: false,
    penAndInk: false,
    brushStroke: false,
    crayon: false,
    lineStamp: false,
    pencilDrawing: false,
    coloredPencil: false,
    oilPainting: false,
    picasso: false,
    vanGogh: false,
    Manet: false,
    Leonardo_da_Vinci: false,
    logoStyle: false,
    disney: false,
    comic: false,
    genshin_impact: false,
    final_fantasy: false,
    persona5: false,
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxStates(prev => ({ ...prev, [name]: checked }));
  };
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const handleImageClick = (imageItem: ImageItem) => {
    setSelectedImage(imageItem);
  };

  // モーダルを閉じる関数
  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const onSubmit: SubmitHandler<TextPromptFormInputs> = useCallback(async (data) => {
    console.log("onSubmit", data);
    setIsExecuting(true);
    
    let promptPrefix = "";
    if (checkboxStates.precision) {
      promptPrefix += "歌川広重風に ";
    }
    if (checkboxStates.watercolor) {
      promptPrefix += "水彩画風に ";
    }
    if (checkboxStates.acrylic) {
      promptPrefix += "アクリル画風に ";
    }
    if (checkboxStates.pastelArt) {
      promptPrefix += "パステルアート風に ";
    }
    if (checkboxStates.penAndInk) {
      promptPrefix += "ペンとインク風に ";
    }
    if (checkboxStates.brushStroke) {
      promptPrefix += "筆風に ";
    }
    if (checkboxStates.crayon) {
      promptPrefix += "クレヨン風に ";
    }
    if (checkboxStates.lineStamp) {
      promptPrefix += "LINEスタンプ風に ";
    }
    if (checkboxStates.pencilDrawing) {
      promptPrefix += "鉛筆画風に ";
    }
    if (checkboxStates.coloredPencil) {
      promptPrefix += "色鉛筆画風に ";
    }
    if (checkboxStates.oilPainting) {
      promptPrefix += "油絵風に ";
    }
    if (checkboxStates.picasso) {
      promptPrefix += "ピカソ風に ";
    }
    if (checkboxStates.vanGogh) {
      promptPrefix += "ゴッホ風に ";
    }
    if (checkboxStates.Manet) {
      promptPrefix += "モネ風に ";
    }
    if (checkboxStates.Leonardo_da_Vinci) {
      promptPrefix += "ダヴィンチ風に ";
    }
    if (checkboxStates.logoStyle) {
      promptPrefix += "ロゴ風に ";
    }
    if (checkboxStates.disney) {
      promptPrefix += "ディズニー風に ";
    }
    if (checkboxStates.comic) {
      promptPrefix += "コミック風に ";
    }
    if (checkboxStates.genshin_impact) {
      promptPrefix += "原神風に ";
    }
    if (checkboxStates.final_fantasy) {
      promptPrefix += "ファイナルファンタジー風に ";
    }
    if (checkboxStates.persona5) {
      promptPrefix += "ペルソナ風に ";
    }
    const modifiedData = {
      textPrompt: `${promptPrefix}画像生成が可能な英文に修正 ${data.textPrompt}`,
    };
    try {
      const response = await fetch("/api/open-ai/dall-e-v3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setImageUrl(result.srcUrl);
    } catch (error) {
      console.error("Fetch error:", error);
      setImageUrl(null);
    } finally {
      setIsExecuting(false);
    }
  }, [checkboxStates]); // 依存配列を空にしてonSubmit関数が再生成されないようにする


  const addImage: MouseEventHandler<HTMLDivElement> = () => {
    // ここで何かの処理をする
    console.log('ここまできてるよ')
    onUpload(imageUrl)
  };

  useEffect(() => {
    if (gptOutput) {
      onSubmit({ textPrompt: gptOutput }); // gptOutputが変更されたときに自動的に送信
    }
  }, [gptOutput, onSubmit]);

  const flexContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap', // コンテンツがコンテナを超える場合に折り返す
    justifyContent: 'space-between',
    gap: '1px', // チェックボックス間の間隔
  };
  
  const flexItemStyle = {
    flex: '1 1 calc(33.333% 20px)', // 3列で表示するための設定
    justifyContent: 'space-between',
    minWidth: '49%', // 最小幅を設定して、内容に応じて伸縮するが、あまりにも小さくならないようにする
  };
  
  return (
    <div style={{ width: "100%" }}>
      <div style={flexContainerStyle}>

  <label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="precision" checked={checkboxStates.precision} onChange={handleCheckboxChange} />
  浮世絵風に
</label>
<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="watercolor" checked={checkboxStates.watercolor} onChange={handleCheckboxChange} />
  水彩画風に
</label>
<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="acrylic" checked={checkboxStates.acrylic} onChange={handleCheckboxChange} />
  アクリル画風に
</label>
<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="pastelArt" checked={checkboxStates.pastelArt} onChange={handleCheckboxChange} />
  パステル画風に
</label>
<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="penAndInk" checked={checkboxStates.penAndInk} onChange={handleCheckboxChange} />
  ペンとインク風に
</label>
<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="brushStroke" checked={checkboxStates.brushStroke} onChange={handleCheckboxChange} />
  筆風に
</label>
<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="lineStamp" checked={checkboxStates.lineStamp} onChange={handleCheckboxChange} />
  LINEスタンプ風に
</label>
<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="crayon" checked={checkboxStates.crayon} onChange={handleCheckboxChange} />
  クレヨン画風に
</label>
<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="pencilDrawing" checked={checkboxStates.pencilDrawing} onChange={handleCheckboxChange} />
  鉛筆画風に
</label>
<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="coloredPencil" checked={checkboxStates.coloredPencil} onChange={handleCheckboxChange} />
  色鉛筆画風に
</label>
<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="oilPainting" checked={checkboxStates.oilPainting} onChange={handleCheckboxChange} />
  油絵画
</label>

<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="vanGogh" checked={checkboxStates.vanGogh} onChange={handleCheckboxChange} />
  ゴッホ風に
</label>

<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="Manet" checked={checkboxStates.Manet} onChange={handleCheckboxChange} />
  モネ風に
</label>

<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="picasso" checked={checkboxStates.picasso} onChange={handleCheckboxChange} />
  ピカソ風に
</label>

<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="Leonardo_da_Vinci" checked={checkboxStates.Leonardo_da_Vinci} onChange={handleCheckboxChange} />
  ダヴィンチ風に
</label>

<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="logoStyle" checked={checkboxStates.logoStyle} onChange={handleCheckboxChange} />
  ロゴ風に
</label>


<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="comic" checked={checkboxStates.comic} onChange={handleCheckboxChange} />
  コミック風に
</label>

<label style={flexItemStyle}>
  <input type="checkbox" className={styles.checkboxInput} name="disney" checked={checkboxStates.disney} onChange={handleCheckboxChange} />
  ディズニー風に
</label>




  
      
      {/* <label style={flexItemStyle}>
        <input type="checkbox" className={styles.checkboxInput} name="comic" checked={checkboxStates.comic} onChange={handleCheckboxChange} />
        コミック風に
      </label>
      <label style={flexItemStyle}>
        <input type="checkbox" className={styles.checkboxInput} name="genshin_impact" checked={checkboxStates.genshin_impact} onChange={handleCheckboxChange} />
        原神風に
      </label>
      <label style={flexItemStyle}>
        <input type="checkbox" className={styles.checkboxInput} name="final_fantasy" checked={checkboxStates.final_fantasy} onChange={handleCheckboxChange} />
        ファイナルファンタジー風に
      </label>
      <label style={flexItemStyle}>
        <input type="checkbox" className={styles.checkboxInput} name="persona5" checked={checkboxStates.persona5} onChange={handleCheckboxChange} />
        ペルソナ風に
      </label> */}
    </div>
  
    {/* <Typography level="h2">画像生成</Typography> */}
    <TextPromptForm onSubmit={onSubmit} isExecuting={isExecuting} initialValue={gptOutput} />
    <ImageWrapper src={imageUrl} onUpload={() => onUpload()} />
      {isExecuting && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={LoadingSVG} alt="Loading" />
        </div>
      )}
      {imageUrl ? <div onClick={addImage}>個展に画像を追加するa</div> : <></>}
    {/* {selectedImage && (
      <>
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleCloseModal}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-100%)' }}>
              <img src={selectedImage.imageUrl} style={{ width: '300px', height: '300px'}}/>
          </div>
        </div>
        <span>個展に画像を追加するb</span>
      </>
    )} */}
  </div>
);
 
};