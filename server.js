// This can be run with npm start.
// Dev builds are always run via npm run dev which does not use express.
const path = require('path');
const express = require('express');

var app = express();

// Force all http requests to server to be secured https.
// This is needed because cors policy on the API only accepts https:<site> as origin.
function forceHTTPS(req, res, next) {
  // Heroku ovewrites x-forwarded-proto with the originating protocol of the HTTP request.
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }

  next();
}

// Inject the force https function as middleware.
app.use(forceHTTPS);

// Let's express serve up static files from our root. Needed to make React Routes work.
app.use(express.static(path.join(__dirname)));

// Special endpoint to keep client server from going to sleep.
app.get("/keepawake", function(req, res) {
  res.send("I'm awake!")
});

// This routes all React Routes to our index.html, which in turn always calls bundle.js.
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// If we're passed a port bind it, otherwise use 3000
app.set('port', process.env.PORT || 3000);

// Create the server and put its ear to the binded port.
var server = app.listen(app.get('port'), function() {
  console.log('[INFO] Listening on port ', server.address().port);
});

// Function to keep our servers from sleeping. Calls both the client and api servers. Calls every 5 mins.
const fetch = require('isomorphic-fetch')

setInterval(function() {
  fetch("https://aaron-site.herokuapp.com/keepawake")
    .then(response => {
      return response.text();
    })
    .then(data => {
      console.log("[Keep Awake] Client: " + data);
    })

  fetch("https://aaron-site-api.herokuapp.com/aaron_site/api/v1/keepawake")
    .then(response => {
      return response.text();
    })
    .then(data => {
      console.log("[Keep Awake] API: " + data);
    })
}, 300000);