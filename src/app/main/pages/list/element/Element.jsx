import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import ArrowBtn from 'modules/buttons/ArrowBtn.jsx';
import Transition from 'modules/transition/Transition.jsx';

import styles from './element.mod.scss'

class Page extends Component {
  header = this.props.element.header
  caption = this.props.element.caption
  slug = this.props.element.slug
  id = this.props.element.id

  state = {
    redirect: false,
    triggerOut: false
  }

  onClick(action) {
    this.setState({
      triggerOut: true
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
      <Transition
        transDurationIn={timing + 'ms'}
        outTrigger={this.state.triggerOut}
        outCallDelay={500}
        styles={{width: '100%'}}
        outCall={this.redirect.bind(this)}
        controlsOutCall={true}>

        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h4>{this.header}</h4>

            <Transition
              transDurationIn={timing * 1.5 + 'ms'}
              outTrigger={this.state.triggerOut}
              width='auto'>

              <ArrowBtn classNames={styles.button} onClick={this.onClick.bind(this)} />
            </Transition>
          </div>
          <div className={styles.caption}>
            {this.caption}
          </div>
        </div>
      </Transition>

    )
  }
}

export default Page;
