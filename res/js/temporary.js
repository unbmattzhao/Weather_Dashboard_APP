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