import Controller from './Input.js'
import Player from './Player.js'
import MobWave from './MobWave.js'

export default class Game {

  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.controller = new Controller();
    this.player = new Player();
    this.player.configure(this.width, this.height, 15);

    this.mobWave = new MobWave(5, 11);
    this.mobWave.configure(this.width, this.height, 15);

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
    this.mobWave.update()
  }

  draw(ctx) {
    this.player.draw(ctx)
    this.mobWave.draw(ctx)
  }

  input() {
    this.player.check(this.controller)
  }
}