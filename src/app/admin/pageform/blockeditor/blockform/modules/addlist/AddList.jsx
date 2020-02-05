import React, { Component } from 'react'

import Line from './line/Line.jsx'
import AddButton from 'public/images/add-button.png'
import styles from './addList.mod.scss'

export default function AddList(props) {
  const [checkPos, setCheckPos] = React.useState(false)
  const ref = React.useRef(null);

  React.useEffect(setPosition, [checkPos]);

  function setPosition() {
    const element = ref.current;

    if (!element) {
      return;
    }

    const topPos = element.getBoundingClientRect().top;
    const botPos = element.getBoundingClientRect().bottom;
    const height = window.innerHeight;

    if (topPos + 300 > height || botPos + 300 > height) {
      ref.current.style.removeProperty("top")
      ref.current.style.bottom = "20px"
    } else {
      ref.current.style.removeProperty("bottom")
      ref.current.style.top = "20px"
    }
  }

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
        <img className={styles.addBtn} src={AddButton} onMouseOver={() => setCheckPos(!checkPos)}/>
      </div>
      <div className={styles.list} ref={ref}>
        { buildList() }
      </div>
    </div>
  )
}