import React from 'react'

import Action from 'public/images/merge-32.png'
import styles from './actionField.mod.scss'

export default function ActionField(props) {

  return (
    <div name="toggle-children" className={styles.wrapper}>
      <div className={styles.children}>
        {props.children}
      </div>
      <img src={Action} className={styles.action} onClick={props.action}/>
    </div>
  )
}