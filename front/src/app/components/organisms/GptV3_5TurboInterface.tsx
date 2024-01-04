"use client";
import React, { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { FormControl, FormLabel, Textarea, Typography } from "@mui/joy";
import {
  TextPromptForm,
  TextPromptFormInputs,
} from "@/app/components/molecules/TextPromptForm";

export const GptV3_5TurboInterface: FC = () => {
  const [answer, setAnswer] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TextPromptFormInputs> = async (data) => {
    try {
      setIsExecuting(true);
      const response = await fetch("/api/open-ai/gpt-v3-5-turbo", {
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
      setAnswer(result.answer);
    } catch (error) {
      console.error("Fetch error:", error);
      setAnswer("An error occurred. Please try again.");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="w-full max-w-md flex-col flex gap-2 flex-wrap border-2 border-gray-300 rounded-md p-4 justify-start m-4">
      <Typography level="h2">GPT-3 5 Turbo</Typography>
      <TextPromptForm onSubmit={onSubmit} isExecuting={isExecuting} />
      <div className="flex flex-col gap-2 w-full">
        <FormControl>
          <FormLabel>Answer</FormLabel>
          <Textarea maxRows={8} minRows={8} disabled value={answer} />
        </FormControl>
      </div>
    </div>
  );
};
