import React from "react";
import Image from "next/image";

const WhaleVenuePicturesSection = () => {
  return (
    <div className="flex flex-col md:flex-row w-full items-center pop:items-end gap-[20px] pb-[156px]">
      <div className="flex md:w-[55%] h-[360px] rounded-[30px] overflow-hidden">
        <Image
          src="/balnaLeft.png"
          alt="Balna Left"
          layout="responsive"
          width={1074}
          height={400}
          className="object-cover"
        />
      </div>
      <div className="flex md:w-[45%] h-[440px] rounded-[30px] overflow-hidden">
        <Image
          src="/balnaRight.png"
          alt="Balna Right"
          layout="responsive"
          width={1074}
          height={400}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default WhaleVenuePicturesSection;
