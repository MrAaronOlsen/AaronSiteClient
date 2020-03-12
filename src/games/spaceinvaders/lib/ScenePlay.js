import { Collider } from 'game_core';

import Controller from './Controller.js';
import Bounds from './Bounds.js';
import Player from './Player.js';
import MobWave from './MobWave.js';

const SCENE_GRID = 15;
const WAVE_LINES = 5;
const WAVE_COLUMNS = 11;

export default class ScenePlay {

  constructor(game) {
    this.game = game;
    this.game.clearScene();

    this.width = game.width;
    this.height = game.height;

    this.controller = new Controller();

    this.collider = new Collider();
    this.collider.addGroups(["bounds", "mob", "player", "mobBullet", "playerBullet"])

    this.collider.collidesWith("playerBullet", "bounds", (a, b) => {
      a.markDestroy();
    })

    this.collider.collidesWith("mobBullet", "bounds", (a, b) => {
      a.markDestroy();
    })

    this.collider.collidesWith("mob", "playerBullet", (a, b) =>  {
      a.markDestroy();
      b.markDestroy();
    });

    this.collider.collidesWith("player", "mobBullet", (a, b) =>  {
      a.markDestroy();
      b.markDestroy();

      this.game.setScene(new ScenePlay(this.game))
    });

    this.collider.addCollidable("bounds", new Bounds(this.width, this.height))

    this.player = new Player();
    this.player.configure(this.width, this.height, SCENE_GRID);
    this.player.setCollider(this.collider);

    this.mobWave = new MobWave(WAVE_LINES, WAVE_COLUMNS);
    this.mobWave.configure(this.width, this.height, SCENE_GRID);
    this.mobWave.setCollider(this.collider);
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
      this.game.setScene(new ScenePlay(this.game))
    }

    this.player.check(this.controller)
  }
}