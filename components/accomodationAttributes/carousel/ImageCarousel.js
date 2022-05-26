import PropTypes from "prop-types";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import DisplayMessage from "../../messages/DisplayMessage";
import { placeholderImg } from "../../../constants/placeholderImg";

function ImageCarousel({ accomodationImages }) {
  if (accomodationImages.data === null) {
    return (
      <DisplayMessage
        variant="info"
        alertClass="image__alert"
        heading="Oh snap, there aren't any image yet"
        message="We're working on getting some images uploaded soon! Soon about that!"
      />
    );
  } else {
    return (
      <Carousel>
        {accomodationImages.data.map((image) => {
          return (
            <Carousel.Item key={image.id}>
              <Image
                className="details__image"
                src={image.attributes.url}
                alt={image.attributes.name}
                width="702"
                height="702"
                objectFit="cover"
                priority={true}
                placeholder="blur"
                blurDataURL={placeholderImg}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}

export default ImageCarousel;

ImageCarousel.propTypes = {
  accomodationImages: PropTypes.object.isRequired,
};
