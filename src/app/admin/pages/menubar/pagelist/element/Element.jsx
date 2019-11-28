import React, { Component} from "react";

import TextInput from 'modules/textinput/TextInput.jsx'
import styles from './element.mod.scss'

export default class Element extends Component {

  focus() {
    this.props.focus(this.props.pageId)
  }

  render() {
    return(
      <div className={styles.wrapper} onClick={this.focus.bind(this)}>
        <div className={styles.header}>
          { this.props.header }
        </div>

        <div className={styles.sequence}>
          { this.props.sequence }
        </div>
      </div>
    )
  }
}