import React from 'react'
import shortid from 'shortid'

import ToggleType from './ToggleType.jsx'
import BlockText from 'blockform/blocktext/BlockText.jsx'
import DeleteBtn from 'blockform/modules/deletebtn/DeleteBtn.jsx'
import AddList from 'blockform/modules/addlist/AddList.jsx'

import styles from './blockObject.mod.scss'

export default function BlockObject(props) {
  const [id] = React.useState(shortid.generate())

  const parent = props.parent;
  const properties = props.properties[props.name] || [];

  function object() {
    return props.object || {}
  }

  function newBlockObject(key, value, index) {
    const id = parent + index;

    return wrapToggle(
      <BlockObject {...props}
        name={key}
        object={value}
        onChange={onChange}
        delete={deleteProperty} />, id, key, "object"
    )
  }

  function newTextBlock(key, value, index) {
    const id = parent + index;

    return wrapToggle(
      <BlockText {...props}
        name={key}
        text={value}
        onChange={onChange}
        delete={deleteProperty} />, id, key, "text"
    )
  }

  function wrapToggle(field, id, name, type) {
    return (
      <ToggleType key={id} name={name} type={type} onChange={onChange}>
        { field }
      </ToggleType>
    )
  }

  function onChange(content, name) {
    let object = props.object || {};
    object[name] = content;

    props.onChange(object, props.name)
  }

  function addProperty(name) {
    let object = props.object || {};

    if (!object[name]) {
      onChange(properties[name], name)
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
    const value = object()[key];

    if (typeof value === 'object') {
      return newBlockObject(key, value, index)
    } else {
      return newTextBlock(key, value, index)
    }
  }

  function sortedFields() {
    var list = Object.keys(object());
    var ordered;

    var order = Object.keys(properties);

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

      <div className={styles.header} onClick={() => props.focus(id)}>
        { props.delete && <DeleteBtn onClick={deleteLine} focused={props.focused} parentId={id} /> }

        <span>{props.name}: </span>
        <div className={styles.list}>
          <AddList items={Object.keys(properties)} onClick={addProperty}/>
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