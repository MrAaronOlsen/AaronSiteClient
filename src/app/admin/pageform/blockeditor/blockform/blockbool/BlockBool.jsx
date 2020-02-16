import React from 'react'
import shortid from 'shortid'

import DeleteBtn from 'blockform/modules/deletebtn/DeleteBtn.jsx'
import Input from 'modules/input/Input.jsx'
import styles from './blockBool.mod.scss'

export default function BlockText(props) {
  const [id] = React.useState(shortid.generate())

  function onChange(value) {
    console.log(value)
    props.onChange(value, props.name)
  }

  return(
    <div className={styles.wrapper} >
      <span>{props.name}: </span>
        <Input
          checked={props.content}
          onChange={onChange}
          type={'checkbox'}
          classNames={styles.text} />

    </div>
  )
}