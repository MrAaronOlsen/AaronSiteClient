import React from 'react'

import ToggleList from 'modules/lists/togglelist/ToggleList.jsx'
import TextInput from 'modules/textinput/TextInput.jsx'

import ArrowImg from 'public/images/arrow-down.png';
import AddButton from 'public/images/add-button.png'

import styles from './addList.mod.scss'

export default function AddList(props) {
  const imgRef = React.useRef(null);
  const [custom, setCustom] = React.useState("")
  const [expandList, setExpandList] = React.useState(false)

  function onClick(value) {
    props.onClick(value)
  }

  function toggleList() {
    setExpandList(!expandList)
  }

  function onCustomChange(value, name) {
    props.onClick(value)
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
      <ToggleList classNames={{'list': styles.list}}
        onClick={onClick}
        items={props.items}
        anchorRef={imgRef}
        expand={expandList}
        ignoreRefs={[imgRef]}/>
    </div>
  )
}