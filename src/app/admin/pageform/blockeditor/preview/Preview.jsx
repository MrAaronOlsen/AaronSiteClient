import React, { Component} from "react";

import Blocks from 'blocks/Blocks.jsx'

import shortid from 'shortid';

import Reset from 'public/images/reset.jpg';
import styles from './preview.mod.scss'

export default class Preview extends Component {
  state = {
    trigger: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.trigger != this.state.trigger) {
      return true;
    }

    return false
  }

  triggerOut() {
    this.setState({
      trigger: !this.state.trigger
    })
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.reset} onClick={this.triggerOut.bind(this)}>
          <img src={Reset} />
        </div>

        <div className={styles.preview}>
          <Blocks key={this.state.key}
            trigger={this.state.trigger}
            blocks={this.props.blocks} />
        </div>
      </div>
    )
  }
}