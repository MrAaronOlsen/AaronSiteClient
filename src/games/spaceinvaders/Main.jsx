import React from 'react';

import Canvas from 'canvas';
import styles from './main.mod.scss';

import Game from './lib/Game.js';

const sizeX = 640;
const sizeY = 640;

export default function Main(props) {
  const ref = React.createRef()

  React.useEffect(() => {
    const canvas = ref.current;

    if (canvas) {
      new Game(canvas.getContext("2d"), sizeX, sizeY).start()
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <Canvas canvasRef={ref} width={sizeX} height={sizeY} classNames={styles.canvas}/>
    </div>
  )
}