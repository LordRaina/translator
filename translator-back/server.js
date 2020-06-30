const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8080'}));
const routes = require('./api/routes/translatorRoutes');
routes(app);

app.listen(port);

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(404).send({url: req.originalUrl + ' not found'})
});


console.log('RESTful API server started on: ' + port);
