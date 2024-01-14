import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface MyformOptional {
  optionalBox: string;
}

const schema = yup
  .object({
    optionalBox: yup.string().required("必須項目です"),
  })
  .required();

function Optional(props: any) {
  const { control, handleSubmit, setValue, formState:{errors}} =
    useForm<MyformOptional>({
      defaultValues: {
        optionalBox: "",
      },
      resolver: yupResolver(schema),
      mode: "all",
    });

  const onSubmit = (data: MyformOptional) => {
    console.log(data);
    props.handleNext();
    props.setFormValue({ ...props.formValue, OptionalForm: data });
  };

  useEffect(() => {
    if (props.formValue.OptionalForm) {
      setValue("optionalBox", props.formValue.OptionalForm.optionalBox, {
        shouldDirty: true,
      });
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="optionalBox"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="備考"
              error={errors.optionalBox ? true : false}
              helperText={errors.optionalBox?.message}
              fullWidth
            ></TextField>
          )}
        />
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button variant="outlined" onClick={props.handleBack} sx={{ mr: 1 }}>
            戻る
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            確認へ
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Optional;