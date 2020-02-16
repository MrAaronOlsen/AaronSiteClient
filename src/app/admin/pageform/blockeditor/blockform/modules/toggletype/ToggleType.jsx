import React from 'react'

import ToggleList from 'modules/lists/togglelist/ToggleList.jsx'
import styles from './toggleType.mod.scss'

const items = {
  'T': "", '0': 0, '[ ]': [], '{ }': {},
}

const display = {
  'string': `" "`,
  'number': '0',
  'array': '[ ]',
  'object': '{ }'
}

export default function ToggleType(props) {
  const toggleRef = React.useRef(null);
  const [expandList, setExpandList] = React.useState(false)

  function onClick(value) {
    props.onChange(items[value], props.name)
  }

  function toggleList() {
    setExpandList(!expandList)
  }

  return (
    <div name="toggle-wrapper" className={styles.wrapper}>
      <div name="toggle-children" className={styles.children}>
        {props.children}
      </div>
      <div name="toggle" className={styles.toggle} >
        <div className={styles.selected} ref={toggleRef} onClick={toggleList}>
          { display[props.type] }
        </div>
        <ToggleList classNames={{'list': styles.list, 'line': styles.line}}
          onClick={onClick}
          items={Object.keys(items)}
          selected={props.selected}
          anchorRef={toggleRef}
          expand={expandList}
          ignoreRefs={[toggleRef]}/>
      </div>
    </div>
  )
}