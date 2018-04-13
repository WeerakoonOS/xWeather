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
  res.render('index', {uv: null, error: null});
})

app.get('/about', function (req, res) {
res.render('about', {uv: null, error: null});
})

app.get('/index', function (req, res) {
 res.render('index', {uv: null, error: null});
})

app.get('/air', function (req, res) {
res.render('air', {uv: null, error: null});
})

app.get('/uv', function (req, res) {
 res.render('uv', {uv: null, error: null});
})

app.get('/contact', function (req, res) {
res.render('contact', {uv: null, error: null});
})

app.post('/', function (req, res) {
  let lat = req.body.lat;
  let lon = req.body.lon;
  let url = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

  request(url, function (err, response, body) {
    if(err){
      res.render('uv', {uv: null, error: 'Error, please try again!'});
    } else {
      let uv = JSON.parse(body)
      if(uv.main == undefined){// user invalid input
        res.render('uv', {uv: null, error: 'Error, please try again!!'});
      } else {
        let uvText = `Ultraviolet Index is ${uv.value} in ${uv.lat} & ${uv.lon}!`;
        res.render('uv', {uv: uvText, error: null});
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