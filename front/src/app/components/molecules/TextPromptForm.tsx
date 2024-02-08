"use client";
import React, { FC, useState, useEffect } from "react";
import { FormControl, Button } from "@mui/joy";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Textarea } from "@mui/joy";

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
  
      recognition.onresult = (event) => {
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
  
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    } else {
      alert('このブラウザは音声認識をサポートしていません。');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
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
      <Button variant="outlined" onClick={startSpeechToText} disabled={isListening}>
        {isListening ? '聞いてるニャ...' : '音声入力ニャ'}
      </Button>
    </form>
  );
};