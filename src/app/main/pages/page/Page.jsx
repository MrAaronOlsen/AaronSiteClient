import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Logger from 'logger';
import { API_V1 } from 'http/url.js';
import { GET } from 'http/get.js';

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

const arrowStyles = {
  'position': 'absolute',
  'width': 'auto',
  'z-index': '999'
}

const headerTransitionConfig = {
  transProperty: 'opacity',
  startValue: '0',
  inValue: '1',
  outValue: '0',
  transDurationIn: '1000ms'
}

const headerStyles = {
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  width: '100%',
  'font-size': '24px'
}

export default class Page extends Component {
  state = {
    redirect: false,
    triggerOut: false
  }

  componentDidMount() {
    this.load()
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

  page() {
    return this.state.page || {}
  }

  load() {
    const query = 'pages/' + this.props.location.state.id

    GET(API_V1 + query, (payload) => {
      if (payload.hasErrors()) {
        Logger.error("Failed to load page. Cause: " + payload.getErrors());
      } else {
        this.setState({
          page: payload.getFirst()
        })
      }
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/pages' />
    }

    if (!this.state.page) {
      return null
    }

    return(
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Transition
            styles={arrowStyles}
            config={arrowTransitionConfig}
            outTrigger={this.state.triggerOut}>

            <ArrowBtn classNames={styles.button}
              direction={'left'}
              onClick={this.triggerOut.bind(this)} />
            
          </Transition>
          <Transition
            styles={headerStyles}
            config={headerTransitionConfig}
            outTrigger={this.state.triggerOut}>

            {this.page().header}
          </Transition>
        </div>
        <div className={styles.blocks}>
          <Blocks
            triggerOut={this.state.triggerOut}
            actionOut={this.redirect.bind(this)}
            blocks={this.page().blocks}
            setState={this.setState.bind(this)}/>
        </div>
      </div>
    )
  }
}