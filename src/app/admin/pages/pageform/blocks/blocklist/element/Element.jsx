import React from 'react'

import TextInput from 'modules/textinput/TextInput.jsx'
import DeleteBtn from 'public/images/delete-button.png'

import styles from './element.mod.scss'

export default function BlockList(props) {

  function onClick() {
    props.onClick(props.name)
  }

  function onChange(newName) {
    props.moveBlock(props.name, newName)
  }

  function deleteBlock() {
    props.deleteBlock(props.name)
  }

  return(
    <div className={styles.wrapper} onClick={onClick.bind(this)}>
      <TextInput text={props.name}
        onChange={onChange.bind(this)}
        classNames={[props.focused ? styles.focused : "", styles.textWrapper].join(" ")}>

        <img className={styles.deleteBtn} src={DeleteBtn} onClick={deleteBlock.bind(this)}/>
      </TextInput>
    </div>
  )
}