var myKey = "152ae2b8b820db732e591a903f32c1ef";
var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var ocApiURL =
  "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=152ae2b8b820db732e591a903f32c1ef";
var bothAPI = apiURL + ocApiURL;
// var input ="";

class Fetch {
  async getCurrent(input) {
    //make request to url

    var response = await fetch(
      apiURL + input + "&appid=152ae2b8b820db732e591a903f32c1ef" //+ "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=152ae2b8b820db732e591a903f32c1ef"
    );
    
    var data = await response.json();

    console.log(data);

    return data;
  }
}

class UI {
  constructor() {
    this.uiContainer = document.getElementById("content");
    this.city;
    this.defaultCity = "";
  }

  populateUI(data) {
    //de-structure vars

    //add them to inner HTML

    this.uiContainer.innerHTML = `     
          <div class="card mx-auto mt-5" style="width: 18rem;">
              <div class="card-body justify-content-center">
                  <h5 class="card-title">${data.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Highs of ${data.main.temp_max}. Lows of ${data.main.temp_min}</h6>
                  <p class="card-text ">Weather conditions are described as: ${data.weather[0].description}</p>
                  
              </div>
          </div>
          `;
  }

  clearUI() {
    uiContainer.innerHTML = "";
  }

  saveToLS(data) {
    localStorage.setItem("city", JSON.stringify(data));
  }

  getFromLS() {
    if (localStorage.getItem("city" == null)) {
      return this.defaultCity;
    } else {
      this.city = JSON.parse(localStorage.getItem("city"));
    }

    return this.city;
  }

  clearLS() {
    localStorage.clear();
  }
}

//inst classes//

var ft = new Fetch();
var ui = new UI();

//add event listeners//

var search = document.getElementById("searchUser");
var button = document.getElementById("submit");
button.addEventListener("click", () => {
  var currentVal = search.value;

  ft.getCurrent(currentVal).then((data) => {
    //call a UI method//
    ui.populateUI(data);
    //call saveToLS
    ui.saveToLS(data);
  });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  var dataSaved = ui.getFromLS();
  ui.populateUI(dataSaved);
});




// RESCYCLE //

// timeEl = moment().format('MMMM Do YYYY, h:mm:ss a');

// currentDay.text(time.getDay());
// currentDay.text

function addDayForecast () {
  const time = new Date();
  const currentDay = time.getDay();
  const currentTemp = data.temp; 
  const currentHumidity = data.humidity;
  const dayTemp = data.moonset;
  const nightTemp = data.moonrise;

  this.currentDays.innerHTML = time[currentDay]

};




// function addCityData() {
//   city = defaultCity.val();
//   const currWeathaApiURL = "https://api.openweathermap.org/data/2.5/weather?q=";
//   const oneCallApiURL =
//         "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=152ae2b8b820db732e591a903f32c1ef";
//     fetch(currWeathaApiURL)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(funct ion(data){
//         lat = data.coord.lat;
//         lon = data.coord.lon;

//         oneCallApiURL =
//         "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=152ae2b8b820db732e591a903f32c1ef";

//         fetch(oneCallApiURL)
//           .then(function(response) {
//             return response.json();
//           })
//           .then(function(data) {
//             console.log(data);
//           })
//           console.log(data);
//       })
      
// }



// // var bothAPI = currWeathaApiURL + oneCallApiURL;
// // var input ="";

// class Fetch {
//   async getCurrent(input) {
//     //make request to url

//     var response = await fetch(
//       apiURL + input + "&appid=152ae2b8b820db732e591a903f32c1ef" //+ "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=152ae2b8b820db732e591a903f32c1ef"
//     );
    
//     var data = await response.json();

//     console.log(data);

//     return data;
//   }
// }

// class UI {
//   constructor() {
//     this.todayContainer = document.querySelector(".today");
//     this.city;
//     this.defaultCity = "";
//   };

//   populateUI(data) {
//     // de-structure vars

//     // add them to inner HTML

//     this.weathForecastEl.innerHTML = data;

// };
//   //   this.todayContainer.innerHTML = `     
//   //         <div class="card mx-auto mt-5" style="width: 18rem;">
//   //             <div class="card-body justify-content-center">
//   //                 <h5 class="card-title">${data.name}</h5>
//   //                 <h6 class="card-subtitle mb-2 text-muted">Highs of ${data.main.temp_max}. Lows of ${data.main.temp_min}</h6>
//   //                 <p class="card-text ">Weather conditions are described as: ${data.weather[0].description}</p>
                  
//   //             </div>
//   //         </div>
//   //         `;
//   // }

  

//   clearUI() {
//     uiContainer.innerHTML = "";
//   }

//   saveToLS(data) {
//     localStorage.setItem("city", JSON.stringify(data));
//   }

//   getFromLS() {
//     if (localStorage.getItem("city" == null)) {
//       return this.defaultCity;
//     } else {
//       this.city = JSON.parse(localStorage.getItem("city"));
//     }

//     return this.city;
//   }

//   clearLS() {
//     localStorage.clear();
//   }
// }

// //inst classes//

// var ft = new Fetch();
// var ui = new UI();

// //add event listeners//

// var search = document.getElementById("searchUser");
// var button = document.getElementById("submit");
// button.addEventListener("click", () => {
//   var currentVal = search.value;

//   ft.getCurrent(currentVal).then((data) => {
//     //call a UI method//
//     ui.populateUI(data);
//     //call saveToLS
//     ui.saveToLS(data);
//   });
// });

// //event listener for local storage

// window.addEventListener("DOMContentLoaded", () => {
//   var dataSaved = ui.getFromLS();
//   ui.populateUI(dataSaved);
// });



// setWeatherData ()

// function setWeatherData () {
//   navigator.geolocation.getCurrentPosition((sucess) => {
//     console.log(sucess);

//     let longitude = sucess.coords;
//     let latitude = sucess.coords;

//     fetch (`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=152ae2b8b820db732e591a903f32c1ef`)
//     .then(function (response) {
//       return response.json();
      
//       })
//     .then(function (data) {
      
//       console.log(data)
//       })

//   })
// }