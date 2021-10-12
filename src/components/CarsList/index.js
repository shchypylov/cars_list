import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, ListGroup } from "react-bootstrap";

import Loader from "../Loader";
import { fetchData, getCarDescription, reportError } from "../../utils";
import { filtersContext } from "../../store";

import "./style.css";

const NAVIGATION = {
  PREVIOUS: "previous",
  NEXT: "next",
  FIRST: "first",
  LAST: "last",
};

const CARS_FETCH_AMOUNT = 10;

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
        url: "/api/cars",
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
      setIsLoading(false);
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
        return;
    }
  };

  if (isLoading || !cars) {
    return <Loader />;
  }

  const showingAmount =
    cars.length === CARS_FETCH_AMOUNT
      ? cars.length * page
      : CARS_FETCH_AMOUNT * (page - 1) + cars.length;

  return (
    <div className="list">
      <h1 className="list__title fw-bold mb-2">Available cars</h1>
      <h2 className="list__subtitle mb-4">
        Showing {showingAmount} of {carsMeta.totalCarsCount} results
      </h2>

      <ListGroup className="mb-3">
        {cars.map((c) => (
          <ListGroup.Item
            key={c.stockNumber}
            className="d-flex car-item"
            data-testid="carListItem"
          >
            <div className="car-item__image d-flex align-items-center justify-content-center me-3">
              <img src={c.pictureUrl} alt="carImage" />
            </div>
            <div className="d-flex car-item__info flex-column">
              <p className="car-item__title fw-bold mb-1">
                <strong>
                  {c.manufacturerName} {c.modelName}
                </strong>
              </p>
              <p className="car-item__subtitle mb-1">{getCarDescription(c)}</p>
              <Button
                as={Link}
                to={`/cars/${c.stockNumber}`}
                variant="link"
                className="me-auto ps-0"
              >
                View details
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {carsMeta.totalPageCount > 1 ? (
        <nav className="d-flex align-items-center justify-content-center mb-3">
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
          <span>
            Page {page} of {carsMeta.totalPageCount}
          </span>
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
