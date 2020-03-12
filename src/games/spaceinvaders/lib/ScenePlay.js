import Scene from './Scene.js';
import Player from './Player.js';
import MobWave from './MobWave.js';

export default class ScenePlay extends Scene {

  constructor(game) {
    super(game)

    this.scale = 15;

    this.collider.addGroups(["bounds", "mob", "player", "mobBullet", "playerBullet"])
    this.collider.addCollidable("bounds", this)

    this.player = new Player(this);
    this.mobWave = new MobWave(this);

    this.collider.collidesWith("playerBullet", "bounds", (a, b) => {
      a.markDestroy();
    })

    this.collider.collidesWith("mobBullet", "bounds", (a, b) => {
      a.markDestroy();
    })

    this.collider.collidesWith("mob", "playerBullet", (a, b) =>  {
      a.markDestroy();
      b.markDestroy();

      this.mobWave.pause();
    });

    this.collider.collidesWith("player", "mobBullet", (a, b) =>  {
      a.markDestroy();
      b.markDestroy();

      this.game.setScene(new ScenePlay(this.game))
    });

  }

  update() {
    this.collider.update()
    this.player.update()
    this.mobWave.update()
  }

  draw(ctx) {
    this.player.draw(ctx)
    this.mobWave.draw(ctx)
  }

  input() {
    if (this.controller.esc()) {
      this.reset()
    }

    this.player.check(this.controller)
  }

  reset() {
    this.setScene(new ScenePlay(this.game))
  }
}