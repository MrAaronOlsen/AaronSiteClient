import React from 'react'
import shortid from 'shortid'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import DeleteBtn from 'blockform/common/deletebtn/DeleteBtn.jsx'
import SelectList from 'blockform/common/selectlist/SelectList.jsx'
import StyleProperties, { StylePropertiesList } from '../StyleProperties.jsx'

import styles from './blockObject.mod.scss'

const nestedKeys = new Set([
  ':hover',
  ':active'
])

export default function BlockObject(props) {
  const [id] = React.useState(shortid.generate())

  function object() {
    return props.object || {}
  }

  function newBlockObject(key, index) {
    return <BlockObject key={props.blockKey + index}
      focused={props.focused}
      focus={props.focus}
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
      focused={props.focused}
      focus={props.focus}
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
    if (nestedKeys.has(key)) {
      return newBlockObject(key, index)
    } else {
      return newTextBlock(key, index)
    }
  }

  function sortedFields() {
    var list = Object.keys(object());
    var ordered;

    var order = props.objectOrder;

    if (order) {
      ordered = list.sort(function(a, b) {
        return order.indexOf(a) - order.indexOf(b);
      });
    } else {
      return list;
    }

    return ordered.map((key, i) => {
      return getField(key, i)
    })
  }

  return(
    <div id={id} className={styles.wrapper} data-locator={props.locator}>

      <div className={styles.header}>
        { props.delete && <DeleteBtn onClick={deleteLine} focused={props.focused} parentId={id} /> }

        <span>{props.name}: </span>
        <div className={styles.list}>
          <SelectList items={Object.keys(props.attributes)} onClick={addProperty}/>
        </div>
      </div>

      <div className={styles.properties}>
        <div className={styles.property}>
          { sortedFields() }
        </div>
      </div>
    </div>
  )
}