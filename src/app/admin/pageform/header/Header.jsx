import React from "react";

import TextInput from 'modules/textinput/TextInput.jsx'

import styles from './header.mod.scss'

export default function Header(props) {

  return(
    <div className={styles.headerWrapper}>
      <TextInput classNames={styles.headerText}
        text={props.header}
        name="header"
        onChange={props.onChange}>

        <span className={styles.headerLabel}>Header</span>
      </TextInput>

      <TextInput classNames={styles.sequenceText}
        text={props.sequence}
        name="sequence"
        onChange={props.onChange}>

        <span className={styles.sequenceLabel}>Sequence</span>
      </TextInput>

      <TextInput classNames={styles.captionText}
        text={props.caption}
        name="caption"
        onChange={props.onChange}>

        <span className={styles.captionLabel}>Caption</span>
      </TextInput>

      <TextInput classNames={styles.slugText}
        text={props.slug}
        name="slug"
        onChange={props.onChange}>

        <span className={styles.slugLabel}>Slug</span>
      </TextInput>
    </div>
  )
}