import { Col, Container, Row } from "react-bootstrap";

import CarFilters from "../../components/CarFilters";
import CarsList from "../../components/CarsList";

const Home = () => {
  return (
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
  );
};

export default Home;
