import { useState } from 'react';

import weatherStyle from '/styles/pages/matchup-and-linehistory/partials/Weather.module.scss';
import toggleStyle from '/styles/components/Toggle.module.scss';

const winds = [
    'N', 'N - NE', 'NE', 'E - NE', 'E',
    'E - SE', 'SE', 'S - SE', 'S', 'S - SW',
    'SW', 'W - SW', 'W', 'W - NW', 'NW', 'N - NW', 'N',
  ]

const Weather = ({ data, date }) => {
    const WINDS_PRECISION = 22.5 // 22.5 means a prediction of 17 different winds
    const eventsHour = Number(`${new Date(date).getUTCHours()}00`);
    const hourlyInfo = getHourlyInfo(data, eventsHour);

    const [temperature, setTemperature] = useState(hourlyInfo?.tempF);
    const [tempDefault, setTempDefault] = useState('°F');

    // if the weather data is incomplete return here and ignore further calcs
    if (hourlyInfo == undefined) {
        return <p>No weather information available</p>
    }

    const windSpeed = hourlyInfo.windspeedMiles;
    const windDegree = hourlyInfo.winddirDegree;
    const windInfo = `${windSpeed}mi ${winds[Math.round(windDegree / WINDS_PRECISION)]}`;
    const chanceOfRain = hourlyInfo.chanceofrain * ((hourlyInfo.chanceofrain || 0) > 1 ? 1 : 100);

    const toggleTemperature = (e) => {
        let value = e.target.getAttribute("data-temp");
        if (value === '°F' && value !== tempDefault) {
            setTempDefault('°F');
            setTemperature(hourlyInfo.tempF);
         }else if (value === '°C' && value !== tempDefault) {
            setTempDefault('°C');
            setTemperature(hourlyInfo.tempC);
         }
    }

    return (
        <>
            <div className={weatherStyle.TemperatureGrid}>
                <div className={weatherStyle.TemperatureNow}>{temperature} {tempDefault}</div>
                <div className={toggleStyle.Toggle}
                    onClick={toggleTemperature}
                    data-temp={tempDefault}>
                    <span className={`${toggleStyle.ToggleItem} ${(tempDefault === '°F') ? toggleStyle.Selected : toggleStyle.NoSelected}`}
                        data-temp="°F">°F</span>
                    <span className={`${toggleStyle.ToggleItem} ${(tempDefault === '°C') ? toggleStyle.Selected : toggleStyle.NoSelected}`}
                        data-temp="°C">°C</span>
                </div>
            </div>
            <div className={weatherStyle.WeatherInfo}>
                <p>
                    Wind: {windInfo}
                    {
                        !isNaN(chanceOfRain) ?
                        <>
                            <br />
                            Precipitation Prob: {chanceOfRain}%
                        </>
                        :
                        null
                    }
                </p>
            </div>
        </>
    )
}

export default Weather;

// ensure the returned JSON contains the necessary data
function getHourlyInfo(data, eventsHour){
    try {
        return data.weather[0].hourly.find(({ UTCtime }) => UTCtime == eventsHour);
    }
    catch(err) {
        return undefined;
    }
}
