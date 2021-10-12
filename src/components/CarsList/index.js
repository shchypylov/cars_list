import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, ListGroup, Spinner } from "react-bootstrap";

import { fetchData, getCarDescription, reportError } from "../../utils";
import { filtersContext } from "../../store";

import "./style.css";

const NAVIGATION = {
  PREVIOUS: "previous",
  NEXT: "next",
  FIRST: "first",
  LAST: "last",
};

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [carsMeta, setCarsMeta] = useState({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useContext(filtersContext);

  const fetchCars = async (page) => {
    setIsLoading(true);

    try {
      let queryString = `sort=asc&page=${page}`;

      if (!!state.color) {
        queryString = `${queryString}&color=${state.color}`;
      }
      if (!!state.manufacturer) {
        queryString = `${queryString}&manufacturer=${state.manufacturer}`;
      }
      const { totalCarsCount, totalPageCount, cars } = await fetchData({
        url: "https://auto1-mock-server.herokuapp.com/api/cars",
        params: queryString,
      });

      setCars(cars);
      setCarsMeta({
        totalCarsCount,
        totalPageCount,
      });
      setPage(page);
    } catch (e) {
      reportError(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    }
  };

  useEffect(() => {
    fetchCars(page);
  }, [state.color, state.manufacturer, page]);

  const handleNavigation = (step) => async () => {
    switch (step) {
      case NAVIGATION.NEXT:
        setPage((page) => page + 1);
        break;
      case NAVIGATION.PREVIOUS:
        setPage((page) => page - 1);
        break;
      case NAVIGATION.LAST:
        setPage(carsMeta.totalPageCount);
        break;
      case NAVIGATION.FIRST:
        setPage(1);
        break;
      default:
        setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex pt-5 justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <h1>Available cars</h1>
      <h3>Showing 10 of {carsMeta.totalCarsCount} results</h3>

      <ListGroup>
        {cars.map((c) => (
          <ListGroup.Item
            key={c.stockNumber}
            className="d-flex car-item"
            data-testid="carListItem"
          >
            <img
              src={c.pictureUrl}
              alt="carImage"
              className="car-item__image me-3"
            />
            <div className="d-flex car-item__info flex-column">
              <p className="car-item__title mb-1">
                <strong>
                  {c.manufacturerName} {c.modelName}
                </strong>
              </p>
              <p className="car-item__subtitle mb-1">{getCarDescription(c)}</p>
              <Button
                as={Link}
                to={`/cars/${c.stockNumber}`}
                variant="link"
                className="me-auto"
              >
                View details
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {carsMeta.totalPageCount > 1 ? (
        <nav className="d-flex align-items-center justify-content-center">
          {page > 1 ? (
            <ButtonGroup aria-label="Left pagination">
              <Button
                variant="link"
                onClick={handleNavigation(NAVIGATION.FIRST)}
              >
                First
              </Button>
              <Button
                variant="link"
                onClick={handleNavigation(NAVIGATION.PREVIOUS)}
              >
                Previous
              </Button>
            </ButtonGroup>
          ) : null}
          <div>
            Page {page} of {carsMeta.totalPageCount}
          </div>
          <ButtonGroup aria-label="Right pagination">
            <Button variant="link" onClick={handleNavigation(NAVIGATION.NEXT)}>
              Next
            </Button>
            <Button variant="link" onClick={handleNavigation(NAVIGATION.LAST)}>
              Last
            </Button>
          </ButtonGroup>
        </nav>
      ) : null}
    </div>
  );
};

export default CarsList;
