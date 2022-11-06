import Head from "next/head";

export default function Meta(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta charset="utf-8" />
        <meta name="author" content="Manu Anish" />
        <meta name="description" content={props.description} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content="/some-image.png" />
        <meta property="og:url" content="/this-page.html" />
        <meta property="og:site_name" content="manuanish.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="image description" />
      </Head>
    </>
  );
}
