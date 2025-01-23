import GoulashBowlSVG from "@/utilities/GoulashBowlSVG";
import OrangePillSVG from "@/utilities/OrangePillSVG";
import PalinkaSVG from "@/utilities/PalinkaSVG";
import React from "react";
import FirstConferenceSecondSVG from "@/utilities/FirstConferenceSecondSVG";

const ProofOfPalinka = () => {
  return (
    <div className="flex flex-row flex-wrap items-start justify-center gap-[40px] mb-[64px] sm:mb-[156px]">
      <div className="flex flex-1 mt-[32px] min-w-[320px] gap-6 md:gap-4 max-w-[440px] flex-col-reverse md:flex-col items-start">
            <div className="h-[200px] mx-auto">
              <GoulashBowlSVG />
            </div>
            <div className="flex flex-col items-start gap-[24px]">
              <h3 className="text-[32px] font-exo font-extrabold leading-[110%] tracking-[4.8px] text-secondary-600">
                Bitcoin Meets Hungary: A Unique Experience
              </h3>
                <p className="text-[rgba(255,255,255,0.80)] font-exo text-[16px] font-medium leading-[150%] tracking-[0.8px]">
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
      <div className="flex flex-1 mt-[32px] min-w-[320px] gap-4 max-w-[440px] flex-col-reverse md:flex-col items-start">
            <div className="h-[200px] mx-auto">
              <OrangePillSVG />
            </div>
            <div className="flex flex-col items-start gap-[24px]">
              <h3 className="text-[32px] font-exo font-extrabold leading-[110%] tracking-[4.8px] text-primary-600">
                Unforgettable Experiences Beyond the Sessions
              </h3>
                <p className="text-[rgba(255,255,255,0.80)] font-exo text-[16px] font-medium leading-[150%] tracking-[0.8px]">
                  The fun doesn’t stop when the sessions end! Join us for side
              events, all powered by the Bitcoin energy and the Proof of
              Pálinka. Unforgettable or a blur? You decide!
                </p>
            </div>
        </div>
    </div>
  );
};

export default ProofOfPalinka;
