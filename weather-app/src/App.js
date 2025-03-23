import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                fetchWeather(latitude, longitude);
            },
            (error) => console.error("Error getting location:", error)
        );
    }, []);

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await axios.get(`http://localhost:8000/weather?lat=${lat}&lon=${lon}`);
            setWeather(response.data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className="App">
            <h2>Weather App</h2>
            {weather ? (
                <>
                    <h3>Current Weather in Your Location</h3>
                    <p>Temperature: {weather.current.temp}°C</p>
                    <p>Weather: {weather.current.weather[0].description}</p>

                    <h3>7-Day Forecast</h3>
                    <ul>
                        {weather.daily.slice(0, 7).map((day, index) => (
                            <li key={index}>
                                <p>Day {index + 1}: {day.temp.day}°C - {day.weather[0].description}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading weather...</p>
            )}
        </div>
    );
}

export default App;
