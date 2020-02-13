import React from 'react'
import shortid from 'shortid'

import ToggleType from './ToggleType.jsx'
import BlockText from 'blockform/blocktext/BlockText.jsx'
import DeleteBtn from 'blockform/modules/deletebtn/DeleteBtn.jsx'
import AddList from 'blockform/modules/addlist/AddList.jsx'

import styles from './blockObject.mod.scss'

export default function BlockObject(props) {
  const [id] = React.useState(shortid.generate())

  const parentName = props.parent;
  const thisName = props.name;
  const properties = props.properties[thisName] || [];

  function getObject() {
    return props.content || {}
  }

  function newBlockObject(key, value, index) {
    const id = parentName + index;

    return wrapToggle(
      <BlockObject {...props}
        name={key}
        content={value}
        onChange={onChange}
        delete={deleteProperty} />, id, key, "object"
    )
  }

  function newTextBlock(key, value, index) {
    const id = parentName + index;

    return wrapToggle(
      <BlockText {...props}
        name={key}
        content={value}
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
    let object = getObject();
    object[name] = content;

    props.onChange(object, thisName)
  }

  function addProperty(name) {
    let object = getObject()

    if (!object[name]) {
      onChange(properties[name], name)
    }
  }

  function deleteProperty(name) {
    let object = getObject()
    delete object[name]

    props.onChange(object, thisName)
  }

  function deleteLine() {
    props.delete(thisName)
  }

  function getField(key, index) {
    const value = getObject()[key];

    if (typeof value === 'object') {
      return newBlockObject(key, value, index)
    } else {
      return newTextBlock(key, value, index)
    }
  }

  function sortedFields() {
    var list = Object.keys(getObject());
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
        { props.delete && <DeleteBtn onClick={deleteLine} focused={props.focused} parentNameId={id} /> }

        <span>{thisName}: </span>
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