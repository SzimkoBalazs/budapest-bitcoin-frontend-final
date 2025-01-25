import Image from "next/image";

const ImageForSpeakerCard = ({ image_url }) => {
  return (
    <Image
      src={image_url}
      alt="Speaker Image"
      width={208}
      height={180}
      className=" self-stretch rounded-[8px]"
      style={{
        objectFit: "cover",
        objectPosition: "50% 50%",
      }}
    />
  );
};

export default ImageForSpeakerCard;
