import React from 'react'

import { outsideClick } from 'effects'
import { anchorRefTo } from 'ref-utils'

import TextInput from 'modules/textinput/TextInput.jsx'
import Line from './line/Line.jsx'

import ArrowImg from 'public/images/arrow-down.png';
import AddButton from 'public/images/add-button.png'
import styles from './addList.mod.scss'

export default function AddList(props) {
  const listRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const [custom, setCustom] = React.useState("")
  const [expandList, setExpandList] = React.useState(false)

  React.useEffect(() => anchorRefTo(listRef, imgRef), [expandList])
  React.useEffect(() => outsideClick(listRef, () => setExpandList(false), [imgRef]))

  function onClick(value) {
    props.onClick(value)
  }

  function toggleList() {
    setExpandList(!expandList)
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
        <img className={styles.arrow} src={ArrowImg} onClick={toggleList} ref={imgRef}/>
        <TextInput
          text={custom}
          onChange={setCustom}
          classNames={styles.custom} />
        <img className={styles.add} src={AddButton} onClick={() => props.onClick(custom)}/>

      </div>
      {expandList &&
        <div className={styles.list} ref={listRef} onMouseLeave={() => setExpandList(false)}>
          { buildList() }
        </div>
      }
    </div>
  )
}