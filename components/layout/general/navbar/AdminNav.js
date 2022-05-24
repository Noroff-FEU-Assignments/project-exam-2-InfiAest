import Link from "next/link";
import { useRouter } from "next/router";
import Nav from "react-bootstrap/Nav";

function AdminNav() {
  const router = useRouter();
  return (
    <Nav className="navbar__nav">
      <Link href="/">
        <a
          className={
            router.pathname === "/" ? "navbar__link--current" : "navbar__link"
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
  );
}

export default AdminNav;
