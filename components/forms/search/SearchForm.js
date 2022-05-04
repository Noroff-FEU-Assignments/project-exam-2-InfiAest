import Form from "react-bootstrap/Form";
import axios from "axios";
import { BASE_URL } from "../../../constants/api";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchForm() {
  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [buttonHref, setButtonHref] = useState("");
  const [searchDisabled, setSearchDisabled] = useState(true);

  useEffect(() => {
    const url = BASE_URL + "accomodations";
    const loadResults = async () => {
      const response = await axios.get(url);
      // console.log(response.data.data);
      setResults(response.data.data);
    };
    loadResults();
  }, []);

  const onSelectSuggestion = (suggestion) => {
    console.log(suggestion);
    setText(suggestion.attributes.name);
    setSuggestions([]);
    setButtonHref(`/accomodations/${suggestion.id}`);
    setSearchDisabled(false);
  };

  const onChangeHandler = (text) => {
    setButtonHref("");
    setSearchDisabled(true);
    let matches = [];
    if (text.length > 0) {
      matches = results.filter((result) => {
        const regex = new RegExp(`${text}`, "gi");
        return result.attributes.name.match(regex);
      });
    }
    // console.log(matches);
    setSuggestions(matches);
    setText(text);
  };

  return (
    <div className="search__form--container">
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            placeholder="Search here"
            onChange={(e) => onChangeHandler(e.target.value)}
            value={text}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions([]);
              }, 100);
            }}
          />
          <Button
            href={buttonHref}
            variant="link"
            className="search__form--button"
            disabled={searchDisabled}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
          <div className="list-container">
            <ListGroup variant="flush">
              {suggestions &&
                suggestions.map((suggestion, i) => (
                  <ListGroup.Item
                    key={i}
                    action
                    onClick={() => onSelectSuggestion(suggestion)}
                  >
                    {suggestion.attributes.name}
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
