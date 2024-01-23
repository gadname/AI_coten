// front/src/app/components/forms/NewStep.tsx
import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface MyFormNewStep {
  newField: string;
}

const schema = yup
  .object({
    newField: yup.string().required("必須項目です"), // 新しいフィールドのバリデーションルール
  })
  .required();

function NewStep(props: any) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MyFormNewStep>({
    defaultValues: {
      newField: "", // 新しいフィールドのデフォルト値
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: MyFormNewStep) => {
    console.log(data);
    props.handleNext();
    props.setFormValue({ ...props.formValue, NewStepForm: data });
  };

  useEffect(() => {
    if (props.formValue.NewStepForm) {
      setValue("newField", props.formValue.NewStepForm.newField, {
        shouldDirty: true,
      });
    }
  }, [props.formValue.NewStepForm, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="newField"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="新しいフィールド"
              error={!!errors.newField}
              helperText={errors.newField?.message}
              fullWidth
            />
          )}
        />
        <Box>
          <Button variant="outlined" onClick={props.handleBack} sx={{ mr: 1 }}>
            戻る
          </Button>
          <Button type="submit" variant="outlined">
            次へ
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default NewStep;
