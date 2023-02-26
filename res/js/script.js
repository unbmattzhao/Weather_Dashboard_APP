var searchFormEl = document.querySelector('#searchForm');
var cityInputEl = document.querySelector('#cityInput');
var searchBtnEl = document.querySelector('#searchBtn');
var searchAreaEl = document.querySelector('#searchArea')
var citiesShowAreaEl = document.querySelector('.citiesShowArea');
var resultAreaEl= document.querySelector('#resultArea');


var repoSearchTerm = document.querySelector('#repo-search-term');

var formSubmitHandler = function(event) {
  event.preventDefault();
  
  // * get the user's input value as data, delete all the spaces around 
  var cityName = cityInputEl.value.trim();
  // * if user input a city name, go with the function 
  if (cityName) {
    displayWhetherData(cityName);
    // * clear the user input area for next input
    cityInputEl.value = '';
    
  }else {
    // * show an alert if the user does not input anything and clicks the button
    alert('Please enter a city name');
  }
};
searchFormEl.addEventListener('submit', formSubmitHandler);        
showCities();

function showCities(){

  let savedInput = JSON.parse(localStorage.getItem('cities')) || [];  
  console.log(savedInput);
  for(i=0; i<savedInput.length; i++){
  var citySearchedListEl = document.createElement('div');
  citySearchedListEl.setAttribute('class', 'citySearchedList');  
  console.log(savedInput[i]);
  citySearchedListEl.textContent = savedInput[i];    
  citiesShowAreaEl.appendChild(citySearchedListEl);
  
  
// show weather data when the searched cities are clicked;
citySearchedListEl.addEventListener('click', savedCityForecast);
function savedCityForecast(event){
  event.preventDefault();
  var city = event.target.textContent;
  displayWhetherData(city);
  }};
};
    
  
  
// This is to test GitHub



