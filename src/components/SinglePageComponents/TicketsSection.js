import MovingEarlyBirdTicketBanner from "../MovingEarlyBirdTicketBanner";
import SectionMainTitle from "../SectionMainTitle";
import ContentWrapper from "@/utilities/ContentWrapper";
import TicketCardComponent from "../TicketCardComponent";

async function fetchTicketsTitle(locale) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/ticket-section-main-title?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ticket section's title");
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchBannerContent(locale) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/early-bird-ticket-banner?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch moving banner's content");
  }

  const data = await res.json();
  return data.data || [];
}

async function fetchTicketCards(locale) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/ticket-cards?locale=${locale}&sort=order`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch ticket cards");
  }

  const data = await res.json();
  return data.data || [];
}

const TicketsSection = async ({ locale }) => {
  const ticketsTitle = await fetchTicketsTitle(locale);
  const bannerContent = await fetchBannerContent(locale);
  const ticketCardContent = await fetchTicketCards(locale);
  console.log(ticketCardContent);
  return (
    <div>
      {/* Title Section */}
      <ContentWrapper className="pt-[80px]">
        <SectionMainTitle text={ticketsTitle.TitleText} color="#F7931A" />
      </ContentWrapper>

      {/* Banner Section */}
      <div className="mt-[32px] w-full bg-neutral-900">
        <MovingEarlyBirdTicketBanner bannerContent={bannerContent} />
      </div>

      {/* Space for Ticket Cards */}
      <ContentWrapper className="pt-[64px]">
        <div className="pb-[200px]">
          {/* Ticket Cards Section */}
          <TicketCardComponent ticketCardContent={ticketCardContent} />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default TicketsSection;
