import React, { Component } from 'react'

import TextInput from 'modules/textinput/TextInput.jsx'
import Line from './line/Line.jsx'

import ArrowImg from 'public/images/arrow-down.png';
import AddButton from 'public/images/add-button.png'
import styles from './addList.mod.scss'

import setListPosition from './setListPosition.js'

export default function AddList(props) {
  const [custom, setCustom] = React.useState("")
  const listRef = React.useRef(null);

  const [expandList, setExpandList] = React.useState(false)

  function onClick(value) {
    props.onClick(value)
  }

  function mountList() {
    setExpandList(true)
    setListPosition(listRef)
  }

  function unmountList() {
    setExpandList(false)
  }

  function onCustomChange(value, name) {
    props.onClick(value)
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
        <img className={styles.arrow} src={ArrowImg} onMouseOver={mountList}/>
        <TextInput
          text={custom}
          onChange={setCustom}
          classNames={styles.custom} />
        <img className={styles.add} src={AddButton} onClick={() => props.onClick(custom)}/>

      </div>
      {expandList &&
        <div className={styles.list} ref={listRef} onMouseLeave={unmountList}>
          { buildList() }
        </div>
      }
    </div>
  )
}