import React, { Component } from 'react'

import BlockContext from './BlockContext.jsx'
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

  getFirstBlock() {
    if (this.props.query) {
      return this.getNextBlockFrom(this.state)
    } else if (this.props.blocks) {
      return this.getNextBlockFrom(this.props)
    }
  }

  getNextBlockFrom(state) {
    if (!state.blocks || !state.blocks.start) {
      return null;
    }

    var startBlock = state.blocks.start;
    return startBlock.next;
  }

  render() {
    return(
        <div className={styles.wrapper}>
          <BlockContext.Provider value={this.props.blocks || this.state.blocks}>
            <NextBlock name={this.getFirstBlock()} />
          </BlockContext.Provider>
        </div>
    )
  }
}