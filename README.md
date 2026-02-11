# ⛅ SkyCast — Modern Weather App

![SkyCast Preview](assets/p.png)

**SkyCast** is a sleek, modern, and fully responsive weather application that delivers real-time weather insights and 5-day forecasts for cities around the globe. Built with vanilla JavaScript and powered by the **OpenWeatherMap API**, this app features a clean glass-morphism UI, animated weather backgrounds, dark/light mode toggle, and location-based services.

## ✨ Features

### 🎯 Core Features
- **Real-time Weather Data** — Current temperature, feels like, weather conditions
- **5-Day Forecast** — Daily weather predictions with icons and temperatures
- **City Search** — Search any city worldwide with autocomplete
- **Current Location** — One-click weather for your current location (geolocation)
- **Favorite Cities** — Save and manage favorite locations (localStorage)
- **Dark/Light Mode** — Toggle theme with persistent user preference
- **Detailed Metrics** — Humidity, wind speed, pressure, visibility
- **Last Updated Timestamp** — Real-time update indicator

### 🎨 UI/UX
- **Glass-morphism Design** — Frosted glass cards with subtle shadows
- **Animated Background** — Floating sun and clouds with smooth CSS animations
- **Weather Icons** — Dynamic OpenWeatherMap icons for current conditions
- **Responsive Layout** — Seamless experience across all devices
- **Notification System** — Non-intrusive toast messages for user feedback
- **Loading States** — Smooth transitions during API calls
- **Error Handling** — User-friendly error messages for invalid cities or network issues

### 📊 Weather Data
| Metric | Description | Unit |
|--------|-------------|------|
| Temperature | Current temperature | °C |
| Feels Like | Perceived temperature | °C |
| Humidity | Relative humidity | % |
| Wind Speed | Wind velocity | km/h |
| Pressure | Atmospheric pressure | hPa |
| Visibility | Distance visibility | km |
| Forecast | 5-day daily forecast | Day, Temp, Icon |

## 🛠 Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Flexbox, Grid, Keyframe animations, CSS variables
- **JavaScript (ES6+)** — Async/await, Fetch API, DOM manipulation
- **OpenWeatherMap API** — Current weather data + 5-day forecast
- **Font Awesome 6** — Weather and UI icons
- **Google Fonts** — Poppins (clean, modern sans-serif)
- **LocalStorage** — Theme preference, favorite cities
- **Geolocation API** — Current location detection
