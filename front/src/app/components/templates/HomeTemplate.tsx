import React, { useState } from "react";
import { DallE3Interface } from "../../components/organisms/DallEV3_Interface";
// import { GptV3_5TurboInterface } from "../../components/organisms/GptV3_5TurboInterface";
import { FC  } from "react";


export const HomeTemplate: FC<any> = ({onUpload}) => {
  // GptV3_5TurboInterface からの出力を保持するための状態を追加
  const [gptOutput, setGptOutput] = useState<string>("");
  const handleUpload = typeof onUpload === 'function' ? onUpload : () => console.warn('onUpload is not a function');

  return (
    <main className="w-auto h-screen p-5">
      <div className="flex justify-center w-full">
        {/* <GptV3_5TurboInterface setGptOutput={setGptOutput} /> */}
       <DallE3Interface onUpload={handleUpload} gptOutput={gptOutput} />
      </div>
    </main>
    
  );
};






















