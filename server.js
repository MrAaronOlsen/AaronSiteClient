// This can be run with npm start.
// Dev builds are always run via npm run dev which does not use express.

var path = require('path');
var express = require('express');

var app = express();

// Sets the root.
app.use(express.static(path.join(__dirname)));

// This routes all React Routes to our index.html, which in turn always calls bundle.js.
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});