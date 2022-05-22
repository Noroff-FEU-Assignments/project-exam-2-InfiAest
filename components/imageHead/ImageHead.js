import Image from "next/image";
import bryggenHeader from "../../images/header/bryggen-header-img.jpg";
import useWindowSize from "../../hooks/useWindowSize";

export default function ImageHead() {
  const windowSize = useWindowSize();

  let imgHeight = 450;

  if (windowSize.width < 768) {
    imgHeight = 600;
  }

  return (
    <div className="imageHead">
      <Image
        src={bryggenHeader}
        objectFit="cover"
        height={imgHeight}
        alt=""
        priority="true"
        className="header__image"
        placeholder="blur"
      />
    </div>
  );
}
