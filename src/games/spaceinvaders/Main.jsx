import React from 'react';

import Canvas from 'canvas';
import styles from './main.mod.scss';

import Game from './lib/Game.js';

export default function Main(props) {
  const ref = React.createRef()
  const game =

  React.useEffect(() => {
    const canvas = ref.current;

    if (canvas) {
      new Game(canvas.getContext("2d")).start()
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <Canvas canvasRef={ref} height={700} width={700} classNames={styles.canvas}/>
    </div>
  )
}