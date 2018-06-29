import React, { Component } from "react";
import axios from "axios";
import "./fiveDaysWeather.css";

class FiveDaysWeather extends Component {
  constructor() {
    super();
    this.state = {
      fiveDaysWeather: []
    };
  }

  get12Time = time => {
    if (Number(time) === 0) {
      return (time = 12 + "am");
    } else if (Number(time) === 12) {
      return (time = 12 + "pm");
    } else if (Number(time) > 12) {
      return time - 12 + "pm";
    } else {
      return Number(time) + "am";
    }
  };

  getMonths = key => {
    this.month = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sept",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec"
    };
    return this.month[key];
  };

  getFiveDaysWeather() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${
          this.props.match.params.city
        }&appid=73efbb05a691a71033db9af2190896d5&units=imperial`
      )
      .then(res => {
        this.setState({
          fiveDaysWeather: res.data.list.map(city => (
            <div className="flex-container2">
              <li>
                <div className="item4">
                  {" "}
                  {this.getMonths(city.dt_txt.slice(5, 7))}{" "}
                  {Number(city.dt_txt.slice(8, 11))}{" "}
                  {this.get12Time(city.dt_txt.slice(11, 13))}{" "}
                </div>
                <div className="item3">
                  <img
                    src={`http://openweathermap.org/img/w/${
                      city.weather[0].icon
                    }.png`}
                  />
                </div>
                <div className="item5">
                  {Math.round(city.main.temp)}
                  <sup>o</sup>F{" "}
                </div>
                <div className="item1">{city.weather[0].main} </div>
              </li>
            </div>
          ))
        });
      });
  }

  componentDidMount() {
    this.getFiveDaysWeather();
  }

  render() {
    return (
      <div>
        <ul className="list2"> {this.state.fiveDaysWeather} </ul>{" "}
      </div>
    );
  }
}
export default FiveDaysWeather;
