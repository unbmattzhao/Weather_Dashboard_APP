var searchFormEl = document.querySelector('#searchForm');
var cityInputEl = document.querySelector('#cityInput');
var searchBtnEl = document.querySelector('#searchBtn');
var searchAreaEl = document.querySelector('#searchArea')
var resultAreaEl= document.querySelector('#resultArea');


var repoSearchTerm = document.querySelector('#repo-search-term');

var formSubmitHandler = function(event) {
  event.preventDefault();
  // * get the user's input value as data, delete all the spaces around 
  var cityName = cityInputEl.value.trim();
// * if user input a city name, go with the function 
  if (cityName) {
    getCityData(cityName);
      // * clear the user input area for next input
      cityInputEl.value = '';
      
      }else {
    // * show an alert if the user does not input anything and clicks the button
    alert('Please enter a city name');
  }
};

var getCityData = function (cityName) {
  var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',us&limit=5&appid=bc84f0272f6199c407b3c9dd27ba32b9'; 
 fetch(apiUrl)
  // * create a function to check whether there is a response with the fetch API method, and take actions when there is/not a response.
  
  .then(function (response) 
  {
  // * response.ok is the same as response.status === 200  
  if (response.ok) 
    {
    //* check the city information as there maybe 1. no city information 2. more than one cities with the same name 3. only one city
      response.json().then(function(data){
        console.log(data);
        //* if the city is not found, return a message to the user, and it will not add this city name to the localStorage;
        if(data.length === 0){
          resultAreaEl.textContent = 'No weather data found.'
          // ! no idea whether I need this return, seems not functional;
          return;
        }
        else {
          // * add city name to the searched list
          localStorage.setItem('cities', cityName);
          const savedInput = localStorage.getItem('cities');
          // show the input data if there is data stored in the localStorage
          if (savedInput) {
            var citySearchedListEl = document.createElement('div');
            citySearchedListEl.setAttribute('id', 'citySearchedList');
            searchAreaEl.appendChild(citySearchedListEl);
            citySearchedListEl.textContent = savedInput;}
            // list the cities, but no more than first five with the same name for further option
            if(data.length >1 ){
              resultAreaEl.textContent="";
              variableBuilder()
              function variableBuilder() {
                let i = 0;
                while (i < data.length) {
                   var city = data[i].name;  
                   var state = data[i].state;   
                   var cityFound = document.createElement('div');
                   cityFound.setAttribute('class', 'city-state'); 
                   cityFound.textContent = "City name: " + city + ";   " + "State name: " + state + "."     
                   resultAreaEl.appendChild(cityFound);    
  
                   // variable can even be reassigned here`
                   console.log(city + " " + state);
                   i++;
                }}
              }           
              else{displayWhetherData(cityName)}
            }
        })
      }
  })
}

searchFormEl.addEventListener('submit', formSubmitHandler);        

var displayWhetherData = function(cityName){
  var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',us&limit=5&appid=bc84f0272f6199c407b3c9dd27ba32b9'; 
  fetch(apiUrl)
  .then(function(response){    
    response.json()
    .then((function(data){      
      var latInfo = data[0].lat;
      var lonInfo = data[0].lon;
      console.log(latInfo);
      console.log(lonInfo);

      var weatherApi = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latInfo + '&lon='+ lonInfo + '&appid=bc84f0272f6199c407b3c9dd27ba32b9';
      fetch(weatherApi)
      .then(function(response){
        if(response.ok){
          response.json().then(function(weather){
            resultAreaEl.textContent = "";
            console.log(weather);
            var cityToday = document.createElement('div');
            cityToday.setAttribute('class', 'city-today');
            cityToday.textContent = weather.city.name;
            resultAreaEl.appendChild(cityToday);
          }
          )

        }else{
          // resultAreaEl.textContent = "";
          // resultAreaEl.textContent = "No Data Available";
        }
      }).then()



    }));    
  })

  // ?? Why this outsider .then is not working?
  // .then(function(data){   
  //   var latInfo = data[0].lat;
  //   var lonInfo = data[0].lon;
  //   console.log(latInfo);
  //   console.log(lonInfo);})
}

