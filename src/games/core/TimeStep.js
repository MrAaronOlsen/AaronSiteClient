export default class TimeStep {

  constructor(duration) {
    this.duration = duration;
    this.step = false
  }

  update() {
    if (!this.time) {
      this.time = new Date();
    }

    var now = new Date();
    this.step = ((now - this.time) >= this.duration);

    if (this.step) {
      this.time = now;
    }
  }

  get() {
    this.update()

    return this.step
  }
}