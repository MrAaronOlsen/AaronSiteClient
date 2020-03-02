import Player from './Player.js'
import Controller from './Input.js'

export default class Game {

  constructor(ctx) {
    this.ctx = ctx;

    this.controller = new Controller();
    this.player = new Player();

    this.loop = this.loop.bind(this);
  }

  start() {
    window.requestAnimationFrame(this.loop)
  }

  loop() {

    this.input()
    this.update()
    this.draw(this.ctx)

    window.requestAnimationFrame(this.loop)
  }

  update() {
    this.player.update()
  }

  draw(ctx) {
    this.player.draw(ctx)
  }

  input() {
    this.player.check(this.controller)
  }
}