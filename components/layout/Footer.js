import Image from "next/image";
import Logo from "../../images/logo/logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <div className="footer__logo--container">
        <Image
          className="footer__logo"
          src={Logo}
          width={"150"}
          height={"50"}
          alt=""
        />
      </div>
      <div className="footer__flex-container">
        <div className="footer__socials">
          <div className="footer__socials--flex">
            <a href="" className="footer__link">
              <FontAwesomeIcon icon={faFacebookSquare} />
              <span className="footer__link--name">Facebook</span>
            </a>

            <a href="" className="footer__link">
              <FontAwesomeIcon icon={faInstagram} />
              <span className="footer__link--name">Instagram</span>
            </a>
          </div>
          <a href="/contact" className="footer__link">
            Contact Us
          </a>

          <a href="/login" className="footer__link">
            Login
          </a>
        </div>
      </div>
      <span className="footer__copyright">&copy;Holidaze 2022</span>
    </footer>
  );
}
