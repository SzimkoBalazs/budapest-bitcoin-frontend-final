import React from "react";
import Image from "next/image";
import ContentWrapper from "@/utilities/ContentWrapper";
import ProofOfPalinka from "@/components/ProofOfPalinka";
import WhaleVenue from "@/components/WhaleVenue";

const WhaleVenuePicturesSection = () => {
  return (
      <div className="mb-[80px] sm:mb-[200px]">
          <ContentWrapper className="mt-[64px] sm:mt-[160px] flex flex-col max-w-[1128] mx-auto">
                <WhaleVenue />
          </ContentWrapper>
    <div className="flex overflow-hidden md:mt-[-56px] flex-col md:flex-row w-full items-center md:items-end gap-[20px]">
      <div className="flex w-[150%] sm:pr-0 md:w-[60%] h-[100%] md:h-auto max-h-[600px] rounded-[30px]">
        <Image
          src="/balnaLeft.png"
          alt="Balna Left"
          layout="responsive"
          width={1920}
          height={866}
          className="object-cover object-[20%_50%]"
        />
      </div>
      <div className="flex w-full md:w-[40%] h-[100%] md:h-auto max-h-[600px] rounded-[30px] overflow-hidden">
        <Image
          src="/balnaRight.png"
          alt="Balna Right"
          layout="responsive"
          width={1400}
          height={1276}
          className="object-cover"
        />
      </div>
    </div>
      </div>

  );
};

export default WhaleVenuePicturesSection;
