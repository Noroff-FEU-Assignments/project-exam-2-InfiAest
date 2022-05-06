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
      <Navbar bg="dark" variant="dark" expand="md" sticky="top">
        {auth ? (
          <>
            <div className="nav__logo--container">{navLogo}</div>
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link href="/">
                    <a className={router.pathname === "/" ? "current" : ""}>
                      Home
                    </a>
                  </Link>
                  <Link href="/accomodations">
                    <a
                      className={
                        router.pathname == "/accomodations" ? "current" : ""
                      }
                    >
                      Accomodations
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a
                      className={router.pathname == "/contact" ? "current" : ""}
                    >
                      Contact us
                    </a>
                  </Link>
                  <Link href="/admin">
                    <a className={router.pathname == "/admin" ? "current" : ""}>
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
            <div className="nav__logo--container">{navLogo}</div>
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link href="/">
                    <a className={router.pathname === "/" ? "current" : ""}>
                      Home
                    </a>
                  </Link>
                  <Link href="/accomodations">
                    <a
                      className={
                        router.pathname == "/accomodations" ? "current" : ""
                      }
                    >
                      Accomodations
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a
                      className={router.pathname == "/contact" ? "current" : ""}
                    >
                      Contact us
                    </a>
                  </Link>
                  <Link href="/login">
                    <a className={router.pathname == "/login" ? "current" : ""}>
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
