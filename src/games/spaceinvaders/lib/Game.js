import ScenePlay from './ScenePlay.js'

export default class Game {
  ctx; width; height;

  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.scene = new ScenePlay(this);

    this.loop = this.loop.bind(this);
  }

  start() {
    window.requestAnimationFrame(this.loop)
  }

  loop() {
    this.scene.input()
    this.scene.update()
    this.scene.draw(this.ctx)

    window.requestAnimationFrame(this.loop)
  }

  clearScene() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  setScene(scene) {
    this.scene = scene;
  }
}