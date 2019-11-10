import Payload from './Payload.js';

const executeRequest = (request, callback) => {
  fetch(request)
    .then(response => {
      if (!response.ok) {
        throw Error('Request not ok: ' + response.statusText)
      }

      return response.json();
    })
    .then(data => {
      if (data && data.data) {
        callback(new Payload(data.data));
      } else {
        callback(new Payload());
      }

    })
    .catch(err => {
      callback(new Payload("").withErrors([err, request.url]))
    })
};

export default executeRequest;