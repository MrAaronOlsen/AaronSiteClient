import Colors from '../core/Colors.js'

class Floor {
  constructor() {
    if(!!Floor.instance) {
      return Floor.instance;
    }

    Floor.instance = this;
    return this;
  }

  draw(ctx, x, y, size) {
    ctx.beginPath();

    ctx.fillStyle = Colors.ORANGE;
    ctx.fillRect(x, y, size, size);

    ctx.closePath();
  }
}

export default Floor;