// front/src/app/components/forms/AdditionalStep.tsx
import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface MyFormAdditionalStep {
  additionalField: string;
}
interface AdditionalStepProps {
  handleNext: () => void;
  handleBack: () => void;
  setFormValue: (value: any) => void; // ここで適切な型を指定してください
  formValue: {
    AdditionalStepForm?: MyFormAdditionalStep;
    // 他の必要なプロパティがあればここに追加
  };
}
const schema = yup
  .object({
    additionalField: yup.string().required("必須項目です"), // 追加フィールドのバリデーションルール
  })
  .required();

  function AdditionalStep(props: AdditionalStepProps) {
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Button variant="outlined" onClick={props.handleBack} style={{ marginRight: '8px' }}>
          戻る
        </Button>
        <Button type="submit" variant="outlined">
          次へ
        </Button>
      </div>
    </form>
    </div>
  );
}

export default AdditionalStep;