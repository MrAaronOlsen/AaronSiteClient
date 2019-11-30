import React, { Component } from 'react'

import Element from './element/Element.jsx'
import AddButton from 'public/images/add-button.png'
import { properties } from 'modules/transition/Transition.jsx'
import styles from './transitionList.mod.scss'

export default class BlockTransition extends Component {

  onClick(name) {
    this.props.addProperty(name)
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.header}><img src={AddButton} /></div>
        <div className={styles.list}>
          {Object.keys(properties).map((key, i) => {
            return <Element key={i} name={key} onClick={this.onClick.bind(this)}/>
          })}
        </div>
      </div>
    )
  }
}