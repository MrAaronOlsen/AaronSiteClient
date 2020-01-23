import BinaryTree from "./BinaryTree.js";
import Sidewinder from "./Sidewinder.js";
import RecursiveBacktrack from "./RecursiveBacktrack.js";
import Prims from "./Prims.js";
import Kruskals from "./Kruskals.js";
import NoOpMaze from "./NoOpMaze.js";


const BINARY_TREE = "BinaryTree";
const SIDEWINDER = "Sidewinder";
const RECURSIVE_BACKTRACK = "RecursiveBacktrack";
const PRIMS = "Prims";
const KRUSKALS = "Kruskals";

const MAZE_TEXT = {
  [BINARY_TREE]: "Binary Tree",
  [SIDEWINDER]: "Sidewinder",
  [RECURSIVE_BACKTRACK]: "Recursive Backtrack",
  [PRIMS]: "Prims",
  [KRUSKALS]: "Kruskals"
}

export default class Mazes {

  static get(maze) {
    switch (maze) {
      case BINARY_TREE:
        return new BinaryTree();
      case SIDEWINDER:
        return new Sidewinder();
      case RECURSIVE_BACKTRACK:
        return new RecursiveBacktrack();
      case PRIMS:
        return new Prims();
      case KRUSKALS:
        return new Kruskals();
      default:
        return new NoOpMaze();
    }
  }

  static getValues() {
    return [
      {text: MAZE_TEXT[BINARY_TREE], id: BINARY_TREE},
      {text: MAZE_TEXT[SIDEWINDER], id: SIDEWINDER},
      {text: MAZE_TEXT[RECURSIVE_BACKTRACK], id: RECURSIVE_BACKTRACK},
      {text: MAZE_TEXT[PRIMS], id: PRIMS},
      {text: MAZE_TEXT[KRUSKALS], id: KRUSKALS}
    ];
  }

  static getText(menuId) {
    return MAZE_TEXT[menuId]
  }
}