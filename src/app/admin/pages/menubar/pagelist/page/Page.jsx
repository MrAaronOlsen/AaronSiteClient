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
        <TextInput
          classNames={styles.headerWrapper}
          onChange={this.props.onChange}
          name="header"
          text={this.props.page.header}/>

        <TextInput
          classNames={styles.sequenceWrapper}
          onChange={this.props.onChange}
          name="sequence"
          text={this.props.page.sequence}/>
      </div>
    )
  }
}