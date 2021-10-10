import {Col, Container, Row} from "react-bootstrap";

import VehicleFilters from "../../components/VehicleFilters";
import VehiclesList from "../../components/VehiclesList";

const Home = () => {
    return (
        <Container>
            <Row>
                <Col xs={3}>
                    <VehicleFilters />
                </Col>
                <Col><VehiclesList /></Col>
            </Row>
        </Container>
    );
};

export default Home;
