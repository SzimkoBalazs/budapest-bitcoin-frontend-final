import React from "react";
import Scanner from "./components/Scanner";

const page = () => {
  return (
    <div className="flex flex-col text-center gap-10">
      <h2>Ticket Verification</h2>
      <Scanner />
    </div>
  );
};

export default page;
