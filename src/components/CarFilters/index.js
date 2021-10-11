import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { capitalize } from "../../utils";

const CarFilters = () => {
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    console.log(data.get("color"));
    console.log(data.get("manufacturer"));
  };

  useEffect(() => {
    const getColors = async () => {
      const { colors } = await fetch(
        "https://auto1-mock-server.herokuapp.com/api/colors",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((data) => data.json());

      setColors(colors);
    };

    getColors();
  }, []);

  useEffect(() => {
    const getManufacturers = async () => {
      const { manufacturers } = await fetch(
        "https://auto1-mock-server.herokuapp.com/api/manufacturers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((data) => data.json());
      const manufacturersNames = manufacturers.map((m) => m.name);

      setManufacturers(manufacturersNames);
    };

    getManufacturers();
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="carColor">
        <Form.Label>Color</Form.Label>
        <Form.Select name="color" aria-label="Default select example">
          <option value="all">All car colors</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {capitalize(color)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="carManufacturer">
        <Form.Label>Manufacturer</Form.Label>
        <Form.Select name="manufacturer" aria-label="Default select example">
          <option value="all">All manufacturers</option>
          {manufacturers.map((manufacturer) => (
            <option
              key={manufacturer.toLowerCase()}
              value={manufacturer.toLowerCase()}
            >
              {manufacturer}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Filter
      </Button>
    </Form>
  );
};

export default CarFilters;
