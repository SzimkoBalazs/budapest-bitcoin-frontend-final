import React, { useEffect, useState } from "react";

const Notification = ({ message, onClose, duration = 4000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (message) {
      // Progress bar időzítő
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 100 / (duration / 100), 0));
      }, 100);

      // Üzenet automatikus eltűnése
      const timeout = setTimeout(() => {
        onClose();
      }, duration);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 bg-gray-800 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-xs">
      <p className="text-lg font-semibold">{message}</p>
      <div className="w-full h-2 bg-gray-600 rounded mt-2 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Notification;
