import React, { Component} from "react";

import Blocks from 'blocks/Blocks.jsx'

import shortid from 'shortid';

import Reset from 'public/images/reset.jpg';
import styles from './preview.mod.scss'

export default function Preview(props) {
  const [trigger, setTrigger] = React.useState(false)
  const [id, setId] = React.useState(shortid.generate())

  return(
    <div  className={styles.wrapper}>
      <div className={styles.reset} onClick={() => setId(shortid.generate())}>
        <img src={Reset} />
      </div>

      <div className={styles.trigger} onClick={() => setTrigger(!trigger)}>
        <img src={Reset} />
      </div>

      <div className={styles.preview}>
        <Blocks key={id}
          start={'start'}
          blocks={props.blocks}
          trigger={trigger} />
      </div>
    </div>
  )
}