import { Box, Button, Typography } from "@mui/material";

function Confirm(props: any) {
  const handleSubmit = () => {
    console.log(props.formValue);
    props.handleNext();
  };
  
  return (
    <div>
      <Typography>{props.formValue.BasicForm.nameBox}</Typography>
      <Typography>{props.formValue.OptionalForm.optionalBox}</Typography>
      {/* 新しいステップの値を表示 */}
      <Typography>{props.formValue.NewStepForm.newField}</Typography>
      {/* 追加されたステップの値を表示 */}
      <Typography>{props.formValue.AdditionalStepForm.additionalField}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 3 }}>
        {/* 選択したタグをスペース区切りで表示 */}
        {props.formValue.AdditionalStepForm.additionalField.split(', ').map((tag, index) => (
          <Typography key={index} sx={{ mr: 2 }}>
            {tag}
          </Typography>
        ))}
      </Box>
      <Box> {/* This opening Box tag was missing */}
        <Button variant="outlined" onClick={props.handleBack} sx={{ mr: 1 }}>
          戻る
        </Button>
        <Button onClick={handleSubmit} variant="outlined">
          提出
        </Button>
      </Box> {/* This closing Box tag matches the newly added opening tag */}
    </div>
  );
}

export default Confirm;