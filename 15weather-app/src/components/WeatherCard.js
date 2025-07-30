import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="weather-card">
      <h2>{weatherData.name}, {weatherData.sys.country}</h2>
      <div className="weather-main">
        <img 
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
          alt={weatherData.weather[0].description}
        />
        <div className="weather-temp">
          {Math.round(weatherData.main.temp)}°C
        </div>
      </div>
      <div className="weather-details">
        <p>{weatherData.weather[0].description}</p>
        <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
