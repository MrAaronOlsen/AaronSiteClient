import React, { Component } from 'react'

import NextBlock from './NextBlock.jsx'
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
          blocks: JSON.parse(payload.getFirst().blocks)
        })
      }
    })
  }

  render() {
    return(
        <div className={styles.wrapper}>
          <NextBlock
            triggerOut={this.props.triggerOut}
            triggerAction={this.props.actionOut}
            blocks={this.props.blocks || this.state.blocks} />
        </div>
    )
  }
}