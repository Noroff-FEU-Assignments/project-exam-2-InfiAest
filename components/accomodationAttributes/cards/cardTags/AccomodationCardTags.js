import PropTypes from "prop-types";
import Tags from "../../../../utils/icons/Tags";

function AccomodationCardTags({
  aircon,
  pets,
  couples,
  families,
  groups,
  single,
  wifi,
}) {
  return (
    <div className="accomodationCard__tags">
      <Tags
        tagActive={aircon}
        content="Aircon"
        tagClass="accomodationCard__tags"
      />
      <Tags
        tagActive={pets}
        content="Pets allowed"
        tagClass="accomodationCard__tags"
      />
      <Tags
        tagActive={couples}
        content="Couples"
        tagClass="accomodationCard__tags"
      />
      <Tags
        tagActive={families}
        content="Families"
        tagClass="accomodationCard__tags"
      />
      <Tags
        tagActive={groups}
        content="Groups"
        tagClass="accomodationCard__tags"
      />
      <Tags tagActive={wifi} content="WiFi" tagClass="accomodationCard__tags" />
      <Tags
        tagActive={single}
        content="Single travellers"
        tagClass="accomodationCard__tags"
      />
    </div>
  );
}

export default AccomodationCardTags;

AccomodationCardTags.propTypes = {
  aircon: PropTypes.bool.isRequired,
  pets: PropTypes.bool.isRequired,
  couples: PropTypes.bool.isRequired,
  families: PropTypes.bool.isRequired,
  groups: PropTypes.bool.isRequired,
  single: PropTypes.bool.isRequired,
  wifi: PropTypes.bool.isRequired,
};
