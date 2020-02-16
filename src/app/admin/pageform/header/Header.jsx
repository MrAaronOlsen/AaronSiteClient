import React from "react";

import Input from 'modules/input/Input.jsx'

import styles from './header.mod.scss'

export default function Header(props) {

  return(
    <div className={styles.headerWrapper}>
      <Input classNames={styles.headerText}
        text={props.header}
        name="header"
        onChange={props.onChange}>

        <span className={styles.headerLabel}>Header</span>
      </Input>

      <Input classNames={styles.sequenceText}
        text={props.sequence}
        name="sequence"
        onChange={props.onChange}>

        <span className={styles.sequenceLabel}>Sequence</span>
      </Input>

      <Input classNames={styles.captionText}
        text={props.caption}
        name="caption"
        onChange={props.onChange}>

        <span className={styles.captionLabel}>Caption</span>
      </Input>

      <Input classNames={styles.slugText}
        text={props.slug}
        name="slug"
        onChange={props.onChange}>

        <span className={styles.slugLabel}>Slug</span>
      </Input>
    </div>
  )
}