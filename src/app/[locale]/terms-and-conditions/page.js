import React from "react";
import ReactMarkdown from "react-markdown";

async function fetchTermsData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/terms-and-condition?locale=${locale}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch terms and condition section's data");
  }

  const data = await res.json();
  return data.data || [];
}

const page = async ({ params }) => {
  const { locale } = await params;
  const termsSectionData = await fetchTermsData(locale);
  return (
    <div className="container mx-auto px-4 py-8 mt-[100px] rounded-md">
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-4xl font-extrabold text-center text-primary-500 mt-6"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-3xl font-bold text-secondary-600 mt-4"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="text-neutral-300 leading-relaxed mb-4" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              className="text-blue-500 underline hover:text-blue-700"
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li className="list-disc list-inside text-white" {...props} />
          ),
        }}
      >
        {termsSectionData.Content}
      </ReactMarkdown>
    </div>
  );
};

export default page;
