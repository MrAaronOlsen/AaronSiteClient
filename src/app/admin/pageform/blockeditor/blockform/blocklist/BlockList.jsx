import React from 'react'
import shortid from 'shortid'

import SelectList from 'blockform/modules/selectlist/SelectList.jsx'

import styles from './blockList.mod.scss'

export default function BlockList(props) {
  const [id] = React.useState(shortid.generate());

  function deleteLine() {
    props.delete(props.name)
  }

  function focus() {
    props.focus(id)
  }

  function onSelect(value) {
    if (value === props.text) {
      props.onChange("", props.name)
    } else {
      props.onChange(value, props.name)
    }
  }

  return (
    <div className={styles.wrapper} onClick={focus} onMouseOver={props.onMouseOver}>
      <SelectList
        name={props.name}
        items={props.items}
        selected={props.content}
        onClick={onSelect} />

    </div>
  )
}