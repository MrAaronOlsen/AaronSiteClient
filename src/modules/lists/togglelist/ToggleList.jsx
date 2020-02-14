import React from 'react'

import { outsideClick } from 'effects'
import { anchorRefTo } from 'ref-utils'

import Line from './line/Line.jsx'
import styles from './toggleList.mod.scss'

export default function SelectList(props) {
  const listRef = React.useRef(null);

  const [expandList, setExpandList] = React.useState(false)

  React.useEffect(() => anchorRefTo(listRef, props.anchorRef), [expandList])
  React.useEffect(() => outsideClick(listRef, unmountList, props.ignoreRefs || []), [])
  React.useEffect(() => setExpandList(props.expand), [props.expand])

  function onClick(selected) {
    props.onClick(selected)
  }

  function unmountList() {
    setExpandList(false)
  }

  function mountList() {
    setExpandList(false)
  }

  function buildList() {
    if (props.items) {
      return props.items.map((name, i) => {
        return <Line key={i} {...props}
          classNames={props.classNames}
          name={name}
          selected={name === props.selected}
          onClick={onClick}/>
      })
    } else {
      return null;
    }
  }

  function classesFor(name) {
    const classNames = props.classNames || {};

    var classes = [styles[name]]
    if (classNames[name]) {
      classes.push(classNames[name])
    }

    return classes.join(" ")
  }

  return ( expandList &&
    <div className={classesFor('list')} ref={listRef} onMouseLeave={unmountList}>
      { buildList() }
    </div>
  )
}