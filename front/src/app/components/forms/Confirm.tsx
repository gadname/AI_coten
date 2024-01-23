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
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
    {/* 選択したタグをスペース区切りで表示 */}
    {typeof props.formValue.AdditionalStepForm.additionalField === 'string' ? (
      props.formValue.AdditionalStepForm.additionalField.split(', ').map((tag: string, index: number) => (
        <Typography key={index} style={{ marginRight: '8px' }}>
          {tag}
        </Typography>
      ))
    ) : null}
  </div>
  <div style={{ display: 'flex', marginTop: '16px' }}>
    <Button variant="outlined" onClick={props.handleBack} style={{ marginRight: '8px' }}>
      戻る
    </Button>
    <Button onClick={handleSubmit} variant="outlined">
      提出
    </Button>
  </div>
</div>
  );
}

export default Confirm;