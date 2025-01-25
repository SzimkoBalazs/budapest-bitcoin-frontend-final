"use client";

import React, { useState } from "react";
import SecondaryCTAButton from "./SecondaryCTAButton";
import { cln } from "@/utilities/classnames";
import { subscribeToNewsletter } from "@/app/actions/newsletterSubscribe";
import Link from "next/link";

const StayUpdatedForm = ({ data, locale }) => {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submittingText = data.SubmittingButtonText;
  const buttonText = data.ButtonText;
  const buttonSuccessText = data.ButtonSuccessText;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setMessage("You have successfully subscribed!");
      setEmail("");
      setSubmitted(true);
      setIsChecked(false);
    } else {
      setMessage(result.message || "Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-1 max-w-[554px] flex-col items-center justify-center lg:items-start gap-[40px]">
      <div className="flex flex-col items-start gap-[24px] self-stretch">
        <div className="flex max-w-[364px] flex-col items-start gap-[64px]">
          <div className="relative inline-block">
            {/* Kék csík */}
            <div
              className={cln(
                "absolute bottom-[6px] left-0 right-0 h-[8px] z-0 bg-primary-500 w-[97%] md:w-[65%] footerTitle:w-[95%]"
              )}
            />
            {/* Szöveg */}
            <h3
              style={{
                fontWeight: 800,
                textShadow: "2px 2px 2px rgba(0,0,0,1)",
              }}
              className="text-white font-exo text-[32px] leading-[100%] tracking-[8.4px] uppercase z-10 relative"
            >
              {data.MainTitle}
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[8px] self-stretch">
          <p className="text-[rgba(255,255,255,0.80)] font-exo text-[22px] font-extrabold leading-[110%] tracking-[2.6px]">
            {data.FirstLeftText}
          </p>
          <p className="self-stretch text-[rgba(255,255,255,0.80)] font-exo text-[16px] font-medium leading-[150%] tracking-[1px]">
            {data.SecondLeftText}
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row lg:items-start gap-[16px] self-stretch"
      >
        <div className="flex flex-col items-start gap-[8px] flex-[1_0_0]">
          <div className="flex h-[50px] px-[24px] py-[9px] items-center gap-[10px] self-stretch rounded-[43px] border-2 border-secondary-600 bg-neutral-950">
            <input
              type="email"
              placeholder={data.EmailFormPlaceholderText}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-neutral-300 font-exo text-[14px] font-medium leading-normal outline-none"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-[10px] self-stretch">
            <div className="flex items-start gap-[10px] py-[12px] pl-[16px] pr-0">
              <p className="text-neutral-300 font-exo text-[14px] font-medium leading-normal">
                {data.AcceptConditionsFirstText}{" "}
                <Link href={`/${locale}/terms-and-conditions`}>
                  <span className="text-neutral-300 font-exo text-[14px] font-medium leading-normal">
                    {data.AcceptConditionsSecondText}
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center mx-auto">
          <SecondaryCTAButton
            text={
              submitted
                ? buttonSuccessText
                : isSubmitting
                ? submittingText
                : buttonText
            }
            type="submit"
            isChecked={email}
            submitted={submitted}
          />
        </div>
      </form>
    </div>
  );
};

export default StayUpdatedForm;
