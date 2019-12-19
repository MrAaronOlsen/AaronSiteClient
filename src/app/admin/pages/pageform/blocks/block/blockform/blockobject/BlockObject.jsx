import React from 'react'
import shortid from 'shortid'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import SelectList from 'modules/lists/selectlist/SelectList.jsx'
import StyleProperties, { StylePropertiesList } from '../StyleProperties.jsx'

import styles from './blockObject.mod.scss'

export default function BlockObject(props) {
  var id = shortid.generate();

  function object() {
    return props.object || {}
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

  function hasStyles(index) {
    if (props.name === 'transition') {
      return <BlockObject key={props.blockKey + index}
        name={'styles'}
        object={object().styles || {}}
        objectOrder={StylePropertiesList}
        blockKey={props.blockKey}
        onChange={onChange.bind(this)}
        attributes={ StyleProperties } />
    } else {
      return null;
    }
  }

  function getField(key, index) {
    if (key === 'styles') {
      return hasStyles(index)
    } else {
      return <BlockText key={props.blockKey + key}
        name={key}
        text={object()[key]}
        onChange={onChange.bind(this)}
        delete={deleteProperty.bind(this)} />
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
        <span>{props.name}: </span>
        <div className={styles.list}>
          <SelectList items={Object.keys(props.attributes)} onClick={addProperty.bind(this)}/>
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