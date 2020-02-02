import React from 'react';
import Weather from './component/Weather'
import Form from './component/Form'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css';

const API_key = '109941afc74141ed885b1ff548be65de';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calCelsius(temp) {
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        return icons.Thunderstorm;
      case rangeId >= 300 && rangeId <= 321:
        return icons.Drizzle;
      case rangeId >= 500 && rangeId <= 521:
        return icons.Rain;
      case rangeId >= 600 && rangeId <= 622:
        return icons.Snow;
      case rangeId >= 701 && rangeId <= 781:
        return icons.Atmosphere;
      case rangeId === 800:
        return icons.Clear;
      case rangeId >= 801 && rangeId <= 804:
        return icons.Clouds;
      default:
        return icons.Clouds;
    }
  }

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_key}`);
      const response = await api_call.json();
      this.setState({
        city: response.name,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        icon: this.getWeatherIcon(this.weatherIcon, response.weather[0].id),
        error: false
      })
    } else {
      this.setState({error: true});
    }
  }

  render() {
    return (
      <div className='App'>
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          celsius={this.state.celsius}
          description={this.state.description}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          icon={this.state.icon}
        />
      </div>
    );
  }
}


export default App;
