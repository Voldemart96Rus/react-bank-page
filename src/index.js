import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdministratorPanel from "./components/administratorPanelComponents/administratorPanel";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/admin" component={AdministratorPanel} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
