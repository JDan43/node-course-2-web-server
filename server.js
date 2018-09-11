// Local Express Server

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

app.use((request, response) => {
  response.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'));   // middleware

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {  // set up get request
  // response.send('<h1>Hello Express!</h1>');
  //response.send({
  //  name: 'Dan',
  //  likes: [
  //    'ice cream',
  //    'chocolate',
  //    'mountains'
  //  ]
  //});
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my home page!!!',
  });
});

app.get('/about', (request, response) => {
  //response.send('About Page');
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Bad Error'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

 // setting up port for listening - 3000 commonly used for local server
