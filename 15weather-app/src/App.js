import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

const API_KEY = "828cc99e0335c9476a8f751b7c386d9a";
const API_BASE = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('Mumbai'); // Default city

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_BASE}?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('City not found. Please check the city name and try again.');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setCity(cityName);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again later.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <SearchBar onSearch={fetchWeather} />
        
        {loading && <div className="loading">Loading weather data...</div>}
        {error && <div className="error">{error}</div>}
        {weatherData && !loading && <WeatherCard weatherData={weatherData} />}
      </header>
    </div>
  );
}

export default App;
