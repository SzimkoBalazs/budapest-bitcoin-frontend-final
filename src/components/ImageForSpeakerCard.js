import Image from "next/image";

const ImageForSpeakerCard = ({ image_url }) => {
  return (
    <Image
      src={image_url}
      alt="Speaker Image"
      layout="responsive"
      width={208}
      height={180}
      objectPosition="50% 50%"
      className=" self-stretch rounded-[8px]"
      style={{
        objectFit: "cover",
      }}
    />
  );
};

export default ImageForSpeakerCard;
