import NextHead from "next/head";

export default function Head({ title = "" }) {
  return (
    <NextHead>
      <title>
        {title}
        {title ? " | " : ""}Charlotte Lucas | PE2
      </title>
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
}
