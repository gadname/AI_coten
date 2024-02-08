"use client";
import React, { FC, useState } from "react";
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TextPromptFormInputs> = async (data) => {
    try {
      setIsExecuting(true);
      const response = await fetch("/api/open-ai/dall-e-v3", {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
  };

  return (
    <div style={{ width: "100%" }}>
      {/* <Typography level="h2">画像生成</Typography> */}
      <TextPromptForm onSubmit={onSubmit} isExecuting={isExecuting} initialValue={gptOutput} />
      <ImageWrapper src={imageUrl} />
    </div>
  );
};