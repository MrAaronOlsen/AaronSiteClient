export default class User {

  constructor(payload) {
    this.valid = false;

    if (payload.hasErrors()) {
      this.errors = payload.getErrors();
    } else {
      let user = payload.data;

      this.id = user.id;
      this.username = user.userName;
      this.roles = user.roles;

      this.valid = true;
    }
  }
}