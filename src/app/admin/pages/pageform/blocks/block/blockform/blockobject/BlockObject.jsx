import React, { Component } from 'react'
import shortid from 'shortid'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import SelectList from 'modules/lists/selectlist/SelectList.jsx'
import StyleProperties, { StylePropertiesList } from '../StyleProperties.jsx'

import styles from './blockObject.mod.scss'

export default class BlockObject extends Component {
  id = shortid.generate();

  object() {
    return this.props.object || {}
  }

  onChange(content, name) {
    let object = this.props.object || {};
    object[name] = content;

    this.props.onChange(object, this.props.name)
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

    this.props.onChange(object, this.props.name)
  }

  hasStyles(index) {
    if (this.props.name === 'transition') {
      return <BlockObject key={this.props.blockKey + index}
        name={'styles'}
        object={this.object().styles || {}}
        objectOrder={StylePropertiesList}
        blockKey={this.props.blockKey}
        onChange={this.onChange.bind(this)}
        attributes={ StyleProperties } />
    } else {
      return null;
    }
  }

  getField(key, index) {
    if (key === 'styles') {
      return this.hasStyles(index)
    } else {
      return <BlockText key={this.props.blockKey + key}
        name={key}
        text={this.object()[key]}
        onChange={this.onChange.bind(this)}
        delete={this.deleteProperty.bind(this)} />
    }
  }

  sortedListByDefinedOrder() {
    var list = Object.keys(this.object());
    var order = this.props.objectOrder;

    if (order) {
      return list.sort(function(a, b) {
        return order.indexOf(a) - order.indexOf(b);
      });
    } else {
      return list;
    }
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
        <div className={styles.properties}>
          <div className={styles.property}>
            {
              this.sortedListByDefinedOrder().map((key, i) => {
                return this.getField(key, i)
              })
            }
          </div>
        </div>
      </div>
    )
  }
}