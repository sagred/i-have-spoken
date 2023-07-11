import Head from "next/head";

const siteUrl = "https://IHaveSpoken.xyz";

export default function Meta({
  title = "I Have Spoken",
  description = "I Have Spoken - Create NFT's that talk",
  ogImgUrl = "/og-image.png",
  ogUrl = siteUrl,
}) {
  return (
    <>
      <Head>
        <title key="title">{title}</title>
        <meta key="description" name="description" content={description} />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={title} />
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />
        <meta key="og:image" property="og:image" content={ogImgUrl} />
        <meta key="og:url" property="og:url" content={ogUrl} />
        <meta
          key="twitter:card"
          property="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitter:site" property="twitter:site" content="@sagredd" />
      </Head>
    </>
  );
}
