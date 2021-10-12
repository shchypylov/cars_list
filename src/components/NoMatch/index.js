import { Link } from "react-router-dom";

import logo from "../../img/logo.png";

import "./style.css";

const NoMatch = () => (
  <div className="d-flex align-items-center flex-column no-match p-3">
    <img src={logo} alt="logo" className="no-match__logo mb-3" />
    <h1 className="mb-4 fw-bold">404 - Not Found</h1>
    <p className="mb-3 fs-5">
      Sorry, the page you are looking for does not exist
    </p>
    <p className="fs-5">
      You can always go back to the <Link to="/">homepage</Link>.
    </p>
  </div>
);

export default NoMatch;
