import Payload from './Payload.js';

const executeRequest = function(request, callback) {
  fetch(request)
    .then(response => {
      if (!response.ok) {
        throw Error('Bad request. ' + response.statusText)
      }

      return response.json();
    })
    .then(data => {
      callback(new Payload(data));
    })
    .catch(err => {
      callback(new Payload("").withErrors([err, request.url]))
    })
};

export default executeRequest;