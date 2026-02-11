// API Configuration
const apiKey = '66232a515ebcf35084dc9c20333dfc52';
let currentCity = 'New York';
let isFavorite = false;
let isDarkMode = false;

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const currentLocationBtn = document.getElementById('current-location-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const themeToggle = document.getElementById('theme-toggle');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

// Weather Data Elements
const weatherIcon = document.getElementById('weather-icon');
const weatherStatus = document.getElementById('weather-status');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const cityName = document.getElementById('city-name');
const dateTime = document.getElementById('date-time');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const updateTime = document.getElementById('update-time');
const forecastContainer = document.getElementById('forecast-container');

// Format current date and time
function formatDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} • ${timeStr}`;
}

// Show notification
function showNotification(message, type = 'info') {
    notificationText.textContent = message;
    
    // Set color based on type
    if (type === 'success') {
        notification.style.background = '#4CAF50';
    } else if (type === 'error') {
        notification.style.background = '#f44336';
    } else if (type === 'warning') {
        notification.style.background = '#ff9800';
    } else {
        notification.style.background = '#4361ee';
    }
    
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Get weather icon based on OpenWeather code
function getWeatherIcon(iconCode, isDay = true) {
    // Default to day icon if we can't determine
    const suffix = isDay ? 'd' : 'n';
    return `https://openweathermap.org/img/wn/${iconCode.replace('n', 'd').replace('d', suffix)}@2x.png`;
}

// Get weather description
function getWeatherDescription(weatherId) {
    // Weather condition codes from OpenWeatherMap
    if (weatherId >= 200 && weatherId < 300) {
        return 'Thunderstorm';
    } else if (weatherId >= 300 && weatherId < 400) {
        return 'Drizzle';
    } else if (weatherId >= 500 && weatherId < 600) {
        return 'Rain';
    } else if (weatherId >= 600 && weatherId < 700) {
        return 'Snow';
    } else if (weatherId >= 700 && weatherId < 800) {
        return 'Atmosphere';
    } else if (weatherId === 800) {
        return 'Clear Sky';
    } else if (weatherId > 800 && weatherId < 900) {
        return 'Clouds';
    } else {
        return 'Unknown';
    }
}

// Get weather icon class for forecast
function getWeatherIconClass(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return 'fas fa-bolt';
    } else if (weatherId >= 300 && weatherId < 400) {
        return 'fas fa-cloud-rain';
    } else if (weatherId >= 500 && weatherId < 600) {
        return 'fas fa-cloud-showers-heavy';
    } else if (weatherId >= 600 && weatherId < 700) {
        return 'fas fa-snowflake';
    } else if (weatherId >= 700 && weatherId < 800) {
        return 'fas fa-smog';
    } else if (weatherId === 800) {
        return 'fas fa-sun';
    } else if (weatherId > 800 && weatherId < 900) {
        return 'fas fa-cloud';
    } else {
        return 'fas fa-question';
    }
}

// Update weather data on the page
function updateWeatherData(data) {
    // Update main weather information
    const isDay = data.weather[0].icon.includes('d');
    weatherIcon.src = getWeatherIcon(data.weather[0].icon, isDay);
    weatherStatus.textContent = getWeatherDescription(data.weather[0].id);
    temperature.textContent = Math.round(data.main.temp);
    feelsLike.textContent = Math.round(data.main.feels_like);
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    dateTime.textContent = formatDateTime();
    
    // Update weather details
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    pressure.textContent = `${data.main.pressure} hPa`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    
    // Update time
    updateTime.textContent = 'Just now';
    
    // Show notification
    showNotification(`Weather data for ${data.name} loaded successfully!`, 'success');
    
    // Update current city
    currentCity = data.name;
    
    // Check if city is in favorites
    checkIfFavorite();
    
    // Update background animation based on weather
    updateBackgroundAnimation(data.weather[0].id);
    
    // Generate mock forecast data (in a real app, you would fetch this from API)
    generateMockForecast(data);
}

