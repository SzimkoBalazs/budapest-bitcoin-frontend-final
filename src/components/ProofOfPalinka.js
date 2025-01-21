import GoulashBowlSVG from "@/utilities/GoulashBowlSVG";
import OrangePillSVG from "@/utilities/OrangePillSVG";
import PalinkaSVG from "@/utilities/PalinkaSVG";
import React from "react";

const ProofOfPalinka = () => {
  return (
    <div className="flex flex-col pop:flex-row max-w-min pop:max-w-[1128px] mx-auto gap-[40px] justify-center items-center pop:items-end">
      <div className="flex flex-col   gap-[40px] flex-[1_0_0]">
        <div className="flex h-[200px] px-[80px] py-[46px] justify-center items-center gap-[10px] self-stretch">
          <GoulashBowlSVG />
        </div>
        <div className="flex h-[327px] flex-col items-start gap-[24px] self-stretch">
          <p className="self-stretch text-secondary-600 font-exo text-[32px] font-extrabold leading-[110%] tracking-[4.8px]">
            Bitcoin Meets Hungary: A Unique Experience
          </p>
          <p className="w-[422px] flex-[1_0_0] text-white/80 font-exo text-[16px] font-medium leading-[150%] tracking-[0.8px]">
            Hungarians are masters at bringing people together over delicious
            food and drink. Experience Bitcoin like never before: infused with a
            spirit that’s uniquely ours. From the rich flavors of goulash,
            lángos, and kürtőskalács to a glass of fine wine, we’re sharing our
            culture and our passion for Bitcoin with you.
          </p>
        </div>
      </div>
      <div className="flex pl-[80px] justify-center items-start gap-[10px] flex-[1_0_0] order-[-1] pop:order-none">
        <PalinkaSVG />
      </div>
      <div className="flex h-[610px] items-end gap-[-40px] flex-[1_0_0]">
        <div className="flex flex-col items-start gap-[40px] flex-[1_0_0]">
          <div className="flex flex-col justify-center items-center gap-[10px] px-[42px] self-stretch">
            <OrangePillSVG />
          </div>
          <div className="flex flex-col items-start gap-[24px] self-stretch">
            <p className="self-stretch text-primary-500 font-exo text-[32px] font-extrabold leading-[110%] tracking-[4.8px]">
              Unforgettable Experiences Beyond the Sessions
            </p>
            <p className="w-[422px] text-white/80 font-exo text-[16px] font-medium leading-[150%] tracking-[0.8px]">
              The fun doesn’t stop when the sessions end! Join us for side
              events, all powered by the Bitcoin energy and the Proof of
              Pálinka. Unforgettable or a blur? You decide!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProofOfPalinka;
