import React from "react";
import Image from "next/image";

const WhaleVenuePicturesSection = () => {
  return (
    <div className="flex flex-col pop:flex-row w-full items-center pop:items-end gap-[20px] pb-[156px]">
      <div className="flex pop:w-[60%] h-[501px] rounded-[30px] overflow-hidden">
        <Image
          src="/balnaLeft.png"
          alt="Balna Left"
          layout="responsive"
          width={1074}
          height={501}
          className="object-cover"
        />
      </div>
      <div className="flex pop:w-[40%] h-[501px] rounded-[30px] overflow-hidden">
        <Image
          src="/balnaRight.png"
          alt="Balna Right"
          layout="responsive"
          width={1074}
          height={501}
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default WhaleVenuePicturesSection;
