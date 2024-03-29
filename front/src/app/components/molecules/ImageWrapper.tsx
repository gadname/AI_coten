import Image from "next/image";

export const ImageWrapper: React.FC<any> = ({ src }) => {

  return (
    <div className="h-auto max-h-[240px]  w-full flex justify-center items-center">
      {src ? (
        <Image src={src} alt={"generated image"} width={240} height={240} />
      ) : null}     
    </div>
  );
};












