import { API_V1, BASE_URL } from 'http/url.js';
import executeRequest from 'http/executeRequest.js';

import Logger from 'logger';
import JwtToken from './JwtToken.js';

export default class Authentication {

  static getCurrentSessionToken(callback) {
    if (JwtToken.hasToken()) {
      callback(JwtToken.getToken())
    } else {
      Logger.out("Logging in as Guest: " + GUEST_USER + " " + GUEST_PW)
      Authentication.logIn(GUEST_USER, GUEST_PW, function(token) {
        callback(token)
      })
    }
  }

  static logIn(name, password, callback) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(name + ":" + password));

    var request = new Request(BASE_URL + API_V1 + 'gettoken', {
      method: 'POST',
      mode: 'cors',
      headers: headers
    });

    executeRequest(request, function(payload) {
      if (!payload.hasErrors() && payload.getFirst()) {
        let token = payload.getFirst().token;
        let id = payload.getFirst().id;

        JwtToken.storeToken(token, id);
        callback(token)
      } else {
        callback(JSON.stringify(payload))
      }
    });
  }
}