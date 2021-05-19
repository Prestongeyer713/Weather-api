'use strict'
var apiKey = "6d5c05d695c258c26331ffda6614ba80";
var weatherBaseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weatherQueryParams = '&units=imperial&APPID=' + apiKey;


var searchCurrentWeather = function (city) {
    var queryURL = weatherBaseURL + city + weatherQueryParams;
    console.log("searchCurrentWeather: ", queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            console.log(response);

            $("#query").val('');
            var theCity = response.name || '????';
            var theTemp = response.main.temp;
            var theHumidity = response.main.humidity;
            var theWindSpeed = response.wind.speed;
            var weatherIcon = response.weather[0].icon;

            createHTML(theCity, theTemp, theWindSpeed, theHumidity, weatherIcon);

            createCityList(theCity);
        });

}

function createHTML(city, temp, windspeed, humidity, weatherIcon) {
    var todayDate = new Date().toISOString().slice(0, 10);

    var icon = ("<img src='http://openweathermap.org/img/w/" + weatherIcon + ".png'/>");


    var htmlString = '<div>' +
        '<div class="weatherCity">' + city + ' ( ' + todayDate + ')' +
        '<div class="image">' + icon + '</div> </div>' +
        '<div class="weatherData"> Temperature: ' + temp + ' °F </div>' +
        '<div class="weatherData"> Humidity: ' + humidity + ' % </div>' +
        '<div class="weatherData"> Wind Speed: ' + windspeed + ' MPH </div>' +
        '</div>';

    $('#weatherResults').html(htmlString);
}

function createCityList(cityName) {

    var cityListString = '<div class="card text-danger list-group list-group-flush">' +
        '<p id=' + cityName + '>' + cityName +
        '</p> </div>';

    $('#searchCityResults').append(cityListString);
}

$(document).ready(function () {

    console.log("pageloading");

    $("#search").on('click', function () {
        console.log("Clicked search");

        var newSearchTerm = $("#query").val();
        console.log(newSearchTerm);

        searchCurrentWeather(newSearchTerm);


    });

})