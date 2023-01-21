import Head from "next/head";
import { absoluteUrl } from "@/lib/utils";

const TITLE = "Next.js project";
const DESCRIPTION = "Next.js project";

export default function Meta() {
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="icon" href="/favicon.ico" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:logo" content={absoluteUrl("/logo.png")}></meta>
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
    </Head>
  );
}
