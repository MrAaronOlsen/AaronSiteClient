import React, { Component } from 'react'

import BlockIterator from '../BlockIterator.jsx';

import styles from './modalBlock.mod.scss'

export default function modalBlock(Block) {

  class Wrapper extends Component {

    constructor(props) {
      super(props)

      this.state = {
        open: false,
        trigger: false
      }

      this.block = this.props.block || {};
      this.blocks = this.props.blocks || {};

      this.modal = this.block.modal;
    }

    triggerOut() {
      this.setState({
        trigger: !this.state.trigger
      })
    }

    open() {
      this.setState({
        open: true
      })
    }

    close() {
      this.setState({
        open: false
      })
    }

    render() {

      return (
        <React.Fragment>
          <Block {...this.props} onClick={this.open.bind(this)}/>
          {this.state.open &&
            <BlockIterator
              triggerOut={this.state.trigger}
              triggerAction={this.close.bind(this)}
              blocks={this.blocks}
              start={this.modal}
              onClick={this.triggerOut.bind(this)} />}
        </React.Fragment>
      )
    }
  }

  return Wrapper;
}