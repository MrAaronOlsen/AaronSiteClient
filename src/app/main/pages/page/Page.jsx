import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Blocks from 'blocks/Blocks.jsx'
import Transition from 'modules/transition/Transition.jsx'
import ArrowBtn from 'modules/buttons/ArrowBtn.jsx'

import styles from './page.mod.scss'

const arrowTransitionConfig = {
  transProperty: 'left',
  startValue: '-100vw',
  inValue: '0',
  outValue: '-100vw',
  transDurationIn: '1000ms'
}

export default class Page extends Component {
  state = {
    redirect: false,
    triggerOut: false
  }

  redirect() {
    this.setState({
      redirect: true
    })
  }

  triggerOut() {
    this.setState({
      triggerOut: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/pages' />
    }

    return(
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Transition config={arrowTransitionConfig}
            outTrigger={this.state.triggerOut}>

            <ArrowBtn classNames={styles.button} direction={'left'} onClick={this.triggerOut.bind(this)} />
          </Transition>
        </div>
        <div className={styles.blocks}>
          <Blocks
            triggerOut={this.state.triggerOut}
            actionOut={this.redirect.bind(this)}
            query={'pages/' + this.props.location.state.id}/>
        </div>
      </div>
    )
  }
}