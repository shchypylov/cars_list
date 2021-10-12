import { Button, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

import { capitalize, fetchData, reportError } from "../../utils";
import { filtersContext } from "../../store";

const CarFilters = () => {
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const { dispatch } = useContext(filtersContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const color = data.get("color");
    const manufacturer = data.get("manufacturer");

    dispatch({
      type: "SET_COLOR",
      payload: color === "all" ? null : color,
    });

    dispatch({
      type: "SET_MANUFACTURER",
      payload: manufacturer === "all" ? null : manufacturer,
    });
  };

  useEffect(() => {
    const getColors = async () => {
      try {
        const { colors } = await fetchData({
          url: "https://auto1-mock-server.herokuapp.com/api/colors",
        });

        setColors(colors);
      } catch (e) {
        reportError(e);
      }
    };

    getColors();
  }, []);

  useEffect(() => {
    const getManufacturers = async () => {
      try {
        const { manufacturers } = await fetchData({
          url: "https://auto1-mock-server.herokuapp.com/api/manufacturers",
        });
        const manufacturersNames = manufacturers.map((m) => m.name);

        setManufacturers(manufacturersNames);
      } catch (e) {
        reportError(e);
      }
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
