import { useState } from "react";
import Form from "react-bootstrap/Form";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function Chips() {
  const [amenities, setAmenities] = useState([]);
  const [amenitiesInputValue, setAmenitiesInputValue] = useState("");

  console.log(amenities);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setAmenities((amenity) => [
        ...amenities,
        { key: amenity.length + 1, label: event.target.value },
      ]);
      setAmenitiesInputValue("");
    }
  };

  const handleUserInput = (e) => {
    setAmenitiesInputValue(e.target.value);
  };

  const handleAmenitiyDelete = (chipsToDelete) => () => {
    setAmenities((chips) =>
      chips.filter((chip) => chip.key !== chipsToDelete.key)
    );
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicamenities">
        <Form.Label>amenities</Form.Label>
        <Form.Control
          type="text"
          placeholder="eg.['tag1','tag2','tag3']"
          onKeyPress={handleKeyPress}
          value={amenitiesInputValue}
          onChange={handleUserInput}
        />
        <Form.Control
          className="hidden"
          type="text"
          value={JSON.stringify(amenities)}
          readOnly
        />
        <Stack direction="row" spacing={1}>
          {amenities.map((amenity) => (
            <Chip
              key={amenity.key}
              label={amenity.label}
              onDelete={handleAmenitiyDelete(amenity)}
            />
          ))}
        </Stack>
      </Form.Group>
    </>
  );
}
