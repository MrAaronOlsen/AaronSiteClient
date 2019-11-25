import React, { Component } from 'react';
import Interweave from 'interweave';

import styles from './page.mod.scss'

class Page extends Component {
  id = this.props.page.id;

  getClasses() {
    return [styles.wrapper, styles[this.props.classNames]].join(" ")
  }

  onClick(action) {
    if (this.props.onClick) {
      this.props.onClick(this.id)
    }
  }

  render() {
    return(
      <div className={this.getClasses()} onClick={this.onClick.bind(this)}>
        <h4>{this.props.page.header}</h4>

        <div className={styles.textWrapper}>
          {this.props.page.preview}
        </div>
      </div>
    )
  }
}

export default Page;