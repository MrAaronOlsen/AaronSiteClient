import get from '../http/get.js'
import post from '../http/post.js'

import JwtToken from './JwtToken.js'
import User from './User.js'

export default class Authentication {

  static getCurrentUser(callback) {

    get('api/v1/user', (payload) => {
      callback(new User(payload));
    })
  }

  static getTokenFromBasicAuth(name, password, callback) {
    var body = {
      name: name,
      password: password
    };

    post('api/v1/authentication', body, (result) => {
      var token = result.data.token;

      if (token) {
        JwtToken.storeToken(token);

        callback('success');
      } else {
        callback('failure');
      }
    })
  }
}