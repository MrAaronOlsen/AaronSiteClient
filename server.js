// This can be run with npm start.
// Dev builds are always run via npm run dev which does not use express.
const path = require('path');
const express = require('express');

var app = express();

// Sets the root.
app.use(express.static(path.join(__dirname)));

// Used to keep this server alive on heroku
app.get("/keepalive", function(req, res) {
  res.send("I'm alive")
});

// This routes all React Routes to our index.html, which in turn always calls bundle.js.
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});

// Keep this server alive
const fetch = require('isomorphic-fetch')

setInterval(function() {
  fetch("https://aaron-site.herokuapp.com/keepalive")
    .then(response => {
      return response.text();
    })
    .then(data => {
      console.log("[Keep Alive] Client: " + data);
    })

  fetch("https://aaron-site-api.herokuapp.com/aaron_site/api/v1/keepalive")
    .then(response => {
      return response.text();
    })
    .then(data => {
      console.log("[Keep Alive] API: " + data);
    })
}, 30000);