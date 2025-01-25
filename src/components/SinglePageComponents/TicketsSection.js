import MovingEarlyBirdTicketBanner from "../MovingEarlyBirdTicketBanner";
import SectionMainTitle from "../SectionMainTitle";
import ContentWrapper from "@/utilities/ContentWrapper";
import TicketCardComponent from "../TicketCardComponent";

async function fetchTicketsSectionData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ticket-section?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ticket section's data");
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchTicketCards(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ticket-cards?locale=${locale}&sort=order`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ticket cards");
  }

  const data = await res.json();
  return data.data || [];
}

const TicketsSection = async ({ locale }) => {
  const ticketSectionData = await fetchTicketsSectionData(locale);

  const ticketCardContent = await fetchTicketCards(locale);

  return (
    <div id="tickets" className="mb-[80px] md:mb-[200px] scroll-mt-[100px]">
      {/* Title Section */}
      <ContentWrapper className="max-w-[1128] mx-auto">
        <SectionMainTitle
          text={ticketSectionData.TitleText}
          color="bg-primary-600"
        />
      </ContentWrapper>

      {/* Banner Section */}
      <div className="mt-[32px] w-full bg-neutral-900">
        <MovingEarlyBirdTicketBanner
          firstText={ticketSectionData.MovingBannerFirstText}
          secondText={ticketSectionData.MovingBannerSecondText}
        />
      </div>

      {/* Space for Ticket Cards */}
      {/* Ticket Cards Section */}
      <TicketCardComponent ticketCardContent={ticketCardContent} />
    </div>
  );
};

export default TicketsSection;
