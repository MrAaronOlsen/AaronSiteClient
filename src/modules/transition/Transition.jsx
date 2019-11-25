import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import styles from './transition.mod.scss'

export default class Transition extends Component {
  id = 'transition' + '-' + shortid.generate();

  property = this.props.transProperty;
  durationIn = this.props.transInDuration;
  durationOut = this.props.transOutDuration;

  type = this.props.transType;
  delay = this.props.transDelay;

  outDelay = this.props.outDelay;

  inValue = this.props.inValue;
  outValue = this.props.outValue;

  width = this.props.width;

  setId = this.props.setId;

  state = {
    transValue: this.props.startValue
  }

  componentDidUpdate(prevProps) {
    // Checks to see if we have a state change to trigger an Out Transition.
    if (this.props.outTrigger !== prevProps.outTrigger) {

      // If we're being passed a targetId we only trigger the outTrans if it equals the setId
      if (this.props.targetId) {
        if (this.props.targetId == this.setId) {
          this.executeOutTransition();
        }
      } else {
        this.executeOutTransition();
      }
    }
  }

  componentDidMount() {
    this.setTransitionVariables();
    this.executeInTransition();
  }

  // Sets initial css vaiables.
  //
  setTransitionVariables() {
    var element = document.getElementById(this.id)

    if (element) {
      element.style.setProperty('--duration', this.durationIn);
      element.style.setProperty('--property', this.property);
      element.style.setProperty('--type', this.type);
      element.style.setProperty('--width', this.width);
    }
  }

  // Executes the inTrans by changing the state of the transValue to the inValue
  //
  executeInTransition() {
    this.startTransition(() => {
      this.setState({
        transValue: this.props.inValue
      })
    })
  }

  // A helper method to start a transition.
  // Attempts to fix an issue where the browser skips transition animations because of frame rate timing.
  startTransition(callBack) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        callBack();
      })
    })
  }

  // Triggers the out transition by changing the state of transValue to the outValue
  executeOutTransition() {
    var element = document.getElementById(this.id)
    if (element) {
      element.style.setProperty('--duration', this.durationOut);
    }

    setTimeout(function() {

      this.setState({
        transValue: this.outValue
      })

      // If we've been given an outCallback callback run it with the outDelay.
      if (this.props.outCallback) {
        setTimeout(function() {
          this.props.outCallback();
        }.bind(this), this.delay)
      }
    }.bind(this), this.outDelay)
  }

  render() {
    return(
      <div id={this.id} className={styles.wrapper} style={{[this.property]: this.state.transValue}}>
        {this.props.children}
      </div>
    )
  }
}

Transition.propTypes = {
  transProperty: PropTypes.string,
  transInDuration: PropTypes.string,
  transOutDuration: PropTypes.string,

  transType: PropTypes.string,
  transDelay: PropTypes.number,

  outDelay: PropTypes.number,
  outTrigger: PropTypes.bool,

  startValue: PropTypes.string,
  inValue: PropTypes.string,
  outValue: PropTypes.string,

  setId: PropTypes.string,
  targetId: PropTypes.string,

  width: PropTypes.string
};

Transition.defaultProps = {
  transProperty: 'left',
  transInDuration: '500ms',
  transOutDuration: '500ms',
  transType: 'ease',
  transDelay: 500,

  outDelay: 0,
  outTrigger: false,

  startValue: '100vw',
  inValue: '0',
  outValue: '100vw',

  width: '100%'
}