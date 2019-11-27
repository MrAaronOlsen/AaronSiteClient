import React, { Component } from 'react'

import Block from './block/Block.jsx'
import BlockContext from './BlockContext.jsx'

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
      return <Block blockName={this.state.blocks.start}/>
    } else {
      if (this.props.blocks) {
        return <Block blockName={this.props.blocks.start}/>
      } else {
        return null
      }
    }
  }

  render() {
    return(
        <div className={styles.wrapper}>
          <BlockContext.Provider value={this.props.blocks || this.state.blocks}>
            { this.getFirstBlock() }
          </BlockContext.Provider>
        </div>
    )
  }
}