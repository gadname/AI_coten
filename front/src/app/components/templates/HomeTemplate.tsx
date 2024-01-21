import { DallE3Interface } from "../../components/organisms/DallEV3_Interface";
import { GptV3_5TurboInterface } from "../../components/organisms/GptV3_5TurboInterface";
import { FC } from "react";

export const HomeTemplate: FC = () => {
  return (
    <main class="w-auto h-screen p-5">
      <div className="flex justify-center w-full">
      <GptV3_5TurboInterface /> 
      <DallE3Interface />
      </div>
    </main>
  );
};
