//homework week 3
let weather = {
    paris: {
        temp: 19.7,
        humidity: 80
    },
    tokyo: {
        temp: 17.3,
        humidity: 50
    },
    lisbon: {
        temp: 30.2,
        humidity: 20
    },
    'san francisco': {
        temp: 20.9,
        humidity: 100
    },
    oslo: {
        temp: -5,
        humidity: 20
    }
};

const convertTemp = (temp, units) => {
    return units === 'cels' ? Math.round(((temp - 32) * 5) / 9) : Math.round((temp * 9) / 5 + 32);
};

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// const city = prompt('Enter a city').toLowerCase().trim();
// const allowedCities = Object.keys(weather);
// const isAllowedCity = allowedCities.find((elem) => elem === city);

// if (isAllowedCity) {
//     const temperature = Math.round(weather[isAllowedCity].temp);
//     const humidity = weather[isAllowedCity].humidity;
//     alert(
//         `It is currently ${temperature}°C (${convertTemp(temperature, 'cels')}°F) in ${capitalizeFirstLetter(
//             isAllowedCity
//         )} with a humidity of ${humidity}%`
//     );
// } else {
//     alert(
//         `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//     );
// }

//homework week 4
const dateContainer = document.querySelector('.current-date');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const currentBtn = document.querySelector('.current-submit');
const mainCity = document.querySelector('.main-city');
const unitCels = document.querySelector('.celsius');
const unitFarh = document.querySelector('.fahrenheit');
const temperature = document.querySelector('.temperature');
const temperatureInC = temperature.innerHTML;
const temperatureInF = convertTemp(temperatureInC, 'farh');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const now = new Date();
const currentDate = `${days[now.getDay()]}, ${now.getHours()}:${
    now.getMinutes() <= 9 ? '0' + now.getMinutes() : now.getMinutes()
}`;

dateContainer.innerHTML = currentDate;

const toggleUnitMark = () => {
    if (unitCels.classList.contains('marked')) {
        unitCels.classList.remove('marked');
        unitFarh.classList.add('marked');
    } else {
        unitFarh.classList.remove('marked');
        unitCels.classList.add('marked');
    }
};

const setCity = (city) => (mainCity.innerHTML = capitalizeFirstLetter(city.trim()));

const setTemp = (temp) => {
    toggleUnitMark();
    return (temperature.innerHTML = temp);
};

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    getForecast(searchInput.value);
    searchInput.value = '';
});

unitCels.addEventListener('click', () => setTemp(temperatureInC));
unitFarh.addEventListener('click', () => setTemp(temperatureInF));

//homework week 5
const apiKey = '1964d0a7118d50f00dc12a34ffef2fef';

function getForecast(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then((resp) => {
        updateForecast(resp);
    });
}

function updateForecast(cityForecast) {
    mainCity.innerHTML = capitalizeFirstLetter(cityForecast.data.name);
    temperature.innerHTML = Math.round(cityForecast.data.main.temp);
    description.innerHTML = cityForecast.data.weather[0].description;
    humidity.innerHTML = Math.round(cityForecast.data.main.humidity);
    wind.innerHTML = Math.round(cityForecast.data.wind.speed);
}

function getForecastWithCoord(position) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateForecast);
}

function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getForecastWithCoord);
}

currentBtn.addEventListener('click', getLocation);
