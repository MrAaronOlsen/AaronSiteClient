import React from 'react'

import TextInput from 'modules/textinput/TextInput.jsx'
import DeleteBtn from 'public/images/delete-button.png'
import styles from './blockText.mod.scss'

export default function BlockText(props) {

  function deleteLine() {
    props.delete(props.name)
  }

  return(
    <div className={styles.wrapper}>
      <span>{props.name}: </span>
      <TextInput name={props.name}
        text={props.text}
        onChange={props.onChange}
        classNames={styles.text} />
      {props.delete ? <img src={DeleteBtn} onClick={deleteLine}/> : null}

    </div>
  )
}