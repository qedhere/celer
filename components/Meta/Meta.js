import Head from "next/head";
import Script from "next/script";

export default function Meta(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta charSet="utf-8" />
        <meta name="author" content="QED" />
        <meta name="description" content={props.description} />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content="/some-image.png" />
        <meta property="og:url" content="/index.html" />
        <meta property="og:site_name" content="celer.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="image description" />
      </Head>
    </>
  );
}
