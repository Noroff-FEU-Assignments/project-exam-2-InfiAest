import PropTypes from "prop-types";
import {
  FaWifi,
  FaSnowflake,
  FaParking,
  FaPaw,
  FaUser,
  FaUsers,
  FaUserFriends,
} from "react-icons/fa";
import { GiKnifeFork, GiHeatHaze, GiWashingMachine } from "react-icons/gi";
import {
  MdKitchen,
  MdRoomService,
  MdFamilyRestroom,
  MdLocalLaundryService,
} from "react-icons/md";
// import { faWifi } from "@fortawesome/free-regular-svg-icons";

function Tags({ tagActive, content }) {
  if (tagActive === true && content === "WiFi") {
    return (
      <div className="card__tags--item">
        <FaWifi className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Aircon") {
    return (
      <div className="card__tags--item">
        <FaSnowflake className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Breakfast included") {
    return (
      <div className="card__tags--item">
        <GiKnifeFork className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Free parking") {
    return (
      <div className="card__tags--item">
        <FaParking className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Heating") {
    return (
      <div className="card__tags--item">
        <GiHeatHaze className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Kitchen") {
    return (
      <div className="card__tags--item">
        <MdKitchen className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Kitchenette") {
    return (
      <div className="card__tags--item">
        <MdKitchen className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Pets allowed") {
    return (
      <div className="card__tags--item">
        <FaPaw className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Room service") {
    return (
      <div className="card__tags--item">
        <MdRoomService className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Couples") {
    return (
      <div className="card__tags--item">
        <FaUserFriends className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Families") {
    return (
      <div className="card__tags--item">
        <MdFamilyRestroom className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Groups") {
    return (
      <div className="card__tags--item">
        <FaUsers className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Single travellers") {
    return (
      <div className="card__tags--item">
        <FaUser className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Washer") {
    return (
      <div className="card__tags--item">
        <GiWashingMachine className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Dryer") {
    return (
      <div className="card__tags--item">
        <MdLocalLaundryService className="tag__icon" />
        {content}
      </div>
    );
  } else {
    return "";
  }
}

Tags.propTypes = {
  tagActive: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
};

export default Tags;
