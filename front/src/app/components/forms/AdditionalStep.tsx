// front/src/app/components/forms/AdditionalStep.tsx
import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface MyFormAdditionalStep {
  additionalField: string;
}

const schema = yup
  .object({
    additionalField: yup.string().required("必須項目です"), // 追加フィールドのバリデーションルール
  })
  .required();

function AdditionalStep(props: any) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MyFormAdditionalStep>({
    defaultValues: {
      additionalField: "", // 追加フィールドのデフォルト値
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: MyFormAdditionalStep) => {
    console.log(data);
    props.handleNext();
    props.setFormValue({ ...props.formValue, AdditionalStepForm: data });
  };

  useEffect(() => {
    if (props.formValue.AdditionalStepForm) {
      setValue("additionalField", props.formValue.AdditionalStepForm.additionalField, {
        shouldDirty: true,
      });
    }
  }, [props.formValue.AdditionalStepForm, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="additionalField"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="追加フィールド"
              error={!!errors.additionalField}
              helperText={errors.additionalField?.message}
              fullWidth
            />
          )}
        />
        <Box style={{ display: "flex", flexDirection: "row", paddingTop: "16px" }}>
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

export default AdditionalStep;