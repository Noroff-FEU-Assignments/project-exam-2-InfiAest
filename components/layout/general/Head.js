import NextHead from "next/head";
import PropTypes from "prop-types";

export default function Head({ title = "", description }) {
  return (
    <NextHead>
      <title>
        {title}
        {title ? " | " : ""}Charlotte Lucas | PE2
      </title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
