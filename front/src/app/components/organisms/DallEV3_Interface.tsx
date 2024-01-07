import React, { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Typography } from "@mui/joy";
import {
  TextPromptForm,
  TextPromptFormInputs,
} from "../../components/molecules/TextPromptForm";
import { ImageWrapper } from "../../components/molecules/ImageWrapper";
import { Modal } from "@mui/joy";

// Step1Componentの定義
const Step1Component: FC<{ onInput: (input: string) => void }> = ({ onInput }) => {
  const [input, setInput] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    onInput(event.target.value);
  };
  
  const handleOpen = () => setOpen(true); // Function to open the modal
  const handleClose = () => setOpen(false); // Functio

  return (
    <div>
      <h2>今どんな感情ですか？</h2>
      <input type="text" value={input} onChange={handleInput} style={{
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: '4px',
        border: '1px solid #ccc'
      }}/>
    </div>
  );
};

// Step2Componentの定義
const Step2Component: FC<{ onInput: (input: string) => void }> = ({ onInput }) => {
  const [input, setInput] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    onInput(event.target.value);
  };

  return (
    <div>
      <h2>何がしたいですか？</h2>
      <input type="text" value={input} onChange={handleInput} style={{
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: '4px',
        border: '1px solid #ccc'
      }}/>
    </div>
  );
};

export const DallE3Interface: FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [step1Input, setStep1Input] = useState<string>("");
  const [step2Input, setStep2Input] = useState<string>("");

  const onSubmit: SubmitHandler<TextPromptFormInputs> = async (data) => {
    data.text = `${step1Input} ${step2Input} ${data.text}`;
    // ... その他のコード
  };

  return (
    <div className="w-full max-w-md flex-col flex gap-2 flex-wrap border-2 border-gray-300 rounded-md p-4 justify-start m-4">
      <Typography level="h2">画像生成</Typography>
      {step === 1 && <Step1Component onInput={setStep1Input} />}
      {step === 2 && <Step2Component onInput={setStep2Input} />}
      {step === 3 && <TextPromptForm onSubmit={onSubmit} isExecuting={isExecuting} initialValue={`${step1Input} ${step2Input}`} />}
      {step < 3 && <button onClick={() => setStep(step + 1)}>次へ</button>}
      
    </div>
  );
};