import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const API_KEY = '73efbb05a691a71033db9af2190896d5';

class Home extends Component {
  cityArrays = [];
  constructor() {
    super();
    this.state = {
      weather: [],
      cities: [
        "London,uk",
        "Paris,france",
        "Cairo,egypt",
        "Rome,italy",
        "manhattan,us"
      ]
    };
  }

  getPic = key => {
    this.img = {
      "London": "https://cdn.londonandpartners.com/-/media/images/london/visit/london-organisations/tower-bridge-exhibition/tower-bridge-homepage-image.jpg?mw=1920&hash=E19E0136A57855A8ED61B4E66EA72F1646CA8DAC" ,
      "Manhattan": "https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg",
      "Cairo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgv06-cTk1NoWperhGv9jYw0iwsNchXWbYZcg1WH_VLtx9BIPAKQ",
      "Rome": "https://lonelyplanetimages.imgix.net/mastheads/stock-photo-roman-sunset-77415821.jpg?sharp=10&vib=20&w=1200",
      "Paris": "https://www.telegraph.co.uk/content/dam/video_previews/v/2/v2exl2nje6lsczqgxklf2mh1qjkhmfu-xlarge.jpg",
    };
    return this.img[key];
  };
  

  getWeather = () => {
    this.state.cities.map(city =>
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
        )
        .then(res => {
          this.cityArrays = [...this.cityArrays, res.data];
          this.setState({ weather: this.cityArrays });
        })
    );
  };

  componentDidMount() {
    this.getWeather();
  }

  render() {
    return (
      <div>
        <ul className="list">
          {this.state.weather.map(city => (
            <Link to={`/city/${city.name},${city.sys.country}`}>
              <li>
                <div>
                  <img
                    src={`https://openweathermap.org/img/w/${
                      city.weather[0].icon
                    }.png`}
                  />{" "}
                </div>

                <div>
                  {city.name},{city.sys.country}
                </div>
                <div>
                  {" "}
                  {city.main.temp} <sup>o</sup>F{" "}
                </div>

                <div> {city.weather[0].main} </div>

                <div> {<img id = "pic" src= {this.getPic(city.name)} height="400" width="400"  />}</div>
              </li>
            </Link>
          ))}
        </ul>


      </div>
    );
  }
}
export default Home;
