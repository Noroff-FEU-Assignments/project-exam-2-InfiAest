import PropTypes from "prop-types";
import {
  FaWifi,
  FaSnowflake,
  FaParking,
  FaPaw,
  FaUser,
  FaUsers,
  FaUserFriends,
  FaCity,
  FaMountain,
} from "react-icons/fa";
import { GiKnifeFork, GiHeatHaze, GiWashingMachine } from "react-icons/gi";
import {
  MdKitchen,
  MdRoomService,
  MdFamilyRestroom,
  MdLocalLaundryService,
  MdApartment,
  MdOutlineBungalow,
  MdOutlineBedroomParent,
} from "react-icons/md";
import { RiHotelLine, RiFilterLine, RiFilterOffLine } from "react-icons/ri";
import { BsHouse, BsTree } from "react-icons/bs";
import { BiAnchor } from "react-icons/bi";

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
  } else if (tagActive === true && content === "Hotel") {
    return (
      <div className={`${tagClass}--item`}>
        <RiHotelLine className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "House") {
    return (
      <div className={`${tagClass}--item`}>
        <BsHouse className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Apartment") {
    return (
      <div className={`${tagClass}--item`}>
        <MdApartment className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Bungalow") {
    return (
      <div className={`${tagClass}--item`}>
        <MdOutlineBungalow className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Studio") {
    return (
      <div className={`${tagClass}--item`}>
        <MdOutlineBedroomParent className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Filter accomodations") {
    return (
      <div className={`${tagClass}--item`}>
        <RiFilterLine className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (tagActive === true && content === "Reset filters") {
    return (
      <div className={`${tagClass}--item`}>
        <RiFilterOffLine className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if ((tagActive === true && content === "Sea") || content === "sea") {
    return (
      <div className={`${tagClass}--item`}>
        <BiAnchor className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (
    (tagActive === true && content === "Rural") ||
    content === "rural"
  ) {
    return (
      <div className={`${tagClass}--item`}>
        <BsTree className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if (
    (tagActive === true && content === "Mountainside") ||
    content === "mountainside"
  ) {
    return (
      <div className={`${tagClass}--item`}>
        <FaMountain className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else if ((tagActive === true && content === "City") || content === "city") {
    return (
      <div className={`${tagClass}--item`}>
        <FaCity className={`${tagClass}--icon`} />
        {content}
      </div>
    );
  } else {
    return "";
  }
}

Tags.propTypes = {
  tagActive: PropTypes.bool.isRequired,
  content: PropTypes.string,
  tagClass: PropTypes.string.isRequired,
};

export default Tags;
