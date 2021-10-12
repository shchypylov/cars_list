import { useReducer } from "react";
import { Col, Container, Row } from "react-bootstrap";

import CarFilters from "../../components/CarFilters";
import CarsList from "../../components/CarsList";
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
      <Container>
        <Row>
          <Col xs={3}>
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
