"use client";
import { FormControl, FormLabel, Textarea, Button } from "@mui/joy";
import { FC } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

export type TextPromptFormProps = {
  onSubmit: SubmitHandler<TextPromptFormInputs>;
  isExecuting: boolean;
  initialValue: string;
  insertValues: () => string; // この関数はBasicFormとOptionalFormの値を結合して返します
};

export type TextPromptFormInputs = {
  textPrompt: string;
};

export const TextPromptForm: FC<{
  onSubmit: SubmitHandler<TextPromptFormInputs>;
  isExecuting: boolean;
  initialValue: string;
}> = ({ onSubmit, isExecuting, initialValue  }) => {
  const { handleSubmit, control } = useForm<TextPromptFormInputs>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full"
      
    >
      <Controller
        name="textPrompt"
        control={control}
        rules={{ required: "Text prompt is required." }}
        defaultValue={initialValue}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl>
            <FormLabel>Text prompt</FormLabel>
            <Textarea
              error={!!error}
              minRows={2}
              onChange={onChange}
              value={value}
              style={{ width: "100%"  }} 
            />
          </FormControl>
        )}
      />
      <Button variant="outlined" type="submit" loading={isExecuting}>
        Execute
      </Button>
    </form>
  );
};
