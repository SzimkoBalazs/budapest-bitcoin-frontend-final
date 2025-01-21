import FirstConferenceFirstSVG from "@/utilities/FirstConferenceFirstSVG";
import FirstConferenceSecondSVG from "@/utilities/FirstConferenceSecondSVG";
import FirstConferenceThirdSVG from "@/utilities/FirstConferenceThirdSVG";
import React from "react";

const FirstConference = () => {
  return (
    <div className="flex flex-col fullhd:flex-row items-center fullhd:items-start justify-center gap-[64px] ">
      <div className="flex w-[411px] flex-col items-start gap-[10px] flex-shrink-0">
        <div className="flex flex-col items-end gap-[12px] self-stretch">
          <div className="flex w-[254.883px] h-[200px] flex-col items-start gap-[10px]">
            <FirstConferenceFirstSVG />
          </div>
          <div className="flex flex-col items-start gap-[24px] self-stretch">
            <div className="flex flex-col items-start gap-[16px] self-stretch">
              <p className="text-white/80 font-exo text-[22px] font-normal leading-[150%] tracking-[3.3px] w-[202px] h-[25px]">
                A Fresh Start:
              </p>
              <div className="flex items-center self-stretch gap-[10px]">
                <p className="flex-[1_0_0] text-primary-500 font-exo text-[32px] font-extrabold leading-[110%] tracking-[4.8px]">
                  Budapest’s First Bitcoin Conference
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-[10px] self-stretch">
              <div className="flex justify-center items-center content-center gap-[10px] self-stretch flex-wrap">
                <p className="flex-[1_0_0] text-white text-opacity-80 font-exo text-[16px] font-medium leading-[150%] tracking-[0.8px]">
                  This isn’t just another Bitcoin event - it’s a new beginning.
                  As the first-ever BTC conference in Budapest, we're returning
                  to what Bitcoin truly stands for. And let’s be honest: it’s
                  also the perfect excuse to finally visit Budapest. We all know
                  it’s been on your bucket list - make 2025 the year you tick it
                  off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[411px] flex-col items-start gap-[10px] flex-shrink-0 pt-[40px]">
        <div className="flex flex-col items-center gap-[12px] self-stretch">
          <div className="flex w-[190px] h-[200px] items-center gap-[10px]">
            <div className="flex items-center gap-[10px] flex-[1_0_0]">
              <FirstConferenceSecondSVG />
            </div>
          </div>
          <div className="flex flex-col items-start gap-[24px] self-stretch">
            <div className="flex items-center gap-[10px] self-stretch">
              <p className="flex-[1_0_0] text-[32px] font-exo font-extrabold leading-[110%] tracking-[4.8px] text-secondary-600">
                Inspiring Speakers & Engaging Stages
              </p>
            </div>
            <div className="flex flex-col items-start gap-[10px] self-stretch">
              <div className="flex justify-center items-center content-center gap-[10px] self-stretch flex-wrap">
                <p className="flex-[1_0_0] text-[rgba(255,255,255,0.80)] font-exo text-[16px] font-medium leading-[150%] tracking-[0.8px]">
                  Our event features a diverse lineup of Bitcoin Core
                  developers, global thought leaders, and Hungarian Bitcoin
                  pioneers, offering sessions in both English and Hungarian.
                  Hear from voices rarely showcased at conferences and gain
                  insights that will shape your Bitcoin journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[411px] flex-col items-start gap-[10px] flex-shrink-0 pt-[40px]">
        <div className="flex flex-col items-center gap-[12px] self-stretch">
          <div className="flex w-[382px] justify-center items-center">
            <div className="w-[382.34px] h-[205.572px] flex-shrink-0">
              <FirstConferenceThirdSVG />
            </div>
          </div>
          <div className="flex flex-col items-start gap-[24px] self-stretch">
            <div className="flex items-center gap-[10px] self-stretch">
              <p className="flex-[1_0_0] text-primary-500 font-exo text-[32px] font-extrabold leading-[110%] tracking-[4.8px]">
                Networking, Laughs & Bitcoin Bonds
              </p>
            </div>
            <div className="flex flex-col items-start gap-[10px] self-stretch">
              <div className="flex justify-center items-center content-center gap-[10px] self-stretch flex-wrap">
                <p className="flex-[1_0_0] text-white/80 font-exo text-[16px] font-medium leading-[150%] tracking-[0.8px]">
                  Build meaningful connections with Bitcoin enthusiasts,
                  professionals, and innovators. Budapest Bitcoin fosters an
                  environment for collaboration - from forging professional
                  partnerships to creating lifelong friendships. This is where
                  Bitcoin bonds are made.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstConference;
