import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import useWindowSize from "../../hooks/useWindowSize";
import Image from "next/image";
import desktopLogo from "../../images/logo/logo-white.png";
import mobileIcon from "../../images/logo/Icon-white.png";

export default function Layout({ children }) {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();
  const windowSize = useWindowSize();

  // console.log(windowSize.width);

  let navLogo = <Image src={desktopLogo} width={"150"} height={"50"} alt="" />;

  if (windowSize.width < 768) {
    navLogo = <Image src={mobileIcon} width={"49"} height={"40"} alt="" />;
  }

  let userName = "";

  if (auth) {
    userName = `Hello, ${auth.user.username}`;
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
            <div className="navbar__logo">{navLogo}</div>
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
                  <Link href="/accomodations">
                    <a
                      className={
                        router.pathname == "/accomodations"
                          ? "navbar__link--current"
                          : "navbar__link"
                      }
                    >
                      Accomodations
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
                <Navbar.Text>
                  <span className="username">{userName}</span>
                  <Button variant="primary" onClick={logout}>
                    Logout
                  </Button>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </>
        ) : (
          <>
            <div className="navbar__logo">{navLogo}</div>
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
                  <Link href="/accomodations">
                    <a
                      className={
                        router.pathname == "/accomodations"
                          ? "navbar__link--current"
                          : "navbar__link"
                      }
                    >
                      Accomodations
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

      {children}
    </>
  );
}
