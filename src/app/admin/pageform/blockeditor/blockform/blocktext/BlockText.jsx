import React from 'react'
import shortid from 'shortid'

import DeleteBtn from 'blockform/common/deletebtn/DeleteBtn.jsx'
import TextInput from 'modules/textinput/TextInput.jsx'
import styles from './blockText.mod.scss'

export default function BlockText(props) {
  const [id] = React.useState(shortid.generate())

  function deleteLine() {
    props.delete(props.name)
  }

  function focus() {
    props.focus(id)
  }

  return(
    <div className={styles.wrapper} onClick={focus}>
      <span>{props.name}: </span>
      <TextInput
        name={props.name}
        text={props.text}
        onChange={props.onChange}
        classNames={styles.text} />

      { props.delete && <DeleteBtn onClick={deleteLine} focused={props.focused} parentId={id} /> }

    </div>
  )
}