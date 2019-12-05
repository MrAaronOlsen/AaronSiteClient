import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import styled from 'styled-components'
import styles from './transition.mod.scss'
import Themogrify from 'mixins/theme.js'

const StylesWrapper = styled.div(props => Themogrify(props.styles));

export default class Transition extends Component {
  // Used to identify itself when multiple transitions exist on the dom.
  id = shortid.generate();

  // Props hold defaults. If a config is passed in merge that into props.
  config = {...this.props, ...this.props.config || {}}

  state = {
    transValue: this.config.startValue
  }

  componentDidUpdate(prevProps) {
    // Checks to see if we have a state change to trigger an Out Transition.
    if (this.props.outTrigger !== prevProps.outTrigger) {

      // If we're being passed a targetId we only trigger the outTrans if it equals the setId
      if (this.props.targetId) {
        if (this.props.targetId == this.config.setId) {
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

  // Sets css variables.
  //
  setTransitionVariables() {
    var element = document.getElementById(this.id)

    if (element) {
      element.style.setProperty('--duration', this.config.transDurationIn);
      element.style.setProperty('--property', this.config.transProperty);
      element.style.setProperty('--type', this.config.transType);
      element.style.setProperty('--width', this.config.width || '100%');
    }
  }

  // Executes the inTrans by changing the state of the transValue to the inValue
  //
  executeInTransition() {
    this.startTransition(() => {
      setTimeout(() => {
        this.setState({
          transValue: this.config.inValue
        })
      }, this.config.transDelayIn)
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
      element.style.setProperty('--duration', this.config.transDurationOut);
    }

    setTimeout(function() {

      this.setState({
        transValue: this.config.outValue
      })

      // If we've been given an outCallback callback run it with the outDelay.
      if (this.config.outCall) {
        setTimeout(function() {
          this.config.outCall();
        }.bind(this), this.config.transDelayOut)
      }
    }.bind(this), this.config.outCallDelay)
  }

  render() {
    return(
      <StylesWrapper styles={this.config.styles} >
        <div id={this.id} className={styles.wrapper} style={{[this.config.transProperty]: this.state.transValue}}>
          {this.props.children}
        </div>
      </StylesWrapper>
    )
  }
}

// Properties is used as a list of editable properties and defaults.
export const properties = {
  transProperty: 'left',
  transType: 'ease',

  startValue: '100vw',
  inValue: '0',
  outValue: '100vw',

  transDelayIn: 500,
  transDelayOut: 500,

  transDurationIn: '500ms',
  transDurationOut: '500ms',

  outCallDelay: 0,

  width: '100%',
  styles: {}
}

Transition.propTypes = {
  transProperty: PropTypes.string,
  transType: PropTypes.string,

  startValue: PropTypes.string,
  inValue: PropTypes.string,
  outValue: PropTypes.string,

  transDelayIn: PropTypes.number,
  transDelayOut: PropTypes.number,

  transDurationIn: PropTypes.string,
  transDurationOut: PropTypes.string,

  outCall: PropTypes.func,
  outCallDelay: PropTypes.number,

  outTrigger: PropTypes.bool,

  setId: PropTypes.string,
  targetId: PropTypes.string,

  width: PropTypes.string
};

Transition.defaultProps = {
  transProperty: properties.transProperty,
  transType: properties.transType,

  startValue: properties.startValue,
  inValue: properties.inValue,
  outValue: properties.outValue,

  transDelayIn: properties.transDelayIn,
  transDelayOut: properties.transDelayOut,
  transDurationIn: properties.transDurationIn,
  transDurationOut: properties.transDurationOut,

  outDelay: properties.outDelay,

  width: properties.width
}