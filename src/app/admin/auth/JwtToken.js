export default class JwtToken {

  static storeToken(token) {
    window.sessionStorage.setItem("jwt", token);
  }

  static getToken(token) {
    return window.sessionStorage.getItem("jwt");
  }

  static hasToken() {
    return this.getToken() != null;
  }
}