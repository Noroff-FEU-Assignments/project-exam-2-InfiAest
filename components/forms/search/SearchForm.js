import Form from "react-bootstrap/Form";
import axios from "axios";
import { BASE_URL } from "../../../constants/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();

  useEffect(() => {
    const url = BASE_URL + "accomodations";
    async function loadResults() {
      try {
        const response = await axios.get(url);
        // console.log(response.data.data);
        setResults(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadResults();
  }, []);

  function onSelectSuggestion(suggestion) {
    // console.log(suggestion);
    setText(suggestion.attributes.name);
    setSuggestions([]);
    setButtonHref(`/accomodation/${suggestion.id}`);
    setSearchDisabled(false);
    router.push(`/accomodation/${suggestion.id}`);
  }

  function onChangeHandler(text) {
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
  }

  return (
    <div className="searchForm">
      <Form>
        <Form.Group className="searchForm__group">
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
            className="searchForm__button"
            disabled={searchDisabled}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="searchForm__button--icon"
            />
          </Button>
          <div className="searchForm__list">
            <ListGroup variant="flush" className="searchForm__listGroup">
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
