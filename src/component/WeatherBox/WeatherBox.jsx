import React, { useEffect, useState } from 'react'
import './WeatherBox.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import humidity_icon from '../Assets/humidity.png'
import wind_icon from '../Assets/wind.png'

//api link = https://api.openweathermap.org/data/2.5/weather?q={city name}&units=Metric&appid={e0f653b126417934ca2030017a7c4ccc}

const WeatherBox = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState();
    const [displayIcon, setDisplayIcon] = useState();

    const fetchApi = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=5946439d3963a0829522601d1a8418af`;
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data.weather);
        setCity(data);


        if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
            setDisplayIcon(clear_icon)
        }
        else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
            setDisplayIcon(cloud_icon)
        }
        else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
            setDisplayIcon(drizzle_icon)
        }
        else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
            setDisplayIcon(drizzle_icon)
        }
        else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
            setDisplayIcon(rain_icon)
        }
        else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
            setDisplayIcon(rain_icon)
        }
        else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
            setDisplayIcon(snow_icon)
        }
        else if (data.weather[0].icon === '50d' || data.weather[0].icon === '50n') {
            setDisplayIcon(rain_icon)
        }
        else {
            setDisplayIcon(clear_icon)
        }
    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input
                    type='search'
                    className='cityInput'
                    placeholder='Search'
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <div className="search-icon" onClick={fetchApi}>
                    <img src={search_icon} alt='Search' />
                </div>
            </div>
            {!city ? (
                <p>No Data Found</p>
            ) : (
                <>
                    <div className='weather-image'>
                        <img src={displayIcon} alt='Weather' />
                    </div>
                    <div className="temp">{city.main.temp}°c</div>
                    <div className="temp-range">
                        <div className='data'>High: {city.main.temp_max}°c</div>
                        <div className='data'>Low: {city.main.temp_min}°c</div>
                    </div>
                    <div className="location">{city.name}</div>
                    <div className="data-container">
                        <div className="element">
                            <img src={humidity_icon} className='icon' alt='Humidity' />
                            <div className="data">
                                <div className="humidity">{city.main.humidity}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
                        <div className="element">
                            <img src={wind_icon} className='icon' alt='Wind' />
                            <div className="data">
                                <div className="humidity">{city.wind.speed} km/h</div>
                                <div className="text">Wind Speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}


        </div>
    )
}

export default WeatherBox