import { Typography } from "@mui/joy";
import Image from "next/image";
import { FC } from "react";
import { useSession } from "next-auth/react";
interface ImageWrapperProps {
  src: string | null;
  isUpload: boolean;
}

export const ImageWrapper: React.FC<any> = ({ src, onUpload }) => {

    

  return (
    <div className="h-auto max-h-[240px]  w-full flex justify-center items-center">
      {src ? (
        <Image src={src} alt={"generated image"} width={240} height={240} />
      ) : (
        <Typography level="body-md">
         
        </Typography>
      )}
      <button onClick={onUpload}>ギャラリーに画像を追加</button>
    </div>
    
  );
};













