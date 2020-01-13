import React, { Component } from 'react'

import Element from './element/Element.jsx'
import AddButton from 'public/images/add-button.png'
import styles from './selectList.mod.scss'

export default class SelectList extends Component {

  onClick(name) {
    this.props.onClick(name)
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img className={styles.addBtn} src={AddButton} />
        </div>
        <div className={styles.list}>
          {this.props.items.map((name, i) => {
            return <Element key={i} name={name} onClick={this.onClick.bind(this)}/>
          })}
        </div>
      </div>
    )
  }
}