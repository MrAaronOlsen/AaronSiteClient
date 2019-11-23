import React, { Component} from "react";

import TextInput from 'modules/textinput/TextInput.jsx'
import styles from './page.mod.scss'

export default class Page extends Component {

  focus() {
    this.props.focus(this.props.page)
  }

  getClassNames() {
    return [styles.wrapper, styles[this.props.page.inFocus]].join(" ")
  }

  render() {
    return(
      <div className={this.getClassNames()}
        onClick={this.focus.bind(this)}>

        <TextInput
          classNames={styles.inputWrapper}
          text={this.props.page.header}
          name="header"
          onChange={this.props.watch} />

      </div>
    )
  }
}