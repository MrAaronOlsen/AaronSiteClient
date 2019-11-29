import React, { Component } from 'react'

import Element from './element/Element.jsx'
import styles from './blockList.mod.scss'

export default class BlockList extends Component {

  render() {
    return(
      <div className={styles.wrapper}>
        { Object.keys(this.props.blocks).map((key, i) => {
          return <Element key={i} name={key} onClick={this.props.onClick}/>
        })}
      </div>
    )
  }
}