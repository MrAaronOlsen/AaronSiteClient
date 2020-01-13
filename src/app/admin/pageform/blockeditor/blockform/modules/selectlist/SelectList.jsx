import React, { Component } from 'react'

import Line from './line/Line.jsx'
import styles from './selectList.mod.scss'

export default function SelectList(props) {

  function onClick(name) {
    props.onClick(name)
  }

  function buildList() {
    if (props.items) {
      return props.items.map((name, i) => {
        return <Line key={i}
          name={name}
          selected={name === props.selected}
          onClick={onClick.bind(this)}/>
      })
    } else {
      return null;
    }
  }

  return(
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.name}>
          { props.name + ":"}
          <div className={styles.list}>
            { buildList() }
          </div>
        </div>
        <div className={styles.selected}>
          { props.selected }
        </div>
      </div>
    </div>
  )
}