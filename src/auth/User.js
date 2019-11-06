export default class User {

  constructor(payload) {
    this.valid = false;

    if (payload.hasErrors()) {
      this.errors = payload.getErrors();
    } else {
      let user = payload.data;

      this.name = user.name;
      this.id = user.id;
      this.role = user.role;

      this.valid = true;
    }
  }
}