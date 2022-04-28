import Image from "next/image";
import Logo from "../../images/logo/logo-white.png";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#1d1f1e",
        color: "#ffffff",
        width: "100%",
        position: "relative",
        margin: "4rem auto 0 auto",
        padding: "0.5rem 1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "end",
      }}
    >
      <Image src={Logo} width={"150"} height={"50"} alt="" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "400px",
        }}
      >
        <p>Facebook</p>
        <p>Instagram</p>
        <p>Contact Us</p>
        <p>Login</p>
      </div>
      <p>&copy;Holidaze 2022</p>
    </footer>
  );
}
