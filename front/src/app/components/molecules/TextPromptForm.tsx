"use client";
import React, { FC, useState, useEffect } from "react";
import { FormControl, Button } from "@mui/joy";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { Textarea } from "@mui/joy";

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  // Add other properties as needed
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export type TextPromptFormProps = {
  onSubmit: SubmitHandler<TextPromptFormInputs>;
  isExecuting: boolean;
  initialValue: string;
};

export type TextPromptFormInputs = {
  textPrompt: string;
};

export const TextPromptForm: FC<TextPromptFormProps> = ({ onSubmit, isExecuting, initialValue }) => {
  const { handleSubmit, control, setValue } = useForm<TextPromptFormInputs>({
    defaultValues: {
      textPrompt: initialValue,
    },
  });
  
  useEffect(() => {
    setValue('textPrompt', initialValue);
  }, [initialValue, setValue]);
  const [isListening, setIsListening] = useState(false);

  const startSpeechToText = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.start();
  
      setIsListening(true);
  
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');
        setValue('textPrompt', transcript, { shouldValidate: true }); // データを設定し、バリデーションをトリガー
        setIsListening(false);
        recognition.stop(); // 音声認識を停止
      };
  
      recognition.onend = () => {
        // 音声認識が終了したらフォームを送信
        handleSubmit(onSubmit)(); // handleSubmitを呼び出してonSubmitをトリガー
      };
  
      recognition.onerror = (event: Event) => {
        console.error('Speech recognition error', (event as any).error);
        setIsListening(false);
      };
    } else {
      alert('このブラウザは音声認識をサポートしていません。');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
      <Button variant="outlined" onClick={startSpeechToText} disabled={isListening} style={{ backgroundColor: 'transparent', boxShadow: 'none', border: 'none' }}>
  {isListening ? (
    <MicOffIcon style={{ color: 'white', border: '2px solid white', borderRadius: '50%', padding: '4px', fontSize: '28px', backgroundColor: 'red' }} />
  ) : (
    <MicIcon style={{ color: 'white', border: '2px solid white', borderRadius: '50%', padding: '4px', fontSize: '28px', backgroundColor: 'red' }} />
  )}
  <span style={{ marginLeft: 8, display: isListening ? 'inline' : 'none' }}>聞いてるニャ...</span>
</Button>
      <Controller
        name="textPrompt"
        control={control}
        rules={{ required: "Text prompt is required." }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl>
            <Textarea
              error={!!error}
              minRows={2}
              onChange={onChange}
              value={value}
              placeholder="ここに文字を打つニャ!"
              style={{ width: "100%" }}
            />
          </FormControl>
        )}
      />
      
      <Button variant="outlined" type="submit" loading={isExecuting}>
        ソウシンニャ!
      </Button>
      
    </form>
  );
};