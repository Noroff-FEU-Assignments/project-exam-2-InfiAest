import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Footer from "../components/layout/Footer";

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
