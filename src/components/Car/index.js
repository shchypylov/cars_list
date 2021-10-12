import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Spinner } from "react-bootstrap";

import {
  fetchData,
  getCarDescription,
  getLocalStorageCars,
  reportError,
  setLocalStorageCars,
} from "../../utils";

import "./style.css";

const Car = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState();
  const [isCarFavourite, setIsCarFavorite] = useState(false);
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      setIsLoading(true);
      try {
        const { car } = await fetchData({
          url: `https://auto1-mock-server.herokuapp.com/api/cars/${id}`,
        });

        setCar(car);
      } catch (e) {
        reportError(e);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 250);
      }
    };

    try {
      const localStorageCars = getLocalStorageCars();

      if (localStorageCars[id]) {
        setIsCarFavorite(true);
      }
    } catch (e) {
      reportError(e);
    }

    fetchCar();
  }, []);

  const handleSaveFavourite = () => {
    try {
      const cars = getLocalStorageCars();

      const newCars = {
        ...cars,
        [id]: car,
      };

      setLocalStorageCars(newCars);

      setIsCarFavorite(true);
    } catch (e) {
      reportError(e);
    }
  };

  if (isLoading || !car) {
    return (
      <div className="d-flex pt-5 justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="vehicle">
      <Card>
        <Card.Img
          variant="top"
          src={car.pictureUrl}
          className="vehicle__image m-auto"
        />
        <Card.Body className="d-flex px-5 m-auto vehicle__info">
          <div className="pe-4">
            <Card.Title>{`${car.manufacturerName} ${car.modelName}`}</Card.Title>
            <Card.Subtitle>{getCarDescription(car)}</Card.Subtitle>
            <Card.Text>
              This car is currently available and can be delivered as soon as
              tomorrow morning. Please be aware that delivery times shown in
              this page are not definitive and may change due to bad weather
              conditions.
            </Card.Text>
          </div>

          <div className="d-flex flex-column">
            {!isCarFavourite ? (
              <>
                If you like this car, click the button and save it in your
                collection of favourite items.
                <Button
                  className="ms-auto"
                  data-testid="saveButton"
                  onClick={handleSaveFavourite}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                Car is already in your
                <Button
                  variant="link"
                  data-testid="favouritesListButton"
                  as={Link}
                  to="/favourites"
                >
                  favourites list
                </Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Car;
