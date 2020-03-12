import { Collider, Collidable } from 'game_core';
import Controller from './Controller.js';

export default class Scene extends Collidable {
  width;
  height;
  collider;
  controller;

  constructor(game) {
    super()

    this.game = game;
    this.game.clearScene();

    this.width = game.width;
    this.height = game.height;

    this.controller = new Controller();
    this.collider = new Collider();
  }

  setScene(scene) {
    this.game.setScene(scene)
  }

  isBounds() {
    return true;
  }
}