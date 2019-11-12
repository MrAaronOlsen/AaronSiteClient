import React, { Component } from 'react';

import styles from './textInput.mod.scss'

export default class TextInput extends Component{

  getClassNames() {
    return [styles.textAreaWrapper, this.props.classNames].join(" ")
  }

  render() {
    return(
      <input className={this.getClassNames()}
        onChange={this.props.onChange}
        name={this.props.name}
        type='text'
        defaultValue={this.props.text}/>
    )
  }
}