// Displays data in the current and future forecast area.
var displayWhetherData = function(cityName){

  // fetch data forecast information for current day.
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + ',us&units=imperial&limit=5&appid=bc84f0272f6199c407b3c9dd27ba32b9'; 
  fetch(apiUrl)
  .then(function(response){    

         if(response.ok){
         
                // incase there is no weather data
                if(response.length === 0){
                  resultAreaEl.textContent = 'No weather data found.'
                  // ! no idea whether I need this return, seems not functional;
                  return;
                }
                else {    
                        // * add city name to the searched list
                        response.json().then(function cityList(data){
                          console.log(data);
                          let searchedCityList = JSON.parse(localStorage.getItem('cities')) || [];
                        if(!searchedCityList.includes(data.name)) {
                            searchedCityList.push(data.name);
                            localStorage.setItem('cities', JSON.stringify(searchedCityList));
                            
                            var savedInput = JSON.parse(localStorage.getItem('cities')) || [];
                            console.log(savedInput);

                            citiesShowAreaEl.innerHTML = "";
                          showCities();
                          };    
                                    
                      // }
                      // console.log(data);
                    return data;    
                    })
                        .then(function(data){
                        resultAreaEl.textContent = "";
                        console.log(data);
                        
                        var cityToday = document.createElement('div');
                        cityToday.classList.add('city-today', 'result-display');

                        // * to show today's date;
                        // var today = new Date();
                        // var dd = String(today.getDate()).padStart(2, '0');
                        // var mm = String(today.getMonth() + 1).padStart(1, '0'); 
                        // var yyyy = today.getFullYear();            
                        // today = mm + '/' + dd + '/' + yyyy;

                        //! To convert the date milliseconds from the weather data object, use as a function;         
                      function theDayConverter(milliseconds){
                          const dateObject = new Date(milliseconds);
                          const month = dateObject.getMonth() + 1;
                          const day = dateObject.getDate();
                          const year = dateObject.getFullYear();
                          const theDay = `${month.toString().padStart(1, '0')}/${day.toString().padStart(2, '0')}/${year.toString()}`;
                          return theDay;
                          };
              
                          var milliseconds0 = data.dt*1000; 
                          var today = theDayConverter(milliseconds0);

                        
                        
                        cityToday.innerHTML = '<h2>' + data.name + ' (' + today + ')' + "<img id='img' src = 'https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'></img>" +  '</h2>' 
                        + '<p class= "temp">' + 'Temp: ' + data.main.temp + '&deg;F' + '</p>'
                        + '<p class= "temp">' + 'Wind: ' + data.wind.speed + " MPH" + '</p>'
                        +'<p class= "temp">' + 'Humidity: ' +  data.main.humidity + "%" + '</p>';
                        resultAreaEl.appendChild(cityToday);

                        var forecastTitle = document.createElement('h4');
                        forecastTitle.textContent = "5-Day Forecast:"
                        forecastTitle.classList.add('forecast-title', 'result-display');
                        resultAreaEl.appendChild(forecastTitle);

                      });

                        
                        var apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast?q='+ cityName + '&appid=bc84f0272f6199c407b3c9dd27ba32b9';
                        fetch(apiUrlForecast)
                          .then(function(response){    
                    if(response.ok){
                      response.json().then(function(weather){
                        console.log(weather);
                        
                        function theDayConverter(milliseconds){
                          const dateObject = new Date(milliseconds);
                          const month = dateObject.getMonth() + 1;
                          const day = dateObject.getDate();
                          const year = dateObject.getFullYear();
                          const theDay = `${month.toString().padStart(1, '0')}/${day.toString().padStart(2, '0')}/${year.toString()}`;
                          return theDay;
                          };
              
                          var milliseconds1 = weather.list[3].dt*1000; 
                          var day1 = theDayConverter(milliseconds1);
                          
                          var milliseconds2 = weather.list[11].dt*1000; 
                          var day2 = theDayConverter(milliseconds2);

                          var milliseconds3 = weather.list[20].dt*1000; 
                          var day3 = theDayConverter(milliseconds3);

                          var milliseconds4 = weather.list[30].dt*1000; 
                          var day4 = theDayConverter(milliseconds4);
                          
                          var milliseconds5 = weather.list[39].dt*1000; 
                          var day5 = theDayConverter(milliseconds5);
                          
                          var forecastFiveDay = document.createElement('div');
                          forecastFiveDay.classList.add('fiveDay');
                          
                          var fiveDay1= document.createElement('div');
                          var fiveDay2= document.createElement('div');
                          var fiveDay3= document.createElement('div');
                          var fiveDay4= document.createElement('div');
                          var fiveDay5= document.createElement('div');
                          forecastFiveDay.appendChild(fiveDay1);
                          forecastFiveDay.appendChild(fiveDay2);
                          forecastFiveDay.appendChild(fiveDay3);
                          forecastFiveDay.appendChild(fiveDay4);
                          forecastFiveDay.appendChild(fiveDay5);
                          fiveDay1.classList.add('result-display', 'Card');
                          fiveDay2.classList.add('result-display', 'Card');
                          fiveDay3.classList.add('result-display', 'Card');
                          fiveDay4.classList.add('result-display', 'Card');
                          fiveDay5.classList.add('result-display', 'Card');
                
                          
                          fiveDay1.innerHTML = '<h4 class= "temp">' + day1 +  '</h4>' + "<br>" + "<img class='Image' src = 'https://openweathermap.org/img/wn/" + weather.list[3].weather[0].icon + ".png'></img>" + "<br>"   
                          + '<p class= "temp">' + 'Temp: ' + weather.list[3].main.temp + '&deg;F' + '</p>'+ "<br>" 
                          + '<p class= "temp">' + 'Wind: ' + weather.list[3].wind.speed + " MPH" + '</p>'+ "<br>" 
                          +'<p class= "temp">' + 'Humidity: ' +  weather.list[3].main.humidity + "%" + '</p>';

                          fiveDay2.innerHTML =  '<h4 class= "temp">' + day2 +  '</h4>' + "<br>" + "<img class='Image' src = 'https://openweathermap.org/img/wn/" + weather.list[11].weather[0].icon + ".png'></img>" + "<br>"   
                          + '<p class= "temp">' + 'Temp: ' + weather.list[11].main.temp + '&deg;F' + '</p>'+ "<br>" 
                          + '<p class= "temp">' + 'Wind: ' + weather.list[11].wind.speed + " MPH" + '</p>'+ "<br>" 
                          +'<p class= "temp">' + 'Humidity: ' +  weather.list[11].main.humidity + "%" + '</p>';
                          fiveDay3.innerHTML =  '<h4 class= "temp">' + day3 +  '</h4>' + "<br>" + "<img class='Image' src = 'https://openweathermap.org/img/wn/" + weather.list[20].weather[0].icon + ".png'></img>" + "<br>"   
                          + '<p class= "temp">' + 'Temp: ' + weather.list[20].main.temp + '&deg;F' + '</p>'+ "<br>" 
                          + '<p class= "temp">' + 'Wind: ' + weather.list[20].wind.speed + " MPH" + '</p>'+ "<br>" 
                          +'<p class= "temp">' + 'Humidity: ' +  weather.list[20].main.humidity + "%" + '</p>';
                          fiveDay4.innerHTML =  '<h4 class= "temp">' + day4 +  '</h4>' + "<br>" + "<img class='Image' src = 'https://openweathermap.org/img/wn/" + weather.list[30].weather[0].icon + ".png'></img>" + "<br>"   
                          + '<p class= "temp">' + 'Temp: ' + weather.list[30].main.temp + '&deg;F' + '</p>'+ "<br>" 
                          + '<p class= "temp">' + 'Wind: ' + weather.list[30].wind.speed + " MPH" + '</p>'+ "<br>" 
                          +'<p class= "temp">' + 'Humidity: ' +  weather.list[3].main.humidity + "%" + '</p>';
                          fiveDay5.innerHTML =  '<h4 class= "temp">' + day5 +  '</h4>' + "<br>" + "<img class='Image' src = 'https://openweathermap.org/img/wn/" + weather.list[39].weather[0].icon + ".png'></img>" + "<br>"   
                          + '<p class= "temp">' + 'Temp: ' + weather.list[39].main.temp + '&deg;F' + '</p>'+ "<br>" 
                          + '<p class= "temp">' + 'Wind: ' + weather.list[39].wind.speed + " MPH" + '</p>'+ "<br>" 
                          +'<p class= "temp">' + 'Humidity: ' +  weather.list[39].main.humidity + "%" + '</p>';
                                      
                
                          resultAreaEl.appendChild(forecastFiveDay);
                      })
                    };

                      }
                      )

              }}else{
                resultAreaEl.textContent = "";
                resultAreaEl.textContent = "No Data Available";
              }
              
      }).then()

    };    