"use client";
import React, { FC, useState, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { FormControl, FormLabel, Textarea, Typography, Button } from "@mui/joy";
import {
  TextPromptForm,
  TextPromptFormInputs,
} from "@/app/components/molecules/TextPromptForm";

interface GptV3_5TurboInterfaceProps {
  setGptOutput: (output: string) => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  // Add other properties as needed
}

declare global {
    interface Window {
      SpeechRecognition: any;
    }
  }

export const GptV3_5TurboInterface: FC<GptV3_5TurboInterfaceProps> = ({ setGptOutput }) => {
  const [answer, setAnswer] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'ja-JP';
    recognition.interimResults = false; // 中間結果は不要
    recognition.maxAlternatives = 1; // 最も確からしい結果のみを取得
  
    let finalTranscript = ''; // 最終的なテキストを格納する変数
  
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const speechToText = event.results[0][0].transcript;
      finalTranscript += speechToText; // 最終的なテキストに追加
    };
  
    recognition.onend = () => {
      if (finalTranscript) {
        setGptOutput(finalTranscript); // GPTの出力を更新してDALL-Eによる画像生成をトリガー
      }
    };

    recognition.start();

    return () => recognition.stop();
  }, []);

  const handleSubmit = async (text: string) => {
    try {
      setIsExecuting(true);
      const modifiedData = {
        textPrompt: `更に精密で詳細な英文に修正 ${text}`,
      };
      const response = await fetch("/api/open-ai/gpt-v3-5-turbo", {
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
      setAnswer(result.answer);
      setGptOutput(result.answer);
    } catch (error) {
      console.error("Fetch error:", error);
      setAnswer("An error occurred. Please try again.");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="w-screen max-w-md flex-col flex gap-2 flex-wrap-reverse border-2 border-gray-300 rounded-md p-4 justify-start m-4">
      <Typography level="h2">話しかけてニャ!</Typography>
      <TextPromptForm onSubmit={(data) => handleSubmit(data.textPrompt)} isExecuting={isExecuting} initialValue="" />
      <div className="flex flex-col gap-2 w-full">
        <FormControl>
          <FormLabel>Answer</FormLabel>
          <Textarea maxRows={8} minRows={8} value={answer} readOnly />
        </FormControl>
      </div>
    </div>
  );
};