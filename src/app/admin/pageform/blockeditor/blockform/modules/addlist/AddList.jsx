import React, { Component } from 'react'

import Line from './line/Line.jsx'
import AddButton from 'public/images/add-button.png'
import styles from './addList.mod.scss'

export default function AddList(props) {

  function onClick(name) {
    props.onClick(name)
  }

  function buildList() {
    if (props.items) {
      return props.items.map((name, i) => {
        return <Line key={i} name={name} onClick={onClick.bind(this)}/>
      })
    } else {
      return null;
    }
  }

  return(
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img className={styles.addBtn} src={AddButton} />
      </div>
      <div className={styles.list}>
        { buildList() }
      </div>
    </div>
  )
}