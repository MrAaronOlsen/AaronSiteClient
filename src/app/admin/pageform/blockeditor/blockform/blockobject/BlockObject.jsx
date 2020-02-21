import React from 'react'
import shortid from 'shortid'

import ToggleType from 'blockform/modules/toggletype/ToggleType.jsx'
import DeleteBtn from 'blockform/modules/deletebtn/DeleteBtn.jsx'
import AddList from 'blockform/modules/addlist/AddList.jsx'

import BlockText from 'blockform/blocktext/BlockText.jsx'
import BlockNumber from 'blockform/blocknumber/BlockNumber.jsx'
import BlockArray from 'blockform/blockarray/BlockArray.jsx'

import styles from './blockObject.mod.scss'

export default function BlockObject(props) {
  const [id] = React.useState(shortid.generate())

  const root = props.root;
  const thisName = props.name;
  const parentName = props.parent || "";

  const properties = props.properties[thisName] || [];

  function getObject() {
    return props.content || {}
  }

  function newObject(Block, type, name, value, index) {
    const key = `${root}-${parentName}-${thisName}-${name}`

    return (
      <ToggleType key={key} display={key} name={name} type={type} onChange={onChange}>
        <Block {...props}
          name={name}
          parent={thisName}
          content={value}
          onChange={onChange}
          delete={deleteProperty} />
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
      if (Array.isArray(value)) {
        return newObject(BlockArray, "array", key, value, index)
      } else {
        return newObject(BlockObject, "object", key, value, index)
      }
    } else {
      if (typeof value === 'number') {
        return newObject(BlockNumber, "number", key, value, index)
      } else {
        return newObject(BlockText, "string", key, value, index)
      }
    }
  }

  function sortedFields() {
    var list = Object.keys(getObject());
    var order = Object.keys(properties);

    if (order) {
      var ordered = list.sort(function(a, b) {
        return order.indexOf(a) - order.indexOf(b);
      });

      return ordered.map((key, i) => {
        return getField(key, i)
      })
    } else {
      return list;
    }
  }

  return(
    <div name={thisName} id={id} className={styles.wrapper} data-locator={props.locator}>

      <div className={styles.header} onClick={() => props.focus(id)}>
        { props.delete && <DeleteBtn onClick={deleteLine} focused={props.focused} parentId={id} /> }

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