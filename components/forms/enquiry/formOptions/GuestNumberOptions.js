import PropTypes from "prop-types";

function GuestNumberOptions({ maximumGuests }) {
  if (maximumGuests === "one") {
    return (
      <>
        <option value="1">1</option>
      </>
    );
  } else if (maximumGuests === "two") {
    return (
      <>
        <option value="1">1</option>
        <option value="2">2</option>
      </>
    );
  } else if (maximumGuests === "three") {
    return (
      <>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </>
    );
  } else if (maximumGuests === "four") {
    return (
      <>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </>
    );
  } else if (maximumGuests === "five") {
    return (
      <>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </>
    );
  } else if (maximumGuests === "six") {
    return (
      <>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </>
    );
  } else if (maximumGuests === "seven") {
    return (
      <>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </>
    );
  } else if (maximumGuests === "eight") {
    return (
      <>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </>
    );
  } else if (maximumGuests === "nine") {
    return (
      <>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
      </>
    );
  } else if (maximumGuests === "ten") {
    return (
      <>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </>
    );
  }
}

GuestNumberOptions.propTypes = {
  maximumGuests: PropTypes.string.isRequired,
};

export default GuestNumberOptions;
