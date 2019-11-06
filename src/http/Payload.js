export default class Payload {

  constructor(data) {
    this.data = data;
    this.errors = [];
  }

  withErrors(errors) {
    this.errors = this.errors.concat(errors);

    return this;
  }

  addError(error) {
    this.errors.push(error);
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  getErrors() {
    return this.errors.join(', ');
  }
}