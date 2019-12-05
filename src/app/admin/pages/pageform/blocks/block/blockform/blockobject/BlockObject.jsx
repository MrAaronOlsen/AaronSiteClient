import React, { Component } from 'react'
import shortid from 'shortid'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import SelectList from 'modules/lists/selectlist/SelectList.jsx'

import styles from './blockObject.mod.scss'

const stylesProps = {
  'width': '100%',
  'height': '300px',
  'padding': '10px',
  'border': 'none',
  'background-color': '$background',
  'top': '0',
  'left': '0',
  'position': 'relative'
}

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
        blockKey={this.props.blockKey}
        onChange={this.onChange.bind(this)}
        attributes={stylesProps} />
    } else {
      return null;
    }
  }

  getField(key, index) {
    if (key === 'styles') {
      return this.hasStyles(index)
    } else {
      return <BlockText key={this.props.blockKey + index}
        name={key}
        text={this.object()[key]}
        onChange={this.onChange.bind(this)}
        delete={this.deleteProperty.bind(this)} />
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
            {Object.keys(this.object()).map((key, i) => {
                return this.getField(key, i)
            })}
          </div>
        </div>
      </div>
    )
  }
}