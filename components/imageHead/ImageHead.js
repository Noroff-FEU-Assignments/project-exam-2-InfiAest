import headerImg from "../../images/bryggen-header-img.jpg";

export default function ImageHead() {
  return (
    <div
      style={{
        backgroundImage: `url('${headerImg.src}')`,
        backgroundPosition: "bottom",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "250px",
        position: "relative",
        margin: "0 auto",
      }}
    ></div>
  );
}
