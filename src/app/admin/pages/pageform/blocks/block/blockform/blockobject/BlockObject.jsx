import React, { Component } from 'react'
import shortid from 'shortid'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import SelectList from 'modules/lists/selectlist/SelectList.jsx'

import styles from './blockObject.mod.scss'

export default class BlockObject extends Component {
  id = shortid.generate();

  object() {
    return this.props.object || {}
  }

  onChange(content, name) {
    let object = this.props.object || {};
    object[name] = content;

    this.props.onChange(object, 'object')
  }

  addProperty(name) {
    let object = this.props.object || {};

    if (!object[name]) {
      this.onChange(this.props.attributes[name], name)
    }
  }

  deleteProperty(name) {
    let object = this.props.object;
    delete object[name]

    this.props.onChange(object, 'object')
  }

  render() {
    return(
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span>{this.props.name}: </span>
          <div className={styles.list}>
            <SelectList items={Object.keys(this.props.attributes)} onClick={this.addProperty.bind(this)}/>
          </div>
        </div>
        <div className={styles.transitionWrapper}>
          <div className={styles.transition}>
            {Object.keys(this.object()).map((key, i) => {
                return <BlockText key={this.props.blockKey + i}
                  name={key}
                  text={this.object()[key]}
                  onChange={this.onChange.bind(this)}
                  delete={this.deleteProperty.bind(this)} />
            })}
          </div>
        </div>
      </div>
    )
  }
}