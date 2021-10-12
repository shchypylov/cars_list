import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

import Loader from "../Loader";
import {
  fetchData,
  getCarDescription,
  getLocalStorageCars,
  reportError,
  setLocalStorageCars,
} from "../../utils";

import "./style.css";

const getBackgroundColor = (color) => {
  switch (color) {
    case "black":
      // black svg is not visible on black background :)
      return "#424242";
    default:
      return color;
  }
};

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
          url: `/api/cars/${id}`,
        });

        setCar(car);
      } catch (e) {
        reportError(e);
      } finally {
        setIsLoading(false);
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
  }, [id]);

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
    return <Loader />;
  }

  return (
    <Card className="vehicle">
      <div
        style={{ backgroundColor: getBackgroundColor(car.color) }}
        className="vehicle__image d-flex align-items-center justify-content-center mb-2"
      >
        <Card.Img variant="top" src={car.pictureUrl} />
      </div>
      <Card.Body className="d-flex px-3 m-auto vehicle__info">
        <Container className="mt-5">
          <Row>
            <Col md={7} className="mb-4">
              <div className="pe-4">
                <Card.Title className="vehicle__info-title fw-bold mb-4">{`${car.manufacturerName} ${car.modelName}`}</Card.Title>
                <Card.Subtitle className="vehicle__info-subtitle mb-4">
                  {getCarDescription(car)}
                </Card.Subtitle>
                <Card.Text className="vehicle__info-text">
                  This car is currently available and can be delivered as soon
                  as tomorrow morning. Please be aware that delivery times shown
                  in this page are not definitive and may change due to bad
                  weather conditions.
                </Card.Text>
              </div>
            </Col>
            <Col>
              <div className="d-flex flex-column favourites align-self-start px-3 py-4">
                {!isCarFavourite ? (
                  <>
                    <p>
                      If you like this car, click the button and save it in your
                      collection of favourite items.
                    </p>

                    <Button
                      className="ms-auto"
                      data-testid="saveButton"
                      onClick={handleSaveFavourite}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <div className="d-flex">
                    <p className="mb-0">
                      Car is already in your{" "}
                      <Link
                        data-testid="favouritesListButton"
                        className="fw-bold"
                        as={Link}
                        to="/favourites"
                      >
                        favourites list!
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Car;
