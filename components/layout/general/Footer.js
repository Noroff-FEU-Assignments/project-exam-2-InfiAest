import Image from "next/image";
import Link from "next/link";
import LogoIcon from "../../../images/logo/Icon-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="footer">
      <Link href="/">
        <a className="footer__link" aria-label="Holidaze Icon link to homepage">
          <div className="footer__logo--container">
            <Image
              className="footer__logo"
              src={LogoIcon}
              width={"49"}
              height={"40"}
              alt=""
            />
          </div>
        </a>
      </Link>

      <div className="footer__socials">
        <div className="footer__socials--flex">
          <Link href="#">
            <a
              className="footer__link"
              aria-label="link to Holidaze facebook page"
            >
              <FontAwesomeIcon
                className="footer__link--icon"
                icon={faFacebookSquare}
              />
              <span className="footer__link--name">Facebook</span>
            </a>
          </Link>

          <Link href="#">
            <a
              className="footer__link"
              aria-label="link to Holidaze instagram page"
            >
              <FontAwesomeIcon
                className="footer__link--icon"
                icon={faInstagram}
              />
              <span className="footer__link--name">Instagram</span>
            </a>
          </Link>
        </div>
        <Link href="/contact">
          <a
            className="footer__link"
            aria-label="link to Holidaze contact page"
          >
            Contact Us
          </a>
        </Link>

        <Link href="/login">
          <a className="footer__link" aria-label="link to Holidaze login page">
            Login
          </a>
        </Link>
      </div>

      <span className="footer__copyright">&copy;Holidaze 2022</span>
    </footer>
  );
}
