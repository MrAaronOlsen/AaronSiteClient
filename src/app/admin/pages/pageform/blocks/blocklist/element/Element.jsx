import React, { Component } from 'react'

import TextInput from 'modules/textinput/TextInput.jsx'

import DeleteBtn from 'public/images/delete-button.png'
import styles from './element.mod.scss'

export default class BlockList extends Component {

  onClick() {
    this.props.onClick(this.props.name)
  }

  onChange(newName) {
    this.props.moveBlock(this.props.name, newName)
  }

  deleteBlock() {
    this.props.deleteBlock(this.props.name)
  }

  render() {
    return(
      <div className={styles.wrapper} onClick={this.onClick.bind(this)}>
        <TextInput text={this.props.name}
          onChange={this.onChange.bind(this)}
          classNames={[this.props.focused ? styles.focused : "", styles.textWrapper].join(" ")}>

          <img className={styles.deleteBtn} src={DeleteBtn} onClick={this.deleteBlock.bind(this)}/>
        </TextInput>
      </div>
    )
  }
}