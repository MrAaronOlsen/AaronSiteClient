export default class JwtToken {

  static storeToken(token, id) {
    window.sessionStorage.setItem("jwt", token);
    window.sessionStorage.setItem("jwt_id", id);
  }

  static getToken() {
    return window.sessionStorage.getItem("jwt");
  }

  static getId() {
    return window.sessionStorage.getItem("jwt_id");
  }

  static hasToken() {
    return this.getToken() != null;
  }
}