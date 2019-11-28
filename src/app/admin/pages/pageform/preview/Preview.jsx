import React, { Component} from "react";

import Blocks from 'blocks/Blocks.jsx'

import shortid from 'shortid';

import Reset from 'public/images/reset.jpg';
import styles from './preview.mod.scss'

export default class Header extends Component {
  state = {
    render: false,
    key: shortid.generate()
  }

  reset() {
    this.setState({
      key: shortid.generate()
    })
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.reset} onClick={this.reset.bind(this)}>
          <img src={Reset} />
        </div>

        <div className={styles.preview}>
          <Blocks key={this.state.key} blocks={this.props.blocks} />
        </div>
      </div>
    )
  }
}