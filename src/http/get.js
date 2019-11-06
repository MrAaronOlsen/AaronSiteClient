import JwtToken from 'auth/JwtToken.js';
import executeRequest from './executeRequest.js'

const get = function(address, callback) {
  var token = JwtToken.getToken();

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authentication', 'Bearer ' + token);

  var request = new Request('http://localhost:8080/' + address, {
    method: 'GET',
    mode: 'cors',
    headers: headers
  });

  executeRequest(request, callback);
}

export default get;