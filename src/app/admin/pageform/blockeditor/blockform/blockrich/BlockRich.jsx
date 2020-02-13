import React from 'react'

import BlockRichEditor from './editor/BlockRichEditor.jsx'
import styles from './blockRich.mod.scss'

export default function BlockRich(props) {

  return(
    <div className={styles.wrapper}>
      <span>{props.name}: </span>

      <div className={styles.contentWrapper}>
        <BlockRichEditor
          name={props.name}
          text={props.content}
          onChange={props.onChange} />
      </div>
    </div>
  )
}