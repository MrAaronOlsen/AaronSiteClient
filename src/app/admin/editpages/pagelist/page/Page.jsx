import React, { Component} from "react";

import TextInput from 'modules/textinput/TextInput.jsx'
import styles from './page.mod.scss'

export default class Page extends Component {

  focus() {
    this.props.focus(this.props.page.id)
  }

  render() {
    return(
      <div className={styles.wrapper} onClick={this.focus.bind(this)}>
        <span>{this.props.page.header}</span>
      </div>
    )
  }
}