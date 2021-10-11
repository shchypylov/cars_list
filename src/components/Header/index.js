import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.png";

import "./style.css";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="header mb-5">
      <Container>
        <Navbar.Brand as={Link} to="/" className="header-logo">
          <img className="header-logo__image" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/purchase">
              Purchase
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              My Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/sell">
              Sell
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
