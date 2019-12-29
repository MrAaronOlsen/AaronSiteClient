import React from 'react'
import shortid from 'shortid'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import SelectList from 'modules/lists/selectlist/SelectList.jsx'
import StyleProperties, { StylePropertiesList } from '../StyleProperties.jsx'

import DeleteBtn from 'public/images/delete-button.png'
import styles from './blockObject.mod.scss'

const nestedStyles = new Set([
  'styles',
  ':hover',
  ':active'
])

export default function BlockObject(props) {
  var id = shortid.generate();

  function object() {
    return props.object || {}
  }

  function newBlockObject(key, index) {
    return <BlockObject key={props.blockKey + index}
      name={key}
      object={object()[key] || {}}
      objectOrder={StylePropertiesList}
      blockKey={props.blockKey}
      onChange={onChange}
      attributes={ StyleProperties }
      delete={deleteProperty} />
  }

  function newTextBlock(key, index) {
    return <BlockText key={props.blockKey + key}
      name={key}
      text={object()[key]}
      onChange={onChange}
      delete={deleteProperty} />
  }

  function onChange(content, name) {
    let object = props.object || {};
    object[name] = content;

    props.onChange(object, props.name)
  }

  function addProperty(name) {
    let object = props.object || {};

    if (!object[name]) {
      onChange(props.attributes[name], name)
    }
  }

  function deleteProperty(name) {
    let object = props.object;
    delete object[name]

    props.onChange(object, props.name)
  }

  function deleteLine() {
    props.delete(props.name)
  }

  function getField(key, index) {
    if (nestedStyles.has(key)) {
      return newBlockObject(key, index)
    } else {
      return newTextBlock(key, index)
    }
  }

  function sorted() {
    var list = Object.keys(object());
    var order = props.objectOrder;

    if (order) {
      return list.sort(function(a, b) {
        return order.indexOf(a) - order.indexOf(b);
      });
    } else {
      return list;
    }
  }

  return(
    <div className={styles.wrapper}>

      <div className={styles.header}>
        {props.delete ? <img src={DeleteBtn} className={styles.deleteBtn} onClick={deleteLine}/> : null}
        
        <span>{props.name}: </span>
        <div className={styles.list}>
          <SelectList items={Object.keys(props.attributes)} onClick={addProperty}/>
        </div>
      </div>

      <div className={styles.properties}>
        <div className={styles.property}>
          {
            sorted().map((key, i) => {
              return getField(key, i)
            })
          }
        </div>
      </div>
    </div>
  )
}