const express = require('express')
const app = express()

app.use(express.static('public'));
app.set('view engine', 'ejs')


app.post('/', function (req, res) {
  //res.send('Hello World!')
  res.render('index');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})