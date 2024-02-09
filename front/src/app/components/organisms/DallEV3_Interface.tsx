"use client";
import React, { FC, useState, useEffect, useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { Typography } from "@mui/joy";
import {
  TextPromptForm,
  TextPromptFormInputs,
} from "../../components/molecules/TextPromptForm";
import { ImageWrapper } from "../../components/molecules/ImageWrapper";

interface DallE3InterfaceProps {
  gptOutput: string; // 追加
}


export const DallE3Interface: FC<DallE3InterfaceProps> = ({ gptOutput }) => {
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

  const onSubmit: SubmitHandler<TextPromptFormInputs> = useCallback(async (data) => {
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

  useEffect(() => {
    if (gptOutput) {
      onSubmit({ textPrompt: gptOutput }); // gptOutputが変更されたときに自動的に送信
    }
  }, [gptOutput, onSubmit]);
  return (
    <div style={{ width: "100%" }}>
    <label>
      <input type="checkbox" name="precision" checked={checkboxStates.precision} onChange={handleCheckboxChange} />
      歌川広重風に
    </label>
    <label>
      <input type="checkbox" name="watercolor" checked={checkboxStates.watercolor} onChange={handleCheckboxChange} />
      水彩画風に
    </label>
    <label>
    <input type="checkbox" name="acrylic" checked={checkboxStates.acrylic} onChange={handleCheckboxChange} />
      アクリル風に
    </label>
    <label>
    <input type="checkbox" name="pastelArt" checked={checkboxStates.pastelArt} onChange={handleCheckboxChange} />
      パステル画風に
    </label>
    <label>
    <input type="checkbox" name="penAndInk" checked={checkboxStates.penAndInk} onChange={handleCheckboxChange} />
      ペンとインク風に
    </label>
    <label>
    <input type="checkbox" name="brushStroke" checked={checkboxStates.brushStroke} onChange={handleCheckboxChange} />
      筆風に
    </label>
    <label>
    <input type="checkbox" name="lineStamp" checked={checkboxStates.lineStamp} onChange={handleCheckboxChange} />
      LINEスタンプ風に
    </label>
    <label>
    <input type="checkbox" name="crayon" checked={checkboxStates.crayon} onChange={handleCheckboxChange} />
      クレヨン風に
    </label>
    <label>
    <input type="checkbox" name="pencilDrawing" checked={checkboxStates.pencilDrawing} onChange={handleCheckboxChange} />
      鉛筆風に
    </label>
    <label>
    <input type="checkbox" name="coloredPencil" checked={checkboxStates.coloredPencil} onChange={handleCheckboxChange} />
      色鉛筆風に
    </label>
    <label>
    <input type="checkbox" name="oilPainting" checked={checkboxStates.oilPainting} onChange={handleCheckboxChange} />
      油絵風に
    </label>
    <label>
    <input type="checkbox" name="picasso" checked={checkboxStates.picasso} onChange={handleCheckboxChange} />
      ピカソ風に
    </label>
    <label>
  <input type="checkbox" name="vanGogh" checked={checkboxStates.vanGogh} onChange={handleCheckboxChange} />
  ゴッホ風に
</label>
<label>
  <input type="checkbox" name="Manet" checked={checkboxStates.Manet} onChange={handleCheckboxChange} />
  モネ風に
</label>
<label>
  <input type="checkbox" name="Leonardo_da_Vinci" checked={checkboxStates.Leonardo_da_Vinci} onChange={handleCheckboxChange} />
  ダヴィンチ風に
</label>
<label>
  <input type="checkbox" name="logoStyle" checked={checkboxStates.logoStyle} onChange={handleCheckboxChange} />
  ロゴ風に
</label>
<label>
  <input type="checkbox" name="disney" checked={checkboxStates.disney} onChange={handleCheckboxChange} />
  ディズニー風に
</label>
<label>
  <input type="checkbox" name="comic" checked={checkboxStates.comic} onChange={handleCheckboxChange} />
  コミック風に
</label>
    <label>
      <input type="checkbox" name="genshin_impact" checked={checkboxStates.genshin_impact} onChange={handleCheckboxChange} />
      原神風に
    </label>
    <label>
      <input type="checkbox" name="final_fantasy" checked={checkboxStates.final_fantasy} onChange={handleCheckboxChange} />
      ファイナルファンタジー風に
    </label>
    <label>
      <input type="checkbox" name="persona5" checked={checkboxStates.persona5} onChange={handleCheckboxChange} />
      ペルソナ風に
    </label>
    
    
      {/* <Typography level="h2">画像生成</Typography> */}
      <TextPromptForm onSubmit={onSubmit} isExecuting={isExecuting} initialValue={gptOutput} />
      <ImageWrapper src={imageUrl} />
    </div>
  );
};