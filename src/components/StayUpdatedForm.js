"use client";

import React, { useState } from "react";
import SecondaryCTAButton from "./SecondaryCTAButton";
import {cln} from "@/utilities/classnames";
import { subscribeToNewsletter } from "@/app/actions/newsletterSubscribe";
import Notification from "@/utilities/Notification";

const StayUpdatedForm = () => {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
              className={cln("absolute bottom-[6px] left-0 right-0 h-[8px] z-0 bg-primary-500 w-[97%] md:w-[65%] footerTitle:w-[95%]")}
            />
            {/* Szöveg */}
            <h3 style={{fontWeight:800, textShadow:'2px 2px 2px rgba(0,0,0,1)'}} className="text-white font-exo text-[32px] leading-[100%] tracking-[8.4px] uppercase z-10 relative">
              STAY UPDATED
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[8px] self-stretch">
          <p className="text-[rgba(255,255,255,0.80)] font-exo text-[22px] font-extrabold leading-[110%] tracking-[2.6px]">
            True Bitcoiners Stay Ahead!
          </p>
          <p className="self-stretch text-[rgba(255,255,255,0.80)] font-exo text-[16px] font-medium leading-[150%] tracking-[1px]">
            Sign up for our newsletter to get the latest updates on Budapest
            Bitcoin 2025.
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col fullhd:flex-row fullhd:items-start gap-[16px] self-stretch"
      >
        <div className="flex flex-col items-start gap-[8px] flex-[1_0_0]">
          <div className="flex h-[50px] px-[24px] py-[9px] items-center gap-[10px] self-stretch rounded-[43px] border-2 border-secondary-600 bg-neutral-950">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-neutral-300 font-exo text-[14px] font-medium leading-normal w-full outline-none"
              required
            />
          </div>
          <div className="flex flex-col items-start gap-[10px] self-stretch">
            <div className="flex items-start gap-[10px] py-[12px] pl-[16px] pr-0">
              <input
                type="checkbox"
                required
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-[16px] h-[16px]"
              />
              <p className="text-neutral-300 font-exo text-[14px] font-medium leading-normal">
                I accept the regular conditions
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center mx-auto">
          <SecondaryCTAButton
            text={isSubmitting ? "Submitting..." : "Sign up"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default StayUpdatedForm;
