import { BASE_URL } from './url.js';

import JwtToken from 'auth/JwtToken.js';
import executeRequest from './executeRequest.js'

export const GET = function(address, callback) {
  var token = JwtToken.getToken();

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authentication', 'Bearer ' + token);

  var request = new Request(BASE_URL + address, {
    method: 'GET',
    mode: 'cors',
    headers: headers
  });

  executeRequest(request, callback);
}