"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions/orders";
import { validateCoupon } from "@/app/actions/coupon";
import { PaymentProvider } from "@prisma/client";
import PlusMinusBtn from "@/components/Buttons/PlusMinusBtn";
import TicketCardCheckout from "@/components/Tickets/TicketCardCheckout";
import Image from "next/image";
import ChevronDown from '../../../../public/chevron-down.svg';
import SecondaryCTAButton from "@/components/SecondaryCTAButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import {cln} from "@/utilities/classnames";
import SelectButton from "@/components/Buttons/SelectButton";
import Select from "react-select"
import countryList from "react-select-country-list";


export default function CheckoutPage({ tickets, locale }) {

  const countryOptions = countryList().getData();

  // STRAPI DATA
  const [ticketData, setTicketData] = useState([])
  const [heroSectionData, setHeroSectionData] = useState()
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)

  // WINDOW HEIGHT FOR SUMMARY WINDOW
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  // FORM DATA
  const [formData, setFormData] = useState({
    email:"",
    emailRepeat:"",
    firstName:"",
    lastName:"",
      postalCode:"",
      city:"",
      street:"",
      country:"",
  })

  // IF FORM INPUTS ARE VALID
  const [formValid, setFormValid] = useState({
    emailValid:true,
    emailRepeatValid:true,
    emailsMatch:true,
  })

  const [isCardPayment, setIsCardPayment] = useState(null);
   const [isMobile, setIsMobile] = useState(false);

  // Fetching Strapi data
  useEffect(() => {
    async function fetchData(locale){
      try{
        const [ticketRes, heroRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ticket-cards?locale=${locale}&sort=order`),
            fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hero-section?locale=${locale}`)
        ]);

        const [ticketData, heroData] = await Promise.all([
            ticketRes.json(),
            heroRes.json(),
        ])

        setTicketData(ticketData.data)
        setHeroSectionData(heroData.data)
      } catch (error){
        console.error("Error fetching ticket or hero section data for checkout: ", error)
      }
    }
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 560);
    }
    fetchData(locale)
  }, []);

  const router = useRouter();

  // ✅ Jegyek állapotának kezelése
  const [selectedTickets, setSelectedTickets] = useState(
    tickets.map((ticket) => ({ ...ticket, quantity: 0 }))
  );

  // EMAIL VALIDATION CHECK
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  useEffect(() => {
    const isEmailValid = emailPattern.test(formData.email);
    const isEmailRepeatValid = emailPattern.test(formData.emailRepeat);
    const doEmailsMatch = (formData.email === formData.emailRepeat) || formData.email.length === 0 || formData.emailRepeat.length === 0;

    setFormValid(prevState => ({
      ...prevState,
      emailValid: isEmailValid,
      emailRepeatValid: isEmailRepeatValid,
      emailsMatch: doEmailsMatch
    }));
  }, [formData.email, formData.emailRepeat]);


  // FORM FILL FUNCTION
  function handleChange(e){
    setFormData((prevData)=>{
     return {
       ...prevData,
       [e.target.name]:e.target.value
     }
    })
  }

    function handleCountryChange(selectedOption){
    setFormData((prevData)=>{
      return {
        ...prevData, country:selectedOption.value
      }
    })
  }

  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState(null);

  const handlePaymentRedirect = async (order) => {
    if (order.paymentProvider === PaymentProvider.BTCPAY) {
      router.push(`/payment/btcpay/${order.id}`);
    } else if (order.paymentProvider === PaymentProvider.STRIPE) {
      router.push(`/payment/stripe/${order.id}`);
    }
  };

  // ✅ Subtotal számítás (összes jegy ára)
  const subtotal = selectedTickets.reduce(
    (sum, ticket) => sum + ticket.price * ticket.quantity,
    0
  );

  // ✅ Kedvezmény levonása, ha van érvényes kupon
  const discountAmount = appliedCoupon?.discountValue
    ? appliedCoupon.discountType === "FIXED"
      ? appliedCoupon.discountValue
      : (subtotal * appliedCoupon.discountValue) / 100
    : 0;

  // ✅ Végső összeg (nem lehet negatív)
  const finalTotal = Math.max(subtotal - discountAmount, 0);

  // ✅ Jegyek mennyiségének módosítása (helyes frissítés)
  const handleQuantityChange = (ticketId, change) => {
    setSelectedTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, quantity: Math.max(0, ticket.quantity + change) }
          : ticket
      )
    );
  };

  // ✅ Kupon ellenőrzése és alkalmazása (server action)
  const handleApplyCoupon = async () => {
    setError(null);

    try {
      const couponData = await validateCoupon(coupon);
      if (!couponData || couponData.error) {
        throw new Error(couponData?.error || "Invalid coupon");
      }

      setAppliedCoupon(couponData);
    } catch (err) {
      setError(err.message);
      setAppliedCoupon(null);
    }
  };

  // ✅ Rendelés létrehozása
  const handleOrder = async (paymentProvider) => {
    setError(null);

    console.log("🎟 Applied Coupon before sending order:", appliedCoupon);

    try {
      const items = selectedTickets
        .filter((ticket) => ticket.quantity > 0)
        .map((ticket) => ({
          id: ticket.id,
          quantity: ticket.quantity,
        }));

      if (items.length === 0)
        throw new Error("Please select at least one ticket.");
      if (!email.trim()) throw new Error("Email is required.");

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format.");
      }

      // TODO: Ezt at irtam, jo igy is?
      const orderData = {
        email:formData.emailRepeat,
        items,
        paymentProvider,
        coupon: appliedCoupon ? appliedCoupon.code : null,
        discountInCents: discountAmount,
        finalAmountInCents: finalTotal,
      };

      console.log("🚀 Sending order data:", orderData);

      const order = await createOrder(orderData);

      if (!order || order.error) {
        throw new Error(order?.error || "Order creation failed.");
      }

      handlePaymentRedirect(order);
    } catch (err) {
      setError(err.message);
    }
  };

  const windowHeightPixel = `h-[${windowHeight}px]`

  return (
    <div className="flex flex-col sm:flex-row sm:gap-x-10 w-full pb-[64px] pt-[60px] sm:pt-[100px] sm:max-w-[880px] sm:mx-auto">
      <div className="flex flex-col mx-auto sm:w-[55%] p-4 sm:p-0 gap-y-6 bg-neutral-900">

      {/*TODO: A details most forditva van, mert forditva renderelodik ki a sorrend*/}
      {tickets.map((ticket, index) => (
        <div key={ticket.id} className="flex flex-col gap-y-4 items-end w-full">
          <TicketCardCheckout name={ticket.name} price={ticket.price} numberOfTickets={selectedTickets.find((t) => t.id === ticket.id)?.quantity} date={heroSectionData?.HeroSectionDate} details={ticketData[index]?.PassDescription}/>
          <div className="flex gap-2">
            <PlusMinusBtn isPlus={false} onClick={() => handleQuantityChange(ticket.id, -1)} isDisabled={selectedTickets.find((t) => t.id === ticket.id)?.quantity === 0}/>
            <PlusMinusBtn isPlus={true} onClick={() => handleQuantityChange(ticket.id, 1)}/>
          </div>
        </div>
      ))}

      {/* Fizetési lehetőségek */}
      {/*<div className="mt-6">*/}
      {/*  <h2 className="text-lg font-semibold">Select Payment Method</h2>*/}
      {/*  <div className="flex gap-4 mt-2">*/}
      {/*    <button*/}
      {/*      onClick={() => handleOrder(PaymentProvider.BTCPAY)}*/}
      {/*      className="bg-yellow-500 text-white px-4 py-2 rounded"*/}
      {/*    >*/}
      {/*      Pay with Bitcoin (BTCPay)*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*      onClick={() => handleOrder(PaymentProvider.STRIPE)}*/}
      {/*      className="bg-blue-500 text-white px-4 py-2 rounded"*/}
      {/*    >*/}
      {/*      Pay with Card (Stripe)*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>

      {/*SUMMARY BOTTOM SECTION*/}
      <div className={cln("flex fixed sm:relative flex-col bg-black w-full sm:w-[45%] gap-y-1 bottom-0 left-0 border-t-2 border-t-neutral-300 transition-all ease-in-out duration-300", isSummaryOpen ? `pb-[64px]` : 'pb-0')} style={{height: !isMobile ? 'auto' : isSummaryOpen ? windowHeight : 96, borderTopLeftRadius:20, borderTopRightRadius:20, overflow:'hidden', zIndex:isSummaryOpen ? 50 : 20}}>
        {/*TODO: PL-12 A COOKIES IKON MIATT, INKABB LEGYEN EGY PADDING BOTTOM HA NYITVA VAN, AMI PONT FOLOTTE VEGZODIK*/}
        <div className={cln("flex flex-col gap-y-1 pt-4 pr-4", isSummaryOpen ? 'pl-4' : 'pl-[48px] sm:pl-4')}>
              <div className="flex flex-row justify-between items-center w-full">
            {/*TODO: Strapi translation*/}
            <h2 className="font-exo text-[22px] font-bold tracking-[1px] text-primary-500" style={{lineHeight:'100%'}}>SUMMARY</h2>
            <button className="flex sm:hidden w-full justify-end py-2" onClick={()=>setIsSummaryOpen((prevState)=>!prevState)}>
              <Image src={ChevronDown} alt={'Chevron down icon'} width={21} height={16} style={{transform:isSummaryOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.2s ease-in-out'}}/>
            </button>

        </div>
           {/* Subtotal */}
        {/*TODO: PL-12 A COOKIES IKON MIATT*/}
        <div className="flex justify-between">
          <h3 className="text-[16px] font-exo font-semibold text-white">
          Total cost
        </h3>
          {/*TODO: Hozza adni a hezagos árakat*/}
          <h3 className="text-[20px] font-exo font-black text-white">
            {(subtotal - discountAmount) / 100} EUR
          </h3>
        </div>
        </div>


        {/*SCROLLING CONTAINER */}
        <div className="flex flex-col gap-y-4 overflow-y-scroll px-4 pb-4">
          {/* COUPON INPUT WITH APPLY AND ERROR MESSAGE */}
      <div className="mt-6">
        <div className="flex flex-col gap-y-1 relative">
          <div className="flex w-full gap-x-2">
            <input
                id="coupon"
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="peer border focus:border-2 flex items-center justify-center px-6 py-2 rounded-[44] border-neutral-300 focus:border-secondary-600 w-full bg-black placeholder:text-[14px] placeholder:text-neutral-300 text-white focus:outline-none"
            placeholder=" "
          />
            <label htmlFor="coupon" className="absolute w-fit h-fit text-[14px] font-exo font-normal text-neutral-300 top-[-14px] left-4 bg-black py-[2px] px-2 rounded-[6px] peer-placeholder-shown:translate-y-[26px] peer-focus:translate-y-0 transition-transform duration-200 ease-in-out">
            Enter coupon code
            </label>
          <SecondaryButton text={'APPLY'} onClick={handleApplyCoupon} style={{opacity: coupon.length > 0 ? 1 : 0.5}}/>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        {appliedCoupon && (
          <p className="text-green-600 mt-2">
            ✅ Coupon applied: {appliedCoupon.code} (-{discountAmount / 100}{" "}
            EUR)
          </p>
        )}
      </div>
        {/*  FORM FOR BUYING A TICKET AND GETTING AN INVOICE*/}
        <form className="flex flex-col gap-y-6 mt-4">
          <div className="relative">
           <input
               id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e)=>handleChange(e)}
            className={cln(formData.email.length === 0 ? 'border-neutral-300' : !formValid.emailValid || !formValid.emailsMatch ? "border-red-500" : "border-green-600", "peer border h-[50px] focus:border-2 flex items-center justify-center px-6 py-2 rounded-[44] focus:border-secondary-600 w-full bg-black placeholder:text-[14px] placeholder:text-neutral-300 text-white focus:outline-none")}
            autoComplete="email"
               placeholder=" "
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          />
            <label htmlFor={'email'} className="absolute w-fit h-fit text-[14px] font-exo font-normal text-neutral-300 top-[-14px] left-4 bg-black py-[2px] px-2 rounded-[6px] peer-placeholder-shown:translate-y-[26px] peer-focus:translate-y-0 transition-transform duration-200 ease-in-out">
              *Email address
            </label>
          </div>
          <div className="relative">
           <input
               id="emailRepeat"
            type="email"
            name="emailRepeat"
            value={formData.emailRepeat}
            onChange={(e)=>handleChange(e)}
            className={cln(formData.emailRepeat.length === 0 ? 'border-neutral-300' : !formValid.emailRepeatValid || !formValid.emailsMatch ? "border-red-500" : "border-green-600", "peer border h-[50px] focus:border-2 flex items-center justify-center px-6 py-2 rounded-[44] border-neutral-300 focus:border-secondary-600 w-full bg-black placeholder:text-[14px] placeholder:text-neutral-300 text-white focus:outline-none")}
            autoComplete="email"
            required
               placeholder=" "
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          />
            <label htmlFor={'emailRepeat'} className="absolute w-fit h-fit text-[14px] font-exo font-normal text-neutral-300 top-[-14px] left-4 bg-black py-[2px] px-2 rounded-[6px] peer-placeholder-shown:translate-y-[26px] peer-focus:translate-y-0 transition-transform duration-200 ease-in-out">
              *Email address again
            </label>

            {!formValid.emailsMatch && <span className="relative left-4 text-[12px] text-red-500">
            Emails don't match
            </span>}
          </div>
          <div className="flex-row flex gap-x-4">
            <SelectButton isCardPayment={true} isSelected={isCardPayment === true} onClick={()=>setIsCardPayment(true)}>
              Paying with HUF
            </SelectButton>
            <SelectButton  isSelected={isCardPayment === false} onClick={()=>setIsCardPayment(false)}>
              Paying with Bitcoin
            </SelectButton>
          </div>
          {isCardPayment &&
              <>
                <div className="relative">
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange(e)}
                    className={cln(formData.firstName.length === 0 ? 'border-neutral-300' : "border-green-600", "peer border h-[50px] focus:border-2 flex items-center justify-center px-6 py-2 rounded-[44] focus:border-secondary-600 w-full bg-black placeholder:text-[14px] placeholder:text-neutral-300 text-white focus:outline-none")}
                    required
                    placeholder=" "
                />
                <label htmlFor={'firstName'}
                       className="absolute w-fit h-fit text-[14px] font-exo font-normal text-neutral-300 top-[-14px] left-4 bg-black py-[2px] px-2 rounded-[6px] peer-placeholder-shown:translate-y-[26px] peer-focus:translate-y-0 transition-transform duration-200 ease-in-out">
                  *First Name
                </label>
                </div>
                <div className="relative">
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange(e)}
                    className={cln(formData.lastName.length === 0 ? 'border-neutral-300' : "border-green-600", "peer border h-[50px] focus:border-2 flex items-center justify-center px-6 py-2 rounded-[44] focus:border-secondary-600 w-full bg-black placeholder:text-[14px] placeholder:text-neutral-300 text-white focus:outline-none")}
                    required
                    placeholder=" "
                  />
                  <label htmlFor={'lastName'}
                         className="absolute w-fit h-fit text-[14px] font-exo font-normal text-neutral-300 top-[-14px] left-4 bg-black py-[2px] px-2 rounded-[6px] peer-placeholder-shown:translate-y-[26px] peer-focus:translate-y-0 transition-transform duration-200 ease-in-out">
                    *Last Name
                  </label>
                </div>
                <div className="relative">
                <input
                    id="postalCode"
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleChange(e)}
                    className={cln(formData.postalCode.length === 0 ? 'border-neutral-300' : "border-green-600", "peer border h-[50px] focus:border-2 flex items-center justify-center px-6 py-2 rounded-[44] focus:border-secondary-600 w-full bg-black placeholder:text-[14px] placeholder:text-neutral-300 text-white focus:outline-none")}
                    required
                    placeholder=" "
                />
                <label htmlFor={'postalCode'}
                       className="absolute w-fit h-fit text-[14px] font-exo font-normal text-neutral-300 top-[-14px] left-4 bg-black py-[2px] px-2 rounded-[6px] peer-placeholder-shown:translate-y-[26px] peer-focus:translate-y-0 transition-transform duration-200 ease-in-out">
                  *Postal code
                </label>
              </div>
              <div className="relative">
                <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleChange(e)}
                    className={cln(formData.postalCode.length === 0 ? 'border-neutral-300' : "border-green-600", "peer border h-[50px] focus:border-2 flex items-center justify-center px-6 py-2 rounded-[44] focus:border-secondary-600 w-full bg-black placeholder:text-[14px] placeholder:text-neutral-300 text-white focus:outline-none")}
                    required
                    placeholder=" "
                />
                <label htmlFor={'city'}
                       className="absolute w-fit h-fit text-[14px] font-exo font-normal text-neutral-300 top-[-14px] left-4 bg-black py-[2px] px-2 rounded-[6px] peer-placeholder-shown:translate-y-[26px] peer-focus:translate-y-0 transition-transform duration-200 ease-in-out">
                  *City
                </label>
              </div>
                <div className="relative">
                <input
                    id="street"
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={(e) => handleChange(e)}
                    className={cln(formData.postalCode.length === 0 ? 'border-neutral-300' : "border-green-600", "peer border h-[50px] focus:border-2 flex items-center justify-center px-6 py-2 rounded-[44] focus:border-secondary-600 w-full bg-black placeholder:text-[14px] placeholder:text-neutral-300 text-white focus:outline-none")}
                    required
                    placeholder=" "
                />
                <label htmlFor={'street'}
                       className="absolute w-fit h-fit text-[14px] font-exo font-normal text-neutral-300 top-[-14px] left-4 bg-black py-[2px] px-2 rounded-[6px] peer-placeholder-shown:translate-y-[26px] peer-focus:translate-y-0 transition-transform duration-200 ease-in-out">
                  *Street
                </label>
              </div>
              </>
          }

        </form>

        </div>

      </div>
    </div>

  );
}
