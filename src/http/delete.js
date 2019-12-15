import { BASE_URL } from './url.js';

import Authentication from 'auth/Authentication.js'
import JwtToken from 'auth/JwtToken.js';
import executeRequest from './executeRequest.js'

export const DELETE = function(address, body, callback) {
  Authentication.getCurrentSessionToken(token => {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);

    var request = new Request(BASE_URL + address, {
      method: 'DELETE',
      mode: 'cors',
      body: body,
      headers: headers
    });

    executeRequest(request, callback);
  });
}