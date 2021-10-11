import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../../pages/Home";
import Header from "../Header";
import NoMatch from "../NoMatch";
import Footer from "../Footer";
import Car from "../Car";

import "./style.css";
import Favourites from "../Favourites";

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Switch>
          <Route path="/purchase">
            <About />
          </Route>
          <Route path="/orders">
            <Users />
          </Route>
          <Route path="/sell">
            <Users />
          </Route>
          <Route exact path="/favourites">
            <Favourites />
          </Route>
          <Route exact path="/cars/:id">
            <Car />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
