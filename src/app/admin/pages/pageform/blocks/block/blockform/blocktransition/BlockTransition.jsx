import React, { Component } from 'react'
import shortid from 'shortid'

import BlockText from '../blockText/BlockText.jsx'
import TransitionList from './transitionList/TransitionList.jsx'
import { properties } from 'modules/transition/Transition.jsx'
import styles from './blockTransition.mod.scss'

export default class BlockTransition extends Component {
  id = shortid.generate();

  transition() {
    return this.props.transition || {}
  }

  onChange(content, name) {
    let transition = this.props.transition;
    transition[name] = content;

    this.props.onChange(transition, 'transition')
  }

  addProperty(name) {
    let transition = this.props.transition;

    if (!transition[name]) {
      this.onChange(properties[name], name)
    }
  }

  deleteProperty(name) {
    let transition = this.props.transition;
    delete transition[name]

    this.props.onChange(transition, 'transition')
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span>transition: </span>
          <div className={styles.list}>
            <TransitionList addProperty={this.addProperty.bind(this)}/>
          </div>
        </div>
        <div className={styles.transitionWrapper}>
          <div className={styles.transition}>
            {Object.keys(this.transition()).map((key, i) => {
                return <BlockText key={this.props.blockKey + i}
                  name={key}
                  text={this.transition()[key]}
                  onChange={this.onChange.bind(this)}
                  delete={this.deleteProperty.bind(this)} />
            })}
          </div>
        </div>
      </div>
    )
  }
}