import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.png";

import "./style.css";

const NoMatch = () => (
  <div className="d-flex align-items-center flex-column no-match pt-5">
    <img src={logo} alt="logo" className="no-match__logo mb-3" />
    <h2 className="mb-3">404 - Not Found</h2>
    <h6>Sorry, the page you are looking for does not exist</h6>
    <h6>
      You can always go back to the <Link to="/">homepage</Link>.
    </h6>
  </div>
);

export default NoMatch;
