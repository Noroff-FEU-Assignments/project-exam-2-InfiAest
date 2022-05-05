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

function Tags({ tagActive, content, tagClass }) {
  if (tagActive === true && content === "WiFi") {
    return (
      <div className={`${tagClass}--item`}>
        <FaWifi className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Aircon") {
    return (
      <div className={`${tagClass}--item`}>
        <FaSnowflake className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Breakfast included") {
    return (
      <div className={`${tagClass}--item`}>
        <GiKnifeFork className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Free parking") {
    return (
      <div className={`${tagClass}--item`}>
        <FaParking className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Heating") {
    return (
      <div className={`${tagClass}--item`}>
        <GiHeatHaze className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Kitchen") {
    return (
      <div className={`${tagClass}--item`}>
        <MdKitchen className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Kitchenette") {
    return (
      <div className={`${tagClass}--item`}>
        <MdKitchen className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Pets allowed") {
    return (
      <div className={`${tagClass}--item`}>
        <FaPaw className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Room service") {
    return (
      <div className={`${tagClass}--item`}>
        <MdRoomService className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Couples") {
    return (
      <div className={`${tagClass}--item`}>
        <FaUserFriends className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Families") {
    return (
      <div className={`${tagClass}--item`}>
        <MdFamilyRestroom className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Groups") {
    return (
      <div className={`${tagClass}--item`}>
        <FaUsers className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Single travellers") {
    return (
      <div className={`${tagClass}--item`}>
        <FaUser className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Washer") {
    return (
      <div className={`${tagClass}--item`}>
        <GiWashingMachine className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Dryer") {
    return (
      <div className={`${tagClass}--item`}>
        <MdLocalLaundryService className={`${tagClass}--icon`} />
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
  tagClass: PropTypes.string.isRequired,
};

export default Tags;
