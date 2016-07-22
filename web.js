var compression = require('compression');
var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, 'dist')));

var examplePath = path.join(__dirname, '/example/');
var examples = fs.readdirSync(examplePath);

app.get('/', function (req, res) {
  res.sendFile(examplePath + examples[Math.floor(Math.random() * examples.length)]);
});

var port = process.env.PORT || 3003;
app.listen(port, function () {
  console.log('DataCamp Light examples available on port ' + port + '.');
});
