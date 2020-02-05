import React, { Component} from "react";

import Blocks from 'blocks/Blocks.jsx'

import shortid from 'shortid';

import Reset from 'public/images/reset.jpg';
import styles from './preview.mod.scss'

export default class Preview extends Component {
  state = {
    key: shortid.generate(),
    triggerOut: false
  }

  reset() {
    this.setState({
      key: shortid.generate()
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.key != this.state.key || nextState.triggerOut != this.state.triggerOut) {
      return true;
    }

    return false
  }

  triggerOut() {
    this.setState({
      triggerOut: !this.state.triggerOut
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
            triggerOut={this.state.triggerOut}
            actionOut={this.reset.bind(this)}
            blocks={this.props.blocks} />
        </div>
      </div>
    )
  }
}