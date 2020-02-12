import React from 'react'
import shortid from 'shortid'

import DeleteBtn from 'blockform/modules/deletebtn/DeleteBtn.jsx'
import TextInput from 'modules/textinput/TextInput.jsx'
import styles from './blockBool.mod.scss'

export default function BlockText(props) {
  const [id] = React.useState(shortid.generate())

  function onChange(event) {
    props.onChange(event.target.checked, props.name)
  }

  return(
    <div className={styles.wrapper} >
      <span>{props.name}: </span>
      <input type="checkbox"
        onChange={onChange}
        className={styles.radio} />

    </div>
  )
}