const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'cfa85d46b58aa9429bd1e6a1efdff5ce';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

// defining the page routes
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.get('/about', function (req, res) {
res.render('about', {weather: null, error: null});
})

app.get('/index', function (req, res) {
 res.render('index', {weather: null, error: null});
})

app.get('/air', function (req, res) {
res.render('air', {weather: null, error: null});
})

app.get('/uv', function (req, res) {
 res.render('uv', {weather: null, error: null});
})

app.get('/contact', function (req, res) {
res.render('contact', {weather: null, error: null});
})


app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('air', {weather: null, error: 'Error, please try again!!'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){// user invalid input
        res.render('air', {weather: null, error: 'Error, please try again!'});
      } else {
        let weatherText = `It's ${weather.main.temp} Celcius in ${weather.name}!`;
        res.render('air', {weather: weatherText, error: null});
      }
    }
  });
  //res.send('Hello World!')
  //console.log(req.body.city);
  //res.render('index');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})