import { Button, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";

import { capitalize, fetchData, reportError } from "../../utils";
import { filtersContext } from "../../store";

import "./style.css";

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
          url: `/api/colors`,
        });

        setColors(colors);
      } catch (e) {
        reportError(e);
      }
    };

    const getManufacturers = async () => {
      try {
        const { manufacturers } = await fetchData({
          url: "/api/manufacturers",
        });
        const manufacturersNames = manufacturers.map((m) => m.name);

        setManufacturers(manufacturersNames);
      } catch (e) {
        reportError(e);
      }
    };

    getColors();
    getManufacturers();
  }, []);

  return (
    <Form className="d-flex flex-column filters p-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-2" controlId="carColor">
        <Form.Label>Color</Form.Label>
        <Form.Select
          name="color"
          aria-label="Default select example"
          data-testid="colorSelect"
        >
          <option value="all" data-testid="colorSelectOption">
            All car colors
          </option>
          {colors.map((color) => (
            <option key={color} value={color} data-testid="colorSelectOption">
              {capitalize(color)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4" controlId="carManufacturer">
        <Form.Label>Manufacturer</Form.Label>
        <Form.Select
          name="manufacturer"
          aria-label="Manufacturer select"
          data-testid="manufacturerSelect"
        >
          <option value="all" data-testid="manufacturerSelectOption">
            All manufacturers
          </option>
          {manufacturers.map((manufacturer) => (
            <option
              key={manufacturer.toLowerCase()}
              value={manufacturer.toLowerCase()}
              data-testid="manufacturerSelectOption"
            >
              {manufacturer}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" className="ms-auto" type="submit">
        Filter
      </Button>
    </Form>
  );
};

export default CarFilters;
