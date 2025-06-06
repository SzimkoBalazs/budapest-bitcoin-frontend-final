export default async function sitemap() {
  const locales = ["en", "hu"];

  const staticPages = ["", "terms-and-conditions", "our-team"]; //chekout, speakers deleted until ticket sale

  const baseUrl = "https://www.budapestbitcoin.com";

  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page ? `/${page}` : ""}`,
      lastModified: new Date().toISOString(),
    }))
  );

  // let dynamicUrls = [];
  // for (const locale of locales) {
  //   const speakerCards = await fetchSpeakerCardData(locale);

  //   const slugs = speakerCards.map((speaker) => speaker.url);
  //   const localeUrls = slugs.map((slug) => ({
  //     url: `${baseUrl}/${locale}/speakers/${slug}`,
  //     lastModified: new Date().toISOString(),
  //   }));
  //   dynamicUrls = dynamicUrls.concat(localeUrls);
  // }

  return [...staticUrls]; //deleted ...dynamicUrls until sale
}

async function fetchSpeakerCardData(locale) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/speaker-cards?locale=${locale}&populate=*&sort=order:asc`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch speaker card data");
  }

  const data = await res.json();
  return data.data || [];
}
