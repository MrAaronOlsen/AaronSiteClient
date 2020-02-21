import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import MotionExit from 'motion/MotionExit.jsx';
import Motion from 'motion/Motion.jsx';
import { headerMotion, arrowMotion } from './ElementMotionConfigs.js'

import ArrowBtn from 'modules/buttons/ArrowBtn.jsx';

import styles from './element.mod.scss'

class Page extends Component {
  header = this.props.element.header
  caption = this.props.element.caption
  slug = this.props.element.slug
  id = this.props.element.id

  state = {
    redirect: false,
    trigger: true
  }

  onClick(action) {
    this.setState({
      trigger: false
    })
  }

  redirect() {
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
          pathname: '/pages/' + this.slug,
          state: {id: this.id}
        }}/>
    }

    let timing = 500 + (this.props.index * 200);
    return(

        <div className={styles.wrapper}>
          <MotionExit trigger={this.state.trigger} onExit={this.redirect.bind(this)}>
            <Motion key={this.header + this.props.index} motion={headerMotion} custom={this.props.index} classNames={styles.headerMotion}>
              <div className={styles.inner}>
                <div className={styles.header}>
                  <h4 className={styles.headerText}>{this.header}</h4>
                </div>
                <div className={styles.caption}>
                  {this.caption}
                </div>
              </div>
            </Motion>

            <Motion key={this.header + this.props.index + "_arrow"} motion={arrowMotion} custom={this.props.index} classNames={styles.arrowMotion}>
              <ArrowBtn classNames={styles.arrow} onClick={this.onClick.bind(this)} />
            </Motion>
          </MotionExit>
        </div>

    )
  }
}

export default Page;
