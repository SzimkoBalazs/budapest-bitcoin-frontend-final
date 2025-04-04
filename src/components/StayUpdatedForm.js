'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cln } from '@/utilities/classnames';
import { subscribeToNewsletter } from '@/app/actions/newsletterSubscribe';
import GetYourPassCTAButton from '@/components/GetYourPassCTAButton';

const StayUpdatedForm = ({ data, comingSoonFormData, locale }) => {
  const [email, setEmail] = useState('');
  const [isFirstChecked, setIsFirstChecked] = useState(false);
  const [isSecondChecked, setIsSecondChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submittingText = comingSoonFormData
    ? comingSoonFormData.SubmittingButtonText
    : data.SubmittingButtonText;
  const buttonText = comingSoonFormData ? comingSoonFormData.ButtonText : data.ButtonText;
  const buttonSuccessText = comingSoonFormData
    ? comingSoonFormData.ButtonSuccessText
    : data.ButtonSuccessText;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setMessage('You have successfully subscribed!');
      setEmail('');
      setSubmitted(true);
      setIsFirstChecked(false);
      setIsSecondChecked(false);
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } else {
      setMessage(result.message || 'Something went wrong. Please try again.');
    }

    setIsSubmitting(false);
  };

  // Mid form or footer form
  const underlineWidth = comingSoonFormData
    ? 'w-[220px] xxs:w-[230px] sm:w-[275px]'
    : 'w-[180px] xxs:w-[97%] sm:w-[250px]';
  const underlineWidthEn = comingSoonFormData
    ? 'w-[250px] xxs:w-[190px] sm:w-[270px]'
    : 'w-[97%] md:w-[65%] footerTitle:w-[95%]';

  return (
    <div className="flex flex-1 gl:min-w-[480px] max-w-[554px] flex-col items-center justify-center lg:items-start gap-[40px]">
      <div className="flex flex-col items-start gap-[24px] self-stretch">
        <div
          className={cln(
            'flex flex-col items-start gap-[64px]',
            comingSoonFormData ? 'max-w-none' : 'max-w-[364px]',
          )}
        >
          <div className="relative inline-block">
            {/* Kék csík */}
            <div
              className={cln(
                'absolute bottom-[6px] sm:bottom-[8px] left-0 right-0 h-[6px] z-0 bg-primary-500',
                locale === 'hu' ? underlineWidth : underlineWidthEn,
              )}
            />
            {/* Szöveg */}
            <h3
              style={{
                fontWeight: 800,
                textShadow: '2px 2px 2px rgba(0,0,0,1)',
              }}
              className={cln(comingSoonFormData ? 'text-[24px] sm:text-[32px]' : 'text-[28px] sm:text-[34px]', "text-white font-exo leading-[110%] tracking-[2px] sm:tracking-[4px] uppercase z-10 relative")}
            >
              {comingSoonFormData ? comingSoonFormData.MainTitle : data.MainTitle}
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[8px] self-stretch">
          <p className="text-[rgba(255,255,255,0.80)] font-exo text-[20px] sm:text-[22px] font-extrabold leading-[110%] tracking-[2.6px]">
            {comingSoonFormData ? comingSoonFormData.FirstLeftText : data.FirstLeftText}
          </p>
          {!comingSoonFormData && (
            <p className="self-stretch text-[rgba(255,255,255,0.80)] font-exo text-[16px] font-medium leading-[150%] tracking-[1px]">
              {data.SecondLeftText}
            </p>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:items-start sm:flex-row gap-[16px] self-stretch"
      >
        <div className="flex flex-col items-start gap-[8px] flex-[1_0_0]">
          <div className="flex h-[50px] px-[24px] py-[9px] items-center gap-[10px] self-stretch rounded-[43px] border-2 border-secondary-600 bg-neutral-950">
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder={
                comingSoonFormData
                  ? comingSoonFormData.EmailFormPlaceholderText
                  : data.EmailFormPlaceholderText
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-neutral-300 font-exo text-[14px] font-medium leading-normal outline-none w-full"
              required
            />
          </div>
          {data || comingSoonFormData ? (
            <div className="flex flex-col items-start self-stretch">
              <div className="flex items-start gap-[10px] mt-2 sm:mt-0 py-[4px] pl-[12px] pr-0">
                <input
                  id={comingSoonFormData ? 'firstInputCs' : 'firstInput'}
                  type="checkbox"
                  required
                  checked={isFirstChecked}
                  onChange={(e) => setIsFirstChecked(e.target.checked)}
                  className="max-w-[18px] max-h-[18px] mt-1"
                />
                <label
                  className="text-neutral-300 font-exo text-[14px] pb-2 sm:pb-0 font-medium leading-normal"
                  htmlFor={comingSoonFormData ? 'firstInputCs' : 'firstInput'}
                >
                  {comingSoonFormData
                    ? comingSoonFormData.NewsletterAcceptCheckboxText
                    : data.NewsletterAcceptCheckboxText}
                </label>
              </div>

              <div className="flex items-start gap-[10px] mt-2 sm:mt-0 py-[4px] pl-[12px] pr-0">
                <input
                  id={comingSoonFormData ? 'secondInputCs' : 'secondInput'}
                  type="checkbox"
                  required
                  checked={isSecondChecked}
                  onChange={(e) => setIsSecondChecked(e.target.checked)}
                  className="max-w-[18px] max-h-[18px] mt-1"
                />
                <label
                  className="text-neutral-300 font-exo text-[14px] pb-2 sm:pb-0 font-medium leading-normal"
                  htmlFor={comingSoonFormData ? 'secondInputCs' : 'secondInput'}
                >
                  {comingSoonFormData
                    ? comingSoonFormData.AcceptConditionsFirstText
                    : data.AcceptConditionsFirstText}{' '}
                  <Link href={`/${locale}/terms-and-conditions`}>
                    <span className="text-neutral-300 font-exo text-[14px] font-medium leading-normal underline">
                      {comingSoonFormData
                        ? comingSoonFormData.AcceptConditionsSecondText
                        : data.AcceptConditionsSecondText}
                    </span>
                  </Link>
                </label>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex items-center mx-auto">
          <GetYourPassCTAButton
            buttonStyle={{
              opacity: isFirstChecked && isSecondChecked && email ? 1 : 0.65,
            }}
            buttonText={isSubmitting ? submittingText : submitted ? buttonSuccessText : buttonText}
            anchorOrButton={'button'}
            type={'submit'}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default StayUpdatedForm;
