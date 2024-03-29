"use client";
import React, { FC, useState, useEffect, useCallback, MouseEventHandler } from 'react';
import styles from './DallEV3_Interface.module.css';
import { SubmitHandler } from "react-hook-form";
import { TextPromptForm, TextPromptFormInputs } from '../../components/molecules/TextPromptForm';
import { ImageWrapper } from '../../components/molecules/ImageWrapper';

interface CheckboxItemProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [requestCount, setRequestCount] = useState<number>(() => {
    const storedCount = localStorage.getItem('requestCount');
    return storedCount !== null ? parseInt(storedCount, 10) : 0;
  });
  const [isLimitReached, setIsLimitReached] = useState<boolean>(requestCount >= 20);
  const [resetTime, setResetTime] = useState<Date | null>(() => {
    const storedResetTime = localStorage.getItem('resetTime');
    return storedResetTime ? new Date(storedResetTime) : null;
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxStates(prev => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    const now = new Date();
    if (resetTime && now >= resetTime) {
      setRequestCount(0);
      setIsLimitReached(false);
      localStorage.removeItem('resetTime');
      localStorage.removeItem('requestCount');
    }
  }, [resetTime]);

  useEffect(() => {
    localStorage.setItem('requestCount', requestCount.toString());
    if (requestCount >= 19) {
      setIsLimitReached(true);
    }
  }, [requestCount]);

  const onSubmit: SubmitHandler<TextPromptFormInputs> = useCallback(async (data) => {
    if (isLimitReached) {
      alert("リクエストの上限ニャ...また明日、会おうニャ！");
      return;
    }
  
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
        throw new Error("リクエストに失敗したニャ...もう一度試してみてニャ");
      }

      const result = await response.json();
      setImageUrl(result.srcUrl);
      setRequestCount(current => current + 1);
      if (requestCount >= 19) {
        setIsLimitReached(true);
        // リセット時間を設定
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setResetTime(tomorrow);
        localStorage.setItem('resetTime', tomorrow.toISOString());
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message); // Now safely accessing error.message
      } else {
        alert("リクエストに失敗したニャ...もう一度試してみてニャ");
      }
    } finally {
      setIsExecuting(false);
    }
  }, [checkboxStates, requestCount, isLimitReached, setRequestCount, setIsExecuting, setResetTime]); // 依存配列を空にしてonSubmit関数が再生成されないようにする

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
  
  const checkboxItems = [
    { name: 'precision', label: '浮世絵風に' },
    { name: 'watercolor', label: '水彩画風に' },
    { name: 'acrylic', label: 'アクリル画風に' },
    { name: 'pastelArt', label: 'パステル画風に' },
    { name: 'penAndInk', label: 'ペンとインク風に' },
    { name: 'brushStroke', label: '筆風に' },
    { name: 'lineStamp', label: 'LINEスタンプ風に' },
    { name: 'crayon', label: 'クレヨン画風に' },
    { name: 'pencilDrawing', label: '鉛筆画風に' },
    { name: 'coloredPencil', label: '色鉛筆画風に' },
    { name: 'oilPainting', label: '油絵画風に' },
    { name: 'vanGogh', label: 'ゴッホ風に' },
    { name: 'Manet', label: 'モネ風に' },
    { name: 'picasso', label: 'ピカソ風に' },
    { name: 'Leonardo_da_Vinci', label: 'ダヴィンチ風に' },
    { name: 'logoStyle', label: 'ロゴ風に' },
    { name: 'comic', label: 'コミック風に' },
    { name: 'disney', label: 'ディズニー風に' },
  ];

  const CheckboxItem: React.FC<CheckboxItemProps> = ({ name, label, checked, onChange }) => (
    <label className={`${styles.fontDot}`} style={flexItemStyle}>
      <input type="checkbox" className={styles.checkboxInput} name={name} checked={checked} onChange={onChange} />
      {label}
    </label>
  );

  return (
    <div style={{ width: "100%" }}>
    <div style={flexContainerStyle}>
      {checkboxItems.map(item => (
        <CheckboxItem
          key={item.name}
          name={item.name}
          label={item.label}
          checked={checkboxStates[item.name as keyof typeof checkboxStates]}
          onChange={handleCheckboxChange}
        />
      ))}
    </div>
    <TextPromptForm onSubmit={onSubmit} isExecuting={isExecuting} initialValue={gptOutput} />
    <ImageWrapper src={imageUrl} onUpload={() => onUpload()} />
      
    {imageUrl ? <div style={{ textAlign: 'center', fontFamily: 'var(--font-dot)', color: 'blue' }}>気に入ったら右クリック→「名前をつけて画像を保存」してニャ</div> : <></>}
    <div style={{ marginTop: '20px', textAlign: 'center' }} className={styles.fontDot}>
      {isLimitReached ? (
        <p style={{ color: 'red' }}>リクエストの上限に達しました。</p>
      ) : (
        <p>残りのリクエスト回数: {20 - requestCount}</p>
      )}
    </div>
  </div>
);
};