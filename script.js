const apiKey = 'f73047b5a66a35408adf02e6d5bab0ec'; // Your API key
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherDetails = document.getElementById('weatherDetails');
const weatherInfo = document.getElementById('weatherInfo');
const weatherIcon = document.getElementById('weatherIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const loading = document.getElementById('loading');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    loading.classList.remove('hidden');
    weatherDetails.classList.add('hidden');
    document.body.className = ''; // Reset the class on body

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    
    if (response.ok) {
        const { main, weather, wind } = data;
        weatherInfo.textContent = `Weather in ${city}: ${weather[0].description}`;
        humidity.textContent = `Humidity: ${main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${wind.speed} m/s`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

        // Set body class based on weather condition
        document.body.classList.add(getWeatherClass(weather[0].main));
        
        weatherDetails.classList.remove('hidden');
    } else {
        weatherInfo.textContent = `City not found`;
        document.body.className = ''; // Reset the class on body
    }
    
    loading.classList.add('hidden');
}

function getWeatherClass(condition) {
    switch (condition) {
        case 'Clear':
            return 'clear';
        case 'Clouds':
            return 'few-clouds'; // Adjust based on specific conditions
        case 'Scattered clouds':
            return 'scattered-clouds';
        case 'Broken clouds':
            return 'broken-clouds';
        case 'Shower rain':
            return 'shower-rain';
        case 'Rain':
            return 'rain';
        case 'Thunderstorm':
            return 'thunderstorm';
        case 'Snow':
            return 'snow';
        case 'Mist':
            return 'mist';
        case 'Fog':
            return 'fog';
        default:
            return 'clear'; // Default fallback
    }
}
