import React from "react";
import Partner from "@/components/Partners/Partner";
import Image from "next/image";
import BtcPayLogo from "../../../public/logos/btc_pay_logo.svg";
import BitvocationLogo from "../../../public/logos/bitvocation_logo.png";
import CryptokenLogo from "../../../public/logos/cryptoken_logo.png";
import BrandPrLogo from "../../../public/logos/brandpr_logo.svg";
import CryptoBrowserLogo from "../../../public/logos/crypto_browser_logo.svg";
import ListingHelp from '../../../public/logos/listing_help_logo.svg';
import BitPolitoLogo from '../../../public/logos/bitpolito_logo.svg';


const PartnersAndSponsors = ({title}) => {
  return (
      <div className="flex flex-col items-center gap-y-2">
            <h4 className="font-exo text-center text-[26px] text-neutral-300 font-semibold"
                style={{
                  letterSpacing: '5%',
                  lineHeight: '130%'
                }}>
                {title}
            </h4>
            <div className="flex flex-row gap-y-2 gap-x-4 sm:gap-x-10 flex-wrap justify-center">
              <Partner href={'https://btcpayserver.org/'}>
                <Image src={BtcPayLogo} widt={100} height={43} alt="Btc pay server logo"/>
              </Partner>
              <Partner href={'https://bitvocation.substack.com/'}>
                <Image src={BitvocationLogo} widt={148} height={36} alt="Bitvocation logo"/>
              </Partner>
                <Partner href={'https://bitpolito.it/en'}>
                <Image style={{ marginTop:4 }} src={BitPolitoLogo} widt={137} height={24} alt="BitPolito logo"/>
              </Partner>
              <Partner href={'https://cryptoken.media/'}>
                <Image src={CryptokenLogo} widt={138} height={50} alt="Cryptoken media logo"/>
              </Partner>
              <Partner href={'https://brandpr.io/'}>
                <Image src={BrandPrLogo} widt={126} height={36} alt="Brandpr logo"/>
              </Partner>
              <Partner href={'https://cryptobrowser.io/'}>
                <Image style={{ marginTop:4 }} src={CryptoBrowserLogo} widt={160} height={18} alt="CryptoBrowser logo"/>
              </Partner>
                <Partner href={'https://listing.help/'}>
                <Image src={ListingHelp} widt={160} height={38} alt="Listing Help logo"/>
              </Partner>

            </div>
          </div>
  );
};

export default PartnersAndSponsors;
