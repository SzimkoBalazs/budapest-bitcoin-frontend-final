import React from "react";
import ReactMarkdown from "react-markdown";

async function fetchTermsData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/new-terms-and-conditon?locale=${locale}&populate=*`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch terms and condition section's data");
  }

  const data = await res.json();
  return data.data || [];
}

export const metadata = {
  title: "Terms and Conditions",
  description: "Our Terms and Conditions and Privacy Policy. ",
};

const page = async ({ params }) => {
  const { locale } = await params;
  const termsSectionData = await fetchTermsData(locale);
  const aszfPdfUrl = termsSectionData.ASZF.url;
  const adatvedelemPdfUrl = termsSectionData.Privacy.url;

  return (
    <div className="container max-w-[820px] mx-auto px-4 py-8 mt-[100px] rounded-md">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-primary-500 text-center mb-8">
        {termsSectionData.TitleText}
      </h1>

      {/* ÁSZF megjelenítése */}
      {aszfPdfUrl ? (
        <div className="mb-12">
          <iframe
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${aszfPdfUrl}`}
            className="w-full h-[900px] border rounded-md"
          />
        </div>
      ) : (
        <p className="text-red-500">
          Az Általános Szerződési Feltételek nem elérhetők.
        </p>
      )}

      {/* Adatkezelési Tájékoztató megjelenítése */}
      {adatvedelemPdfUrl ? (
        <div>
          <iframe
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${adatvedelemPdfUrl}`}
            className="w-full h-[800px] border rounded-md"
          />
        </div>
      ) : (
        <p className="text-red-500">
          Az Adatkezelési Tájékoztató nem elérhető.
        </p>
      )}
    </div>
  );
};

export default page;
