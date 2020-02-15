import React from 'react'
import shortid from 'shortid'

import DeleteBtn from 'blockform/modules/deletebtn/DeleteBtn.jsx'
import TextInput from 'modules/textinput/TextInput.jsx'
import styles from './blockNumber.mod.scss'

export default function BlockNumber(props) {
  const [id] = React.useState(shortid.generate())

  function deleteLine() {
    props.delete(props.name)
  }

  function onChange(value, name) {
    if (value) {
      props.onChange(parseFloat(value), props.name)
    }
  }

  function focus() {
    props.focus(id)
  }

  return(
    <div className={styles.wrapper} onClick={focus}>
      <span>{props.name}: </span>
      <TextInput
        name={props.name}
        text={props.content}
        onChange={onChange}
        type={'number'}
        classNames={styles.text} />

      { props.delete && <DeleteBtn onClick={deleteLine} focused={props.focused} parentId={id} /> }

    </div>
  )
}