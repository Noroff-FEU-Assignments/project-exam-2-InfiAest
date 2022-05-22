import Image from "next/image";
import Link from "next/link";
import LogoIcon from "../../../images/logo/Icon-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <Link href="/">
        <div className="footer__logo--container">
          <Image
            className="footer__logo"
            src={LogoIcon}
            width={"49"}
            height={"40"}
            alt=""
          />
        </div>
      </Link>

      <div className="footer__socials">
        <div className="footer__socials--flex">
          <Link href="#" className="footer__link">
            <a>
              <FontAwesomeIcon
                className="footer__link--icon"
                icon={faFacebookSquare}
              />
              <span className="footer__link--name">Facebook</span>
            </a>
          </Link>

          <Link href="#" className="footer__link">
            <a>
              <FontAwesomeIcon
                className="footer__link--icon"
                icon={faInstagram}
              />
              <span className="footer__link--name">Instagram</span>
            </a>
          </Link>
        </div>
        <Link href="/contact" className="footer__link">
          Contact Us
        </Link>

        <Link href="/login" className="footer__link">
          Login
        </Link>
      </div>

      <span className="footer__copyright">&copy;Holidaze 2022</span>
    </footer>
  );
}
