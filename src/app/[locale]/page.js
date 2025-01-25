import HeroSection from "@/components/SinglePageComponents/HeroSection";
import SpeakersSection from "@/components/SinglePageComponents/SpeakersSection";
import TicketsSection from "@/components/SinglePageComponents/TicketsSection";
import Navbar from "@/components/Navbar";
import WhatToExpectSection from "@/components/SinglePageComponents/WhatToExpectSection";
import ThereIsMore from "@/components/SinglePageComponents/ThereIsMore";
import WhaleVenuePicturesSection from "@/components/SinglePageComponents/WhaleVenuePicturesSection";
import WhyPartnerWithUs from "@/components/SinglePageComponents/WhyPartnerWithUs";
import Footer from "@/components/SinglePageComponents/Footer";
import GallerySection from "@/components/SinglePageComponents/GallerySection";
import MidFooter from "@/components/SinglePageComponents/MidFooter";

export default async function Home({ params }) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />
      <SpeakersSection locale={locale} />
      {/*<MidFooter/>*/}
      <TicketsSection locale={locale} />
      <WhatToExpectSection locale={locale} />
      <ThereIsMore locale={locale} />
      <GallerySection locale={locale} />
      <WhaleVenuePicturesSection locale={locale} />
      <WhyPartnerWithUs locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
