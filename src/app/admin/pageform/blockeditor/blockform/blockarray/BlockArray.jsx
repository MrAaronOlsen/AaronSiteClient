import React from 'react'
import shortid from 'shortid'

import DeleteBtn from 'blockform/modules/deletebtn/DeleteBtn.jsx'
import TextInput from 'modules/textinput/TextInput.jsx'
import styles from './blockArray.mod.scss'

export default function BlockText(props) {
  const [id] = React.useState(shortid.generate())

  function deleteLine() {
    props.delete(props.name)
  }

  function focus() {
    props.focus(id)
  }

  function onChange(value, name) {
    if (value) {
      props.onChange(value.split(", "), props.name)
    }
  }

  function content() {
    return props.content ? props.content.join(", ") : []
  }

  return(
    <div className={styles.wrapper} onClick={focus}>
      <span>{props.name}: </span>
        <TextInput
          name={props.name}
          text={content()}
          onChange={onChange}
          classNames={styles.text} />

      { props.delete && <DeleteBtn onClick={deleteLine} focused={props.focused} parentId={id} /> }

    </div>
  )
}