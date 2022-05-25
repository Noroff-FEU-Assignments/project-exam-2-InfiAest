import "../styles/sass/style.scss";
import { AuthProvider } from "../context/AuthContext";
import Footer from "../components/layout/general/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="wrapper">
        <Component {...pageProps} />
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;
