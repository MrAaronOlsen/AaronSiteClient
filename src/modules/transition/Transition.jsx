import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import styles from './transition.mod.scss'

export default class Transition extends Component {
  ref = createRef();

  duration = this.props.duration;
  property = this.props.property;
  type = this.props.type;
  startPos = this.props.startPos;
  restPos = this.props.restPos;
  endPos = this.props.endPos;
  unMountId = this.props.unMountId;

  state = {
    pos: this.props.startPos
  }

  componentDidMount() {
    if (this.props.unMount) {
      this.props.unMount({['unMount' + this.unMountId]: this.executeUnMountingTransition.bind(this)})
    }

    this.setTransitionVariables();
    this.executeMountingTransition();
  }

  setTransitionVariables() {
    this.ref.current.style.setProperty('--duration', this.duration + 'ms');
    this.ref.current.style.setProperty('--property', this.property);
    this.ref.current.style.setProperty('--type', this.type);
  }

  executeMountingTransition() {
    this.startTransition(() => {
      this.setState({
        pos: this.props.restPos
      })
    })
  }

  startTransition(callBack) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        callBack();
      })
    })
  }

  executeUnMountingTransition(callBack) {
    if (this.props.unMount) {
      this.ref.current.style[this.property] = this.endPos;

      setTimeout(function() {
        callBack();
      }.bind(this), this.duration)
    }
  }

  render() {
    return(
      <div ref={this.ref} className={styles.wrapper} style={{[this.property]: this.state.pos}}>
        {this.props.children}
      </div>
    )
  }
}

Transition.propTypes = {
  duration: PropTypes.number,
  property: PropTypes.string,
  type: PropTypes.string,
  startPos: PropTypes.string,
  restPos: PropTypes.string,
  endPos: PropTypes.string,
  unMountId: PropTypes.string
};

Transition.defaultProps = {
  duration: 500,
  property: 'left',
  type: 'ease',
  startPos: '100vw',
  restPos: '0',
  endPos: '100vw',
  unMountId: ''
}