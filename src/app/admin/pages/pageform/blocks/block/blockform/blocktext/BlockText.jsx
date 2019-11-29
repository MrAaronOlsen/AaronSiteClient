import React, { Component } from 'react'

import TextInput from 'modules/textinput/TextInput.jsx'
import styles from './blockText.mod.scss'

export default class BlockText extends Component {

  render() {
    return(
      <div className={styles.wrapper}>
        <span>{this.props.name}: </span>
        <TextInput name={this.props.name}
          text={this.props.text}
          onChange={this.props.onChange}
          classNames={styles.text} />
      </div>
    )
  }
}