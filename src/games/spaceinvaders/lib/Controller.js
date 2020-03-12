const KEY_CODES = {
  37: "LEFT",
  39: "RIGHT",
  32: "SPACE",
  27: "ESC"
}

export default class Controller {

  constructor() {
    this.actions = {
      "LEFT": false,
      "RIGHT": false,
      "SPACE": false,
      "ESC": false
    }

    document.addEventListener("keydown", ((event) => {
      const key = KEY_CODES[event.keyCode];

      if (key) {
        this.actions[key] = true
      }
    }).bind(this), false);

    document.addEventListener("keyup", ((event) => {
      const key = KEY_CODES[event.keyCode];

      if (key) {
        this.actions[key] = false
      }
    }).bind(this), false);
  }

  left() {
    return this.actions.LEFT
  }

  right() {
    return this.actions.RIGHT
  }

  space() {
    return this.actions.SPACE
  }

  esc() {
    return this.actions.ESC
  }
}