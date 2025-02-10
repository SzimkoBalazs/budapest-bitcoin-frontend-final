/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "strapi.budapestbitcoin.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*.pdf",
        headers: [
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Content-Disposition",
            value: "attachment", // or "attachment" if download needed
          },
        ],
      },
    ];
  },
};

export default nextConfig;
