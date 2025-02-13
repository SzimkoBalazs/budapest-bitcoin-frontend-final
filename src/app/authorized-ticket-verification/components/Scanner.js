"use client";

import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [validationResult, setValidationResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 350, height: 350 },
      fps: 2,
    });

    scanner.render(success, error);

    async function success(result) {
      // Töröljük a scannert, hogy ne olvasson többet
      scanner.clear();
      setScanResult(result);

      try {
        // Fetcheljük az API-t a scan eredmény URL-jével
        const response = await fetch(result);
        if (!response.ok) {
          const errorData = await response.json();
          setValidationResult({ error: errorData.error });
        } else {
          const data = await response.json();
          setValidationResult(data);
        }
      } catch (err) {
        setValidationResult({ error: "Hiba történt a validáció során." });
      }
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Ticket Verification</h2>
      <div id="reader" className="max-w-[350px] w-full"></div>
      {validationResult && (
        <div className="mt-4 p-4 border rounded">
          {validationResult.error ? (
            <p className="text-red-500">Hiba: {validationResult.error}</p>
          ) : (
            <div>
              <p className="text-green-600">Jegy sikeresen validálva!</p>
              <p>
                <strong>Order ID:</strong> {validationResult.orderId}
              </p>
              <p>
                <strong>Email:</strong> {validationResult.email}
              </p>
              <p>
                <strong>Ticket Type:</strong> {validationResult.ticketName}
              </p>
              <p>
                <strong>Validated At:</strong>{" "}
                {new Date(validationResult.validatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Scanner;
