import React, { Component } from 'react'

import TextInput from 'modules/textinput/TextInput.jsx'
import DeleteBtn from 'public/images/delete-button.png'
import styles from './blockText.mod.scss'

export default class BlockText extends Component {

  delete() {
    this.props.delete(this.props.name)
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <span>{this.props.name}: </span>
        <TextInput name={this.props.name}
          text={this.props.text}
          onChange={this.props.onChange}
          classNames={styles.text} />
        {this.props.delete ? <img src={DeleteBtn} onClick={this.delete.bind(this)}/> : null}

      </div>
    )
  }
}