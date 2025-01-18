import MovingEarlyBirdTicketBanner from "../MovingEarlyBirdTicketBanner";
import SectionMainTitle from "../SectionMainTitle";
import ContentWrapper from "@/utilities/ContentWrapper";
import TicketCardComponent from "../TicketCardComponent";
import BudapestMainLogo from "../BudapestMainLogo";

const TicketsSection = () => {
  return (
    <div>
      {/* Title Section */}
      <ContentWrapper className="pt-[80px]">
        <SectionMainTitle text="Tickets" color="#F7931A" />
      </ContentWrapper>

      {/* Banner Section */}
      <div className="mt-[32px] w-full bg-neutral-900">
        <MovingEarlyBirdTicketBanner />
      </div>

      {/* Space for Ticket Cards */}
      <ContentWrapper className="pt-[64px]">
        <div className="h-[1300px]">
          {/* Ticket Cards Section */}
          <TicketCardComponent />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default TicketsSection;
