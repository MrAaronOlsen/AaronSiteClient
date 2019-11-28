import React, { Component} from "react";

import TextInput from 'modules/textinput/TextInput.jsx'

import styles from './header.mod.scss'

export default class Header extends Component {

  render() {
    return(
      <div className={styles.headerWrapper}>
        <TextInput classNames={styles.headerText}
          text={this.props.header}
          name="header"
          onChange={this.props.watchContent}>

          <span className={styles.headerLabel}>Header</span>
        </TextInput>

        <TextInput classNames={styles.sequenceText}
          text={this.props.sequence}
          name="sequence"
          onChange={this.props.watchContent}>

          <span className={styles.sequenceLabel}>Sequence</span>
        </TextInput>

        <TextInput classNames={styles.captionText}
          text={this.props.caption}
          name="caption"
          onChange={this.props.watchContent}>

          <span className={styles.captionLabel}>Caption</span>
        </TextInput>
        <TextInput classNames={styles.slugText}
          text={this.props.slug}
          name="slug"
          onChange={this.props.watchContent}>

          <span className={styles.slugLabel}>Slug</span>
        </TextInput>
      </div>
    )
  }
}