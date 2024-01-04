"use client";
import React, { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Typography } from "@mui/joy";
import {
  TextPromptForm,
  TextPromptFormInputs,
} from "@/app/components/molecules/TextPromptForm";
import { ImageWrapper } from "@/app/components/molecules/ImageWrapper";

export const DallE3Interface: FC = () => {
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
    <div className="w-full max-w-md flex-col flex gap-2 flex-wrap border-2 border-gray-300 rounded-md p-4 justify-start m-4">
      <Typography level="h2">Dall-E 3</Typography>
      <TextPromptForm onSubmit={onSubmit} isExecuting={isExecuting} />
      <ImageWrapper src={imageUrl} />
    </div>
  );
};
