const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    const query = req.body.cityName;
    const appKey = "8404088f43314b9a4c3a825bab0be5f9"
    const units = "metric";
    
    
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appKey + "&units=" + units;

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write('<h1>The temperature in ' + query + ' is ' + temp + ' degrees Celsius.</h1>');
            res.write('<p>The weather is currently ' + weatherDescription + '.</p>');
            res.write('<img src="' + imageURL + '">');
            res.send()
        })
    } )
})



app.listen(4001, function() {
    console.log('Server is running on port 4001');
})