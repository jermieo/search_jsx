import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";

function App() {
  const [search, setValue] = useState([]);
  const [event, setEvent] = useState("");
  const [search1, setValue1] = useState([]);
  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken")
      .then((res) => setValue(res.data.meals))
      .catch(console.log(Error));
  }, []);
  useEffect(() => {
    if (event.length === 0) {
      setValue1(search);
    } else {
      let filterArray = search.filter((item) =>
        item.strMeal.toLowerCase().includes(event.toLowerCase())
      );
      setValue1(filterArray);
      console.log(filterArray, "filterArray");
      if (filterArray.length === 0) {
        alert("No Foods Found");
        return;
      }
    }
  }, [event, search]);
  const changeFunction = (e) => {
    setEvent(e.target.value);
  };

  console.log(search, "serach");
  console.log(event, "event");

  return (
    <>
      <Container className="text-bg-warning pt-4" fluid>
        <h3 className="text-center fw-bold">MealsDB</h3>
        <div className="d-flex justify-content-center">
          <InputGroup className="font-weight-light" style={{ width: "300px" }}>
            <InputGroup.Text id="basic-addon1">
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Enter Food Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              // onChange={(e) => setEvent(e.target.value)}
              onChange={changeFunction}
            />
            <Button variant="danger">Search</Button>
          </InputGroup>
        </div>
        <div>
          <Row>
            <Col className="d-flex flex-wrap justify-content-evenly">
              {search1.map((value) => {
                return (
                  <>
                    <Card
                      style={{ width: "12rem" }}
                      className="text-bg-danger m-5"
                    >
                      <Card.Body>
                        <Image
                          src={value.strMealThumb}
                          rounded
                          style={{ width: "150px" }}
                        />
                        <Card.Title className="fs-6 mx-3">
                          {value.strMeal}
                        </Card.Title>
                        <a
                          href={value.strYoutube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mx-3"
                        >
                          <Button variant="primary">Watch Video</Button>
                        </a>
                      </Card.Body>
                    </Card>
                  </>
                );
              })}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default App;
