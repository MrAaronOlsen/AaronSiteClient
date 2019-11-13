const fetch = require('isomorphic-fetch')

const keepAlive = function() {

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
}

module.exports = keepAlive;
