import React from "react";
import StayUpdatedForm from "../StayUpdatedForm";
import GetInTouch from "../GetInTouch";
import ContentWrapper from "@/utilities/ContentWrapper";
import BTCBudapestLogo from "@/components/BTCBudapestLogo";

async function fetchComingSoonFormData(locale) {
  //   TODO: Legyen coming-soon-form
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/coming-soon-form?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch coming soon form's data");
  }

  const data = await res.json();
  return data.data || [];
}

const ComingSoonForm = async({locale}) => {
  //   TODO: comingSoonForm
  const comingSoonFormData = await fetchComingSoonFormData(locale);
  return (
      <ContentWrapper insideClassName={'px-0 pr-2'}>
          <div
      className="flex w-fit mx-auto bg-black max-w-[840px] py-[24px] px-[24px] xs:px-[40px] sm:py-[32px] sm:px-[64px] mt-[160px] md:mt-0 mb-[100px] sm:mb-[240px]"
      style={{
        boxShadow:'1px 1px 0px #F7931A, 2px 2px 0px #F7931A, 3px 3px 0px #F7931A, 4px 4px 0px #F7931A, 5px 5px 0px #F7931A, 6px 6px 0px #F7931A, 7px 7px 0px #F7931A, 9px 9px 10px 3px rgba(247, 147, 26, 0.15)',
        borderRadius:20,
          border:'2px solid #F7931A'
        }}
    >
        {/*    TODO: Pass comingsoon form to comingsoon form data*/}
        <StayUpdatedForm comingSoonFormData={comingSoonFormData} locale={locale} />
    </div>
      </ContentWrapper>

  );
};

export default ComingSoonForm;
