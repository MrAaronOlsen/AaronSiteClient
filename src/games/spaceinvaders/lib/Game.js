import Controller from './Input.js';
import Collider from './Collider.js';

import Bullets from './Bullets.js';
import Player from './Player.js';
import MobWave from './MobWave.js';

const SCENE_GRID = 15;
const WAVE_LINES = 5;
const WAVE_COLUMNS = 11;

export default class Game {

  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.controller = new Controller();

    this.collider = new Collider();
    this.mobCollisionGroup = this.collider.newCollisionGroup();
    this.mobBulletCollisionGroup = this.collider.newCollisionGroup();
    this.playerCollisionGroup = this.collider.newCollisionGroup();
    this.playerBulletCollisionGroup = this.collider.newCollisionGroup();

    this.collider.collidesWith(this.mobCollisionGroup, this.playerBulletCollisionGroup, (a, b) =>  {
      a.markDestroy()
      b.markDestroy()
    });

    this.collider.collidesWith(this.playerCollisionGroup, this.mobBulletCollisionGroup, (a, b) =>  console.log("Collide"));

    this.bullets = new Bullets();
    this.bullets.setCollisionGroups(this.playerBulletCollisionGroup, this.mobBulletCollisionGroup);

    this.player = new Player();
    this.player.configure(this.width, this.height, SCENE_GRID);
    this.player.setBullets(this.bullets);
    this.playerCollisionGroup.addCollidable(this.player);

    this.mobWave = new MobWave(WAVE_LINES, WAVE_COLUMNS);
    this.mobWave.configure(this.width, this.height, SCENE_GRID);
    this.mobWave.setBullets(this.bullets)
    this.mobWave.setCollisionGroup(this.mobCollisionGroup)

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
    this.collider.update()
    this.bullets.update()
    this.player.update()
    this.mobWave.update()
  }

  draw(ctx) {
    this.player.draw(ctx)
    this.mobWave.draw(ctx)
    this.bullets.draw(ctx)
  }

  input() {
    this.player.check(this.controller)
  }
}