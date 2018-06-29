import React, { Component } from "react";
import "./App.css";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import WeatherSearch from "./components/weatherSearch";
import FiveDaysWeather from "./components/fiveDaysWeather";

class App extends Component {
  render() {
    return (
      <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/city/:city" component={WeatherSearch} />
          <Route exact path="/city/:city" component={FiveDaysWeather} />
      </div>
    );
  }
}
export default App;
