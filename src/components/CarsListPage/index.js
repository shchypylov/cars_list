import { useReducer } from "react";
import { Col, Container, Row } from "react-bootstrap";

import CarFilters from "../CarFilters";
import CarsList from "../CarsList";
import {
  filtersContext,
  filtersReducer,
  initialFiltersReducerState,
} from "../../store";

const Home = () => {
  const [state, dispatch] = useReducer(
    filtersReducer,
    initialFiltersReducerState
  );
  const contextValue = {
    state,
    dispatch,
  };

  return (
    <filtersContext.Provider value={contextValue}>
      <Container className="mt-5">
        <Row>
          <Col md={4} className="mb-4">
            <CarFilters />
          </Col>
          <Col>
            <CarsList />
          </Col>
        </Row>
      </Container>
    </filtersContext.Provider>
  );
};

export default Home;
