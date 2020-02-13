import React, { Component } from 'react'

import { outsideClick } from 'effects'
import { anchorRefTo } from 'ref-utils'

import Line from './line/Line.jsx'
import styles from './selectList.mod.scss'

export default function SelectList(props) {
  const listRef = React.useRef(null);
  const textRef = React.useRef(null);
  const headerRef = React.useRef(null);

  const [expandList, setExpandList] = React.useState(false)

  React.useEffect(() => anchorRefTo(listRef, textRef), [expandList])
  React.useEffect(() => outsideClick(listRef, collapseList, [headerRef]), [])

  function onClick(name) {
    props.onClick(name)
  }

  function collapseList() {
    setExpandList(false)
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
      <div className={styles.header} ref={headerRef} onClick={() => setExpandList(!expandList)}>
        <div className={styles.name} ref={textRef} >
          { props.name + ":"}
        </div>
        <div className={styles.selected}>
          { props.selected }
        </div>
      </div>
      {expandList &&
        <div className={styles.list} ref={listRef} onMouseLeave={() => setExpandList(false)}>
          { buildList() }
        </div>
      }
    </div>
  )
}