import JwtToken from 'auth/JwtToken.js';
import executeRequest from './executeRequest.js'

const post = function(address, body, callback) {
  var token = JwtToken.getToken();

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authentication', 'Bearer ' + token);

  var request = new Request('http://localhost:8080/' + address, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(body),
    headers: headers
  });

  executeRequest(request, callback);
}

export default post;