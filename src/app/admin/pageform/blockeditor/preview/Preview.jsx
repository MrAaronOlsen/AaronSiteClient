import React, { Component} from "react";

import MotionExit from 'motion/MotionExit.jsx';
import Blocks from 'blocks/Blocks.jsx'

import shortid from 'shortid';

import Reset from 'public/images/reset.jpg';
import ToggleOn from 'public/images/toggle-on.png';
import ToggleOff from 'public/images/toggle-off.png';

import styles from './preview.mod.scss'

export default function Preview(props) {
  const [trigger, setTrigger] = React.useState(false)

  const [id, setId] = React.useState(shortid.generate())
  const [message, setMessage] = React.useState("Hello")

  React.useEffect(() => setMessage(`Trigger: ${trigger}`), [trigger])

  function onExitCallback() {
    setMessage(`Animation Exited...`)
  }

  return(
    <div  className={styles.wrapper}>
      <div className={styles.reset} onClick={() => setId(shortid.generate())}>
        <img src={Reset} />
      </div>

      <div className={styles.message}>
        {message}
      </div>

      <div className={styles.trigger} onClick={() => setTrigger(!trigger)}>
        <img src={trigger ? ToggleOn : ToggleOff} />
      </div>

      <div className={styles.preview}>
        <MotionExit key={id} trigger={trigger} onExit={onExitCallback} >
          <Blocks blocks={props.blocks} start={'start'} />
        </MotionExit>
      </div>
    </div>
  )
}