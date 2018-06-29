import React, { Component } from "react";
import axios from "axios";
import "./weatherSearch.css";

const API_KEY = '73efbb05a691a71033db9af2190896d5';

class WeatherSearch extends Component {
  constructor() {
    super();
    this.state = {
      cityname: "",
      country: "",
      weatherType: "",
      weatherDescription: "",
      temp: "",
      humidity: "",
      windSpeed: "",
      icon:""
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${
          this.props.match.params.city
        }&appid=${API_KEY}&units=imperial`
      )
      .then(res => {
        this.setState({
          cityname: res.data.name,
          country: res.data.sys.country,
          weatherType: res.data.weather[0].id,
          weatherType: res.data.weather[0].main,
          weatherDescription: res.data.weather[0].description,
          icon: res.data.weather[0].icon,
          temp: res.data.main.temp,
          humidity: res.data.main.humidity,
          windSpeed: res.data.wind.speed,
          temp_max:res.data.main.temp_max,
          temp_min:res.data.main.temp_min
        });
      });
  }

  render() {
    const {
        cityname,
        country,
        weatherType,
        weatherDescription,
        temp,
        humidity,
        windSpeed,
        icon,
        temp_min,
        temp_max
      } = this.state;
    return (
        <div className="grid-container" >
            <div className="weather_display">
                <div className="header">
                    <div className="title">
                        <div className="location"> {cityname}{"  "}{country} </div>
                    </div>
                </div>
               <div> {Date().slice(0,10)} </div>
                <div className="data">
                    <div className="icon_weather"> <img src={`http://openweathermap.org/img/w/${icon}.png`} /> </div>
                    <div className="temp">{Math.round(temp)} <sup>o</sup>F </div>
                    <div className="weatherType"> {weatherType} </div>
                    <div className="description">
                        <div className="humidity">  Humidity{'          '}{humidity} </div>
                        <div className="windSpeed"> Wind speed{'          '}{windSpeed} </div>
                        <div className="temp_max"> Max{'          '}{temp_max}  <sup>o</sup>f </div>
                        <div className="temp_min"> Min{'          '}{temp_min}  <sup>o</sup>f </div>
                        <div className="weatherDescription"> {weatherDescription} </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
  }
}
export default WeatherSearch;
