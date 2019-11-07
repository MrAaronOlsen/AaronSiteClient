import React, { Component } from 'react';
import HeadlinesPicker from './HeadlinesPicker.jsx'

import styles from './headlinesButton.mod.scss';

class HeadlinesButton extends Component {
  onMouseDown = (event) => event.preventDefault()

  onClick = () => this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div onMouseDown={this.onMouseDown} className={styles.headlineButtonWrapper}>
        <button onClick={this.onClick} className={styles.headlineButton}>
          H
        </button>
      </div>
    );
  }
}

export default HeadlinesButton;