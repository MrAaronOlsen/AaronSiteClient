export default class TimeStep {

  constructor(duration) {
    this.default = duration;
    this.duration = duration;
    this.step = false
    this.isPaused = false;
  }

  update() {
    if (!this.time) {
      this.time = new Date();
    }

    var now = new Date();
    this.step = ((now - this.time) >= this.duration);

    if (this.step) {
      this.time = now;

      this.duration = this.default;
      this.isPaused = false;
    }
  }

  pause(duration) {
    this.isPaused = true;
    this.duration = duration;
  }

  get() {
    this.update()

    return this.step
  }
}