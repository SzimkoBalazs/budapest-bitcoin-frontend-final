'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentProvider } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import ChevronDown from '../../../../public/chevron-down.svg';
import { priceWithSpace } from '../../../../utils/priceWithSpace';
import { createOrder } from '@/app/actions/orders';
import { validateCoupon } from '@/app/actions/coupon';
import PlusMinusBtn from '@/components/Buttons/PlusMinusBtn';
import TicketCardCheckout from '@/components/Tickets/TicketCardCheckout';
import SecondaryButton from '@/components/Buttons/SecondaryButton';
import { cln } from '@/utilities/classnames';
import SelectButton from '@/components/Buttons/SelectButton';
import PayButton from '@/components/Buttons/PayButton';
import InputLabel from '@/components/Checkout/InputLabel';

export default function CheckoutPage({
  tickets,
  locale,
  checkoutPageData,
  cardPaymentFormData,
  ticketData,
  comingSoonData,
}) {
  // STRAPI DATA
  // TODO: Nemkene mindenhova empty statebe default?
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

  const isFormFilled = Object.entries(formData)
    .filter(([key]) => key !== 'marketingAccepted') // Exclude marketingAccepted
    .every(([, value]) => value);

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
    : areEmailsValid && formData.termsAccepted && anyTicketsAdded;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 560);
      setWindowHeight(window.innerHeight);
    }
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
    <div className="flex flex-col lg:flex-row sm:gap-x-10 w-full pb-[64px] sm:pb-[24px] pt-[60px] sm:pt-[120px] sm:max-w-[1128px] sm:px-[40px] sm:mx-auto">
      <div className="flex flex-col mx-auto w-full max-w-[400px] sm:w-[40%] p-4 sm:p-0 gap-y-6 bg-neutral-900">
        {tickets.map((ticket, index) => (
          <div key={ticket.id} className="flex flex-col gap-y-4 items-end w-full">
            <TicketCardCheckout
              name={ticket.name}
              price={ticket.price}
              numberOfTickets={selectedTickets.find((t) => t.id === ticket.id)?.quantity}
              date={checkoutPageData.conferenceDate}
              details={ticketData[index]?.PassDescription}
              locale={locale}
              beforePrice={ticketData[index]?.OldPrice}
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
          'flex fixed sm:relative flex-col bg-black w-full mx-auto sm:w-[50%] sm:min-w-[580px] gap-y-1 bottom-0 left-0 border-t-2 border-t-neutral-300 transition-all ease-in-out duration-300',
          isSummaryOpen ? `pb-[0px]` : 'pb-0',
        )}
        style={{
          height: !isMobile ? 'auto' : isSummaryOpen ? 'auto' : 96,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: !isMobile && 20,
          borderBottomLeftRadius: !isMobile && 20,
          overflow: 'hidden',
          zIndex: isSummaryOpen ? 50 : 20,
          maxHeight: '100vh',
        }}
      >
        {/* Subtotal */}
        <div
          className={cln(
            'flex flex-col gap-y-1 pt-4 pr-4',
            isSummaryOpen ? 'pl-4' : 'pl-[20%] sm:pl-4',
          )}
        >
          <div className="flex flex-row justify-between items-center w-full">
            <h2
              className="font-exo text-[22px] font-bold tracking-[1px] text-primary-500"
              style={{ lineHeight: '100%' }}
            >
              {checkoutPageData.title}
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
          <div className="flex justify-between">
            <h3 className="text-[16px] font-exo font-semibold text-white">
              {checkoutPageData.totalCost}
            </h3>

            {/*TODO: Ha forint akkor talan false lesz hogy ossza e el 100al*/}
            <h3 className="text-[20px] font-exo font-black text-white">
              {priceWithSpace(subtotal - discountAmount)} {locale === 'hu' ? 'HUF' : 'EUR'}
            </h3>
          </div>
          {generalError && (
            <p className="font-exo font-medium text-[14px] text-red-500">{generalError}</p>
          )}
        </div>

        {/*SCROLLING CONTAINER */}
        <div
          className="flex flex-col gap-y-4 overflow-y-scroll sm:h-[600px] sm:overflow-y-auto px-4 pb-4"
          style={{ marginTop: 'auto' }}
        >
          {/*  TODO: Coupont le tesztelni*/}
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
                  {checkoutPageData.couponCode}
                </label>
                <SecondaryButton
                  text={checkoutPageData.applyCouponCode}
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
                {checkoutPageData.emailExplanation}
              </h4>
              <div className="flex flex-col sm:flex-row w-full justify-between gap-y-4">
                <InputLabel
                  name={'email'}
                  dataSource={formData}
                  onChange={handleChange}
                  formValid={formValid}
                  type={'email'}
                >
                  {checkoutPageData.emailPlaceholder}
                </InputLabel>
                <InputLabel
                  name={'emailRepeat'}
                  dataSource={formData}
                  onChange={handleChange}
                  formValid={formValid}
                  type={'email'}
                >
                  {checkoutPageData.emailAgainPlaceholder}
                </InputLabel>
              </div>
              {!formValid.emailsMatch && (
                <span className="relative left-4 text-[12px] text-red-500">
                  {checkoutPageData.emailsDontMatchError}
                </span>
              )}
            </div>
            {/*SELECT PAYMENT METHOD*/}
            <div className="flex-col flex mx-auto gap-y-4">
              <h4
                className="text-[14px] text-center font-exo text-white"
                style={{ lineHeight: '130%' }}
              >
                {checkoutPageData.selectPaymentMethod}
              </h4>
              <div className="flex gap-x-4 mx-auto">
                <SelectButton
                  isCardPayment={true}
                  isSelected={isCardPayment === true}
                  onClick={() => setIsCardPayment(true)}
                >
                  {checkoutPageData.paymentCard}
                </SelectButton>
                <SelectButton
                  isSelected={isCardPayment === false}
                  onClick={() => setIsCardPayment(false)}
                >
                  {checkoutPageData.paymentBitcoin}
                </SelectButton>
              </div>
            </div>
            {isCardPayment && (
              <>
                <InputLabel
                  name={'firstName'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  {cardPaymentFormData.firstName}
                </InputLabel>
                <InputLabel
                  name={'lastName'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  {cardPaymentFormData.lastName}
                </InputLabel>
                <InputLabel
                  name={'country'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  {cardPaymentFormData.country}
                </InputLabel>
                <InputLabel
                  name={'postalCode'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  {cardPaymentFormData.zip}
                </InputLabel>
                <InputLabel
                  name={'city'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  {cardPaymentFormData.city}
                </InputLabel>
                <InputLabel
                  name={'street'}
                  type={'text'}
                  dataSource={formData}
                  onChange={handleChange}
                >
                  {cardPaymentFormData.street}
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
                      {cardPaymentFormData.needInvoice}
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
                      {cardPaymentFormData.billingMatchesData}
                    </label>
                  </div>
                </div>
                {needsInvoice === true && (
                  //   todo: dropdown icon not visible
                  //   todo: hello, vedd ki a marketingesbol h muszaj, ne legzzen meusyja
                  <>
                    <div className="peer flex relative flex-col gap-y-2 w-[calc(35%-8px)]">
                      <label className="text-neutral-300 font-exo text-[14px] pl-2 pb-2 sm:pb-0 font-medium leading-normal">
                        <span className="text-red-500 text-[16px] font-exo font-bold">* </span>
                        {cardPaymentFormData.invoiceFor}
                      </label>
                      <Image
                        src={ChevronDown}
                        alt={'Chevron down icon'}
                        width={14}
                        height={14}
                        className="absolute right-4 top-[52px]"
                      />
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
                        <option value="">{cardPaymentFormData.select}</option>
                        <option value="person">{cardPaymentFormData.person}</option>
                        <option value="company">{cardPaymentFormData.company}</option>
                      </select>
                    </div>
                    <InputLabel
                      name={'invoiceName'}
                      dataSource={invoiceData}
                      onChange={handleInvoiceChange}
                      widthClass={'sm:w-[calc(65%-8px)] mt-[30px]'}
                    >
                      {cardPaymentFormData.invoiceName}
                    </InputLabel>
                    <InputLabel
                      name={'invoiceCountry'}
                      dataSource={invoiceData}
                      onChange={handleInvoiceChange}
                    >
                      {cardPaymentFormData.country}
                    </InputLabel>
                    <InputLabel
                      name={'invoicePostalCode'}
                      dataSource={invoiceData}
                      onChange={handleInvoiceChange}
                    >
                      {cardPaymentFormData.zip}
                    </InputLabel>
                    <InputLabel
                      name={'invoiceCity'}
                      dataSource={invoiceData}
                      onChange={handleInvoiceChange}
                    >
                      {cardPaymentFormData.city}
                    </InputLabel>
                    <InputLabel
                      name={'invoiceStreet'}
                      dataSource={invoiceData}
                      onChange={handleInvoiceChange}
                    >
                      {cardPaymentFormData.street}
                    </InputLabel>
                    {invoiceData.invoiceType === 'company' && (
                      <>
                        <h4
                          className="ml-2 mt-3 text-[14px] font-exo text-white"
                          style={{ lineHeight: '130%' }}
                        >
                          {cardPaymentFormData.atLeastOneVatNumber}
                        </h4>
                        <div className="flex sm:flex-row w-full justify-between">
                          <InputLabel
                            name={'vat'}
                            dataSource={invoiceData}
                            onChange={handleInvoiceChange}
                          >
                            {cardPaymentFormData.vat}
                          </InputLabel>
                          <InputLabel
                            name={'euVat'}
                            dataSource={invoiceData}
                            onChange={handleInvoiceChange}
                          >
                            {cardPaymentFormData.euVat}
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
                  {comingSoonData?.NewsletterAcceptCheckboxText}
                </label>
              </div>
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
                  <span className="text-red-500 text-[16px] font-exo font-bold">* </span>
                  {comingSoonData?.AcceptConditionsFirstText}{' '}
                  <Link href={`/${locale}/terms-and-conditions`}>
                    <span className="text-neutral-300 font-exo text-[14px] font-medium leading-normal underline">
                      {comingSoonData?.AcceptConditionsSecondText}
                    </span>
                  </Link>
                </label>
              </div>
            </div>
          </form>
          {isCardPayment !== null && (
            <div className="flex w-full items-center justify-center mt-2">
              <PayButton
                onClick={() => {
                  isCardPayment
                    ? handleOrder(PaymentProvider.STRIPE)
                    : handleOrder(PaymentProvider.BTCPAY);
                }}
                isCardPayment={isCardPayment}
                disabled={!canSubmit}
              >
                {' '}
                {isCardPayment ? 'Pay with card' : 'Pay with Bitcoin'}
              </PayButton>
            </div>
          )}
          {/*TODO: Jobban kinezo clearbutton, mobilon is ne legyen eldugva*/}
          <div className="flex relative justify-center">
            <button
              className="text-red-800 bg-black px-3 py-2 underline-offset-4 underline left-4 bottom-4"
              onClick={() => {
                clearForm();
                needsInvoice && clearInvoiceForm();
              }}
            >
              {checkoutPageData.clearForm}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
