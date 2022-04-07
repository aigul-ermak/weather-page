import React, {useEffect, useState} from 'react';


function App() {
    const [data, setData] = useState([])
    const [lat, setLat] = useState([])
    const [long, setLong] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            })
            console.log(lat)
            console.log(long)

            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e683ec2d69fd7686494f707d3ab8080d`
            )
                .then(res => res.json())
                .then(result => {
                    setData(result)
                    console.log(result)
                })
        }
        fetchData();

    }, [lat, long])


    return (
        <div className="App">
            <div className='container'>
                <div className='top'>
                    <div className="location">
                        <p>City name: {data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{Math.ceil((data.main.temp - 273.15))} &deg;C</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                <div className="middle">
                    <div className="sunrise">
                        {data.sys ?
                            <p className='bold'>{new Date(data.sys.sunrise * 1000).toLocaleTimeString('eb-IN')}</p> : null}
                        <p>Sunrise</p>
                    </div>
                    <div className="sunset">
                        {data.sys ?
                            <p className='bold'>{new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p> : null}
                        <p>Sunset</p>
                    </div>
                </div>
                <div className="bottom">
                    <div className="feels">
                        {data.main ?
                            <p className='bold'>{Math.ceil((data.main.feels_like - 273.15))} &deg;C</p> : null}

                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        {data.wind ? <p className='bold'>{data.wind.speed}</p> : null}
                        <p>Wind</p>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default App;
