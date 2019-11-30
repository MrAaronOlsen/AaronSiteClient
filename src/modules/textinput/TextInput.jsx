import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './textInput.mod.scss'

export default class TextInput extends Component{

  onChange(element) {
    var content = element.currentTarget.value;

    this.props.onChange(content, this.props.name)
  }

  render() {
    return(
      <div className={this.props.classNames}>
        { this.props.children }

        <input className={styles.textAreaWrapper}
          onChange={this.onChange.bind(this)}
          name={this.props.name}
          type={this.props.type}
          defaultValue={this.props.text}/>
      </div>

    )
  }
}

TextInput.defaultProps = {
  type: 'text'
}