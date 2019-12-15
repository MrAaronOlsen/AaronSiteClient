import Payload from './Payload.js';
import Logger from 'logger';

const executeRequest = (request, callback) => {
  fetch(request)
    .then(response => {
      if (!response.ok) {
        throw response;
      }

      return response.json();
    })
    .then(data => {
      if (data && data.data) {
        callback(new Payload(data.data));
      } else {
        callback(new Payload(data));
      }

    })
    .catch(err => {
      err.json().then(data => {
        callback(new Payload("").withErrors([data]))
      })
    })
};

export default executeRequest;