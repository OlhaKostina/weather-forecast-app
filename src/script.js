let now = new Date();
let h3 = document.querySelector(".current-date");
let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h3.innerHTML = `${day}, ${date} ${month} ${year}`;

function displayCurrentTime() {
  let h1 = document.querySelector(".current-time");
  let hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  let minutes =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  h1.innerHTML = `${hour}:${minutes}`;
}
displayCurrentTime();

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  document.querySelector("#uvi").innerHTML = response.data.current.uvi;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
    <div class = "col-3">
    <div id="weather-of-the-day-forecast">
      <div class="today">${formatDay(forecastDay.dt)}</div>
      <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
      <div>  <span id = "max-temperature">${Math.round(
        forecastDay.temp.max
      )}° </span>  <span id = "min-temperature">${Math.round(
          forecastDay.temp.min
        )}° </span> </div>
    </div>
    </div>
  `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "41db31b7bfb54ee46c6a15c5c9d02e0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentWeather(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector(".current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector(".current-weather-img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "41db31b7bfb54ee46c6a15c5c9d02e0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-line").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let apiKey = "41db31b7bfb54ee46c6a15c5c9d02e0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocation);

searchCity("Kyiv");
