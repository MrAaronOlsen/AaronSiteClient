import Vector from 'games/core/Vector.js';
import CollisionGroup from './CollisionGroup.js';

const TOP = (c) => c.pos.x;
const RIGHT = (c) => c.pos.y + c.width;
const BOT = (c) => c.pos.x + c.height;
const LEFT = (c) => c.pos.y;

export default class Collider {


  constructor() {
    this.groupSets = []
  }

  newCollisionGroup() {
    return new CollisionGroup();
  }

  collidesWith(groupA, groupB, callback) {
    this.groupSets.push({groupA: groupA, groupB: groupB, callback: callback})
  }

  update() {
    this.groupSets.forEach((groupSet) => {
      const callback = groupSet.callback;

      if (!callback) {
        return;
      }

      const groupA = groupSet.groupA;
      const groupB = groupSet.groupB;

      groupA.getCollidables().forEach((collidableA, i) => {
        if (collidableA == null) {
          return;
        }

        if (collidableA.isDestroyed()) {
          groupA.removeCollidable(i);
          return;
        }

        groupB.getCollidables().forEach((collidableB, j) => {
          if (collidableB == null) {
            return;
          }

          if (collidableB.isDestroyed()) {
            groupB.removeCollidable(j)
            return;
          }

          if (this.checkCollides(collidableA, collidableB)) {
            callback(collidableA, collidableB)
          }
        });
      });

      groupA.clean();
      groupB.clean();
    });
  }

  checkCollides(a, b) {
    return !(TOP(a) > BOT(b) || RIGHT(a) < LEFT(b) || BOT(a) < TOP(b) || LEFT(a) > RIGHT(b));
  }
}