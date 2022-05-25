import "../styles/sass/style.scss";
import Script from "next/script";
import { AuthProvider } from "../context/AuthContext";
import Footer from "../components/layout/general/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
        strategy="beforeInteractive"
      />
      <div className="wrapper">
        <Component {...pageProps} />
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;
