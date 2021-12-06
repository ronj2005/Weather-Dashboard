// Global variable declarations
var cityList = [];
var cityname;

// constant variables
const clearEl = document.getElementById("clear-history");
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currWeathItEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weathForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");
const currentDays = document.getElementById("current-day");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const myKey = "152ae2b8b820db732e591a903f32c1ef";

// display for city search
function renderCities(){
  $("#cityList").empty();
  $("#cityInput").val("");
  
  for (i=0; i<cityList.length; i++){
      var a = $("searchInput");
      // a.addClass("list-group-item list-group-item-action list-group-item-primary city");
      a.attr("data-name", cityList[i]);
      a.text(cityList[i]);
      $("#cityList").prepend(a);
  } 
}




// create time/ date data for timeEl and dateEl
setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    hoursIn12HrFormat + ":" + minutes + " " + `<span id="am-pm">${ampm}</span>`;
  dateEl.innerHTML = days[day] + ", " + months[month] + " " + date;
  currentDays.innerHTML = days[day];
}, 1000);

const currWeathaApiURL = `https://api.openweathermap.org/data/2.5/weather?q=`;
// const oneCallApiURL =`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=152ae2b8b820db732e591a903f32c1ef`

setWeatherData();

function setWeatherData() {
  navigator.geolocation.getCurrentPosition((sucess) => {
    console.log(sucess);

    let { latitude, longitude } = sucess.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=152ae2b8b820db732e591a903f32c1ef`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        showWeatherData(data);
      });
  });

  function showWeatherData(data) {
    let { humidity, temp, uvi, wind_speed } = data.current;

    currWeathItEl.innerHTML = `<div class="weather-item">
            <div>Temp:</div>
            <div>${temp}%</div>
        </div>
          <div class="weather-item">
            <div>Wind Speed:</div>
            <div>${wind_speed}</div>
          </div>
          <div class="weather-item">
            <div>Humidity:</div>
            <div>${humidity}</div>
          </div>
          <div class="weather-item">
          <div>UV Index</div>
          <div>${uvi}</div>
        </div>`;

    moment();

    let otherDayForecast = "";
    data.daily.forEach((day, idx) => {
      if (idx == 0) {
        currentTempEl.innerHTML = `          
          <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
            alt="weather icon" class="w-icon"/>
            <div class ="day">${window.moment(day.dt*1000).format('ddd')}</div>
            <div class="temp">Day: ${day.temp.day}&#176; F</div>
          <div class="temp">Night: ${day.temp.night}&#176; F</div>
        </div>`;
      } else {
        otherDayForecast += `<div class="weather-forecast-item">
              <div class ="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
                alt="weather icon" class="w-icon"/>
                <div>Temp:</div>
                <div>${day.temp.day}</div>
                <div>Wind Speed:</div>
                <div>${day.wind_speed}</div>
                <div>Humidity:</div>
                <div>${day.humidity}</div>
            </div>`;
      }
    });
    weathForecastEl.innerHTML = otherDayForecast;
  }
}

function historyDisplayWeather(){
  cityname = $(this).attr("data-name");
  displayWeather();
  displayFiveDayForecast();
  console.log(cityname);
  
}
clearEl.addEventListener("click",function() {
  cityList = [];
  renderCities();
})


$(document).on("click", ".city", historyDisplayWeather);