import HeroSection from "@/components/SinglePageComponents/HeroSection";
import SpeakersSection from "@/components/SinglePageComponents/SpeakersSection";
import TicketsSection from "@/components/SinglePageComponents/TicketsSection";
import Navbar from "@/components/Navbar";
import WhatToExpectSection from "@/components/SinglePageComponents/WhatToExpectSection";
import ThereIsMore from "@/components/SinglePageComponents/ThereIsMore";
import WhaleVenuePicturesSection from "@/components/SinglePageComponents/WhaleVenuePicturesSection";
import WhyPartnerWithUs from "@/components/SinglePageComponents/WhyPartnerWithUs";
import Footer from "@/components/SinglePageComponents/Footer";

export default async function Home({ params }) {
  const { locale } = params;
  console.log(locale);
  return (
    <>
      <Navbar locale={locale} />
      <HeroSection locale={locale} />
      <SpeakersSection locale={locale} />
      <TicketsSection locale={locale} />
      <WhatToExpectSection />
      <ThereIsMore />
      <WhaleVenuePicturesSection />
      <WhyPartnerWithUs />
      <Footer />
    </>
  );
}
