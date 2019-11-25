import React, { Component } from 'react';
import ArrowBtn from 'modules/buttons/ArrowBtn.jsx';
import Transition from 'modules/transition/Transition.jsx';

import styles from './element.mod.scss'

class Page extends Component {
  header = this.props.element.header
  caption = this.props.element.preview

  state = {
    triggerOut: false
  }

  onClick(action) {
    this.setState({
      triggerOut: true
    })
  }

  redirect() {
    this.props.history.push('/pages/' +  this.header)
  }

  render() {
    let timing = 500 + (this.props.index * 200);
    return(
      <Transition
        transInDuration={timing + 'ms'}
        outTrigger={this.state.triggerOut}
        outDelay={500}
        outCallback={this.redirect.bind(this)}>

        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h4>{this.header}</h4>

            <Transition
              transInDuration={timing * 1.5 + 'ms'}
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
