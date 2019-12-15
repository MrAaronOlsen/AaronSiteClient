import React, { Component } from 'react'

import BlockIterator from './BlockIterator.jsx'
import Logger from 'logger';

import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

import styles from './blocks.mod.scss'

export default class Blocks extends Component {
  state = {
    blocks: {}
  }

  componentDidMount() {
    if (this.props.query) {
      this.load()
    }
  }

  load() {
    GET(API_V1 + this.props.query, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to load page. Cause: " + payload.getErrors());
      } else {
        this.setState({
          blocks: payload.getFirst().blocks
        })
      }
    })
  }

  render() {
    return(
        <div name="blocks" className={styles.wrapper}>
          <BlockIterator
            triggerOut={this.props.triggerOut}
            triggerAction={this.props.actionOut}
            blocks={this.props.blocks || this.state.blocks} />
        </div>
    )
  }
}