// Generate mock forecast data
function generateMockForecast(currentData) {
    forecastContainer.innerHTML = '';
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    
    // Base temperature on current temperature
    const baseTemp = Math.round(currentData.main.temp);
    
    for (let i = 1; i <= 5; i++) {
        const dayIndex = (today + i) % 7;
        const dayName = days[dayIndex];
        
        // Generate random but plausible forecast data
        const tempVariation = Math.floor(Math.random() * 6) - 3; // -3 to +3
        const forecastTemp = baseTemp + tempVariation;
        
        // Random weather condition (based on current weather)
        let weatherId;
        const currentId = currentData.weather[0].id;
        
        if (currentId >= 200 && currentId < 600) {
            // If currently rainy, more chance of rain
            weatherId = Math.random() > 0.3 ? currentId : 800;
        } else if (currentId >= 600 && currentId < 700) {
            // If currently snow, more chance of snow
            weatherId = Math.random() > 0.3 ? currentId : 800;
        } else {
            // Otherwise mixed conditions
            const rand = Math.random();
            if (rand < 0.3) {
                weatherId = 800; // Clear
            } else if (rand < 0.6) {
                weatherId = 801; // Few clouds
            } else if (rand < 0.8) {
                weatherId = 802; // Scattered clouds
            } else {
                weatherId = 500; // Light rain
            }
        }
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-icon"><i class="${getWeatherIconClass(weatherId)}"></i></div>
            <div class="forecast-temp">${forecastTemp}°C</div>
        `;
        
        forecastContainer.appendChild(forecastCard);
    }
}

// Update background animation based on weather
function updateBackgroundAnimation(weatherId) {
    const sun = document.querySelector('.sun');
    const clouds = document.querySelectorAll('.cloud');
    
    // Reset all
    sun.style.display = 'block';
    clouds.forEach(cloud => cloud.style.display = 'block');
    
    // Adjust based on weather
    if (weatherId >= 200 && weatherId < 300) {
        // Thunderstorm - darken background
        document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        sun.style.display = 'none';
    } else if (weatherId >= 300 && weatherId < 600) {
        // Rain/Drizzle
        document.body.style.background = 'linear-gradient(135deg, #4a6491 0%, #2c3e50 100%)';
        sun.style.opacity = '0.3';
    } else if (weatherId >= 600 && weatherId < 700) {
        // Snow
        document.body.style.background = 'linear-gradient(135deg, #a8c0ff 0%, #667eea 100%)';
        sun.style.opacity = '0.7';
    } else if (weatherId === 800) {
        // Clear sky
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        sun.style.opacity = '1';
        clouds.forEach(cloud => cloud.style.display = 'none');
    } else if (weatherId > 800 && weatherId < 900) {
        // Clouds
        document.body.style.background = 'linear-gradient(135deg, #7b9fe3 0%, #5a6fa3 100%)';
        sun.style.opacity = '0.6';
    }
}

// Fetch weather data for a specific city
async function getWeatherDataForCity(city) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the city name and try again.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
        }
        
        const data = await response.json();
        updateWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showNotification(error.message, 'error');
    }
}

// Get weather by current location
function getWeatherByCurrentLocation() {
    if (!navigator.geolocation) {
        showNotification('Geolocation is not supported by your browser', 'error');
        return;
    }
    
    showNotification('Getting your location...', 'info');
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
                
                const response = await fetch(apiUrl);
                const data = await response.json();
                
                updateWeatherData(data);
                cityInput.value = data.name;
            } catch (error) {
                console.error('Error fetching weather data:', error);
                showNotification('Failed to get weather for your location', 'error');
            }
        },
        (error) => {
            console.error('Geolocation error:', error);
            showNotification('Unable to retrieve your location. Please enable location services.', 'error');
        }
    );
}

// Toggle favorite status
function toggleFavorite() {
    isFavorite = !isFavorite;
    
    if (isFavorite) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
        favoriteBtn.classList.add('active');
        showNotification(`${currentCity} added to favorites`, 'success');
        
        // Save to localStorage
        const favorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
        if (!favorites.includes(currentCity)) {
            favorites.push(currentCity);
            localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        }
    } else {
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.classList.remove('active');
        showNotification(`${currentCity} removed from favorites`, 'info');
        
        // Remove from localStorage
        const favorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
        const index = favorites.indexOf(currentCity);
        if (index > -1) {
            favorites.splice(index, 1);
            localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        }
    }
}

// Check if current city is in favorites
function checkIfFavorite() {
    const favorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
    isFavorite = favorites.includes(currentCity);
    
    if (isFavorite) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
        favoriteBtn.classList.add('active');
    } else {
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.classList.remove('active');
    }
}

// Toggle dark/light theme
function toggleTheme() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        localStorage.setItem('weatherTheme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        localStorage.setItem('weatherTheme', 'light');
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherDataForCity(city);
    } else {
        showNotification('Please enter a city name', 'warning');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherDataForCity(city);
        }
    }
});

currentLocationBtn.addEventListener('click', getWeatherByCurrentLocation);
favoriteBtn.addEventListener('click', toggleFavorite);
themeToggle.addEventListener('click', toggleTheme);

// Initialize the app
function initApp() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('weatherTheme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
    
    // Load initial weather data
    getWeatherDataForCity(currentCity);
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to SkyCast! Search for any city to get weather information.', 'info');
    }, 1000);
}

// Initialize the app when the page loads
window.addEventListener('DOMContentLoaded', initApp);