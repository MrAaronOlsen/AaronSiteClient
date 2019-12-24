import React from "react";

import styles from './element.mod.scss'

export default function Element(props) {

  function focus() {
    props.focus(props.pageId)
  }

  return(
    <div className={styles.wrapper} onClick={focus}>

      <div className={styles.header}>
        { props.header }
      </div>

      <div className={[styles.mode, styles[props.mode]].join(" ")}>
        { props.mode }
      </div>

      <div className={styles.sequence}>
        { props.sequence }
      </div>
    </div>
  )
}