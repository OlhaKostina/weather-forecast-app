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
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

function convertToFahrenheit(event) {
  event.preventDefault();
  celTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  celTemperature.classList.add("active");
  fahrenheitTemperature.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celTemperature = document.querySelector("#celsius");
celTemperature.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;

let searchForm = document.querySelector("#search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentLocation);

searchCity("Kyiv");
