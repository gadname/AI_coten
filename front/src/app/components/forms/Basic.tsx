import { Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface MyformBasic {
  nameBox: string;
}

const schema = yup
  .object({
    nameBox: yup.string().required("必須項目です"),
  })
  .required();

function Basic(props: any) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MyformBasic>({
    defaultValues: {
      nameBox: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: MyformBasic) => {
    console.log(data);
    props.handleNext();
    props.setFormValue({ ...props.formValue, BasicForm: data });
  };

  useEffect(() => {
    if (props.formValue.BasicForm) {
      setValue("nameBox", props.formValue.BasicForm.nameBox, {
        shouldDirty: true,
      });
    }
  }, []);
  console.log(errors.nameBox);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="nameBox"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="名前"
              error={errors.nameBox ? true : false}
              helperText={errors.nameBox?.message}
              fullWidth
            ></TextField>
          )}
        />
        <Box>
          <Button variant="outlined" disabled sx={{ mr: 1 }}>
            戻る
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="outlined">
            次へ
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Basic;
