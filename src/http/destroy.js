import { BASE_URL } from './url.js';

import JwtToken from 'auth/JwtToken.js';
import executeRequest from './executeRequest.js'

const destroy = function(address, body, callback) {
  var token = JwtToken.getToken();

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authentication', 'Bearer ' + token);

  var request = new Request(BASE_URL + address, {
    method: 'DELETE',
    mode: 'cors',
    body: body,
    headers: headers
  });

  executeRequest(request, callback);
}

export default destroy;