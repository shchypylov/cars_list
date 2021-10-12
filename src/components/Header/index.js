import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../../img/logo.png";

import "./style.css";

const Header = () => {
  return (
    <Navbar className="header p-md-4 p-sm-1">
      <Container>
        <Navbar.Brand as={Link} to="/" className="header-logo">
          <img className="header-logo__image" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav>
            <Nav.Link className="nav-item" as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link className="nav-item" as={Link} to="/favourites">
              Favourites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
