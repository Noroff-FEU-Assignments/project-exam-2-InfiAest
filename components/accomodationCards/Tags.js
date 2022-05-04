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
      <div>
        <FaWifi className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Aircon") {
    return (
      <div>
        <FaSnowflake className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Breakfast included") {
    return (
      <div>
        <GiKnifeFork className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Free parking") {
    return (
      <div>
        <FaParking className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Heating") {
    return (
      <div>
        <GiHeatHaze className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Kitchen") {
    return (
      <div>
        <MdKitchen className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Kitchenette") {
    return (
      <div>
        <MdKitchen className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Pets allowed") {
    return (
      <div>
        <FaPaw className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Room service") {
    return (
      <div>
        <MdRoomService className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Couples") {
    return (
      <div>
        <FaUserFriends className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Families") {
    return (
      <div>
        <MdFamilyRestroom className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Groups") {
    return (
      <div>
        <FaUsers className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Single travellers") {
    return (
      <div>
        <FaUser className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Washer") {
    return (
      <div>
        <GiWashingMachine className="tag__icon" />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Dryer") {
    return (
      <div>
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
