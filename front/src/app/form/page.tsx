'use client';

import {
    Box,
    Button,
    Container,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import { useState } from "react";
import Basic from "../components/forms/Basic";
import { useModal } from '../components/useModal';
import Confirm from "../components/forms/Confirm";
import Optional from "../components/forms/Optional";
import NewStep from "../components/forms/NewStep";
import AdditionalStep from "../components/forms/AdditionalStep"; // 追加のステップのコンポーネントをインポートします。
import { HomeTemplate } from "@/app/components/templates/HomeTemplate";
import TagSelector from "../components/TagSelector";
import Hed from '../components/Hed';
import { useSession, signIn, signOut } from 'next-auth/react'

// ステップの順序に「追加情報」を追加します。
const steps = ["基本情報", "詳細情報", "新しいステップ", "追加情報", "確認"];

export default function Home() {
    const { isOpen, onClose, onOpen } = useModal();
    const [activeStep, setActiveStep] = useState(0);
    const [formValue, setFormValue] = useState({});
    const { data: session, status } = useSession()
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const changeFormComponent = (activeStep: number) => {
        switch (activeStep) {
            case 0:
                return <Basic handleNext={handleNext} formValue={formValue} setFormValue={setFormValue} />;
            case 1:
                return <Optional handleBack={handleBack} handleNext={handleNext} formValue={formValue} setFormValue={setFormValue} />;
            case 2:
                return <NewStep handleBack={handleBack} handleNext={handleNext} formValue={formValue} setFormValue={setFormValue} />;
            case 3: // 新しい「追加情報」ステップのcaseを追加します。
                return <AdditionalStep handleBack={handleBack} handleNext={handleNext} formValue={formValue} setFormValue={setFormValue} />;
            case 4: // 「確認」ステップのcaseを更新します。
                return <Confirm handleBack={handleBack} handleNext={handleNext} formValue={formValue} />;
            default:
                return null;
        }
    };

    return (
        <Container sx={{ marginTop: '100px' }}>
          <TagSelector />
            {/* ここでBoxを別のコンポーネントに置き換えます */}
            <div style={{ width: "100%" }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? (
                    <div>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <div style={{ display: "flex", flexDirection: "row", pt: 2 }}>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                        
                    </div>
                    
                ) : (
                    <div>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        {changeFormComponent(activeStep)}
                    </div>
                    
                )}
                
            </div>
            <HomeTemplate />
            <Hed />
        </Container>
    );
}