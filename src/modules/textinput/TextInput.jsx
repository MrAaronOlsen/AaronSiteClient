import React, { Component } from 'react';

import styles from './textInput.mod.scss'

export default class TextInput extends Component{

  onChange(element) {
    var content = element.currentTarget.value;

    this.props.onChange(content, this.props.name)
  }

  getClassNames() {
    return [styles.textAreaWrapper, this.props.classNames].join(" ")
  }

  render() {
    return(
      <input className={this.getClassNames()}
        onChange={this.onChange.bind(this)}
        name={this.props.name}
        type='text'
        defaultValue={this.props.text}/>
    )
  }
}