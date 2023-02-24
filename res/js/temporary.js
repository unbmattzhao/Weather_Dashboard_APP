// * the apiUrl, add the user's input data as the city name to be used here. the original API URL as per GitHub REST API documentation is https://api.github.com/users/USERNAME/repos, just replace the USERNAME here with the user's input data. 
  
        
        // * parse the response to json format and display the data with a function which defines later
        if (response.length === 0){
         
        }
        else{        
              
          response.json().then(function (data) {
            for(i=0; i<data.length; i++){
              var latData = data[i].lat;
              var lonData = data[i].lon;
              
              console.log(latData);
              console.log(lonData);
            }
          })
        }
          // * this function uses the data received from fetch method and the user's input data, which is the GitHub user name, and then displays them to the container as defined at the beginning. which is to say, our previous work was to get the date from GitHub with the GitHub user names that was input by the app user, and now we have it, and next is to display it.

            console.log(data);


        
          displayWhetherData(data, cityName);

// github

// with the fetched data and the input username, create 
var displayWhetherData = function (weatherData) {
    if (weatherData.length === 0) {
      resultAreaEl.textContent = 'No weather data found.';
      return;
    }else if(weatherData.length === 1) {
      var currentCityEl = document.createElement('div');
      currentCityEl.classList = 'currentCity';
  
      resultAreaEl.textContent = 'one city only.';
      return;
    }
  }




  // This is a test 
  (cityArray.length )




  //!!!!!!!!!!!!!!!!Below is functioning!!!!!!!!!!!!!!!
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
                else{ var stateName = data[0].state;           
                displayWhetherData(cityName, stateName)}
                  
              }
          })
        }
    })
  }
  //!!!!!!!!!!!!!!!!!!!!!!!!end of code!!!!!!!!!!!!!!!!!!!!!!!