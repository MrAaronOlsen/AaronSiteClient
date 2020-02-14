import React from 'react'

import SelectList from 'blockform/modules/selectlist/SelectList.jsx'
import styles from './toggleType.mod.scss'

const elements = [
  'T', '[ ]', '{ }',
]
export default function ToggleType(props) {

  function toggleType() {
    if (props.type === 'text') {
      props.onChange({}, props.name)
    } else {
      props.onChange("", props.name)
    }
  }

  function symbol() {
    return props.type === 'text' ? "{ }" : "T"
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.children}>
        {props.children}
      </div>
      <div className={styles.toggle} onClick={toggleType}>
        { symbol() }
      </div>
    </div>
  )
}