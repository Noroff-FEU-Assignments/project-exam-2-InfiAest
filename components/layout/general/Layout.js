import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import useWindowSize from "../../../hooks/useWindowSize";
import Image from "next/image";
import desktopLogo from "../../../images/logo/logo-white.png";
import mobileIcon from "../../../images/logo/Icon-white.png";
import DisplayLoader from "../../loader/DisplayLoader";
import PageLoader from "../../loader/PageLoader";

export default function Layout({ children }) {
  const [authorised, setAuthorised] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();
  const windowSize = useWindowSize();

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    auth ? setAuthorised(true) : false;
  }, [router]);

  // console.log(windowSize.width);

  // useEffect(() => {
  //   auth ? setAuthorised(true) : false;
  // }, []);

  let navLogo = <Image src={desktopLogo} width={"150"} height={"50"} alt="" />;

  if (windowSize.width < 768) {
    navLogo = <Image src={mobileIcon} width={"49"} height={"40"} alt="" />;
  }

  function logout() {
    setAuth(null);
    return router.push("/");
  }

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        sticky="top"
        className="navbar"
      >
        {auth ? (
          <>
            <Link href="/">
              <div className="navbar__logo">{navLogo}</div>
            </Link>
            <Container>
              <Navbar.Toggle />
              <Navbar.Collapse className="navbar__collapse">
                <Nav className="navbar__nav">
                  <Link href="/">
                    <a
                      className={
                        router.pathname === "/"
                          ? "navbar__link--current"
                          : "navbar__link"
                      }
                    >
                      Home
                    </a>
                  </Link>
                  <Link href="/accomodation">
                    <a
                      className={
                        router.pathname == "/accomodation"
                          ? "navbar__link--current"
                          : "navbar__link"
                      }
                    >
                      Accomodation
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a
                      className={
                        router.pathname == "/contact"
                          ? "navbar__link--current"
                          : "navbar__link"
                      }
                    >
                      Contact us
                    </a>
                  </Link>
                  <Link href="/admin">
                    <a
                      className={
                        router.pathname == "/admin"
                          ? "navbar__link--current"
                          : "navbar__link"
                      }
                    >
                      Admin
                    </a>
                  </Link>
                </Nav>

                <Button
                  variant="info"
                  onClick={logout}
                  className="navbar__logout-button"
                >
                  Logout
                </Button>
              </Navbar.Collapse>
            </Container>
          </>
        ) : (
          <>
            <Link href="/">
              <div className="navbar__logo">{navLogo}</div>
            </Link>
            <Container>
              <Navbar.Toggle />
              <Navbar.Collapse className="navbar__collapse">
                <Nav className="navbar__nav">
                  <Link href="/">
                    <a
                      className={
                        router.pathname === "/"
                          ? "navbar__link--current"
                          : "navbar__link"
                      }
                    >
                      Home
                    </a>
                  </Link>
                  <Link href="/accomodation">
                    <a
                      className={
                        router.pathname == "/accomodation"
                          ? "navbar__link--current"
                          : "navbar__link"
                      }
                    >
                      Accomodation
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a
                      className={
                        router.pathname == "/contact"
                          ? "navbar__link--current"
                          : "navbar__link"
                      }
                    >
                      Contact us
                    </a>
                  </Link>
                  <Link href="/login">
                    <a
                      className={
                        router.pathname == "/login"
                          ? "navbar__link--current"
                          : "navbar__link"
                      }
                    >
                      Login
                    </a>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </>
        )}
      </Navbar>

      {pageLoading ? <PageLoader /> : <>{children}</>}
    </>
  );
}
