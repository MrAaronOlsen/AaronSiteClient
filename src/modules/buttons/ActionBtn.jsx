import React from 'react';
import styles from './actionBtn.mod.scss'

export default class ActionBtn extends React.Component {

  getClasses() {
    if (this.props.disabled) {
      return [styles.actionBtn, styles.disabled, this.props.classNames].join(" ")
    } else {
      return [styles.actionBtn, this.props.classNames].join(" ")
    }
  }

  getAction() {
    if (this.props.disabled) {
      return () => {};
    } else {
      return this.props.onClick;
    }
  }

  getStyles() {
    return {
      width: this.props.width || 'max-content'
    }
  }

  render() {
    return(
      <div
        className={this.getClasses()}
        style={this.getStyles()}
        onClick={this.getAction()}
        data-id={this.props.dataId}>

        <div className={styles.text}>
          {this.props.text}
        </div>
      </div>
    )
  }
}