'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentProvider } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from 'postcss';
import { any } from 'zod';
import ChevronDown from '../../../../public/chevron-down.svg';
import { createOrder } from '@/app/actions/orders';
import { validateCoupon } from '@/app/actions/coupon';
import PlusMinusBtn from '@/components/Buttons/PlusMinusBtn';
import TicketCardCheckout from '@/components/Tickets/TicketCardCheckout';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import { cln } from '@/utilities/classnames';
import SelectButton from '@/components/Buttons/SelectButton';
import PayButton from '@/components/Buttons/PayButton';
import InputLabel from '@/components/Checkout/InputLabel';

export default function CheckoutPage({ tickets, locale }) {
  // STRAPI DATA
  // TODO: Nemkene mindenhova empty statebe default?
  const [ticketData, setTicketData] = useState([]);
  const [heroSectionData, setHeroSectionData] = useState();
  const [comingSoonData, setComingSoonData] = useState();
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // WINDOW HEIGHT FOR SUMMARY WINDOW
  const [windowHeight, setWindowHeight] = useState(400);

  // FORM DATA
  const [formData, setFormData] = useState(function () {
    return (
      JSON.parse(localStorage.getItem('formData')) || {
        email: '',
        emailRepeat: '',
        firstName: '',
        lastName: '',
        postalCode: '',
        city: '',
        street: '',
        country: '',
        termsAccepted: false,
        marketingAccepted: false,
      }
    );
  });

  const [invoiceData, setInvoiceData] = useState(function () {
    return (
      JSON.parse(localStorage.getItem('invoiceData')) || {
        invoiceType: '',
        invoiceName: '',
        invoiceCountry: '',
        invoicePostalCode: '',
        invoiceCity: '',
        invoiceStreet: '',
        vat: '',
        euVat: '',
      }
    );
  });

  function clearForm() {
    setFormData({
      email: '',
      emailRepeat: '',
      firstName: '',
      lastName: '',
      postalCode: '',
      city: '',
      street: '',
      country: '',
      termsAccepted: false,
      marketingAccepted: false,
    });
  }

  function clearInvoiceForm() {
    setInvoiceData({
      invoiceType: '',
      invoiceName: '',
      invoiceCountry: '',
      invoicePostalCode: '',
      invoiceCity: '',
      invoiceStreet: '',
      vat: '',
      euVat: '',
    });
  }

  const [isCardPayment, setIsCardPayment] = useState(null);
  const [needsInvoice, setNeedsInvoice] = useState(false);
  const [billingMatchesData, setBillingMatchesData] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [anyTicketsAdded, setAnyTicketsAddded] = useState(false);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  }, [invoiceData]);

  useEffect(() => {
    if (billingMatchesData) {
      setInvoiceData((prev) => {
        return {
          ...prev,
          invoiceName: `${formData.firstName} ${formData.lastName}`,
          invoicePostalCode: formData.postalCode,
          invoiceCity: formData.city,
          invoiceStreet: formData.street,
          invoiceCountry: formData.country,
        };
      });
    }
  }, [billingMatchesData]);

  // IF FORM INPUTS ARE VALID
  const [formValid, setFormValid] = useState({
    emailValid: null,
    emailRepeatValid: null,
    emailsMatch: null,
  });

  const isFormFilled = Object.values(formData).every((value) => value);
  const isInvoiceFormFilled =
    Object.entries(invoiceData).every(([key, value]) => {
      if (key === 'vat' || key === 'euVat') return true; // Skip for now
      return Boolean(value); // Check all other fields are filled
    }) &&
    (invoiceData.invoiceType !== 'company' || invoiceData.vat || invoiceData.euVat);

  const areFormsFilled = needsInvoice ? isFormFilled && isInvoiceFormFilled : isFormFilled;

  const areEmailsValid =
    formValid.emailValid && formValid.emailRepeatValid && formValid.emailsMatch;

  const canSubmit = isCardPayment
    ? areFormsFilled && areEmailsValid && anyTicketsAdded
    : areEmailsValid && formData.termsAccepted && formData.marketingAccepted && anyTicketsAdded;

  // Fetching Strapi data
  useEffect(() => {
    async function fetchData(locale) {
      try {
        const [ticketRes, heroRes, comingSoonRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ticket-cards?locale=${locale}&sort=order`,
          ),
          fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/hero-section?locale=${locale}`),
          fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/coming-soon-form?locale=${locale}`),
        ]);

        const [ticketData, heroData, comingSoonData] = await Promise.all([
          ticketRes.json(),
          heroRes.json(),
          comingSoonRes.json(),
        ]);

        setTicketData(ticketData.data);
        setHeroSectionData(heroData.data);
        setComingSoonData(comingSoonData.data);
      } catch (error) {
        console.error('Error fetching ticket or hero section data for checkout: ', error);
      }
    }
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 560);
      setWindowHeight(window.innerHeight);
    }
    fetchData(locale);
  }, []);

  const router = useRouter();

  // ✅ Jegyek állapotának kezelése
  const [selectedTickets, setSelectedTickets] = useState(function () {
    // Elmentett ticketek
    const storedTickets = JSON.parse(localStorage.getItem('selectedTickets')) || [];

    // Backendes ticketeken vegig megyunk
    //Megnezzuk hogy storedTicket id meg ticket id egyezik e
    //Ha egyezik akkor masoljuk a backendes ticketet, es at irjuk a quantityt a storedos quantityre
    //Ha nincs, akkor backendes ticket es quantity 0
    return tickets.map((ticket) => {
      const storedTicket = storedTickets.find((stored) => stored.id === ticket.id);
      return storedTicket
        ? { ...ticket, quantity: storedTicket.quantity }
        : { ...ticket, quantity: 0 };
    });
  });

  // When selectedTickets change, we save the quantity and id from the selected ticket to local storage
  useEffect(() => {
    const filteredTickets = selectedTickets.map(({ id, quantity }) => ({ id, quantity }));
    localStorage.setItem('selectedTickets', JSON.stringify(filteredTickets));

    setAnyTicketsAddded(
      selectedTickets?.some((ticket) => {
        return ticket.quantity > 0;
      }),
    );
  }, [selectedTickets]);

  // EMAIL VALIDATION CHECK
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  useEffect(() => {
    const isEmailValid = emailPattern.test(formData.email);
    const isEmailRepeatValid = emailPattern.test(formData.emailRepeat);
    const doEmailsMatch =
      formData.email === formData.emailRepeat ||
      formData.email.length === 0 ||
      formData.emailRepeat.length === 0;

    setFormValid((prevState) => ({
      ...prevState,
      emailValid: isEmailValid,
      emailRepeatValid: isEmailRepeatValid,
      emailsMatch: doEmailsMatch,
    }));
  }, [formData.email, formData.emailRepeat]);

  // FORM FILL FUNCTION
  function handleChange(e) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      };
    });
  }

  // INVOICE FORM FILL FUNCTION
  function handleInvoiceChange(e) {
    setInvoiceData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  }

  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState(null);
  const [generalError, setGeneralError] = useState(null);

  const totalQuantity = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

  const handlePaymentRedirect = async (order) => {
    if (order.paymentProvider === PaymentProvider.BTCPAY) {
      router.push(`/payment/btcpay/${order.id}`);
    } else if (order.paymentProvider === PaymentProvider.STRIPE) {
      router.push(`/payment/stripe/${order.id}`);
    }
  };

  // ✅ Subtotal számítás (összes jegy ára)
  const subtotal = selectedTickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0);

  // ✅ Kedvezmény levonása, ha van érvényes kupon
  const discountAmount = appliedCoupon?.discountValue
    ? appliedCoupon.discountType === 'FIXED'
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
          : ticket,
      ),
    );
  };

  // ✅ Kupon ellenőrzése és alkalmazása (server action)
  const handleApplyCoupon = async () => {
    setCouponError(null);

    try {
      const couponData = await validateCoupon(coupon, selectedTickets);
      if (!couponData || couponData.error) {
        throw new Error(couponData?.error || 'Invalid coupon');
      }

      setAppliedCoupon(couponData);
    } catch (err) {
      setCouponError(err.message);
      setAppliedCoupon(null);
    }
  };

  // ✅ Rendelés létrehozása
  const handleOrder = async (paymentProvider) => {
    setGeneralError(null);

    console.log('🎟 Applied Coupon before sending order:', appliedCoupon);

    try {
      const items = selectedTickets
        .filter((ticket) => ticket.quantity > 0)
        .map((ticket) => ({
          id: ticket.id,
          quantity: ticket.quantity,
        }));

      if (items.length === 0) throw new Error('Please select at least one ticket.');

      // TODO: Ezt at irtam, jo igy is?
      const orderData = {
        email: formData.emailRepeat,
        items,
        paymentProvider,
        coupon: appliedCoupon ? appliedCoupon.code : null,
        discountInCents: discountAmount,
        finalAmountInCents: finalTotal,
      };

      console.log('🚀 Sending order data:', orderData);

      const order = await createOrder(orderData);

      if (!order || order.error) {
        throw new Error(order?.error || 'Order creation failed.');
      }

      handlePaymentRedirect(order);
    } catch (err) {
      setGeneralError(err.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:gap-x-10 w-full pb-[64px] pt-[60px] sm:pt-[120px] sm:max-w-[1128px] sm:px-[40px] sm:mx-auto">
      <div className="flex flex-col mx-auto sm:w-[40%] p-4 sm:p-0 gap-y-6 bg-neutral-900">
        {/*TODO: A details most forditva van, mert forditva renderelodik ki a sorrend*/}
        {tickets.map((ticket, index) => (
          <div key={ticket.id} className="flex flex-col gap-y-4 items-end w-full">
            <TicketCardCheckout
              name={ticket.name}
              price={ticket.price}
              numberOfTickets={selectedTickets.find((t) => t.id === ticket.id)?.quantity}
              date={heroSectionData?.HeroSectionDate}
              details={ticketData[index]?.PassDescription}
            />
            <div className="flex gap-2">
              <PlusMinusBtn
                isPlus={false}
                onClick={() => handleQuantityChange(ticket.id, -1)}
                isDisabled={selectedTickets.find((t) => t.id === ticket.id)?.quantity === 0}
              />
              <PlusMinusBtn isPlus={true} onClick={() => handleQuantityChange(ticket.id, 1)} />
            </div>
          </div>
        ))}
      </div>

      {/*SUMMARY BOTTOM SECTION, BLACK WINDOW*/}
      <div
        className={cln(
          'flex fixed sm:relative flex-col bg-black w-full sm:w-[50%] sm:min-w-[580px] gap-y-1 bottom-0 left-0 border-t-2 border-t-neutral-300 transition-all ease-in-out duration-300',
          isSummaryOpen ? `pb-[64px]` : 'pb-0',
        )}
        style={{
          height: !isMobile ? 'auto' : isSummaryOpen ? windowHeight : 96,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: !isMobile && 20,
          borderBottomLeftRadius: !isMobile && 20,
          overflow: 'hidden',
          zIndex: isSummaryOpen ? 50 : 20,
        }}
      >
        {/* Subtotal */}
        {/*TODO: PL-12 A COOKIES IKON MIATT, INKABB LEGYEN EGY PADDING BOTTOM HA NYITVA VAN, AMI PONT FOLOTTE VEGZODIK*/}
        <div
          className={cln(
            'flex flex-col gap-y-1 pt-4 pr-4',
            isSummaryOpen ? 'pl-4' : 'pl-[48px] sm:pl-4',
          )}
        >
          <div className="flex flex-row justify-between items-center w-full">
            {/*TODO: Strapi translation*/}
            <h2
              className="font-exo text-[22px] font-bold tracking-[1px] text-primary-500"
              style={{ lineHeight: '100%' }}
            >
              SUMMARY
            </h2>
            <button
              className="flex sm:hidden w-full justify-end py-2"
              onClick={() => setIsSummaryOpen((prevState) => !prevState)}
            >
              <Image
                src={ChevronDown}
                alt={'Chevron down icon'}
                width={21}
                height={16}
                style={{
                  transform: isSummaryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out',
                }}
              />
            </button>
          </div>
          {/* Subtotal */}
          {/*TODO: PL-12 A COOKIES IKON MIATT*/}
          <div className="flex justify-between">
            <h3 className="text-[16px] font-exo font-semibold text-white">Total cost</h3>

            {/*TODO: Hozza adni a hezagos árakat*/}
            <h3 className="text-[20px] font-exo font-black text-white">
              {(subtotal - discountAmount) / 100} EUR
            </h3>
          </div>
          {generalError && (
            <p className="font-exo font-medium text-[14px] text-red-500">{generalError}</p>
          )}
        </div>

        {/*SCROLLING CONTAINER */}
        <div className="flex flex-col gap-y-4 overflow-y-scroll sm:h-[600px] sm:overflow-y-auto px-4 pb-4">
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
                <label
                  htmlFor="coupon"
                  className="absolute w-fit h-fit text-[14px] font-exo font-normal text-neutral-300 top-[-14px] left-4 bg-black py-[2px] px-2 rounded-[6px] peer-placeholder-shown:translate-y-[26px] peer-focus:translate-y-0 transition-transform duration-200 ease-in-out"
                >
                  Enter coupon code
                </label>
                <SecondaryButton
                  text={'APPLY'}
                  onClick={handleApplyCoupon}
                  style={{ opacity: coupon.length > 0 ? 1 : 0.5 }}
                  disabled={coupon.length === 0}
                />
              </div>
              {couponError && coupon.length > 0 && (
                <span className="relative left-4 text-[12px] text-red-500">{couponError}</span>
              )}
            </div>
            {appliedCoupon && (
              <p className="text-green-600 mt-2">
                ✅ Coupon applied: {appliedCoupon.code} (-{discountAmount / 100} EUR)
              </p>
            )}
          </div>
          {/*  FORM FOR BUYING A TICKET AND GETTING AN INVOICE*/}
          <form className="flex flex-row flex-wrap gap-x-4 gap-y-6 mt-4">
            <div className="flex flex-col gap-y-2 flex-wrap">
              <h4
                className="ml-2 mb-3 text-[14px] font-exo text-white"
                style={{ lineHeight: '130%' }}
              >
                Make sure you enter your email address correctly, this is where we will send you the
                ticket:
              </h4>
              <div className="flex flex-col sm:flex-row w-full justify-between gap-y-4">
                <InputLabel
                  name={'email'}
                  dataSource={formData}
                  onChange={handleChange}
                  formValid={formValid}
                  type={'email'}
                >
                  Email address
                </InputLabel>
                <InputLabel
                  name={'emailRepeat'}
                  dataSource={formData}
                  onChange={handleChange}
                  formValid={formValid}
                  type={'email'}
                >
                  Email address again
                </InputLabel>
              </div>
              {!formValid.emailsMatch && (
                <span className="relative left-4 text-[12px] text-red-500">Emails don't match</span>
              )}
            </div>
            {/*SELECT PAYMENT METHOD*/}
            <div className="flex-col flex mx-auto gap-y-4">
              <h4
                className="text-[14px] text-center font-exo text-white"
                style={{ lineHeight: '130%' }}
              >
                Select a payment method:
              </h4>
              <div className="flex gap-x-4 mx-auto">
                <SelectButton
                  isCardPayment={true}
                  isSelected={isCardPayment === true}
                  onClick={() => setIsCardPayment(true)}
                >
                  CARD
                </SelectButton>
                <SelectButton
                  isSelected={isCardPayment === false}
                  onClick={() => setIsCardPayment(false)}
                >
                  BITCOIN
                </SelectButton>
              </div>
            </div>
            {isCardPayment && (
              // TODO: Maybe just map through some data source?
              <>
                <InputLabel
                  name={'firstName'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  First Name
                </InputLabel>
                <InputLabel
                  name={'lastName'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  Last name
                </InputLabel>
                <InputLabel
                  name={'country'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  Country
                </InputLabel>
                <InputLabel
                  name={'postalCode'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  Postal Code
                </InputLabel>
                <InputLabel
                  name={'city'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  City
                </InputLabel>
                <InputLabel
                  name={'street'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  Street
                </InputLabel>
                <div className="flex w-full gap-y-2 flex-col">
                  <div className="flex w-full items-start gap-[10px] mt-2 sm:mt-0 py-[4px] pl-[12px] pr-0">
                    <input
                      id={'needsInvoice'}
                      type="checkbox"
                      name="needsInvoice"
                      checked={needsInvoice}
                      onChange={(e) => setNeedsInvoice(e.target.checked)}
                      className="max-w-[18px] max-h-[18px] mt-1"
                    />
                    <label
                      className="text-neutral-300 font-exo text-[14px] pb-2 sm:pb-0 font-medium leading-normal"
                      htmlFor={'needsInvoice'}
                    >
                      I need an invoice
                    </label>
                  </div>
                  <div className="flex w-full items-start gap-[10px] sm:mt-0 py-[4px] pl-[12px] pr-0">
                    <input
                      id={'billingMatchesData'}
                      type="checkbox"
                      name="billingMatchesData"
                      checked={billingMatchesData}
                      onChange={(e) => setBillingMatchesData(e.target.checked)}
                      className="max-w-[18px] max-h-[18px] mt-1"
                    />
                    <label
                      className="text-neutral-300 font-exo text-[14px] pb-2 sm:pb-0 font-medium leading-normal"
                      htmlFor={'billingMatchesData'}
                    >
                      Billing matches data above
                    </label>
                  </div>
                </div>
                {needsInvoice === true && (
                  <>
                    <div className="flex flex-col gap-y-2 w-[calc(35%-8px)]">
                      <label className="text-neutral-300 font-exo text-[14px] pl-2 pb-2 sm:pb-0 font-medium leading-normal">
                        <span className="text-red-500 text-[16px] font-exo font-bold">* </span>I
                        need the invoice for:
                      </label>
                      <select
                        value={invoiceData.invoiceType}
                        name={'invoiceType'}
                        onChange={handleInvoiceChange}
                        className={cln(
                          invoiceData.invoiceType.length > 0
                            ? 'border-green-600'
                            : 'border-neutral-300',
                          'peer appearance-none border h-[50px] focus:border-2 flex items-center justify-center px-6 py-2 rounded-[44] focus:border-secondary-600 w-full bg-black placeholder:text-[14px] placeholder:text-neutral-300 text-white focus:outline-none',
                        )}
                      >
                        <option value="">Select...</option>
                        <option value="person">Person</option>
                        <option value="company">Company</option>
                      </select>
                    </div>
                    <InputLabel
                      name={'invoiceName'}
                      dataSource={invoiceData}
                      onChange={handleInvoiceChange}
                      widthClass={'sm:w-[calc(65%-8px)] mt-7'}
                    >
                      Name
                    </InputLabel>
                    <InputLabel
                      name={'invoiceCountry'}
                      dataSource={invoiceData}
                      onChange={handleInvoiceChange}
                    >
                      Country
                    </InputLabel>
                    <InputLabel
                      name={'invoicePostalCode'}
                      dataSource={invoiceData}
                      onChange={handleInvoiceChange}
                    >
                      Postal code
                    </InputLabel>
                    <InputLabel
                      name={'invoiceCity'}
                      dataSource={invoiceData}
                      onChange={handleInvoiceChange}
                    >
                      City
                    </InputLabel>
                    <InputLabel
                      name={'invoiceStreet'}
                      dataSource={invoiceData}
                      onChange={handleInvoiceChange}
                    >
                      Street
                    </InputLabel>
                    {invoiceData.invoiceType === 'company' && (
                      <>
                        <h4
                          className="ml-2 mt-3 text-[14px] font-exo text-white"
                          style={{ lineHeight: '130%' }}
                        >
                          Fill out at least one of the VAT numbers
                        </h4>
                        <div className="flex sm:flex-row w-full justify-between">
                          <InputLabel
                            name={'vat'}
                            dataSource={invoiceData}
                            onChange={handleInvoiceChange}
                          >
                            Vat
                          </InputLabel>
                          <InputLabel
                            name={'euVat'}
                            dataSource={invoiceData}
                            onChange={handleInvoiceChange}
                          >
                            EU Vat
                          </InputLabel>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
            <div className="flex flex-col gap-y-2">
              <div className="flex items-start gap-[10px] mt-2 sm:mt-0 py-[4px] pl-[12px] pr-0">
                <input
                  id={'termsAccepted'}
                  name="termsAccepted" // Ensure the name matches formData key
                  type="checkbox"
                  required
                  checked={formData.termsAccepted} // Properly bind the checkbox state
                  onChange={handleChange} // Use the updated handleChange
                  className="max-w-[18px] max-h-[18px] mt-1"
                />
                <label
                  className="text-neutral-300 font-exo text-[14px] pb-2 sm:pb-0 font-medium leading-normal"
                  htmlFor={'termsAccepted'}
                >
                  *{comingSoonData?.AcceptConditionsFirstText}{' '}
                  <Link href={`/${locale}/terms-and-conditions`}>
                    <span className="text-neutral-300 font-exo text-[14px] font-medium leading-normal underline">
                      {comingSoonData?.AcceptConditionsSecondText}
                    </span>
                  </Link>
                </label>
              </div>
              <div className="flex items-start gap-[10px] mt-2 sm:mt-0 py-[4px] pl-[12px] pr-0">
                <input
                  id={'marketingAccepted'}
                  name={'marketingAccepted'}
                  type="checkbox"
                  required
                  checked={formData.marketingAccepted}
                  onChange={handleChange}
                  className="max-w-[18px] max-h-[18px] mt-1"
                />
                <label
                  className="text-neutral-300 font-exo text-[14px] pb-2 sm:pb-0 font-medium leading-normal"
                  htmlFor={'marketingAccepted'}
                >
                  *{comingSoonData?.NewsletterAcceptCheckboxText}
                </label>
              </div>
            </div>
          </form>
          {isCardPayment !== null && (
            <div className="flex w-full items-center justify-center mt-2">
              <PayButton
                text={isCardPayment ? 'Pay with card' : 'Pay with Bitcoin'}
                onClick={() => {
                  isCardPayment
                    ? handleOrder(PaymentProvider.STRIPE)
                    : handleOrder(PaymentProvider.BTCPAY);
                }}
                isCardPayment={isCardPayment}
                disabled={!canSubmit}
              />
            </div>
          )}
          {/*TODO: Jobban kinezo clearbutton, mobilon is ne legyen eldugva*/}
          <button
            className="text-red-600 bg-black px-3 py-2 underline-offset-4 underline absolute left-4 bottom-4"
            onClick={() => {
              clearForm();
              needsInvoice && clearInvoiceForm();
            }}
          >
            Clear form
          </button>
        </div>
      </div>
    </div>
  );
}
