import { Typography } from "@mui/joy";
import Image from "next/image";
import { FC } from "react";

export const ImageWrapper: FC<{ src: string | null }> = ({ src }) => {
  return (
    <div className="h-auto max-h-[240px]  w-full flex justify-center items-center">
      {src ? (
        <Image src={src} alt={"generated image"} width={240} height={240} />
      ) : (
        <Typography level="body-md">
          テキストを入力すると、画像が生成されます。
        </Typography>
      )}
    </div>
  );
};
