import Image from "next/image";
import bryggenHeader from "../../images/header/bryggen-header-img.jpg";

export default function ImageHead() {
  return (
    <>
      <Image
        src={bryggenHeader}
        objectFit="cover"
        height="450"
        alt=""
        priority="true"
        className="header__image"
        placeholder="blur"
      />
    </>
  );
}
