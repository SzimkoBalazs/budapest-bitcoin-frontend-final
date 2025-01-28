export default function sitemap() {
  const locales = ["en", "hu"];

  const staticPages = ["", "terms-and-conditions"];

  const baseUrl = "https://www.budapestbitcoin.com";

  const urls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page ? `/${page}` : ""}`,
      lastModified: new Date().toISOString(),
    }))
  );

  return urls;
}
