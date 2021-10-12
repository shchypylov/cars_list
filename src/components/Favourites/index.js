import { Alert, Button, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  getCarDescription,
  getLocalStorageCars,
  reportError,
  setLocalStorageCars,
} from "../../utils";

import "./style.css";

const Favourites = () => {
  const [cars, setCars] = useState({});
  const history = useHistory();

  useEffect(() => {
    try {
      const localStorageCars = getLocalStorageCars();

      setCars(localStorageCars);
    } catch (e) {
      reportError(e);
    }
  }, []);

  const carsList = Object.values(cars);

  const handleNavigation = (id) => () => {
    history.push(`/cars/${id}`);
  };

  const handleRemove = (id) => (e) => {
    e.stopPropagation();

    const newCars = {
      ...cars,
      [id]: undefined,
    };

    try {
      setLocalStorageCars(newCars);

      setCars(JSON.parse(JSON.stringify(newCars)));
    } catch (e) {
      reportError(e);
    }
  };

  if (carsList.length === 0) {
    return (
      <Alert variant="warning" className="m-4">
        No favourite cars yet. Add some on{" "}
        <Alert.Link as={Link} to="/">
          home page!
        </Alert.Link>
      </Alert>
    );
  }

  return (
    <ListGroup className="favourites mx-auto mt-5 p-3">
      {carsList.map((car) => (
        <ListGroup.Item
          className="favourites__item d-flex align-items-center p-3"
          key={car.stockNumber}
          onClick={handleNavigation(car.stockNumber)}
        >
          <span>
            {car.manufacturerName} {car.modelName} - {getCarDescription(car)}
          </span>
          <Button
            className="ms-auto"
            variant="danger"
            onClick={handleRemove(car.stockNumber)}
          >
            Remove
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Favourites;
