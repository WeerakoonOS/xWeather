const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'cfa85d46b58aa9429bd1e6a1efdff5ce';

app.use(express.static('public'));
//app.use(bodyParser.json()); // support json encoded bodies
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

app.get('/weather', function (req, res) {
 res.render('weather', {weather: null, error: null});
})

app.get('/contact', function (req, res) {
res.render('contact', {weather: null, error: null});
})

app.post('/uv', function (req, res) {//when a POST request is made to /uv respond with
  let lat = req.body.lat;
  let lon = req.body.lon;
  let url = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

  request(url, function (err, response, body) {
    if(err){
      res.render('/uv', {weather: null, error: 'Error, please try again!'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){// user invalid input
        res.render('/uv', {weather: null, error: 'Error, please try again!!'});
      } else {
        let uvText = `Ultraviolet Index is ${weather.value} in ${weather.lat} & ${weather.lon}!`;
        res.render('/uv', {weather: uvText, error: null});
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