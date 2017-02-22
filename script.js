function getLocation() {    
    var latitude;
    // var latitudeBlock = document.getElementsByClassName('latitude')[0];    
    var longitude;
    // var longitudeBlock = document.getElementsByClassName('longitude')[0];    
    // var location;
    // var locationBlock = document.getElementsByClassName('location')[0].p[0];
    
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        // latitudeBlock.innerHTML += latitude;
        longitude = position.coords.longitude;
        // longitudeBlock.innerHTML += longitude;        
        ajaxCall(latitude, longitude);        
        // console.log(location);
    });   
    
}

function ajaxCall(latitude, longitude) {
    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=6e088bf0bd91892d77742f1702f7da48');
    var weatherInfo;
    request.onreadystatechange = function () {
        console.log(request.readyState);
        if ((request.readyState === 4) && (request.status === 200)) {
            console.log(request);      
            weatherInfo = JSON.parse(request.responseText);
            setTemp(weatherInfo);
            setLocation(weatherInfo);
            setWeatherCond(weatherInfo);
            setWind(weatherInfo);                
            var convert = document.getElementsByClassName('convert')[0];
            convert.addEventListener('click', function(e) {
                if (e.target && e.target.nodeName == 'BUTTON') {
                    var item = e.target.getAttribute('class');                
                    updateTemp(weatherInfo.main.temp, item);
                }
            });        
        }
    }
    request.send();      
}

// combine the set functions into one to avoid adding the same parametor
// like function setTheWeatherBlocks()

function setTemp(weatherInfo) {
    var temperatureBlock = document.getElementsByClassName('temperature')[0];           
    temperatureBlock.innerHTML = weatherInfo.main.temp.toFixed(1) + ' K';
}

function setLocation(weatherInfo) {
    var locationBlock = document.getElementsByClassName('location')[0];
    locationBlock.innerHTML = weatherInfo.sys.country + ', ' + weatherInfo.name;
}

function setWeatherCond(weatherInfo) {
    weatherConditionBlock = document.getElementsByClassName('weather-condition')[0];
    weatherConditionBlock.innerHTML = weatherInfo.weather[0].description;
}

function setWind(weatherInfo) {
    var windBlock = document.getElementsByClassName('wind')[0];
    windBlock.innerHTML = 'Wind ' + weatherInfo.wind.speed + ' m/s';
}

function updateTemp(k, item) {
    var temp;
    var measure;
    if (item == 'into-c') {
        temp = Number(k) - 273.15;
        measure = 'C';
    } else if (item == 'into-f') {
        temp = 9*(Number(k) - 273.15)/5 - 32;
        measure = 'F';
    } else if (item == 'into-k') {
        temp = Number(k);
        measure = 'K';
    }
    var temperatureBlock = document.getElementsByClassName('temperature')[0];           
    temperatureBlock.innerHTML = temp.toFixed(1) + ' ' + measure;
}

window.onload = function () {
    document.getElementsByClassName('get-weather')[0]
        .onclick = function (evt) {
            getLocation();  
        }
}