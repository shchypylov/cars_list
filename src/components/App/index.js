import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../CarsListPage";
import Favourites from "../Favourites";
import Header from "../Header";
import NoMatch from "../NoMatch";
import Footer from "../Footer";
import Car from "../Car";

import "./style.css";

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Header />
      <Switch>
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

export default App;
