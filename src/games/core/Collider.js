import Vector from 'games/core/Vector.js';
import CollisionGroup from './CollisionGroup.js';

const TOP = (c) => c.pos.x;
const RIGHT = (c) => c.pos.y + c.width;
const BOT = (c) => c.pos.x + c.height;
const LEFT = (c) => c.pos.y;

export default class Collider {

  constructor() {
    this.collisionSets = []
    this.collisionGroups = {}
  }

  newCollisionGroup() {
    return new CollisionGroup();
  }

  collidesWith(groupA, groupB, callback) {
    this.collisionSets.push({groupA: groupA, groupB: groupB, callback: callback})
  }

  addGroups(groups) {
    groups.forEach((group) => {
      this.addGroup(group)
    });
  }

  addGroup(key) {
    this.collisionGroups[key] = new CollisionGroup();
  }

  addCollidable(key, collidable) {
    this.collisionGroups[key].addCollidable(collidable);
  }

  update() {
    this.collisionSets.forEach((set) => {
      const callback = set.callback;

      if (!callback) {
        return;
      }

      const groupA = this.collisionGroups[set.groupA];
      const groupB = this.collisionGroups[set.groupB];

      groupA.getCollidables().forEach((collidableA, i) => {
        if (this.isNotValid(groupA, collidableA, i)) {
          return;
        }

        groupB.getCollidables().forEach((collidableB, j) => {
          if (this.isNotValid(groupB, collidableB, j)) {
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

  isNotValid(group, collidable, index) {
    if (collidable == null) {
      return true;
    }

    try {
      if (collidable.isDestroyed()) {
        group.removeCollidable(index);
        return true;
      }
    } catch (err) {
      console.log(group)
      console.log(collidable)
      console.log(index)
    }

    return false;
  }

  checkCollides(a, b) {
    if (b.isBounds()) {
      return this.checkBounds(a, b);
    }

    return !(TOP(a) > BOT(b) || RIGHT(a) < LEFT(b) || BOT(a) < TOP(b) || LEFT(a) > RIGHT(b));
  }

  checkBounds(a, b) {
    return TOP(a) < 0 || RIGHT(a) > b.width || BOT(a) > b.height || LEFT(a) < 0;
  }
}