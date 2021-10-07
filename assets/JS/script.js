var myKey = "152ae2b8b820db732e591a903f32c1ef";     
var apiURL = "https://api.openweathermap.org/data/2.5/weather?q="
var ocApiURL ="https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=152ae2b8b820db732e591a903f32c1ef"
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

const ft = new Fetch();
const ui = new UI();

//add event listeners//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
button.addEventListener("click", () => {
  const currentVal = search.value;

  ft.getCurrent(currentVal).then((data) => {
    //call a UI method//
    ui.populateUI(data);
    //call saveToLS
    ui.saveToLS(data);
  });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ui.getFromLS();
  ui.populateUI(dataSaved);
});



/////////////////////

  // var response = await fetch(
    
  //   "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=152ae2b8b820db732e591a903f32c1ef"
  // );

  // var data = await response.json();

  // console.log(data);

  // return data;



  ////////////////////
//   function cityWeather () {
//     var today = moment().format("MMM DD, YYYY");
//     console.log(today);
// }
    

// function getCurrent(input) {
//     // cityName = inputTextForm.val();
//     // console.log(inputTextForm.val());

//     var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=152ae2b8b820db732e591a903f32c1ef"
//     var ocApiURL ="https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=152ae2b8b820db732e591a903f32c1ef"

//     fetch(apiURL) 
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(data) {
//             console.log(data);
        
//     fetch(ocApiURL) 
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(data) {
//             console.log(data);
//         })
//         }) 